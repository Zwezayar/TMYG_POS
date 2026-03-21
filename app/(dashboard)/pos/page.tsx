'use client';

import * as React from 'react';
import { useProducts, type Product } from '@/lib/useProducts';
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { compressImageFile } from '@/lib/image';
import { ScannerModal } from '@/components/scanner/scanner-modal';
import {
  Loader2, Camera, Zap, Search, Pencil, Check,
  Menu, ChevronLeft, ChevronRight, X, Phone, MapPin, Plus,
  ClipboardList, Package, Settings, ShoppingCart, Truck, Trash2, Smartphone,
  Minus, ShoppingBag, Store, Calendar, Hash, Banknote, CreditCard, Waves,
  ScanLine, Sparkles, Droplets, Wind, Palette, Scissors, ChevronsLeft, ChevronsRight, CheckCircle2,
  LayoutGrid, User, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { useCategories } from '@/lib/useCategories';
import { cn } from "@/lib/utils";
import { ProductForm } from '@/components/forms/product-form';

// --- Types & Helpers ---
type CartLine = {
  product: Product;
  quantity: number;
  manualPrice?: number;
};

type PersistedCartLine = {
  productId: number;
  quantity: number;
  manualPrice?: number;
};

type PersistedPosState = {
  cart: PersistedCartLine[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  saleType: 'Shop' | 'Delivery';
  paymentMethod: string;
  courierName: string;
  deliFee: string;
  isBagoSpecial: boolean;
  remark: string;
  amountReceived: string;
};

type ReceiptItem = {
  name: string;
  qty: number;
  price: number;
  amount: number;
};

type ReceiptData = {
  invoiceId: string;
  date: string;
  time: string;
  staffName: string | null;
  cashierRole: string | null;
  saleType: 'Shop' | 'Delivery';
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: ReceiptItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  amountReceived: number;
  changeAmount: number;
  amountDue: number;
};

type Toast = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

type CameraState = 'IDLE' | 'STARTING' | 'SCANNING' | 'RUNNING' | 'STOPPING';

const normalizeBarcode = (bc: string | null | undefined) => bc?.trim() || "";
const POS_STATE_KEY = 'pos-state-v1';
const PRODUCTS_REFRESH_KEY = 'products-refresh-v1';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price) + " Ks";
};

const formatStaffName = (value: string | null) => {
  if (!value) return null;
  const base = value.split('@')[0]?.trim();
  if (!base) return null;
  return base.charAt(0).toUpperCase() + base.slice(1);
};

const formatRole = (value: string | null | undefined) => {
  if (!value) return 'Staff';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// Helper function to validate and format image URLs
const getValidImageUrl = (url: string | null | undefined) => {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('data:') || url.includes('supabase.co/storage')) {
    return url;
  }
  if (url.startsWith('/')) {
    return url;
  }
  return null;
};

// --- Icons Map for Categories ---
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Droplets,
  Wind,
  Palette,
  Scissors,
};

// Redundant NavSidebar removed since navigation is now centrally located in App Sidebar.

