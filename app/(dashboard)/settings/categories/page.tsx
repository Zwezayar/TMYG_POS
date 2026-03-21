'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CategoryRow = {
  id: string;
  name: string;
};

export default function CategoriesSettingsPage() {
  const { role } = useDashboardAuth();
  const [categories, setCategories] = React.useState<CategoryRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [newName, setNewName] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [editing, setEditing] = React.useState<Record<string, string>>({});

  const getAccessToken = React.useCallback(async () => {
    const { data } = await supabaseClient.auth.getSession();
    return data.session?.access_token ?? null;
  }, []);

  const fetchCategories = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories', { method: 'GET' });
      const data = await res.json().catch(() => []);
      if (!res.ok) {
        setError(data?.error || res.statusText);
        setCategories([]);
      } else {
        setCategories((data ?? []) as CategoryRow[]);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
      setCategories([]);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (role === 'admin') {
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, [role, fetchCategories]);

  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    const token = await getAccessToken();
    if (!token) {
      setError('Session expired.');
      setSaving(false);
      return;
    }
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error || res.statusText);
    } else {
      setNewName('');
      await fetchCategories();
    }
    setSaving(false);
  };

  const handleSave = async (id: string) => {
    const name = (editing[id] ?? '').trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    const token = await getAccessToken();
    if (!token) {
      setError('Session expired.');
      setSaving(false);
      return;
    }
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, name }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error || res.statusText);
    } else {
      setEditing((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      await fetchCategories();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    setError(null);
    const token = await getAccessToken();
    if (!token) {
      setError('Session expired.');
      setSaving(false);
      return;
    }
    const res = await fetch('/api/categories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error || res.statusText);
    } else {
      await fetchCategories();
    }
    setSaving(false);
  };

  if (role !== 'admin') {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Manage Categories</h1>
        <p className="text-sm text-muted-foreground">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Manage Categories</h1>
        <p className="text-sm text-muted-foreground">
          Create and update product categories used in dropdowns.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="h-10"
        />
        <Button onClick={handleCreate} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add Category
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="border-b border-border/60 bg-muted/50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-2 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-muted-foreground">
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-muted-foreground">
                  No categories yet.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-t border-border/40">
                  <td className="px-4 py-2">
                    <Input
                      value={editing[cat.id] ?? cat.name}
                      onChange={(e) =>
                        setEditing((prev) => ({ ...prev, [cat.id]: e.target.value }))
                      }
                      className="h-9"
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-2 flex-wrap">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleSave(cat.id)}
                        disabled={saving}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
                        onClick={() => handleDelete(cat.id)}
                        disabled={saving}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
