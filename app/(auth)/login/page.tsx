'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { supabaseClient } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useT } from '@/components/language-provider';

export default function LoginPage() {
  const router = useRouter();
  const t = useT();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        setError('Unable to retrieve user information.');
        setLoading(false);
        return;
      }

      // Fetch existing profile so we don't overwrite admin role.
      const { data: existingProfile } = await supabaseClient
        .from('profiles')
        .select('role, username, display_name')
        .eq('id', user.id)
        .maybeSingle();

      let profile = existingProfile;

      if (!existingProfile) {
        // New user: create profile with default role staff.
        await supabaseClient.from('profiles').insert({
          id: user.id,
          username: user.email ?? '',
          role: 'staff',
          display_name: null,
        });
        const { data: newProfile } = await supabaseClient
          .from('profiles')
          .select('role, username, display_name')
          .eq('id', user.id)
          .maybeSingle();
        profile = newProfile;
      }

      if (profile?.role) {
        window.localStorage.setItem('tmyg-role', profile.role);
      }
      if (profile?.username != null) {
        window.localStorage.setItem('tmyg-username', profile.username);
      }
      if (profile?.display_name != null) {
        window.localStorage.setItem('tmyg-display-name', profile.display_name);
      }

      router.replace('/');
    } catch (err: any) {
      setError(err.message ?? 'Unexpected error during login.');
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm border-border/80 bg-card/95 backdrop-blur">
        <CardHeader className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
            <LogIn className="h-3.5 w-3.5" />
            <span>{t('loginBadge')}</span>
          </div>
          <CardTitle className="text-lg font-semibold tracking-tight">
            {t('loginHeading')}
          </CardTitle>
          <p className="text-[11px] text-muted-foreground">
            {t('appName')}
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('loginEmail')}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t('loginPassword')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-xs text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : t('loginButton')}
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Use your Supabase-auth email and password. Profiles are linked
              automatically.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
