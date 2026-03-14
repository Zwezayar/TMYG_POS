'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { useT } from '@/components/language-provider';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { useBarcodeScanner } from '@/lib/useBarcodeScanner';

interface TopbarProps {
  onOpenSidebar?: () => void;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export function Topbar({ onOpenSidebar, onToggleSidebar, sidebarCollapsed }: TopbarProps) {
  const t = useT();
  const router = useRouter();
  const { role, username } = useDashboardAuth();
  const { shutdownScanner } = useBarcodeScanner(() => {});

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('tmyg-role');
      window.localStorage.removeItem('tmyg-username');
    }
    router.replace('/login');
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-border bg-background/80 px-4 backdrop-blur">
      <div className="flex flex-1 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open sidebar"
          onClick={onOpenSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col ml-2">
          <span className="text-sm font-black tracking-[0.1em] uppercase text-foreground">
            {t('appShort')}
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/60">
            {t('dashboardSubtitle')}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 rounded-lg text-[10px] font-semibold"
          onClick={() => shutdownScanner()}
        >
          Camera Reset
        </Button>
        <ThemeToggle />
        <LanguageToggle />
        {role && (
          <span className="rounded-full bg-secondary/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-secondary-foreground">
            {role}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label="Log out"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium uppercase">
          {username?.[0]?.toUpperCase() ?? 'TM'}
        </div>
      </div>
    </header>
  );
}
