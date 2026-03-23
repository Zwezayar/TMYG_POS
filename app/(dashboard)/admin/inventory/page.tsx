'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScannerModal } from '@/components/scanner/scanner-modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useCategories } from '@/lib/useCategories';
import { compressImageFile } from '@/lib/image';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import type { Product } from '@/lib/useProducts';
import { useT } from '@/components/language-provider';
import { ProductForm } from '@/components/forms/product-form';
import { parseCsv } from '@/lib/csv';
import { downloadExcel, downloadInventoryXlsxWithImages, type InventoryImageRow } from '@/lib/excel';
import { Loader2 } from 'lucide-react';

type PendingAction = {
  id: string;
  type: 'upsert';
  mode: 'create' | 'update';
  productId?: number;
  payload: {
    product_name: string;
    sale_price: number;
    purchase_price?: number | null;
    stock_quantity: number | null;
    default_code: string | null;
    image_url: string | null;
    size: string | null;
    description_en: string | null;
    description_mm: string | null;
    category: string | null;
    barcode: string | null;
    remark: string | null;
  };
  imageDataUrl?: string;
  imageMime?: string;
  createdAt: number;
};

const CACHE_KEY = 'admin-inventory-cache-v1';
const QUEUE_KEY = 'admin-inventory-queue-v1';
const PRODUCTS_REFRESH_KEY = 'products-refresh-v1';

type AdminProduct = Product;

function loadQueue(): PendingAction[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(QUEUE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as PendingAction[];
    return [];
  } catch {
    return [];
  }
}

function saveQueue(items: PendingAction[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
}

function loadCache(): AdminProduct[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(CACHE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as AdminProduct[];
    return [];
  } catch {
    return [];
  }
}

function saveCache(items: AdminProduct[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CACHE_KEY, JSON.stringify(items));
}

function dataUrlToBlob(dataUrl: string) {
  const [meta, content] = dataUrl.split(',');
  const match = /data:(.*);base64/.exec(meta || '');
  const mime = match?.[1] || 'image/jpeg';
  const binary = atob(content || '');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return { blob: new Blob([bytes], { type: mime }), mime };
}

function readFileAsDataUrl(file: File) {
  return new Promise<{ dataUrl: string; mime: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const match = /data:(.*);base64/.exec(result);
      const mime = match?.[1] || file.type || 'image/jpeg';
      resolve({ dataUrl: result, mime });
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

function formatPrice(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US').format(value) + ' Ks';
}

function withCacheBust(url: string) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
}

const InventoryRow = React.memo(function InventoryRow({
  product,
  onEdit,
  onDelete,
  deleting,
}: {
  product: AdminProduct;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
  deleting: boolean;
}) {
  return (
    <tr className="border-t border-border/40 hover:bg-secondary/40 h-[42px]">
      <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{product.id}</td>
      <td className="px-3 py-2">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name ?? 'Product'}
            className="h-10 w-10 rounded-md border border-border/70 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
            }}
          />
        ) : (
          <div className="h-10 w-10 rounded-md border border-dashed border-border/70 bg-muted/40" />
        )}
      </td>
      <td className="px-3 py-2 text-[12px] font-medium">{product.product_name || '—'}</td>
      <td className="px-3 py-2 text-[11px] text-muted-foreground">{product.default_code || '—'}</td>
      <td className="px-3 py-2 text-[11px] text-muted-foreground">{product.category || '—'}</td>
      <td className="px-3 py-2 text-[11px] text-muted-foreground">{product.size || product.variant || '—'}</td>
      <td className="px-3 py-2 text-[11px] text-muted-foreground">{product.barcode || '—'}</td>
      <td className="px-3 py-2 text-[11px] text-muted-foreground">{product.stock_quantity ?? '—'}</td>
      <td className="px-3 py-2 text-right text-[12px] font-semibold">{formatPrice(product.sale_price)}</td>
      <td className="px-3 py-2 text-right">
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-9 px-3 border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 px-3 border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
            onClick={() => onDelete(product)}
            disabled={deleting}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
});

