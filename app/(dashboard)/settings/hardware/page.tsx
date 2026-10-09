'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import {
  RECEIPT_PAPER_OPTIONS,
  DEFAULT_HW_PRINT_SETTINGS,
  ReceiptPaperSize,
  ScannerPriority,
  LogoAlignment,
  getReceiptWidthMm,
} from '@/lib/hwPrintSettings/types';
import { useHWPrintSettings } from '@/components/hw-print-settings-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code128Svg } from '@/components/ui/code128-svg';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { DeliverySticker50x30 } from '@/components/DeliverySticker50x30';
import { RotateCcw, Printer as PrinterIcon, Save, Upload, X } from 'lucide-react';

type TabKey = 'receipt' | 'delivery' | 'scanner';

const DEFAULT_RECEIPT_PREVIEW_ITEMS: Array<{ name: string; qty: number; price: number; amount: number }> = [
  { name: 'Aura Glow Serum 30ml', qty: 2, price: 18000, amount: 36000 },
  { name: 'Hydrating Mist', qty: 1, price: 12000, amount: 12000 },
  { name: 'Daily Sunscreen SPF50', qty: 1, price: 15000, amount: 15000 },
];

function useLogoFallbackState(): [number, () => void] {
  const [srcIndex, setSrcIndex] = React.useState(0);
  const nextSrc = React.useCallback(() => {
    setSrcIndex((v) => v + 1);
  }, []);
  return [srcIndex, nextSrc];
}

function ShopLogoImg(props: {
  customSrc: string | null;
  show: boolean;
  sizePx: number;
  monochrome: boolean;
  srcIndex: number;
  onFallback: () => void;
  circular?: boolean;
  alt?: string;
}) {
  const { customSrc, sizePx, monochrome, srcIndex, onFallback, circular = true, alt = 'Shop Logo' } = props;
  const fallbackChain = ['/logo.png', '/logo.jpg', '/icon-192.png'];
  const base = customSrc?.trim();
  const candidates = base ? [base, ...fallbackChain] : fallbackChain;
  const idx = Math.max(0, Math.min(srcIndex, candidates.length - 1));
  const src = candidates[idx];
  const padding = circular ? 2 : 0;

  if (!props.show) return null;
  return (
    <div
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        borderRadius: circular ? '50%' : '0px',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.5px solid #000000',
        background: '#ffffff',
        boxSizing: 'border-box',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          padding: `${padding}px`,
          boxSizing: 'border-box',
          filter: monochrome ? 'grayscale(100%) contrast(200%)' : 'none',
          display: 'block',
          imageRendering: 'auto',
        }}
        onError={(e) => {
          const t = e.currentTarget;
          t.onerror = null;
          onFallback();
        }}
      />
    </div>
  );
}

