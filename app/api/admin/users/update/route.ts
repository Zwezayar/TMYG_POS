import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

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

    const body = await req.json();
    const userId = typeof body.userId === 'string' ? body.userId.trim() : '';
    const role = typeof body.role === 'string' ? body.role.trim() : '';
    const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : '';

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    if (role && !['admin', 'staff'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const payload: Record<string, any> = {};
    if (role) payload.role = role;
    if (displayName.length > 0) payload.display_name = displayName;
    if (displayName.length === 0) payload.display_name = null;

    const { error: updateError } = await admin
      .from('profiles')
      .update(payload)
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
