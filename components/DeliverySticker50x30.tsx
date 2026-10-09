'use client';

import * as React from 'react';

export interface DeliverySticker50x30Props {
  storeName?: string;
  storeCategory?: string;
  storeAddress?: string;
  storePhone?: string;
  storeLogoSrc?: string | null;
  logoShow?: boolean;
  monochromeLogo?: boolean;
  invoiceNo?: string;
  customerName?: string | null;
  customerPhone?: string | null;
  customerAddress?: string | null;
  amountKs?: number | string;
  deliFeesKs?: number | string;
  totalKs?: number | string;
  remark?: string | null;
  footerText?: string;
  id?: string;
}

const DEFAULT_STORE = {
  name: 'THE MORE YOU GLOW BY INGYIN',
  category: 'USA Skincare and Cosmetics',
  address: 'No.23 Thun Phayar Street, Bago City',
  phone: '09-777848379',
  invoice: 'INV-SAMPLE-0001',
  footer: 'Thanks for choosing us. See you again!',
};

function num(v: number | string | null | undefined): string {
  if (v == null) return '0';
  if (typeof v === 'number') return v.toLocaleString();
  return v;
}

export function DeliverySticker50x30(props: DeliverySticker50x30Props) {
  const {
    storeName = DEFAULT_STORE.name,
    storeCategory = DEFAULT_STORE.category,
    storeAddress = DEFAULT_STORE.address,
    storePhone = DEFAULT_STORE.phone,
    storeLogoSrc,
    logoShow = true,
    monochromeLogo = false,
    invoiceNo,
    customerName,
    customerPhone,
    customerAddress,
    amountKs = 0,
    deliFeesKs = 0,
    totalKs = 0,
    remark,
    footerText = DEFAULT_STORE.footer,
    id = 'print-delivery-sticker',
  } = props;

  const logoSrc = storeLogoSrc || '/logo.jpg';
  const logoFilter = monochromeLogo ? 'grayscale(100%) contrast(200%)' : 'none';
  const invoice = invoiceNo || DEFAULT_STORE.invoice;

  const finalLogoSrc = React.useMemo(() => {
    if (storeLogoSrc && typeof storeLogoSrc === 'string' && storeLogoSrc.trim()) {
      return storeLogoSrc.trim();
    }
    return '/logo.jpg';
  }, [storeLogoSrc]);

  return (
    <>
      <style>{`
@page {
  size: 50mm 30mm;
  margin: 0;
}
@media print {
  html, body {
    width: 50mm;
    height: 30mm;
    margin: 0;
    padding: 0;
    background: #fff;
    color: #000;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
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
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '2px 2px 1px 2px',
          gap: '1px',
          border: '0.5px solid #000000',
          background: '#FFFFFF',
          color: '#000000',
          fontFamily: 'Arial, Helvetica, sans-serif',
          pageBreakInside: 'avoid',
        }}
      >
        {/* === HEADER ROW (~18px / 0.3px bottom border #333) === */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '2px',
            width: '100%',
            height: '18px',
            flexShrink: 0,
            borderBottom: '0.3px solid #333333',
            paddingBottom: '1px',
            marginBottom: '0px',
            boxSizing: 'border-box',
          }}
        >
          {/* Shop Logo Circle 19px × 17px, border 0.3px #000 */}
          {logoShow && (
            <div
              style={{
                width: '19px',
                height: '17px',
                minWidth: '19px',
                minHeight: '17px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '0.3px solid #000000',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: '#fff',
                padding: '0px',
              }}
            >
              <img
                src={finalLogoSrc}
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
                  if (t.src.includes('logo.jpg') || t.src.includes('icon-192')) {
                    t.onerror = null;
                    return;
                  }
                  t.onerror = null;
                  t.src = '/logo.jpg';
                }}
              />
            </div>
          )}

          {/* Header Info Column */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              gap: '0px',
              justifyContent: 'flex-start',
              boxSizing: 'border-box',
            }}
          >
            {/* Shop Name (4px bold) */}
            <div
              style={{
                fontSize: '4px',
                fontWeight: 700,
                lineHeight: 1.0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                letterSpacing: '0',
              }}
            >
              {storeName}
            </div>
            {/* Category (4px bold) */}
            <div
              style={{
                fontSize: '4px',
                fontWeight: 700,
                lineHeight: 1.0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                marginTop: '0.5px',
              }}
            >
              {storeCategory}
            </div>
            {/* Address (3px semi-bold) */}
            <div
              style={{
                fontSize: '3px',
                fontWeight: 600,
                lineHeight: 1.0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                marginTop: '0.5px',
              }}
            >
              {storeAddress}
            </div>
            {/* Info Row: Flex space-between — Phone (3px) + Invoice Number (3px bold) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '0.8px',
                gap: '2px',
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  fontSize: '3px',
                  lineHeight: 1.0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  flexShrink: 0,
                }}
              >
                {storePhone}
              </span>
              <span
                style={{
                  fontSize: '3px',
                  lineHeight: 1.0,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '55%',
                  textAlign: 'right',
                }}
              >
                {invoice}
              </span>
            </div>
          </div>
        </div>

        {/* === CUSTOMER INPUT FIELDS (Full width outline 0.3px #262626, pl 2px) === */}
        {/* Name Field: Height ~11px */}
        <div
          style={{
            width: '100%',
            height: '11px',
            minHeight: '11px',
            maxHeight: '11px',
            boxSizing: 'border-box',
            outline: '0.3px solid #262626',
            border: 'none',
            paddingLeft: '2px',
            paddingRight: '1px',
            paddingTop: '1px',
            paddingBottom: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '1px',
            background: '#fff',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontSize: '4px',
              fontWeight: 600,
              lineHeight: 1.0,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Name :
          </span>
          <span
            style={{
              fontSize: '4px',
              fontWeight: 600,
              lineHeight: 1.0,
              flex: 1,
              minWidth: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {customerName || '—'}
          </span>
        </div>

        {/* Phone Field: Height ~7px */}
        <div
          style={{
            width: '100%',
            height: '7px',
            minHeight: '7px',
            maxHeight: '7px',
            boxSizing: 'border-box',
            outline: '0.3px solid #262626',
            border: 'none',
            paddingLeft: '2px',
            paddingRight: '1px',
            paddingTop: '0.5px',
            paddingBottom: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '1px',
            background: '#fff',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontSize: '4px',
              fontWeight: 600,
              lineHeight: 1.0,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Phone :
          </span>
          <span
            style={{
              fontSize: '4px',
              fontWeight: 600,
              lineHeight: 1.0,
              fontFamily: 'monospace',
              flex: 1,
              minWidth: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {customerPhone || '—'}
          </span>
        </div>

        {/* Address Field: Height ~13px, word-wrap/break-word */}
        <div
          style={{
            width: '100%',
            height: '13px',
            minHeight: '13px',
            maxHeight: '13px',
            boxSizing: 'border-box',
            outline: '0.3px solid #262626',
            border: 'none',
            paddingLeft: '2px',
            paddingRight: '1px',
            paddingTop: '0.5px',
            paddingBottom: '0.5px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            background: '#fff',
            flexShrink: 0,
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              fontSize: '4px',
              fontWeight: 600,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Address :
          </span>
          <span
            style={{
              fontSize: '4px',
              fontWeight: 600,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {customerAddress || '—'}
          </span>
        </div>

        {/* === TOTALS ROW (Height ~7px, 3 eq flex, gap 1px, outline 0.3px #262626) === */}
        <div
          style={{
            width: '100%',
            height: '7px',
            minHeight: '7px',
            maxHeight: '7px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '1px',
            flexShrink: 0,
            background: 'transparent',
          }}
        >
          {/* Amount */}
          <div
            style={{
              flex: 1,
              flexBasis: 0,
              minWidth: 0,
              height: '100%',
              boxSizing: 'border-box',
              outline: '0.3px solid #262626',
              border: 'none',
              paddingLeft: '1px',
              paddingRight: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fff',
              overflow: 'hidden',
              gap: '1px',
            }}
          >
            <span
              style={{
                fontSize: '3px',
                lineHeight: 1.0,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexShrink: 0,
              }}
            >
              Amt:
            </span>
            <span
              style={{
                fontSize: '3px',
                lineHeight: 1.0,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'monospace',
              }}
            >
              {num(amountKs)}
            </span>
          </div>

          {/* Deli Fees */}
          <div
            style={{
              flex: 1,
              flexBasis: 0,
              minWidth: 0,
              height: '100%',
              boxSizing: 'border-box',
              outline: '0.3px solid #262626',
              border: 'none',
              paddingLeft: '1px',
              paddingRight: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fff',
              overflow: 'hidden',
              gap: '1px',
            }}
          >
            <span
              style={{
                fontSize: '3px',
                lineHeight: 1.0,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexShrink: 0,
              }}
            >
              Deli:
            </span>
            <span
              style={{
                fontSize: '3px',
                lineHeight: 1.0,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'monospace',
              }}
            >
              {num(deliFeesKs)}
            </span>
          </div>

          {/* Total */}
          <div
            style={{
              flex: 1,
              flexBasis: 0,
              minWidth: 0,
              height: '100%',
              boxSizing: 'border-box',
              outline: '0.3px solid #262626',
              border: 'none',
              paddingLeft: '1px',
              paddingRight: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fff',
              overflow: 'hidden',
              gap: '1px',
            }}
          >
            <span
              style={{
                fontSize: '3px',
                lineHeight: 1.0,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexShrink: 0,
              }}
            >
              Total:
            </span>
            <span
              style={{
                fontSize: '3px',
                lineHeight: 1.0,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'monospace',
              }}
            >
              {num(totalKs)}
            </span>
          </div>
        </div>

        {/* === REMARK BOX (Height ~14px, full width, outline 0.3px #262626, pl 1px) === */}
        <div
          style={{
            width: '100%',
            height: '14px',
            minHeight: '14px',
            maxHeight: '14px',
            boxSizing: 'border-box',
            outline: '0.3px solid #262626',
            border: 'none',
            paddingLeft: '1px',
            paddingRight: '1px',
            paddingTop: '0.5px',
            paddingBottom: '0.5px',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            background: '#fff',
            flexShrink: 0,
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              fontSize: '3px',
              lineHeight: 1.1,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Remark :
          </span>
          <span
            style={{
              fontSize: '3px',
              lineHeight: 1.1,
              fontWeight: 600,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {remark || '—'}
          </span>
        </div>

        {/* === FOOTER (Height ~4px, centered 3px bold color #333) === */}
        <div
          style={{
            width: '100%',
            height: '4px',
            minHeight: '4px',
            maxHeight: '4px',
            flexShrink: 0,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 'auto',
            paddingTop: '0.5px',
            background: 'transparent',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontSize: '3px',
              lineHeight: 1.0,
              fontWeight: 700,
              color: '#333333',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              letterSpacing: '0',
            }}
          >
            {footerText}
          </span>
        </div>
      </div>
    </>
  );
}

export default DeliverySticker50x30;
