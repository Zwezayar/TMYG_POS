'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProfileRow = {
  id: string;
  username: string | null;
  role: string | null;
  display_name: string | null;
};

export default function UsersPage() {
  const { role } = useDashboardAuth();
  const [users, setUsers] = React.useState<ProfileRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [resettingId, setResettingId] = React.useState<string | null>(null);
  const [newPassword, setNewPassword] = React.useState('');
  const [resetError, setResetError] = React.useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [invitePassword, setInvitePassword] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<'admin' | 'staff'>('staff');
  const [inviteDisplayName, setInviteDisplayName] = React.useState('');
  const [inviteError, setInviteError] = React.useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = React.useState(false);
  const [savingId, setSavingId] = React.useState<string | null>(null);
  const [localEdits, setLocalEdits] = React.useState<Record<string, { role: string; displayName: string }>>({});

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

  const handleSaveProfile = async (userId: string) => {
    const edit = localEdits[userId];
    if (!edit) return;
    setSavingId(userId);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        setError('Session expired.');
        return;
      }
      const res = await fetch('/api/admin/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userId,
          role: edit.role,
          displayName: edit.displayName,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || res.statusText);
        return;
      }
      await fetchUsers();
      setLocalEdits((prev) => {
        const next = { ...prev };
        delete next[userId];
        return next;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setSavingId(null);
    }
  };

  const handleInviteUser = async () => {
    setInviteError(null);
    setInviteSuccess(false);
    const email = inviteEmail.trim();
    const password = invitePassword.trim();
    if (!email || password.length < 6) {
      setInviteError('Email and password (min 6 chars) are required.');
      return;
    }
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        setInviteError('Session expired.');
        return;
      }
      const res = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email,
          password,
          role: inviteRole,
          displayName: inviteDisplayName,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setInviteError(data?.error || res.statusText);
        return;
      }
      setInviteSuccess(true);
      setInviteEmail('');
      setInvitePassword('');
      setInviteDisplayName('');
      setInviteRole('staff');
      await fetchUsers();
    } catch (e) {
      setInviteError(e instanceof Error ? e.message : 'Invite failed');
    }
  };

  const [isSingleUser, setIsSingleUser] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      const { count } = await supabaseClient
        .from('profiles')
        .select('id', { count: 'exact', head: true });
      const single = (count ?? 0) <= 1;
      setIsSingleUser(single);
      if (role === 'admin' || single) {
        fetchUsers();
      } else {
        setLoading(false);
      }
    };
    load();
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

  if (role !== 'admin' && !isSingleUser) {
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
      <div className="flex items-start justify-between gap-4">
        <div>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground">
          View staff and reset passwords. Only admins can access this page.
        </p>
        </div>
        <Button size="sm" onClick={() => setInviteOpen(true)}>
          Invite/Create New User
        </Button>
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
                  User (email)
                </th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Display Name / Staff ID
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
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-border/40">
                    <td className="px-4 py-2 font-medium">
                      {u.username || u.id.slice(0, 8) + '…'}
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        value={localEdits[u.id]?.displayName ?? u.display_name ?? ''}
                        onChange={(e) =>
                          setLocalEdits((prev) => ({
                            ...prev,
                            [u.id]: {
                              role: localEdits[u.id]?.role ?? u.role ?? 'staff',
                              displayName: e.target.value,
                            },
                          }))
                        }
                        placeholder={u.username ?? 'No Name'}
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={localEdits[u.id]?.role ?? u.role ?? 'staff'}
                        onChange={(e) =>
                          setLocalEdits((prev) => ({
                            ...prev,
                            [u.id]: {
                              role: e.target.value,
                              displayName: localEdits[u.id]?.displayName ?? u.display_name ?? '',
                            },
                          }))
                        }
                        className="h-9 rounded-md border border-input bg-transparent px-2 text-xs"
                      >
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveProfile(u.id)}
                          disabled={savingId === u.id || !localEdits[u.id]}
                        >
                          {savingId === u.id ? 'Saving...' : 'Save'}
                        </Button>
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
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {inviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setInviteOpen(false)}>
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-3 text-sm font-semibold">Invite / Create User</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  autoComplete="off"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="staff@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invite-password">Temporary Password</Label>
                <Input
                  id="invite-password"
                  type="password"
                  autoComplete="new-password"
                  value={invitePassword}
                  onChange={(e) => setInvitePassword(e.target.value)}
                  placeholder="Min 6 characters"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invite-display-name">Display Name / Staff ID</Label>
                <Input
                  id="invite-display-name"
                  value={inviteDisplayName}
                  onChange={(e) => setInviteDisplayName(e.target.value)}
                  placeholder="Staff 01 / Cashier Su Su"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invite-role">Role</Label>
                <select
                  id="invite-role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'staff')}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-2 text-xs"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              {inviteError && (
                <p className="text-xs text-destructive">{inviteError}</p>
              )}
              {inviteSuccess && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  User created successfully.
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleInviteUser}>
                Create User
              </Button>
            </div>
          </div>
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
                variant="outline"
                size="sm"
                className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
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
