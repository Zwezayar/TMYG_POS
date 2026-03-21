'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ReceiptModal, type ReceiptPayload } from '@/components/receipt-modal';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type Order = {
  id: string;
  invoice_id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  payment_method: string | null;
  payment_status: 'Confirmed' | 'Check';
  total_amount: number;
  created_at: string;
  sale_type: 'Shop' | 'Delivery';
  receipt_payload: ReceiptPayload | null;
};

export default function ShopSalesLogPage() {
  const { role } = useDashboardAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [receiptOpen, setReceiptOpen] = React.useState(false);
  const [selectedReceipt, setSelectedReceipt] = React.useState<ReceiptPayload | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [editCustomerName, setEditCustomerName] = React.useState('');
  const [editCustomerPhone, setEditCustomerPhone] = React.useState('');
  const [editCustomerAddress, setEditCustomerAddress] = React.useState('');
  const [editPaymentMethod, setEditPaymentMethod] = React.useState('');
  const [savingEdit, setSavingEdit] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Order | null>(null);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('sale_type', 'Shop')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (role === 'admin') {
      fetchOrders();
    }
  }, [role, fetchOrders]);

  const togglePaymentStatus = async (orderId: string, currentStatus: string) => {
    setUpdatingId(orderId);
    const newStatus = currentStatus === 'Confirmed' ? 'Check' : 'Confirmed';
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, payment_status: newStatus as any } : o))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const periodSummary = React.useMemo(() => {
    const grouped: Record<string, Record<string, number>> = {};
    orders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? date.toLocaleDateString()
          : viewMode === 'monthly'
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            : `${date.getFullYear()}`;
      const method = order.payment_method || 'Unknown';
      grouped[key] = grouped[key] || {};
      grouped[key][method] = (grouped[key][method] || 0) + (order.total_amount || 0);
    });
    return grouped;
  }, [orders, viewMode]);

  const openReceipt = (order: Order) => {
    setSelectedReceipt(order.receipt_payload ?? null);
    setReceiptOpen(true);
  };

  const openEdit = (order: Order) => {
    setEditingOrder(order);
    setEditCustomerName(order.customer_name || '');
    setEditCustomerPhone(order.customer_phone || '');
    setEditCustomerAddress(order.customer_address || '');
    setEditPaymentMethod(order.payment_method || '');
    setEditOpen(true);
  };

  const saveEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingOrder) return;
    setSavingEdit(true);
    const res = await fetch(`/api/orders/${editingOrder.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: editCustomerName.trim() || null,
        customer_phone: editCustomerPhone.trim() || null,
        customer_address: editCustomerAddress.trim() || null,
        payment_method: editPaymentMethod.trim() || null,
      }),
    });
    if (res.ok) {
      fetchOrders();
      setEditOpen(false);
    }
    setSavingEdit(false);
  };

  const deleteOrder = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    const res = await fetch(`/api/orders/${deleteTarget.id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchOrders();
    }
    setDeletingId(null);
    setDeleteTarget(null);
  };

  if (role !== 'admin') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Shop Sales Log
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Sales reports are available to admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Shop Sales Log
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Summary (By Payment Method)
          </div>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as typeof viewMode)}
            className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="space-y-2">
          {Object.keys(periodSummary).length === 0 && (
            <div className="text-xs text-muted-foreground">No summary available.</div>
          )}
          {Object.entries(periodSummary).map(([date, methods]) => (
            <div key={date} className="space-y-1">
              <div className="text-base font-semibold">{date}</div>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(methods).map(([method, total]) => (
                  <span key={method} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
                    {method}: {total.toLocaleString()} Ks
                  </span>
                ))}
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold">
                  Total: {Object.values(methods).reduce((a, b) => a + b, 0).toLocaleString()} Ks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && orders.length === 0 ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full table-fixed text-sm text-left">
              <thead className="sticky top-0 z-10 bg-background/90 backdrop-blur text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2">Invoice</th>
                  <th className="px-2 py-2 hidden lg:table-cell">Customer</th>
                  <th className="px-2 py-2">Payment Method</th>
                  <th className="px-2 py-2 text-right">Amount</th>
                  <th className="px-2 py-2 text-center hidden lg:table-cell">Payment Status</th>
                  <th className="px-2 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => {
                  const date = new Date(order.created_at).toLocaleDateString();
                  const isConfirmed = order.payment_status === 'Confirmed';

                  return (
                <tr
                  key={order.id}
                  className="hover:bg-secondary/20 transition-colors cursor-pointer"
                  onClick={() => openReceipt(order)}
                >
                      <td className="px-2 py-2 text-xs whitespace-normal md:whitespace-nowrap text-muted-foreground">
                        {date}
                      </td>
                      <td className="px-2 py-2 text-xs font-mono font-medium break-words">
                        <span className="underline decoration-dotted underline-offset-4">
                          {order.invoice_id}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-xs hidden lg:table-cell">
                        {order.customer_name || '—'}
                      </td>
                      <td className="px-2 py-2 text-lg font-semibold break-words">
                        {order.payment_method || '—'}
                      </td>
                      <td className="px-2 py-2 text-right text-2xl font-bold">
                        {order.total_amount.toLocaleString()} Ks
                      </td>
                      <td className="px-2 py-2 text-center hidden lg:table-cell">
                        <Button
                          variant={isConfirmed ? 'ghost' : 'outline'}
                          size="sm"
                          className={`h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm gap-1.5 ${isConfirmed ? 'text-emerald-400 hover:text-emerald-300' : 'text-amber-400 hover:text-amber-300'}`}
                          onClick={() => togglePaymentStatus(order.id, order.payment_status)}
                          onPointerDown={(e) => e.stopPropagation()}
                          disabled={updatingId === order.id}
                        >
                          {updatingId === order.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : isConfirmed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          {order.payment_status}
                        </Button>
                      </td>
                      <td className="px-2 py-2 text-right">
                      <div className="flex justify-end gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                          onClick={() => openEdit(order)}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
                            disabled={deletingId === order.id}
                            onClick={() => setDeleteTarget(order)}
                          onPointerDown={(e) => e.stopPropagation()}
                          >
                            {deletingId === order.id ? 'Deleting...' : 'Delete'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No sales records found.
            </div>
          )}
        </div>
      )}
      <ReceiptModal open={receiptOpen} receipt={selectedReceipt} onClose={() => setReceiptOpen(false)} />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete sale record?"
        description={`Are you sure you want to delete invoice "${deleteTarget?.invoice_id ?? ''}"? Stock will be restored.`}
        confirmLabel="Delete"
        onConfirm={deleteOrder}
        onCancel={() => setDeleteTarget(null)}
        confirmVariant="destructive"
        loading={deleteTarget ? deletingId === deleteTarget.id : false}
      />
      {editOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-lg border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Edit Sale</div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={() => setEditOpen(false)}
              >
                Close
              </Button>
            </div>
            <form className="grid gap-3 text-xs md:grid-cols-2" onSubmit={saveEdit}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Customer Name</label>
                <Input value={editCustomerName} onChange={(e) => setEditCustomerName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Phone</label>
                <Input value={editCustomerPhone} onChange={(e) => setEditCustomerPhone(e.target.value)} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Address</label>
                <Input value={editCustomerAddress} onChange={(e) => setEditCustomerAddress(e.target.value)} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Payment Method</label>
                <Input value={editPaymentMethod} onChange={(e) => setEditPaymentMethod(e.target.value)} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={savingEdit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {savingEdit ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
