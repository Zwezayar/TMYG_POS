export const HW_PRINT_SETTINGS_KEY = 'tmyg-hw-print-settings-v1';

export type ReceiptPaperSize = '58mm' | '80mm' | 'A4' | 'custom';

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
  storeAddress: string;
  storePhone: string;
  storeSocial: string;
  footerText: string;
  showLogo: boolean;
  showBarcode: boolean;
  showQrCode: boolean;
}

export type LabelSizePreset =
  | 'short-50x30'
  | 'short-40x30'
  | 'long-100x150'
  | 'A6'
  | 'custom';

export interface LabelSettings {
  sizePreset: LabelSizePreset;
  customWidthMm: number;
  customHeightMm: number;
  fontFamily: string;
  fontSizePx: number;
  barcodeHeightPx: number;
  showProductName: boolean;
  showPrice: boolean;
  showBarcode: boolean;
  showSku: boolean;
  showCustomerAddress: boolean;
  showCourier: boolean;
}

export type ScannerPriority = 'hardware' | 'camera';

export interface ScannerSettings {
  autoSubmitOnEnter: boolean;
  scanAudioBeep: boolean;
  scannerPriority: ScannerPriority;
}

export interface HWPrintSettings {
  receipt: ReceiptSettings;
  label: LabelSettings;
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
  storeAddress: '',
  storePhone: '',
  storeSocial: '',
  footerText: 'Thank you for your purchase!',
  showLogo: false,
  showBarcode: false,
  showQrCode: false,
};

export const DEFAULT_LABEL: LabelSettings = {
  sizePreset: 'short-40x30',
  customWidthMm: 40,
  customHeightMm: 30,
  fontFamily: 'Arial, sans-serif',
  fontSizePx: 10,
  barcodeHeightPx: 22,
  showProductName: true,
  showPrice: true,
  showBarcode: true,
  showSku: true,
  showCustomerAddress: false,
  showCourier: false,
};

export const DEFAULT_SCANNER: ScannerSettings = {
  autoSubmitOnEnter: true,
  scanAudioBeep: true,
  scannerPriority: 'hardware',
};

export const DEFAULT_HW_PRINT_SETTINGS: HWPrintSettings = {
  receipt: DEFAULT_RECEIPT,
  label: DEFAULT_LABEL,
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

export const LABEL_SIZE_OPTIONS: Array<{
  value: LabelSizePreset;
  label: string;
  widthMm: number;
  heightMm: number;
}> = [
  { value: 'short-50x30', label: 'Short Sticker 50×30mm (Product)', widthMm: 50, heightMm: 30 },
  { value: 'short-40x30', label: 'Short Sticker 40×30mm (Product)', widthMm: 40, heightMm: 30 },
  { value: 'long-100x150', label: 'Long Sticker 100×150mm (4×6 / Waybill)', widthMm: 100, heightMm: 150 },
  { value: 'A6', label: 'A6 (105×148mm)', widthMm: 105, heightMm: 148 },
  { value: 'custom', label: 'Custom Dimensions', widthMm: 50, heightMm: 30 },
];

export function getReceiptWidthMm(r: ReceiptSettings): number {
  const opt = RECEIPT_PAPER_OPTIONS.find((o) => o.value === r.paperSize);
  return r.paperSize === 'custom'
    ? Math.max(20, Math.min(500, r.customWidthMm || 80))
    : opt?.widthMm ?? 80;
}

export function getLabelSizeMm(l: LabelSettings): { widthMm: number; heightMm: number } {
  const opt = LABEL_SIZE_OPTIONS.find((o) => o.value === l.sizePreset);
  if (l.sizePreset === 'custom') {
    return {
      widthMm: Math.max(10, Math.min(300, l.customWidthMm || 50)),
      heightMm: Math.max(10, Math.min(300, l.customHeightMm || 30)),
    };
  }
  return {
    widthMm: opt?.widthMm ?? 50,
    heightMm: opt?.heightMm ?? 30,
  };
}

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

export function sanitizeSettings(raw: unknown): HWPrintSettings {
  const out: HWPrintSettings = JSON.parse(JSON.stringify(DEFAULT_HW_PRINT_SETTINGS));
  if (!isPlainObject(raw)) return out;
  const rSrc = isPlainObject((raw as any).receipt) ? (raw as any).receipt : {};
  Object.keys(DEFAULT_RECEIPT).forEach((k) => {
    if (k in rSrc && typeof rSrc[k] === typeof (DEFAULT_RECEIPT as any)[k]) {
      (out.receipt as any)[k] = rSrc[k];
    }
  });
  const lSrc = isPlainObject((raw as any).label) ? (raw as any).label : {};
  Object.keys(DEFAULT_LABEL).forEach((k) => {
    if (k in lSrc && typeof lSrc[k] === typeof (DEFAULT_LABEL as any)[k]) {
      (out.label as any)[k] = lSrc[k];
    }
  });
  const sSrc = isPlainObject((raw as any).scanner) ? (raw as any).scanner : {};
  Object.keys(DEFAULT_SCANNER).forEach((k) => {
    if (k in sSrc && typeof sSrc[k] === typeof (DEFAULT_SCANNER as any)[k]) {
      (out.scanner as any)[k] = sSrc[k];
    }
  });
  return out;
}
