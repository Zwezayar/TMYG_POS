'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import {
  LABEL_SIZE_OPTIONS,
  RECEIPT_PAPER_OPTIONS,
  DEFAULT_HW_PRINT_SETTINGS,
  ReceiptPaperSize,
  LabelSizePreset,
  ScannerPriority,
  LogoAlignment,
} from '@/lib/hwPrintSettings/types';
import { useHWPrintSettings, getLabelSizeMm } from '@/components/hw-print-settings-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code128Svg } from '@/components/ui/code128-svg';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { RotateCcw, Printer as PrinterIcon, Save, Upload, X } from 'lucide-react';

type TabKey = 'receipt' | 'label' | 'scanner';

const SAMPLE_ITEMS = [
  { no: 1, description: 'Aura Glow Serum 30ml', size: '30ml', sku: 'AGS-030', price: 18000, qty: 2, amount: 36000 },
  { no: 2, description: 'Hydrating Mist Toner', size: '100ml', sku: 'HMT-100', price: 12000, qty: 1, amount: 12000 },
  { no: 3, description: 'UV Shield Sunscreen SPF50', size: '50ml', sku: 'UVS-050', price: 22000, qty: 1, amount: 22000 },
];

function formatKs(n: number) {
  return n.toLocaleString('en-US') + ' Ks';
}

const ShopLogo: React.FC<{ sizeMm?: number; sizePx20?: boolean; logoSrc?: string | null; circular?: boolean }> = ({
  sizeMm = 14,
  sizePx20 = false,
  logoSrc,
  circular = false,
}) => {
  const sizePx = sizePx20 ? 20 : Math.round(sizeMm * 3.78);
  const roundPx = sizePx20 ? '50%' : `${Math.max(2, Math.round(sizeMm * 0.5))}px`;
  const src = logoSrc || '/logo.jpg';
  return (
    <img
      src={src}
      alt="Logo"
      width={sizePx}
      height={sizePx}
      style={{
        objectFit: sizePx20 ? 'contain' : 'cover',
        borderRadius: roundPx,
        flexShrink: 0,
        ...(sizePx20 ? {} : { marginTop: '1px' }),
      }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).onerror = null;
        (e.currentTarget as HTMLImageElement).src = '/icon-192.png';
      }}
    />
  );
};

