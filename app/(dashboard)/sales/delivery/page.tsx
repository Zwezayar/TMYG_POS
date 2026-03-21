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
  delivery_fee: number | null;
  courier_name: string | null;
  created_at: string;
  sale_type: 'Shop' | 'Delivery';
  receipt_payload: ReceiptPayload | null;
};

export default function DeliverySalesLogPage() {
  const { role } = useDashboardAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [selectedCourier, setSelectedCourier] = React.useState<string>('all');
  const [receiptOpen, setReceiptOpen] = React.useState(false);
  const [selectedReceipt, setSelectedReceipt] = React.useState<ReceiptPayload | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [editCustomerName, setEditCustomerName] = React.useState('');
  const [editCustomerPhone, setEditCustomerPhone] = React.useState('');
  const [editCustomerAddress, setEditCustomerAddress] = React.useState('');
  const [editCourierName, setEditCourierName] = React.useState('');
  const [editDeliveryFee, setEditDeliveryFee] = React.useState('');
  const [editPaymentMethod, setEditPaymentMethod] = React.useState('');
  const [savingEdit, setSavingEdit] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Order | null>(null);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('sale_type', 'Delivery')
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

  const filteredOrders = React.useMemo(() => {
    if (selectedCourier === 'all') return orders;
    return orders.filter((order) => (order.courier_name || 'Unknown') === selectedCourier);
  }, [orders, selectedCourier]);

  const periodSummary = React.useMemo(() => {
    const summary: Record<string, { methods: Record<string, number>; fees: number }> = {};
    filteredOrders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? date.toLocaleDateString()
          : viewMode === 'monthly'
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            : `${date.getFullYear()}`;
      const method = order.payment_method || 'Unknown';
      const deliveryFee = Number(order.delivery_fee || 0);
      const collected = (order.total_amount || 0) + deliveryFee;
      if (!summary[key]) {
        summary[key] = { methods: {}, fees: 0 };
      }
      summary[key].methods[method] = (summary[key].methods[method] || 0) + collected;
      summary[key].fees += deliveryFee;
    });
    return summary;
  }, [filteredOrders, viewMode]);

  const courierPeriodTotals = React.useMemo(() => {
    const totals: Record<string, Record<string, number>> = {};
    filteredOrders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? date.toLocaleDateString()
          : viewMode === 'monthly'
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            : `${date.getFullYear()}`;
      const courier = order.courier_name || 'Unknown';
      totals[key] = totals[key] || {};
      totals[key][courier] = (totals[key][courier] || 0) + Number(order.delivery_fee || 0);
    });
    return totals;
  }, [filteredOrders, viewMode]);

  const courierOptions = React.useMemo(() => {
    const set = new Set<string>();
    orders.forEach((order) => {
      set.add(order.courier_name || 'Unknown');
    });
    return Array.from(set).sort();
  }, [orders]);

  const openReceipt = (order: Order) => {
    setSelectedReceipt(order.receipt_payload ?? null);
    setReceiptOpen(true);
  };

  const openEdit = (order: Order) => {
    setEditingOrder(order);
    setEditCustomerName(order.customer_name || '');
    setEditCustomerPhone(order.customer_phone || '');
    setEditCustomerAddress(order.customer_address || '');
    setEditCourierName(order.courier_name || '');
    setEditDeliveryFee(order.delivery_fee != null ? String(order.delivery_fee) : '');
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
        courier_name: editCourierName.trim() || null,
        delivery_fee: editDeliveryFee.trim() ? Number(editDeliveryFee) : 0,
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
          Delivery Sales Log
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Sales reports are available to admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Delivery Sales Log
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="border-cyan-400/70 text-cyan-400 hover:bg-cyan-500/10"
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Summary
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-transparent px-2 text-xs"
            >
              <option value="all">All Couriers</option>
              {courierOptions.map((courier) => (
                <option key={courier} value={courier}>{courier}</option>
              ))}
            </select>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as typeof viewMode)}
              className="flex h-9 rounded-md border border-input bg-transparent px-2 text-xs"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        {Object.keys(periodSummary).length === 0 && (
          <div className="text-xs text-muted-foreground">No summary available.</div>
        )}
        {Object.entries(periodSummary).map(([date, summary]) => {
          const totalCollected = Object.values(summary.methods).reduce((a, b) => a + b, 0);
          const netSale = totalCollected - summary.fees;
          return (
            <div key={date} className="space-y-2">
            <div className="text-2xl font-semibold">{date}</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(summary.methods).map(([method, total]) => (
                <span key={method} className="rounded-full bg-secondary px-3 py-2 text-base font-semibold">
                  {method}: {total.toLocaleString()} Ks
                  </span>
                ))}
              <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-base font-semibold">
                Net Sale: {netSale.toLocaleString()} Ks
                </span>
              </div>
            <div className="text-base font-bold text-orange-500">
                Total Delivery Fees: {summary.fees.toLocaleString()} Ks
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Courier Fee Totals
        </div>
        <div className="space-y-3">
          {Object.keys(courierPeriodTotals).length === 0 && (
            <div className="text-xs text-muted-foreground">No courier data.</div>
          )}
          {Object.entries(courierPeriodTotals).map(([period, totals]) => (
            <div key={period} className="space-y-2">
              <div className="text-lg font-semibold">{period}</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(totals).map(([courier, total]) => (
                  <span key={courier} className="rounded-full bg-secondary px-3 py-2 text-base font-semibold">
                    {courier}: {total.toLocaleString()} Ks
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && orders.length === 0 ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="max-h-[50vh] overflow-y-auto">
            <table className="w-full table-fixed text-sm text-left">
              <thead className="bg-secondary/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2">Invoice</th>
                  <th className="px-2 py-2 hidden lg:table-cell">Customer</th>
                  <th className="px-2 py-2">Courier</th>
                  <th className="px-2 py-2 text-right">Delivery Fee</th>
                  <th className="px-2 py-2">Payment Method</th>
                  <th className="px-2 py-2 text-right">Collected</th>
                  <th className="px-2 py-2 text-center hidden lg:table-cell">Payment Status</th>
                  <th className="px-2 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => {
                  const date = new Date(order.created_at).toLocaleDateString();
                  const isConfirmed = order.payment_status === 'Confirmed';
                  const deliveryFee = Number(order.delivery_fee || 0);
                  const collected = (order.total_amount || 0) + deliveryFee;

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
                      <td className="px-2 py-2 text-xs">
                        {order.courier_name || '—'}
                      </td>
                      <td className="px-2 py-2 text-right text-xs font-semibold">
                        {deliveryFee.toLocaleString()} Ks
                      </td>
                      <td className="px-2 py-2 text-lg font-semibold break-words">
                        {order.payment_method || '—'}
                      </td>
                      <td className="px-2 py-2 text-right text-2xl font-bold">
                        {collected.toLocaleString()} Ks
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
                          className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-cyan-400/70 text-cyan-400 hover:bg-cyan-500/10"
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
              No delivery records found.
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
              <div className="text-sm font-semibold">Edit Delivery Sale</div>
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/70 text-cyan-400 hover:bg-cyan-500/10"
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
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Courier</label>
                <Input value={editCourierName} onChange={(e) => setEditCourierName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Delivery Fee</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={editDeliveryFee}
                  onChange={(e) => setEditDeliveryFee(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">Payment Method</label>
                <Input value={editPaymentMethod} onChange={(e) => setEditPaymentMethod(e.target.value)} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-cyan-400/70 text-cyan-400 hover:bg-cyan-500/10"
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
