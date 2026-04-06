'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import Link from 'next/link';
import { BarChart3, ClipboardList, Rows3, Truck } from 'lucide-react';

export default function SalesPage() {
  const { role } = useDashboardAuth();

  if (role !== 'admin') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Sales
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Sales reports are available to admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Sales Logs
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link href="/bulk-sale" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/30 transition-colors">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Rows3 className="h-4 w-4 text-primary" />
            Bulk Sale Entry
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Fast multi-item sale entry with stock deduction.</div>
        </Link>
        <Link href="/sales/shop" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/30 transition-colors">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ClipboardList className="h-4 w-4 text-primary" />
            Shop Sales Log
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Daily totals by payment method.</div>
        </Link>
        <Link href="/sales/delivery" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/30 transition-colors">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Truck className="h-4 w-4 text-primary" />
            Delivery Sales Log
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Courier fees and delivery collections.</div>
        </Link>
        <Link href="/sales/profit" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/30 transition-colors">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BarChart3 className="h-4 w-4 text-primary" />
            Profit Analytics
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Passcode-protected revenue, cost, and net profit view.</div>
        </Link>
      </div>
    </div>
  );
}
