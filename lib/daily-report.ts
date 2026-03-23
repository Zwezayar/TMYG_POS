import nodemailer from 'nodemailer';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { formatDateDDMMYYYY } from '@/lib/date';

export type ReportItem = {
  name: string;
  qty: number;
};

export type ReportResult = {
  dateLabel: string;
  totalRevenue: number;
  totalProfit: number;
  topItems: ReportItem[];
};

export async function buildReport(admin: any): Promise<ReportResult> {
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

  const orderIds = (orders ?? []).map((o: any) => o.id).filter(Boolean);
  let items: any[] = [];

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
    (sum: number, o: any) => sum + Number(o.total_amount ?? 0),
    0
  );

  const totalProfit = items.reduce((sum: number, item: any) => {
    const unit = Number(item.unit_price ?? 0);
    const product = Array.isArray(item.products) ? item.products[0] : item.products;
    const cost = Number(product?.purchase_price ?? 0);
    const qty = Number(item.quantity ?? 0);
    return sum + (unit - cost) * qty;
  }, 0);

  const itemTotals = new Map<string, { name: string; qty: number }>();
  items.forEach((item: any) => {
    const product = Array.isArray(item.products) ? item.products[0] : item.products;
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
    dateLabel: formatDateDDMMYYYY(start),
    totalRevenue,
    totalProfit,
    topItems,
  };
}

export async function sendReportEmail({
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

export async function sendDailyReportForCron() {
  const admin = createServerSupabaseClient();
  const toAddress = process.env.REPORT_TO;
  if (!toAddress) {
    throw new Error('Missing report recipient');
  }
  const result = await buildReport(admin);
  await sendReportEmail({ toAddress, result });
}
