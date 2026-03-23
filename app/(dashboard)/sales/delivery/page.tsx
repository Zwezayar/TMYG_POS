'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ReceiptModal, type ReceiptPayload } from '@/components/receipt-modal';
import { downloadSalesXlsx, type SalesExportRow } from '@/lib/excel';
import { formatDateDDMMYYYY, formatDateRangeDDMMYYYY } from '@/lib/date';
import { useT } from '@/components/language-provider';
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
  const t = useT();
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
  const [query, setQuery] = React.useState('');
  const [monthFilter, setMonthFilter] = React.useState('');
  const [exporting, setExporting] = React.useState(false);
  const [toasts, setToasts] = React.useState<{ id: number; type: 'success' | 'error'; message: string }[]>([]);

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

  const monthFilteredOrders = React.useMemo(() => {
    if (!monthFilter) return orders;
    const [yearText, monthText] = monthFilter.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    if (!year || !month) return orders;
    return orders.filter((order) => {
      const date = new Date(order.created_at);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  }, [orders, monthFilter]);

  const courierFilteredOrders = React.useMemo(() => {
    if (selectedCourier === 'all') return monthFilteredOrders;
    return monthFilteredOrders.filter((order) => (order.courier_name || 'Unknown') === selectedCourier);
  }, [monthFilteredOrders, selectedCourier]);

  const filteredOrders = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = courierFilteredOrders;
    if (!q) return base;
    return base.filter((order) => {
      const invoice = (order.invoice_id ?? '').toLowerCase();
      const customer = (order.customer_name ?? '').toLowerCase();
      const phone = (order.customer_phone ?? '').toLowerCase();
      const courier = (order.courier_name ?? '').toLowerCase();
      const payment = (order.payment_method ?? '').toLowerCase();
      return (
        invoice.includes(q) ||
        customer.includes(q) ||
        phone.includes(q) ||
        courier.includes(q) ||
        payment.includes(q)
      );
    });
  }, [courierFilteredOrders, query]);

  const groupedOrders = React.useMemo(() => {
    const dateMap = new Map<string, Map<string, Order[]>>();
    filteredOrders.forEach((order) => {
      const dateKey = formatDateDDMMYYYY(order.created_at);
      const courierKey = order.courier_name || 'Unknown';
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, new Map());
      }
      const courierMap = dateMap.get(dateKey)!;
      if (!courierMap.has(courierKey)) {
        courierMap.set(courierKey, []);
      }
      courierMap.get(courierKey)!.push(order);
    });
    const entries = Array.from(dateMap.entries());
    entries.sort((a, b) => {
      const timeA = Date.parse(a[1].values().next().value?.[0]?.created_at ?? '');
      const timeB = Date.parse(b[1].values().next().value?.[0]?.created_at ?? '');
      return timeB - timeA;
    });
    return entries;
  }, [filteredOrders]);

  const buildItemSummary = (order: Order) => {
    const items = order.receipt_payload?.items ?? [];
    if (!items.length) return '—';
    return items.map((item) => `${item.name} x${item.qty}`).join(', ');
  };

  const getStatusLabel = (status: string | null) =>
    status === 'Confirmed' ? t('statusConfirmed') : t('statusCheck');

  const addToast = React.useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const handleExportExcel = React.useCallback(async () => {
    setExporting(true);
    try {
      const allDates = filteredOrders.map((order) => new Date(order.created_at).getTime()).sort((a, b) => b - a);
      const latest = allDates[0];
      const oldest = allDates[allDates.length - 1];
      const dateRange = latest ? formatDateRangeDDMMYYYY(new Date(latest), new Date(oldest)) : '—';
      const totalSales = filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      const totalFees = filteredOrders.reduce((sum, order) => sum + Number(order.delivery_fee || 0), 0);

      const rows: SalesExportRow[] = [];
      let serial = 1;
      groupedOrders.forEach(([dateKey, courierMap]) => {
        rows.push({
          kind: 'group',
          cells: ['', dateKey, '', '', '', '', '', '', ''],
        });
        Array.from(courierMap.entries()).forEach(([courierName, courierOrders]) => {
          const totalFee = courierOrders.reduce((sum, o) => sum + Number(o.delivery_fee || 0), 0);
          rows.push({
            kind: 'subgroup',
            cells: ['', '', '', '', courierName, totalFee, t('subtotal'), '', ''],
          });
          courierOrders.forEach((order) => {
            const deliveryFee = Number(order.delivery_fee || 0);
            rows.push({
              kind: 'data',
              cells: [
                serial++,
                dateKey,
                order.invoice_id ?? '',
                order.customer_name ?? '',
                order.courier_name ?? '',
                deliveryFee,
                buildItemSummary(order),
                (order.total_amount || 0) + deliveryFee,
                getStatusLabel(order.payment_status ?? ''),
              ],
            });
          });
        });
      });

      await downloadSalesXlsx({
        filename: 'delivery-sales-log.xlsx',
        title: t('deliverySalesLogTitle'),
        summaryRows: [
          [t('dateRange'), dateRange],
          [t('totalSales'), totalSales],
          [t('totalFees'), totalFees],
        ],
        columns: [
          t('number'),
          t('date'),
          t('invoice'),
          t('customer'),
          t('courier'),
          t('deliveryFee'),
          t('itemsSummary'),
          t('totalAmount'),
          t('status'),
        ],
        rows,
      });
      addToast('success', t('exportSuccess'));
    } catch {
      addToast('error', t('exportError'));
    } finally {
      setExporting(false);
    }
  }, [filteredOrders, groupedOrders, t, addToast]);

  const periodSummary = React.useMemo(() => {
    const summary: Record<string, { methods: Record<string, number>; fees: number }> = {};
    courierFilteredOrders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? formatDateDDMMYYYY(date)
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
  }, [courierFilteredOrders, viewMode]);

  const courierPeriodTotals = React.useMemo(() => {
    const totals: Record<string, Record<string, number>> = {};
    courierFilteredOrders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? formatDateDDMMYYYY(date)
          : viewMode === 'monthly'
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            : `${date.getFullYear()}`;
      const courier = order.courier_name || 'Unknown';
      totals[key] = totals[key] || {};
      totals[key][courier] = (totals[key][courier] || 0) + Number(order.delivery_fee || 0);
    });
    return totals;
  }, [courierFilteredOrders, viewMode]);

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
          {t('deliverySalesLogTitle')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('accessRestricted')} {t('salesAdminOnly')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          {t('deliverySalesLogTitle')}
        </h1>
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchDeliveryPlaceholder')}
            className="h-9 w-64"
          />
          <Input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="h-9 w-40"
            placeholder={t('monthFilter')}
          />
          <Button
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={handleExportExcel}
            disabled={loading || exporting}
          >
            {t('downloadExcel')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('refresh')}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t('summary')}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
              className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs"
            >
              <option value="all">{t('allCouriers')}</option>
              {courierOptions.map((courier) => (
                <option key={courier} value={courier}>{courier}</option>
              ))}
            </select>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as typeof viewMode)}
              className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs"
            >
              <option value="daily">{t('daily')}</option>
              <option value="monthly">{t('monthly')}</option>
              <option value="yearly">{t('yearly')}</option>
            </select>
          </div>
        </div>
        {Object.keys(periodSummary).length === 0 && (
          <div className="text-xs text-muted-foreground">{t('noSummary')}</div>
        )}
        {Object.entries(periodSummary).map(([date, summary]) => {
          const totalCollected = Object.values(summary.methods).reduce((a, b) => a + b, 0);
          const netSale = totalCollected - summary.fees;
          const courierTotals = courierPeriodTotals[date] ?? {};
          return (
            <div key={date} className="space-y-2">
              <div className="text-base font-semibold">{date}</div>
              <div className="grid gap-2 md:grid-cols-4">
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('collected')}</div>
                  <div className="text-sm font-semibold">{totalCollected.toLocaleString()} Ks</div>
                </div>
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('netSale')}</div>
                  <div className="text-sm font-semibold">{netSale.toLocaleString()} Ks</div>
                </div>
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('courierFees')}</div>
                  <div className="text-sm font-semibold">{summary.fees.toLocaleString()} Ks</div>
                </div>
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('couriers')}</div>
                  <div className="text-xs font-semibold">
                    {Object.keys(courierTotals).length === 0
                      ? '—'
                      : Object.entries(courierTotals)
                          .map(([courier, total]) => `${courier}: ${total.toLocaleString()} Ks`)
                          .join(' • ')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
                  <th className="px-2 py-2">{t('date')}</th>
                  <th className="px-2 py-2">{t('invoice')}</th>
                  <th className="px-2 py-2 hidden lg:table-cell">{t('customer')}</th>
                  <th className="px-2 py-2">{t('courier')}</th>
                  <th className="px-2 py-2 text-right">{t('deliveryFee')}</th>
                  <th className="px-2 py-2">{t('paymentMethod')}</th>
                  <th className="px-2 py-2 text-right">{t('collected')}</th>
                  <th className="px-2 py-2 text-center hidden lg:table-cell">{t('status')}</th>
                  <th className="px-2 py-2 text-right">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {groupedOrders.map(([dateKey, courierMap]) => (
                  <React.Fragment key={dateKey}>
                    <tr className="sticky top-8 z-10 bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                      <td colSpan={9} className="px-2 py-2 text-xs font-bold">
                        {dateKey}
                      </td>
                    </tr>
                    {Array.from(courierMap.entries()).map(([courierName, courierOrders]) => {
                      const totalFee = courierOrders.reduce((sum, o) => sum + Number(o.delivery_fee || 0), 0);
                      return (
                        <React.Fragment key={`${dateKey}-${courierName}`}>
                          <tr className="bg-secondary/30 text-muted-foreground">
                            <td colSpan={9} className="px-2 py-2 text-xs font-semibold">
                              {courierName} • {courierOrders.length} {t('ordersLabel')} • {t('feesLabel')} {totalFee.toLocaleString()} Ks
                            </td>
                          </tr>
                          {courierOrders.map((order) => {
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
                                  {dateKey}
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
                                    {getStatusLabel(order.payment_status)}
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
                                      {t('edit')}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
                                      disabled={deletingId === order.id}
                                      onClick={() => setDeleteTarget(order)}
                                      onPointerDown={(e) => e.stopPropagation()}
                                    >
                                      {deletingId === order.id ? t('deleting') : t('delete')}
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              {t('noDeliveryRecords')}
            </div>
          )}
        </div>
      )}
      <ReceiptModal open={receiptOpen} receipt={selectedReceipt} onClose={() => setReceiptOpen(false)} />
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('deleteSaleRecordTitle')}
        description={`${t('deleteSaleRecordDesc')} ${deleteTarget?.invoice_id ? `"${deleteTarget.invoice_id}"` : ''}`}
        confirmLabel={t('delete')}
        onConfirm={deleteOrder}
        onCancel={() => setDeleteTarget(null)}
        confirmVariant="destructive"
        loading={deleteTarget ? deletingId === deleteTarget.id : false}
      />
      {editOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-lg border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">{t('editDeliveryTitle')}</div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={() => setEditOpen(false)}
              >
                {t('close')}
              </Button>
            </div>
            <form className="grid gap-3 text-xs md:grid-cols-2" onSubmit={saveEdit}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('customerName')}</label>
                <Input value={editCustomerName} onChange={(e) => setEditCustomerName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('phone')}</label>
                <Input value={editCustomerPhone} onChange={(e) => setEditCustomerPhone(e.target.value)} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">{t('address')}</label>
                <Input value={editCustomerAddress} onChange={(e) => setEditCustomerAddress(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('courier')}</label>
                <Input value={editCourierName} onChange={(e) => setEditCourierName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('deliveryFee')}</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={editDeliveryFee}
                  onChange={(e) => setEditDeliveryFee(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">{t('paymentMethod')}</label>
                <Input value={editPaymentMethod} onChange={(e) => setEditPaymentMethod(e.target.value)} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setEditOpen(false)}
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" disabled={savingEdit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {savingEdit ? t('saving') : t('save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {exporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 shadow-xl">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <div className="text-sm font-semibold">{t('exportLoading')}</div>
          </div>
        </div>
      )}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`rounded-md border px-4 py-3 text-base font-semibold shadow-md ${toast.type === 'success'
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                : 'border-destructive/60 bg-destructive/10 text-destructive'
                }`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
