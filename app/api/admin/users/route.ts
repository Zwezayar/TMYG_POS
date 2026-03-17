import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

/**
 * GET /api/admin/users
 * Returns all profiles (for user management). Admin only.
 * Client must send: Authorization: Bearer <access_token>
 */
export async function GET(req: Request) {
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
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError?.message?.includes('column') && profileError.message.includes('role')) {
      const { count } = await admin
        .from('profiles')
        .select('id', { count: 'exact', head: true });
      if ((count ?? 0) > 1) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data: profiles, error: listError } = await admin
      .from('profiles')
      .select('id, username, role, display_name')
      .order('username');

    if (listError) {
      if (listError.message.includes('display_name')) {
        const { data: fallbackProfiles, error: fallbackError } = await admin
          .from('profiles')
          .select('id, username, role')
          .order('username');
        if (fallbackError) {
          return NextResponse.json({ error: fallbackError.message }, { status: 500 });
        }
        const normalized = (fallbackProfiles ?? []).map((p) => ({
          ...p,
          display_name: null,
        }));
        return NextResponse.json(normalized);
      }
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    return NextResponse.json(profiles ?? []);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
