'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { supabaseClient } from '@/lib/supabaseClient';
import { compressImageFile } from '@/lib/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Role = 'admin' | 'staff' | null;

interface CategoryOption {
  id: string;
  name: string;
  parent_id?: string | null;
}

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
  categories?: CategoryOption[];
}

export function AddProductDialog({
  open,
  onOpenChange,
  role,
  categories = [],
}: AddProductDialogProps) {
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

  const barcodeInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (open && barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
    if (!open) {
      setError(null);
    }
  }, [open]);

  const reset = () => {
    setProductName('');
    setDefaultCode('');
    setBarcode('');
    setCategory('');
    setVariant('');
    setSalePrice('');
    setPurchasePrice('');
    setStockQuantity('');
    setReorderPoint('2');
    setDescriptionEn('');
    setDescriptionMm('');
    setRemark('');
    setImageFile(null);
    setError(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabaseClient.auth.getSession();

      if (sessionError || !session) {
        setError('You must be logged in to add products.');
        setSubmitting(false);
        return;
      }

      const userId = session.user.id;

      let imageUrl: string | null = null;

      if (imageFile) {
        const compressed = await compressImageFile(imageFile, 500);
        const extension =
          imageFile.name.split('.').pop() || 'jpg';
        const path = `${userId}/${Date.now()}.${extension}`;

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

        const {
          data: publicData,
        } = supabaseClient.storage
          .from('product-images')
          .getPublicUrl(path);

        imageUrl = publicData.publicUrl ?? null;
      }

      const parsedSalePrice = salePrice ? Number(salePrice) : null;
      const parsedPurchasePrice =
        role === 'admin' && purchasePrice ? Number(purchasePrice) : null;
      const parsedStockQuantity = stockQuantity
        ? Number(stockQuantity)
        : null;
      const parsedReorderPoint = reorderPoint ? Number(reorderPoint) : 2;

      const payload = {
        product_name: productName,
        default_code: defaultCode || null,
        barcode: barcode || null,
        image_url: imageUrl,
        category: category || null,
        variant: variant || null,
        sale_price: parsedSalePrice,
        purchase_price: parsedPurchasePrice,
        stock_quantity: parsedStockQuantity,
        reorder: parsedReorderPoint,
        description_en: descriptionEn || null,
        description_mm: descriptionMm || null,
        remark: remark || null,
      };

      let { error: insertError } = await supabaseClient
        .from('products')
        .insert(payload);

      if (insertError && /duplicate key value violates unique constraint/i.test(insertError.message)) {
        await supabaseClient.rpc('sync_products_id_seq');
        ({ error: insertError } = await supabaseClient.from('products').insert(payload));
      }

      if (insertError) {
        setError(insertError.message);
        setSubmitting(false);
        return;
      }

      reset();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message ?? 'Unexpected error while creating product.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-lg border border-border bg-card p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Add Product</h2>
            <p className="text-xs text-muted-foreground">
              Scan barcode and fill in product details.
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
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="barcode">Barcode</Label>
            <Input
              id="barcode"
              ref={barcodeInputRef}
              type="text"
              inputMode="numeric"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Scan barcode..."
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="product_name">Product name</Label>
            <Input
              id="product_name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="default_code">Default code (SKU)</Label>
            <Input
              id="default_code"
              value={defaultCode}
              onChange={(e) => setDefaultCode(e.target.value)}
              placeholder="Internal SKU"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            {categories.length > 0 ? (
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Skincare"
              />
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="variant">Variant</Label>
            <Input
              id="variant"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="e.g. Size M / Pink"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sale_price">Sale price</Label>
            <Input
              id="sale_price"
              type="number"
              inputMode="decimal"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              placeholder="0.00"
            />
          </div>
          {role === 'admin' && (
            <div className="space-y-1.5">
              <Label htmlFor="purchase_price">Purchase price</Label>
              <Input
                id="purchase_price"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="stock_quantity">Stock quantity</Label>
            <Input
              id="stock_quantity"
              type="number"
              inputMode="numeric"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reorder">Reorder</Label>
            <Input
              id="reorder"
              type="number"
              inputMode="numeric"
              value={reorderPoint}
              onChange={(e) => setReorderPoint(e.target.value)}
              placeholder="2"
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] ?? null)
              }
            />
            <p className="text-[10px] text-muted-foreground">
              Images are compressed to max 500px to save Supabase storage.
            </p>
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="description_en">Description (EN)</Label>
            <textarea
              id="description_en"
              className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              placeholder="English description"
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="description_mm">Description (MM)</Label>
            <textarea
              id="description_mm"
              className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring font-[Pyidaungsu]"
              value={descriptionMm}
              onChange={(e) => setDescriptionMm(e.target.value)}
              placeholder="မြန်မာဘာသာ ဖော်ပြချက်"
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="remark">Remark</Label>
            <textarea
              id="remark"
              className="min-h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Internal notes"
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
              {submitting ? 'Saving...' : 'Save product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
