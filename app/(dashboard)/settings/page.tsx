'use client';

import * as React from 'react';
import Link from 'next/link';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { Tags, Users } from 'lucide-react';

export default function SettingsPage() {
  const { role } = useDashboardAuth();
  const [isSingleUser, setIsSingleUser] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      const { count } = await supabaseClient
        .from('profiles')
        .select('id', { count: 'exact', head: true });
      setIsSingleUser((count ?? 0) <= 1);
    };
    load();
  }, []);
  const canManageUsers = role === 'admin' || isSingleUser;
  const canManageCategories = role === 'admin' || role === 'staff';

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
        Settings
      </h1>
      <p className="text-sm text-muted-foreground">
        Configure users, roles, and app behavior.
      </p>
      {(canManageUsers || canManageCategories) ? (
        <div className="grid gap-4 md:grid-cols-2">
          {canManageUsers && (
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
          )}
          {canManageCategories && (
            <Link
              href="/settings/categories"
              className="rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-secondary/40"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Tags className="h-4 w-4 text-primary" />
                Manage Categories
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Add, edit, and remove product categories.
              </p>
            </Link>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Access restricted.
        </p>
      )}
    </div>
  );
}
