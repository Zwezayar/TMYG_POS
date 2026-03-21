import * as React from 'react';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmVariant?: 'default' | 'destructive';
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  confirmVariant = 'destructive',
  loading,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmClass =
    confirmVariant === 'destructive'
      ? 'bg-red-600 text-white hover:bg-red-500'
      : 'bg-primary text-primary-foreground hover:bg-primary/90';

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center bg-black/70 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-bold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            className={`flex-1 ${confirmClass}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Please wait...' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