export default function AdminInventoryPage() {
  const t = useT();
  const { role } = useDashboardAuth();
  const isAdmin = role === 'admin';
  const [products, setProducts] = React.useState<AdminProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState('');
  const [activeLetter, setActiveLetter] = React.useState<string | null>(null);
  const [sortRecent, setSortRecent] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  const [syncing, setSyncing] = React.useState(false);
  const [scannerOpen, setScannerOpen] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const [toasts, setToasts] = React.useState<{ id: number; type: 'success' | 'error'; message: string }[]>([]);
  const { categories: dbCategories, refresh: refreshCategories } = useCategories();
  const bulkInputRef = React.useRef<HTMLInputElement | null>(null);
  const [bulkStatus, setBulkStatus] = React.useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = React.useState(false);
  const [bulkReportOpen, setBulkReportOpen] = React.useState(false);
  const [bulkReport, setBulkReport] = React.useState<{
    inserted: string[];
    updated: string[];
    skipped: string[];
  } | null>(null);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [name, setName] = React.useState('');
  const [defaultCode, setDefaultCode] = React.useState('');
  const [size, setSize] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [costPrice, setCostPrice] = React.useState('');
  const [stockQuantity, setStockQuantity] = React.useState('');
  const [descriptionEn, setDescriptionEn] = React.useState('');
  const [descriptionMm, setDescriptionMm] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [barcode, setBarcode] = React.useState('');
  const [remark, setRemark] = React.useState('');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Product | null>(null);
  const [scanFlash, setScanFlash] = React.useState(false);
  const [scanStatus, setScanStatus] = React.useState<'scanning' | 'found' | 'missing'>('scanning');
  const [scanManualInput, setScanManualInput] = React.useState('');
  const [scanningForForm, setScanningForForm] = React.useState(false);
  const isBusy = saving || uploading;

  const addToast = React.useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const uploadProductImage = React.useCallback(
    async (productId: number, file: File) => {
      const compressed = await compressImageFile(file, 600);
      const path = `public/product-${productId}-${Date.now()}.jpg`;
      const contentType = compressed.type || 'image/jpeg';
      const { error: uploadError } = await supabaseClient.storage
        .from('product-images')
        .upload(path, compressed, {
          upsert: true,
          contentType,
        });
      if (uploadError) {
        return { error: uploadError.message || 'Image upload failed.' };
      }
      const { data: publicData } = supabaseClient.storage
        .from('product-images')
        .getPublicUrl(path);
      if (!publicData?.publicUrl) {
        return { error: 'Image uploaded but public URL was not returned.' };
      }
      return { url: withCacheBust(publicData.publicUrl) };
    },
    []
  );

  const onScanSuccess = React.useCallback((decodedText: string) => {
    if (dialogOpen && scanningForForm) {
      setBarcode(decodedText);
      setScanStatus('found');
      setScanningForForm(false);
      setScannerOpen(false);
      return;
    }
    setQuery(decodedText);
    setScanFlash(true);
    setTimeout(() => setScanFlash(false), 150);
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
    } catch { }
    const match = products.find(
      (p) => (p.barcode ?? '').toLowerCase() === decodedText.toLowerCase()
    );
    if (!match) {
      setScanStatus('missing');
      setEditing(null);
      setName('');
      setDefaultCode('');
    setSize('');
      setPrice('');
      setCostPrice('');
      setDescriptionEn('');
      setDescriptionMm('');
      setCategory('');
      setBarcode(decodedText);
      setImageFile(null);
      setImagePreviewUrl(null);
      setDialogOpen(true);
    } else {
      setScanStatus('found');
    }
    setScannerOpen(false);
  }, [dialogOpen, products, scanningForForm]);

  const handleManualBarcode = React.useCallback(() => {
    const value = scanManualInput.trim();
    if (!value) return;
    if (dialogOpen && scanningForForm) {
      setBarcode(value);
      setScanningForForm(false);
    } else {
      setQuery(value);
    }
    setScanManualInput('');
    setScannerOpen(false);
  }, [dialogOpen, scanManualInput, scanningForForm]);

  const handleCloseScanner = React.useCallback(() => {
    setScanManualInput('');
    setScannerOpen(false);
  }, []);

  const refreshProducts = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const selectFields = [
      'id',
      'product_name',
      'default_code',
      'barcode',
      'image_url',
      'category',
      'size',
      'variant',
      'sale_price',
      'stock_quantity',
      'description_en',
      'description_mm',
      'reorder',
      'remark',
      'created_at',
    ];
    if (isAdmin) {
      selectFields.push('purchase_price');
    }
    const { data, error: fetchError } = await supabaseClient
      .from('products')
      .select(selectFields.join(','))
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }
    const next = (data ?? []) as unknown as AdminProduct[];
    setProducts(next);
    saveCache(next);
    setLoading(false);
  }, [isAdmin]);

  const applyOptimistic = React.useCallback((next: AdminProduct[]) => {
    setProducts(next);
    saveCache(next);
  }, []);

  const resetForm = React.useCallback(() => {
    setName('');
    setDefaultCode('');
    setSize('');
    setPrice('');
    setCostPrice('');
    setStockQuantity('');
    setDescriptionEn('');
    setDescriptionMm('');
    setCategory('');
    setBarcode('');
    setImageUrlInput('');
    setRemark('');
    setImageFile(null);
    setImagePreviewUrl(null);
    setEditing(null);
    setUploading(false);
    setScanningForForm(false);
    setDialogOpen(false);
  }, []);

  const queueAction = React.useCallback(async (mode: 'create' | 'update', productId?: number) => {
    const parsedCost = costPrice.trim() ? Number(costPrice) : null;
    const parsedStock = stockQuantity.trim() ? Number(stockQuantity) : null;
    const payload: PendingAction['payload'] = {
      product_name: name.trim(),
      sale_price: Number(price),
      stock_quantity: Number.isFinite(parsedStock as number) ? parsedStock : null,
      default_code: defaultCode.trim() || null,
      size: size.trim() || null,
      description_en: descriptionEn.trim() || null,
      description_mm: descriptionMm.trim() || null,
      category: category.trim() || null,
      barcode: barcode.trim() || null,
      image_url: imageUrlInput.trim() || null,
      remark: remark.trim() || null,
    };
    if (isAdmin) {
      payload.purchase_price = Number.isFinite(parsedCost as number) ? parsedCost : null;
    }
    const item: PendingAction = {
      id: crypto.randomUUID(),
      type: 'upsert',
      mode,
      productId,
      payload,
      createdAt: Date.now(),
    };
    if (imageFile) {
      const { dataUrl, mime } = await readFileAsDataUrl(imageFile);
      item.imageDataUrl = dataUrl;
      item.imageMime = mime;
    }
    const queue = loadQueue();
    queue.push(item);
    saveQueue(queue);
    const tempId = mode === 'create' ? -Date.now() : productId ?? -Date.now();
    const optimistic: AdminProduct = {
      id: tempId,
      product_name: payload.product_name,
      default_code: payload.default_code,
      barcode: payload.barcode,
      image_url: item.imageDataUrl ?? payload.image_url ?? null,
      category: payload.category,
      size: payload.size,
      variant: null,
      purchase_price: payload.purchase_price ?? null,
      sale_price: payload.sale_price,
      stock_quantity: payload.stock_quantity,
      description_en: payload.description_en,
      description_mm: payload.description_mm,
      reorder: 2,
      remark: payload.remark,
      created_at: new Date().toISOString(),
    };
    if (mode === 'create') {
      applyOptimistic([optimistic, ...products]);
    } else {
      applyOptimistic(products.map((p) => (p.id === productId ? { ...p, ...optimistic, id: productId! } : p)));
    }
  }, [applyOptimistic, barcode, category, costPrice, defaultCode, descriptionEn, descriptionMm, imageFile, isAdmin, name, price, products, remark, size, stockQuantity, imageUrlInput]);

  const syncQueue = React.useCallback(async () => {
    if (!isOnline) return;
    const queue = loadQueue();
    if (queue.length === 0) return;
    setSyncing(true);
    const remaining: PendingAction[] = [];
    for (const item of queue) {
      try {
        if (item.mode === 'create') {
          const { data, error: insertError } = await supabaseClient
            .from('products')
            .insert({ ...item.payload, image_url: item.imageDataUrl ? null : item.payload.image_url ?? null })
            .select()
            .single();
          if (insertError || !data) {
            remaining.push(item);
            continue;
          }
          if (item.imageDataUrl) {
            const { blob, mime } = dataUrlToBlob(item.imageDataUrl);
            const path = `public/product-${data.id}-${Date.now()}.jpg`;
            const { error: uploadError } = await supabaseClient.storage
              .from('product-images')
              .upload(path, blob, { upsert: true, contentType: mime });
            if (uploadError) {
              setError(uploadError.message || 'Image upload failed.');
              remaining.push({ ...item, mode: 'update', productId: data.id });
              continue;
            }
            const { data: publicData } = supabaseClient.storage
              .from('product-images')
              .getPublicUrl(path);
            if (!publicData?.publicUrl) {
              setError('Image uploaded but public URL was not returned.');
              remaining.push({ ...item, mode: 'update', productId: data.id });
              continue;
            }
            const imageUrl = withCacheBust(publicData.publicUrl);
            const { error: updateError } = await supabaseClient
              .from('products')
              .update({ image_url: imageUrl })
              .eq('id', data.id);
            if (updateError) {
              remaining.push({ ...item, mode: 'update', productId: data.id });
              continue;
            }
          }
        } else {
          let imageUrl: string | null = null;
          if (item.imageDataUrl && item.productId != null) {
            const { blob, mime } = dataUrlToBlob(item.imageDataUrl);
            const path = `public/product-${item.productId}-${Date.now()}.jpg`;
            const { error: uploadError } = await supabaseClient.storage
              .from('product-images')
              .upload(path, blob, { upsert: true, contentType: mime });
            if (uploadError) {
              setError(uploadError.message || 'Image upload failed.');
              remaining.push(item);
              continue;
            }
            const { data: publicData } = supabaseClient.storage
              .from('product-images')
              .getPublicUrl(path);
            if (!publicData?.publicUrl) {
              setError('Image uploaded but public URL was not returned.');
              remaining.push(item);
              continue;
            }
            imageUrl = withCacheBust(publicData.publicUrl);
          }
          const payload: Record<string, any> = {
            ...item.payload,
            ...(imageUrl ? { image_url: imageUrl } : {}),
          };
          if (payload.purchase_price === undefined) {
            delete payload.purchase_price;
          }
          const { error: updateError } = await supabaseClient
            .from('products')
            .update(payload)
            .eq('id', item.productId);
          if (updateError) {
            remaining.push(item);
            continue;
          }
        }
      } catch {
        remaining.push(item);
      }
    }
    saveQueue(remaining);
    setSyncing(false);
    await refreshProducts();
  }, [isOnline, refreshProducts]);

  React.useEffect(() => {
    const cached = loadCache();
    if (cached.length > 0) {
      setProducts(cached);
    }
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    setIsOnline(online);
    if (online) {
      refreshProducts();
    } else {
      setLoading(false);
    }
  }, [refreshProducts]);

  const handleDownloadTemplate = React.useCallback(() => {
    downloadExcel('inventory-template.xlsx', [
      isAdmin
        ? ['Barcode', 'Name', 'Category', 'Size', 'CostPrice', 'SalePrice', 'Stock', 'ImageURL']
        : ['Barcode', 'Name', 'Category', 'Size', 'SalePrice', 'Stock', 'ImageURL'],
    ]);
  }, [isAdmin]);

  const buildExportRows = React.useCallback((items: AdminProduct[]) => {
    const header = isAdmin
      ? ['No', 'Image', 'Barcode', 'Name', 'Category', 'Size', 'CostPrice', 'SalePrice', 'Stock', 'ActualCount', 'Remark']
      : ['No', 'Image', 'Barcode', 'Name', 'Category', 'Size', 'SalePrice', 'Stock', 'ActualCount', 'Remark'];
    const sorted = [...items].sort((a, b) => {
      const categoryA = (a.category ?? '').toLowerCase();
      const categoryB = (b.category ?? '').toLowerCase();
      if (categoryA !== categoryB) return categoryA.localeCompare(categoryB);
      return (a.product_name ?? '').localeCompare(b.product_name ?? '', undefined, { sensitivity: 'base' });
    });
    const rows: InventoryImageRow[] = sorted.map((p, index) => {
      const base = [
        index + 1,
        '',
        p.barcode ?? '',
        p.product_name ?? '',
        p.category ?? '',
        p.size ?? p.variant ?? '',
      ];
      if (isAdmin) {
        base.push(String(p.purchase_price ?? ''));
      }
      base.push(
        String(p.sale_price ?? ''),
        String(p.stock_quantity ?? ''),
        '',
        ''
      );
      return { cells: base, imageUrl: p.image_url ?? null };
    });
    return { header, rows };
  }, [isAdmin]);

  const handleExportInventory = React.useCallback(async () => {
    setExporting(true);
    try {
      const { header, rows } = buildExportRows(products);
      const result = await downloadInventoryXlsxWithImages({
        filename: 'inventory-export.xlsx',
        header,
        rows,
        imageColumnIndex: header.indexOf('Image') + 1,
        thumbnailSize: 50,
        rowHeight: 50,
      });
      if (result.failedImages > 0) {
        addToast('error', t('exportError'));
      } else {
        addToast('success', t('exportSuccess'));
      }
    } catch {
      addToast('error', t('exportError'));
    } finally {
      setExporting(false);
    }
  }, [products, buildExportRows, addToast, t]);

  const handleExportRecent = React.useCallback(async () => {
    setExporting(true);
    try {
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      const recent = products.filter((p) => {
        if (!p.created_at) return false;
        return Date.parse(p.created_at) >= cutoff;
      });
      const { header, rows } = buildExportRows(recent);
      const result = await downloadInventoryXlsxWithImages({
        filename: 'inventory-export-recent.xlsx',
        header,
        rows,
        imageColumnIndex: header.indexOf('Image') + 1,
        thumbnailSize: 50,
        rowHeight: 50,
      });
      if (result.failedImages > 0) {
        addToast('error', t('exportError'));
      } else {
        addToast('success', t('exportSuccess'));
      }
    } catch {
      addToast('error', t('exportError'));
    } finally {
      setExporting(false);
    }
  }, [products, buildExportRows, addToast, t]);

  const handleBulkFile = React.useCallback(
    async (file: File) => {
      if (!isOnline) {
        setError('Bulk upload requires an online connection.');
        return;
      }
      setBulkLoading(true);
      setBulkStatus(null);
      setError(null);
      try {
        let rows: string[][] = [];
        if (/\.(xlsx|xls)$/i.test(file.name)) {
          const arrayBuffer = await file.arrayBuffer();
          const XLSX = await import('xlsx');
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const sheetRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];
          rows = sheetRows.map((row) => row.map((cell) => String(cell ?? '').trim()));
        } else {
          const text = await file.text();
          rows = parseCsv(text);
        }
        if (rows.length < 2) {
          setError('No data rows found in upload.');
          setBulkLoading(false);
          return;
        }
        const header = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
        const idx = (key: string) => header.indexOf(key);
        const barcodeIdx = idx('barcode');
        const nameIdx = idx('name');
        const categoryIdx = idx('category');
        const sizeIdx = idx('size');
        const costIdx = isAdmin ? idx('costprice') : -1;
        const saleIdx = idx('saleprice');
        const stockIdx = idx('stock');
        const imageIdx = idx('imageurl');
        if (barcodeIdx < 0 || nameIdx < 0 || saleIdx < 0) {
          setError('Template columns missing. Use the provided template.');
          setBulkLoading(false);
          return;
        }
        const byBarcode = new Map<string, Product>();
        products.forEach((p) => {
          if (p.barcode) byBarcode.set(p.barcode, p);
        });
        const inserted: string[] = [];
        const updated: string[] = [];
        const skipped: string[] = [];
        for (let i = 1; i < rows.length; i += 1) {
          const row = rows[i];
          const barcode = (row[barcodeIdx] ?? '').toString().trim();
          const name = (row[nameIdx] ?? '').toString().trim();
          if (!barcode) {
            skipped.push(`Row ${i + 1}`);
            continue;
          }
        const categoryValue = categoryIdx >= 0 ? (row[categoryIdx] ?? '').toString().trim() : '';
        const sizeValue = sizeIdx >= 0 ? (row[sizeIdx] ?? '').toString().trim() : '';
          const costValue = costIdx >= 0 ? Number((row[costIdx] ?? '').toString().trim()) : null;
          const saleValue = saleIdx >= 0 ? Number((row[saleIdx] ?? '').toString().trim()) : null;
          const stockValue = stockIdx >= 0 ? Number((row[stockIdx] ?? '').toString().trim()) : null;
        const imageValue = imageIdx >= 0 ? (row[imageIdx] ?? '').toString().trim() : '';
          const payload: any = {
            barcode,
            sale_price: Number.isFinite(saleValue) ? saleValue : 0,
            stock_quantity: Number.isFinite(stockValue) ? stockValue : null,
          };
          if (isAdmin) {
            payload.purchase_price = Number.isFinite(costValue) ? costValue : null;
          }
        if (name) payload.product_name = name;
        if (categoryValue) payload.category = categoryValue;
        if (sizeValue) payload.size = sizeValue;
        if (imageValue) payload.image_url = imageValue;
          const existing = byBarcode.get(barcode);
          if (existing) {
            const { error: updateError } = await supabaseClient
              .from('products')
              .update(payload)
              .eq('id', existing.id);
            if (updateError) {
              skipped.push(barcode);
              continue;
            }
            updated.push(barcode);
          } else {
            if (!name) {
              skipped.push(barcode);
              continue;
            }
            const { error: insertError } = await supabaseClient
              .from('products')
              .insert({ ...payload, product_name: name, image_url: null })
              .select()
              .single();
            if (insertError) {
              skipped.push(barcode);
              continue;
            }
            inserted.push(barcode);
          }
        }
        await refreshProducts();
        setBulkStatus(`Upload complete. ${inserted.length} inserted, ${updated.length} updated, ${skipped.length} skipped.`);
        setBulkReport({ inserted, updated, skipped });
        setBulkReportOpen(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Bulk upload failed.';
        setError(message);
      } finally {
        setBulkLoading(false);
      }
    },
    [isOnline, products, refreshProducts, isAdmin]
  );

  React.useEffect(() => {
    const onOnline = () => {
      setIsOnline(true);
      syncQueue();
    };
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [syncQueue]);

  React.useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    const trimmed = imageUrlInput.trim();
    if (trimmed) {
      setImagePreviewUrl(trimmed);
      return;
    }
    setImagePreviewUrl(null);
  }, [imageFile, imageUrlInput]);

  const alphabet = React.useMemo(
    () => Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    []
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? products.filter((p) => {
          const nameValue = (p.product_name ?? '').toLowerCase();
          const skuValue = (p.default_code ?? '').toLowerCase();
          const barcodeValue = (p.barcode ?? '').toLowerCase();
          const categoryValue = (p.category ?? '').toLowerCase();
          const variantValue = (p.size ?? p.variant ?? '').toLowerCase();
          return (
            nameValue.includes(q) ||
            skuValue.includes(q) ||
            barcodeValue.includes(q) ||
            categoryValue.includes(q) ||
            variantValue.includes(q)
          );
        })
      : products;
    const letterFiltered = activeLetter
      ? list.filter((p) =>
          (p.product_name ?? '').trim().toUpperCase().startsWith(activeLetter)
        )
      : list;
    const sorted = [...letterFiltered];
    if (sortRecent) {
      sorted.sort((a, b) => {
        const timeA = a.created_at ? Date.parse(a.created_at) : 0;
        const timeB = b.created_at ? Date.parse(b.created_at) : 0;
        return timeB - timeA;
      });
    } else {
      sorted.sort((a, b) =>
        (a.product_name ?? '').localeCompare(b.product_name ?? '', undefined, { sensitivity: 'base' })
      );
    }
    return sorted;
  }, [products, query, activeLetter, sortRecent]);

  const categoryOptions = React.useMemo(() => {
    if (dbCategories.length > 0) {
      return dbCategories.map((cat) => ({ value: cat.name, label: cat.name }));
    }
    const all = new Set<string>();
    products.forEach((p) => {
      if (p.category) {
        const flat = p.category.split('/').pop()?.trim();
        if (flat) all.add(flat);
      }
    });
    return Array.from(all).sort().map((name) => ({ value: name, label: name }));
  }, [dbCategories, products]);

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setName(product.product_name ?? '');
    setDefaultCode(product.default_code ?? '');
    setSize(product.size ?? product.variant ?? '');
    setPrice(product.sale_price != null ? String(product.sale_price) : '');
    setCostPrice(product.purchase_price != null ? String(product.purchase_price) : '');
    setStockQuantity(product.stock_quantity != null ? String(product.stock_quantity) : '');
    setDescriptionEn(product.description_en ?? '');
    setDescriptionMm(product.description_mm ?? '');
    const flatCategory = product.category?.split('/').pop()?.trim() ?? '';
    setCategory(flatCategory);
    setBarcode(product.barcode ?? '');
    setRemark(product.remark ?? '');
    setImageFile(null);
    setImageUrlInput(product.image_url ?? '');
    setImagePreviewUrl(product.image_url ?? null);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }
    const priceValue = price.trim();
    const parsedPrice = Number(priceValue);
    const parsedCost = isAdmin && costPrice.trim() ? Number(costPrice) : null;
    const parsedStock = stockQuantity.trim() ? Number(stockQuantity) : null;
    if (!priceValue) {
      setError('Sale price is required.');
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError('Sale price must be a non-negative number.');
      return;
    }
    if (parsedCost != null && (!Number.isFinite(parsedCost) || parsedCost < 0)) {
      setError('Purchase price must be a non-negative number.');
      return;
    }
    if (parsedStock != null && (!Number.isFinite(parsedStock) || parsedStock < 0)) {
      setError('Stock quantity must be a non-negative number.');
      return;
    }
    setError(null);
    setSaving(true);
    const mode = editing ? 'update' : 'create';
    const productId = editing?.id;

    if (!isOnline) {
      await queueAction(mode, productId);
      setSaving(false);
      resetForm();
      return;
    }

    const payload: Record<string, any> = {
      product_name: name.trim(),
      sale_price: parsedPrice,
      stock_quantity: parsedStock,
      default_code: defaultCode.trim() || null,
      size: size.trim() || null,
      description_en: descriptionEn.trim() || null,
      description_mm: descriptionMm.trim() || null,
      category: category.trim() || null,
      barcode: barcode.trim() || null,
      image_url: imageUrlInput.trim() || null,
      remark: remark.trim() || null,
    };
    if (isAdmin) {
      payload.purchase_price = parsedCost;
    }

    if (mode === 'create') {
      const { data, error: insertError } = await supabaseClient
        .from('products')
        .insert({ ...payload, image_url: null })
        .select()
        .single();
      if (insertError || !data) {
        setError(insertError?.message ?? 'Failed to add product.');
        setSaving(false);
        return;
      }
      let nextData = data as AdminProduct;
      if (imageFile) {
        setUploading(true);
        const uploadResult = await uploadProductImage(data.id, imageFile);
        if (uploadResult.error || !uploadResult.url) {
          setError(uploadResult.error ?? 'Image upload failed.');
          setUploading(false);
          setSaving(false);
          return;
        }
        const { data: updated, error: updateError } = await supabaseClient
          .from('products')
          .update({ image_url: uploadResult.url })
          .eq('id', data.id)
          .select()
          .single();
        if (updateError || !updated) {
          setError(updateError?.message ?? 'Failed to update image.');
          setUploading(false);
          setSaving(false);
          return;
        }
        nextData = updated as AdminProduct;
        setImagePreviewUrl(uploadResult.url);
      }
      applyOptimistic([nextData, ...products]);
    } else if (productId != null) {
      let imageUrl: string | null = editing?.image_url ?? null;
      if (imageFile) {
        setUploading(true);
        const uploadResult = await uploadProductImage(productId, imageFile);
        if (uploadResult.error || !uploadResult.url) {
          setError(uploadResult.error ?? 'Image upload failed.');
          setUploading(false);
          setSaving(false);
          return;
        }
        imageUrl = uploadResult.url;
        setImagePreviewUrl(imageUrl);
      }
      const { data, error: updateError } = await supabaseClient
        .from('products')
        .update({ ...payload, image_url: imageUrl })
        .eq('id', productId)
        .select()
        .single();
      if (updateError || !data) {
        setError(updateError?.message ?? 'Failed to update product.');
        setSaving(false);
        setUploading(false);
        return;
      }
      applyOptimistic(products.map((p) => (p.id === productId ? (data as AdminProduct) : p)));
    }

    setUploading(false);
    setSaving(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (!isOnline) {
      setError('Offline mode. Delete will sync when online.');
      setDeleteTarget(null);
      return;
    }
    setDeletingId(deleteTarget.id);
    const { error: deleteError } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', deleteTarget.id);
    if (deleteError) {
      setError(deleteError.message);
      setDeletingId(null);
      setDeleteTarget(null);
      return;
    }
    applyOptimistic(products.filter((p) => p.id !== deleteTarget.id));
    setDeletingId(null);
    setDeleteTarget(null);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PRODUCTS_REFRESH_KEY, String(Date.now()));
      window.dispatchEvent(new Event('products-refresh'));
    }
    await refreshProducts();
  };

  return (
    <div className="flex h-screen max-h-[100vh] w-full flex-col gap-4 overflow-hidden bg-background p-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{t('inventoryTitle')}</h1>
            <p className="text-sm text-muted-foreground">
              {isOnline ? t('onlineSyncReady') : t('offlineSyncLater')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="h-12 px-5 text-base" onClick={() => setScannerOpen(true)}>
              {t('scanBarcode')}
            </Button>
            <Button variant="outline" className="h-12 px-5 text-base" onClick={handleDownloadTemplate}>
              {t('downloadTemplate')}
            </Button>
            <Button
              variant="outline"
              className="h-12 px-5 text-base"
              onClick={() => bulkInputRef.current?.click()}
              disabled={bulkLoading}
            >
              {t('bulkUpload')}
            </Button>
            <Button variant="outline" className="h-12 px-5 text-base" onClick={handleExportInventory} disabled={exporting}>
              {t('exportInventory')}
            </Button>
            <Button variant="outline" className="h-12 px-5 text-base" onClick={handleExportRecent} disabled={exporting}>
              {t('exportRecent')}
            </Button>
            <Button className="h-12 px-5 text-base" onClick={openCreate}>
              {t('addProduct')}
            </Button>
            <input
              ref={bulkInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleBulkFile(file);
                e.currentTarget.value = '';
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchInventoryPlaceholder')}
                className="h-12 rounded-xl text-base"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSortRecent((prev) => !prev)}
              className={sortRecent
                ? "h-10 px-4 rounded-xl text-xs font-bold bg-primary text-primary-foreground border-primary"
                : "h-10 px-4 rounded-xl text-xs font-bold border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
              }
            >
              {t('recentlyAdded')}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            {syncing ? t('syncing') : `${filtered.length} ${t('itemCount')}`}
          </div>
        </div>
        <div className="flex flex-nowrap items-center gap-1 overflow-x-auto">
          <Button
            variant="outline"
            onClick={() => setActiveLetter(null)}
            className={activeLetter === null
              ? "h-6 px-2 rounded-full text-[9px] font-bold bg-primary text-primary-foreground border-primary"
              : "h-6 px-2 rounded-full text-[9px] font-bold border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            }
          >
            {t('all')}
          </Button>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant="outline"
              onClick={() => setActiveLetter(letter)}
              className={activeLetter === letter
                ? "h-6 w-6 rounded-full text-[9px] font-bold bg-primary text-primary-foreground border-primary"
                : "h-6 w-6 rounded-full text-[9px] font-bold border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
              }
            >
              {letter}
            </Button>
          ))}
        </div>
        {bulkStatus && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600">
            {bulkStatus}
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="max-h-full overflow-auto">
          <table className="min-w-[980px] w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-background/90 backdrop-blur">
              <tr className="border-b border-border/60 text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-3 text-left font-semibold">{t('productId')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('image')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('name')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('sku')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('category')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('size')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('barcode')}</th>
                <th className="px-3 py-3 text-left font-semibold">{t('stock')}</th>
                <th className="px-3 py-3 text-right font-semibold">{t('salePrice')}</th>
                <th className="px-3 py-3 text-right font-semibold">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-sm text-muted-foreground">
                    Loading inventory...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((product) => (
                  <InventoryRow
                    key={product.id}
                    product={product}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                    deleting={deletingId === product.id}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-4xl rounded-2xl border border-border bg-card shadow-2xl max-h-[80vh] overflow-hidden">
            <ProductForm
              title={editing ? 'Edit Product' : 'Add Product'}
              barcode={barcode}
              onBarcodeChange={setBarcode}
              onBarcodeAction={() => {
                setScanningForForm(true);
                setScannerOpen(true);
              }}
              name={name}
              onNameChange={setName}
              sku={defaultCode}
              onSkuChange={setDefaultCode}
              size={size}
              onSizeChange={setSize}
              showPurchasePrice={isAdmin}
              category={category}
              onCategoryChange={setCategory}
              categories={categoryOptions}
              purchasePrice={costPrice}
              onPurchasePriceChange={setCostPrice}
              salePrice={price}
              onSalePriceChange={setPrice}
              stockQuantity={stockQuantity}
              onStockQuantityChange={setStockQuantity}
              descriptionEn={descriptionEn}
              onDescriptionEnChange={setDescriptionEn}
              descriptionMm={descriptionMm}
              onDescriptionMmChange={setDescriptionMm}
              imageUrl={imageUrlInput}
              onImageUrlChange={setImageUrlInput}
              onImageFileChange={setImageFile}
              imagePreviewUrl={imagePreviewUrl}
              remark={remark}
              onRemarkChange={setRemark}
              error={error}
              onClose={resetForm}
              onSave={handleSave}
              saveLabel={isBusy ? (uploading ? 'Uploading...' : 'Saving...') : 'Save'}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete product?"
        description={`Are you sure you want to delete "${deleteTarget?.product_name ?? 'this product'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmVariant="destructive"
        loading={deleteTarget ? deletingId === deleteTarget.id : false}
      />

      {bulkReportOpen && bulkReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setBulkReportOpen(false)}>
          <div
            className="w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div>
                <h2 className="text-base font-bold">Bulk Upload Report</h2>
                <p className="text-xs text-muted-foreground">
                  {bulkStatus ?? 'Upload summary'}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setBulkReportOpen(false)}>
                Close
              </Button>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="text-xs font-semibold uppercase text-emerald-600">Inserted</div>
                <div className="text-2xl font-bold text-emerald-700">
                  {bulkReport.inserted.length}
                </div>
                <div className="mt-2 max-h-48 overflow-auto text-[11px] text-emerald-700">
                  {bulkReport.inserted.length === 0 ? '—' : bulkReport.inserted.map((value) => (
                    <div key={`ins-${value}`}>{value}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="text-xs font-semibold uppercase text-blue-600">Updated</div>
                <div className="text-2xl font-bold text-blue-700">
                  {bulkReport.updated.length}
                </div>
                <div className="mt-2 max-h-48 overflow-auto text-[11px] text-blue-700">
                  {bulkReport.updated.length === 0 ? '—' : bulkReport.updated.map((value) => (
                    <div key={`upd-${value}`}>{value}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="text-xs font-semibold uppercase text-amber-600">Skipped</div>
                <div className="text-2xl font-bold text-amber-700">
                  {bulkReport.skipped.length}
                </div>
                <div className="mt-2 max-h-48 overflow-auto text-[11px] text-amber-700">
                  {bulkReport.skipped.length === 0 ? '—' : bulkReport.skipped.map((value) => (
                    <div key={`skip-${value}`}>{value}</div>
                  ))}
                </div>
              </div>
            </div>
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

      <ScannerModal
        open={scannerOpen}
        elementId="admin-inventory-scanner"
        onClose={handleCloseScanner}
        onScanSuccess={(value: string) => {
          onScanSuccess(value);
        }}
        manualValue={scanManualInput}
        onManualChange={setScanManualInput}
        onManualSubmit={handleManualBarcode}
      />
    </div>
  );
}
