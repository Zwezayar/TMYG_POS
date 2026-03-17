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
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const role = typeof body.role === 'string' ? body.role.trim() : 'staff';
    const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (!['admin', 'staff'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError || !created.user) {
      return NextResponse.json({ error: createError?.message ?? 'Create user failed' }, { status: 500 });
    }

    const userId = created.user.id;
    const { error: profileError } = await admin
      .from('profiles')
      .upsert({
        id: userId,
        username: email,
        role,
        display_name: displayName || null,
      });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, userId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
