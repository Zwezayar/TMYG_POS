'use client';

import * as React from 'react';
import { Check, Minus, Pencil, Plus, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PosStyleCartItem = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  basePrice: number;
};

export function PosCartItems({
  items,
  onUpdateQuantity,
  onUpdatePrice,
  onRemoveItem,
  emptyText = 'Cart is empty',
  maxQuantityByItem,
  className,
}: {
  items: PosStyleCartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onUpdatePrice: (id: number, price: number) => void;
  onRemoveItem: (id: number) => void;
  emptyText?: string;
  maxQuantityByItem?: Record<number, number>;
  className?: string;
}) {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editPrice, setEditPrice] = React.useState('');

  const handleEditPrice = React.useCallback((id: number, price: number) => {
    setEditingId(id);
    setEditPrice(String(price));
  }, []);

  const handleSavePrice = React.useCallback(
    (id: number) => {
      const parsed = Number(editPrice);
      if (Number.isFinite(parsed) && parsed >= 0) {
        onUpdatePrice(id, parsed);
      }
      setEditingId(null);
      setEditPrice('');
    },
    [editPrice, onUpdatePrice]
  );

  return (
    <div className={cn('flex-1 overflow-y-auto custom-scrollbar min-h-0', className)}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center text-muted-foreground opacity-50">
          <ShoppingBag className="mb-3 h-10 w-10" />
          <p className="text-sm font-medium">{emptyText}</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {items.map((item, idx) => {
            const isEditing = editingId === item.id;
            const maxQuantity = maxQuantityByItem?.[item.id];
            return (
              <div
                key={item.id}
                className={cn('px-4 py-3', idx < items.length - 1 && 'border-b border-border')}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 flex-1 text-[13px] font-bold leading-snug">
                    {item.name}
                  </p>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="flex h-[44px] w-[44px] items-center justify-center border-none bg-transparent text-muted-foreground transition-colors hover:text-destructive"
                    title="Remove Item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="h-[44px] w-24 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSavePrice(item.id)}
                          className="flex h-[44px] w-[44px] items-center justify-center rounded-lg border-none bg-primary text-primary-foreground shadow-sm"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={cn(
                            'text-sm font-bold',
                            item.unitPrice !== item.basePrice && 'text-[#D4AF37]'
                          )}
                        >
                          {item.unitPrice.toLocaleString()} Ks
                        </span>
                        <button
                          onClick={() => handleEditPrice(item.id, item.unitPrice)}
                          className="flex h-[44px] w-[44px] items-center justify-center rounded-lg border border-border bg-transparent text-muted-foreground transition-all active:scale-95 hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-lg border border-border bg-transparent transition-all active:scale-95"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          typeof maxQuantity === 'number'
                            ? Math.min(maxQuantity, item.quantity + 1)
                            : item.quantity + 1
                        )
                      }
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-lg border border-border bg-transparent transition-all active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
