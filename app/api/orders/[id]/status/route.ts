import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

/**
 * PATCH /api/orders/[id]/status
 * အော်ဒါ၏ ငွေပေးချေမှုအခြေအနေ (payment_status) ကို Update လုပ်သည်။
 */
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing ID or status' }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase
            .from('orders')
            .update({ payment_status: status })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, data });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unexpected error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
