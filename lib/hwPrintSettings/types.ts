export const HW_PRINT_SETTINGS_KEY = 'tmyg-hw-print-settings-v2';

export type ReceiptPaperSize = '58mm' | '80mm' | 'A4' | 'custom';

export type LogoAlignment = 'left' | 'center' | 'right';

export interface ReceiptSettings {
  paperSize: ReceiptPaperSize;
  customWidthMm: number;
  fontFamily: string;
  baseFontSizePx: number;
  headerFontSizePx: number;
  lineHeight: number;
  marginTopMm: number;
  marginBottomMm: number;
  marginLeftMm: number;
  marginRightMm: number;
  storeName: string;
  storeTagline: string;
  storeAddress: string;
  storePhone: string;
  storeSocial: string;
  storeLogo?: string;
  footerText: string;
  showLogo: boolean;
  showBarcode: boolean;
  showQrCode: boolean;
  logoUrl?: string;
  logoSizePx: number;
  logoAlignment: LogoAlignment;
  monochromeLogo: boolean;
}

export type ScannerPriority = 'hardware' | 'camera';

export interface ScannerSettings {
  autoSubmitOnEnter: boolean;
  scanAudioBeep: boolean;
  scannerPriority: ScannerPriority;
}

export interface HWPrintSettings {
  receipt: ReceiptSettings;
  scanner: ScannerSettings;
}

export const DEFAULT_RECEIPT: ReceiptSettings = {
  paperSize: '80mm',
  customWidthMm: 80,
  fontFamily: 'Courier, monospace',
  baseFontSizePx: 11,
  headerFontSizePx: 13,
  lineHeight: 1.4,
  marginTopMm: 2,
  marginBottomMm: 4,
  marginLeftMm: 4,
  marginRightMm: 4,
  storeName: 'THE MORE YOU GLOW BY INGYIN',
  storeTagline: 'USA Skincare and Cosmetics',
  storeAddress: 'No.23 Thun Phayar Street, Near Kyakhat Wine Monastery, Bago City',
  storePhone: '09-777848379',
  storeSocial: '',
  footerText: 'Thank you for your purchase!',
  showLogo: true,
  showBarcode: false,
  showQrCode: false,
  logoSizePx: 20,
  logoAlignment: 'center',
  monochromeLogo: false,
};

export const DEFAULT_SCANNER: ScannerSettings = {
  autoSubmitOnEnter: true,
  scanAudioBeep: true,
  scannerPriority: 'hardware',
};

export const DEFAULT_HW_PRINT_SETTINGS: HWPrintSettings = {
  receipt: DEFAULT_RECEIPT,
  scanner: DEFAULT_SCANNER,
};

export const RECEIPT_PAPER_OPTIONS: Array<{
  value: ReceiptPaperSize;
  label: string;
  widthMm: number;
}> = [
  { value: '58mm', label: '58mm Thermal', widthMm: 58 },
  { value: '80mm', label: '80mm Thermal', widthMm: 80 },
  { value: 'A4', label: 'A4 (210mm)', widthMm: 210 },
  { value: 'custom', label: 'Custom Width', widthMm: 80 },
];

export function getReceiptWidthMm(r: ReceiptSettings): number {
  const opt = RECEIPT_PAPER_OPTIONS.find((o) => o.value === r.paperSize);
  return r.paperSize === 'custom'
    ? Math.max(20, Math.min(500, r.customWidthMm || 80))
    : opt?.widthMm ?? 80;
}

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function typeMatch(a: unknown, b: unknown): boolean {
  if (a === null || b === null) return typeof a === typeof b;
  if (typeof a !== typeof b) return false;
  return true;
}

function patchObject<T extends Record<string, unknown>>(target: T, src: Record<string, unknown>, defaults: T): T {
  Object.keys(defaults).forEach((k) => {
    if (!(k in src)) return;
    const def = (defaults as any)[k];
    const val = src[k];
    if (typeof def === 'undefined') return;
    if (k === 'storeLogo' || k === 'logoUrl') {
      if (typeof val === 'string' || val === undefined || val === null) {
        (target as any)[k] = val;
      }
      return;
    }
    if (!typeMatch(val, def)) return;
    (target as any)[k] = val;
  });
  return target;
}

export function sanitizeSettings(raw: unknown): HWPrintSettings {
  const out: HWPrintSettings = JSON.parse(JSON.stringify(DEFAULT_HW_PRINT_SETTINGS));
  if (!isPlainObject(raw)) return out;
  const rSrc = isPlainObject((raw as any).receipt) ? (raw as any).receipt : {};
  patchObject(out.receipt as any, rSrc, DEFAULT_RECEIPT as any);
  const sSrc = isPlainObject((raw as any).scanner) ? (raw as any).scanner : {};
  patchObject(out.scanner as any, sSrc, DEFAULT_SCANNER as any);
  return out;
}
