import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { formatDateDDMMYYYY } from '@/lib/date';

type OrderRow = {
  id: string;
  invoice_id: string | null;
  total_amount: number | null;
  created_at: string;
  sale_type: 'Shop' | 'Delivery';
  courier_name: string | null;
  entry_source: string | null;
};

type OrderItemRow = {
  order_id: string;
  product_id: number;
  quantity: number;
  unit_price: number | null;
  subtotal: number | null;
  cost_price: number | null;
};

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function getDayRange(dateText: string) {
  const start = new Date(`${dateText}T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
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
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const passcode = typeof body.passcode === 'string' ? body.passcode : '';
    const startDate =
      typeof body.start_date === 'string' ? body.start_date.trim() : '';
    const endDate =
      typeof body.end_date === 'string' ? body.end_date.trim() : '';
    const deliveryPartner =
      typeof body.delivery_partner === 'string' ? body.delivery_partner.trim() : '';

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return NextResponse.json(
        { error: 'Valid start and end dates are required.' },
        { status: 400 }
      );
    }

    const expectedPasscode = process.env.PROFIT_DASHBOARD_PASSCODE ?? '1234';
    if (passcode !== expectedPasscode) {
      return NextResponse.json({ error: 'Invalid passcode.' }, { status: 403 });
    }

    const supabase = createServerSupabaseClient();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { start } = getDayRange(startDate);
    const { end } = getDayRange(endDate);

    let ordersQuery = supabase
      .from('orders')
      .select('id, invoice_id, total_amount, created_at, sale_type, courier_name, entry_source')
      .gte('created_at', start)
      .lt('created_at', end)
      .order('created_at', { ascending: true });

    if (deliveryPartner) {
      ordersQuery = ordersQuery.eq('courier_name', deliveryPartner);
    }

    const { data: ordersData, error: ordersError } = await ordersQuery;
    if (ordersError) {
      return NextResponse.json({ error: ordersError.message }, { status: 500 });
    }

    const orders = (ordersData ?? []) as OrderRow[];
    if (orders.length === 0) {
      return NextResponse.json({
        totals: {
          revenue: 0,
          cost: 0,
          profit: 0,
          orderCount: 0,
          itemCount: 0,
        },
        breakdown: [],
        byPartner: [],
      });
    }

    const orderIds = orders.map((order) => order.id);
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('order_id, product_id, quantity, unit_price, subtotal, cost_price')
      .in('order_id', orderIds);

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    const orderItems = (itemsData ?? []) as OrderItemRow[];
    const missingCostProductIds = Array.from(
      new Set(
        orderItems
          .filter((item) => item.cost_price === null)
          .map((item) => Number(item.product_id))
          .filter((productId) => Number.isFinite(productId))
      )
    );

    let fallbackCostMap = new Map<number, number>();
    if (missingCostProductIds.length > 0) {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, purchase_price')
        .in('id', missingCostProductIds);

      if (productsError) {
        return NextResponse.json({ error: productsError.message }, { status: 500 });
      }

      fallbackCostMap = new Map(
        (productsData ?? []).map((product) => [
          Number(product.id),
          Number(product.purchase_price ?? 0),
        ])
      );
    }

    const totals = {
      revenue: 0,
      cost: 0,
      profit: 0,
      orderCount: orders.length,
      itemCount: 0,
    };

    const breakdownMap = new Map<
      string,
      { date: string; revenue: number; cost: number; profit: number; orders: number }
    >();
    const partnerMap = new Map<
      string,
      { name: string; revenue: number; cost: number; profit: number; orders: number }
    >();
    const orderCountedByDate = new Set<string>();
    const orderCountedByPartner = new Set<string>();
    const orderMap = new Map(orders.map((order) => [order.id, order]));

    for (const item of orderItems) {
      const order = orderMap.get(item.order_id);
      if (!order) continue;

      const revenue = Number(item.subtotal ?? item.quantity * Number(item.unit_price ?? 0));
      const costPrice =
        item.cost_price === null
          ? fallbackCostMap.get(Number(item.product_id)) ?? 0
          : Number(item.cost_price);
      const cost = costPrice * Number(item.quantity ?? 0);
      const profit = revenue - cost;
      const dateKey = formatDateDDMMYYYY(order.created_at);
      const partnerKey =
        order.sale_type === 'Delivery'
          ? order.courier_name?.trim() || 'No Partner'
          : 'Shop';

      totals.revenue += revenue;
      totals.cost += cost;
      totals.profit += profit;
      totals.itemCount += Number(item.quantity ?? 0);

      const dateEntry = breakdownMap.get(dateKey) ?? {
        date: dateKey,
        revenue: 0,
        cost: 0,
        profit: 0,
        orders: 0,
      };
      dateEntry.revenue += revenue;
      dateEntry.cost += cost;
      dateEntry.profit += profit;
      if (!orderCountedByDate.has(`${dateKey}:${order.id}`)) {
        dateEntry.orders += 1;
        orderCountedByDate.add(`${dateKey}:${order.id}`);
      }
      breakdownMap.set(dateKey, dateEntry);

      const partnerEntry = partnerMap.get(partnerKey) ?? {
        name: partnerKey,
        revenue: 0,
        cost: 0,
        profit: 0,
        orders: 0,
      };
      partnerEntry.revenue += revenue;
      partnerEntry.cost += cost;
      partnerEntry.profit += profit;
      if (!orderCountedByPartner.has(`${partnerKey}:${order.id}`)) {
        partnerEntry.orders += 1;
        orderCountedByPartner.add(`${partnerKey}:${order.id}`);
      }
      partnerMap.set(partnerKey, partnerEntry);
    }

    return NextResponse.json({
      totals,
      breakdown: Array.from(breakdownMap.values()),
      byPartner: Array.from(partnerMap.values()).sort((a, b) =>
        b.profit - a.profit
      ),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