function ProductCard({
  product,
  onAddToCart,
  onClick,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onClick: (p: Product) => void;
}) {
  const stock = product.stock_quantity ?? 0;
  const isOutOfStock = stock <= 0;

  const [imgError, setImgError] = React.useState(false);

  const finalImageUrl = getValidImageUrl(product.image_url);

  return (
    <div
      onClick={() => onClick(product)}
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-card p-2 text-left transition-all relative overflow-hidden h-auto min-h-[280px] cursor-pointer touch-manipulation",
        isOutOfStock ? "opacity-60" : "hover:border-primary/30 hover:shadow-lg"
      )}
    >
      <div className="relative h-32 w-full overflow-hidden rounded-md bg-muted flex items-center justify-center shrink-0 flex-none">
        {finalImageUrl && !imgError ? (
          <img
            src={finalImageUrl}
            alt={product.product_name || ''}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground">
            <Package className="h-8 w-8 opacity-30 mb-1" />
            <span className="text-[10px] uppercase font-medium">No Image</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-destructive text-white text-[9px] font-black uppercase px-2 py-1 rounded">Sold Out</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col min-w-0 justify-between pt-2 overflow-hidden">
        <p className="line-clamp-3 min-h-[3.5rem] text-[12px] font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
          {product.product_name || '—'}
        </p>
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-[11px] text-muted-foreground truncate">
            {product.size || (product.default_code ? `SKU: ${product.default_code}` : 'Standard')}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-black text-[#8B5CF6]">
              {formatPrice(product.sale_price ?? 0)}
            </span>
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md", stock > 0 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
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
              "flex w-full h-[44px] items-center justify-center gap-2 rounded-lg text-[12px] font-black transition-all border-none touch-manipulation shadow-sm active:scale-95",
              isOutOfStock
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const MemoProductCard = React.memo(ProductCard);

function ProductArea({
  products,
  query,
  onQueryChange,
  onScanClick,
  onAddNewProduct,
  onAddToCart,
  onProductClick,
  categories,
  activeCategory,
  onCategoryChange,
  loading,
  missingBarcode,
  onQuickAdd,
}: {
  products: Product[];
  query: string;
  onQueryChange: (q: string) => void;
  onScanClick: () => void;
  onAddNewProduct: () => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  categories: { id: string; name: string }[];
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  loading: boolean;
  missingBarcode: string | null;
  onQuickAdd: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden bg-background/50">
      <div className="border-b border-border bg-card">
        <div className="h-[72px] flex items-center px-4 gap-2 shrink-0">
          <div className="flex flex-1 items-center gap-2 min-w-0">
          <div className="relative flex-1 min-w-[140px]">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50" />
            <Input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="h-[48px] w-full rounded-xl border border-border bg-muted/30 pl-10 pr-8 text-base focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all font-medium"
            />
            {query && (
              <button
                onClick={() => onQueryChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none p-1.5 transition-colors touch-manipulation"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={onScanClick}
            className="h-[48px] px-3 sm:px-4 gap-2 rounded-xl border-border hover:bg-muted hover:border-primary/30 text-muted-foreground hover:text-primary transition-all font-bold transition-all active:scale-95 shadow-sm shrink-0"
          >
            <ScanLine className="h-5 w-5" />
            <span className="hidden min-[800px]:inline text-xs">Scan</span>
          </Button>
          <Button
            onClick={onAddNewProduct}
            className="h-[48px] px-3 sm:px-4 gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold active:scale-95 shadow-sm shrink-0"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden min-[800px]:inline text-xs">Add Product</span>
          </Button>
        </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          <Button
            variant="outline"
            onClick={() => onCategoryChange(null)}
            className={cn(
              "h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap",
              activeCategory === null
                ? "bg-primary text-primary-foreground border-primary"
                : "border-slate-500 text-slate-800 hover:bg-slate-100 dark:border-cyan-400/60 dark:text-cyan-300 dark:hover:bg-cyan-500/10"
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
                  "h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap",
                  activeCategory === label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-slate-500 text-slate-800 hover:bg-slate-100 dark:border-cyan-400/60 dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                )}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
      {missingBarcode && (
        <div className="px-4 py-3 border-b border-border bg-card/80 flex items-center justify-between gap-3">
          <div className="text-sm font-medium">
            Barcode not found: <span className="font-bold">{missingBarcode}</span>
          </div>
          <Button className="h-[48px] px-5" onClick={onQuickAdd}>
            Quick Add
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-background p-3 sm:p-4 custom-scrollbar">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 min-[800px]:grid-cols-3 gap-3 pb-20">
            {products.map((product) => (
              <MemoProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground p-8 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Package className="h-8 w-8 opacity-20" />
            </div>
            <p className="text-sm font-bold">No products found</p>
            <p className="text-xs opacity-60">Try adjusting your search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}

const MemoProductArea = React.memo(ProductArea);

function CartSidebar({
  cart,
  onUpdateQuantity,
  onUpdatePrice,
  onRemoveItem,
  totalAmount,
  customerName,
  onCustomerNameChange,
  customerPhone,
  onCustomerPhoneChange,
  customerAddress,
  onCustomerAddressChange,
  customerMatch,
  saleType,
  onSaleTypeChange,
  paymentMethod,
  onPaymentMethodChange,
  courierName,
  onCourierNameChange,
  deliFee,
  onDeliFeeChange,
  amountReceived,
  onAmountReceivedChange,
  changeAmount,
  amountDue,
  isBagoSpecial,
  onBagoSpecialChange,
  remark,
  onRemarkChange,
  onCheckout,
  isCheckingOut,
  canCheckout,
  checkoutError,
  collapsed,
  onToggleCollapse,
  onClearCart,
  checkoutMode,
  onToggleCheckout,
  isOnline,
  offlineQueueCount,
  cartPulse,
}: {
  cart: CartLine[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onUpdatePrice: (id: number, price: number) => void;
  onRemoveItem: (id: number) => void;
  totalAmount: number;
  customerName: string;
  onCustomerNameChange: (v: string) => void;
  customerPhone: string;
  onCustomerPhoneChange: (v: string) => void;
  customerAddress: string;
  onCustomerAddressChange: (v: string) => void;
  customerMatch: { name: string | null; address: string | null; phone: string } | null;
  saleType: 'Shop' | 'Delivery';
  onSaleTypeChange: (v: 'Shop' | 'Delivery') => void;
  paymentMethod: string;
  onPaymentMethodChange: (v: string) => void;
  courierName: string;
  onCourierNameChange: (v: string) => void;
  deliFee: string;
  onDeliFeeChange: (v: string) => void;
  amountReceived: string;
  onAmountReceivedChange: (v: string) => void;
  changeAmount: number;
  amountDue: number;
  isBagoSpecial: boolean;
  onBagoSpecialChange: (v: boolean) => void;
  remark: string;
  onRemarkChange: (v: string) => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
  canCheckout: boolean;
  checkoutError: string | null;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClearCart: () => void;
  checkoutMode: boolean;
  onToggleCheckout: () => void;
  isOnline: boolean;
  offlineQueueCount: number;
  cartPulse: boolean;
}) {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editPrice, setEditPrice] = React.useState("");

  const invoiceId = React.useMemo(() => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
    return `INV-${yy}${mm}${dd}-${seq}`;
  }, []);
  const saleTypeValue = saleType;

  const formatDateTime = () => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  };

  const paymentMethodsList: { id: string; label: string; icon: React.ElementType }[] = [
    { id: "cash", label: "Cash", icon: Banknote },
    { id: "kpay", label: "KPay", icon: Smartphone },
    { id: "wave", label: "Wave", icon: Waves },
    { id: "bank", label: "Bank", icon: CreditCard },
  ];

  const [paymentTier, setPaymentTier] = React.useState<'cash' | 'pay' | 'banking'>('cash');

  const handleEditPrice = (id: number, currentPrice: number) => {
    setEditingId(id);
    setEditPrice(String(currentPrice));
  };

  const handleSavePrice = (id: number) => {
    const newPrice = parseInt(editPrice, 10);
    if (!isNaN(newPrice) && newPrice >= 0) {
      onUpdatePrice(id, newPrice);
    }
    setEditingId(null);
    setEditPrice("");
  };

  const deliveryFeeNum = saleType === "Delivery" ? parseInt(deliFee, 10) || 0 : 0;
  const finalTotal = totalAmount + deliveryFeeNum;
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  const [isCustomerInfoCollapsed, setIsCustomerInfoCollapsed] = React.useState(true);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-l border-border bg-card transition-all duration-300 shrink-0",
        checkoutMode ? "w-full" : "w-[300px] lg:w-[350px]"
      )}
    >
      <div className="flex h-[72px] flex-col justify-center border-b border-border px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {checkoutMode && (
              <button
                onClick={onToggleCheckout}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary bg-transparent border-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <ShoppingBag
              className={cn(
                "h-4.5 w-4.5 text-primary transition-transform duration-150",
                cartPulse && "scale-125"
              )}
            />
            <h2 className="text-sm font-bold text-foreground">
              {checkoutMode ? "Checkout" : "Current Order"}
            </h2>
          </div>
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="flex h-[44px] w-[44px] items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl bg-transparent border-none transition-colors"
              title="Clear Cart"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Hash className="h-3 w-3" /> {invoiceId}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDateTime()}</span>
          <span className={cn("flex items-center gap-1 font-semibold", isOnline ? "text-emerald-500" : "text-amber-400")}>
            <CheckCircle2 className="h-3 w-3" />
            {isOnline ? "Online" : `Offline (${offlineQueueCount})`}
          </span>
        </div>
      </div>

      <div className="border-b border-border px-4 py-3">
        <div className="flex h-[48px] rounded-xl bg-muted/60 p-1 gap-0.5">
          <button
            type="button"
            onClick={() => onSaleTypeChange("Shop")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none",
              saleType === "Shop"
                ? "bg-[#8B5CF6] text-white shadow-md"
                : "bg-transparent text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Store className="h-4 w-4" /> Shop
          </button>
          <button
            type="button"
            onClick={() => onSaleTypeChange("Delivery")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none",
              saleType === "Delivery"
                ? "bg-[#F97316] text-white shadow-md"
                : "bg-transparent text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Truck className="h-4 w-4" /> Delivery
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground opacity-50 px-4 text-center">
            <ShoppingBag className="mb-3 h-10 w-10" />
            <p className="text-sm font-medium">Cart is empty</p>
          </div>
        ) : (
          <div className={cn("flex flex-col", checkoutMode && "mx-auto max-w-lg")}>
            {cart.map((item, idx) => {
              const price = item.manualPrice ?? item.product.sale_price ?? 0;
              const isEditing = editingId === item.product.id;
              return (
                <div key={item.product.id} className={cn("px-4 py-3", idx < cart.length - 1 && "border-b border-border")}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex-1 text-[13px] font-bold leading-snug line-clamp-2">{item.product.product_name}</p>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="flex h-[44px] w-[44px] items-center justify-center text-muted-foreground hover:text-destructive bg-transparent border-none transition-colors"
                      title="Remove Item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="h-[44px] w-24 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none"
                            autoFocus
                          />
                          <button onClick={() => handleSavePrice(item.product.id)} className="h-[44px] w-[44px] rounded-lg bg-primary text-primary-foreground flex items-center justify-center border-none shadow-sm">
                            <Check className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className={cn("text-sm font-bold", item.manualPrice !== undefined && "text-[#D4AF37]")}>{price.toLocaleString()} Ks</span>
                          <button onClick={() => handleEditPrice(item.product.id, price)} className="h-[44px] w-[44px] border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary bg-transparent active:scale-95 transition-all">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="h-[44px] w-[44px] border border-border rounded-lg flex items-center justify-center bg-transparent active:scale-95 transition-all">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="h-[44px] w-[44px] border border-border rounded-lg flex items-center justify-center bg-transparent active:scale-95 transition-all">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={cn("border-t border-border bg-card p-4 flex flex-col min-h-0", checkoutMode && "mx-auto w-full max-w-lg")}>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 max-h-[calc(100vh-200px)] pr-1">
          {saleType === "Delivery" && (
            <div className="rounded-2xl border-2 border-[#3b82f6] bg-[#3b82f6]/10 p-3 space-y-3">
              <button
                onClick={() => setIsCustomerInfoCollapsed(!isCustomerInfoCollapsed)}
                className="flex items-center justify-between w-full text-sm font-black text-foreground transition-colors"
              >
                <span>Customer Info</span>
                {isCustomerInfoCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5 -rotate-90" />}
              </button>

              {!isCustomerInfoCollapsed && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex h-[52px] rounded-xl bg-muted/60 p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => onSaleTypeChange("Shop")}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none",
                        saleTypeValue === "Shop"
                          ? "bg-[#8B5CF6] text-white shadow-md"
                          : "bg-transparent text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <Store className="h-4 w-4" /> Shop
                    </button>
                    <button
                      type="button"
                      onClick={() => onSaleTypeChange("Delivery")}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none",
                        saleTypeValue === "Delivery"
                          ? "bg-[#F97316] text-white shadow-md"
                          : "bg-transparent text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <Truck className="h-4 w-4" /> Delivery
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Customer Name</label>
                    <Input
                      value={customerName}
                      onChange={(e) => onCustomerNameChange(e.target.value)}
                      placeholder="Customer Name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Phone Number</label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => onCustomerPhoneChange(e.target.value)}
                      placeholder="Phone Number"
                      className="h-12"
                    />
                  {customerMatch && (
                    <div className="text-[10px] text-muted-foreground">
                      Customer found: {customerMatch.name || 'Unknown'}
                    </div>
                  )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Address</label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => onCustomerAddressChange(e.target.value)}
                      placeholder="Address"
                      rows={4}
                      className="min-h-[96px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold">Courier</label>
                      <Input
                        value={courierName}
                        onChange={(e) => onCourierNameChange(e.target.value)}
                        placeholder="Courier"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold">Delivery Fee</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={deliFee}
                        onChange={(e) => onDeliFeeChange(e.target.value)}
                        placeholder="Fee"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onPaymentMethodChange('cash');
                  setPaymentTier('cash');
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl h-[56px] transition-all border-none",
                  paymentMethod === 'cash' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted/50 text-muted-foreground hover:bg-muted bg-transparent"
                )}
              >
                <Banknote className="h-5 w-5" />
                <span className="text-[10px] font-bold">Cash</span>
              </button>
              <button
                onClick={() => {
                  onPaymentMethodChange('pay');
                  setPaymentTier('pay');
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl h-[56px] transition-all border-none",
                  paymentTier === 'pay' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-muted/50 text-muted-foreground hover:bg-muted bg-transparent"
                )}
              >
                <Smartphone className="h-5 w-5" />
                <span className="text-[10px] font-bold">Pay</span>
              </button>
              <button
                onClick={() => {
                  onPaymentMethodChange('bank');
                  setPaymentTier('banking');
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl h-[56px] transition-all border-none",
                  paymentTier === 'banking' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-muted/50 text-muted-foreground hover:bg-muted bg-transparent"
                )}
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-[10px] font-bold">Banking</span>
              </button>
            </div>

            {paymentTier === 'pay' && (
              <div className="grid grid-cols-3 gap-1 px-0.5">
                {[
                  { id: 'kpay', label: 'KBZ Pay', color: '#0056B3' },
                  { id: 'aya_pay', label: 'AYA Pay', color: '#ED1C24' },
                  { id: 'cb_pay', label: 'CB Pay', color: '#008A45' },
                  { id: 'uab_pay', label: 'UAB Pay', color: '#6A2A8F' },
                  { id: 'wave_pay', label: 'Wave Pay', color: '#F47920' },
                  { id: 'others_pay', label: 'Others', color: '#4B5563' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onPaymentMethodChange(opt.id)}
                    style={{
                      backgroundColor: paymentMethod === opt.id ? opt.color : 'transparent',
                      color: paymentMethod === opt.id ? 'white' : undefined,
                      borderColor: opt.color
                    }}
                    className={cn(
                      "rounded-lg h-[44px] text-[9px] font-bold transition-all border",
                      paymentMethod === opt.id
                        ? "shadow-md brightness-110"
                        : "text-muted-foreground hover:bg-muted/10 bg-transparent"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {paymentTier === 'banking' && (
              <div className="grid grid-cols-3 gap-1 px-0.5">
                {[
                  { id: 'kbz_bank', label: 'KBZ', color: '#0056B3' },
                  { id: 'aya_bank', label: 'AYA', color: '#ED1C24' },
                  { id: 'cb_bank', label: 'CB', color: '#008A45' },
                  { id: 'uab_bank', label: 'UAB', color: '#6A2A8F' },
                  { id: 'others_bank', label: 'Others', color: '#4B5563' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onPaymentMethodChange(opt.id)}
                    style={{
                      backgroundColor: paymentMethod === opt.id ? opt.color : 'transparent',
                      color: paymentMethod === opt.id ? 'white' : undefined,
                      borderColor: opt.color
                    }}
                    className={cn(
                      "rounded-lg h-[44px] text-[9px] font-bold transition-all border",
                      paymentMethod === opt.id
                        ? "shadow-md brightness-110"
                        : "text-muted-foreground hover:bg-muted/10 bg-transparent"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1 px-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtotal</span>
              <span>{totalAmount.toLocaleString()} Ks</span>
            </div>
            {saleType === "Delivery" && deliveryFeeNum > 0 && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Deli Fee</span>
                <span>{deliveryFeeNum.toLocaleString()} Ks</span>
              </div>
            )}
            <div className="flex justify-between border-t border-dashed pt-2 text-base font-bold">
              <span>Total</span>
              <span>{finalTotal.toLocaleString()} Ks</span>
            </div>
            {checkoutMode && (
              <div className="mt-3 space-y-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Amount Received
                  </label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={amountReceived}
                    onChange={(e) => onAmountReceivedChange(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </div>
                {amountDue > 0 ? (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-amber-700">Amount Due</div>
                    <div className="text-lg font-black text-amber-700">
                      {amountDue.toLocaleString()} Ks
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-700">Change</div>
                    <div className="text-lg font-black text-emerald-700">
                      {changeAmount.toLocaleString()} Ks
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-card pt-3 border-t border-border">
          <div className="mb-2 text-[11px] text-muted-foreground text-center">
            Total: {itemCount} items | MMK {finalTotal.toLocaleString()}
          </div>
          {!checkoutMode ? (
            <button
              disabled={cart.length === 0}
              onClick={onToggleCheckout}
              className="h-12 w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 disabled:opacity-50 border-none"
            >
              Checkout - {finalTotal.toLocaleString()} Ks
            </button>
          ) : (
            <button
              disabled={!canCheckout || isCheckingOut}
              onClick={onCheckout}
              className="h-12 w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 border-none"
            >
              {isCheckingOut && <Loader2 className="h-4 w-4 animate-spin" />}
              {saleType === "Shop" ? "Confirm & Pay" : "Confirm Delivery"}
            </button>
          )}
          {checkoutError && <p className="mt-2 text-[10px] text-destructive text-center">{checkoutError}</p>}
        </div>
      </div>
    </aside>
  );
}

function ScannerComponent() {
  return <div id="reader" className="w-full h-full" />;
}


export default function PosPage() {
  const { username, role, displayName } = useDashboardAuth();
  const { products: hookProducts, loading: productsLoading, refresh: refreshProducts } = useProducts({
    includePurchasePrice: role === 'admin',
  });
  const [productsOverride, setProductsOverride] = React.useState<Product[] | null>(null);
  const products = productsOverride ?? hookProducts;
  const { categories: dbCategories, refresh: refreshCategories } = useCategories();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const scannerRef = React.useRef<any | null>(null);
  const cameraStateRef = React.useRef<CameraState>('IDLE');
  const scannerLockIdRef = React.useRef(`pos-${Math.random().toString(36).slice(2)}`);
  const [cameras, setCameras] = React.useState<{ id: string; label: string }[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = React.useState(0);

  const [activeView, setActiveView] = React.useState('pos');
  const [navCollapsed, setNavCollapsed] = React.useState(false);
  const [catCollapsed, setCatCollapsed] = React.useState(false);
  const [cartCollapsed, setCartCollapsed] = React.useState(false);
  const [checkoutMode, setCheckoutMode] = React.useState(false);

  const [query, setQuery] = React.useState('');
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [checkingOut, setCheckingOut] = React.useState(false);
  const [isConfirmingCheckout, setIsConfirmingCheckout] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null);
  const [checkoutSuccessOpen, setCheckoutSuccessOpen] = React.useState(false);
  const [checkoutInvoiceId, setCheckoutInvoiceId] = React.useState<string | null>(null);
  const [lastReceipt, setLastReceipt] = React.useState<ReceiptData | null>(null);
  const [cartSidebarKey, setCartSidebarKey] = React.useState(0);
  const [cartPulse, setCartPulse] = React.useState(false);
  const cartPulseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [posHydrated, setPosHydrated] = React.useState(false);
  const pendingCartRef = React.useRef<PersistedCartLine[] | null>(null);
  const lastProductsRefreshRef = React.useRef<string | null>(null);

  const [scanOpen, setScanOpen] = React.useState(false);
  const [manualBarcodeInput, setManualBarcodeInput] = React.useState('');
  const [missingBarcode, setMissingBarcode] = React.useState<string | null>(null);
  const [scanFlash, setScanFlash] = React.useState(false);
  const [scanStatus, setScanStatus] = React.useState<'scanning' | 'found' | 'missing'>('scanning');
  const [cameraLoading, setCameraLoading] = React.useState(false);
  const [torchOn, setTorchOn] = React.useState(false);
  const [zoomValue, setZoomValue] = React.useState(1);
  const [cameraCapabilities, setCameraCapabilities] = React.useState<{
    torchSupported: boolean;
    zoomSupported: boolean;
    zoomMin: number;
    zoomMax: number;
  } | null>(null);
  const videoTrackRef = React.useRef<MediaStreamTrack | null>(null);
  const isProcessingScan = React.useRef(false);
  const scanUnlockTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPersistedPos = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(POS_STATE_KEY);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(POS_STATE_KEY);
    if (!raw) {
      setPosHydrated(true);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Partial<PersistedPosState>;
      if (parsed.customerName != null) setCustomerName(parsed.customerName);
      if (parsed.customerPhone != null) setCustomerPhone(parsed.customerPhone);
      if (parsed.customerAddress != null) setCustomerAddress(parsed.customerAddress);
      if (parsed.saleType === 'Delivery' || parsed.saleType === 'Shop') {
        setSaleType(parsed.saleType);
      }
      if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
      if (parsed.courierName != null) setCourierName(parsed.courierName);
      if (parsed.deliFee != null) setDeliFee(parsed.deliFee);
      if (typeof parsed.isBagoSpecial === 'boolean') setIsBagoSpecial(parsed.isBagoSpecial);
      if (parsed.remark != null) setRemark(parsed.remark);
      if (parsed.amountReceived != null) setAmountReceived(parsed.amountReceived);
      if (Array.isArray(parsed.cart)) {
        pendingCartRef.current = parsed.cart.filter(
          (line) =>
            typeof line?.productId === 'number' &&
            typeof line?.quantity === 'number'
        );
        if (!pendingCartRef.current?.length) {
          pendingCartRef.current = null;
          setPosHydrated(true);
        }
      } else {
        setPosHydrated(true);
      }
    } catch {
      setPosHydrated(true);
    }
  }, []);

  React.useEffect(() => {
    if (!pendingCartRef.current || products.length === 0) return;
    const nextCart: CartLine[] = [];
    pendingCartRef.current.forEach((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return;
      nextCart.push({
        product,
        quantity: line.quantity,
        manualPrice: line.manualPrice,
      });
    });
    setCart(nextCart);
    pendingCartRef.current = null;
    setPosHydrated(true);
  }, [products]);

  const cleanupCamera = React.useCallback(() => {
    const container = typeof document === 'undefined' ? null : document.getElementById('reader');
    const video = (container?.querySelector('video') as HTMLVideoElement | null) ?? null;
    const stream = (video?.srcObject as MediaStream | null) ?? null;
    
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        try {
          track.stop();
          stream.removeTrack(track);
        } catch { }
      });
    }
    
    if (video) {
      try {
        video.srcObject = null;
        video.load(); // Force reset
      } catch { }
    }
    
    videoTrackRef.current = null;
    isProcessingScan.current = false;
  }, []);

  const releaseScanner = React.useCallback(async () => {
    const scanner = scannerRef.current;
    if (scanner) {
      try {
        if (scanner.isScanning) {
          await scanner.stop();
        }
      } catch { }
      try {
        scanner.clear();
      } catch { }
    }
    scannerRef.current = null;
    cameraStateRef.current = 'IDLE';
    cleanupCamera();
    if (typeof window !== 'undefined') {
      const state = (window as any).__tmygScannerLockState as { id?: string; release?: () => Promise<void> | void } | undefined;
      if (state?.id === scannerLockIdRef.current) {
        (window as any).__tmygScannerLockState = null;
      }
    }
  }, [cleanupCamera]);

  const handleCloseScanner = React.useCallback(() => {
    setScanOpen(false);
    setManualBarcodeInput('');
  }, []);

  const acquireGlobalScannerLock = React.useCallback(async () => {
    if (typeof window === 'undefined') return;
    const state = (window as any).__tmygScannerLockState as { id?: string; release?: () => Promise<void> | void } | undefined;
    if (state?.id && state.id !== scannerLockIdRef.current) {
      await state.release?.();
      (window as any).__tmygScannerLockState = null;
    }
    (window as any).__tmygScannerLockState = {
      id: scannerLockIdRef.current,
      release: async () => {
        await releaseScanner();
      },
    };
  }, [releaseScanner]);

  React.useEffect(() => {
    return () => {
      releaseScanner();
    };
  }, [releaseScanner]);

  const [quickAddOpen, setQuickAddOpen] = React.useState(false);
  const [quickBarcode, setQuickBarcode] = React.useState('');
  const [quickName, setQuickName] = React.useState('');
  const [quickDefaultCode, setQuickDefaultCode] = React.useState('');
  const [quickSize, setQuickSize] = React.useState('');
  const [quickCategory, setQuickCategory] = React.useState('');
  const [quickDescription, setQuickDescription] = React.useState('');
  const [quickDescriptionMm, setQuickDescriptionMm] = React.useState('');
  const [quickSalePrice, setQuickSalePrice] = React.useState('');
  const [quickStock, setQuickStock] = React.useState('');
  const [quickImageUrl, setQuickImageUrl] = React.useState('');
  const [quickImageFile, setQuickImageFile] = React.useState<File | null>(null);
  const [quickImagePreviewUrl, setQuickImagePreviewUrl] = React.useState<string | null>(null);
  const [quickRemark, setQuickRemark] = React.useState('');
  const [quickPurchasePrice, setQuickPurchasePrice] = React.useState('');
  const [quickError, setQuickError] = React.useState<string | null>(null);

  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [selectedMainCategory, setSelectedMainCategory] = React.useState<string | null>(null);
  const [isOnline, setIsOnline] = React.useState(true);
  const [offlineQueueCount, setOfflineQueueCount] = React.useState(0);

  // Delivery & Customer State
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [customerAddress, setCustomerAddress] = React.useState('');
  const [saleType, setSaleType] = React.useState<'Shop' | 'Delivery'>('Shop');
  const [courierName, setCourierName] = React.useState('');
  const [deliFee, setDeliFee] = React.useState('');
  const [amountReceived, setAmountReceived] = React.useState('');
  const [isBagoSpecial, setIsBagoSpecial] = React.useState(false);
  const [remark, setRemark] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [customerMatch, setCustomerMatch] = React.useState<{ name: string | null; address: string | null; phone: string } | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    if (!posHydrated || typeof window === 'undefined') return;
    const payload: PersistedPosState = {
      cart: cart.map((line) => ({
        productId: line.product.id,
        quantity: line.quantity,
        manualPrice: line.manualPrice,
      })),
      customerName,
      customerPhone,
      customerAddress,
      saleType,
      paymentMethod,
      courierName,
      deliFee,
      isBagoSpecial,
      remark,
      amountReceived,
    };
    window.localStorage.setItem(POS_STATE_KEY, JSON.stringify(payload));
  }, [
    posHydrated,
    cart,
    customerName,
    customerPhone,
    customerAddress,
    saleType,
    paymentMethod,
    courierName,
    deliFee,
    isBagoSpecial,
    remark,
    amountReceived,
  ]);
  
  // Last Toast Time Ref
  const lastToastRef = React.useRef<{ msg: string; time: number } | null>(null);
  const OFFLINE_SALES_KEY = 'tmyg-offline-sales-v1';

  const refreshOfflineQueueCount = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(OFFLINE_SALES_KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      setOfflineQueueCount(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setOfflineQueueCount(0);
    }
  }, []);

  const mainCategoriesList = React.useMemo(() => {
    if ((dbCategories ?? []).length > 0) {
      return dbCategories.map((c, idx) => ({
        id: String(c.id ?? idx),
        name: (c.name || '').split('/').pop()?.trim() || '',
        icon: ['Sparkles', 'Droplets', 'Wind', 'Palette', 'Scissors'][idx % 5],
      }));
    }
    const fromProducts = new Set<string>();
    (products ?? []).forEach((p) => {
      if (p?.category) {
        const flat = p.category.split('/').pop()?.trim();
        if (flat) fromProducts.add(flat);
      }
    });
    return Array.from(fromProducts).sort().map((name, idx) => ({
      id: `prod-${idx}`,
      name,
      icon: ['Sparkles', 'Droplets', 'Wind', 'Palette', 'Scissors'][idx % 5],
    }));
  }, [dbCategories, products]);

  const [editingProductId, setEditingProductId] = React.useState<number | null>(null);
  const [tempPrice, setTempPrice] = React.useState('');

  const addToast = React.useCallback((type: Toast['type'], message: string) => {
    const now = Date.now();
    if (lastToastRef.current && lastToastRef.current.msg === message && now - lastToastRef.current.time < 2000) {
      return; // Prevent duplicate toasts
    }
    lastToastRef.current = { msg: message, time: now };
    
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateOnline = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      refreshOfflineQueueCount();
      if (online && offlineQueueCount > 0) {
        addToast('success', `${offlineQueueCount} offline sales ready to sync.`);
      }
      if (!online) {
        addToast('error', 'Offline mode: sales will be queued.');
      }
    };
    updateOnline();
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, [addToast, offlineQueueCount, refreshOfflineQueueCount]);

  React.useEffect(() => {
    setProductsOverride(null);
  }, [hookProducts]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== PRODUCTS_REFRESH_KEY) return;
      lastProductsRefreshRef.current = event.newValue ?? null;
      refreshProducts();
      setProductsOverride(null);
    };
    const handleRefreshEvent = () => {
      refreshProducts();
      setProductsOverride(null);
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('products-refresh', handleRefreshEvent);
    const marker = window.localStorage.getItem(PRODUCTS_REFRESH_KEY);
    if (marker && marker !== lastProductsRefreshRef.current) {
      lastProductsRefreshRef.current = marker;
      refreshProducts();
      setProductsOverride(null);
    }
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('products-refresh', handleRefreshEvent);
    };
  }, [refreshProducts]);

  React.useEffect(() => {
    searchRef.current?.focus();
    if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
      addToast('error', 'Camera requires HTTPS. Please use an SSL tunnel or local dev tools.');
    }
  }, [addToast]);
  React.useEffect(() => {
    if (saleType !== 'Delivery') {
      setCustomerMatch(null);
      return;
    }
    const rawPhone = customerPhone.trim();
    const tokens = rawPhone.replace(/[^\d+]/g, ' ').split(' ').filter(Boolean);
    const candidates = (tokens.length ? tokens : [rawPhone]).filter((value) => value.length >= 4).slice(0, 2);
    if (candidates.length === 0) {
      setCustomerMatch(null);
      return;
    }
    const timer = setTimeout(async () => {
      const orClause = [
        ...candidates.map((value) => `phone.eq.${value}`),
        ...candidates.map((value) => `phone_2.eq.${value}`),
      ].join(',');
      const { data, error } = await supabaseClient
        .from('customers')
        .select('phone, phone_2, name, address')
        .or(orClause)
        .maybeSingle();
      if (error) {
        console.error('Customer lookup error:', error);
        return;
      }
      const record = data ?? null;
      const matchedPhone = record?.phone ?? record?.phone_2;
      if (matchedPhone) {
        setCustomerMatch({ phone: matchedPhone, name: record?.name ?? null, address: record?.address ?? null });
        if (record?.name) setCustomerName(record.name);
        if (record?.address) setCustomerAddress(record.address);
      } else {
        setCustomerMatch(null);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [customerPhone, saleType]);
  React.useEffect(() => {
    if (!scanOpen) {
      releaseScanner();
      return;
    }
    return () => {
      releaseScanner();
    };
  }, [scanOpen, releaseScanner]);
  React.useEffect(() => {
    return () => {
      if (scanUnlockTimeoutRef.current) {
        clearTimeout(scanUnlockTimeoutRef.current);
      }
      releaseScanner();
    };
  }, [releaseScanner]);

  const normalizeString = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const matches = React.useMemo(() => {
    const q = normalizeString(query.trim());
    const items = products || [];
    return items.filter((p) => {
      const name = normalizeString(p?.product_name ?? '');
      const barcode = normalizeBarcode(p?.barcode).toLowerCase();
      const sku = (p?.default_code ?? '').toLowerCase();
      const categoryStr = (p?.category ?? '');
      const main = categoryStr.split('/').pop()?.trim() ?? '';

      const matchesQuery = name.includes(q) || barcode.includes(q) || sku.includes(q);

      let matchesCategory = true;
      if (selectedMainCategory) {
        if (main !== selectedMainCategory && categoryStr !== selectedMainCategory) {
          matchesCategory = false;
        }
      }

      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedMainCategory]);

  const { mainCategories, allCategories } = React.useMemo(() => {
    if (dbCategories.length > 0) {
      const names = dbCategories.map((cat) => cat.name).filter(Boolean);
      return { mainCategories: names, allCategories: names };
    }
    const allCats = new Set<string>();
    products.forEach((p) => {
      if (p.category) {
        const flat = p.category.split('/').pop()?.trim();
        if (flat) allCats.add(flat);
      }
    });
    const list = Array.from(allCats).sort();
    return { mainCategories: list, allCategories: list };
  }, [dbCategories, products]);

  const categoryOptions = React.useMemo(
    () => allCategories.map((name) => ({ value: name, label: name })),
    [allCategories]
  );

  const totalAmount = React.useMemo(
    () =>
      cart.reduce(
        (sum, line) => sum + (line.manualPrice ?? line.product.sale_price ?? 0) * line.quantity,
        0
      ),
    [cart]
  );
  const deliveryFeeNum = saleType === 'Delivery' ? Number(deliFee) || 0 : 0;
  const grandTotal = totalAmount + deliveryFeeNum;
  const amountReceivedNum = Number(amountReceived) || 0;
  const amountDue = Math.max(0, grandTotal - amountReceivedNum);
  const changeAmount = Math.max(0, amountReceivedNum - grandTotal);

  const cartQtyByProductId = React.useMemo(() => {
    const m = new Map<number, number>();
    for (const line of cart) {
      m.set(line.product.id, (m.get(line.product.id) ?? 0) + line.quantity);
    }
    return m;
  }, [cart]);

  const triggerCartPulse = React.useCallback(() => {
    if (cartPulseTimeoutRef.current) {
      clearTimeout(cartPulseTimeoutRef.current);
    }
    setCartPulse(true);
    cartPulseTimeoutRef.current = setTimeout(() => {
      setCartPulse(false);
    }, 200);
  }, []);

  React.useEffect(() => {
    return () => {
      if (cartPulseTimeoutRef.current) {
        clearTimeout(cartPulseTimeoutRef.current);
      }
    };
  }, []);

  function addToCart(product: Product, qty: number = 1) {
    const stock = product.stock_quantity ?? 0;
    const inCart = cartQtyByProductId.get(product.id) ?? 0;
    const maxAdd = Math.max(0, stock - inCart);
    if (maxAdd === 0) {
      addToast('error', 'Out of stock for this product.');
      return;
    }
    const add = Math.min(qty, maxAdd);
    setCart((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + add };
        return next;
      }
      return [...prev, { product, quantity: add }];
    });
    setQuery('');
    searchRef.current?.focus();
    triggerCartPulse();
  }

  function setCartQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((l) => l.product.id !== productId));
      return;
    }
    const product = products.find((p) => p.id === productId);
    const stock = product?.stock_quantity ?? 0;
    const clamped = Math.min(quantity, stock);
    setCart((prev) => {
      const i = prev.findIndex((l) => l.product.id === productId);
      if (i < 0) return prev;
      const next = [...prev];
      next[i] = { ...next[i], quantity: clamped };
      return next;
    });
  }

  function setCartPrice(productId: number, price: number) {
    setCart((prev) => {
      const i = prev.findIndex((l) => l.product.id === productId);
      if (i < 0) return prev;
      const next = [...prev];
      next[i] = { ...next[i], manualPrice: price };
      return next;
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((l) => l.product.id !== productId));
  }

  const canCheckout = React.useMemo(() => {
    if (cart.length === 0) return false;
    
    // Stock check
    const stockOk = cart.every((line) => {
      const stock = line.product.stock_quantity ?? 0;
      return line.quantity <= stock;
    });
    if (!stockOk) return false;

    // Mode specific checks
    if (saleType === 'Delivery') {
      // Make customer fields optional for delivery if needed, but at least allow checkout if user confirms
      // Assuming 'Confirm Delivery' implies user has filled what's necessary.
      // If we want to make them optional:
      return true; 
    }
    
    // For Shop mode, we allow checkout without customer details
    return true;
  }, [cart, saleType, customerName, customerPhone, customerAddress]);

  async function handleCheckout() {
    if (!canCheckout || checkingOut) return;
    setCheckoutError(null);
    setCheckoutSuccessOpen(false);
    setCheckingOut(true);
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        setCheckoutError('Not logged in.');
        setCheckingOut(false);
        return;
      }
      const now = new Date();
      const deliveryFee = saleType === 'Delivery' ? Number(deliFee) || 0 : 0;
      const receivedAmount = Number(amountReceived) || 0;
      const receiptItems: ReceiptItem[] = cart.map((line) => {
        const price = line.manualPrice ?? line.product.sale_price ?? 0;
        return {
          name: line.product.product_name ?? 'Item',
          qty: line.quantity,
          price,
          amount: price * line.quantity,
        };
      });
      const receiptTotal = totalAmount + deliveryFee;
      const changeDue = Math.max(0, receivedAmount - receiptTotal);
      const amountDueValue = Math.max(0, receiptTotal - receivedAmount);
      const receiptSnapshot: ReceiptData = {
        invoiceId: '',
        date: now.toLocaleDateString('en-US'),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        staffName: displayName?.trim() || formatStaffName(username),
        cashierRole: formatRole(role),
        saleType,
        customerName,
        customerPhone,
        customerAddress,
        customer: {
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
        },
        items: receiptItems,
        subtotal: totalAmount,
        deliveryFee,
        discount: 0,
        grandTotal: receiptTotal,
        amountReceived: receivedAmount,
        changeAmount: changeDue,
        amountDue: amountDueValue,
      };
      const items = cart.map((line) => ({
        product_id: Number(line.product.id),
        quantity: line.quantity,
        sale_price: line.manualPrice ?? line.product.sale_price ?? 0,
      }));
      if (typeof window !== 'undefined' && !navigator.onLine) {
        const raw = window.localStorage.getItem(OFFLINE_SALES_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        const queued = Array.isArray(parsed) ? parsed : [];
        queued.push({
          created_at: new Date().toISOString(),
          items,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_address: customerAddress,
          sale_type: saleType === 'Delivery' ? 'Delivery' : 'Shop',
          payment_method: paymentMethod,
          remark: remark,
          receipt_payload: receiptSnapshot,
          delivery_info: saleType === 'Delivery' ? {
            courier_name: courierName,
            deli_fee: Number(deliFee),
            is_bago_special: isBagoSpecial
          } : null
        });
        window.localStorage.setItem(OFFLINE_SALES_KEY, JSON.stringify(queued));
        refreshOfflineQueueCount();
        clearPosState();
        setIsConfirmingCheckout(false);
        setLastReceipt(receiptSnapshot);
        setCheckoutSuccessOpen(true);
        addToast('success', 'Sale saved offline. Will sync when online.');
        setCheckingOut(false);
        return;
      }

      const res = await fetch('/api/pos/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          items,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_address: customerAddress,
          sale_type: saleType === 'Delivery' ? 'Delivery' : 'Shop',
          payment_method: paymentMethod,
          remark: remark,
          receipt_payload: receiptSnapshot,
          delivery_info: saleType === 'Delivery' ? {
            courier_name: courierName,
            deli_fee: Number(deliFee),
            is_bago_special: isBagoSpecial
          } : null
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.error ?? res.statusText ?? 'Checkout failed';
        const finalMessage = `Error: ${message}`;
        setCheckoutError(finalMessage);
        addToast('error', finalMessage);
        setCheckingOut(false);
        return;
      }
      clearPosState();
      setIsConfirmingCheckout(false);
      const invoiceIdValue = data?.invoiceId ?? '';
      setCheckoutInvoiceId(invoiceIdValue || null);
      const finalReceipt = { ...receiptSnapshot, invoiceId: invoiceIdValue };
      setLastReceipt(finalReceipt);
      setCheckoutSuccessOpen(true);
      if (Array.isArray(data?.products)) {
        setProductsOverride(data.products as Product[]);
      } else {
        await refreshProducts();
      }
      searchRef.current?.focus();
      addToast('success', 'Sale Successful - Stock Updated');
    } catch (e) {
      console.error('FULL API ERROR:', e);
      const msg = e instanceof Error ? e.message : 'Checkout failed';
      const finalMessage = `Error: ${msg}`;
      setCheckoutError(finalMessage);
      addToast('error', finalMessage);
      setCheckingOut(false);
    } finally {
      setCheckingOut(false);
    }
  }

  const handlePrintReceipt = () => {
    if (!lastReceipt) return;
    window.print();
  };

  const clearPosState = React.useCallback(() => {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setSaleType('Shop');
    setCourierName('');
    setDeliFee('');
    setAmountReceived('');
    setIsBagoSpecial(false);
    setRemark('');
    setPaymentMethod('cash');
    setCustomerMatch(null);
    setQuery('');
    setMissingBarcode(null);
    clearPersistedPos();
  }, [clearPersistedPos]);

  const handleCloseSuccessModal = () => {
    setCheckoutSuccessOpen(false);
    clearPosState();
    setCheckoutInvoiceId(null);
    setLastReceipt(null);
    setCheckoutError(null);
    setCheckoutMode(false);
    setProductsOverride(null);
    setCartSidebarKey((value) => value + 1);
  };

  const isLocked = React.useRef(false);
  const lastScanByCodeRef = React.useRef<Record<string, number>>({});
  const [resumeScanAfterQuickAdd, setResumeScanAfterQuickAdd] = React.useState(false);

  const openQuickAddForBarcode = (code: string, options?: { resumeScanner?: boolean }) => {
    setQuickBarcode(code);
    setQuickName('');
    setQuickDefaultCode('');
    setQuickSize('');
    setQuickCategory('');
    setQuickDescription('');
    setQuickDescriptionMm('');
    setQuickSalePrice('');
    setQuickStock('');
    setQuickImageUrl('');
    setQuickImageFile(null);
    setQuickImagePreviewUrl(null);
    setQuickRemark('');
    setQuickPurchasePrice('');
    setQuickError(null);
    setMissingBarcode(null);
    setQuickAddOpen(true);
    setResumeScanAfterQuickAdd(options?.resumeScanner === true);
  };

  function handleScannedBarcode(raw: string) {
    if (isLocked.current) return false;
    if (typeof window !== 'undefined' && (window as any).isProcessingScan) return false;
    
    isLocked.current = true;
    if (typeof window !== 'undefined') {
      (window as any).isProcessingScan = true;
    }

    const code = normalizeBarcode(raw);
    if (!code) {
      if (scanUnlockTimeoutRef.current) {
        clearTimeout(scanUnlockTimeoutRef.current);
      }
      scanUnlockTimeoutRef.current = setTimeout(() => {
        isLocked.current = false;
      }, 3000);
      return false;
    }

    const lastScanAt = lastScanByCodeRef.current[code] ?? 0;
    if (Date.now() - lastScanAt < 1500) {
      if (scanUnlockTimeoutRef.current) {
        clearTimeout(scanUnlockTimeoutRef.current);
      }
      scanUnlockTimeoutRef.current = setTimeout(() => {
        isLocked.current = false;
        isProcessingScan.current = false;
        if (typeof window !== 'undefined') {
          (window as any).isProcessingScan = false;
        }
      }, 300);
      return false;
    }

    const existing = products.find(
      (p) => normalizeBarcode(p.barcode).toLowerCase() === code.toLowerCase()
    );
    
    if (existing) {
      setMissingBarcode(null);
      setScanStatus('found');
      addToCart(existing, 1);
      lastScanByCodeRef.current[code] = Date.now();
      addToast('success', 'Product Added!');
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.value = 0.05;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setTimeout(() => {
          osc.stop();
          ctx.close();
        }, 120);
      } catch {}
      if (scanUnlockTimeoutRef.current) {
        clearTimeout(scanUnlockTimeoutRef.current);
      }
      scanUnlockTimeoutRef.current = setTimeout(() => {
        isLocked.current = false;
        isProcessingScan.current = false;
        if (typeof window !== 'undefined') {
          (window as any).isProcessingScan = false;
        }
      }, 300);
      return true;
    }

    setMissingBarcode(code);
    setScanStatus('missing');
    addToast('error', 'Product Not Found');
    openQuickAddForBarcode(code, { resumeScanner: true });
    if (scanUnlockTimeoutRef.current) {
      clearTimeout(scanUnlockTimeoutRef.current);
    }
    scanUnlockTimeoutRef.current = setTimeout(() => {
      isLocked.current = false;
      isProcessingScan.current = false;
      if (typeof window !== 'undefined') {
        (window as any).isProcessingScan = false;
      }
    }, 300);
    return false;
  }

  const isScannerModalOpen = scanOpen && !quickAddOpen && !selectedProduct && !isConfirmingCheckout;

  React.useEffect(() => {
    if (!isScannerModalOpen) return;
    setScanStatus('scanning');
    if (typeof window !== 'undefined') {
      (window as any).isProcessingScan = false;
    }
  }, [isScannerModalOpen]);

  React.useEffect(() => {
    if (scanOpen) {
      isLocked.current = false;
      setScanStatus('scanning');
      if (typeof window !== 'undefined') {
        (window as any).isProcessingScan = false;
      }
    }
  }, [scanOpen]);

  React.useEffect(() => {
    if (quickImageFile) {
      const url = URL.createObjectURL(quickImageFile);
      setQuickImagePreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    const trimmed = quickImageUrl.trim();
    if (trimmed) {
      setQuickImagePreviewUrl(trimmed);
      return;
    }
    setQuickImagePreviewUrl(null);
  }, [quickImageFile, quickImageUrl]);

  const uploadQuickAddImage = React.useCallback(
    async (productId: number, file: File) => {
      const compressed = await compressImageFile(file, 600);
      const path = `public/product-${productId}-${Date.now()}.jpg`;
      const contentType = compressed.type || 'image/jpeg';
      const { error: uploadError } = await supabaseClient.storage
        .from('product-images')
        .upload(path, compressed, { upsert: true, contentType });
      if (uploadError) {
        return { error: uploadError.message || 'Image upload failed.' };
      }
      const { data: publicData } = supabaseClient.storage
        .from('product-images')
        .getPublicUrl(path);
      if (!publicData?.publicUrl) {
        return { error: 'Image uploaded but public URL was not returned.' };
      }
      const separator = publicData.publicUrl.includes('?') ? '&' : '?';
      return { url: `${publicData.publicUrl}${separator}t=${Date.now()}` };
    },
    []
  );

  async function handleQuickAddSave() {
    setQuickError(null);
    const name = quickName.trim();
    const salePriceValue = quickSalePrice.trim();
    const salePrice = Number(salePriceValue);
    const stockQtyValue = quickStock.trim();
    const stockQty = stockQtyValue ? Number(stockQtyValue) : 0;
    if (!name) {
      setQuickError('Product name is required.');
      return;
    }
    if (!salePriceValue) {
      setQuickError('Sale price is required.');
      return;
    }
    if (!Number.isFinite(salePrice) || salePrice < 0) {
      setQuickError('Sale price must be a non-negative number.');
      return;
    }
    if (stockQtyValue && (!Number.isFinite(stockQty) || stockQty < 0)) {
      setQuickError('Stock quantity must be a non-negative number.');
      return;
    }
    if (quickPurchasePrice.trim()) {
      const purchase = Number(quickPurchasePrice);
      if (!Number.isFinite(purchase) || purchase < 0) {
        setQuickError('Purchase price must be a non-negative number.');
        return;
      }
    }

    try {
      // Check if barcode already exists
      if (quickBarcode) {
        const { data: existing } = await supabaseClient
          .from('products')
          .select('id, stock_quantity, product_name')
          .eq('barcode', quickBarcode)
          .maybeSingle();

        if (existing) {
          const newStock = (existing.stock_quantity ?? 0) + stockQty;
          const { error: updateError } = await supabaseClient
            .from('products')
            .update({ stock_quantity: newStock })
            .eq('id', existing.id);

          if (updateError) {
            setQuickError(updateError.message);
            return;
          }

          addToast('success', `Updated stock for existing product: ${existing.product_name}`);
          await refreshProducts();
          const updatedProduct = products.find(p => p.id === existing.id);
          if (updatedProduct) {
            addToCart({ ...updatedProduct, stock_quantity: newStock }, 1);
          }
          setQuickAddOpen(false);
          if (resumeScanAfterQuickAdd) {
            setResumeScanAfterQuickAdd(false);
            setScanOpen(true);
          }
          return;
        }
      }

      const payload = {
        product_name: name || null,
        barcode: quickBarcode || null,
        category: quickCategory || null,
        default_code: quickDefaultCode || null,
        size: quickSize || null,
        sale_price: salePrice,
        purchase_price: role === 'admin' ? Number(quickPurchasePrice) || null : null,
        stock_quantity: stockQtyValue ? stockQty : null,
        description_en: quickDescription || null,
        description_mm: quickDescriptionMm || null,
        image_url: quickImageUrl || null,
        remark: quickRemark || null,
        reorder: 2,
      } as Record<string, unknown>;

      let { data, error } = await supabaseClient
        .from('products')
        .insert(payload)
        .select()
        .single();

      if (error && /duplicate key value violates unique constraint/i.test(error.message)) {
        await supabaseClient.rpc('sync_products_id_seq');
        ({ data, error } = await supabaseClient
          .from('products')
          .insert(payload)
          .select()
          .single());
      }

      if (error || !data) {
        const msg = error?.message ?? 'Failed to create product.';
        setQuickError(msg);
        addToast('error', msg);
        return;
      }

      let created = data as Product;
      if (quickImageFile) {
        const uploadResult = await uploadQuickAddImage(created.id, quickImageFile);
        if (uploadResult.error || !uploadResult.url) {
          setQuickError(uploadResult.error ?? 'Image upload failed.');
        } else {
          const { data: updated } = await supabaseClient
            .from('products')
            .update({ image_url: uploadResult.url })
            .eq('id', created.id)
            .select()
            .single();
          if (updated) {
            created = updated as Product;
          }
        }
      }
      // Add immediately to cart and close modal
      addToCart(created, 1);
      await refreshProducts();
      setQuickAddOpen(false);
      if (resumeScanAfterQuickAdd) {
        setResumeScanAfterQuickAdd(false);
        setScanOpen(true);
      }
      setQuickImageFile(null);
      setQuickImagePreviewUrl(null);
      addToast('success', `${created.product_name} added to inventory and cart.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to create product.';
      setQuickError(msg);
      addToast('error', msg);
    }
  }

  const selectedImageUrl = selectedProduct ? getValidImageUrl(selectedProduct.image_url) : null;

  return (
    <div className="flex h-screen max-h-[100vh] w-full overflow-hidden bg-background">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .print-only {
          display: none;
        }
        @media print {
          body {
            background: #fff;
            color: #000;
          }
          body * {
            visibility: hidden;
          }
          #print-receipt,
          #print-receipt * {
            visibility: visible;
          }
          .print-only {
            display: block !important;
          }
          #print-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm;
            padding: 4mm;
            font-size: 11px;
            font-family: "Pyidaungsu", system-ui, sans-serif;
            line-height: 1.4;
          }
          #print-receipt .receipt-title {
            font-size: 13px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 6px;
          }
          #print-receipt .receipt-row {
            display: flex;
            justify-content: space-between;
            gap: 8px;
          }
          #print-receipt table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }
          #print-receipt th,
          #print-receipt td {
            padding: 2px 4px;
            vertical-align: top;
          }
          #print-receipt th {
            font-size: 10px;
            text-transform: uppercase;
          }
          #print-receipt .receipt-item {
            word-wrap: break-word;
            white-space: normal;
          }
          #print-receipt .receipt-amount {
            font-weight: 700;
          }
          #print-receipt .divider {
            border-top: 1px dashed #444;
            margin: 6px 0;
          }
        }
      `}</style>
      {lastReceipt && (
        <div id="print-receipt" className="print-only">
          <div className="receipt-title">THE MORE YOU GLOW BY INGYIN</div>
          <div className="receipt-row">
            <span>Invoice</span>
            <span>{lastReceipt.invoiceId || '—'}</span>
          </div>
          <div className="receipt-row">
            <span>Date</span>
            <span>{lastReceipt.date}</span>
          </div>
          <div className="receipt-row">
            <span>Time</span>
            <span>{lastReceipt.time}</span>
          </div>
          <div className="receipt-row">
            <span>Cashier</span>
            <span>{lastReceipt.cashierRole || 'Staff'}</span>
          </div>
          <div className="receipt-row">
            <span>Cashier Name</span>
            <span>{lastReceipt.staffName || '—'}</span>
          </div>
          {lastReceipt.saleType === 'Delivery' && (
            <>
              <div className="divider" />
              <div className="receipt-row">
                <span>Customer Name</span>
                <span>{lastReceipt.customerName || '—'}</span>
              </div>
              <div className="receipt-row">
                <span>Phone</span>
                <span>{lastReceipt.customerPhone || '—'}</span>
              </div>
              <div className="receipt-row">
                <span>Address</span>
                <span>{lastReceipt.customerAddress || '—'}</span>
              </div>
            </>
          )}
          <div className="divider" />
          <table>
            <thead>
              <tr>
                <th align="left" style={{ width: '44mm' }}>Item</th>
                <th align="right" style={{ width: '8mm' }}>Qty</th>
                <th align="right" style={{ width: '14mm' }}>Price</th>
                <th align="right" style={{ width: '14mm' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {lastReceipt.items.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td className="receipt-item">{item.name}</td>
                  <td align="right">{item.qty}</td>
                  <td align="right">{item.price.toLocaleString()}</td>
                  <td align="right" className="receipt-amount">{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="divider" />
          <div className="receipt-row">
            <span>Subtotal</span>
            <span>{lastReceipt.subtotal.toLocaleString()} Ks</span>
          </div>
          {lastReceipt.saleType === 'Delivery' && (
            <div className="receipt-row">
              <span>Delivery Fee (+)</span>
              <span>{lastReceipt.deliveryFee.toLocaleString()} Ks</span>
            </div>
          )}
          <div className="receipt-row">
            <span>Discount (-)</span>
            <span>{lastReceipt.discount.toLocaleString()} Ks</span>
          </div>
          <div className="receipt-row">
            <strong>Grand Total</strong>
            <strong>{lastReceipt.grandTotal.toLocaleString()} Ks</strong>
          </div>
          <div className="receipt-row">
            <span>Cash Received</span>
            <span>{lastReceipt.amountReceived.toLocaleString()} Ks</span>
          </div>
          {lastReceipt.amountDue > 0 ? (
            <div className="receipt-row">
              <span>Amount Due</span>
              <span>{lastReceipt.amountDue.toLocaleString()} Ks</span>
            </div>
          ) : (
            <div className="receipt-row">
              <span>Change</span>
              <span>{lastReceipt.changeAmount.toLocaleString()} Ks</span>
            </div>
          )}
        </div>
      )}
      {/* Main content area */}
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
            {/* Product area */}
            <MemoProductArea
              products={matches}
              query={query}
              onQueryChange={setQuery}
              onScanClick={() => setScanOpen(true)}
              onAddNewProduct={() => {
                openQuickAddForBarcode('', { resumeScanner: false });
              }}
              onAddToCart={addToCart}
              onProductClick={setSelectedProduct}
              categories={mainCategoriesList}
              activeCategory={selectedMainCategory}
              onCategoryChange={setSelectedMainCategory}
              loading={productsLoading}
              missingBarcode={missingBarcode}
              onQuickAdd={() => {
                if (!missingBarcode) return;
                openQuickAddForBarcode(missingBarcode, { resumeScanner: true });
                setMissingBarcode(null);
              }}
            />
          </div>

          {/* Cart sidebar */}
          <CartSidebar
            key={cartSidebarKey}
            cart={cart}
            onUpdateQuantity={setCartQuantity}
            onUpdatePrice={setCartPrice}
            onRemoveItem={removeFromCart}
            totalAmount={totalAmount}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            customerPhone={customerPhone}
            onCustomerPhoneChange={setCustomerPhone}
            customerAddress={customerAddress}
            onCustomerAddressChange={setCustomerAddress}
            customerMatch={customerMatch}
            saleType={saleType}
            onSaleTypeChange={setSaleType}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            courierName={courierName}
            onCourierNameChange={setCourierName}
            deliFee={deliFee}
            onDeliFeeChange={setDeliFee}
            amountReceived={amountReceived}
            onAmountReceivedChange={setAmountReceived}
            changeAmount={changeAmount}
            amountDue={amountDue}
            isBagoSpecial={isBagoSpecial}
            onBagoSpecialChange={setIsBagoSpecial}
            remark={remark}
            onRemarkChange={setRemark}
            onCheckout={() => setIsConfirmingCheckout(true)}
            isCheckingOut={checkingOut}
            canCheckout={canCheckout}
            checkoutError={checkoutError}
            collapsed={cartCollapsed}
            onToggleCollapse={() => setCartCollapsed(!cartCollapsed)}
            onClearCart={clearPosState}
            checkoutMode={checkoutMode}
            onToggleCheckout={() => setCheckoutMode(!checkoutMode)}
            isOnline={isOnline}
            offlineQueueCount={offlineQueueCount}
            cartPulse={cartPulse}
          />
        </div>
      </div>

      <ScannerModal
        open={isScannerModalOpen}
        elementId="reader"
        onClose={handleCloseScanner}
        onScanSuccess={(value: string) => {
          handleScannedBarcode(value);
        }}
        onScanError={(msg: string) => addToast('error', msg)}
        manualValue={manualBarcodeInput}
        onManualChange={setManualBarcodeInput}
        onManualSubmit={() => {
          handleScannedBarcode(manualBarcodeInput);
          setManualBarcodeInput('');
          setScanOpen(false);
        }}
        secondaryActionLabel="Quick Add Product"
        onSecondaryAction={() => {
          openQuickAddForBarcode(manualBarcodeInput.trim(), { resumeScanner: false });
          setManualBarcodeInput('');
          setScanOpen(false);
        }}
      />

      {/* Quick Add modal */}
      {
        quickAddOpen && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4"
            onClick={() => {
              setQuickAddOpen(false);
              setQuickError(null);
              setQuickImageFile(null);
              setQuickImagePreviewUrl(null);
              if (resumeScanAfterQuickAdd) {
                setResumeScanAfterQuickAdd(false);
                setScanOpen(true);
              } else if (scanOpen) {
                setScanOpen(false);
              }
            }}
          >
            <div
              className="w-full max-w-4xl rounded-2xl border border-border bg-card shadow-xl max-h-[80vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductForm
                title="New Product"
                barcode={quickBarcode}
                onBarcodeChange={setQuickBarcode}
                onBarcodeAction={() => {
                  setQuickAddOpen(false);
                  setScanOpen(true);
                }}
                name={quickName}
                onNameChange={setQuickName}
                sku={quickDefaultCode}
                onSkuChange={setQuickDefaultCode}
                size={quickSize}
                onSizeChange={setQuickSize}
                showPurchasePrice={role === 'admin'}
                category={quickCategory}
                onCategoryChange={setQuickCategory}
                categories={categoryOptions}
                purchasePrice={quickPurchasePrice}
                onPurchasePriceChange={setQuickPurchasePrice}
                salePrice={quickSalePrice}
                onSalePriceChange={setQuickSalePrice}
                stockQuantity={quickStock}
                onStockQuantityChange={setQuickStock}
                descriptionEn={quickDescription}
                onDescriptionEnChange={setQuickDescription}
                descriptionMm={quickDescriptionMm}
                onDescriptionMmChange={setQuickDescriptionMm}
                imageUrl={quickImageUrl}
                onImageUrlChange={setQuickImageUrl}
                onImageFileChange={setQuickImageFile}
                imagePreviewUrl={quickImagePreviewUrl}
                remark={quickRemark}
                onRemarkChange={setQuickRemark}
                error={quickError}
                onClose={() => {
                  setQuickAddOpen(false);
                  setQuickError(null);
                  setQuickImageFile(null);
                  setQuickImagePreviewUrl(null);
                  if (resumeScanAfterQuickAdd) {
                    setResumeScanAfterQuickAdd(false);
                    setScanOpen(true);
                  } else if (scanOpen) {
                    setScanOpen(false);
                  }
                }}
                onSave={handleQuickAddSave}
                saveLabel="Save & Add to Cart"
              />
            </div>
          </div>
        )
      }

      {/* Quick View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Sticky */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border bg-card shrink-0 z-10">
              <h2 className="text-xl font-bold truncate pr-4">{selectedProduct.product_name}</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl shrink-0"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-xl bg-muted overflow-hidden flex items-center justify-center border shrink-0">
                  {selectedImageUrl ? (
                    <img
                      src={selectedImageUrl}
                      alt={selectedProduct.product_name || ''}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '';
                      }}
                    />
                  ) : (
                    <Package className="h-16 w-16 opacity-10" />
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">Price</span>
                    <p className="text-2xl font-black text-[#8B5CF6]">{formatPrice(selectedProduct.sale_price ?? 0)}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">Inventory</span>
                    <p className={cn("text-lg font-bold", (selectedProduct.stock_quantity ?? 0) > 0 ? "text-primary" : "text-destructive")}>
                      {(selectedProduct.stock_quantity ?? 0)} available
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">Details</span>
                    <p className="text-sm text-muted-foreground">
                      Size: {selectedProduct.size || selectedProduct.variant || 'Standard'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Barcode: {selectedProduct.barcode || 'N/A'}
                    </p>
                    {selectedProduct.default_code && (
                      <p className="text-sm text-muted-foreground">
                        SKU: {selectedProduct.default_code}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {selectedProduct.description_en && (
                <div className="mt-6 space-y-2">
                  <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">Description</span>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg leading-relaxed">
                    {selectedProduct.description_en}
                  </p>
                </div>
              )}
            </div>

            {/* Footer - Sticky */}
            <div className="p-6 pt-4 border-t border-border bg-card shrink-0 flex gap-3 z-10">
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-xl font-bold text-base"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </Button>
              <Button
                className="flex-[2] h-14 rounded-xl font-black text-base shadow-lg shadow-primary/20"
                disabled={(selectedProduct.stock_quantity ?? 0) <= 0}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  addToast('success', `${selectedProduct.product_name} added to cart.`);
                }}
              >
                Confirm Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      {isConfirmingCheckout && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => !checkingOut && setIsConfirmingCheckout(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Confirm Sale</h2>
              <p className="text-sm text-muted-foreground">
                Please review the total amount before proceeding.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="font-bold">{formatPrice(totalAmount)}</span>
              </div>
              {saleType === 'Delivery' && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-bold">{formatPrice(Number(deliFee) || 0)}</span>
                </div>
              )}
              <div className="border-t border-dashed pt-3 flex justify-between items-center">
                <span className="font-bold text-base">Total Amount</span>
                <span className="font-black text-xl text-primary">
                  {formatPrice(totalAmount + (saleType === 'Delivery' ? (Number(deliFee) || 0) : 0))}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount Received
                </label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  placeholder="0"
                  className="h-12 rounded-xl"
                />
              </div>
              {amountDue > 0 ? (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center">
                  <div className="text-[11px] uppercase tracking-wider text-amber-700">Amount Due</div>
                  <div className="text-2xl font-black text-amber-700">
                    {formatPrice(amountDue)}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-700">Change</div>
                  <div className="text-2xl font-black text-emerald-700">
                    {formatPrice(changeAmount)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-bold border-cyan-400/70 text-cyan-400 hover:bg-cyan-500/10"
                onClick={() => setIsConfirmingCheckout(false)}
                disabled={checkingOut}
              >
                Cancel
              </Button>
              <Button
                className="flex-[1.5] h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                onClick={handleCheckout}
                disabled={checkingOut}
              >
                {checkingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Sale"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {checkoutSuccessOpen && (
        <div
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={handleCloseSuccessModal}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold">Payment Successful</h2>
              {checkoutInvoiceId && (
                <p className="text-sm text-muted-foreground">Invoice: {checkoutInvoiceId}</p>
              )}
              <p className="text-sm text-muted-foreground">Stock updated and cart cleared.</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-12 flex-1 rounded-xl font-bold"
                onClick={handlePrintReceipt}
                disabled={!lastReceipt}
              >
                Print
              </Button>
              <Button
                className="h-12 flex-1 rounded-xl font-bold"
                onClick={handleCloseSuccessModal}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      {
        toasts.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50 space-y-2">
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`rounded-md border px-3 py-2 text-sm shadow-md ${t.type === 'success'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                  : 'border-destructive/60 bg-destructive/10 text-destructive'
                  }`}
              >
                {t.message}
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
}
