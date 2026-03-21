'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Loader2 } from 'lucide-react';
import { downloadExcel } from '@/lib/excel';

type Customer = {
  id: number;
  phone: string;
  phone_2: string | null;
  name: string | null;
  facebook_username: string | null;
  address: string | null;
  remark: string | null;
  total_spent: number;
  loyal_status: boolean;
  created_at: string;
};

export default function CustomersPage() {
  const { role } = useDashboardAuth();
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingCustomer, setEditingCustomer] = React.useState<Customer | null>(null);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phone2, setPhone2] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [facebookUsername, setFacebookUsername] = React.useState('');
  const [remark, setRemark] = React.useState('');
  const [loyalStatus, setLoyalStatus] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Customer | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchCustomers = React.useCallback(async () => {
    setLoading(true);
    const fields =
      'id,phone,phone_2,name,facebook_username,address,remark,total_spent,loyal_status,created_at';
    const { data, error } = await supabaseClient
      .from('customers')
      .select(fields)
      .order('total_spent', { ascending: false });
    if (error && /column/i.test(error.message) && /facebook_username/i.test(error.message)) {
      const { data: fallbackData, error: fallbackError } = await supabaseClient
        .from('customers')
        .select('id,phone,phone_2,name,address,remark,total_spent,loyal_status,created_at')
        .order('total_spent', { ascending: false });
      if (fallbackError) {
        console.error('Error fetching customers:', fallbackError);
        setError(fallbackError.message);
      } else {
        setCustomers((fallbackData ?? []) as Customer[]);
        setError('facebook_username column cache is not refreshed yet. Please retry in a moment.');
      }
      setLoading(false);
      return;
    }
    if (error) {
      console.error('Error fetching customers:', error);
      setError(error.message);
    } else {
      setCustomers((data ?? []) as Customer[]);
    }
    setLoading(false);
  }, []);

  const handleExportCustomers = React.useCallback(() => {
    const rows = [
      ['Name', 'Phone', 'Phone 2', 'Facebook', 'Address', 'Remark', 'TotalSpent', 'Loyal'],
      ...customers.map((c) => [
        c.name ?? '',
        c.phone ?? '',
        c.phone_2 ?? '',
        c.facebook_username ?? '',
        c.address ?? '',
        c.remark ?? '',
        c.total_spent ?? 0,
        c.loyal_status ? 'Yes' : 'No',
      ]),
    ];
    downloadExcel('customers-export.xlsx', rows);
  }, [customers]);

  React.useEffect(() => {
    if (role) {
      fetchCustomers();
    }
  }, [role, fetchCustomers]);

  const openCreate = () => {
    setEditingCustomer(null);
    setName('');
    setPhone('');
    setPhone2('');
    setAddress('');
    setFacebookUsername('');
    setRemark('');
    setLoyalStatus(false);
    setError(null);
    setDialogOpen(true);
  };

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setName(customer.name || '');
    setPhone(customer.phone || '');
    setPhone2(customer.phone_2 || '');
    setAddress(customer.address || '');
    setFacebookUsername(customer.facebook_username || '');
    setRemark(customer.remark || '');
    setLoyalStatus(customer.loyal_status);
    setError(null);
    setDialogOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!phone.trim()) {
      setError('Phone is required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editingCustomer) {
        const { error: updateError } = await supabaseClient
          .from('customers')
          .update({
            name: name.trim() || null,
            phone: phone.trim(),
            phone_2: phone2.trim() || null,
            address: address.trim() || null,
            facebook_username: facebookUsername.trim() || null,
            remark: remark.trim() || null,
            loyal_status: loyalStatus,
          })
          .eq('id', editingCustomer.id);
        if (updateError) {
          setError(updateError.message);
          return;
        }
      } else {
        const { error: insertError } = await supabaseClient
          .from('customers')
          .insert({
            name: name.trim() || null,
            phone: phone.trim(),
            phone_2: phone2.trim() || null,
            address: address.trim() || null,
            facebook_username: facebookUsername.trim() || null,
            remark: remark.trim() || null,
            loyal_status: loyalStatus,
          });
        if (insertError) {
          setError(insertError.message);
          return;
        }
      }
      setDialogOpen(false);
      fetchCustomers();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    const { error: deleteError } = await supabaseClient
      .from('customers')
      .delete()
      .eq('id', deleteTarget.id);
    if (!deleteError) {
      setCustomers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    }
    setDeletingId(null);
    setDeleteTarget(null);
  };

  if (!role) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Customers
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Please sign in to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Customers
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={fetchCustomers}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={handleExportCustomers}
          >
            Export to Excel
          </Button>
          <Button size="sm" onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Add Customer
          </Button>
        </div>
      </div>

      {loading && customers.length === 0 ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="w-full">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Phone 2</th>
                  <th className="px-4 py-3">Facebook</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3 text-right">Total Spent</th>
                  <th className="px-4 py-3 text-center">Loyal</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-4">{customer.name || '—'}</td>
                    <td className="px-4 py-4 font-mono">{customer.phone}</td>
                    <td className="px-4 py-4 font-mono">{customer.phone_2 || '—'}</td>
                    <td className="px-4 py-4">{customer.facebook_username || '—'}</td>
                    <td className="px-4 py-4">{customer.address || '—'}</td>
                    <td className="px-4 py-4">{customer.remark || '—'}</td>
                    <td className="px-4 py-4 text-right font-semibold">
                      {Number(customer.total_spent || 0).toLocaleString()} Ks
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${customer.loyal_status ? 'bg-emerald-500/10 text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                        {customer.loyal_status ? 'Loyal' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                          onClick={() => openEdit(customer)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
                          disabled={deletingId === customer.id}
                          onClick={() => setDeleteTarget(customer)}
                        >
                          {deletingId === customer.id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {customers.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No customers found.
            </div>
          )}
        </div>
      )}
      {dialogOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-lg border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
                <p className="text-xs text-muted-foreground">
                  Manage customer details and loyalty status.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </div>
            <form className="grid gap-3 text-xs md:grid-cols-2" onSubmit={handleSave}>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Phone</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Phone 2</label>
                <Input
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  placeholder="Secondary phone"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Customer name"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Facebook User Name</label>
                <Input
                  value={facebookUsername}
                  onChange={(e) => setFacebookUsername(e.target.value)}
                  placeholder="Facebook user name"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Remark</label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Notes"
                  className="min-h-[70px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Loyal Status</label>
                <select
                  value={loyalStatus ? 'loyal' : 'standard'}
                  onChange={(e) => setLoyalStatus(e.target.value === 'loyal')}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="standard">Standard</option>
                  <option value="loyal">Loyal</option>
                </select>
              </div>
              {error && (
                <div className="md:col-span-2 text-[11px] text-destructive">
                  {error}
                </div>
              )}
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete customer?"
        description={`Are you sure you want to delete "${deleteTarget?.name ?? 'this customer'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmVariant="destructive"
        loading={deleteTarget ? deletingId === deleteTarget.id : false}
      />
    </div>
  );
}
