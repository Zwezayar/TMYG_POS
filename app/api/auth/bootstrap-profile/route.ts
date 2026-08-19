import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

type ProfileRow = {
  role: 'admin' | 'staff' | null;
  username: string | null;
  display_name: string | null;
};

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
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    const admin = createServerSupabaseClient();
    const { count } = await admin
      .from('profiles')
      .select('id', { count: 'exact', head: true });

    let { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('role, username, display_name')
      .eq('id', user.id)
      .maybeSingle<ProfileRow>();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (!profile) {
      const initialRole = (count ?? 0) === 0 ? 'admin' : 'staff';
      const { error: insertError } = await admin.from('profiles').insert({
        id: user.id,
        username: user.email ?? '',
        role: initialRole,
        display_name: null,
      });

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      const result = await admin
        .from('profiles')
        .select('role, username, display_name')
        .eq('id', user.id)
        .maybeSingle<ProfileRow>();
      profile = result.data;
      profileError = result.error;
    }

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (!profile?.role) {
      const fallbackRole = (count ?? 0) <= 1 ? 'admin' : 'staff';
      const { error: updateError } = await admin
        .from('profiles')
        .update({ role: fallbackRole })
        .eq('id', user.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      profile = {
        role: fallbackRole,
        username: profile?.username ?? user.email ?? '',
        display_name: profile?.display_name ?? null,
      };
    }

    return NextResponse.json({
      role: profile.role,
      username: profile.username,
      display_name: profile.display_name,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
