'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Loader2,
  ShoppingBag,
  X,
  Store,
  Trash2,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScannerModal } from '@/components/scanner/scanner-modal';
import { AddProductDialog } from '@/components/inventory/add-product-dialog';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';
import { useProducts, type Product } from '@/lib/useProducts';
import { useCategories } from '@/lib/useCategories';
import { formatDateDDMMYYYY } from '@/lib/date';
import { MemoProductBrowser } from '@/components/product-browser';
import { PosCartItems } from '@/components/cart/pos-cart-items';
import {
  DeliveryPartnerSelect,
  type DeliveryPartnerOption,
} from '@/components/delivery-partner-select';

type BulkSaleLine = {
  productId: number;
  quantity: number;
  manualPrice?: number;
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

function normalizeBarcode(value: string | null | undefined) {
  return value?.trim().toLowerCase() || '';
}

export default function BulkSalePage() {
  const { role, displayName, username } = useDashboardAuth();
  const { products, loading: productsLoading, error: productsError, refresh } =
    useProducts();
  const { categories: dbCategories } = useCategories();
  const [mode, setMode] = React.useState<'Shop' | 'Delivery'>('Shop');
  const [saleDate, setSaleDate] = React.useState(getTodayInputValue);
  const [deliveryPartners, setDeliveryPartners] = React.useState<
    DeliveryPartnerOption[]
  >([]);
  const [partnersLoading, setPartnersLoading] = React.useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = React.useState('');
  const [deliveryFee, setDeliveryFee] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [scanOpen, setScanOpen] = React.useState(false);
  const [manualBarcodeInput, setManualBarcodeInput] = React.useState('');
  const [addProductOpen, setAddProductOpen] = React.useState(false);
  const [prefillBarcode, setPrefillBarcode] = React.useState('');
  const [lines, setLines] = React.useState<BulkSaleLine[]>([]);
  const [mobileCartOpen, setMobileCartOpen] = React.useState(false);
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
      setDeliveryPartners((data ?? []) as DeliveryPartnerOption[]);
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
      setDeliveryFee('');
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
              unitPrice: Number(line.manualPrice ?? product.sale_price ?? 0),
              basePrice: Number(product.sale_price ?? 0),
              stock: Number(product.stock_quantity ?? 0),
            }
          : null;
      })
      .filter(
        (entry): entry is {
          line: BulkSaleLine;
          product: Product;
          unitPrice: number;
          basePrice: number;
          stock: number;
        } => entry !== null
      );
  }, [lines, productMap]);

  const totals = React.useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, entry) => {
        sum.quantity += entry.line.quantity;
        sum.subtotal += entry.line.quantity * entry.unitPrice;
        return sum;
      },
      { quantity: 0, subtotal: 0 }
    );
    const fee = mode === 'Delivery' ? Math.max(0, Number(deliveryFee) || 0) : 0;
    return {
      quantity: subtotal.quantity,
      subtotal: subtotal.subtotal,
      deliveryFee: fee,
      grandTotal: subtotal.subtotal + fee,
    };
  }, [deliveryFee, lineItems, mode]);

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

  const handleCloseScanner = React.useCallback(() => {
    setScanOpen(false);
    setManualBarcodeInput('');
  }, []);

  const handleOpenCreateProduct = React.useCallback(
    (barcode = '') => {
      setPrefillBarcode(barcode);
      setAddProductOpen(true);
    },
    []
  );

  const handleScannedBarcode = React.useCallback(
    (rawValue: string) => {
      const value = rawValue.trim();
      if (!value) return;
      const matched = products.find(
        (product) => normalizeBarcode(product.barcode) === normalizeBarcode(value)
      );

      if (matched) {
        addProduct(Number(matched.id));
        addToast('success', `${matched.product_name || 'Product'} added.`);
        handleCloseScanner();
        return;
      }

      addToast('error', 'Product Not Found');
      handleCloseScanner();
      handleOpenCreateProduct(value);
    },
    [addProduct, addToast, handleCloseScanner, handleOpenCreateProduct, products]
  );

  const handleCreatedProduct = React.useCallback(
    async (product: Product) => {
      await refresh();
      const hasStock = Number(product.stock_quantity ?? 0) > 0;
      if (hasStock) {
        setLines((prev) => {
          const existing = prev.find((line) => line.productId === Number(product.id));
          if (existing) {
            return prev;
          }
          return [...prev, { productId: Number(product.id), quantity: 1 }];
        });
      }
      setPrefillBarcode('');
      addToast(
        'success',
        hasStock
          ? `${product.product_name || 'Product'} added to inventory and bulk sale.`
          : `${product.product_name || 'Product'} added to inventory.`
      );
    },
    [addToast, refresh]
  );

  const updateQuantity = (productId: number, nextQuantity: number) => {
    setSuccessSummary(null);
    if (nextQuantity <= 0) {
      setLines((prev) => prev.filter((line) => line.productId !== productId));
      return;
    }
    setLines((prev) =>
      prev
        .map((line) => {
          if (line.productId !== productId) return line;
          const maxStock = Math.max(
            1,
            Number(productMap.get(productId)?.stock_quantity ?? line.quantity)
          );
          return {
            ...line,
            quantity: Math.min(maxStock, Math.max(1, Math.floor(nextQuantity || 1))),
          };
        })
        .filter((line) => line.quantity > 0)
    );
  };

  const updateLinePrice = (productId: number, nextPrice: number) => {
    setSuccessSummary(null);
    setLines((prev) =>
      prev.map((line) =>
        line.productId === productId
          ? { ...line, manualPrice: Math.max(0, Number(nextPrice) || 0) }
          : line
      )
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
    if (!canSave) return false;
    if (mode === 'Delivery' && !selectedPartnerId) {
      addToast('error', 'Please choose a delivery partner.');
      return false;
    }

    const hasInvalidQty = lineItems.some(
      (entry) => entry.line.quantity < 1 || entry.line.quantity > entry.stock
    );
    if (hasInvalidQty) {
      addToast('error', 'Please check quantities against current stock.');
      return false;
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
          delivery_fee: totals.deliveryFee,
          items: lineItems.map((entry) => ({
            product_id: Number(entry.product.id),
            quantity: entry.line.quantity,
            sale_price: entry.unitPrice,
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
        totalAmount: totals.grandTotal,
      });
      addToast('success', `Bulk sale saved successfully. Invoice ${result.invoiceId}.`);
      return true;
    } catch (err) {
      addToast(
        'error',
        err instanceof Error ? err.message : 'Bulk sale failed.'
      );
      return false;
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

      <div className="grid gap-4 lg:grid-cols-[minmax(0,8fr)_minmax(360px,4fr)] lg:items-start">
        <div className="min-w-0 space-y-4">
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

              <DeliveryPartnerSelect
                value={selectedPartnerId}
                onChange={setSelectedPartnerId}
                partners={deliveryPartners}
                loading={partnersLoading}
                disabled={mode !== 'Delivery'}
              />
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
              <MemoProductBrowser
                products={filteredProducts}
                query={query}
                onQueryChange={setQuery}
                onAddToCart={(product) => addProduct(Number(product.id))}
                onProductClick={(product) => addProduct(Number(product.id))}
                categories={categoryOptions.map((category) => ({
                  id: category,
                  name: category,
                }))}
                activeCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                loading={productsLoading}
                onScanClick={() => setScanOpen(true)}
                onAddNewProduct={() => handleOpenCreateProduct()}
                className="h-[calc(100vh-300px)] min-h-[420px]"
                contentClassName="h-[calc(100vh-372px)] min-h-[348px]"
              />
            </div>
            {productsError && !productsLoading && filteredProducts.length === 0 && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {productsError}
              </div>
            )}
          </div>
        </div>

        <div className="hidden space-y-4 lg:sticky lg:top-6 lg:block">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex h-[72px] flex-col justify-center border-b border-border px-4 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4.5 w-4.5 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Selected Items</h2>
                </div>
                {lineItems.length > 0 && (
                  <button
                    onClick={() => setLines([])}
                    className="flex h-[44px] w-[44px] items-center justify-center rounded-xl border-none bg-transparent text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Clear Cart"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDateDDMMYYYY(`${saleDate}T12:00:00.000Z`)}
                </span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <CheckCircle2 className="h-3 w-3" />
                  {totals.quantity} items
                </span>
              </div>
            </div>

            <PosCartItems
              items={lineItems.map((entry) => ({
                id: Number(entry.product.id),
                name: entry.product.product_name || 'Unnamed Product',
                quantity: entry.line.quantity,
                unitPrice: entry.unitPrice,
                basePrice: entry.basePrice,
              }))}
              onUpdateQuantity={updateQuantity}
              onUpdatePrice={updateLinePrice}
              onRemoveItem={removeLine}
              emptyText="Add products from the left to start a bulk sale."
              maxQuantityByItem={Object.fromEntries(
                lineItems.map((entry) => [Number(entry.product.id), entry.stock])
              )}
              className="max-h-[calc(100vh-420px)]"
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold">Bulk Sale Summary</div>
                <p className="text-sm text-muted-foreground">
                  Review mode, date, totals, and confirm the order.
                </p>
              </div>
              <div className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {lineItems.length} lines
              </div>
            </div>
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
              <div className="space-y-2 rounded-xl border border-border bg-background/50 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  {mode !== 'Delivery' && (
                    <span className="text-xs text-muted-foreground">Shop mode</span>
                  )}
                </div>
                <Input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  placeholder="0"
                  disabled={mode !== 'Delivery'}
                  className="h-11"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Products Total</span>
                <span className="font-medium">Ks {totals.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">Ks {totals.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">Total Amount</span>
                <span className="text-lg font-semibold">
                  Ks {totals.grandTotal.toLocaleString()}
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

      <div className="lg:hidden">
        <Button
          type="button"
          onClick={() => setMobileCartOpen(true)}
          className="fixed bottom-4 left-4 right-4 z-40 h-12 rounded-xl text-base font-semibold shadow-lg"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Selected Items ({totals.quantity}) • Ks {totals.grandTotal.toLocaleString()}
        </Button>
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

      {mobileCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 lg:hidden"
          onClick={() => setMobileCartOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4.5 w-4.5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Selected Items</h2>
              </div>
              <button
                onClick={() => setMobileCartOpen(false)}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-xl border-none bg-transparent text-muted-foreground transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <PosCartItems
              items={lineItems.map((entry) => ({
                id: Number(entry.product.id),
                name: entry.product.product_name || 'Unnamed Product',
                quantity: entry.line.quantity,
                unitPrice: entry.unitPrice,
                basePrice: entry.basePrice,
              }))}
              onUpdateQuantity={updateQuantity}
              onUpdatePrice={updateLinePrice}
              onRemoveItem={removeLine}
              emptyText="Add products from the left to start a bulk sale."
              maxQuantityByItem={Object.fromEntries(
                lineItems.map((entry) => [Number(entry.product.id), entry.stock])
              )}
              className="max-h-[38vh]"
            />

            <div className="border-t border-border bg-card p-4">
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
                <div className="space-y-2 rounded-xl border border-border bg-background/50 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    {mode !== 'Delivery' && (
                      <span className="text-xs text-muted-foreground">Shop mode</span>
                    )}
                  </div>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    placeholder="0"
                    disabled={mode !== 'Delivery'}
                    className="h-11"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Products Total</span>
                  <span className="font-medium">Ks {totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">Ks {totals.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold">Total Amount</span>
                  <span className="text-lg font-semibold">
                    Ks {totals.grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={async () => {
                  const ok = await handleConfirm();
                  if (ok) {
                    setMobileCartOpen(false);
                  }
                }}
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
            </div>
          </div>
        </div>
      )}

      <ScannerModal
        open={scanOpen}
        elementId="bulk-sale-reader"
        onClose={handleCloseScanner}
        onScanSuccess={handleScannedBarcode}
        onScanError={(message: string) => addToast('error', message)}
        manualValue={manualBarcodeInput}
        onManualChange={setManualBarcodeInput}
        onManualSubmit={() => {
          handleScannedBarcode(manualBarcodeInput);
        }}
        secondaryActionLabel="Quick Add Product"
        onSecondaryAction={() => {
          handleCloseScanner();
          handleOpenCreateProduct(manualBarcodeInput.trim());
        }}
      />

      <AddProductDialog
        open={addProductOpen}
        onOpenChange={(open) => {
          setAddProductOpen(open);
          if (!open) {
            setPrefillBarcode('');
          }
        }}
        role={role}
        categories={dbCategories}
        initialBarcode={prefillBarcode}
        onCreated={handleCreatedProduct}
      />
    </div>
  );
}
