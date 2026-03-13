'use client';

import Link from 'next/link';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default function SettingsPage() {
  const { role } = useDashboardAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
        Settings
      </h1>
      <p className="text-sm text-muted-foreground">
        Configure users, roles, and app behavior.
      </p>
      {role === 'admin' && (
        <div>
          <Link href="/settings/users">
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              User Management
            </Button>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            View staff and reset passwords.
          </p>
        </div>
      )}
    </div>
  );
}

