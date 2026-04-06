'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
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
  const [deliveryPartners, setDeliveryPartners] = React.useState<DeliveryPartner[]>([]);
  const [partnersLoading, setPartnersLoading] = React.useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [scanOpen, setScanOpen] = React.useState(false);
  const [manualBarcodeInput, setManualBarcodeInput] = React.useState('');
  const [addProductOpen, setAddProductOpen] = React.useState(false);
  const [prefillBarcode, setPrefillBarcode] = React.useState('');
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

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-start">
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

        <div className="space-y-4 xl:sticky xl:top-6">
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

            <div className="mt-4 space-y-3 xl:max-h-[calc(100vh-280px)] xl:overflow-y-auto xl:pr-1">
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
