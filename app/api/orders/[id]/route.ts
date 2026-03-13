import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing order id' }, { status: 400 });
    }

    const payload: Record<string, unknown> = {};
    if (typeof body.customer_name === 'string' || body.customer_name === null) {
      payload.customer_name = body.customer_name;
    }
    if (typeof body.customer_phone === 'string' || body.customer_phone === null) {
      payload.customer_phone = body.customer_phone;
    }
    if (typeof body.customer_address === 'string' || body.customer_address === null) {
      payload.customer_address = body.customer_address;
    }
    if (typeof body.payment_method === 'string' || body.payment_method === null) {
      payload.payment_method = body.payment_method;
    }
    if (typeof body.payment_status === 'string' || body.payment_status === null) {
      payload.payment_status = body.payment_status;
    }
    if (typeof body.courier_name === 'string' || body.courier_name === null) {
      payload.courier_name = body.courier_name;
    }
    if (body.delivery_fee !== undefined) {
      payload.delivery_fee = Number(body.delivery_fee) || 0;
    }

    const supabase = createServerSupabaseClient();
    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (order?.sale_type === 'Delivery') {
      const deliveryFee = Number(order.delivery_fee || 0);
      const totalToCollect = Number(order.total_amount || 0) + deliveryFee;
      await supabase
        .from('deliveries')
        .update({
          courier_name: order.courier_name,
          deli_fee: deliveryFee,
          deli_fee_payable: deliveryFee,
          total_to_collect: totalToCollect,
        })
        .eq('order_id', id);
    }

    return NextResponse.json({ ok: true, data: order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Missing order id' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, quantity')
      .eq('order_id', id);

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    const productIds = (items ?? []).map((item) => item.product_id);
    if (productIds.length > 0) {
      const { data: products } = await supabase
        .from('products')
        .select('id, stock_quantity')
        .in('id', productIds);

      for (const item of items ?? []) {
        const product = (products ?? []).find((p) => Number(p.id) === Number(item.product_id));
        const currentStock = Number(product?.stock_quantity ?? 0);
        const nextStock = currentStock + Number(item.quantity ?? 0);
        await supabase
          .from('products')
          .update({ stock_quantity: nextStock })
          .eq('id', item.product_id);
      }
    }

    const { error: deleteError } = await supabase.from('orders').delete().eq('id', id);
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
