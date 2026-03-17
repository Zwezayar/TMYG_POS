'use client';

import Link from 'next/link';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Users } from 'lucide-react';

export default function SettingsPage() {
  const { role } = useDashboardAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
        Settings
      </h1>
      <p className="text-sm text-muted-foreground">
        Configure users, roles, and app behavior.
      </p>
      {role === 'admin' ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/settings/users"
            className="rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-secondary/40"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4 text-primary" />
              User Management
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Manage roles, display names, and invite staff.
            </p>
          </Link>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Admin access required for user management.
        </p>
      )}
    </div>
  );
}
