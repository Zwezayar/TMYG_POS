'use client';

import * as React from 'react';
import { Camera, Plus, Tag, X } from 'lucide-react';
import { supabaseClient } from '@/lib/supabaseClient';
import { compressImageFile } from '@/lib/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScannerModal } from '@/components/scanner/scanner-modal';
import type { Product } from '@/lib/useProducts';

type Role = 'admin' | 'staff' | null;

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
  product: Product | null;
}

export function EditProductDialog({
  open,
  onOpenChange,
  role,
  product,
}: EditProductDialogProps) {
  const [productName, setProductName] = React.useState('');
  const [defaultCode, setDefaultCode] = React.useState('');
  const [barcode, setBarcode] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [size, setSize] = React.useState('');
  const [salePrice, setSalePrice] = React.useState('');
  const [purchasePrice, setPurchasePrice] = React.useState('');
  const [stockQuantity, setStockQuantity] = React.useState('');
  const [reorderPoint, setReorderPoint] = React.useState('2');
  const [descriptionEn, setDescriptionEn] = React.useState('');
  const [descriptionMm, setDescriptionMm] = React.useState('');
  const [remark, setRemark] = React.useState('');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [altBarcodes, setAltBarcodes] = React.useState<string[]>([]);
  const [pendingAltBarcode, setPendingAltBarcode] = React.useState('');
  const [altScanOpen, setAltScanOpen] = React.useState(false);
  const [altScanManual, setAltScanManual] = React.useState('');
  const [toasts, setToasts] = React.useState<
    Array<{ id: number; type: 'success' | 'error' | 'info'; message: string }>
  >([]);

  React.useEffect(() => {
    if (!open || !product) return;
    setProductName(product.product_name ?? '');
    setDefaultCode(product.default_code ?? '');
    setBarcode(product.barcode ?? '');
    setCategory(product.category ?? '');
    setSize(product.size ?? product.variant ?? '');
    setSalePrice(product.sale_price != null ? String(product.sale_price) : '');
    setPurchasePrice(
      product.purchase_price != null ? String(product.purchase_price) : ''
    );
    setStockQuantity(
      product.stock_quantity != null ? String(product.stock_quantity) : ''
    );
    setReorderPoint(
      product.reorder != null ? String(product.reorder) : '2'
    );
    setDescriptionEn(product.description_en ?? '');
    setDescriptionMm(product.description_mm ?? '');
    setRemark(product.remark ?? '');
    setImageFile(null);
    setError(null);
    setAltBarcodes([...(Array.isArray(product.barcodes) ? product.barcodes.filter(Boolean) : [])]);
    setPendingAltBarcode('');
  }, [open, product]);

  const pushToast = React.useCallback(
    (type: 'success' | 'error' | 'info', message: string) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const addAltBarcode = React.useCallback(
    (raw: string): { ok: boolean; reason?: string; value?: string } => {
      const v = raw.trim();
      if (!v) return { ok: false, reason: 'empty' };
      const normalized = v.toLowerCase();
      const primaryNormalized = (barcode || '').trim().toLowerCase();
      if (normalized === primaryNormalized) {
        pushToast('info', `Barcode "${v}" matches the primary barcode — skipped.`);
        return { ok: false, reason: 'primary' };
      }
      if (altBarcodes.some((b) => b.trim().toLowerCase() === normalized)) {
        pushToast('info', `Barcode "${v}" is already in alternative barcodes — skipped.`);
        return { ok: false, reason: 'duplicate' };
      }
      setAltBarcodes((prev) => [...prev, v]);
      pushToast('success', `Alternative barcode "${v}" added.`);
      return { ok: true, value: v };
    },
    [altBarcodes, barcode, pushToast]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        setError('You must be logged in.');
        setSubmitting(false);
        return;
      }

      let imageUrl: string | null = product.image_url ?? null;

      if (imageFile) {
        const compressed = await compressImageFile(imageFile, 500);
        const extension = imageFile.name.split('.').pop() || 'jpg';
        const path = `${session.user.id}/${Date.now()}.${extension}`;

        const { error: uploadError } = await supabaseClient.storage
          .from('product-images')
          .upload(path, compressed, {
            upsert: true,
            contentType: imageFile.type || 'image/jpeg',
          });

        if (uploadError) {
          setError(uploadError.message);
          setSubmitting(false);
          return;
        }

        const { data: publicData } = supabaseClient.storage
          .from('product-images')
          .getPublicUrl(path);

        imageUrl = publicData.publicUrl ?? null;
      }

      const payload: Record<string, any> = {
        product_name: productName,
        default_code: defaultCode || null,
        barcode: barcode || null,
        primary_barcode: barcode.trim() || null,
        barcodes: altBarcodes.length > 0 ? altBarcodes.map((b) => b.trim()).filter(Boolean) : null,
        category: category || null,
        size: size || null,
        sale_price: salePrice ? Number(salePrice) : null,
        stock_quantity: stockQuantity ? Number(stockQuantity) : null,
        reorder: reorderPoint ? Number(reorderPoint) : 2,
        description_en: descriptionEn || null,
        description_mm: descriptionMm || null,
        image_url: imageUrl,
        remark: remark || null,
      };

      if (role === 'admin') {
        payload.purchase_price = purchasePrice ? Number(purchasePrice) : null;
      }

      const { error: updateError } = await supabaseClient
        .from('products')
        .update(payload)
        .eq('id', product.id);

      if (updateError) {
        setError(updateError.message);
        setSubmitting(false);
        return;
      }

      onOpenChange(false);
    } catch (err: any) {
      setError(err.message ?? 'Unexpected error while updating product.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open || !product) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
        <div className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-4 shadow-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end">
            {toasts.map((t) => (
              <div
                key={t.id}
                role="status"
                className={[
                  'pointer-events-auto max-w-sm rounded-xl border px-3 py-2 text-[11px] shadow-lg backdrop-blur',
                  t.type === 'success'
                    ? 'border-emerald-500/40 bg-emerald-50/95 text-emerald-800 dark:bg-emerald-950/90 dark:text-emerald-100'
                    : t.type === 'error'
                      ? 'border-destructive/50 bg-destructive/10 text-destructive'
                      : 'border-slate-300 bg-slate-50/95 text-slate-700 dark:bg-slate-900/90 dark:text-slate-200',
                ].join(' ')}
              >
                {t.message}
              </div>
            ))}
          </div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Edit product</h2>
              <p className="text-xs text-muted-foreground">
                Update fields and save changes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md p-1 text-muted-foreground hover:bg-secondary"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

        <form className="grid gap-3 text-xs md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="edit_product_name">Product name</Label>
            <Input
              id="edit_product_name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_default_code">Default code (SKU)</Label>
            <Input
              id="edit_default_code"
              value={defaultCode}
              onChange={(e) => setDefaultCode(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_barcode">Barcode</Label>
            <Input
              id="edit_barcode"
              type="text"
              inputMode="numeric"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label>Alternative Barcodes (optional)</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                inputMode="numeric"
                value={pendingAltBarcode}
                onChange={(e) => setPendingAltBarcode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAltBarcode(pendingAltBarcode);
                    setPendingAltBarcode('');
                  }
                }}
                placeholder="Scan or type an alternative barcode..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  addAltBarcode(pendingAltBarcode);
                  setPendingAltBarcode('');
                }}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setAltScanManual('');
                  setAltScanOpen(true);
                }}
                className="gap-1.5"
                aria-label="Scan alternative barcode via camera"
              >
                <Camera className="h-4 w-4" />
                Scan Barcode
              </Button>
            </div>
            {altBarcodes.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {altBarcodes.map((code, idx) => (
                  <span
                    key={`${code}-${idx}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[11px] text-foreground shadow-sm"
                  >
                    <Tag className="h-3 w-3 text-primary/70" />
                    {code}
                    <button
                      type="button"
                      onClick={() => setAltBarcodes(altBarcodes.filter((_, i) => i !== idx))}
                      className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove barcode ${code}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-[10px] text-muted-foreground">
              Press Enter, click Add, or tap Scan Barcode. Same as the primary barcode or an existing alt is skipped automatically.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_category">Category</Label>
            <Input
              id="edit_category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_size">Size</Label>
            <Input
              id="edit_size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_sale_price">Sale price</Label>
            <Input
              id="edit_sale_price"
              type="number"
              inputMode="decimal"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>
          {role === 'admin' && (
            <div className="space-y-1.5">
              <Label htmlFor="edit_purchase_price">Purchase price</Label>
              <Input
                id="edit_purchase_price"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="edit_stock_quantity">Stock quantity</Label>
            <Input
              id="edit_stock_quantity"
              type="number"
              inputMode="numeric"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_reorder">Reorder</Label>
            <Input
              id="edit_reorder"
              type="number"
              inputMode="numeric"
              value={reorderPoint}
              onChange={(e) => setReorderPoint(e.target.value)}
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="edit_image">Replace image</Label>
            <Input
              id="edit_image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <p className="text-[10px] text-muted-foreground">
              Images are compressed to max 500px before upload.
            </p>
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="edit_description_en">Description (EN)</Label>
            <textarea
              id="edit_description_en"
              className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="edit_description_mm">Description (MM)</Label>
            <textarea
              id="edit_description_mm"
              className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring font-[Pyidaungsu]"
              value={descriptionMm}
              onChange={(e) => setDescriptionMm(e.target.value)}
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="edit_remark">Remark</Label>
            <textarea
              id="edit_remark"
              className="min-h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
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
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
        </div>
      </div>
      <ScannerModal
        open={altScanOpen}
        elementId="edit-product-alt-barcode-scanner"
        onClose={() => {
          setAltScanOpen(false);
          setAltScanManual('');
        }}
        onScanSuccess={(decodedText) => {
          addAltBarcode(decodedText);
        }}
        onScanError={(message) => {
          pushToast('error', `Scan failed: ${message}`);
        }}
        manualValue={altScanManual}
        onManualChange={setAltScanManual}
        onManualSubmit={() => {
          const result = addAltBarcode(altScanManual);
          if (result.ok) {
            setAltScanOpen(false);
            setAltScanManual('');
          }
        }}
        secondaryActionLabel="Close"
        onSecondaryAction={() => {
          setAltScanOpen(false);
          setAltScanManual('');
        }}
      />
    </>
  );
}
