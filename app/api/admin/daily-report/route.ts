import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import nodemailer from 'nodemailer';

type ReportItem = {
  name: string;
  qty: number;
};

type ReportResult = {
  dateLabel: string;
  totalRevenue: number;
  totalProfit: number;
  topItems: ReportItem[];
};

async function buildReport(admin: ReturnType<typeof createServerSupabaseClient>) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const { data: orders, error: ordersError } = await admin
    .from('orders')
    .select('id,total_amount')
    .gte('created_at', start.toISOString())
    .lt('created_at', end.toISOString());

  if (ordersError) {
    throw new Error(ordersError.message);
  }

  const orderIds = (orders ?? []).map((o) => o.id).filter(Boolean);
  let items: {
    product_id: number | null;
    quantity: number | null;
    unit_price: number | null;
    products?: { product_name: string | null; purchase_price: number | null }[] | null;
  }[] = [];

  if (orderIds.length > 0) {
    const { data: itemsData, error: itemsError } = await admin
      .from('order_items')
      .select('product_id,quantity,unit_price,products:products(product_name,purchase_price)')
      .in('order_id', orderIds);
    if (itemsError) {
      throw new Error(itemsError.message);
    }
    items = itemsData ?? [];
  }

  const totalRevenue = (orders ?? []).reduce(
    (sum, o) => sum + Number(o.total_amount ?? 0),
    0
  );
  const totalProfit = items.reduce((sum, item) => {
    const unit = Number(item.unit_price ?? 0);
    const product = Array.isArray(item.products) ? item.products[0] : null;
    const cost = Number(product?.purchase_price ?? 0);
    const qty = Number(item.quantity ?? 0);
    return sum + (unit - cost) * qty;
  }, 0);

  const itemTotals = new Map<string, { name: string; qty: number }>();
  items.forEach((item) => {
    const product = Array.isArray(item.products) ? item.products[0] : null;
    const name = product?.product_name || 'Item';
    const key = `${item.product_id ?? name}`;
    const qty = Number(item.quantity ?? 0);
    const current = itemTotals.get(key);
    if (current) {
      current.qty += qty;
    } else {
      itemTotals.set(key, { name, qty });
    }
  });

  const topItems: ReportItem[] = Array.from(itemTotals.values())
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return {
    dateLabel: start.toISOString().slice(0, 10),
    totalRevenue,
    totalProfit,
    topItems,
  } satisfies ReportResult;
}

async function sendReportEmail({
  toAddress,
  result,
}: {
  toAddress: string;
  result: ReportResult;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromAddress = process.env.REPORT_FROM || smtpUser;

  if (!host || !smtpUser || !smtpPass || !fromAddress || !toAddress) {
    throw new Error('Missing SMTP configuration');
  }

  const topLines = result.topItems.length
    ? result.topItems.map((item, idx) => `${idx + 1}. ${item.name} - ${item.qty}`).join('\n')
    : 'No items sold';

  const textBody = [
    `Daily Sales Report (${result.dateLabel})`,
    '',
    `Total Revenue: ${result.totalRevenue.toLocaleString()} MMK`,
    `Total Profit: ${result.totalProfit.toLocaleString()} MMK`,
    '',
    'Top 5 Items:',
    topLines,
  ].join('\n');

  const htmlBody = `
    <div style="font-family:Arial,sans-serif">
      <h2>Daily Sales Report (${result.dateLabel})</h2>
      <p><strong>Total Revenue:</strong> ${result.totalRevenue.toLocaleString()} MMK</p>
      <p><strong>Total Profit:</strong> ${result.totalProfit.toLocaleString()} MMK</p>
      <h3>Top 5 Items</h3>
      <ol>
        ${result.topItems.map((item) => `<li>${item.name} - ${item.qty}</li>`).join('')}
      </ol>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: fromAddress,
    to: toAddress,
    subject: `Daily Sales Report - ${result.dateLabel}`,
    text: textBody,
    html: htmlBody,
  });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.replace(/^Bearer\s+/i, '');
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const anon = createClient(url, anonKey, { auth: { persistSession: false } });
    const {
      data: { user },
      error: userError,
    } = await anon.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    const admin = createServerSupabaseClient();
    const { data: profile } = await admin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const toAddress = user.email || process.env.REPORT_TO;
    if (!toAddress) {
      return NextResponse.json({ error: 'Missing report recipient' }, { status: 500 });
    }

    const result = await buildReport(admin);
    await sendReportEmail({ toAddress, result });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function sendDailyReportForCron() {
  const admin = createServerSupabaseClient();
  const toAddress = process.env.REPORT_TO;
  if (!toAddress) {
    throw new Error('Missing report recipient');
  }
  const result = await buildReport(admin);
  await sendReportEmail({ toAddress, result });
}
