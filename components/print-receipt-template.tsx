'use client';

import * as React from 'react';
import { Code128Svg } from '@/components/ui/code128-svg';
import { useHWPrintSettings } from '@/components/hw-print-settings-provider';
import type { ReceiptPayload } from '@/components/receipt-modal';

interface PrintReceiptTemplateProps {
  receipt: ReceiptPayload | null | undefined;
  logoUrl?: string;
}

export function PrintReceiptTemplate({ receipt, logoUrl }: PrintReceiptTemplateProps) {
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

  const headerTitle = settings.receipt.storeName?.trim() || 'THE MORE YOU GLOW BY INGYIN';
  const hasAddr = !!settings.receipt.storeAddress?.trim();
  const hasPhone = !!settings.receipt.storePhone?.trim();
  const hasSocial = !!settings.receipt.storeSocial?.trim();
  const hasFooter = !!settings.receipt.footerText?.trim();

  return (
    <div id="print-receipt">
      {settings.receipt.showLogo && logoUrl ? (
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <img src={logoUrl} alt="logo" style={{ maxHeight: 24, maxWidth: '100%', objectFit: 'contain' }} />
        </div>
      ) : null}
      <div className="receipt-title">{headerTitle}</div>
      {hasAddr && <div className="receipt-center">{settings.receipt.storeAddress.trim()}</div>}
      {hasPhone && <div className="receipt-center">Tel: {settings.receipt.storePhone.trim()}</div>}
      {hasSocial && <div className="receipt-center">{settings.receipt.storeSocial.trim()}</div>}
      <div className="divider" />
      <div className="receipt-row">
        <span>Invoice</span>
        <span>{receipt.invoiceId || '—'}</span>
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
      {settings.receipt.showBarcode && receipt.invoiceId ? (
        <div className="receipt-barcode">
          <Code128Svg value={receipt.invoiceId} heightPx={26} barWidthPx={1} showText fontSizePx={9} />
        </div>
      ) : null}
      {hasFooter && <div className="receipt-footer">{settings.receipt.footerText.trim()}</div>}
    </div>
  );
}
