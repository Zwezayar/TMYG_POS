'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Loader2,
  Minus,
  Package,
  Plus,
  Search,
  Store,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { useProducts, type Product } from '@/lib/useProducts';
import { useCategories } from '@/lib/useCategories';
import { formatDateDDMMYYYY } from '@/lib/date';

type DeliveryPartner = {
  id: string;
  name: string;
};

type BulkSaleLine = {
  productId: number;
  quantity: number;
};

type Toast = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

function getTodayInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getValidImageUrl(url: string | null | undefined) {
  if (!url) return null;
  if (
    url.startsWith('http') ||
    url.startsWith('data:') ||
    url.includes('supabase.co/storage')
  ) {
    return url;
  }
  if (url.startsWith('/')) {
    return url;
  }
  return null;
}

export default function BulkSalePage() {
  const { role, displayName, username } = useDashboardAuth();
  const { products, loading: productsLoading, error: productsError, refresh } =
    useProducts();
  const { categories: dbCategories } = useCategories();
  const [mode, setMode] = React.useState<'Shop' | 'Delivery'>('Shop');
  const [saleDate, setSaleDate] = React.useState(getTodayInputValue);
  const [deliveryPartners, setDeliveryPartners] = React.useState<DeliveryPartner[]>([]);
  const [partnersLoading, setPartnersLoading] = React.useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [lines, setLines] = React.useState<BulkSaleLine[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [successSummary, setSuccessSummary] = React.useState<{
    invoiceId: string;
    date: string;
    totalAmount: number;
  } | null>(null);

  const addToast = React.useCallback((type: Toast['type'], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchPartners = React.useCallback(async () => {
    setPartnersLoading(true);
    try {
      const res = await fetch('/api/delivery-partners');
      const data = await res.json().catch(() => []);
      if (!res.ok) {
        throw new Error(data?.error || res.statusText);
      }
      setDeliveryPartners((data ?? []) as DeliveryPartner[]);
    } catch (err) {
      addToast(
        'error',
        err instanceof Error ? err.message : 'Failed to load delivery partners.'
      );
      setDeliveryPartners([]);
    } finally {
      setPartnersLoading(false);
    }
  }, [addToast]);

  React.useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  React.useEffect(() => {
    if (mode === 'Shop') {
      setSelectedPartnerId('');
    }
  }, [mode]);

  const categoryOptions = React.useMemo(() => {
    if (dbCategories.length > 0) {
      return Array.from(
        new Set(
          dbCategories
            .map((category) => category.name.split('/').pop()?.trim() || category.name)
            .filter(Boolean)
        )
      );
    }
    return Array.from(
      new Set(
        products
          .map((product) => product.category?.split('/').pop()?.trim() || product.category || '')
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  }, [dbCategories, products]);

  const productMap = React.useMemo(
    () => new Map(products.map((product) => [Number(product.id), product])),
    [products]
  );

  const filteredProducts = React.useMemo(() => {
    const search = query.trim().toLowerCase();
    const list = products
      .filter((product) => Number(product.stock_quantity ?? 0) > 0)
      .filter((product) => {
        if (!selectedCategory) return true;
        const category =
          product.category?.split('/').pop()?.trim() || product.category || '';
        return category === selectedCategory || product.category === selectedCategory;
      })
      .sort((a, b) =>
        (a.product_name ?? '').localeCompare(b.product_name ?? '', undefined, {
          sensitivity: 'base',
        })
      );
    if (!search) return list;
    return list
      .filter((product) => {
        const fields = [
          product.product_name,
          product.category,
          product.barcode,
          product.default_code,
          product.size,
          product.variant,
        ];
        return fields.some((field) => field?.toLowerCase().includes(search));
      });
  }, [products, query, selectedCategory]);

  const lineItems = React.useMemo(() => {
    return lines
      .map((line) => {
        const product = productMap.get(line.productId);
        return product
          ? {
              line,
              product,
              unitPrice: Number(product.sale_price ?? 0),
              stock: Number(product.stock_quantity ?? 0),
            }
          : null;
      })
      .filter(
        (entry): entry is {
          line: BulkSaleLine;
          product: Product;
          unitPrice: number;
          stock: number;
        } => entry !== null
      );
  }, [lines, productMap]);

  const totals = React.useMemo(() => {
    return lineItems.reduce(
      (sum, entry) => {
        sum.quantity += entry.line.quantity;
        sum.amount += entry.line.quantity * entry.unitPrice;
        return sum;
      },
      { quantity: 0, amount: 0 }
    );
  }, [lineItems]);

  const addProduct = (productId: number) => {
    setSuccessSummary(null);
    setLines((prev) => {
      const product = productMap.get(productId);
      const maxStock = Math.max(0, Number(product?.stock_quantity ?? 0));
      if (maxStock <= 0) {
        return prev;
      }
      const existing = prev.find((line) => line.productId === productId);
      if (existing) {
        return prev.map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.min(maxStock, Math.max(1, line.quantity + 1)) }
            : line
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, nextQuantity: number) => {
    setSuccessSummary(null);
    setLines((prev) =>
      prev
        .map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.max(1, Math.floor(nextQuantity || 1)) }
            : line
        )
        .filter((line) => line.quantity > 0)
    );
  };

  const removeLine = (productId: number) => {
    setSuccessSummary(null);
    setLines((prev) => prev.filter((line) => line.productId !== productId));
  };

  const selectedPartnerName =
    deliveryPartners.find((partner) => partner.id === selectedPartnerId)?.name ?? '';

  const canSave =
    lineItems.length > 0 &&
    !!saleDate &&
    !saving &&
    (!productsLoading || lineItems.length > 0) &&
    (mode === 'Shop' || !!selectedPartnerId);

  const handleConfirm = async () => {
    if (!canSave) return;
    if (mode === 'Delivery' && !selectedPartnerId) {
      addToast('error', 'Please choose a delivery partner.');
      return;
    }

    const hasInvalidQty = lineItems.some(
      (entry) => entry.line.quantity < 1 || entry.line.quantity > entry.stock
    );
    if (hasInvalidQty) {
      addToast('error', 'Please check quantities against current stock.');
      return;
    }

    setSaving(true);
    setSuccessSummary(null);
    try {
      const { data } = await supabaseClient.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        throw new Error('Session expired.');
      }

      const res = await fetch('/api/bulk-sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sale_type: mode,
          sale_date: saleDate,
          delivery_partner_id: mode === 'Delivery' ? selectedPartnerId : null,
          items: lineItems.map((entry) => ({
            product_id: Number(entry.product.id),
            quantity: entry.line.quantity,
          })),
        }),
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result?.error || 'Bulk sale failed.');
      }

      await refresh();
      setLines([]);
      setQuery('');
      setSuccessSummary({
        invoiceId: result.invoiceId as string,
        date: formatDateDDMMYYYY(`${saleDate}T12:00:00.000Z`),
        totalAmount: totals.amount,
      });
      addToast('success', `Bulk sale saved successfully. Invoice ${result.invoiceId}.`);
    } catch (err) {
      addToast(
        'error',
        err instanceof Error ? err.message : 'Bulk sale failed.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (!role) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Bulk Sale Entry
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
          Bulk Sale Entry
        </h1>
        <p className="text-sm text-muted-foreground">Access restricted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            Bulk Sale Entry
          </h1>
          <p className="text-sm text-muted-foreground">
            Add many sold items quickly, backdate when needed, and keep delivery
            partner names consistent.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Logged in as {displayName || username || 'Staff'}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[auto_auto_1fr]">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Mode
                </div>
                <div className="flex rounded-xl border border-border bg-background p-1">
                  <button
                    type="button"
                    onClick={() => setMode('Shop')}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${mode === 'Shop'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Store className="h-4 w-4" />
                    Shop
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('Delivery')}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${mode === 'Delivery'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Truck className="h-4 w-4" />
                    Delivery
                  </button>
                </div>
              </div>

              <label className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sale Date
                </div>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="date"
                    value={saleDate}
                    max={getTodayInputValue()}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="h-11 pl-9"
                  />
                </div>
              </label>

              <label className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Delivery Partner
                </div>
                <select
                  value={selectedPartnerId}
                  onChange={(e) => setSelectedPartnerId(e.target.value)}
                  disabled={mode !== 'Delivery' || partnersLoading}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {mode === 'Delivery'
                      ? partnersLoading
                        ? 'Loading partners...'
                        : 'Select delivery partner'
                      : 'Not required in Shop mode'}
                  </option>
                  {deliveryPartners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {mode === 'Delivery' && !partnersLoading && deliveryPartners.length === 0 && (
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
                No delivery partners found. Add them in{' '}
                <Link href="/settings/delivery-partners" className="font-semibold underline underline-offset-2">
                  Settings
                </Link>
                .
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div>
              <div className="text-base font-semibold">Quick Item Entry</div>
              <p className="text-sm text-muted-foreground">
                Search products and tap Add to build today&apos;s sale.
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background/50">
              <div className="border-b border-border bg-card">
                <div className="flex items-center gap-2 px-4 py-4">
                  <div className="relative min-w-0 flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name, barcode, category, or size"
                      className="h-[48px] w-full rounded-xl border border-border bg-muted/30 pl-10 pr-8 text-base font-medium transition-all focus-visible:border-primary/50 focus-visible:ring-primary/20"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 border-none bg-transparent p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto px-4 pb-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(null)}
                    className={`h-9 rounded-full px-4 text-xs font-bold whitespace-nowrap ${selectedCategory === null
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    All Products
                  </Button>
                  {categoryOptions.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      onClick={() => setSelectedCategory(category)}
                      className={`h-9 rounded-full px-4 text-xs font-bold whitespace-nowrap ${selectedCategory === category
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="max-h-[68vh] min-h-[420px] overflow-y-auto bg-background p-3 sm:p-4">
                {productsLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 pb-4 min-[820px]:grid-cols-3 2xl:grid-cols-4">
                    {filteredProducts.map((product) => {
                      const stock = Number(product.stock_quantity ?? 0);
                      const imageUrl = getValidImageUrl(product.image_url);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addProduct(Number(product.id))}
                          className="group relative flex min-h-[280px] touch-manipulation flex-col overflow-hidden rounded-xl border border-border bg-card p-2 text-left transition-all hover:border-primary/30 hover:shadow-lg"
                        >
                          <div className="relative h-32 w-full flex-none shrink-0 overflow-hidden rounded-md bg-muted">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={product.product_name || ''}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                                <Package className="mb-1 h-8 w-8 opacity-30" />
                                <span className="text-[10px] font-medium uppercase">
                                  No Image
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden pt-2">
                            <p className="min-h-[3.5rem] line-clamp-3 text-[12px] font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                              {product.product_name || '—'}
                            </p>

                            <div className="mt-1 flex flex-col gap-1.5">
                              <span className="inline-flex max-w-full self-start truncate rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                                {product.size ||
                                  (product.default_code
                                    ? `SKU: ${product.default_code}`
                                    : 'Standard')}
                              </span>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[14px] font-black text-[#8B5CF6]">
                                  Ks {Number(product.sale_price ?? 0).toLocaleString()}
                                </span>
                                <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                  {stock} left
                                </span>
                              </div>
                            </div>

                            <div className="mt-auto pt-2">
                              <div className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-primary text-[12px] font-black text-primary-foreground shadow-sm transition-all group-hover:bg-primary/90">
                                <Plus className="h-4 w-4" />
                                Add
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <div className="mb-4 rounded-full bg-muted p-4">
                      <Package className="h-8 w-8 opacity-20" />
                    </div>
                    <p className="text-sm font-bold">
                      {productsError || 'No products found'}
                    </p>
                    <p className="text-xs opacity-60">
                      Try adjusting your search or category
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold">Selected Items</div>
                <p className="text-sm text-muted-foreground">
                  Adjust quantities before confirming stock deduction.
                </p>
              </div>
              <div className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {lineItems.length} lines
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {lineItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                  Add products from the left to start a bulk sale.
                </div>
              ) : (
                lineItems.map((entry) => {
                  const remainingStock = Math.max(
                    0,
                    entry.stock - entry.line.quantity
                  );
                  return (
                    <div
                      key={entry.product.id}
                      className="rounded-2xl border border-border/60 bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">
                            {entry.product.product_name || 'Unnamed Product'}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Stock now: {entry.stock} • After save: {remainingStock}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(Number(entry.product.id))}
                          className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                Number(entry.product.id),
                                Math.max(1, entry.line.quantity - 1)
                              )
                            }
                            className="rounded-xl border border-border p-2 transition hover:bg-secondary"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <Input
                            type="number"
                            min={1}
                            max={entry.stock}
                            value={entry.line.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                Number(entry.product.id),
                                Number(e.target.value)
                              )
                            }
                            className="h-11 w-24 text-center"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                Number(entry.product.id),
                                Math.min(entry.stock, entry.line.quantity + 1)
                              )
                            }
                            className="rounded-xl border border-border p-2 transition hover:bg-secondary"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            Unit Price
                          </div>
                          <div className="text-sm font-semibold">
                            Ks {entry.unitPrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            Line Total
                          </div>
                          <div className="text-base font-semibold">
                            Ks {(entry.line.quantity * entry.unitPrice).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium">{mode}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {formatDateDDMMYYYY(`${saleDate}T12:00:00.000Z`)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Partner</span>
                <span className="font-medium">
                  {mode === 'Delivery' ? selectedPartnerName || 'Not selected' : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-medium">{totals.quantity}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">Total Amount</span>
                <span className="text-lg font-semibold">
                  Ks {totals.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!canSave}
              className="mt-4 h-12 w-full rounded-xl text-base font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving bulk sale...
                </>
              ) : (
                'Confirm Bulk Sale'
              )}
            </Button>

            <p className="mt-3 text-xs text-muted-foreground">
              Confirming saves one order with multiple line items, updates stock,
              and keeps the selected sale date for later reporting/export.
            </p>
          </div>

          {successSummary && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-100 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <div className="font-semibold">
                    Bulk sale saved successfully
                  </div>
                  <div className="mt-1 text-sm text-emerald-200">
                    Invoice {successSummary.invoiceId} • {successSummary.date} • Ks{' '}
                    {successSummary.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`rounded-xl border px-4 py-3 text-sm shadow-lg ${toast.type === 'success'
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100'
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
