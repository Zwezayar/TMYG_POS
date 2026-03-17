'use client';
import { Button } from '@/components/ui/button';

type ReceiptItem = {
  name: string;
  qty: number;
  price: number;
  amount: number;
};

export type ReceiptPayload = {
  invoiceId: string;
  date: string;
  time: string;
  staffName: string | null;
  cashierRole?: string | null;
  saleType: 'Shop' | 'Delivery';
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: ReceiptItem[];
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
  grandTotal?: number;
  amountReceived?: number;
  changeAmount?: number;
};

type ReceiptModalProps = {
  open: boolean;
  receipt: ReceiptPayload | null;
  onClose: () => void;
};

export function ReceiptModal({ open, receipt, onClose }: ReceiptModalProps) {
  if (!open) return null;

  const subtotal =
    receipt?.subtotal ??
    (receipt?.items ?? []).reduce((sum, item) => sum + item.amount, 0);
  const deliveryFee = receipt?.deliveryFee ?? 0;
  const discount = receipt?.discount ?? 0;
  const grandTotal = receipt?.grandTotal ?? subtotal + deliveryFee - discount;
  const amountReceived = receipt?.amountReceived ?? grandTotal;
  const changeAmount = receipt?.changeAmount ?? amountReceived - grandTotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-black/80 px-4" onClick={onClose}>
      <style>{`
        @media print {
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
            width: 80mm;
            padding: 4mm;
            font-size: 11px;
            line-height: 1.4;
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
            font-size: 10px;
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
          }
          #print-receipt .receipt-amount {
            font-weight: 700;
          }
          #print-receipt .divider {
            border-top: 1px dashed #444;
            margin: 6px 0;
          }
          #print-receipt .receipt-title {
            font-size: 13px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 6px;
          }
        }
      `}</style>
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold">Receipt</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} disabled={!receipt}>
              Print
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        {receipt ? (
          <div id="print-receipt">
            <div className="receipt-title">THE MORE YOU GLOW BY INGYIN</div>
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
            <div className="receipt-row">
              <span>Cashier Name</span>
              <span>{receipt.staffName || '—'}</span>
            </div>
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
                  <span>{receipt.customerAddress || '—'}</span>
                </div>
              </>
            )}
            <div className="divider" />
            <table>
              <thead>
                <tr>
                  <th align="left" style={{ width: '44mm' }}>Item</th>
                  <th align="right" style={{ width: '8mm' }}>Qty</th>
                  <th align="right" style={{ width: '14mm' }}>Price</th>
                  <th align="right" style={{ width: '14mm' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, index) => (
                  <tr key={`${item.name}-${index}`}>
                    <td className="receipt-item">{item.name}</td>
                    <td align="right">{item.qty}</td>
                    <td align="right">{item.price.toLocaleString()}</td>
                    <td align="right" className="receipt-amount">{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="divider" />
          <div className="receipt-row">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()} Ks</span>
          </div>
          {receipt.saleType === 'Delivery' && (
            <div className="receipt-row">
              <span>Delivery Fee (+)</span>
              <span>{deliveryFee.toLocaleString()} Ks</span>
            </div>
          )}
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
          <div className="receipt-row">
            <span>Change</span>
            <span>{changeAmount.toLocaleString()} Ks</span>
          </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Receipt data unavailable.</div>
        )}
      </div>
    </div>
  );
}
