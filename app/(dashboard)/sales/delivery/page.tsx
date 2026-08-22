'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ReceiptModal, type ReceiptPayload } from '@/components/receipt-modal';
import { downloadSalesXlsx, type SalesExportRow } from '@/lib/excel';
import { formatDateDDMMYYYY, formatDateRangeDDMMYYYY } from '@/lib/date';
import { useT } from '@/components/language-provider';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Code128Svg } from '@/components/ui/code128-svg';
import { useHWPrintSettings, getLabelSizeMm } from '@/components/hw-print-settings-provider';

type Order = {
  id: string;
  invoice_id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  payment_method: string | null;
  payment_status: 'Confirmed' | 'Check';
  total_amount: number;
  delivery_fee: number | null;
  courier_name: string | null;
  created_at: string;
  sale_type: 'Shop' | 'Delivery';
  receipt_payload: ReceiptPayload | null;
};

function WaybillModal({
  open,
  order,
  onClose,
}: {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}) {
  const { settings } = useHWPrintSettings();
  const { label } = settings;
  const { widthMm, heightMm } = getLabelSizeMm(label);
  if (!open || !order) return null;

  const date = new Date(order.created_at);
  const dateText = formatDateDDMMYYYY(date);

  const storeName = settings.receipt.storeName?.trim() || 'THE MORE YOU GLOW BY INGYIN';
  const storeTagline = settings.receipt.storeTagline?.trim() || 'USA Skincare and Cosmetics';
  const storeAddress = settings.receipt.storeAddress?.trim() || '';
  const storePhone = settings.receipt.storePhone?.trim() || '09-777848379';

  const items = order.receipt_payload?.items ?? [];
  const hasItems = items.length > 0;

  const totalVal = order.total_amount || 0;
  const deliFeesVal = Number(order.delivery_fee) || 0;
  const advanceVal = Number((order.receipt_payload as any)?.amountReceived ?? 0);
  const grandVal = totalVal + deliFeesVal;
  const balanceVal = Math.max(0, grandVal - advanceVal);

  const showCustomerAddress = label.showCustomerAddress;
  const showProductName = label.showProductName;
  const showPrice = label.showPrice;
  const showSku = label.showSku;
  const showBarcode = label.showBarcode;

  const isShortPreset = label.sizePreset === 'short-50x30' || label.sizePreset === 'short-40x30';
  const isShort40x30 = label.sizePreset === 'short-40x30';
  const isLongPreset = label.sizePreset === 'long-100x150' || label.sizePreset === 'A6';

  const storeLogoSrc = settings.receipt.storeLogo || null;

  const getItemVariant = (item: any): string => {
    if (!item) return '—';
    if (item.variant && typeof item.variant === 'string' && item.variant.trim()) return item.variant;
    if (item.size && typeof item.size === 'string' && item.size.trim()) return item.size;
    if (item.sku && typeof item.sku === 'string' && item.sku.trim()) return item.sku;
    if (item.options && Array.isArray(item.options) && item.options.length > 0) {
      const opt = item.options.find((o: any) => o && (o.value || o.name));
      if (opt) return String(opt.value ?? opt.name);
    }
    return '—';
  };

  const showItemsTable = hasItems && (showProductName || showPrice || showSku);

  const orderNotes = (order.receipt_payload as any)?.notes
    || (order.receipt_payload as any)?.remark
    || '';

  const shortStickerCanvas50x30 = (
    <div
      style={{
        width: '50mm',
        height: '30mm',
        maxHeight: '30mm',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        padding: '1.5px 2px',
        backgroundColor: 'white',
        page: 'label-sheet' as any,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '4px',
          width: '100%',
          borderBottom: '1px solid black',
          paddingBottom: '2px',
          marginBottom: '1px',
          flexShrink: 0,
        }}
      >
        <img
          src={storeLogoSrc || '/logo.jpg'}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            objectFit: 'contain',
            flexShrink: 0,
            marginTop: '1px',
          }}
          onError={(e) => {
            const t = e.currentTarget;
            t.onerror = null;
            t.src = '/icon-192.png';
          }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span
            style={{
              fontSize: '5.5px',
              lineHeight: 1.0,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            {storeName}
          </span>
          {storeTagline && (
            <div
              style={{
                fontSize: '5px',
                lineHeight: 1.0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {storeTagline}
            </div>
          )}
          {storeAddress && (
            <div
              style={{
                fontSize: '4.8px',
                lineHeight: 1.0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {storeAddress}
            </div>
          )}
          {storePhone && (
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '4.8px',
                lineHeight: 1.0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {storePhone}
            </div>
          )}
        </div>
      </div>

      {showCustomerAddress && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: (label as any).showCompactItems ? '0 0 auto' : '1',
            width: '100%',
            marginBottom: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: '6.5px',
              padding: '1px 2px',
              border: '1px solid black',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: 'auto',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.9em', flexShrink: 0 }}>
              Name:
            </span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {order.customer_name || '—'}
            </span>
          </div>
          <div
            style={{
              fontSize: '6.5px',
              padding: '1px 2px',
              border: '1px solid black',
              borderTop: 'none',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: 'auto',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, minWidth: 0 }}>
              <span style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.9em', flexShrink: 0 }}>
                Phone No:
              </span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {order.customer_phone || '—'}
              </span>
            </div>
            {((label as any).showCourier !== false) && order.courier_name && (
              <span style={{ flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '45%', fontSize: '5.5px' }}>
                {' '}| {order.courier_name}
              </span>
            )}
          </div>
          <div
            style={(label as any).showCompactItems
              ? { height: 'auto', maxHeight: '18px', minHeight: '14px', fontSize: '4.8px', lineHeight: 1.0, padding: '1px 2px', border: '1px solid black', borderTop: 'none',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word', flexShrink: 0 }
              : { flex: 1, minHeight: '22px', fontSize: '6px', lineHeight: 1.1, padding: '2px', border: '1px solid black', borderTop: 'none',
                  display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }
            }
          >
            <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>Address:</span>{' '}
            <span>{order.customer_address || '—'}</span>
          </div>
        </div>
      )}

      {(label as any).showCompactItems === true && items.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid black',
            borderTop: 'none',
            fontSize: '4.8px',
            lineHeight: 1.0,
            height: 'auto',
            flexShrink: 0,
          }}
        >
          <tbody>
            {items.slice(0, 3).map((item: any, idx: number) => (
              <tr key={`${item.name}-${idx}`} style={{ borderTop: idx > 0 ? '1px solid #d1d5db' : 'none' }}>
                <td
                  style={{
                    borderRight: '1px solid black',
                    padding: '0 1px',
                    width: '8px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {idx + 1}
                </td>
                <td
                  style={{
                    borderRight: '1px solid black',
                    padding: '0 1px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    padding: '0 1px',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    fontWeight: 700,
                  }}
                >
                  {(item.amount || 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1px', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            border: '1px solid black',
            borderTop: (label as any).showCompactItems ? 'none' : '1px solid black',
            fontSize: '4.8px',
            lineHeight: 1.0,
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1px 2px',
            height: 'auto',
          }}
        >
          <div style={{ borderRight: '1px solid black', padding: '0 2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 0 }}>
            Amt: {totalVal.toLocaleString()}
          </div>
          <div style={{ flex: 1, borderRight: '1px solid black', padding: '0 2px', margin: '0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, textAlign: 'center' }}>
            Deli: {deliFeesVal.toLocaleString()}
          </div>
          <div style={{ padding: '0 0 0 2px', marginLeft: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, textAlign: 'right' }}>
            Total: {grandVal.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            fontSize: '5.5px',
            lineHeight: 1.0,
            padding: '1px 2px',
            border: '1px solid black',
            borderTop: (label as any).showCompactItems ? 'none' : '1px solid black',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: 'auto',
          }}
        >
          <span style={{ fontWeight: 600 }}>Remark:</span> {orderNotes || '—'}
        </div>

        <div
          style={{
            fontSize: '5.5px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 'auto',
            paddingTop: '2px',
            lineHeight: 1.0,
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          Invoice No : {order.invoice_id}
        </div>
      </div>
    </div>
  );

  const shortStickerSheet = isShort40x30 ? (
    <div
      id="print-label"
      style={{
        width: '40mm',
        height: '30mm',
        overflow: 'hidden',
        backgroundColor: 'white',
        page: 'label-sheet' as any,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          transform: 'scale(0.82)',
          transformOrigin: 'top left',
          width: '50mm',
          height: '30mm',
        }}
      >
        {shortStickerCanvas50x30}
      </div>
    </div>
  ) : (
    React.cloneElement(shortStickerCanvas50x30, { id: 'print-label' })
  );

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-black/80 px-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold">Print Waybill / Shipping Label</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div className="mb-3 text-xs text-muted-foreground">
          Label size: {widthMm}mm × {heightMm}mm. For 4×6 (100×150mm) or A6, choose the preset in Settings → Hardware &amp; Printers → Label / Sticker Printer.
        </div>
        <div className="flex bg-muted/40 p-6 rounded-xl border border-border/60 overflow-auto"
             style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          {isShortPreset ? (
            <div style={{ transform: 'scale(1)', transformOrigin: 'top left' }} className="border border-black shadow-inner">
              {shortStickerSheet}
            </div>
          ) : (
            <div
              id="print-label"
              className="bg-white border border-black shadow-inner overflow-hidden box-border flex flex-col"
              style={{
                width: '100mm',
                height: '150mm',
                padding: '4mm',
                boxSizing: 'border-box',
                fontFamily: 'Arial, sans-serif',
                fontSize: 10,
                lineHeight: 1.15,
                page: 'label-sheet' as any,
                color: '#000',
                background: '#fff',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2mm' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3mm', borderBottom: '1.5px solid #000', paddingBottom: '2mm' }}>
                  <div style={{ width: '20mm', height: '20mm', borderRadius: '50%', overflow: 'hidden', border: '1px solid #9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#fff' }}>
                    <img
                      src={storeLogoSrc || '/logo.jpg'}
                      alt="Store Logo"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/icon-192.png';
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5mm', minWidth: 0, paddingTop: '1mm' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '0.2mm', textTransform: 'uppercase' }}>{storeName}</div>
                    <div style={{ fontSize: 10, color: '#1f2937', fontWeight: 500 }}>{storeTagline}</div>
                    <div style={{ fontSize: 9, color: '#374151' }}>{storeAddress}</div>
                    <div style={{ fontSize: 9, color: '#111827', fontWeight: 600 }}>Phone: {storePhone}</div>
                  </div>
                </div>

                {/* Invoice Left / Barcode Right */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2mm', padding: '1mm 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5mm', flexShrink: 0 }}>
                    <span style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', color: '#4b5563' }}>Invoice No</span>
                    <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2mm' }}>{order.invoice_id}</span>
                    <span style={{ fontSize: 8, color: '#6b7280' }}>Date: {dateText}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexShrink: 0 }}>
                    <Code128Svg
                      value={order.invoice_id.replace(/[^A-Za-z0-9]/g, '') || 'INV'}
                      heightPx={22}
                      barWidthPx={1}
                      showText
                      fontSizePx={8}
                      quietZonePx={1}
                    />
                  </div>
                </div>

                {/* 3 Stacked Rounded Rectangles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1mm' }}>
                  {/* Name */}
                  <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '2mm 2.5mm', display: 'flex', alignItems: 'center', minHeight: '7mm', background: '#fff' }}>
                    <span style={{ fontWeight: 700, fontSize: 9, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '14mm' }}>Name</span>
                    <span style={{ fontSize: 11, fontWeight: 700, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {order.customer_name || '—'}
                    </span>
                  </div>
                  {/* Phone + Courier */}
                  <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '2mm 2.5mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '7mm', gap: '2mm' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: 9, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '14mm' }}>Phone No</span>
                      <span style={{ fontSize: 11, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.customer_phone || '—'}
                      </span>
                    </div>
                    {(label.showCourier !== false) && order.courier_name && (
                      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, borderLeft: '1px solid #d1d5db', paddingLeft: '2mm', gap: '1mm' }}>
                        <span style={{ fontWeight: 700, fontSize: 9, textTransform: 'uppercase', color: '#374151' }}>Courier</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#059669' }}>{order.courier_name}</span>
                      </div>
                    )}
                  </div>
                  {/* Address */}
                  <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '2mm 2.5mm', display: 'flex', alignItems: 'flex-start', minHeight: '14mm' }}>
                    <span style={{ fontWeight: 700, fontSize: 9, textTransform: 'uppercase', color: '#374151', flexShrink: 0, width: '14mm', paddingTop: '0.5mm' }}>Address</span>
                    <span style={{ fontSize: 10.5, lineHeight: 1.25, flex: 1, color: '#111827', wordBreak: 'break-word' }}>
                      {order.customer_address || '—'}
                    </span>
                  </div>
                </div>

                {/* Table */}
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '5px', overflow: 'hidden', background: '#fff' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '7% 38% 13% 14% 10% 18%', background: '#111827', color: '#fff', fontWeight: 700, fontSize: 9.5, textTransform: 'uppercase' }}>
                    <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #fff', textAlign: 'center' }}>No</div>
                    <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #fff' }}>Description</div>
                    <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #fff', textAlign: 'center' }}>Size</div>
                    <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #fff', textAlign: 'right' }}>Price</div>
                    <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #fff', textAlign: 'center' }}>Qty</div>
                    <div style={{ padding: '1.5mm 1mm', textAlign: 'right' }}>Amount</div>
                  </div>
                  {items.slice(0, 3).map((item: any, idx: number) => (
                    <div key={`item-row-${idx}`} style={{ display: 'grid', gridTemplateColumns: '7% 38% 13% 14% 10% 18%', fontSize: 9.5, background: idx % 2 ? '#f9fafb' : '#fff' }}>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'center', fontWeight: 600 }}>{idx + 1}</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'center' }}>{getItemVariant(item)}</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'right', fontFamily: 'monospace' }}>{(item.price || 0).toLocaleString()}</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'center', fontWeight: 700 }}>{item.qty || 1}</div>
                      <div style={{ padding: '1.5mm 1mm', borderTop: idx > 0 ? '1px solid #e5e7eb' : 'none', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800 }}>{(item.amount || 0).toLocaleString()}</div>
                    </div>
                  ))}
                  {/* Pad to 7 rows total */}
                  {Array.from({ length: Math.max(0, 7 - Math.min(items.length, 3)) }, (_, i) => i + Math.min(items.length, 3) + 1).map((n) => (
                    <div key={`empty-${n}`} style={{ display: 'grid', gridTemplateColumns: '7% 38% 13% 14% 10% 18%', fontSize: 9.5 }}>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#9ca3af' }}>{n}</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb' }}>&nbsp;</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb' }}>&nbsp;</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb' }}>&nbsp;</div>
                      <div style={{ padding: '1.5mm 1mm', borderRight: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb' }}>&nbsp;</div>
                      <div style={{ padding: '1.5mm 1mm', borderTop: '1px solid #e5e7eb' }}>&nbsp;</div>
                    </div>
                  ))}
                </div>

                {/* Bottom Section: Remark + Financial Pills */}
                <div style={{ display: 'flex', gap: '2mm', flex: 1, minHeight: 0 }}>
                  <div style={{
                    flex: 1,
                    border: '1.5px solid #000',
                    borderRadius: '5px',
                    padding: '2mm 2.5mm',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    minHeight: 0,
                  }}>
                    <div style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#111827',
                      marginBottom: '1mm',
                      paddingBottom: '0.8mm',
                      borderBottom: '1px dashed #9ca3af',
                      letterSpacing: '0.1mm',
                    }}>Remark</div>
                    <div style={{ flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.3, minHeight: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                      {orderNotes || '\u00A0'}
                    </div>
                  </div>
                  <div style={{ width: '34mm', display: 'flex', flexDirection: 'column', gap: '1mm', flexShrink: 0 }}>
                    {[
                      { label: 'Total', value: totalVal, weight: 700, border: true },
                      { label: 'Deli Fees', value: deliFeesVal, weight: 600, border: true },
                      { label: 'Advance', value: advanceVal, weight: 600, border: true },
                      { label: 'Balance', value: balanceVal, weight: 800, border: false, highlight: true },
                    ].map((row) => (
                      <div
                        key={row.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1.5mm 2mm',
                          border: row.border ? '1px solid #000' : '1.5px solid #000',
                          borderRadius: '4px',
                          background: row.highlight ? '#fef2f2' : '#fff',
                          gap: '1mm',
                        }}
                      >
                        <span style={{ fontSize: 9, fontWeight: row.weight, textTransform: 'uppercase', color: row.highlight ? '#991b1b' : '#111827', letterSpacing: '0.1mm' }}>
                          {row.label}
                        </span>
                        <span style={{
                          fontSize: 11,
                          fontWeight: row.weight,
                          fontFamily: 'monospace',
                          color: row.highlight ? '#991b1b' : '#111827',
                          whiteSpace: 'nowrap',
                        }}>
                          {row.value.toLocaleString()} Ks
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 11,
                  color: '#be185d',
                  padding: '1mm 0 0 0',
                  borderTop: '1.5px solid #000',
                  letterSpacing: '0.2mm',
                }}>
                  ♥ Thank you for shopping with us ♥
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DeliverySalesLogPage() {
  const t = useT();
  const { role } = useDashboardAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [selectedCourier, setSelectedCourier] = React.useState<string>('all');
  const [receiptOpen, setReceiptOpen] = React.useState(false);
  const [selectedReceipt, setSelectedReceipt] = React.useState<ReceiptPayload | null>(null);
  const [waybillOpen, setWaybillOpen] = React.useState(false);
  const [selectedWaybill, setSelectedWaybill] = React.useState<Order | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [editCustomerName, setEditCustomerName] = React.useState('');
  const [editCustomerPhone, setEditCustomerPhone] = React.useState('');
  const [editCustomerAddress, setEditCustomerAddress] = React.useState('');
  const [editCourierName, setEditCourierName] = React.useState('');
  const [editDeliveryFee, setEditDeliveryFee] = React.useState('');
  const [editPaymentMethod, setEditPaymentMethod] = React.useState('');
  const [savingEdit, setSavingEdit] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Order | null>(null);
  const [query, setQuery] = React.useState('');
  const [monthFilter, setMonthFilter] = React.useState('');
  const [exporting, setExporting] = React.useState(false);
  const [toasts, setToasts] = React.useState<{ id: number; type: 'success' | 'error'; message: string }[]>([]);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('sale_type', 'Delivery')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (role === 'admin') {
      fetchOrders();
    }
  }, [role, fetchOrders]);

  const togglePaymentStatus = async (orderId: string, currentStatus: string) => {
    setUpdatingId(orderId);
    const newStatus = currentStatus === 'Confirmed' ? 'Check' : 'Confirmed';
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, payment_status: newStatus as any } : o))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const monthFilteredOrders = React.useMemo(() => {
    if (!monthFilter) return orders;
    const [yearText, monthText] = monthFilter.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    if (!year || !month) return orders;
    return orders.filter((order) => {
      const date = new Date(order.created_at);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  }, [orders, monthFilter]);

  const courierFilteredOrders = React.useMemo(() => {
    if (selectedCourier === 'all') return monthFilteredOrders;
    return monthFilteredOrders.filter((order) => (order.courier_name || 'Unknown') === selectedCourier);
  }, [monthFilteredOrders, selectedCourier]);

  const filteredOrders = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = courierFilteredOrders;
    if (!q) return base;
    return base.filter((order) => {
      const invoice = (order.invoice_id ?? '').toLowerCase();
      const customer = (order.customer_name ?? '').toLowerCase();
      const phone = (order.customer_phone ?? '').toLowerCase();
      const courier = (order.courier_name ?? '').toLowerCase();
      const payment = (order.payment_method ?? '').toLowerCase();
      return (
        invoice.includes(q) ||
        customer.includes(q) ||
        phone.includes(q) ||
        courier.includes(q) ||
        payment.includes(q)
      );
    });
  }, [courierFilteredOrders, query]);

  const groupedOrders = React.useMemo(() => {
    const dateMap = new Map<string, Map<string, Order[]>>();
    filteredOrders.forEach((order) => {
      const dateKey = formatDateDDMMYYYY(order.created_at);
      const courierKey = order.courier_name || 'Unknown';
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, new Map());
      }
      const courierMap = dateMap.get(dateKey)!;
      if (!courierMap.has(courierKey)) {
        courierMap.set(courierKey, []);
      }
      courierMap.get(courierKey)!.push(order);
    });
    const entries = Array.from(dateMap.entries());
    entries.sort((a, b) => {
      const timeA = Date.parse(a[1].values().next().value?.[0]?.created_at ?? '');
      const timeB = Date.parse(b[1].values().next().value?.[0]?.created_at ?? '');
      return timeB - timeA;
    });
    return entries;
  }, [filteredOrders]);

  const buildItemSummary = (order: Order) => {
    const items = order.receipt_payload?.items ?? [];
    if (!items.length) return '—';
    return items.map((item) => `${item.name} x${item.qty}`).join(', ');
  };

  const getStatusLabel = (status: string | null) =>
    status === 'Confirmed' ? t('statusConfirmed') : t('statusCheck');

  const addToast = React.useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const handleExportExcel = React.useCallback(async () => {
    setExporting(true);
    try {
      const allDates = filteredOrders.map((order) => new Date(order.created_at).getTime()).sort((a, b) => b - a);
      const latest = allDates[0];
      const oldest = allDates[allDates.length - 1];
      const dateRange = latest ? formatDateRangeDDMMYYYY(new Date(latest), new Date(oldest)) : '—';
      const totalSales = filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      const totalFees = filteredOrders.reduce((sum, order) => sum + Number(order.delivery_fee || 0), 0);

      const rows: SalesExportRow[] = [];
      let serial = 1;
      groupedOrders.forEach(([dateKey, courierMap]) => {
        rows.push({
          kind: 'group',
          cells: ['', dateKey, '', '', '', '', '', '', ''],
        });
        Array.from(courierMap.entries()).forEach(([courierName, courierOrders]) => {
          const totalFee = courierOrders.reduce((sum, o) => sum + Number(o.delivery_fee || 0), 0);
          rows.push({
            kind: 'subgroup',
            cells: ['', '', '', '', courierName, totalFee, t('subtotal'), '', ''],
          });
          courierOrders.forEach((order) => {
            const deliveryFee = Number(order.delivery_fee || 0);
            rows.push({
              kind: 'data',
              cells: [
                serial++,
                dateKey,
                order.invoice_id ?? '',
                order.customer_name ?? '',
                order.courier_name ?? '',
                deliveryFee,
                buildItemSummary(order),
                (order.total_amount || 0) + deliveryFee,
                getStatusLabel(order.payment_status ?? ''),
              ],
            });
          });
        });
      });

      await downloadSalesXlsx({
        filename: 'delivery-sales-log.xlsx',
        title: t('deliverySalesLogTitle'),
        summaryRows: [
          [t('dateRange'), dateRange],
          [t('totalSales'), totalSales],
          [t('totalFees'), totalFees],
        ],
        columns: [
          t('number'),
          t('date'),
          t('invoice'),
          t('customer'),
          t('courier'),
          t('deliveryFee'),
          t('itemsSummary'),
          t('totalAmount'),
          t('status'),
        ],
        rows,
      });
      addToast('success', t('exportSuccess'));
    } catch {
      addToast('error', t('exportError'));
    } finally {
      setExporting(false);
    }
  }, [filteredOrders, groupedOrders, t, addToast]);

  const periodSummary = React.useMemo(() => {
    const summary: Record<string, { methods: Record<string, number>; fees: number }> = {};
    courierFilteredOrders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? formatDateDDMMYYYY(date)
          : viewMode === 'monthly'
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            : `${date.getFullYear()}`;
      const method = order.payment_method || 'Unknown';
      const deliveryFee = Number(order.delivery_fee || 0);
      const collected = (order.total_amount || 0) + deliveryFee;
      if (!summary[key]) {
        summary[key] = { methods: {}, fees: 0 };
      }
      summary[key].methods[method] = (summary[key].methods[method] || 0) + collected;
      summary[key].fees += deliveryFee;
    });
    return summary;
  }, [courierFilteredOrders, viewMode]);

  const courierPeriodTotals = React.useMemo(() => {
    const totals: Record<string, Record<string, number>> = {};
    courierFilteredOrders.forEach((order) => {
      const date = new Date(order.created_at);
      const key =
        viewMode === 'daily'
          ? formatDateDDMMYYYY(date)
          : viewMode === 'monthly'
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            : `${date.getFullYear()}`;
      const courier = order.courier_name || 'Unknown';
      totals[key] = totals[key] || {};
      totals[key][courier] = (totals[key][courier] || 0) + Number(order.delivery_fee || 0);
    });
    return totals;
  }, [courierFilteredOrders, viewMode]);

  const courierOptions = React.useMemo(() => {
    const set = new Set<string>();
    orders.forEach((order) => {
      set.add(order.courier_name || 'Unknown');
    });
    return Array.from(set).sort();
  }, [orders]);

  const openReceipt = (order: Order) => {
    setSelectedReceipt(order.receipt_payload ?? null);
    setReceiptOpen(true);
  };

  const openEdit = (order: Order) => {
    setEditingOrder(order);
    setEditCustomerName(order.customer_name || '');
    setEditCustomerPhone(order.customer_phone || '');
    setEditCustomerAddress(order.customer_address || '');
    setEditCourierName(order.courier_name || '');
    setEditDeliveryFee(order.delivery_fee != null ? String(order.delivery_fee) : '');
    setEditPaymentMethod(order.payment_method || '');
    setEditOpen(true);
  };

  const saveEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingOrder) return;
    setSavingEdit(true);
    const res = await fetch(`/api/orders/${editingOrder.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: editCustomerName.trim() || null,
        customer_phone: editCustomerPhone.trim() || null,
        customer_address: editCustomerAddress.trim() || null,
        courier_name: editCourierName.trim() || null,
        delivery_fee: editDeliveryFee.trim() ? Number(editDeliveryFee) : 0,
        payment_method: editPaymentMethod.trim() || null,
      }),
    });
    if (res.ok) {
      fetchOrders();
      setEditOpen(false);
    }
    setSavingEdit(false);
  };

  const deleteOrder = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    const res = await fetch(`/api/orders/${deleteTarget.id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchOrders();
    }
    setDeletingId(null);
    setDeleteTarget(null);
  };

  if (role !== 'admin') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          {t('deliverySalesLogTitle')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('accessRestricted')} {t('salesAdminOnly')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          {t('deliverySalesLogTitle')}
        </h1>
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchDeliveryPlaceholder')}
            className="h-9 w-64"
          />
          <Input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="h-9 w-40"
            placeholder={t('monthFilter')}
          />
          <Button
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={handleExportExcel}
            disabled={loading || exporting}
          >
            {t('downloadExcel')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('refresh')}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t('summary')}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
              className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs"
            >
              <option value="all">{t('allCouriers')}</option>
              {courierOptions.map((courier) => (
                <option key={courier} value={courier}>{courier}</option>
              ))}
            </select>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as typeof viewMode)}
              className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs"
            >
              <option value="daily">{t('daily')}</option>
              <option value="monthly">{t('monthly')}</option>
              <option value="yearly">{t('yearly')}</option>
            </select>
          </div>
        </div>
        {Object.keys(periodSummary).length === 0 && (
          <div className="text-xs text-muted-foreground">{t('noSummary')}</div>
        )}
        {Object.entries(periodSummary).map(([date, summary]) => {
          const totalCollected = Object.values(summary.methods).reduce((a, b) => a + b, 0);
          const netSale = totalCollected - summary.fees;
          const courierTotals = courierPeriodTotals[date] ?? {};
          return (
            <div key={date} className="space-y-2">
              <div className="text-base font-semibold">{date}</div>
              <div className="grid gap-2 md:grid-cols-4">
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('collected')}</div>
                  <div className="text-sm font-semibold">{totalCollected.toLocaleString()} Ks</div>
                </div>
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('netSale')}</div>
                  <div className="text-sm font-semibold">{netSale.toLocaleString()} Ks</div>
                </div>
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('courierFees')}</div>
                  <div className="text-sm font-semibold">{summary.fees.toLocaleString()} Ks</div>
                </div>
                <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('couriers')}</div>
                  <div className="text-xs font-semibold">
                    {Object.keys(courierTotals).length === 0
                      ? '—'
                      : Object.entries(courierTotals)
                          .map(([courier, total]) => `${courier}: ${total.toLocaleString()} Ks`)
                          .join(' • ')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && orders.length === 0 ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full table-fixed text-sm text-left">
              <thead className="sticky top-0 z-10 bg-background/90 backdrop-blur text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-2 py-2">{t('date')}</th>
                  <th className="px-2 py-2">{t('invoice')}</th>
                  <th className="px-2 py-2 hidden lg:table-cell">{t('customer')}</th>
                  <th className="px-2 py-2">{t('courier')}</th>
                  <th className="px-2 py-2 text-right">{t('deliveryFee')}</th>
                  <th className="px-2 py-2">{t('paymentMethod')}</th>
                  <th className="px-2 py-2 text-right">{t('collected')}</th>
                  <th className="px-2 py-2 text-center hidden lg:table-cell">{t('status')}</th>
                  <th className="px-2 py-2 text-right">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {groupedOrders.map(([dateKey, courierMap]) => (
                  <React.Fragment key={dateKey}>
                    <tr className="sticky top-8 z-10 bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                      <td colSpan={9} className="px-2 py-2 text-xs font-bold">
                        {dateKey}
                      </td>
                    </tr>
                    {Array.from(courierMap.entries()).map(([courierName, courierOrders]) => {
                      const totalFee = courierOrders.reduce((sum, o) => sum + Number(o.delivery_fee || 0), 0);
                      return (
                        <React.Fragment key={`${dateKey}-${courierName}`}>
                          <tr className="bg-secondary/30 text-muted-foreground">
                            <td colSpan={9} className="px-2 py-2 text-xs font-semibold">
                              {courierName} • {courierOrders.length} {t('ordersLabel')} • {t('feesLabel')} {totalFee.toLocaleString()} Ks
                            </td>
                          </tr>
                          {courierOrders.map((order) => {
                            const isConfirmed = order.payment_status === 'Confirmed';
                            const deliveryFee = Number(order.delivery_fee || 0);
                            const collected = (order.total_amount || 0) + deliveryFee;
                            return (
                              <tr
                                key={order.id}
                                className="hover:bg-secondary/20 transition-colors cursor-pointer"
                                onClick={() => openReceipt(order)}
                              >
                                <td className="px-2 py-2 text-xs whitespace-normal md:whitespace-nowrap text-muted-foreground">
                                  {dateKey}
                                </td>
                                <td className="px-2 py-2 text-xs font-mono font-medium break-words">
                                  <span className="underline decoration-dotted underline-offset-4">
                                    {order.invoice_id}
                                  </span>
                                </td>
                                <td className="px-2 py-2 text-xs hidden lg:table-cell">
                                  {order.customer_name || '—'}
                                </td>
                                <td className="px-2 py-2 text-xs">
                                  {order.courier_name || '—'}
                                </td>
                                <td className="px-2 py-2 text-right text-xs font-semibold">
                                  {deliveryFee.toLocaleString()} Ks
                                </td>
                                <td className="px-2 py-2 text-lg font-semibold break-words">
                                  {order.payment_method || '—'}
                                </td>
                                <td className="px-2 py-2 text-right text-2xl font-bold">
                                  {collected.toLocaleString()} Ks
                                </td>
                                <td className="px-2 py-2 text-center hidden lg:table-cell">
                                  <Button
                                    variant={isConfirmed ? 'ghost' : 'outline'}
                                    size="sm"
                                    className={`h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm gap-1.5 ${isConfirmed ? 'text-emerald-400 hover:text-emerald-300' : 'text-amber-400 hover:text-amber-300'}`}
                                    onClick={() => togglePaymentStatus(order.id, order.payment_status)}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    disabled={updatingId === order.id}
                                  >
                                    {updatingId === order.id ? (
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                    ) : isConfirmed ? (
                                      <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                      <AlertCircle className="h-4 w-4" />
                                    )}
                                    {getStatusLabel(order.payment_status)}
                                  </Button>
                                </td>
                                <td className="px-2 py-2 text-right">
                                  <div className="flex justify-end gap-2 flex-wrap">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                                      onClick={() => openEdit(order)}
                                      onPointerDown={(e) => e.stopPropagation()}
                                    >
                                      {t('edit')}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-indigo-500/70 text-indigo-600 hover:bg-indigo-500/10 dark:border-indigo-400/70 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedWaybill(order);
                                        setWaybillOpen(true);
                                      }}
                                      onPointerDown={(e) => e.stopPropagation()}
                                    >
                                      Waybill
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2 text-xs md:h-8 md:px-3 md:text-sm border-rose-400/70 text-rose-400 hover:bg-rose-500/10"
                                      disabled={deletingId === order.id}
                                      onClick={() => setDeleteTarget(order)}
                                      onPointerDown={(e) => e.stopPropagation()}
                                    >
                                      {deletingId === order.id ? t('deleting') : t('delete')}
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              {t('noDeliveryRecords')}
            </div>
          )}
        </div>
      )}
      <ReceiptModal open={receiptOpen} receipt={selectedReceipt} onClose={() => setReceiptOpen(false)} />
      <WaybillModal open={waybillOpen} order={selectedWaybill} onClose={() => setWaybillOpen(false)} />
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('deleteSaleRecordTitle')}
        description={`${t('deleteSaleRecordDesc')} ${deleteTarget?.invoice_id ? `"${deleteTarget.invoice_id}"` : ''}`}
        confirmLabel={t('delete')}
        onConfirm={deleteOrder}
        onCancel={() => setDeleteTarget(null)}
        confirmVariant="destructive"
        loading={deleteTarget ? deletingId === deleteTarget.id : false}
      />
      {editOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-lg border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">{t('editDeliveryTitle')}</div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={() => setEditOpen(false)}
              >
                {t('close')}
              </Button>
            </div>
            <form className="grid gap-3 text-xs md:grid-cols-2" onSubmit={saveEdit}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('customerName')}</label>
                <Input value={editCustomerName} onChange={(e) => setEditCustomerName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('phone')}</label>
                <Input value={editCustomerPhone} onChange={(e) => setEditCustomerPhone(e.target.value)} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">{t('address')}</label>
                <Input value={editCustomerAddress} onChange={(e) => setEditCustomerAddress(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('courier')}</label>
                <Input value={editCourierName} onChange={(e) => setEditCourierName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t('deliveryFee')}</label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={editDeliveryFee}
                  onChange={(e) => setEditDeliveryFee(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold">{t('paymentMethod')}</label>
                <Input value={editPaymentMethod} onChange={(e) => setEditPaymentMethod(e.target.value)} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setEditOpen(false)}
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" disabled={savingEdit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {savingEdit ? t('saving') : t('save')}
                </Button>
              </div>
            </form>
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
    </div>
  );
}
