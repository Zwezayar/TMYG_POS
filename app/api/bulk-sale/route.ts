import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { formatDateDDMMYYYY, formatTimeHHMM } from '@/lib/date';

type BulkSaleItemInput = {
  product_id: number;
  quantity: number;
};

type ProductRow = {
  id: number;
  product_name: string | null;
  sale_price: number | null;
  purchase_price: number | null;
  stock_quantity: number | null;
};

function isValidSaleDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function buildCreatedAt(saleDate: string) {
  return new Date(`${saleDate}T12:00:00.000Z`);
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
    const saleType = body.sale_type === 'Delivery' ? 'Delivery' : 'Shop';
    const saleDate =
      typeof body.sale_date === 'string' ? body.sale_date.trim() : '';
    const partnerId =
      typeof body.delivery_partner_id === 'string'
        ? body.delivery_partner_id.trim()
        : '';
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (!isValidSaleDate(saleDate)) {
      return NextResponse.json(
        { error: 'A valid sale date is required.' },
        { status: 400 }
      );
    }

    const now = new Date();
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const createdAtDate = buildCreatedAt(saleDate);
    if (createdAtDate.getTime() > today.getTime()) {
      return NextResponse.json(
        { error: 'Sale date cannot be in the future.' },
        { status: 400 }
      );
    }

    const items: BulkSaleItemInput[] = rawItems
      .map((item: unknown) => {
        if (!item || typeof item !== 'object') return null;
        const value = item as Record<string, unknown>;
        return {
          product_id: Number(value.product_id),
          quantity: Number(value.quantity),
        };
      })
      .filter(
        (item: BulkSaleItemInput | null): item is BulkSaleItemInput =>
          item !== null &&
          Number.isFinite(item.product_id) &&
          item.product_id > 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
      );

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Please add at least one product.' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, display_name, username')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (!profile || !['admin', 'staff'].includes(profile.role ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let deliveryPartnerName: string | null = null;
    if (saleType === 'Delivery') {
      if (!partnerId) {
        return NextResponse.json(
          { error: 'Delivery partner is required.' },
          { status: 400 }
        );
      }

      const { data: partner, error: partnerError } = await supabase
        .from('delivery_partners')
        .select('id, name')
        .eq('id', partnerId)
        .maybeSingle();

      if (partnerError) {
        return NextResponse.json({ error: partnerError.message }, { status: 500 });
      }
      if (!partner) {
        return NextResponse.json(
          { error: 'Delivery partner not found.' },
          { status: 400 }
        );
      }
      deliveryPartnerName = partner.name;
    }

    const productIds = items.map((item) => item.product_id);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, product_name, sale_price, purchase_price, stock_quantity')
      .in('id', productIds);

    if (productsError) {
      return NextResponse.json({ error: productsError.message }, { status: 500 });
    }

    const productMap = new Map<number, ProductRow>(
      ((products ?? []) as ProductRow[]).map((product) => [Number(product.id), product])
    );

    for (const item of items) {
      const product = productMap.get(item.product_id);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} was not found.` },
          { status: 400 }
        );
      }
      const stock = Number(product.stock_quantity ?? 0);
      if (item.quantity > stock) {
        return NextResponse.json(
          {
            error: `${product.product_name ?? 'Item'} only has ${stock} in stock.`,
          },
          { status: 400 }
        );
      }
    }

    const invoiceKey = saleDate.slice(2).replace(/-/g, '');
    const { data: lastOrder } = await supabase
      .from('orders')
      .select('invoice_id')
      .like('invoice_id', `INV-${invoiceKey}-%`)
      .order('invoice_id', { ascending: false })
      .limit(1)
      .single();

    let nextNumber = 1;
    if (lastOrder?.invoice_id) {
      const lastNumber = parseInt(lastOrder.invoice_id.split('-').pop() ?? '0', 10);
      nextNumber = lastNumber + 1;
    }

    const invoiceId = `INV-${invoiceKey}-${String(nextNumber).padStart(3, '0')}`;

    const receiptItems = items.map((item) => {
      const product = productMap.get(item.product_id)!;
      const price = Number(product.sale_price ?? 0);
      return {
        name: product.product_name ?? 'Item',
        qty: item.quantity,
        price,
        amount: price * item.quantity,
      };
    });

    const subtotal = receiptItems.reduce((sum, item) => sum + item.amount, 0);
    const createdAtIso = createdAtDate.toISOString();
    const staffName =
      typeof profile.display_name === 'string' && profile.display_name.trim().length > 0
        ? profile.display_name.trim()
        : typeof profile.username === 'string'
          ? profile.username
          : null;

    const receiptPayload = {
      invoiceId,
      date: formatDateDDMMYYYY(createdAtDate),
      time: formatTimeHHMM(now),
      staffName,
      cashierRole: profile.role,
      saleType,
      customerName: saleType === 'Delivery' ? deliveryPartnerName ?? '' : '',
      customerPhone: '',
      customerAddress: '',
      items: receiptItems,
      subtotal,
      deliveryFee: 0,
      discount: 0,
      grandTotal: subtotal,
      amountReceived: subtotal,
      changeAmount: 0,
      amountDue: 0,
    };

    const orderPayload: Record<string, unknown> = {
      invoice_id: invoiceId,
      sale_type: saleType,
      payment_method: 'Cash',
      payment_status: 'Check',
      total_amount: subtotal,
      cashier_id: user.id,
      created_at: createdAtIso,
      entry_source: 'Bulk Sale',
      receipt_payload: receiptPayload,
      remark: saleType === 'Delivery' ? `Bulk Sale | Partner: ${deliveryPartnerName}` : 'Bulk Sale',
      customer_name: saleType === 'Delivery' ? deliveryPartnerName : null,
      customer_phone: null,
      customer_address: null,
      courier_name: saleType === 'Delivery' ? deliveryPartnerName : null,
      delivery_fee: saleType === 'Delivery' ? 0 : null,
    };

    const { data: orderRow, error: orderError } = await supabase
      .from('orders')
      .insert(orderPayload)
      .select('id')
      .single();

    if (orderError || !orderRow?.id) {
      return NextResponse.json(
        { error: orderError?.message ?? 'Failed to create sale.' },
        { status: 500 }
      );
    }

    const orderItems = items.map((item) => {
      const product = productMap.get(item.product_id)!;
      const salePrice = Number(product.sale_price ?? 0);
      const costPrice = Number(product.purchase_price ?? 0);
      return {
        order_id: orderRow.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: salePrice,
        cost_price: costPrice,
        subtotal: salePrice * item.quantity,
        created_at: createdAtIso,
      };
    });

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      await supabase.from('orders').delete().eq('id', orderRow.id);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    if (saleType === 'Delivery' && deliveryPartnerName) {
      const { error: deliveryError } = await supabase.from('deliveries').insert({
        order_id: orderRow.id,
        courier_name: deliveryPartnerName,
        deli_fee: 0,
        deli_fee_payable: 0,
        status: 'Pending',
        is_bago_special: false,
        total_to_collect: subtotal,
        created_at: createdAtIso,
      });

      if (deliveryError) {
        console.error('Delivery insert error:', deliveryError);
      }
    }

    for (const item of items) {
      const { error: decrementError } = await supabase.rpc('decrement_stock', {
        product_id_v: item.product_id,
        quantity_v: item.quantity,
      });

      if (decrementError) {
        return NextResponse.json({ error: decrementError.message }, { status: 500 });
      }
    }

    const { data: updatedProducts, error: updatedProductsError } = await supabase
      .from('products')
      .select(
        'id, product_name, default_code, barcode, image_url, category, size, variant, purchase_price, sale_price, stock_quantity, description_en, description_mm, reorder, remark, created_at'
      )
      .order('created_at', { ascending: false });

    if (updatedProductsError) {
      return NextResponse.json({ ok: true, invoiceId, orderId: orderRow.id });
    }

    return NextResponse.json({
      ok: true,
      invoiceId,
      orderId: orderRow.id,
      products: updatedProducts ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
