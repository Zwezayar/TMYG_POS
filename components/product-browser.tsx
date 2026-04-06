'use client';

import * as React from 'react';
import { Loader2, Package, Plus, ScanLine, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Product } from '@/lib/useProducts';
import { cn } from '@/lib/utils';

export type ProductBrowserCategory = {
  id: string;
  name: string;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price) + ' Ks';
};

export const getValidImageUrl = (url: string | null | undefined) => {
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
};

function ProductCard({
  product,
  onAddToCart,
  onClick,
  addButtonLabel = 'Add to Cart',
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onClick: (p: Product) => void;
  addButtonLabel?: string;
}) {
  const stock = product.stock_quantity ?? 0;
  const isOutOfStock = stock <= 0;
  const [imgError, setImgError] = React.useState(false);
  const finalImageUrl = getValidImageUrl(product.image_url);

  return (
    <div
      onClick={() => onClick(product)}
      className={cn(
        'group relative flex h-auto min-h-[280px] cursor-pointer touch-manipulation flex-col overflow-hidden rounded-xl border border-border bg-card p-2 text-left transition-all',
        isOutOfStock ? 'opacity-60' : 'hover:border-primary/30 hover:shadow-lg'
      )}
    >
      <div className="relative flex h-32 w-full flex-none shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
        {finalImageUrl && !imgError ? (
          <img
            src={finalImageUrl}
            alt={product.product_name || ''}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
            <Package className="mb-1 h-8 w-8 opacity-30" />
            <span className="text-[10px] font-medium uppercase">No Image</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <span className="rounded bg-destructive px-2 py-1 text-[9px] font-black uppercase text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden pt-2">
        <p className="line-clamp-3 min-h-[3.5rem] text-[12px] font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {product.product_name || '—'}
        </p>
        <div className="mt-1 flex flex-col gap-1.5">
          <span className="inline-flex max-w-full self-start truncate rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
            {product.size ||
              (product.default_code ? `SKU: ${product.default_code}` : 'Standard')}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-black text-[#8B5CF6]">
              {formatPrice(product.sale_price ?? 0)}
            </span>
            <span
              className={cn(
                'rounded-md px-1.5 py-0.5 text-[10px] font-bold',
                stock > 0
                  ? 'bg-primary/10 text-primary'
                  : 'bg-destructive/10 text-destructive'
              )}
            >
              {stock} left
            </span>
          </div>
        </div>
        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) onAddToCart(product);
            }}
            disabled={isOutOfStock}
            className={cn(
              'flex h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-lg text-[12px] font-black shadow-sm transition-all active:scale-95 border-none',
              isOutOfStock
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            <Plus className="h-4 w-4" />
            {addButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const MemoProductCard = React.memo(ProductCard);

export function ProductBrowser({
  products,
  query,
  onQueryChange,
  onAddToCart,
  onProductClick,
  categories,
  activeCategory,
  onCategoryChange,
  loading,
  missingBarcode,
  onQuickAdd,
  onScanClick,
  onAddNewProduct,
  addButtonLabel,
  className,
  contentClassName,
}: {
  products: Product[];
  query: string;
  onQueryChange: (q: string) => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  categories: ProductBrowserCategory[];
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  loading: boolean;
  missingBarcode?: string | null;
  onQuickAdd?: () => void;
  onScanClick?: () => void;
  onAddNewProduct?: () => void;
  addButtonLabel?: string;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-1 min-h-0 flex-col overflow-hidden bg-background/50',
        className
      )}
    >
      <div className="border-b border-border bg-card">
        <div className="flex h-[72px] items-center gap-2 px-4 shrink-0">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="relative min-w-[140px] flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="h-[48px] w-full rounded-xl border border-border bg-muted/30 pl-10 pr-8 text-base font-medium transition-all focus-visible:border-primary/50 focus-visible:ring-primary/20"
              />
              {query && (
                <button
                  onClick={() => onQueryChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 border-none bg-transparent p-1.5 text-muted-foreground transition-colors hover:text-foreground touch-manipulation"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {onScanClick && (
              <Button
                variant="outline"
                onClick={onScanClick}
                className="h-[48px] shrink-0 gap-2 rounded-xl border-border px-3 font-bold text-muted-foreground shadow-sm transition-all active:scale-95 hover:border-primary/30 hover:bg-muted hover:text-primary sm:px-4"
              >
                <ScanLine className="h-5 w-5" />
                <span className="hidden min-[800px]:inline text-xs">Scan</span>
              </Button>
            )}
            {onAddNewProduct && (
              <Button
                onClick={onAddNewProduct}
                className="h-[48px] shrink-0 gap-2 rounded-xl bg-primary px-3 font-bold text-primary-foreground shadow-sm active:scale-95 hover:bg-primary/90 sm:px-4"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden min-[800px]:inline text-xs">
                  Add Product
                </span>
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          <Button
            variant="outline"
            onClick={() => onCategoryChange(null)}
            className={cn(
              'h-9 rounded-full px-4 text-xs font-bold whitespace-nowrap',
              activeCategory === null
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800'
            )}
          >
            All Products
          </Button>
          {categories.map((cat) => {
            const label = cat.name.split('/').pop()?.trim() || cat.name;
            return (
              <Button
                key={cat.id}
                variant="outline"
                onClick={() => onCategoryChange(label)}
                className={cn(
                  'h-9 rounded-full px-4 text-xs font-bold whitespace-nowrap',
                  activeCategory === label
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>

      {missingBarcode && onQuickAdd && (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card/80 px-4 py-3">
          <div className="text-sm font-medium">
            Barcode not found: <span className="font-bold">{missingBarcode}</span>
          </div>
          <Button className="h-[48px] px-5" onClick={onQuickAdd}>
            Quick Add
          </Button>
        </div>
      )}

      <div
        className={cn(
          'flex-1 overflow-y-auto bg-background p-3 custom-scrollbar sm:p-4',
          contentClassName
        )}
      >
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 pb-20 min-[800px]:grid-cols-3">
            {products.map((product) => (
              <MemoProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onClick={onProductClick}
                addButtonLabel={addButtonLabel}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Package className="h-8 w-8 opacity-20" />
            </div>
            <p className="text-sm font-bold">No products found</p>
            <p className="text-xs opacity-60">
              Try adjusting your search or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const MemoProductBrowser = React.memo(ProductBrowser);
