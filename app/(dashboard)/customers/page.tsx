'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

type Customer = {
  id: number;
  phone: string;
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
  const [address, setAddress] = React.useState('');
  const [facebookUsername, setFacebookUsername] = React.useState('');
  const [remark, setRemark] = React.useState('');
  const [loyalStatus, setLoyalStatus] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchCustomers = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('customers')
      .select('*')
      .order('total_spent', { ascending: false });
    if (error) {
      console.error('Error fetching customers:', error);
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (role === 'admin') {
      fetchCustomers();
    }
  }, [role, fetchCustomers]);

  const openCreate = () => {
    setEditingCustomer(null);
    setName('');
    setPhone('');
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

  const handleDelete = async (customerId: number) => {
    if (!window.confirm('Delete this customer?')) return;
    setDeletingId(customerId);
    const { error: deleteError } = await supabaseClient
      .from('customers')
      .delete()
      .eq('id', customerId);
    if (!deleteError) {
      setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    }
    setDeletingId(null);
  };

  if (role !== 'admin') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Customers
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Customer data is available to admins only.
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
          <Button variant="outline" size="sm" onClick={fetchCustomers} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
          </Button>
          <Button size="sm" onClick={openCreate} className="bg-blue-600 text-white hover:bg-blue-700">
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
                  <th className="px-4 py-3">Facebook</th>
                  <th className="px-4 py-3">Phone</th>
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
                    <td className="px-4 py-4">{customer.facebook_username || '—'}</td>
                    <td className="px-4 py-4 font-mono">{customer.phone}</td>
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
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-50" onClick={() => openEdit(customer)}>
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          disabled={deletingId === customer.id}
                          onClick={() => handleDelete(customer.id)}
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
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Remark</label>
                <Input
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Remark"
                  className="h-10"
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
                <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700">
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
