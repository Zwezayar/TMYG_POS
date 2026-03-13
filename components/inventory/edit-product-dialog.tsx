'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { supabaseClient } from '@/lib/supabaseClient';
import { compressImageFile } from '@/lib/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [variant, setVariant] = React.useState('');
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

  React.useEffect(() => {
    if (!open || !product) return;
    setProductName(product.product_name ?? '');
    setDefaultCode(product.default_code ?? '');
    setBarcode(product.barcode ?? '');
    setCategory(product.category ?? '');
    setVariant(product.variant ?? '');
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
  }, [open, product]);

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
        category: category || null,
        variant: variant || null,
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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl rounded-lg border border-border bg-card p-4 shadow-xl">
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
          <div className="space-y-1.5">
            <Label htmlFor="edit_category">Category</Label>
            <Input
              id="edit_category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit_variant">Variant</Label>
            <Input
              id="edit_variant"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
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
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

