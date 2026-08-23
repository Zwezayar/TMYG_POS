'use client';

import * as React from 'react';
import { Code128Svg } from '@/components/ui/code128-svg';
import { useHWPrintSettings } from '@/components/hw-print-settings-provider';
import type { ReceiptPayload } from '@/components/receipt-modal';

interface PrintReceiptTemplateProps {
  receipt: ReceiptPayload | null | undefined;
}

export function PrintReceiptTemplate({ receipt }: PrintReceiptTemplateProps) {
  const { settings } = useHWPrintSettings();
  if (!receipt) return null;
  const subtotal =
    receipt.subtotal ?? receipt.items.reduce((s, it) => s + it.amount, 0);
  const deliveryFee = receipt.deliveryFee ?? 0;
  const discount = receipt.discount ?? 0;
  const grandTotal = receipt.grandTotal ?? subtotal + deliveryFee - discount;
  const amountReceived = receipt.amountReceived ?? grandTotal;
  const changeAmount = (receipt as any).changeAmount ?? amountReceived - grandTotal;
  const amountDue = (receipt as any).amountDue ?? 0;

  const storeName = settings.receipt.storeName?.trim() || 'THE MORE YOU GLOW BY INGYIN';
  const storeTagline = settings.receipt.storeTagline?.trim() || '';
  const storeAddress = settings.receipt.storeAddress?.trim() || '';
  const storePhone = settings.receipt.storePhone?.trim() || '';
  const storeSocial = settings.receipt.storeSocial?.trim() || '';
  const footerText = settings.receipt.footerText?.trim() || '';
  const storeLogoSrc: string | null = settings.receipt.logoUrl || settings.receipt.storeLogo || null;
  const logoShow = !!settings.receipt.showLogo;
  const logoSizePx = Math.max(10, Math.min(40, Number(settings.receipt.logoSizePx) || 20));
  const logoAlign = (['left','center','right'].includes(settings.receipt.logoAlignment as any)
    ? settings.receipt.logoAlignment
    : 'center') as 'left' | 'center' | 'right';
  const logoMonochrome = !!settings.receipt.monochromeLogo;

  const hasStoreTagline = !!storeTagline;
  const hasStoreAddress = !!storeAddress;
  const hasStorePhone = !!storePhone;
  const hasStoreSocial = !!storeSocial;
  const hasFooterText = !!footerText;
  const { showBarcode } = settings.receipt;

  return (
    <div id="print-receipt">
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          borderBottom: '1px solid rgba(0,0,0,0.65)',
          paddingBottom: '2px',
          marginBottom: '4px',
          lineHeight: 1.1,
        }}
      >
        {logoShow && (
          <div
            style={{
              width: `${logoSizePx + 4}px`,
              height: `${logoSizePx + 4}px`,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #000000',
              background: '#ffffff',
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <img
              src={storeLogoSrc || '/logo.jpg'}
              alt="logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '1.5px',
                boxSizing: 'border-box',
                filter: logoMonochrome ? 'grayscale(100%) contrast(200%)' : 'none',
                display: 'block',
                margin: '0 auto',
              }}
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/icon-192.png';
              }}
            />
          </div>
        )}
        {!logoShow && (
          <img
            src="/logo.jpg"
            alt="logo"
            style={{
              width: '18px',
              height: '17px',
              borderRadius: '50%',
              objectFit: 'contain',
              flexShrink: 0,
            }}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = '/icon-192.png';
            }}
          />
        )}
        <div style={{ flex: 1, fontSize: '6.5px', lineHeight: 1.1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 4 }}>
            <div className="receipt-title" style={{ lineHeight: 1.05, margin: 0, padding: 0, fontSize: '10.5px' }}>
              {storeName}
            </div>
            <div style={{ lineHeight: 1.05, fontWeight: 700, fontFamily: 'monospace', fontSize: '6.5px' }}>
              {receipt.invoiceId || '—'}
            </div>
          </div>
          {hasStoreTagline && (
            <div className="receipt-center" style={{ fontSize: '0.85em', lineHeight: 1.05, margin: 0, textAlign: 'left' }}>
              {storeTagline}
            </div>
          )}
          {hasStoreAddress && <div style={{ lineHeight: 1.05, fontSize: '6px' }}>{storeAddress}</div>}
          {hasStorePhone && <div style={{ lineHeight: 1.05, fontSize: '6px', fontFamily: 'monospace' }}>Tel: {storePhone}</div>}
          {hasStoreSocial && <div style={{ lineHeight: 1.05, fontSize: '6px' }}>{storeSocial}</div>}
        </div>
      </div>
      <div className="receipt-row">
        <span style={{ fontSize: '0.8em', textTransform: 'uppercase', fontWeight: 600, lineHeight: 1.05 }}>Invoice No:</span>
        <span style={{ fontWeight: 'bold', fontFamily: 'monospace', lineHeight: 1.05 }}>{receipt.invoiceId || '—'}</span>
      </div>
      <div className="receipt-row">
        <span>Date</span>
        <span>{receipt.date}</span>
      </div>
      <div className="receipt-row">
        <span>Time</span>
        <span>{receipt.time}</span>
      </div>
      <div className="receipt-row">
        <span>Cashier</span>
        <span>{receipt.cashierRole || 'Staff'}</span>
      </div>
      {receipt.staffName ? (
        <div className="receipt-row">
          <span>Cashier Name</span>
          <span>{receipt.staffName}</span>
        </div>
      ) : null}
      {receipt.saleType === 'Delivery' && (
        <>
          <div className="divider" />
          <div className="receipt-row">
            <span>Customer Name</span>
            <span>{receipt.customerName || '—'}</span>
          </div>
          <div className="receipt-row">
            <span>Phone</span>
            <span>{receipt.customerPhone || '—'}</span>
          </div>
          <div className="receipt-row">
            <span>Address</span>
            <span style={{ maxWidth: '60%', wordBreak: 'break-word', textAlign: 'right' }}>
              {receipt.customerAddress || '—'}
            </span>
          </div>
        </>
      )}
      <div className="divider" />
      <table>
        <thead>
          <tr>
            <th align="left">Item</th>
            <th align="right">Qty</th>
            <th align="right">Price</th>
            <th align="right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {receipt.items.map((item, idx) => (
            <tr key={`${item.name}-${idx}`}>
              <td className="receipt-item">{item.name}</td>
              <td align="right">{item.qty}</td>
              <td align="right">{item.price.toLocaleString()}</td>
              <td align="right" className="receipt-amount">
                {item.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="divider" />
      <div className="receipt-row">
        <span>Subtotal</span>
        <span>{subtotal.toLocaleString()} Ks</span>
      </div>
      {receipt.saleType === 'Delivery' ? (
        <div className="receipt-row">
          <span>Delivery Fee (+)</span>
          <span>{deliveryFee.toLocaleString()} Ks</span>
        </div>
      ) : null}
      <div className="receipt-row">
        <span>Discount (-)</span>
        <span>{discount.toLocaleString()} Ks</span>
      </div>
      <div className="receipt-row">
        <strong>Grand Total</strong>
        <strong>{grandTotal.toLocaleString()} Ks</strong>
      </div>
      <div className="receipt-row">
        <span>Cash Received</span>
        <span>{amountReceived.toLocaleString()} Ks</span>
      </div>
      {amountDue > 0 ? (
        <div className="receipt-row">
          <span>Amount Due</span>
          <span>{amountDue.toLocaleString()} Ks</span>
        </div>
      ) : (
        <div className="receipt-row">
          <span>Change</span>
          <span>{changeAmount.toLocaleString()} Ks</span>
        </div>
      )}
      {showBarcode && receipt.invoiceId ? (
        <div className="receipt-barcode">
          <Code128Svg value={receipt.invoiceId} heightPx={26} barWidthPx={1} showText fontSizePx={9} />
        </div>
      ) : null}
      {hasFooterText && <div className="receipt-footer">{footerText}</div>}
    </div>
  );
}