export default function HardwareSettingsPage() {
  const { role } = useDashboardAuth();
  const canEdit = role === 'admin' || role === 'staff';
  const {
    settings,
    patchReceipt,
    patchScanner,
    resetSettings,
  } = useHWPrintSettings();
  const [tab, setTab] = React.useState<TabKey>('receipt');
  const [savedFlash, setSavedFlash] = React.useState(false);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const [deliveryLogoIdx, nextDeliveryLogoIdx] = useLogoFallbackState();
  const [receiptPreviewLogoIdx, nextReceiptPreviewLogoIdx] = useLogoFallbackState();

  const rw = getReceiptWidthMm(settings.receipt);

  const onReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetSettings();
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
    setShowResetConfirm(false);
  };

  const triggerSaved = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  if (!canEdit) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Hardware &amp; Printers</h1>
        <p className="text-sm text-muted-foreground">Access restricted.</p>
      </div>
    );
  }

  const storeName = settings.receipt.storeName?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeName;
  const storeTagline = settings.receipt.storeTagline?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeTagline;
  const storePhone = settings.receipt.storePhone?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storePhone;
  const storeAddress = settings.receipt.storeAddress?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeAddress;
  const storeSocial = settings.receipt.storeSocial?.trim() || '';
  const footerText = settings.receipt.footerText?.trim() || '';
  const storeLogoSrc: string | null = settings.receipt.logoUrl || settings.receipt.storeLogo || null;

  const logoShow = !!settings.receipt.showLogo;
  const logoSizePx = Math.max(10, Math.min(40, Number(settings.receipt.logoSizePx) || DEFAULT_HW_PRINT_SETTINGS.receipt.logoSizePx));
  const logoAlign: LogoAlignment = (['left','center','right'].includes(settings.receipt.logoAlignment as any) ? settings.receipt.logoAlignment : 'center') as LogoAlignment;
  const logoMonochrome = !!settings.receipt.monochromeLogo;

  const baseFont = Math.max(8, Math.min(20, Number(settings.receipt.baseFontSizePx) || 11));
  const headerFont = Math.max(10, Math.min(24, Number(settings.receipt.headerFontSizePx) || 13));

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const onLogoFile = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      patchReceipt({ logoUrl: dataUrl });
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [patchReceipt]);
  const resetLogo = React.useCallback(() => {
    patchReceipt({
      logoUrl: undefined,
      showLogo: DEFAULT_HW_PRINT_SETTINGS.receipt.showLogo,
      logoSizePx: DEFAULT_HW_PRINT_SETTINGS.receipt.logoSizePx,
      logoAlignment: DEFAULT_HW_PRINT_SETTINGS.receipt.logoAlignment,
      monochromeLogo: DEFAULT_HW_PRINT_SETTINGS.receipt.monochromeLogo,
    });
  }, [patchReceipt]);

  const deliveryStickerRef = React.useRef<HTMLDivElement | null>(null);

  const testPrintSticker = React.useCallback(() => {
    const el = deliveryStickerRef.current;
    if (!el) return;
    const content = el.outerHTML;
    const w = window.open('', '_blank', 'width=600,height=500');
    if (!w) {
      window.print();
      return;
    }
    w.document.write(`<!doctype html><html><head><title>Print Delivery Sticker 50x30</title>
<style>
@page { size: 50mm 30mm; margin: 0; }
@media print {
  html, body { width: 50mm; height: 30mm; margin: 0; padding: 0; background:#fff; color:#000; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  body * { visibility: hidden; }
  #print-delivery-sticker, #print-delivery-sticker * { visibility: visible; }
  #print-delivery-sticker { position:absolute; left:0; top:0; width:50mm; height:30mm; overflow:hidden; box-sizing:border-box; page-break-inside:avoid; }
}
</style></head><body>${content}</body></html>`);
    w.document.close();
    setTimeout(() => {
      try { w.focus(); w.print(); } catch { window.print(); }
    }, 200);
  }, []);

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border bg-background/95 pb-4 backdrop-blur md:flex-row md:items-center md:justify-between md:border-b-0 md:pb-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Hardware &amp; Printers</h1>
          <p className="text-sm text-muted-foreground">
            Receipt printer, delivery sticker, barcode scanner. Per-device settings via localStorage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {savedFlash && (
            <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
              Saved
            </span>
          )}
          <ConfirmDialog
            open={showResetConfirm}
            title="Reset to Defaults"
            description="Reset all hardware &amp; printing settings to their default values? This cannot be undone."
            confirmLabel="Reset"
            cancelLabel="Cancel"
            onConfirm={confirmReset}
            onCancel={() => setShowResetConfirm(false)}
          />
          <Button variant="outline" onClick={onReset} className="gap-1.5">
            <RotateCcw className="h-4 w-4" /> Reset to Defaults
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto pr-1">
        <div className="space-y-6">
          <div className="flex gap-2 border-b border-border">
            {(['receipt', 'delivery', 'scanner'] as TabKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                  tab === k
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {k === 'receipt' ? 'Receipt Printer (80mm)' : k === 'delivery' ? 'Delivery Sticker (50×30mm)' : 'Barcode Scanner'}
              </button>
            ))}
          </div>

          {tab === 'receipt' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              {/* RECEIPT LEFT CONTROLS */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Paper &amp; Font — 80mm Thermal</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Paper Size</Label>
                      <select
                        value={settings.receipt.paperSize}
                        onChange={(e) => patchReceipt({ paperSize: e.target.value as ReceiptPaperSize })}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
                      >
                        {RECEIPT_PAPER_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <p className="text-[10px] text-muted-foreground">
                        Current width: <strong>{rw}mm</strong> · Default 80mm
                      </p>
                    </div>
                    {settings.receipt.paperSize === 'custom' && (
                      <div className="space-y-1.5">
                        <Label>Custom Width (mm)</Label>
                        <Input
                          type="number"
                          min={20}
                          max={500}
                          step={1}
                          value={settings.receipt.customWidthMm}
                          onChange={(e) => patchReceipt({ customWidthMm: Number(e.target.value) || 80 })}
                        />
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <Label>Font Family</Label>
                      <select
                        value={settings.receipt.fontFamily}
                        onChange={(e) => patchReceipt({ fontFamily: e.target.value })}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
                      >
                        <option value="Courier, monospace">Courier / Monospace (Thermal)</option>
                        <option value="monospace">Monospace</option>
                        <option value="Arial, Helvetica, sans-serif">Arial / Sans-serif</option>
                        <option value="sans-serif">Sans-serif</option>
                        <option value="'Times New Roman', serif">Times / Serif</option>
                        <option value="'Pyidaungsu', 'Noto Sans Myanmar', sans-serif">Pyidaungsu (Myanmar)</option>
                        <option value="'Roboto', sans-serif">Roboto (Google Font)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Base Font Size: {baseFont}px</Label>
                      <Input
                        type="range"
                        min={8}
                        max={20}
                        step={1}
                        value={settings.receipt.baseFontSizePx}
                        onChange={(e) => patchReceipt({ baseFontSizePx: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Header Font Size: {headerFont}px</Label>
                      <Input
                        type="range"
                        min={10}
                        max={24}
                        step={1}
                        value={settings.receipt.headerFontSizePx}
                        onChange={(e) => patchReceipt({ headerFontSizePx: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Line Height: {settings.receipt.lineHeight.toFixed(2)}</Label>
                      <Input
                        type="range"
                        min={1}
                        max={2}
                        step={0.05}
                        value={settings.receipt.lineHeight}
                        onChange={(e) => patchReceipt({ lineHeight: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Margins (mm)</h2>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-1.5">
                      <Label>Top</Label>
                      <Input type="number" min={0} max={30} step={0.5}
                        value={settings.receipt.marginTopMm}
                        onChange={(e) => patchReceipt({ marginTopMm: Number(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Bottom</Label>
                      <Input type="number" min={0} max={30} step={0.5}
                        value={settings.receipt.marginBottomMm}
                        onChange={(e) => patchReceipt({ marginBottomMm: Number(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Left</Label>
                      <Input type="number" min={0} max={30} step={0.5}
                        value={settings.receipt.marginLeftMm}
                        onChange={(e) => patchReceipt({ marginLeftMm: Number(e.target.value) || 0 })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Right</Label>
                      <Input type="number" min={0} max={30} step={0.5}
                        value={settings.receipt.marginRightMm}
                        onChange={(e) => patchReceipt({ marginRightMm: Number(e.target.value) || 0 })} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Shop Logo Settings</h2>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 font-semibold">
                      Applied to Receipt + Sticker
                    </span>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Logo Preview</Label>
                      <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 p-4 min-h-[110px]">
                        {logoShow ? (
                          <div
                            style={{
                              width: `${logoSizePx * 2 + 10}px`,
                              height: `${logoSizePx * 2 + 10}px`,
                              borderRadius: '50%',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '0.5px solid #000000',
                              background: '#ffffff',
                              flexShrink: 0,
                              boxSizing: 'border-box',
                            }}
                          >
                            <ShopLogoImg
                              customSrc={storeLogoSrc}
                              show={logoShow}
                              sizePx={logoSizePx * 2}
                              monochrome={logoMonochrome}
                              srcIndex={receiptPreviewLogoIdx}
                              onFallback={nextReceiptPreviewLogoIdx}
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Logo disabled. Enable Show Logo to preview.</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="gap-1.5"
                        >
                          <Upload className="h-4 w-4" /> Upload Logo Image
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetLogo}
                          className="gap-1.5"
                        >
                          <X className="h-4 w-4" /> Remove / Reset
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={onLogoFile}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm h-11">
                          <input type="checkbox" className="h-4 w-4"
                            checked={logoShow}
                            onChange={(e) => patchReceipt({ showLogo: e.target.checked })} />
                          <span className="font-medium">Show Logo</span>
                        </label>
                        <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm h-11">
                          <input type="checkbox" className="h-4 w-4"
                            checked={logoMonochrome}
                            onChange={(e) => patchReceipt({ monochromeLogo: e.target.checked })} />
                          <span className="font-medium">Monochrome (Thermal)</span>
                        </label>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Logo Size: {logoSizePx}px (Small 12 · Medium 18 · Large 25 · Slider 10–40)</Label>
                        <Input
                          type="range"
                          min={10}
                          max={40}
                          step={1}
                          value={logoSizePx}
                          onChange={(e) => patchReceipt({ logoSizePx: Number(e.target.value) })}
                        />
                        <div className="flex gap-2">
                          {[
                            { v: 12, label: 'Small' },
                            { v: 18, label: 'Medium' },
                            { v: 25, label: 'Large' },
                          ].map((p) => (
                            <Button
                              key={p.v}
                              type="button"
                              variant={logoSizePx === p.v ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => patchReceipt({ logoSizePx: p.v })}
                            >
                              {p.label} · {p.v}px
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Logo Alignment (Receipt Only)</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['left','center','right'] as LogoAlignment[]).map((a) => (
                            <Button
                              key={a}
                              type="button"
                              variant={logoAlign === a ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => patchReceipt({ logoAlignment: a })}
                              className="capitalize"
                            >
                              {a}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Template Fields</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Store Name (Header)</Label>
                      <Input
                        value={settings.receipt.storeName}
                        onChange={(e) => patchReceipt({ storeName: e.target.value })}
                        placeholder={DEFAULT_HW_PRINT_SETTINGS.receipt.storeName}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Store Tagline / Category</Label>
                      <Input
                        value={settings.receipt.storeTagline}
                        onChange={(e) => patchReceipt({ storeTagline: e.target.value })}
                        placeholder={DEFAULT_HW_PRINT_SETTINGS.receipt.storeTagline}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Store Address</Label>
                      <Input
                        value={settings.receipt.storeAddress}
                        onChange={(e) => patchReceipt({ storeAddress: e.target.value })}
                        placeholder="Street / Township / City"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Phone</Label>
                      <Input
                        value={settings.receipt.storePhone}
                        onChange={(e) => patchReceipt({ storePhone: e.target.value })}
                        placeholder="09-..."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Social / Website</Label>
                      <Input
                        value={settings.receipt.storeSocial}
                        onChange={(e) => patchReceipt({ storeSocial: e.target.value })}
                        placeholder="Facebook / Instagram / URL"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Footer Text</Label>
                      <Input
                        value={settings.receipt.footerText}
                        onChange={(e) => patchReceipt({ footerText: e.target.value })}
                        placeholder="Thank you / Exchange policy"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm">
                      <input type="checkbox" className="h-4 w-4"
                        checked={settings.receipt.showLogo}
                        onChange={(e) => patchReceipt({ showLogo: e.target.checked })} />
                      <span className="font-medium">Show Logo</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm">
                      <input type="checkbox" className="h-4 w-4"
                        checked={settings.receipt.showBarcode}
                        onChange={(e) => patchReceipt({ showBarcode: e.target.checked })} />
                      <span className="font-medium">Show Invoice Barcode</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm">
                      <input type="checkbox" className="h-4 w-4"
                        checked={settings.receipt.showQrCode}
                        onChange={(e) => patchReceipt({ showQrCode: e.target.checked })} />
                      <span className="font-medium">Show QR Code (Placeholder)</span>
                    </label>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Button onClick={triggerSaved} className="gap-1.5"><Save className="h-4 w-4" /> Save &amp; Apply</Button>
                    <Button variant="outline" onClick={() => window.print()} className="gap-1.5">
                      <PrinterIcon className="h-4 w-4" /> Print Test (Receipt)
                    </Button>
                  </div>
                </div>
              </div>

              {/* RECEIPT LIVE PREVIEW (RIGHT) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Preview — 80mm (≈300px)</h3>
                <div
                  className="rounded-2xl border border-border bg-white shadow-sm mx-auto overflow-auto p-4"
                  style={{ width: 'min(340px, 100%)', maxWidth: '100%' }}
                >
                  {/* 80mm canvas: 300px ≈ 80mm at 96dpi (80/25.4*96 ≈ 302px) */}
                  <div
                    id="print-receipt"
                    style={{
                      width: '300px',
                      fontFamily: settings.receipt.fontFamily,
                      fontSize: `${baseFont}px`,
                      lineHeight: settings.receipt.lineHeight,
                      background: '#ffffff',
                      color: '#000000',
                      padding: `${settings.receipt.marginTopMm}mm ${settings.receipt.marginRightMm}mm ${settings.receipt.marginBottomMm}mm ${settings.receipt.marginLeftMm}mm`,
                      boxSizing: 'border-box',
                      margin: '0 auto',
                      wordWrap: 'break-word',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    <div style={{ textAlign: logoAlign, marginBottom: '4px' }}>
                      <ShopLogoImg
                        customSrc={storeLogoSrc}
                        show={logoShow}
                        sizePx={logoSizePx + 4}
                        monochrome={logoMonochrome}
                        srcIndex={receiptPreviewLogoIdx}
                        onFallback={nextReceiptPreviewLogoIdx}
                      />
                    </div>
                    <div style={{ fontSize: `${headerFont}px`, fontWeight: 700, textAlign: 'center', marginBottom: '2px', letterSpacing: '0.3px' }}>
                      {storeName}
                    </div>
                    {storeTagline && (
                      <div style={{ textAlign: 'center', fontSize: `${Math.max(9, baseFont - 1)}px`, marginBottom: '3px' }}>
                        {storeTagline}
                      </div>
                    )}
                    {storeAddress && <div style={{ textAlign: 'center' }}>{storeAddress}</div>}
                    {storePhone && <div style={{ textAlign: 'center' }}>Tel: {storePhone}</div>}
                    {storeSocial && <div style={{ textAlign: 'center' }}>{storeSocial}</div>}
                    <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><span>Invoice</span><span style={{ fontFamily: 'monospace' }}>INV-TEST-001</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><span>Date</span><span>19/08/2026</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><span>Cashier</span><span>Staff</span></div>
                    <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ fontSize: `${Math.max(8, baseFont - 1)}px` }}>
                          <th align="left" style={{ padding: '2px 4px', textTransform: 'uppercase' }}>Item</th>
                          <th align="right" style={{ padding: '2px 4px', width: '38px', textTransform: 'uppercase' }}>Qty</th>
                          <th align="right" style={{ padding: '2px 4px', width: '60px', textTransform: 'uppercase' }}>Price</th>
                          <th align="right" style={{ padding: '2px 4px', width: '64px', textTransform: 'uppercase' }}>Amt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEFAULT_RECEIPT_PREVIEW_ITEMS.map((it) => (
                          <tr key={it.name}>
                            <td style={{ padding: '2px 4px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{it.name}</td>
                            <td align="right" style={{ padding: '2px 4px' }}>{it.qty}</td>
                            <td align="right" style={{ padding: '2px 4px', fontFamily: 'monospace' }}>{it.price.toLocaleString()}</td>
                            <td align="right" style={{ padding: '2px 4px', fontFamily: 'monospace', fontWeight: 700 }}>{it.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><span>Subtotal</span><span style={{ fontFamily: 'monospace' }}>63,000 Ks</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><span>Delivery Fee (+)</span><span style={{ fontFamily: 'monospace' }}>3,000 Ks</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><span>Discount (-)</span><span style={{ fontFamily: 'monospace' }}>0 Ks</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '2px' }}><strong>Grand Total</strong><strong style={{ fontFamily: 'monospace' }}>66,000 Ks</strong></div>
                    {settings.receipt.showBarcode && (
                      <div style={{ textAlign: 'center', marginTop: '6px' }}>
                        <Code128Svg value="INVTEST001" heightPx={26} barWidthPx={1} showText fontSizePx={9} />
                      </div>
                    )}
                    {footerText && (
                      <div style={{ textAlign: 'center', marginTop: '8px', fontSize: `${Math.max(9, baseFont - 1)}px` }}>
                        {footerText}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  Preview = 1:1 with @media print output. Paper 80mm × auto, margin 0.
                </p>
              </div>
            </div>
          )}

          {tab === 'delivery' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              {/* DELIVERY LEFT CONTROLS */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Delivery Sticker 50×30mm</h2>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-sky-500/10 text-sky-700 border border-sky-500/30 font-semibold">
                      Xprinter XP-480B
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm h-11">
                        <input type="checkbox" className="h-4 w-4"
                          checked={logoShow}
                          onChange={(e) => patchReceipt({ showLogo: e.target.checked })} />
                        <span className="font-medium">Logo Visible</span>
                      </label>
                      <label className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm h-11">
                        <input type="checkbox" className="h-4 w-4"
                          checked={logoMonochrome}
                          onChange={(e) => patchReceipt({ monochromeLogo: e.target.checked })} />
                        <span className="font-medium">Monochrome Logo Filter</span>
                      </label>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Custom Category / Tagline Text</Label>
                      <Input
                        value={settings.receipt.storeTagline}
                        onChange={(e) => patchReceipt({ storeTagline: e.target.value })}
                        placeholder={DEFAULT_HW_PRINT_SETTINGS.receipt.storeTagline}
                      />
                      <p className="text-[10px] text-muted-foreground">
                        Appears as line 2 of the header (e.g. &quot;USA Skincare and Cosmetics&quot;).
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Logo Size: {logoSizePx}px (Sticker Header Circular Logo)</Label>
                      <Input
                        type="range"
                        min={12}
                        max={30}
                        step={1}
                        value={logoSizePx}
                        onChange={(e) => patchReceipt({ logoSizePx: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-1.5 md:grid-cols-2 grid gap-3">
                      <div className="space-y-1.5">
                        <Label>Shop Name</Label>
                        <Input value={settings.receipt.storeName}
                          onChange={(e) => patchReceipt({ storeName: e.target.value })}
                          placeholder={DEFAULT_HW_PRINT_SETTINGS.receipt.storeName} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Phone</Label>
                        <Input value={settings.receipt.storePhone}
                          onChange={(e) => patchReceipt({ storePhone: e.target.value })}
                          placeholder={DEFAULT_HW_PRINT_SETTINGS.receipt.storePhone} />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label>Shop Address</Label>
                        <Input value={settings.receipt.storeAddress}
                          onChange={(e) => patchReceipt({ storeAddress: e.target.value })}
                          placeholder={DEFAULT_HW_PRINT_SETTINGS.receipt.storeAddress} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap pt-2">
                    <Button onClick={triggerSaved} className="gap-1.5">
                      <Save className="h-4 w-4" /> Save &amp; Apply
                    </Button>
                    <Button variant="outline" onClick={testPrintSticker} className="gap-1.5">
                      <PrinterIcon className="h-4 w-4" /> Test Print (50×30mm)
                    </Button>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 space-y-3 text-xs text-muted-foreground">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Spec</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Paper:</strong> 50mm × 30mm thermal sticker (XP-480B)</li>
                    <li><strong>@page:</strong> strict size 50mm × 30mm, margin 0 (1:1)</li>
                    <li><strong>Logo fallback:</strong> <code className="rounded bg-muted px-1">/logo.png</code> → <code className="rounded bg-muted px-1">/logo.jpg</code></li>
                    <li><strong>Samples:</strong> Demo Customer + sample totals so you can preview layout with real proportions.</li>
                  </ul>
                </div>
              </div>

              {/* DELIVERY RIGHT LIVE PREVIEW */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Preview — 50×30mm (1:1 Scale)</h3>
                <div
                  className="rounded-2xl border border-border bg-muted/40 p-8 flex items-start justify-center shadow-sm"
                  style={{ minHeight: '380px' }}
                >
                  {/* 142px × 85px = exact 50×30 at 72dpi (50/25.4*72 ≈ 141.7, 30/25.4*72 ≈ 85.0) */}
                  <div
                    style={{
                      border: '1px solid rgba(0,0,0,0.45)',
                      borderRadius: '4px',
                      padding: '4px',
                      background: '#f5f5f4',
                      display: 'inline-block',
                    }}
                  >
                    <div
                      ref={deliveryStickerRef}
                      style={{ width: '142px', height: '85px', display: 'block' }}
                    >
                      <DeliverySticker50x30
                        id="print-delivery-sticker"
                        storeName={storeName}
                        storeCategory={storeTagline}
                        storeAddress={storeAddress}
                        storePhone={storePhone}
                        storeLogoSrc={storeLogoSrc}
                        logoShow={logoShow}
                        monochromeLogo={logoMonochrome}
                        invoiceNo="INV-2026-0819-00421"
                        customerName="Ma Aye Chan Myae"
                        customerPhone="09-987654321"
                        customerAddress="No. 123, Mahar Bandula Street, 3rd Quarter, Chan Aye Thar Zan Township, Mandalay, Myanmar"
                        amountKs={63000}
                        deliFeesKs={3000}
                        totalKs={66000}
                        remark="Please call before arrival. Leave at gate if no answer."
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  Preview box: 142×85px @ 72dpi = 50×30mm physical. Outer guide shows full sticker with 0.5px inner black border.
                </p>
              </div>
            </div>
          )}

          {tab === 'scanner' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Barcode Scanner Behavior</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div>
                      <div className="font-semibold text-sm">Auto-submit on Enter key</div>
                      <div className="text-xs text-muted-foreground">
                        HID scanner emulating keyboard typically ends input with Enter. If enabled, triggers form search/submit immediately.
                      </div>
                    </div>
                    <input type="checkbox" className="h-5 w-5"
                      checked={settings.scanner.autoSubmitOnEnter}
                      onChange={(e) => patchScanner({ autoSubmitOnEnter: e.target.checked })} />
                  </label>
                  <label className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div>
                      <div className="font-semibold text-sm">Scan Audio Beep Sound</div>
                      <div className="text-xs text-muted-foreground">
                        Play an 880Hz confirmation beep via Web Audio API after a successful camera or HID scan.
                      </div>
                    </div>
                    <input type="checkbox" className="h-5 w-5"
                      checked={settings.scanner.scanAudioBeep}
                      onChange={(e) => patchScanner({ scanAudioBeep: e.target.checked })} />
                  </label>
                  <div className="rounded-xl border border-border p-4 space-y-2">
                    <div className="font-semibold text-sm">Scanner Priority</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { v: 'hardware' as ScannerPriority, label: 'Hardware (HID Keyboard Wedge)', hint: 'Focus auto-search inputs first' },
                        { v: 'camera' as ScannerPriority, label: 'Camera Scanner (html5-qrcode)', hint: 'Prefer camera scan button in UI' },
                      ].map((o) => (
                        <label key={o.v} className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${settings.scanner.scannerPriority === o.v ? 'border-primary bg-primary/10' : ''}`}>
                          <input type="radio" className="h-4 w-4" name="scannerPri"
                            checked={settings.scanner.scannerPriority === o.v}
                            onChange={() => patchScanner({ scannerPriority: o.v })} />
                          <div>
                            <div className="font-medium">{o.label}</div>
                            <div className="text-[10px] text-muted-foreground">{o.hint}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={triggerSaved} className="gap-1.5"><Save className="h-4 w-4" /> Save &amp; Apply</Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">About These Settings</h2>
                <ul className="space-y-3 text-xs text-muted-foreground list-disc pl-5">
                  <li>Per-device: stored in browser localStorage under <code className="rounded bg-muted px-1 py-0.5">{`'${'tmyg-hw-print-settings-v2'}'`}</code>.</li>
                  <li>iPad Safari / AirPrint compatible: all settings drive CSS <code className="rounded bg-muted px-1 py-0.5">@page</code> size, <code className="rounded bg-muted px-1 py-0.5">@media print</code> rules, and font metrics.</li>
                  <li>Priority = Hardware: POS / Inventory / Bulk Sale auto-focus the HID-ready search input on mount and after actions.</li>
                  <li>Priority = Camera: Inventory / Bulk Sale header scan button highlights with primary accent.</li>
                  <li>For non-AirPrint thermal printers (e.g. Xprinter XP-480B) use a CUPS/LAN bridge; @media print output is device-agnostic.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
