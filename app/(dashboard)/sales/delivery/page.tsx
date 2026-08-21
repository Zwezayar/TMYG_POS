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
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '2px 3px',
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
        }}
      >
        <img
          src="/logo.jpg"
          style={{
            width: '14px',
            height: '14px',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              style={{
                fontSize: '5.5px',
                lineHeight: 1.0,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '65%',
              }}
            >
              {storeName}
            </span>
            <span
              style={{
                fontSize: '5.5px',
                lineHeight: 1.0,
                textAlign: 'right',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>Invoice No:</span>{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{order.invoice_id}</span>
            </span>
          </div>
          {storeTagline && (
            <div
              style={{
                fontSize: '5.5px',
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
                fontSize: '5.5px',
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
                fontSize: '5.5px',
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
            width: '100%',
            margin: 0,
          }}
        >
          <div
            style={{
              fontSize: '6px',
              padding: '1px 2px',
              border: '1px solid black',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: 0,
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
              fontSize: '6px',
              padding: '1px 2px',
              border: '1px solid black',
              borderTop: 'none',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.9em', flexShrink: 0 }}>
              Phone No:
            </span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {order.customer_phone || '—'}
            </span>
          </div>
          <div
            style={{
              fontSize: '5.5px',
              padding: '1px 2px',
              border: '1px solid black',
              borderTop: 'none',
              lineHeight: 1.0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>Address:</span>{' '}
            <span>{order.customer_address || '—'}</span>
          </div>
        </div>
      )}

      {(label as any).showCompactItems === true && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid black',
            borderTop: 'none',
            fontSize: '5px',
            lineHeight: 1.0,
            minHeight: 0,
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  borderRight: '1px solid black',
                  padding: '1px 2px',
                  width: '8px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                No
              </td>
              <td
                style={{
                  borderRight: '1px solid black',
                  padding: '1px 2px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Description
              </td>
              <td
                style={{
                  padding: '1px 2px',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                Amount
              </td>
            </tr>
            <tr style={{ borderTop: '1px solid black' }}>
              <td
                style={{
                  borderRight: '1px solid black',
                  padding: '1px 2px',
                }}
              >
                1
              </td>
              <td
                style={{
                  borderRight: '1px solid black',
                  padding: '1px 2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Sample Product
              </td>
              <td
                style={{
                  padding: '1px 2px',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                0 Ks
              </td>
            </tr>
            <tr style={{ borderTop: '1px solid black' }}>
              <td
                style={{
                  borderRight: '1px solid black',
                  padding: '1px 2px',
                }}
              >
                2
              </td>
              <td
                style={{
                  borderRight: '1px solid black',
                  padding: '1px 2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Sample Product 2
              </td>
              <td
                style={{
                  padding: '1px 2px',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                0 Ks
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {showPrice && (
        <div
          style={{
            display: 'flex',
            width: '100%',
            border: '1px solid black',
            borderTop: 'none',
            fontSize: '5.5px',
            lineHeight: 1.0,
            alignItems: 'center',
            minHeight: 0,
          }}
        >
          <div
            style={{
              width: '45px',
              borderRight: '1px solid black',
              padding: '1px 2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flexShrink: 0,
            }}
          >
            <span style={{ fontWeight: 600 }}>Amount:</span>{' '}
            <span style={{ fontWeight: 'bold' }}>{totalVal.toLocaleString()} Ks</span>
          </div>
          <div
            style={{
              flex: 1,
              borderRight: '1px solid black',
              padding: '1px 2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0,
            }}
          >
            <span style={{ fontWeight: 600 }}>Deli Fees:</span>{' '}
            <span>{deliFeesVal.toLocaleString()} Ks</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: '1px 2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
              minWidth: 0,
            }}
          >
            <span>Total:</span> {grandVal.toLocaleString()} Ks
          </div>
        </div>
      )}

      <div
        style={{
          fontSize: '5.5px',
          lineHeight: 1.0,
          padding: '1px 2px',
          border: '1px solid black',
          borderTop: 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: 0,
        }}
      >
        <span style={{ fontWeight: 600 }}>Remark:</span> —
      </div>

      {showBarcode && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '14px',
            overflow: 'hidden',
            margin: 0,
            minHeight: 0,
          }}
        >
          <Code128Svg
            value={order.invoice_id}
            heightPx={12}
            barWidthPx={0.6}
            showText={false}
            quietZonePx={0.5}
          />
        </div>
      )}

      <div
        style={{
          fontSize: '5px',
          lineHeight: 1.0,
          textAlign: 'center',
          width: '100%',
          marginTop: 'auto',
          paddingTop: '1px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Thanks for choosing us. See you again!
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
        <div className="flex justify-center bg-muted/40 p-6 rounded-xl border border-border/60 overflow-auto">
          {isShortPreset ? (
            <div className="border border-black shadow-inner">
              {shortStickerSheet}
            </div>
          ) : (
            <div
              id="print-label"
              className="bg-white border border-black shadow-inner overflow-hidden box-border flex flex-col"
              style={{
                width: `${widthMm}mm`,
                height: `${heightMm}mm`,
                padding: '2mm',
                fontFamily: label.fontFamily,
                fontSize: `${label.fontSizePx}px`,
                lineHeight: 1.2,
                page: 'label-sheet' as any,
              }}
            >
              <div className="w-full h-full flex flex-col gap-[1.5mm]">
                {label.showCourier && (
                  <div className="w-full border-2 border-black font-extrabold uppercase text-center py-[1mm] px-[1mm] break-words leading-tight tracking-wider">
                    {order.courier_name || 'COURIER'}
                  </div>
                )}

                <div className="flex items-start justify-between gap-[2mm] pb-[1mm] border-b-2 border-black">
                  <div className="flex-shrink-0 w-[10mm] h-[10mm] rounded-md border-2 border-black bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src="/logo.jpg"
                      alt="logo"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/icon-192.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <div className="font-extrabold leading-tight break-words text-[1.1em]">{storeName}</div>
                    <div className="text-[0.85em] text-black/70 break-words leading-tight">{storeTagline}</div>
                    <div className="text-[0.8em] font-mono break-words">Tel: {storePhone}</div>
                  </div>
                </div>

                <div className="w-full border border-black px-[1.5mm] py-[1mm] flex items-center justify-between gap-[1mm]">
                  <span style={{ fontSize: '0.75em', textTransform: 'uppercase', fontWeight: 600 }}>Invoice No:</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{order.invoice_id}</span>
                </div>

                <div className="grid grid-cols-2 gap-[1mm]">
                  <div className="break-words">
                    <div className="text-[0.7em] uppercase font-bold tracking-wider text-black/60">Name</div>
                    <div className="font-semibold leading-tight">{order.customer_name || '—'}</div>
                  </div>
                  <div className="break-words">
                    <div className="text-[0.7em] uppercase font-bold tracking-wider text-black/60">Phone No</div>
                    <div className="font-mono leading-tight">{order.customer_phone || '—'}</div>
                  </div>
                  {showCustomerAddress && (
                    <div className="col-span-2 break-words">
                      <div className="text-[0.7em] uppercase font-bold tracking-wider text-black/60">Address</div>
                      <div className="leading-snug whitespace-pre-wrap">{order.customer_address || '—'}</div>
                    </div>
                  )}
                  <div className="col-span-2 break-words">
                    <div className="text-[0.7em] uppercase font-bold tracking-wider text-black/60">Date</div>
                    <div className="font-semibold leading-tight">{dateText}</div>
                  </div>
                </div>

                {showItemsTable && (
                  <div className="w-full border border-black overflow-hidden">
                    <table className="w-full border-collapse text-[0.9em]">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="border-r border-white/30 px-[0.8mm] py-[0.5mm] text-left font-bold text-[0.8em]">No</th>
                          {showProductName && (
                            <th className="border-r border-white/30 px-[0.8mm] py-[0.5mm] text-left font-bold text-[0.8em]">Description</th>
                          )}
                          {showSku && (
                            <th className="border-r border-white/30 px-[0.8mm] py-[0.5mm] text-left font-bold text-[0.8em]">Size</th>
                          )}
                          {showPrice && (
                            <th className="border-r border-white/30 px-[0.8mm] py-[0.5mm] text-right font-bold text-[0.8em]">Price</th>
                          )}
                          {showPrice && (
                            <th className="px-[0.8mm] py-[0.5mm] text-right font-bold text-[0.8em]">Amount</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={`${item.name}-${idx}`} className="border-t border-black/30">
                            <td className="border-r border-black/30 px-[0.8mm] py-[0.4mm] align-top">{idx + 1}</td>
                            {showProductName && (
                              <td className="border-r border-black/30 px-[0.8mm] py-[0.4mm] align-top break-words leading-tight">
                                {item.name}
                                {item.qty > 1 && <span className="text-[0.85em]"> × {item.qty}</span>}
                              </td>
                            )}
                            {showSku && (
                              <td className="border-r border-black/30 px-[0.8mm] py-[0.4mm] align-top leading-tight">
                                {getItemVariant(item)}
                              </td>
                            )}
                            {showPrice && (
                              <td className="border-r border-black/30 px-[0.8mm] py-[0.4mm] align-top text-right tabular-nums">
                                {item.price.toLocaleString()}
                              </td>
                            )}
                            {showPrice && (
                              <td className="px-[0.8mm] py-[0.4mm] align-top text-right tabular-nums font-semibold">
                                {item.amount.toLocaleString()}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex gap-[1.5mm] flex-1 min-h-0">
                  <div className="flex-1 border-2 border-dashed border-black/70 p-[1.2mm] min-w-0 flex flex-col">
                    <div className="text-[0.75em] uppercase font-bold tracking-wider text-black/70 mb-[0.3mm]">Remark</div>
                    <div className="flex-1 text-[0.9em] break-words whitespace-pre-wrap leading-snug"></div>
                  </div>
                  <div className="w-[40%] min-w-[30mm] border border-black overflow-hidden">
                    <table className="w-full border-collapse text-[0.9em]">
                      <tbody>
                        <tr className="border-b border-black/30">
                          <td className="px-[0.8mm] py-[0.4mm] font-semibold text-black/70 border-r border-black/30">Total</td>
                          <td className="px-[0.8mm] py-[0.4mm] text-right tabular-nums font-bold">{totalVal.toLocaleString()} Ks</td>
                        </tr>
                        <tr className="border-b border-black/30">
                          <td className="px-[0.8mm] py-[0.4mm] font-semibold text-black/70 border-r border-black/30">Deli Fees</td>
                          <td className="px-[0.8mm] py-[0.4mm] text-right tabular-nums font-semibold">{deliFeesVal.toLocaleString()} Ks</td>
                        </tr>
                        <tr className="border-b border-black/30">
                          <td className="px-[0.8mm] py-[0.4mm] font-semibold text-black/70 border-r border-black/30">Advance</td>
                          <td className="px-[0.8mm] py-[0.4mm] text-right tabular-nums">{advanceVal.toLocaleString()} Ks</td>
                        </tr>
                        <tr className="bg-black/5">
                          <td className="px-[0.8mm] py-[0.5mm] font-extrabold uppercase border-r border-black/30">Balance</td>
                          <td className="px-[0.8mm] py-[0.5mm] text-right tabular-nums font-extrabold">{balanceVal.toLocaleString()} Ks</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {showBarcode && (
                  <div className="flex items-center justify-center py-[0.5mm]">
                    <Code128Svg
                      value={order.invoice_id}
                      heightPx={Math.max(16, label.barcodeHeightPx)}
                      barWidthPx={1}
                      showText={true}
                      fontSizePx={Math.max(8, Math.round(label.fontSizePx * 0.85))}
                    />
                  </div>
                )}

                <div className="pt-[0.5mm] text-center text-[0.9em] font-semibold border-t border-dashed border-black/40">
                  ❤ Thank you for shopping with us ❤
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
