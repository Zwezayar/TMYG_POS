'use client';

import * as React from 'react';
import {
  DEFAULT_HW_PRINT_SETTINGS,
  HW_PRINT_SETTINGS_KEY,
  HWPrintSettings,
  getReceiptWidthMm,
  sanitizeSettings,
} from '@/lib/hwPrintSettings/types';

interface HWPrintContextValue {
  settings: HWPrintSettings;
  updateSettings: (updater: (prev: HWPrintSettings) => HWPrintSettings) => void;
  patchReceipt: (patch: Partial<HWPrintSettings['receipt']>) => void;
  patchScanner: (patch: Partial<HWPrintSettings['scanner']>) => void;
  resetSettings: () => void;
}

const HWPrintContext = React.createContext<HWPrintContextValue | undefined>(undefined);

function buildReceiptPrintCss(settings: HWPrintSettings): string {
  const widthMm = getReceiptWidthMm(settings.receipt);
  const padTop = Math.max(0, settings.receipt.marginTopMm);
  const padBot = Math.max(0, settings.receipt.marginBottomMm);
  const padLeft = Math.max(0, settings.receipt.marginLeftMm);
  const padRight = Math.max(0, settings.receipt.marginRightMm);
  return `
@media print {
  @page {
    size: ${widthMm}mm auto;
    margin: 0;
  }
  html, body {
    width: ${widthMm}mm;
    margin: 0;
    padding: 0;
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
  #print-receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: ${widthMm}mm;
    max-width: ${widthMm}mm;
    padding: ${padTop}mm ${padRight}mm ${padBot}mm ${padLeft}mm;
    box-sizing: border-box;
    font-family: ${settings.receipt.fontFamily};
    font-size: ${settings.receipt.baseFontSizePx}px;
    line-height: ${settings.receipt.lineHeight};
    color: #000;
    word-wrap: break-word;
    overflow: visible;
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
    font-size: ${Math.max(8, settings.receipt.baseFontSizePx - 1)}px;
    text-transform: uppercase;
  }
  #print-receipt .receipt-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }
  #print-receipt .receipt-item {
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  #print-receipt .receipt-amount {
    font-weight: 700;
  }
  #print-receipt .divider {
    border-top: 1px dashed #000;
    margin: 6px 0;
  }
  #print-receipt .receipt-title {
    font-size: ${settings.receipt.headerFontSizePx}px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }
  #print-receipt .receipt-center {
    text-align: center;
  }
  #print-receipt .receipt-footer {
    text-align: center;
    margin-top: 8px;
  }
  #print-receipt .receipt-barcode {
    text-align: center;
    margin-top: 6px;
  }
}
@media not print {
  #print-receipt {
    display: none;
  }
}`;
}

export { getReceiptWidthMm, HW_PRINT_SETTINGS_KEY, DEFAULT_HW_PRINT_SETTINGS };
export type { HWPrintSettings, ReceiptSettings, ScannerSettings } from '@/lib/hwPrintSettings/types';

export function HWPrintSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<HWPrintSettings>(DEFAULT_HW_PRINT_SETTINGS);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(HW_PRINT_SETTINGS_KEY);
      const parsed = raw ? JSON.parse(raw) : DEFAULT_HW_PRINT_SETTINGS;
      setSettings(sanitizeSettings(parsed));
    } catch {
      setSettings({ ...DEFAULT_HW_PRINT_SETTINGS });
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        HW_PRINT_SETTINGS_KEY,
        JSON.stringify(settings)
      );
    } catch {
      /* Quota / disabled storage */
    }
  }, [settings, hydrated]);

  const updateSettings = React.useCallback(
    (updater: (prev: HWPrintSettings) => HWPrintSettings) => {
      setSettings((prev) => sanitizeSettings(updater(prev)));
    },
    []
  );
  const patchReceipt = React.useCallback(
    (patch: Partial<HWPrintSettings['receipt']>) => {
      setSettings((prev) =>
        sanitizeSettings({ ...prev, receipt: { ...prev.receipt, ...patch } })
      );
    },
    []
  );
  const patchScanner = React.useCallback(
    (patch: Partial<HWPrintSettings['scanner']>) => {
      setSettings((prev) =>
        sanitizeSettings({ ...prev, scanner: { ...prev.scanner, ...patch } })
      );
    },
    []
  );
  const resetSettings = React.useCallback(() => {
    setSettings({ ...DEFAULT_HW_PRINT_SETTINGS });
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(HW_PRINT_SETTINGS_KEY);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const receiptCss = React.useMemo(() => buildReceiptPrintCss(settings), [settings]);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    let el = document.getElementById('tmyg-receipt-print-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'tmyg-receipt-print-styles';
      document.head.appendChild(el);
    }
    el.textContent = receiptCss;
  }, [receiptCss]);

  const value = React.useMemo<HWPrintContextValue>(
    () => ({
      settings,
      updateSettings,
      patchReceipt,
      patchScanner,
      resetSettings,
    }),
    [settings, updateSettings, patchReceipt, patchScanner, resetSettings]
  );

  return <HWPrintContext.Provider value={value}>{children}</HWPrintContext.Provider>;
}

export function useHWPrintSettings() {
  const ctx = React.useContext(HWPrintContext);
  if (!ctx) {
    throw new Error('useHWPrintSettings must be used within HWPrintSettingsProvider');
  }
  return ctx;
}
