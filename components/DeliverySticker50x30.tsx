'use client';

import * as React from 'react';

export interface DeliveryStickerItem {
  name: string;
  qty?: number | string;
  price?: number;
  amount?: number;
  sku?: string;
  variant?: string;
  size?: string;
}

export interface DeliverySticker50x30Props {
  invoiceNo?: string;
  dateText?: string;
  storeName?: string;
  storeTagline?: string;
  storeAddress?: string;
  storePhone?: string;
  storeLogoSrc?: string | null;
  logoShow?: boolean;
  monochromeLogo?: boolean;
  customerName?: string | null;
  customerPhone?: string | null;
  customerAddress?: string | null;
  courierName?: string | null;
  items?: DeliveryStickerItem[];
  subtotalKs?: number;
  deliveryFeeKs?: number;
  advanceKs?: number;
  totalKs?: number;
  balanceKs?: number;
  remark?: string | null;
  id?: string;
}

export function DeliverySticker50x30(props: DeliverySticker50x30Props) {
  const {
    invoiceNo,
    dateText,
    storeName = 'THE MORE YOU GLOW BY INGYIN',
    storeTagline = 'USA Skincare and Cosmetics',
    storeAddress = '',
    storePhone = '',
    storeLogoSrc,
    logoShow = true,
    monochromeLogo = false,
    customerName,
    customerPhone,
    customerAddress,
    courierName,
    items = [],
    subtotalKs,
    deliveryFeeKs,
    advanceKs,
    totalKs,
    balanceKs,
    remark,
    id = 'print-delivery-sticker',
  } = props;

  const logoSrc = storeLogoSrc || '/logo.jpg';
  const logoFilter = monochromeLogo ? 'grayscale(100%) contrast(200%)' : 'none';

  const totalVal = totalKs ?? subtotalKs ?? 0;
  const deliFeesVal = deliveryFeeKs ?? 0;
  const advanceVal = advanceKs ?? 0;
  const grandVal = totalVal + deliFeesVal;
  const balanceVal = balanceKs ?? Math.max(0, grandVal - advanceVal);
  const showBalanceOrAdvance = advanceVal > 0 || (balanceKs != null && balanceKs > 0);

  return (
    <>
      <style>{`
@page label-sticker-50x30 {
  size: 50mm 30mm;
  margin: 0;
}
@media print {
  @page {
    size: 50mm 30mm;
    margin: 0;
  }
  html, body {
    width: 50mm;
    height: 30mm;
    margin: 0;
    padding: 0;
    background: #fff;
    color: #000;
  }
  body * {
    visibility: hidden;
  }
  #${id},
  #${id} * {
    visibility: visible;
  }
  #${id} {
    position: absolute;
    left: 0;
    top: 0;
    width: 50mm;
    height: 30mm;
    overflow: hidden;
    box-sizing: border-box;
    page-break-after: avoid;
    page-break-before: avoid;
    page-break-inside: avoid;
  }
}
      `}</style>
      <div
        id={id}
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
          padding: '1.5mm',
          backgroundColor: '#ffffff',
          color: '#000000',
          fontWeight: 700,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '6pt',
          lineHeight: 1.1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1mm',
            width: '100%',
            borderBottom: '1px solid #000',
            paddingBottom: '0.4mm',
            marginBottom: '0.4mm',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          {logoShow && (
            <div
              style={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
                minHeight: '28px',
                borderRadius: '9999px',
                overflow: 'hidden',
                border: '1px solid #000',
                boxSizing: 'border-box',
                padding: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            >
              <img
                src={logoSrc}
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  boxSizing: 'border-box',
                  filter: logoFilter,
                }}
                onError={(e) => {
                  const t = e.currentTarget;
                  t.onerror = null;
                  t.src = '/icon-192.png';
                }}
              />
            </div>
          )}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              gap: '0.3mm',
              boxSizing: 'border-box',
            }}
          >
            {storeName && (
              <div
                style={{
                  fontSize: '6pt',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {storeName}
              </div>
            )}
            {storeTagline && (
              <div
                style={{
                  fontSize: '5pt',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {storeTagline}
              </div>
            )}
            {storeAddress && (
              <div
                style={{
                  fontSize: '4.5pt',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {storeAddress}
              </div>
            )}
            {storePhone && (
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '4.5pt',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {storePhone}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            width: '100%',
            minHeight: 0,
            overflow: 'hidden',
            gap: '0.3mm',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1mm',
              fontSize: '5.5pt',
              lineHeight: 1.1,
              fontWeight: 700,
              padding: '0.4mm 0.6mm',
              border: '1px solid #000',
              boxSizing: 'border-box',
              flexShrink: 0,
              width: '100%',
              minHeight: 0,
            }}
          >
            <span
              style={{
                textTransform: 'uppercase',
                fontWeight: 700,
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Name:
            </span>
            <span
              style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
              }}
            >
              {customerName || '—'}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '5.5pt',
              lineHeight: 1.1,
              fontWeight: 700,
              padding: '0.4mm 0.6mm',
              border: '1px solid #000',
              borderTop: 'none',
              boxSizing: 'border-box',
              flexShrink: 0,
              width: '100%',
              gap: '0.5mm',
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5mm',
                flex: 1,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Phone:
              </span>
              <span
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontFamily: 'monospace',
                  minWidth: 0,
                }}
              >
                {customerPhone || '—'}
              </span>
            </div>
            {courierName && (
              <span
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '22%',
                  fontSize: '5pt',
                  fontWeight: 700,
                }}
              >
                | {courierName}
              </span>
            )}
          </div>

          <div
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
              flex: '1 1 auto',
              minHeight: 0,
              fontSize: '5pt',
              lineHeight: 1.1,
              fontWeight: 700,
              padding: '0.4mm 0.6mm',
              border: '1px solid #000',
              borderTop: 'none',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>
              Address:
            </span>{' '}
            <span>{customerAddress || '—'}</span>
          </div>

          {items.length > 0 && (
            <table
              style={{
                width: '100%',
                tableLayout: 'fixed',
                borderCollapse: 'collapse',
                border: '1px solid #000',
                borderTop: 'none',
                fontSize: '4.5pt',
                lineHeight: 1.05,
                fontWeight: 700,
                boxSizing: 'border-box',
                flexShrink: 0,
              }}
            >
              <tbody>
                {items.slice(0, 2).map((item, idx) => (
                  <tr
                    key={`sticker-item-${idx}`}
                    style={{
                      borderTop: idx > 0 ? '1px solid #000' : 'none',
                    }}
                  >
                    <td
                      style={{
                        borderRight: '1px solid #000',
                        padding: '0.2mm 0.5mm',
                        width: '10%',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box',
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #000',
                        padding: '0.2mm 0.5mm',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        boxSizing: 'border-box',
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        borderRight: items.length > 1 ? '1px solid #000' : 'none',
                        padding: '0.2mm 0.5mm',
                        width: '14%',
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                        fontWeight: 700,
                        boxSizing: 'border-box',
                        fontFamily: 'monospace',
                      }}
                    >
                      {Number(item.qty ?? 1)}
                    </td>
                    <td
                      style={{
                        padding: '0.2mm 0.5mm',
                        width: '22%',
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                        fontWeight: 700,
                        boxSizing: 'border-box',
                        fontFamily: 'monospace',
                      }}
                    >
                      {(item.amount ?? 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div
          style={{
            marginTop: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3mm',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              border: '1px solid #000',
              borderTop: items.length > 0 ? 'none' : '1px solid #000',
              fontSize: '4.8pt',
              lineHeight: 1.05,
              fontWeight: 700,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.4mm 0.6mm',
              boxSizing: 'border-box',
              gap: '0.4mm',
            }}
          >
            <div
              style={{
                borderRight: '1px solid #000',
                paddingRight: '0.6mm',
                paddingLeft: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexShrink: 0,
                width: '28%',
                boxSizing: 'border-box',
              }}
            >
              Amt: {totalVal.toLocaleString()}
            </div>
            <div
              style={{
                borderRight: '1px solid #000',
                padding: '0 0.6mm',
                margin: '0 0.4mm',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                textAlign: 'center',
                flex: 1,
                boxSizing: 'border-box',
              }}
            >
              Deli: {deliFeesVal.toLocaleString()}
            </div>
            <div
              style={{
                paddingLeft: '0.4mm',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                textAlign: 'right',
                width: showBalanceOrAdvance ? '30%' : '38%',
                boxSizing: 'border-box',
              }}
            >
              Total: {grandVal.toLocaleString()}
            </div>
            {showBalanceOrAdvance && (
              <div
                style={{
                  borderLeft: '1px solid #000',
                  paddingLeft: '0.6mm',
                  marginLeft: '0.4mm',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'right',
                  width: '30%',
                  boxSizing: 'border-box',
                }}
              >
                Bal: {balanceVal.toLocaleString()}
              </div>
            )}
          </div>

          {dateText && (
            <div
              style={{
                fontSize: '4.5pt',
                lineHeight: 1.05,
                fontWeight: 700,
                padding: '0.3mm 0.6mm',
                border: '1px solid #000',
                borderTop: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontWeight: 700 }}>Date:</span> {dateText}
              {remark && (
                <>
                  {'  |  '}
                  <span style={{ fontWeight: 700 }}>Note:</span> {remark}
                </>
              )}
            </div>
          )}

          {!dateText && remark && (
            <div
              style={{
                fontSize: '4.5pt',
                lineHeight: 1.05,
                fontWeight: 700,
                padding: '0.3mm 0.6mm',
                border: '1px solid #000',
                borderTop: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontWeight: 700 }}>Note:</span> {remark}
            </div>
          )}

          <div
            style={{
              fontSize: '5.5pt',
              fontWeight: 700,
              textAlign: 'center',
              paddingTop: '0.3mm',
              lineHeight: 1.05,
              letterSpacing: '0.1mm',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Invoice No : {invoiceNo || '—'}
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliverySticker50x30;
