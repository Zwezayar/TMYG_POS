'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProfileRow = { id: string; username: string | null; role: string | null };

export default function UsersPage() {
  const { role } = useDashboardAuth();
  const [users, setUsers] = React.useState<ProfileRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [resettingId, setResettingId] = React.useState<string | null>(null);
  const [newPassword, setNewPassword] = React.useState('');
  const [resetError, setResetError] = React.useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = React.useState(false);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        setError('Not logged in.');
        setLoading(false);
        return;
      }
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || res.statusText || `Request failed (${res.status})`);
        setLoading(false);
        return;
      }
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (role === 'admin') fetchUsers();
    else setLoading(false);
  }, [role, fetchUsers]);

  async function handleResetPassword(userId: string) {
    const pwd = newPassword.trim();
    if (pwd.length < 6) {
      setResetError('Password must be at least 6 characters');
      return;
    }
    setResetError(null);
    setResetSuccess(false);
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        setResetError('Session expired.');
        return;
      }
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userId, newPassword: pwd }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResetError(data.error || res.statusText);
        return;
      }
      setResetSuccess(true);
      setNewPassword('');
      setResettingId(null);
    } catch (e) {
      setResetError(e instanceof Error ? e.message : 'Reset failed');
    }
  }

  if (role !== 'admin') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. This page is for admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground">
          View staff and reset passwords. Only admins can access this page.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading users...</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {!loading && !error && (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="min-w-full border-collapse text-sm">
            <thead className="border-b border-border/60 bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  User (email / username)
                </th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-4 py-2 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-border/40">
                    <td className="px-4 py-2 font-medium">
                      {u.username || u.id.slice(0, 8) + '…'}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {u.role ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setResettingId(u.id);
                          setNewPassword('');
                          setResetError(null);
                          setResetSuccess(false);
                        }}
                      >
                        Reset password
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Reset password modal */}
      {resettingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setResettingId(null)}
        >
          <div
            className="w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3 text-sm font-semibold">Reset password</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Enter a new password for this user. They can change it later after logging in.
            </p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  minLength={6}
                />
              </div>
              {resetError && (
                <p className="text-xs text-destructive">{resetError}</p>
              )}
              {resetSuccess && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Password updated.
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setResettingId(null);
                  setNewPassword('');
                  setResetError(null);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleResetPassword(resettingId)}
                disabled={newPassword.trim().length < 6}
              >
                Update password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
