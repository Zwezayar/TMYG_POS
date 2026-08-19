'use client';
import { Button } from '@/components/ui/button';
import { PrintReceiptTemplate } from '@/components/print-receipt-template';

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-black/80 px-4" onClick={onClose}>
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
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="mb-3 text-xs text-muted-foreground">
              Preview rendered using your Hardware &amp; Printers receipt settings. Press Print to use the actual @media print rules.
            </div>
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm w-fit mx-auto">
              <PrintReceiptTemplate receipt={receipt} />
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Receipt data unavailable.</div>
        )}
      </div>
    </div>
  );
}
