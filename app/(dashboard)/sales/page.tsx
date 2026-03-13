'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import Link from 'next/link';

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
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/sales/shop" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/30 transition-colors">
          <div className="text-sm font-semibold">Shop Sales Log</div>
          <div className="text-xs text-muted-foreground">Daily totals by payment method.</div>
        </Link>
        <Link href="/sales/delivery" className="rounded-lg border border-border bg-card p-4 hover:bg-secondary/30 transition-colors">
          <div className="text-sm font-semibold">Delivery Sales Log</div>
          <div className="text-xs text-muted-foreground">Courier fees and delivery collections.</div>
        </Link>
      </div>
    </div>
  );
}
