'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  ClipboardList,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useT, type TranslationKey } from '@/components/language-provider';

type NavItem = {
  key: TranslationKey;
  icon: typeof LayoutDashboard;
  href: string;
};

const mainItems: NavItem[] = [
  { key: 'menuDashboard', icon: LayoutDashboard, href: '/' },
  { key: 'menuPos', icon: ShoppingBag, href: '/pos' },
  { key: 'menuInventory', icon: Package, href: '/admin/inventory' },
  { key: 'menuShopSales', icon: ClipboardList, href: '/sales/shop' },
  { key: 'menuDeliverySales', icon: Truck, href: '/sales/delivery' },
];

const crmItems: NavItem[] = [
  { key: 'menuCustomers', icon: Users, href: '/customers' },
];

const settingsItems: NavItem[] = [
  { key: 'menuSettings', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile, collapsed, onToggleCollapse }: SidebarProps) {
  const [year, setYear] = React.useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();

  React.useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('tmyg-role');
      window.localStorage.removeItem('tmyg-username');
    }
    router.replace('/login');
  }

  const content = (
    <nav className="flex h-full flex-col gap-4 px-2 py-4 text-sm overflow-hidden whitespace-nowrap">
      <div className={cn(
        "mb-2 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 transition-all duration-300",
        collapsed ? "opacity-0 invisible h-0" : "opacity-100 visible h-auto"
      )}>
        {t('menuMain')}
      </div>
      <ul className="flex flex-1 flex-col gap-1.5">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const active = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
          const label = t(item.key);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  collapsed ? "justify-center px-0 w-10 mx-auto" : "w-full"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform", !active && "opacity-70")} />
                {!collapsed && <span className="font-bold text-[13px]">{label}</span>}
              </Link>
            </li>
          );
        })}
        <li className={cn(
          "px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 transition-all duration-300 mt-3",
          collapsed ? "opacity-0 h-0 invisible" : "opacity-100 h-auto visible"
        )}>
          {t('menuCrm')}
        </li>
        {crmItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          const label = t(item.key);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  collapsed ? "justify-center px-0 w-10 mx-auto" : "w-full"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform", !active && "opacity-70")} />
                {!collapsed && <span className="font-bold text-[13px]">{label}</span>}
              </Link>
            </li>
          );
        })}
        <li className={cn(
          "px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 transition-all duration-300 mt-3",
          collapsed ? "opacity-0 h-0 invisible" : "opacity-100 h-auto visible"
        )}>
          {t('menuSettingsSection')}
        </li>
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          const label = t(item.key);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  collapsed ? "justify-center px-0 w-10 mx-auto" : "w-full"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform", !active && "opacity-70")} />
                {!collapsed && <span className="font-bold text-[13px]">{label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto space-y-2 border-t border-border pt-4 px-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start gap-3 rounded-xl hover:text-destructive transition-all duration-300",
            collapsed && "justify-center px-0"
          )}
          onClick={handleLogout}
          title={collapsed ? t('menuLogout') : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0 opacity-70" />
          {!collapsed && <span className="font-bold text-[13px]">{t('menuLogout')}</span>}
        </Button>
        <div className={cn(
          "px-2 text-[10px] text-muted-foreground font-black uppercase tracking-wider transition-all duration-300 text-center",
          collapsed ? "opacity-0 h-0 invisible" : "opacity-100 h-auto visible"
        )}>
          © {year} TMYG
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <aside className={cn(
        "hidden border-r border-border bg-card transition-all duration-300 md:block relative z-40",
        collapsed ? "w-16" : "w-60"
      )}>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground shadow-sm transition-all hover:scale-110 z-50 overflow-hidden border-none"
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        )}
        {content}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onCloseMobile}>
          <div
            className="absolute inset-y-0 left-0 w-64 border-r border-border bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
}
