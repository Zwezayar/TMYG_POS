'use client';

import * as React from 'react';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { useHWPrintSettings } from '@/components/hw-print-settings-provider';
import {
  RECEIPT_PAPER_OPTIONS,
  LABEL_SIZE_OPTIONS,
  getLabelSizeMm,
  getReceiptWidthMm,
  DEFAULT_HW_PRINT_SETTINGS,
} from '@/lib/hwPrintSettings/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code128Svg } from '@/components/ui/code128-svg';
import { RotateCcw, Printer as PrinterIcon, Save } from 'lucide-react';

type TabKey = 'receipt' | 'label' | 'scanner';

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

  const rw = getReceiptWidthMm(settings.receipt);
  const { widthMm: lw, heightMm: lh } = getLabelSizeMm(settings.label);

  const onReset = () => {
    if (confirm('Reset all hardware & printing settings to defaults?')) {
      resetSettings();
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
          <Button variant="outline" onClick={onReset} className="gap-1.5">
            <RotateCcw className="h-4 w-4" /> Reset to Defaults
          </Button>
        </div>
      </div>

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
                    onChange={(e) => patchReceipt({ paperSize: e.target.value as any })}
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
                <div style={{ fontSize: settings.receipt.headerFontSizePx, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>
                  {settings.receipt.storeName?.trim() || DEFAULT_HW_PRINT_SETTINGS.receipt.storeName}
                </div>
                {settings.receipt.storeAddress?.trim() && <div style={{ textAlign: 'center' }}>{settings.receipt.storeAddress}</div>}
                {settings.receipt.storePhone?.trim() && <div style={{ textAlign: 'center' }}>Tel: {settings.receipt.storePhone}</div>}
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
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Label Size</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Preset</Label>
                  <select
                    value={settings.label.sizePreset}
                    onChange={(e) => patchLabel({ sizePreset: e.target.value as any })}
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
                {[
                  ['showProductName', 'Product Name'],
                  ['showPrice', 'Sale Price'],
                  ['showBarcode', 'Barcode Image (SVG)'],
                  ['showSku', 'SKU'],
                  ['showCustomerAddress', 'Customer Shipping Address'],
                  ['showCourier', 'Courier / Delivery Partner'],
                ].map(([k, label]) => (
                  <label key={k} className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm">
                    <input type="checkbox" className="h-4 w-4"
                      checked={(settings.label as any)[k] as boolean}
                      onChange={(e) => patchLabel({ [k]: e.target.checked } as any)} />
                    <span className="font-medium">{label}</span>
                  </label>
                ))}
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
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm mx-auto flex items-center justify-center"
                 style={{ width: `${lw + 20}mm`, minHeight: `${lh + 20}mm` }}>
              <div
                style={{
                  width: `${lw}mm`,
                  height: `${lh}mm`,
                  padding: '1mm',
                  boxSizing: 'border-box',
                  border: '1px solid #d4d4d8',
                  fontFamily: settings.label.fontFamily,
                  fontSize: settings.label.fontSizePx,
                  lineHeight: 1.15,
                  overflow: 'hidden',
                  color: '#000',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '1mm' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    {settings.label.showProductName ? (
                      <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        Aura Glow Serum 30ml
                      </div>
                    ) : <span />}
                    {settings.label.showPrice ? (
                      <div style={{ fontWeight: 800 }}>48,000 Ks</div>
                    ) : null}
                  </div>
                  {settings.label.showSku ? (
                    <div style={{ fontFamily: 'monospace', fontSize: Math.max(6, settings.label.fontSizePx - 1) }}>
                      SKU: AGS-030
                    </div>
                  ) : null}
                  {settings.label.showCourier ? (
                    <div style={{ textAlign: 'center', fontWeight: 800, fontSize: settings.label.fontSizePx + 2, border: '2px solid #000', padding: '1mm' }}>
                      EXPRESS / CT-X
                    </div>
                  ) : null}
                  {settings.label.showCustomerAddress ? (
                    <div style={{ border: '1px dashed #555', padding: '1mm' }}>
                      <div style={{ fontWeight: 700 }}>Ma Khin Cho</div>
                      <div>09-123-456-789</div>
                      <div style={{ fontSize: Math.max(7, settings.label.fontSizePx - 2) }}>
                        No.123, 4th St, Botahtaung Tsp, Yangon
                      </div>
                    </div>
                  ) : null}
                  {settings.label.showBarcode ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', width: '100%' }}>
                      <Code128Svg value="888812300010" heightPx={settings.label.barcodeHeightPx} barWidthPx={1} showText fontSizePx={Math.max(6, settings.label.fontSizePx - 2)} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">Preview uses the same CSS layout rules as @media print.</p>
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
                    { v: 'hardware', label: 'Hardware (HID Keyboard Wedge)', hint: 'Focus auto-search inputs first' },
                    { v: 'camera', label: 'Camera Scanner (html5-qrcode)', hint: 'Prefer camera scan button in UI' },
                  ].map((o) => (
                    <label key={o.v} className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${settings.scanner.scannerPriority === o.v ? 'border-primary bg-primary/10' : ''}`}>
                      <input type="radio" className="h-4 w-4" name="scannerPri"
                        checked={settings.scanner.scannerPriority === o.v}
                        onChange={() => patchScanner({ scannerPriority: o.v as any })} />
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
  );
}
