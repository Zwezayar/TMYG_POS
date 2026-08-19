'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { supabaseClient } from '@/lib/supabaseClient';
import { DashboardAuthProvider, type Role } from '@/lib/dashboard-auth-context';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [role, setRole] = React.useState<Role | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [displayName, setDisplayName] = React.useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const isPosRoute = pathname === '/pos';

  const loadProfile = React.useCallback(
    async (accessToken: string) => {
      const res = await fetch('/api/auth/bootstrap-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result?.error || 'Failed to load account profile.');
      }
      return result as {
        role: Role | null;
        username: string | null;
        display_name: string | null;
      };
    },
    []
  );

  React.useEffect(() => {
    setMounted(true);
    const load = async () => {
      try {
        const {
          data: { session },
        } = await supabaseClient.auth.getSession();

        if (!session?.access_token) {
          router.replace('/login');
          return;
        }

        const profile = await loadProfile(session.access_token);
        const roleValue = profile.role;
        const usernameValue = profile.username;
        const displayNameValue = profile.display_name;

        setRole(roleValue);
        setUsername(usernameValue);
        setDisplayName(displayNameValue);

        if (typeof window !== 'undefined') {
          if (roleValue) window.localStorage.setItem('tmyg-role', roleValue);
          if (usernameValue != null) window.localStorage.setItem('tmyg-username', usernameValue);
          if (displayNameValue != null) {
            window.localStorage.setItem('tmyg-display-name', displayNameValue);
          }
        }
      } catch (error) {
        console.error('Failed to load dashboard auth state:', error);
        await supabaseClient.auth.signOut();
        router.replace('/login');
        return;
      }
      setCheckingAuth(false);
    };

    load();
  }, [loadProfile, router]);

  return (
    <DashboardAuthProvider value={{ role, username, displayName }}>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        <Sidebar
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar
            onOpenSidebar={() => setMobileOpen(true)}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
          />
          <main className={cn(
            "flex-1 overflow-hidden",
            (mounted && isPosRoute) ? "p-0" : "px-4 pb-6 pt-4 md:px-6"
          )}>
            <div className={cn(
              "h-full flex flex-col",
              (mounted && isPosRoute) ? "max-w-none" : "mx-auto max-w-6xl gap-4"
            )}>
              {checkingAuth ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Checking session...</p>
                </div>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </DashboardAuthProvider>
  );
}
