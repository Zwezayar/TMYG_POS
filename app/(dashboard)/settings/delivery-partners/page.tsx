'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

type DeliveryPartnerRow = {
  id: string;
  name: string;
};

export default function DeliveryPartnersSettingsPage() {
  const { role } = useDashboardAuth();
  const [partners, setPartners] = React.useState<DeliveryPartnerRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [newName, setNewName] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [editing, setEditing] = React.useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] =
    React.useState<DeliveryPartnerRow | null>(null);

  const getAccessToken = React.useCallback(async () => {
    const { data } = await supabaseClient.auth.getSession();
    return data.session?.access_token ?? null;
  }, []);

  const fetchPartners = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/delivery-partners');
      const data = await res.json().catch(() => []);
      if (!res.ok) {
        setError(data?.error || res.statusText);
        setPartners([]);
      } else {
        setPartners((data ?? []) as DeliveryPartnerRow[]);
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load delivery partners'
      );
      setPartners([]);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (role === 'admin' || role === 'staff') {
      fetchPartners();
    } else if (role) {
      setLoading(false);
    }
  }, [role, fetchPartners]);

  const savePartner = async (payload: { id?: string; name: string }) => {
    const token = await getAccessToken();
    if (!token) {
      setError('Session expired.');
      return false;
    }

    const res = await fetch('/api/delivery-partners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error || res.statusText);
      return false;
    }

    await fetchPartners();
    return true;
  };

  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    const ok = await savePartner({ name });
    if (ok) {
      setNewName('');
    }
    setSaving(false);
  };

  const handleSave = async (id: string) => {
    const name = (editing[id] ?? '').trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    const ok = await savePartner({ id, name });
    if (ok) {
      setEditing((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    setError(null);
    const token = await getAccessToken();
    if (!token) {
      setError('Session expired.');
      setSaving(false);
      setDeleteTarget(null);
      return;
    }

    const res = await fetch('/api/delivery-partners', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: deleteTarget.id }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error || res.statusText);
    } else {
      await fetchPartners();
    }
    setSaving(false);
    setDeleteTarget(null);
  };

  if (!role) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Delivery Partners
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Please sign in to continue.
        </p>
      </div>
    );
  }

  if (role !== 'admin' && role !== 'staff') {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Delivery Partners
        </h1>
        <p className="text-sm text-muted-foreground">Access restricted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Delivery Partners
        </h1>
        <p className="text-sm text-muted-foreground">
          Maintain one shared list for bulk delivery sales and reporting filters.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New delivery partner"
          className="h-10"
        />
        <Button
          onClick={handleCreate}
          disabled={saving}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add Partner
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
            <thead className="sticky top-0 z-10 border-b border-border/60 bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Partner
                </th>
                <th className="px-4 py-2 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    Loading delivery partners...
                  </td>
                </tr>
              ) : partners.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No delivery partners yet.
                  </td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.id} className="border-t border-border/40">
                    <td className="px-4 py-2">
                      <Input
                        value={editing[partner.id] ?? partner.name}
                        onChange={(e) =>
                          setEditing((prev) => ({
                            ...prev,
                            [partner.id]: e.target.value,
                          }))
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => handleSave(partner.id)}
                          disabled={saving}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
                          onClick={() => setDeleteTarget(partner)}
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete delivery partner?"
        description={`Are you sure you want to delete "${deleteTarget?.name ?? 'this partner'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmVariant="destructive"
        loading={saving}
      />
    </div>
  );
}
