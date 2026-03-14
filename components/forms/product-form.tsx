import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CategoryOption = { value: string; label: string };

type ProductFormProps = {
  title: string;
  barcode: string;
  onBarcodeChange: (value: string) => void;
  onBarcodeAction?: () => void;
  barcodeActionLabel?: string;
  name: string;
  onNameChange: (value: string) => void;
  sku: string;
  onSkuChange: (value: string) => void;
  size: string;
  onSizeChange: (value: string) => void;
  variant: string;
  onVariantChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: CategoryOption[];
  onAddCategory?: () => void;
  purchasePrice: string;
  onPurchasePriceChange: (value: string) => void;
  salePrice: string;
  onSalePriceChange: (value: string) => void;
  stockQuantity: string;
  onStockQuantityChange: (value: string) => void;
  descriptionEn: string;
  onDescriptionEnChange: (value: string) => void;
  descriptionMm: string;
  onDescriptionMmChange: (value: string) => void;
  imageUrl: string;
  onImageUrlChange: (value: string) => void;
  onImageFileChange: (file: File | null) => void;
  imagePreviewUrl: string | null;
  remark: string;
  onRemarkChange: (value: string) => void;
  error?: string | null;
  onClose: () => void;
  onSave: () => void;
  saveLabel: string;
  closeLabel?: string;
};

export function ProductForm({
  title,
  barcode,
  onBarcodeChange,
  onBarcodeAction,
  barcodeActionLabel = 'Scan Barcode',
  name,
  onNameChange,
  sku,
  onSkuChange,
  size,
  onSizeChange,
  variant,
  onVariantChange,
  category,
  onCategoryChange,
  categories,
  onAddCategory,
  purchasePrice,
  onPurchasePriceChange,
  salePrice,
  onSalePriceChange,
  stockQuantity,
  onStockQuantityChange,
  descriptionEn,
  onDescriptionEnChange,
  descriptionMm,
  onDescriptionMmChange,
  imageUrl,
  onImageUrlChange,
  onImageFileChange,
  imagePreviewUrl,
  remark,
  onRemarkChange,
  error,
  onClose,
  onSave,
  saveLabel,
  closeLabel = 'Close',
}: ProductFormProps) {
  const categoryOptions = React.useMemo(() => {
    if (!category) return categories;
    if (categories.some((opt) => opt.value === category)) return categories;
    return [{ value: category, label: category }, ...categories];
  }, [category, categories]);

  return (
    <div className="max-h-[90vh] overflow-y-auto p-5">
      <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground">Barcode:</span>
            <Input
              value={barcode}
              onChange={(e) => onBarcodeChange(e.target.value)}
              className="h-8 w-40 text-[11px] font-mono rounded-lg"
              placeholder="Manual Barcode"
            />
            {onBarcodeAction && (
              <Button
                type="button"
                variant="outline"
                className="h-8 px-3 rounded-lg text-[10px]"
                onClick={onBarcodeAction}
              >
                {barcodeActionLabel}
              </Button>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-[44px] px-4 rounded-xl"
          onClick={onClose}
          aria-label={closeLabel}
        >
          {closeLabel}
        </Button>
      </div>

      <div className="grid gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Product Name *
          </label>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Essential Face Cream"
            className="h-[44px] rounded-xl"
            autoComplete="off"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              SKU
            </label>
            <Input
              value={sku}
              onChange={(e) => onSkuChange(e.target.value)}
              placeholder="SKU-001"
              className="h-[44px] rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Size
            </label>
            <Input
              value={size}
              onChange={(e) => onSizeChange(e.target.value)}
              placeholder="250ml"
              className="h-[44px] rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Variant
            </label>
            <Input
              value={variant}
              onChange={(e) => onVariantChange(e.target.value)}
              placeholder="Lavender"
              className="h-[44px] rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </label>
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="h-[44px] min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-1 text-[13px] font-medium outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {onAddCategory && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-[44px] shrink-0 rounded-xl px-4 text-[11px] font-semibold uppercase"
                  title="Add Category"
                  onClick={onAddCategory}
                >
                  Add New
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Purchase Price (Ks)
            </label>
            <Input
              value={purchasePrice}
              onChange={(e) => onPurchasePriceChange(e.target.value)}
              type="number"
              inputMode="decimal"
              placeholder="0"
              className="h-[44px] rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sale Price (Ks) *
            </label>
            <Input
              value={salePrice}
              onChange={(e) => onSalePriceChange(e.target.value)}
              type="number"
              inputMode="decimal"
              placeholder="0"
              className="h-[44px] rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Stock Quantity
          </label>
          <Input
            value={stockQuantity}
            onChange={(e) => onStockQuantityChange(e.target.value)}
            type="number"
            inputMode="numeric"
            placeholder="0"
            className="h-[44px] rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Image URL
          </label>
          <Input
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            placeholder="https://example.com/item.jpg"
            className="h-[44px] rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Image Upload
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onImageFileChange(e.target.files?.[0] ?? null)}
            className="h-[44px] rounded-xl"
          />
        </div>

        {imagePreviewUrl && (
          <div className="md:col-span-2">
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="h-28 w-28 rounded-xl border border-border object-cover"
            />
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Description (EN)
            </label>
            <textarea
              value={descriptionEn}
              onChange={(e) => onDescriptionEnChange(e.target.value)}
              className="min-h-[90px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Product details..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Description (MM)
            </label>
            <textarea
              value={descriptionMm}
              onChange={(e) => onDescriptionMmChange(e.target.value)}
              className="min-h-[90px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="မြန်မာစာ ဖော်ပြချက်..."
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Remark
          </label>
          <Input
            value={remark}
            onChange={(e) => onRemarkChange(e.target.value)}
            placeholder="Notes / Batch number"
            className="h-[44px] rounded-xl"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-[11px] text-destructive">
            {error}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="ghost"
          className="h-[44px] px-6 rounded-xl"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="h-[44px] px-8 rounded-xl font-bold"
          onClick={onSave}
        >
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
