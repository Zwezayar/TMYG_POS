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
} from '@/lib/hwPrintSettings/types';
import { useHWPrintSettings, getLabelSizeMm } from '@/components/hw-print-settings-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code128Svg } from '@/components/ui/code128-svg';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { RotateCcw, Printer as PrinterIcon, Save } from 'lucide-react';

type TabKey = 'receipt' | 'label' | 'scanner';

const SAMPLE_ITEMS = [
  { no: 1, description: 'Aura Glow Serum 30ml', size: '30ml', sku: 'AGS-030', price: 18000, qty: 2, amount: 36000 },
  { no: 2, description: 'Hydrating Mist Toner', size: '100ml', sku: 'HMT-100', price: 12000, qty: 1, amount: 12000 },
  { no: 3, description: 'UV Shield Sunscreen SPF50', size: '50ml', sku: 'UVS-050', price: 22000, qty: 1, amount: 22000 },
];

function formatKs(n: number) {
  return n.toLocaleString('en-US') + ' Ks';
}

const ShopLogo: React.FC<{ sizeMm?: number }> = ({ sizeMm = 14 }) => {
  const sizePx = Math.round(sizeMm * 3.78);
  const roundPx = Math.max(2, Math.round(sizeMm * 0.5));
  return (
    <img
      src="/logo.jpg"
      alt="Logo"
      width={sizePx}
      height={sizePx}
      style={{ objectFit: 'cover', borderRadius: `${roundPx}px`, flexShrink: 0 }}
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
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Label Size</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Preset</Label>
                      <select
                        value={settings.label.sizePreset}
                        onChange={(e) => patchLabel({ sizePreset: e.target.value as LabelSizePreset })}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
                      >
                        {LABEL_SIZE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <p className="text-[10px] text-muted-foreground">
                        Current: <strong>{lw}mm × {lh}mm</strong>
                      </p>
                    </div>
                    {is3colBarcode && (
                      <div className="md:col-span-2 rounded-lg border border-amber-300/60 bg-amber-50 dark:bg-amber-950/30 p-3">
                        <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
                          3-Column Barcode Roll preset only prints SKU / Price / Barcode. Product Name, Courier, Customer Address, and Compact Items options are disabled for this template.
                        </p>
                      </div>
                    )}
                    {settings.label.sizePreset === 'custom' && (
                      <>
                        <div className="space-y-1.5">
                          <Label>Custom Width (mm)</Label>
                          <Input type="number" min={10} max={300} step={1}
                            value={settings.label.customWidthMm}
                            onChange={(e) => patchLabel({ customWidthMm: Number(e.target.value) || 50 })} />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Custom Height (mm)</Label>
                          <Input type="number" min={10} max={300} step={1}
                            value={settings.label.customHeightMm}
                            onChange={(e) => patchLabel({ customHeightMm: Number(e.target.value) || 30 })} />
                        </div>
                      </>
                    )}
                    <div className="space-y-1.5 md:col-span-2">
                      <div className={`flex items-center justify-between rounded-xl border border-border p-3 ${is3colBarcode ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div>
                          <div className="font-semibold text-sm">Show Compact Items (1-3 Products)</div>
                          <div className="text-xs text-muted-foreground">
                            Renders up to 3 line items with No / Description / Amount columns on short stickers.
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.label.showCompactItems}
                          aria-disabled={is3colBarcode}
                          onClick={() => {
                            if (!is3colBarcode) {
                              const v = !settings.label.showCompactItems;
                              patchLabel({ showCompactItems: v });
                            }
                          }}
                          className={`inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                            settings.label.showCompactItems ? 'bg-primary' : 'bg-muted'
                          }`}
                          disabled={is3colBarcode}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
                              settings.label.showCompactItems ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Font Family</Label>
                      <select
                        value={settings.label.fontFamily}
                        onChange={(e) => patchLabel({ fontFamily: e.target.value })}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
                      >
                        <option value="Arial, Helvetica, sans-serif">Arial / Sans-serif</option>
                        <option value="sans-serif">Sans-serif</option>
                        <option value="Courier, monospace">Courier / Monospace</option>
                        <option value="monospace">Monospace</option>
                        <option value="'Pyidaungsu', 'Noto Sans Myanmar', sans-serif">Pyidaungsu (Myanmar)</option>
                        <option value="'Roboto', sans-serif">Roboto (Google Font)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Font Size: {settings.label.fontSizePx}px</Label>
                      <Input type="range" min={6} max={24} step={1}
                        value={settings.label.fontSizePx}
                        onChange={(e) => patchLabel({ fontSizePx: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Barcode Height: {settings.label.barcodeHeightPx}px</Label>
                      <Input type="range" min={8} max={80} step={1}
                        value={settings.label.barcodeHeightPx}
                        onChange={(e) => patchLabel({ barcodeHeightPx: Number(e.target.value) })} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Printable Elements</h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {([
                      ['showProductName', 'Product Name'],
                      ['showPrice', 'Sale Price'],
                      ['showBarcode', 'Barcode Image (SVG)'],
                      ['showSku', 'SKU'],
                      ['showCustomerAddress', 'Customer Shipping Address'],
                      ['showCourier', 'Courier / Delivery Partner'],
                    ] as Array<[keyof typeof settings.label, string]>).map(([k, label]) => {
                      const disabled = is3colBarcode && (k === 'showProductName' || k === 'showCourier' || k === 'showCustomerAddress');
                      const checked = (settings.label as unknown as Record<string, boolean>)[k] as boolean;
                      return (
                        <label key={k} className={`flex items-center gap-2 rounded-xl border border-border p-3 text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-primary accent-emerald-500"
                            checked={checked}
                            disabled={disabled}
                            onChange={(e) => {
                              const v: boolean = e.target.checked;
                              patchLabel({ [k]: v } as Partial<typeof settings.label>);
                            }}
                          />
                          <span className="font-medium">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={triggerSaved} className="gap-1.5"><Save className="h-4 w-4" /> Save &amp; Apply</Button>
                    <Button variant="outline" onClick={() => window.print()} className="gap-1.5">
                      <PrinterIcon className="h-4 w-4" /> Print Test (Label)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Preview</h3>

                {(isShort50 || (isCustom && lw <= 55)) && (
                  <div className="rounded-2xl border border-border bg-white p-3 shadow-sm mx-auto flex items-start justify-center overflow-auto"
                       style={{ minHeight: `${lh + 20}mm` }}>
                    <div
                      style={{
                        width: `${isCustom ? lw : 50}mm`,
                        height: `${isCustom ? lh : 30}mm`,
                        padding: '1.5mm',
                        boxSizing: 'border-box',
                        border: '1px solid #9ca3af',
                        fontFamily: settings.label.fontFamily,
                        fontSize: settings.label.fontSizePx,
                        lineHeight: 1.1,
                        overflow: 'hidden',
                        color: '#000',
                        background: '#fff',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.6mm' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1mm' }}>
                          <ShopLogo sizeMm={10} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3mm', minWidth: 0 }}>
                            {storeName && (
                              <div style={{ fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {storeName}
                              </div>
                            )}
                            {storeTagline && (
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 2), color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {storeTagline}
                              </div>
                            )}
                            {(storeAddress || storePhone) && (
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 2), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {[storeAddress, storePhone].filter(Boolean).join(' · ')}
                              </div>
                            )}
                          </div>
                        </div>

                        {settings.label.showCustomerAddress && (
                          <div style={{ border: '0.6px solid #6b7280', padding: '0.6mm', display: 'flex', flexDirection: 'column', gap: '0.3mm' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                Invoice No:
                              </div>
                              <div style={{ fontWeight: 800 }}>INV-SAMPLE-0001</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                Name:
                              </div>
                              <div style={{ fontWeight: 700 }}>Ma Khin Cho</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                Phone:
                              </div>
                              <div>09-123-456-789</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm', alignItems: 'flex-start' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', flexShrink: 0 }}>
                                Address:
                              </div>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 2), textAlign: 'right' }}>{storeAddress}</div>
                            </div>
                          </div>
                        )}

                        {settings.label.showCompactItems && (
                          <div style={{ flex: settings.label.showCustomerAddress ? '0 0 auto' : '1 1 auto', minHeight: 0 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>
                              <thead>
                                <tr style={{ borderBottom: '0.4px solid #d1d5db' }}>
                                  <th style={{ textAlign: 'left', padding: '0.3mm 0.5mm', width: '4mm' }}>No</th>
                                  <th style={{ textAlign: 'left', padding: '0.3mm 0.5mm' }}>Description</th>
                                  <th style={{ textAlign: 'right', padding: '0.3mm 0.5mm', width: '10mm' }}>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {SAMPLE_ITEMS.slice(0, 3).map((it) => (
                                  <tr key={it.no}>
                                    <td style={{ padding: '0.2mm 0.5mm' }}>{it.no}</td>
                                    <td style={{ padding: '0.2mm 0.5mm', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.description}</td>
                                    <td style={{ padding: '0.2mm 0.5mm', textAlign: 'right', fontWeight: 700 }}>{it.amount.toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {settings.label.showPrice && (
                          <div style={{ background: '#f3f4f6', padding: '0.5mm', display: 'flex', flexDirection: 'column', gap: '0.2mm' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>
                              <span>Amount</span><span style={{ textAlign: 'right' }}>{formatKs(70000)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>
                              <span>Deli Fees</span><span style={{ textAlign: 'right' }}>{formatKs(2000)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, borderTop: '0.4px solid #9ca3af', paddingTop: '0.2mm' }}>
                              <span>Total</span><span style={{ textAlign: 'right' }}>{formatKs(72000)}</span>
                            </div>
                          </div>
                        )}

                        <div style={{ textAlign: 'center', fontSize: Math.max(6, settings.label.fontSizePx - 2), color: '#6b7280', marginTop: 'auto' }}>
                          Thanks for choosing us. See you again!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isShort40 && (
                  <div className="rounded-2xl border border-border bg-white p-3 shadow-sm mx-auto flex items-start justify-center overflow-auto"
                       style={{ minHeight: `${lh + 20}mm` }}>
                    <div
                      style={{
                        width: '40mm',
                        height: '30mm',
                        padding: '1mm',
                        boxSizing: 'border-box',
                        border: '1px solid #9ca3af',
                        fontFamily: settings.label.fontFamily,
                        fontSize: settings.label.fontSizePx,
                        lineHeight: 1.05,
                        overflow: 'hidden',
                        color: '#000',
                        background: '#fff',
                      }}
                    >
                      <div style={{ transform: 'scale(0.82)', transformOrigin: 'top left', width: `${100 / 0.82}%`, height: `${100 / 0.82}%` }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.5mm' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8mm' }}>
                            <ShopLogo sizeMm={8} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2mm', minWidth: 0 }}>
                              {storeName && (
                                <div style={{ fontWeight: 800, fontSize: 9, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {storeName}
                                </div>
                              )}
                              {storeTagline && (
                                <div style={{ fontSize: 8, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {storeTagline}
                                </div>
                              )}
                              {(storeAddress || storePhone) && (
                                <div style={{ fontSize: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {[storeAddress, storePhone].filter(Boolean).join(' · ')}
                                </div>
                              )}
                            </div>
                          </div>

                          {settings.label.showCustomerAddress && (
                            <div style={{ border: '0.5px solid #6b7280', padding: '0.5mm', display: 'flex', flexDirection: 'column', gap: '0.2mm' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8mm' }}>
                                <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                  Invoice No:
                                </div>
                                <div style={{ fontWeight: 800, fontSize: 9 }}>INV-SAMPLE-0001</div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8mm' }}>
                                <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                  Name:
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 9 }}>Ma Khin Cho</div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8mm' }}>
                                <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                  Phone:
                                </div>
                                <div style={{ fontSize: 9 }}>09-123-456-789</div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8mm', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', flexShrink: 0 }}>
                                  Address:
                                </div>
                                <div style={{ fontSize: 8, textAlign: 'right' }}>{storeAddress}</div>
                              </div>
                            </div>
                          )}

                          {settings.label.showCompactItems && (
                            <div style={{ flex: settings.label.showCustomerAddress ? '0 0 auto' : '1 1 auto', minHeight: 0 }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8 }}>
                                <thead>
                                  <tr style={{ borderBottom: '0.3px solid #d1d5db' }}>
                                    <th style={{ textAlign: 'left', padding: '0.2mm 0.4mm', width: '3.5mm' }}>No</th>
                                    <th style={{ textAlign: 'left', padding: '0.2mm 0.4mm' }}>Description</th>
                                    <th style={{ textAlign: 'right', padding: '0.2mm 0.4mm', width: '9mm' }}>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {SAMPLE_ITEMS.slice(0, 3).map((it) => (
                                    <tr key={it.no}>
                                      <td style={{ padding: '0.15mm 0.4mm', fontSize: 8 }}>{it.no}</td>
                                      <td style={{ padding: '0.15mm 0.4mm', fontSize: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.description}</td>
                                      <td style={{ padding: '0.15mm 0.4mm', textAlign: 'right', fontWeight: 700, fontSize: 8 }}>{it.amount.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {settings.label.showPrice && (
                            <div style={{ background: '#f3f4f6', padding: '0.4mm', display: 'flex', flexDirection: 'column', gap: '0.15mm' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8 }}>
                                <span>Amount</span><span style={{ textAlign: 'right' }}>{formatKs(70000)}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8 }}>
                                <span>Deli Fees</span><span style={{ textAlign: 'right' }}>{formatKs(2000)}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, borderTop: '0.3px solid #9ca3af', paddingTop: '0.15mm', fontSize: 9 }}>
                                <span>Total</span><span style={{ textAlign: 'right' }}>{formatKs(72000)}</span>
                              </div>
                            </div>
                          )}

                          <div style={{ textAlign: 'center', fontSize: 8, color: '#6b7280', marginTop: 'auto' }}>
                            Thanks for choosing us. See you again!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isLongWaybill && (
                  <div className="rounded-2xl border border-border bg-white p-3 shadow-sm mx-auto flex items-start justify-center overflow-auto"
                       style={{ minHeight: `${lh + 20}mm` }}>
                    <div
                      style={{
                        width: labelPreset === 'A6' ? '105mm' : '100mm',
                        height: labelPreset === 'A6' ? '148mm' : '150mm',
                        padding: '2mm',
                        boxSizing: 'border-box',
                        border: '1px solid #9ca3af',
                        fontFamily: settings.label.fontFamily,
                        fontSize: settings.label.fontSizePx,
                        lineHeight: 1.15,
                        overflow: 'hidden',
                        color: '#000',
                        background: '#fff',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.2mm' }}>
                        {settings.label.showBarcode && (
                          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Code128Svg value="INVTEST0012026" heightPx={settings.label.barcodeHeightPx} barWidthPx={1} showText fontSizePx={Math.max(6, settings.label.fontSizePx - 2)} />
                          </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2mm' }}>
                          <ShopLogo sizeMm={12} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5mm' }}>
                            <div style={{ fontWeight: 800, fontSize: settings.label.fontSizePx + 1 }}>{storeName}</div>
                            <div style={{ fontSize: Math.max(7, settings.label.fontSizePx - 1), color: '#374151' }}>{storeTagline}</div>
                            <div style={{ fontSize: Math.max(7, settings.label.fontSizePx - 1) }}>Phone: {storePhone}</div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1mm', borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '1.2mm 0' }}>
                          <div>
                            <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>Invoice No</div>
                            <div style={{ fontWeight: 800 }}>SMPL-0001</div>
                          </div>
                          <div>
                            <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>Date</div>
                            <div>19/08/2026</div>
                          </div>
                          <div>
                            <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>Name</div>
                            <div style={{ fontWeight: 700 }}>Ma Khin Cho</div>
                          </div>
                          <div>
                            <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>Phone No</div>
                            <div>09-123-456-789</div>
                          </div>
                          {settings.label.showCustomerAddress && (
                            <div style={{ gridColumn: '1 / -1' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>Address</div>
                              <div style={{ fontSize: Math.max(7, settings.label.fontSizePx - 1) }}>{storeAddress}</div>
                            </div>
                          )}
                          {settings.label.showCourier && (
                            <div style={{ gridColumn: '1 / -1' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>Courier</div>
                              <div style={{ fontWeight: 800 }}>EXPRESS / CT-X</div>
                            </div>
                          )}
                        </div>

                        {settings.label.showProductName && (
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: Math.max(7, settings.label.fontSizePx - 1) }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid #000' }}>
                                <th style={{ textAlign: 'left', padding: '0.5mm', width: '6mm' }}>No</th>
                                <th style={{ textAlign: 'left', padding: '0.5mm' }}>Description</th>
                                <th style={{ textAlign: 'left', padding: '0.5mm', width: '10mm' }}>Size</th>
                                <th style={{ textAlign: 'left', padding: '0.5mm', width: '14mm' }}>SKU</th>
                                {settings.label.showPrice && (
                                  <>
                                    <th style={{ textAlign: 'right', padding: '0.5mm', width: '14mm' }}>Price</th>
                                    <th style={{ textAlign: 'right', padding: '0.5mm', width: '16mm' }}>Amount</th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {SAMPLE_ITEMS.map((it) => (
                                <tr key={it.no} style={{ borderBottom: '0.5px solid #d1d5db' }}>
                                  <td style={{ padding: '0.5mm', verticalAlign: 'top' }}>{it.no}</td>
                                  <td style={{ padding: '0.5mm', verticalAlign: 'top' }}>{it.description}</td>
                                  <td style={{ padding: '0.5mm', verticalAlign: 'top' }}>{it.size}</td>
                                  {settings.label.showSku && (
                                    <td style={{ padding: '0.5mm', verticalAlign: 'top', fontFamily: 'monospace', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>{it.sku}</td>
                                  )}
                                  {!settings.label.showSku && <td style={{ padding: '0.5mm', verticalAlign: 'top' }}></td>}
                                  {settings.label.showPrice && (
                                    <>
                                      <td style={{ padding: '0.5mm', verticalAlign: 'top', textAlign: 'right' }}>{it.price.toLocaleString()}</td>
                                      <td style={{ padding: '0.5mm', verticalAlign: 'top', textAlign: 'right', fontWeight: 700 }}>{it.amount.toLocaleString()}</td>
                                    </>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}

                        <div style={{ display: 'flex', gap: '2mm', flex: 1, minHeight: 0 }}>
                          <div style={{ flex: 1, border: '1px dashed #000', padding: '1mm', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.5mm' }}>Remark</div>
                            <div style={{ flex: 1, fontSize: Math.max(7, settings.label.fontSizePx - 1), color: '#4b5563' }}>—</div>
                          </div>
                          {settings.label.showPrice && (
                            <table style={{ width: '30mm', borderCollapse: 'collapse', fontSize: Math.max(7, settings.label.fontSizePx - 1) }}>
                              <tbody>
                                <tr>
                                  <td style={{ padding: '0.5mm 0', fontWeight: 700 }}>Total</td>
                                  <td style={{ padding: '0.5mm 0', textAlign: 'right', fontWeight: 700 }}>{formatKs(70000)}</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: '0.5mm 0' }}>Deli Fees</td>
                                  <td style={{ padding: '0.5mm 0', textAlign: 'right' }}>{formatKs(2000)}</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: '0.5mm 0' }}>Advance</td>
                                  <td style={{ padding: '0.5mm 0', textAlign: 'right' }}>{formatKs(0)}</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #000' }}>
                                  <td style={{ padding: '0.5mm 0', fontWeight: 800 }}>Balance</td>
                                  <td style={{ padding: '0.5mm 0', textAlign: 'right', fontWeight: 800 }}>{formatKs(72000)}</td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                        </div>

                        {settings.label.showSku && !settings.label.showProductName && (
                          <div style={{
                            fontFamily: 'monospace',
                            fontSize: Math.max(6, settings.label.fontSizePx - 2),
                            textAlign: 'center',
                            borderTop: '0.5px solid #d1d5db',
                            paddingTop: '0.5mm',
                          }}>
                            SKU: AGS-030 · SKU: HMT-100 · SKU: UVS-050
                          </div>
                        )}

                        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: Math.max(7, settings.label.fontSizePx - 1), color: '#be185d' }}>
                          ❤ Thank you for shopping with us ❤
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {is3colBarcode && (
                  <div className="rounded-2xl border border-border bg-white p-3 shadow-sm mx-auto flex items-start justify-center overflow-auto"
                       style={{ minHeight: `${lh + 20}mm` }}>
                    <div
                      style={{
                        width: '90mm',
                        height: '30mm',
                        padding: '1mm',
                        boxSizing: 'border-box',
                        border: '1px solid #9ca3af',
                        fontFamily: settings.label.fontFamily,
                        fontSize: settings.label.fontSizePx,
                        lineHeight: 1.1,
                        overflow: 'hidden',
                        color: '#000',
                        background: '#fff',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1mm', width: '100%', height: '100%' }}>
                        {SAMPLE_ITEMS.slice(0, 3).map((it, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '0.3mm' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: Math.max(7, settings.label.fontSizePx - 2), fontWeight: 700 }}>
                              {it.sku}
                            </div>
                            {settings.label.showPrice && (
                              <div style={{ fontWeight: 800, fontSize: settings.label.fontSizePx + 1, fontVariantNumeric: 'tabular-nums' }}>
                                {formatKs(it.price)}
                              </div>
                            )}
                            {settings.label.showBarcode && (
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Code128Svg
                                  value={it.sku.replace(/-/g, '') + String(it.price)}
                                  heightPx={settings.label.barcodeHeightPx}
                                  barWidthPx={0.8}
                                  showText={false}
                                  fontSizePx={5}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isCustom && lw > 55 && (
                  <div className="rounded-2xl border border-border bg-white p-3 shadow-sm mx-auto flex items-start justify-center overflow-auto"
                       style={{ minHeight: `${lh + 20}mm` }}>
                    <div
                      style={{
                        width: `${lw}mm`,
                        height: `${lh}mm`,
                        padding: '1.5mm',
                        boxSizing: 'border-box',
                        border: '1px solid #9ca3af',
                        fontFamily: settings.label.fontFamily,
                        fontSize: settings.label.fontSizePx,
                        lineHeight: 1.1,
                        overflow: 'hidden',
                        color: '#000',
                        background: '#fff',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.6mm' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1mm' }}>
                          <ShopLogo sizeMm={10} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3mm', minWidth: 0 }}>
                            {storeName && (
                              <div style={{ fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {storeName}
                              </div>
                            )}
                            {storeTagline && (
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 2), color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {storeTagline}
                              </div>
                            )}
                            {(storeAddress || storePhone) && (
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 2), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {[storeAddress, storePhone].filter(Boolean).join(' · ')}
                              </div>
                            )}
                          </div>
                        </div>

                        {settings.label.showCustomerAddress && (
                          <div style={{ border: '0.6px solid #6b7280', padding: '0.6mm', display: 'flex', flexDirection: 'column', gap: '0.3mm' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                Invoice No:
                              </div>
                              <div style={{ fontWeight: 800 }}>INV-SAMPLE-0001</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                Name:
                              </div>
                              <div style={{ fontWeight: 700 }}>Ma Khin Cho</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280' }}>
                                Phone:
                              </div>
                              <div>09-123-456-789</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1mm', alignItems: 'flex-start' }}>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 3), fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', flexShrink: 0 }}>
                                Address:
                              </div>
                              <div style={{ fontSize: Math.max(6, settings.label.fontSizePx - 2), textAlign: 'right' }}>{storeAddress}</div>
                            </div>
                          </div>
                        )}

                        {settings.label.showCompactItems && (
                          <div style={{ flex: settings.label.showCustomerAddress ? '0 0 auto' : '1 1 auto', minHeight: 0 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>
                              <thead>
                                <tr style={{ borderBottom: '0.4px solid #d1d5db' }}>
                                  <th style={{ textAlign: 'left', padding: '0.3mm 0.5mm', width: '4mm' }}>No</th>
                                  <th style={{ textAlign: 'left', padding: '0.3mm 0.5mm' }}>Description</th>
                                  <th style={{ textAlign: 'right', padding: '0.3mm 0.5mm', width: '10mm' }}>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {SAMPLE_ITEMS.slice(0, 3).map((it) => (
                                  <tr key={it.no}>
                                    <td style={{ padding: '0.2mm 0.5mm' }}>{it.no}</td>
                                    <td style={{ padding: '0.2mm 0.5mm', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.description}</td>
                                    <td style={{ padding: '0.2mm 0.5mm', textAlign: 'right', fontWeight: 700 }}>{it.amount.toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {settings.label.showPrice && (
                          <div style={{ background: '#f3f4f6', padding: '0.5mm', display: 'flex', flexDirection: 'column', gap: '0.2mm' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>
                              <span>Amount</span><span style={{ textAlign: 'right' }}>{formatKs(70000)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: Math.max(6, settings.label.fontSizePx - 2) }}>
                              <span>Deli Fees</span><span style={{ textAlign: 'right' }}>{formatKs(2000)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, borderTop: '0.4px solid #9ca3af', paddingTop: '0.2mm' }}>
                              <span>Total</span><span style={{ textAlign: 'right' }}>{formatKs(72000)}</span>
                            </div>
                          </div>
                        )}

                        <div style={{ textAlign: 'center', fontSize: Math.max(6, settings.label.fontSizePx - 2), color: '#6b7280', marginTop: 'auto' }}>
                          Thanks for choosing us. See you again!
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