export default function HardwareSettingsPage() {
  const { role } = useDashboardAuth();
  const canEdit = role === 'admin' || role === 'staff';
  const {
    settings,
    patchReceipt,
    patchLabel,
    patchScanner,
    resetSettings,
  } = useHWPrintSettings();
  const [tab, setTab] = React.useState<TabKey>('receipt');
  const [savedFlash, setSavedFlash] = React.useState(false);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const rw = (() => {
    const opt = RECEIPT_PAPER_OPTIONS.find((o) => o.value === settings.receipt.paperSize);
    return settings.receipt.paperSize === 'custom'
      ? Math.max(20, Math.min(500, settings.receipt.customWidthMm || 80))
      : opt?.widthMm ?? 80;
  })();
  const { widthMm: lw, heightMm: lh } = getLabelSizeMm(settings.label);

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
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Hardware & Printers</h1>
        <p className="text-sm text-muted-foreground">Access restricted.</p>
      </div>
    );
  }

  const storeName = settings.receipt.storeName?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeName;
  const storeTagline = settings.receipt.storeTagline?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeTagline;
  const storePhone = settings.receipt.storePhone?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storePhone;
  const storeAddress = settings.receipt.storeAddress?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeAddress;
  const storeLogoSrc: string | null = settings.receipt.logoUrl || settings.receipt.storeLogo || null;

  const logoShow = !!settings.receipt.showLogo;
  const logoSizePx = Math.max(10, Math.min(40, Number(settings.receipt.logoSizePx) || DEFAULT_HW_PRINT_SETTINGS.receipt.logoSizePx));
  const logoAlign: LogoAlignment = (['left','center','right'].includes(settings.receipt.logoAlignment as any) ? settings.receipt.logoAlignment : 'center') as LogoAlignment;
  const logoMonochrome = !!settings.receipt.monochromeLogo;

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
    patchReceipt({ logoUrl: undefined, showLogo: DEFAULT_HW_PRINT_SETTINGS.receipt.showLogo, logoSizePx: DEFAULT_HW_PRINT_SETTINGS.receipt.logoSizePx, logoAlignment: DEFAULT_HW_PRINT_SETTINGS.receipt.logoAlignment, monochromeLogo: DEFAULT_HW_PRINT_SETTINGS.receipt.monochromeLogo });
  }, [patchReceipt]);

  const labelPreset = settings.label.sizePreset;
  const is3colBarcode = labelPreset === '3col-barcode';
  const isShort50 = labelPreset === 'short-50x30';
  const isShort40 = labelPreset === 'short-40x30';
  const isLongWaybill = labelPreset === 'long-100x150' || labelPreset === 'A6';
  const isCustom = labelPreset === 'custom';

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border bg-background/95 pb-4 backdrop-blur md:flex-row md:items-center md:justify-between md:border-b-0 md:pb-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Hardware & Printers</h1>
          <p className="text-sm text-muted-foreground">
            Receipt paper, label stickers, font settings, barcode scanner behavior. Persists per device via local storage.
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
            description="Reset all hardware & printing settings to their default values? This cannot be undone."
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
            {(['receipt', 'label', 'scanner'] as TabKey[]).map((k) => (
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
                {k === 'receipt' ? 'Receipt Printer' : k === 'label' ? 'Label / Sticker Printer' : 'Barcode Scanner'}
              </button>
            ))}
          </div>

          {tab === 'receipt' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Paper & Font</h2>
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
                        Current width: <strong>{rw}mm</strong>
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
                      <Label>Base Font Size: {settings.receipt.baseFontSizePx}px</Label>
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
                      <Label>Header Font Size: {settings.receipt.headerFontSizePx}px</Label>
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
                      Shared Settings Sync — applied instantly to Receipt + All Sticker Previews
                    </span>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Logo Preview</Label>
                      <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 p-4 min-h-[110px]">
                        {logoShow && storeLogoSrc ? (
                          <img
                            src={storeLogoSrc}
                            alt="Shop Logo"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: logoSizePx * 2,
                              height: logoSizePx * 2,
                              objectFit: 'contain',
                              filter: logoMonochrome ? 'grayscale(100%) contrast(200%)' : 'none',
                              display: 'block',
                              margin: '0 auto',
                            }}
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground">{logoShow ? 'No logo uploaded. Click below to upload.' : 'Logo disabled. Enable Show Logo to preview.'}</span>
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
                        <Label>Logo Alignment</Label>
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
                      <Label>Store Tagline</Label>
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
                  <div className="flex gap-3">
                    <Button onClick={triggerSaved} className="gap-1.5"><Save className="h-4 w-4" /> Save &amp; Apply</Button>
                    <Button variant="outline" onClick={() => window.print()} className="gap-1.5">
                      <PrinterIcon className="h-4 w-4" /> Print Test (Receipt)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Preview</h3>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm mx-auto"
                     style={{ width: `${rw + 8}mm`, fontFamily: settings.receipt.fontFamily, fontSize: settings.receipt.baseFontSizePx, lineHeight: settings.receipt.lineHeight }}>
                  <div style={{ padding: `${settings.receipt.marginTopMm}mm ${settings.receipt.marginRightMm}mm ${settings.receipt.marginBottomMm}mm ${settings.receipt.marginLeftMm}mm` }}>
                    {logoShow && storeLogoSrc && (
                      <div style={{ textAlign: logoAlign, marginBottom: 4 }}>
                        <img
                          src={storeLogoSrc}
                          alt="Logo"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: logoSizePx,
                            height: logoSizePx,
                            objectFit: 'contain',
                            filter: logoMonochrome ? 'grayscale(100%) contrast(200%)' : 'none',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </div>
                    )}
                    <div style={{ fontSize: settings.receipt.headerFontSizePx, fontWeight: 700, textAlign: 'center', marginBottom: 2 }}>
                      {storeName}
                    </div>
                    {storeTagline && <div style={{ textAlign: 'center', fontSize: Math.max(8, settings.receipt.baseFontSizePx - 1), marginBottom: 4 }}>{storeTagline}</div>}
                    {storeAddress && <div style={{ textAlign: 'center' }}>{storeAddress}</div>}
                    {storePhone && <div style={{ textAlign: 'center' }}>Tel: {storePhone}</div>}
                    {settings.receipt.storeSocial?.trim() && <div style={{ textAlign: 'center' }}>{settings.receipt.storeSocial}</div>}
                    <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span>Invoice</span><span>INV-TEST-001</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span>Date</span><span>19/08/2026</span></div>
                    <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ fontSize: Math.max(8, settings.receipt.baseFontSizePx - 1) }}>
                          <th align="left">Item</th><th align="right">Qty</th><th align="right">Price</th><th align="right">Amt</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ wordBreak: 'break-word' }}>Aura Glow Serum 30ml</td>
                          <td align="right">2</td><td align="right">18,000</td><td align="right"><strong>36,000</strong></td>
                        </tr>
                        <tr>
                          <td style={{ wordBreak: 'break-word' }}>Hydrating Mist</td>
                          <td align="right">1</td><td align="right">12,000</td><td align="right"><strong>12,000</strong></td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Grand Total</strong><strong>48,000 Ks</strong></div>
                    {settings.receipt.showBarcode && (
                      <div style={{ textAlign: 'center', marginTop: 6 }}>
                        <Code128Svg value="INVTEST001" heightPx={26} barWidthPx={1} showText fontSizePx={9} />
                      </div>
                    )}
                    {settings.receipt.footerText?.trim() && (
                      <div style={{ textAlign: 'center', marginTop: 8 }}>{settings.receipt.footerText}</div>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">Preview mirrors actual @media print output.</p>
              </div>
            </div>
          )}

          {tab === 'label' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
              {/* ================== CONTROL PANEL (LEFT) ================== */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  {/* 1. PRESET SELECTION DROPDOWN (3 options only) */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">Preset Selection</Label>
                    <select
                      value={settings.label.sizePreset}
                      onChange={(e) => patchLabel({ sizePreset: e.target.value as LabelSizePreset })}
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="short-50x30">Short Sticker 50×30mm (Delivery)</option>
                      <option value="short-40x30">Short Sticker 40×30mm (Delivery Compact)</option>
                      <option value="long-100x150">Long Waybill 100×150mm (4×6)</option>
                    </select>
                    <p className="text-[10px] text-muted-foreground">
                      Current: <strong>{lw}mm × {lh}mm</strong>
                    </p>
                  </div>

                  {/* 2. SHOW COMPACT ITEMS (1-3 PRODUCTS) SWITCH */}
                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <div>
                      <div className="font-semibold text-sm">Show Compact Items (1-3 Products)</div>
                      <div className="text-xs text-muted-foreground">
                        Renders up to 3 line items on short delivery stickers.
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={settings.label.showCompactItems}
                      onClick={() => patchLabel({ showCompactItems: !settings.label.showCompactItems })}
                      className={`inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        settings.label.showCompactItems ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
                          settings.label.showCompactItems ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* 3. SHOW COURIER / DELIVERY PARTNER SWITCH */}
                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <div>
                      <div className="font-semibold text-sm">Show Courier / Delivery Partner</div>
                      <div className="text-xs text-muted-foreground">
                        Appends courier name inline on delivery stickers and waybills.
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={settings.label.showCourier}
                      onClick={() => patchLabel({ showCourier: !settings.label.showCourier })}
                      className={`inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        settings.label.showCourier ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
                          settings.label.showCourier ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* 4 & 5. SAVE & APPLY + PRINT TEST (LABEL) BUTTONS */}
                  <div className="flex gap-3 pt-2">
                    <Button onClick={triggerSaved} className="gap-1.5">
                      <Save className="h-4 w-4" /> Save &amp; Apply
                    </Button>
                    <Button variant="outline" onClick={() => window.print()} className="gap-1.5">
                      <PrinterIcon className="h-4 w-4" /> Print Test (Label)
                    </Button>
                  </div>
                </div>
              </div>

              {/* ================== LIVE PREVIEW (RIGHT) ================== */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Preview</h3>

                {/* ============ SHORT STICKER 50×30mm ============ */}
                {(isShort50 || (isCustom && lw <= 55)) && (
                  <div className="rounded-2xl border border-border bg-muted p-3 shadow-sm mx-auto flex overflow-auto"
                       style={{ minHeight: '32mm', aspectRatio: `${50/30}`, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <div style={{ margin: '0 auto', transform: 'scale(1)', transformOrigin: 'top center' }}>
                      <div
                        style={{
                          width: '50mm', height: '30mm', maxHeight: '30mm',
                          boxSizing: 'border-box', overflow: 'hidden',
                          display: 'flex', flexDirection: 'column',
                          justifyContent: 'flex-start', position: 'relative',
                          padding: '2px 2px 1px 2px', backgroundColor: 'white',
                          fontWeight: 700,
                        }}
                      >
                            {/* CLEAN 2-COLUMN HEADER: LEFT BOX (Logo + Store Info) / RIGHT BOX (Invoice Details top-right corner) */}
                            <div style={{
                              display:'flex', alignItems:'stretch', justifyContent:'space-between', gap:'3px', width:'100%',
                              borderBottom:'1px solid #000', paddingBottom:'1.5px', marginBottom:'0.8px',
                              flexShrink: 0,
                            }}>
                              {/* LEFT BOX — Logo + Store Info */}
                              <div style={{ display:'flex', alignItems:'flex-start', gap:'3px', flex: '1 1 0', minWidth: 0, justifyContent: logoAlign === 'right' ? 'flex-end' : (logoAlign === 'center' ? 'center' : 'flex-start') }}>
                                {logoShow ? (
                                  <div style={{
                                    display:'flex', alignItems:'center', justifyContent: 'center',
                                    width: '28px', height: '28px',
                                    borderRadius: storeLogoSrc ? '2px' : '50%',
                                    overflow: 'hidden',
                                    border: storeLogoSrc ? 'none' : '1px solid #9ca3af',
                                    background: '#fff', flexShrink: 0,
                                  }}>
                                    <img
                                      src={storeLogoSrc || '/icon-192.png'}
                                      alt="Logo"
                                      style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: logoMonochrome ? 'grayscale(100%) contrast(200%)' : 'none',
                                        display: 'block',
                                        margin: '0 auto',
                                      }}
                                      onError={(e) => {
                                        const t = e.currentTarget as HTMLImageElement;
                                        t.onerror = null;
                                        t.src = '/icon-192.png';
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div style={{ display: 'none' }} />
                                )}
                                <div style={{ flex:'1 1 0', display:'flex', flexDirection:'column', justifyContent:'flex-start', minWidth: 0, fontWeight: 700, maxWidth: '68%' }}>
                                  <span style={{ fontSize: '5.5px', lineHeight:1.0, fontWeight:700, letterSpacing:'0.02px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width:'100%' }}>{storeName}</span>
                                  {storeTagline && <div style={{ fontSize: '5px', lineHeight:1.0, whiteSpace:'normal', overflow:'hidden', wordBreak: 'break-word', fontWeight: 700 }}>{storeTagline}</div>}
                                  {storeAddress && <div style={{ fontSize: '7.5px', lineHeight: '1.0', fontWeight: 700, whiteSpace:'normal', overflow:'hidden', wordBreak: 'break-word' }}>{storeAddress}</div>}
                                  {storePhone && <div style={{ fontSize: '4.8px', lineHeight:1.0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', fontWeight: 700 }}>{storePhone}</div>}
                                </div>
                              </div>
                              {/* RIGHT BOX — Invoice No top-right corner, no vertical shift */}
                              <div style={{ flexShrink: 0, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-start', minWidth: 0, paddingTop: '0px', fontWeight: 700 }}>
                                <div style={{ fontSize: '4px', lineHeight:1.0, fontWeight:700, textTransform:'uppercase', color:'#4b5563', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Invoice No</div>
                                <div style={{ fontSize: '5.2px', lineHeight:1.0, fontWeight:800, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'#111827', marginTop: '0.3px' }}>SMPL-0001</div>
                              </div>
                            </div>

                        {/* CUSTOMER INFO BOXES (3 stacked: Name / Phone (2-line) / Address) */}
                        {settings.label.showCustomerAddress && (
                          <div style={{ display:'flex', flexDirection:'column', flex: settings.label.showCompactItems ? '0 0 auto' : '1', width:'100%', marginBottom:'0.5px', overflow:'hidden', fontWeight: 700 }}>
                            <div style={{ fontSize: '6px', padding:'0.8px 2px', border:'1px solid #000', lineHeight:1.05, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', height: 'auto', flexShrink: 0, fontWeight: 700 }}>
                              <span style={{ fontWeight:700, textTransform:'uppercase', fontSize:'0.9em' }}>Name:</span> May Thet Khine
                            </div>
                            <div style={{ fontSize: '5.5px', padding:'0.8px 2px', border:'1px solid #000', borderTop:'none', lineHeight:1.05, height: 'auto', minHeight: '11px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 700 }}>
                              <div style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width: '100%', lineHeight:1.0 }}>
                                <span style={{ fontWeight:700 }}>Phone 1:</span> 09-123456789
                              </div>
                              <div style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width: '100%', lineHeight:1.0 }}>
                                <span style={{ fontWeight:700 }}>Phone 2:</span> 09-777848379
                              </div>
                            </div>
                            <div style={settings.label.showCompactItems
                              ? { height: 'auto', maxHeight: '16px', minHeight: '12px', fontSize: '5px', lineHeight: 1.05, padding: '0.8px 2px', border: '1px solid #000', borderTop: 'none',
                                  whiteSpace: 'normal', overflow: 'hidden', wordBreak: 'break-word', flexShrink: 0, fontWeight: 700 }
                              : { flex: 1, minHeight: '18px', fontSize: '7.5px', lineHeight: '1.0', padding: '1.5px 2px', border: '1px solid #000', borderTop: 'none',
                                  whiteSpace: 'normal', overflow: 'hidden', wordBreak: 'break-word', fontWeight: 700 }
                            }>
                              <span style={{ fontWeight:700 }}>Address:</span> No.23 Thun Phayar Street, Near Kyakhat Wine Monastery, Bago City.
                            </div>
                          </div>
                        )}

                        {/* 6-COLUMN PRODUCT LIST TABLE */}
                        {settings.label.showCompactItems && (
                          <table style={{ width:'100%', border:'1px solid #000', borderTop:'none', fontSize: '3.8px', lineHeight:1.0, borderCollapse:'collapse', height: 'auto', flexShrink: 0, fontWeight: 700 }}>
                            <tbody>
                              {SAMPLE_ITEMS.map((it, idx) => (
                                <tr key={it.no}>
                                  <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '7%', textAlign: 'center', fontWeight: 700, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.no}</td>
                                  <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '36%', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderTop: idx > 0 ? '1px solid #d1d5db' : 'none' }}>{it.description}</td>
                                  <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '14%', textAlign: 'center', fontWeight: 700, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.size}</td>
                                  <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '15%', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.price.toLocaleString()}</td>
                                  <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '8%', textAlign: 'center', fontWeight: 800, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.qty}</td>
                                  <td style={{ padding: '0.4px 1px', width: '20%', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}

                        {/* FINANCIAL + COURIER + REMARK — ONE contiguous stack gap 0, remark flush at bottom 0 overflow */}
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0px', flexShrink: 0, paddingBottom: '0px', marginTop: '0px', fontWeight: 700 }}>
                          <div style={{ display:'flex', flexDirection:'row', width:'100%', border:'1px solid #000', borderTop: settings.label.showCompactItems ? 'none' : '1px solid #000', fontSize: '4.5px', whiteSpace: 'nowrap', fontWeight: 700, alignItems:'center', height: 'auto', overflow:'hidden' }}>
                            <div style={{ flex: '1 1 0', padding: '0.8px 2px', borderRight: '1px solid #000', minWidth: 0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign: 'left', fontWeight: 700 }}>
                              Amt: 48,000,000 Ks
                            </div>
                            <div style={{ flex: '0 0 32%', padding: '0.8px 2px', borderRight: '1px solid #000', minWidth: 0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign: 'left', fontWeight: 700 }}>
                              Deli: 2,000 Ks
                            </div>
                            <div style={{ flex: '1 1 0', padding: '0.8px 2px', minWidth: 0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign: 'right', fontWeight: 800 }}>
                              Total: 48,002,000 Ks
                            </div>
                          </div>
                          {settings.label.showCourier && (
                            <div style={{ border: '1px solid #000', borderTop: 'none', fontSize: '4.8px', padding: '0.8px 2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'auto', lineHeight: 1.0, flexShrink: 0, whiteSpace: 'nowrap', fontWeight: 700 }}>
                              <span style={{ fontWeight: 700, textTransform: 'uppercase', color: '#111827', letterSpacing: '0.1px', flexShrink: 0 }}>Courier / Delivery</span>
                              <span style={{ fontWeight: 800, color: '#059669', flexShrink: 0 }}>EXPRESS</span>
                            </div>
                          )}
                          <div style={{ fontSize: '5px', lineHeight:1.0, padding:'0.8px 2px', border:'1px solid #000', borderTop: settings.label.showCourier ? 'none' : 'none', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', height: 'auto', fontWeight: 700, flexShrink: 0 }}>
                            <span style={{ fontWeight:700 }}>Remark:</span> —
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============ SHORT STICKER 40×30mm (inner 0.78 scaled 50×30, top-center origin) ============ */}
                {isShort40 && (
                  <div className="rounded-2xl border border-border bg-muted p-3 shadow-sm mx-auto flex overflow-auto"
                       style={{ minHeight: '32mm', aspectRatio: `${40/30}`, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <div style={{ margin: '0 auto', transform: 'scale(1)', transformOrigin: 'top center' }}>
                      <div
                        style={{
                          width: '40mm', height: '30mm', overflow: 'hidden',
                          border: '1px solid black', backgroundColor: 'white',
                          boxSizing: 'border-box',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <div style={{ transform:'scale(0.78)', transformOrigin:'top center', width:'50mm', height:'30mm', overflow:'hidden' }}>
                          <div
                            style={{
                              width: '50mm', height: '30mm', maxHeight: '30mm',
                              boxSizing: 'border-box', overflow: 'hidden',
                              display: 'flex', flexDirection: 'column',
                              justifyContent: 'flex-start', position: 'relative',
                              padding: '2px 2px 1px 2px', backgroundColor: 'white',
                              fontWeight: 700,
                            }}
                          >
                            {/* CLEAN 2-COLUMN HEADER (mirrors 50x30): LEFT (Logo+Store), RIGHT (Inv top-right) */}
                            <div style={{
                              display:'flex', alignItems:'stretch', justifyContent:'space-between', gap:'3px', width:'100%', maxWidth:'100%',
                              borderBottom:'1px solid #000', paddingBottom:'1.5px', marginBottom:'0.8px',
                              flexShrink: 0, overflow:'hidden', boxSizing:'border-box',
                            }}>
                              {/* LEFT BOX */}
                              <div style={{ display:'flex', alignItems:'flex-start', gap:'3px', flex: '1 1 0', minWidth: 0, justifyContent: logoAlign === 'right' ? 'flex-end' : (logoAlign === 'center' ? 'center' : 'flex-start') }}>
                                {logoShow ? (
                                  <div style={{
                                    display:'flex', alignItems:'center', justifyContent: 'center',
                                    width: '28px', height: '28px',
                                    borderRadius: storeLogoSrc ? '2px' : '50%',
                                    overflow: 'hidden',
                                    border: storeLogoSrc ? 'none' : '1px solid #9ca3af',
                                    background: '#fff', flexShrink: 0,
                                  }}>
                                    <img
                                      src={storeLogoSrc || '/icon-192.png'}
                                      alt="Logo"
                                      style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: logoMonochrome ? 'grayscale(100%) contrast(200%)' : 'none',
                                        display: 'block',
                                        margin: '0 auto',
                                      }}
                                      onError={(e) => {
                                        const t = e.currentTarget as HTMLImageElement;
                                        t.onerror = null;
                                        t.src = '/icon-192.png';
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div style={{ display: 'none' }} />
                                )}
                                <div style={{ flex:'1 1 0', display:'flex', flexDirection:'column', justifyContent:'flex-start', minWidth: 0, fontWeight: 700, maxWidth: '66%' }}>
                                  <span style={{ fontSize: '5.5px', lineHeight:1.0, fontWeight:700, letterSpacing:'0.02px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width:'100%' }}>{storeName}</span>
                                  {storeTagline && <div style={{ fontSize: '5px', lineHeight:1.0, whiteSpace:'normal', overflow:'hidden', wordBreak: 'break-word', fontWeight: 700 }}>{storeTagline}</div>}
                                  {storeAddress && <div style={{ fontSize: '7.5px', lineHeight: '1.0', fontWeight: 700, whiteSpace:'normal', overflow:'hidden', wordBreak: 'break-word' }}>{storeAddress}</div>}
                                  {storePhone && <div style={{ fontSize: '4.8px', lineHeight:1.0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', fontWeight: 700 }}>{storePhone}</div>}
                                </div>
                              </div>
                              {/* RIGHT BOX — Invoice top-right corner anchor, no shift down */}
                              <div style={{ flexShrink: 0, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-start', minWidth: 0, paddingTop:'0px', overflow:'hidden', fontWeight: 700 }}>
                                <div style={{ fontSize: '4px', lineHeight:1.0, fontWeight:700, textTransform:'uppercase', color:'#4b5563', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Invoice No</div>
                                <div style={{ fontSize: '5px', lineHeight:1.0, fontWeight:800, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'#111827', marginTop: '0.3px' }}>SMPL-0001</div>
                              </div>
                            </div>

                            {/* CUSTOMER INFO (40x30 basic delivery) */}
                            {settings.label.showCustomerAddress && (
                              <div style={{ display:'flex', flexDirection:'column', flex: 1, width:'100%', maxWidth:'100%', boxSizing:'border-box', marginBottom:'0px', overflow:'hidden', fontWeight: 700 }}>
                                <div style={{ fontSize: '6px', padding:'0.8px 2px', border:'1px solid #000', lineHeight:1.05, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', height: 'auto', flexShrink: 0, width:'100%', maxWidth:'100%', boxSizing:'border-box', fontWeight: 700 }}>
                                  <span style={{ fontWeight:700, textTransform:'uppercase', fontSize:'0.9em' }}>Name:</span> May Thet Khine
                                </div>
                                <div style={{ fontSize: '5.5px', padding:'0.8px 2px', border:'1px solid #000', borderTop:'none', lineHeight:1.05, height: 'auto', minHeight: '11px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textOverflow: 'ellipsis', width:'100%', maxWidth:'100%', boxSizing:'border-box', fontWeight: 700 }}>
                                  <div style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width: '100%', lineHeight:1.0 }}>
                                    <span style={{ fontWeight:700 }}>Phone 1:</span> 09-123456789
                                  </div>
                                  <div style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width: '100%', lineHeight:1.0 }}>
                                    <span style={{ fontWeight:700 }}>Phone 2:</span> 09-777848379
                                  </div>
                                </div>
                                <div style={{ flex: 1, minHeight: '0px', maxHeight: '22px', fontSize: '7.5px', lineHeight: '1.0', padding: '1.2px 2px', border: '1px solid #000', borderTop: 'none', whiteSpace: 'normal', overflow: 'hidden', wordBreak: 'break-word', width:'100%', maxWidth:'100%', boxSizing:'border-box', fontWeight: 700 }}>
                                  <span style={{ fontWeight:700 }}>Address:</span> No.23 Thun Phayar Street, Near Kyakhat Wine Monastery, Bago City.
                                </div>
                              </div>
                            )}

                            {/* Items Table (Compact), Financial, Courier, Remark — ONE contiguous flex column gap 0px, NO floating */}
                            <div style={{ width: '100%', maxWidth:'100%', boxSizing:'border-box', display: 'flex', flexDirection: 'column', gap: '0px', flexShrink: 0, paddingBottom: '0px', marginTop: '0px', overflow:'hidden', fontWeight: 700 }}>
                              {settings.label.showCompactItems && (
                                <table style={{ width:'100%', border:'1px solid #000', fontSize: '3.8px', lineHeight:1.0, borderCollapse:'collapse', height: 'auto', flexShrink: 0, fontWeight: 700 }}>
                                  <tbody>
                                    {SAMPLE_ITEMS.map((it, idx) => (
                                      <tr key={it.no}>
                                        <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '7%', textAlign: 'center', fontWeight: 700, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.no}</td>
                                        <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '36%', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderTop: idx > 0 ? '1px solid #d1d5db' : 'none' }}>{it.description}</td>
                                        <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '14%', textAlign: 'center', fontWeight: 700, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.size}</td>
                                        <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '15%', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.price.toLocaleString()}</td>
                                        <td style={{ padding: '0.4px 1px', borderRight: '1px solid #000', width: '8%', textAlign: 'center', fontWeight: 800, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.qty}</td>
                                        <td style={{ padding: '0.4px 1px', width: '20%', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, borderTop: idx > 0 ? '1px solid #d1d5db' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.amount.toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                              <div style={{ display:'flex', flexDirection:'row', width:'100%', maxWidth:'100%', boxSizing:'border-box', border:'1px solid #000', borderTop: settings.label.showCompactItems ? 'none' : '1px solid #000', fontSize: '4.5px', whiteSpace: 'nowrap', fontWeight: 700, alignItems:'center', height: 'auto', overflow:'hidden' }}>
                                <div style={{ flex: '1 1 0', padding: '0.8px 2px', borderRight: '1px solid #000', minWidth: 0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign: 'left', fontWeight: 700 }}>
                                  Amt: 48,000,000 Ks
                                </div>
                                <div style={{ flex: '0 0 32%', padding: '0.8px 2px', borderRight: '1px solid #000', minWidth: 0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign: 'left', fontWeight: 700 }}>
                                  Deli: 2,000 Ks
                                </div>
                                <div style={{ flex: '1 1 0', padding: '0.8px 2px', minWidth: 0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign: 'right', fontWeight: 800 }}>
                                  Total: 48,002,000 Ks
                                </div>
                              </div>
                              {settings.label.showCourier && (
                                <div style={{ border: '1px solid #000', borderTop: 'none', fontSize: '4.5px', padding: '0.8px 2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'auto', lineHeight: 1.0, flexShrink: 0, whiteSpace: 'nowrap', maxWidth:'100%', width:'100%', boxSizing:'border-box', overflow:'hidden', fontWeight: 700 }}>
                                  <span style={{ fontWeight: 700, textTransform: 'uppercase', color: '#111827', letterSpacing: '0.1px', flexShrink: 0, overflow:'hidden', textOverflow:'ellipsis' }}>Courier / Delivery</span>
                                  <span style={{ fontWeight: 800, color: '#059669', flexShrink: 0 }}>EXPRESS</span>
                                </div>
                              )}
                              <div style={{ fontSize: '5px', lineHeight:1.0, padding:'0.8px 2px', border:'1px solid #000', borderTop: settings.label.showCourier ? 'none' : 'none', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', height: 'auto', maxWidth:'100%', width:'100%', boxSizing:'border-box', fontWeight: 700, flexShrink: 0 }}>
                                <span style={{ fontWeight:700 }}>Remark:</span> —
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============ LONG WAYBILL 100×150mm Figma Node 71-110 ============ */}
                {isLongWaybill && (
                  <div className="rounded-2xl border border-border bg-white p-3 shadow-sm mx-auto flex items-start justify-center overflow-auto"
                       style={{ minHeight: `${lh + 20}mm` }}>
                    <div
                      style={{
                        width: '100mm', height: '150mm', padding: '2.5mm',
                        boxSizing: 'border-box', border: '1px solid #9ca3af',
                        fontFamily: 'Arial, sans-serif', fontSize: 10, lineHeight: 1.15,
                        overflow: 'hidden', color: '#000', background: '#fff',
                        fontWeight: 700,
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1mm', fontWeight: 700 }}>
                        {/* HEADER: configurable logo 28x28 SQUARE container (no huge circle) + store info */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2mm', borderBottom: '1.5px solid #000', paddingBottom: '1mm', justifyContent: logoAlign === 'left' ? 'flex-start' : (logoAlign === 'right' ? 'flex-end' : 'flex-start'), fontWeight: 700 }}>
                          {logoShow ? (
                            <div style={{ width: '28mm', height: '28mm', borderRadius: storeLogoSrc ? '2px' : '50%', overflow: 'hidden', border: storeLogoSrc ? 'none' : '1px solid #9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#fff' }}>
                              <img
                                src={storeLogoSrc || '/icon-192.png'}
                                alt="Store Logo"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  width: `${Math.min(logoSizePx / 1.4, 28)}mm`,
                                  height: `${Math.min(logoSizePx / 1.4, 28)}mm`,
                                  objectFit: 'contain',
                                  filter: logoMonochrome ? 'grayscale(100%) contrast(200%)' : 'none',
                                  display: 'block',
                                  margin: '0 auto',
                                }}
                                onError={(e)=>{ const t=e.currentTarget as HTMLImageElement; t.onerror=null; t.src='/icon-192.png'; }}
                              />
                            </div>
                          ) : (
                            <div style={{ display: 'none' }} />
                          )}
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3mm', minWidth: 0, paddingTop: '0.3mm', fontWeight: 700 }}>
                            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.2mm', textTransform: 'uppercase' }}>
                              {storeName}
                            </div>
                            <div style={{ fontSize: 9.5, color: '#1f2937', fontWeight: 700 }}>
                              {storeTagline}
                            </div>
                            <div style={{ fontSize: 8.5, color: '#374151', fontWeight: 700 }}>
                              {storeAddress}
                            </div>
                            <div style={{ fontSize: 8.5, color: '#111827', fontWeight: 700 }}>
                              Phone: {storePhone}
                            </div>
                          </div>
                        </div>

                        {/* BARCODE (RIGHT ONLY) — compact padding 0.2mm */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0mm 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexShrink: 0 }}>
                            <Code128Svg
                              value="SMPL0001"
                              heightPx={22}
                              barWidthPx={1}
                              showText
                              fontSizePx={8}
                              quietZonePx={1}
                            />
                          </div>
                        </div>

                        {/* 3 STACKED ROUNDED INPUT RECTANGLES + COURIER — reduced internal paddings */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6mm', fontWeight: 700 }}>
                          {/* NAME */}
                          <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '1mm 1.5mm', display: 'flex', alignItems: 'center', minHeight: '5.5mm', background: '#fff', fontWeight: 700 }}>
                            <span style={{ fontWeight: 700, fontSize: 8.5, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '13mm' }}>Name</span>
                            <span style={{ fontSize: 10.5, fontWeight: 700, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              May Thet Khine
                            </span>
                          </div>
                          {/* PHONE No (2-line support for primary & secondary) */}
                          <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '1mm 1.5mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '7mm', gap: '2mm', fontWeight: 700 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, gap: '0.3mm' }}>
                              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ fontWeight: 700, fontSize: 8.5, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '13mm' }}>Phone 1</span>
                                <span style={{ fontSize: 10.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  09-123456789
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ fontWeight: 700, fontSize: 8.5, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '13mm' }}>Phone 2</span>
                                <span style={{ fontSize: 10.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  09-777848379
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* ADDRESS — reduced padding, tighter minHeight */}
                          <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '1mm 1.5mm', display: 'flex', alignItems: 'flex-start', minHeight: '10mm', fontWeight: 700 }}>
                            <span style={{ fontWeight: 700, fontSize: 8.5, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '13mm', paddingTop: '0.2mm' }}>Address</span>
                            <span style={{ fontSize: 9.5, lineHeight: 1.15, flex: 1, color: '#111827', wordBreak: 'break-word', fontWeight: 700 }}>
                              No.23 Thun Phyar Street, Near Kyakhat Wine Monastery, Bago City, Myanmar
                            </span>
                          </div>
                          {/* COURIER / DELIVERY PARTNER */}
                          {settings.label.showCourier && (
                            <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '1mm 1.5mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '5.5mm', gap: '2mm', fontWeight: 700 }}>
                              <span style={{ fontWeight: 700, fontSize: 8.5, textTransform: 'uppercase', color: '#111827', letterSpacing: '0.1mm' }}>
                                Courier / Delivery Partner
                              </span>
                              <span style={{ fontSize: 10, fontWeight: 800, color: '#059669' }}>EXPRESS</span>
                            </div>
                          )}
                        </div>

                        {/* 6-COLUMN GRID TABLE — row minHeight 4mm instead of 4.5mm for footer recovery */}
                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '5px', overflow: 'hidden', background: '#fff', flexShrink: 0, fontWeight: 700 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '7% 38% 13% 14% 10% 18%', background: '#ffffff', color: '#000000', fontWeight: 800, fontSize: 9, textTransform: 'uppercase', borderBottom: '1.5px solid #000', flexShrink: 0 }}>
                            <div style={{ padding: '0.6mm 0.7mm', borderRight: '1px solid #000', textAlign: 'center' }}>No</div>
                            <div style={{ padding: '0.6mm 0.7mm', borderRight: '1px solid #000' }}>Description</div>
                            <div style={{ padding: '0.6mm 0.7mm', borderRight: '1px solid #000', textAlign: 'center' }}>Size</div>
                            <div style={{ padding: '0.6mm 0.7mm', borderRight: '1px solid #000', textAlign: 'right' }}>Price</div>
                            <div style={{ padding: '0.6mm 0.7mm', borderRight: '1px solid #000', textAlign: 'center' }}>Qty</div>
                            <div style={{ padding: '0.6mm 0.7mm', textAlign: 'right' }}>Amount</div>
                          </div>
                          {SAMPLE_ITEMS.map((it, idx) => (
                            <div key={it.no} style={{ display: 'grid', gridTemplateColumns: '7% 38% 13% 14% 10% 18%', fontSize: 9, background: idx % 2 ? '#f9fafb' : '#fff', minHeight: '4mm', fontWeight: 700 }}>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'center', fontWeight: 700 }}>{it.no}</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 700 }}>{it.description}</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'center', fontWeight: 700 }}>{it.size}</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>{it.price.toLocaleString()}</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'center', fontWeight: 700 }}>{it.qty}</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800 }}>{it.amount.toLocaleString()}</div>
                            </div>
                          ))}
                          {[4, 5, 6, 7].map((n) => (
                            <div key={n} style={{ display: 'grid', gridTemplateColumns: '7% 38% 13% 14% 10% 18%', fontSize: 9, minHeight: '4mm', fontWeight: 700 }}>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#9ca3af', fontWeight: 700 }}>{n}</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', fontWeight: 700 }}>&nbsp;</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', fontWeight: 700 }}>&nbsp;</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', fontWeight: 700 }}>&nbsp;</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', fontWeight: 700 }}>&nbsp;</div>
                              <div style={{ padding: '0.5mm 0.7mm', borderTop: '1px solid #e5e7eb', fontWeight: 700 }}>&nbsp;</div>
                            </div>
                          ))}
                        </div>

                        {/* BOTTOM: REMARK (LEFT) + FINANCIAL PILLS (RIGHT) — Remark minHeight 15mm, pills gap 0.5mm */}
                        <div style={{ display: 'flex', gap: '1mm', flexShrink: 0, height: 'auto', fontWeight: 700 }}>
                          <div style={{
                            flex: 1, border: '1.5px solid #000', borderRadius: '5px',
                            padding: '1mm 1.2mm', display: 'flex', flexDirection: 'column',
                            background: '#fff', minHeight: '14mm',
                          }}>
                            <div style={{
                              fontSize: 8.5, fontWeight: 800, textTransform: 'uppercase',
                              color: '#111827', marginBottom: '0.3mm', paddingBottom: '0.3mm',
                              borderBottom: '1px dashed #9ca3af', letterSpacing: '0.1mm',
                            }}>
                              Remark
                            </div>
                            <div style={{ flex: 1, fontSize: 9.5, color: '#374151', lineHeight: 1.2, fontWeight: 700 }}>
                              &nbsp;
                            </div>
                          </div>
                          <div style={{ width: '32mm', display: 'flex', flexDirection: 'column', gap: '0.5mm', flexShrink: 0 }}>
                            {[
                              { label: 'Total', value: 70000, weight: 700, border: true },
                              { label: 'Deli Fees', value: 2000, weight: 700, border: true },
                              { label: 'Advance', value: 0, weight: 700, border: true },
                              { label: 'Balance', value: 72000, weight: 800, border: false, highlight: true },
                            ].map((row) => (
                              <div
                                key={row.label}
                                style={{
                                  display: 'flex', justifyContent: 'space-between',
                                  alignItems: 'center', padding: '0.8mm 1.3mm',
                                  border: row.border ? '1px solid #000' : '1.5px solid #000',
                                  borderRadius: '4px', background: row.highlight ? '#fef2f2' : '#fff',
                                  gap: '1mm',
                                }}
                              >
                                <span style={{ fontSize: 8.5, fontWeight: row.weight, textTransform: 'uppercase', color: row.highlight ? '#991b1b' : '#111827', letterSpacing: '0.1mm' }}>
                                  {row.label}
                                </span>
                                <span style={{
                                  fontSize: 10, fontWeight: row.weight, fontFamily: 'monospace',
                                  color: row.highlight ? '#991b1b' : '#111827', whiteSpace: 'nowrap',
                                }}>
                                  {formatKs(row.value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* FOOTER TAGLINE — 100% VISIBLE inside 150mm frame (flexShrink 0 + 0.5mm marginTop top-border 1mm) */}
                        <div style={{
                          textAlign: 'center', fontWeight: 700, fontSize: 10,
                          color: '#000000',
                          padding: '0.5mm 0 0.3mm 0',
                          marginTop: '0.3mm',
                          borderTop: '1.5px solid #000',
                          letterSpacing: '0.2mm',
                          flexShrink: 0,
                        }}>
                          ♥ Thank you for shopping with us ♥
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[10px] text-muted-foreground text-center">Preview uses actual mm sizing. Toggles reflow layout — no blank spaces.</p>
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
                  <li>Per-device: stored in browser localStorage under <code className="rounded bg-muted px-1 py-0.5">{`'${'tmyg-hw-print-settings-v1'}'`}</code>.</li>
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
