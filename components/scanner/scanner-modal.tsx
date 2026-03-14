import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBarcodeScanner } from '@/lib/useBarcodeScanner';
import { X } from 'lucide-react';

type ScannerModalProps = {
  open: boolean;
  elementId: string;
  onClose: () => void;
  onScanSuccess: (value: string) => void;
  onScanError?: (message: string) => void;
  manualValue: string;
  onManualChange: (value: string) => void;
  onManualSubmit: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

export function ScannerModal({
  open,
  elementId,
  onClose,
  onScanSuccess,
  onScanError,
  manualValue,
  onManualChange,
  onManualSubmit,
  secondaryActionLabel,
  onSecondaryAction,
}: ScannerModalProps) {
  const { startScanner, shutdownScanner, status, cameras, selectedCameraId, setSelectedCameraId } =
    useBarcodeScanner((text) => onScanSuccess(text), onScanError);
  const [isStarting, setIsStarting] = React.useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = React.useState(false);
  const [permissionWorking, setPermissionWorking] = React.useState(false);

  const startWithDelay = React.useCallback(() => {
    if (!open) return;
    if (isStarting) return;
    setIsStarting(true);
    const timer = setTimeout(() => {
      startScanner(elementId, {
        preferBackCamera: true,
        facingMode: 'environment',
        fps: 20,
        qrbox: { width: 300, height: 120 },
        aspectRatio: 1.0,
      }).finally(() => setIsStarting(false));
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, isStarting, startScanner, elementId]);

  React.useEffect(() => {
    if (!open) return;
    return startWithDelay();
  }, [open, startWithDelay]);

  React.useEffect(() => {
    if (!open) return;
    return () => {
      shutdownScanner();
    };
  }, [open, shutdownScanner]);

  React.useEffect(() => {
    if (!open) return;
    setShowPermissionPrompt(false);
    const timer = setTimeout(() => {
      if (status === 'initializing') {
        setShowPermissionPrompt(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, status]);

  React.useEffect(() => {
    if (status === 'scanning') {
      setShowPermissionPrompt(false);
    }
  }, [status]);

  const handleClose = React.useCallback(async () => {
    await shutdownScanner();
    onClose();
  }, [shutdownScanner, onClose]);

  const handleSwitchCamera = React.useCallback(async () => {
    if (cameras.length < 2) return;
    const currentIndex = cameras.findIndex((cam) => cam.id === selectedCameraId);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % cameras.length : 0;
    setSelectedCameraId(cameras[nextIndex].id);
    await shutdownScanner();
    startWithDelay();
  }, [cameras, selectedCameraId, setSelectedCameraId, shutdownScanner, startWithDelay]);

  const handleRefreshCamera = React.useCallback(async () => {
    await shutdownScanner();
    startWithDelay();
  }, [shutdownScanner, startWithDelay]);

  const handleCameraReset = React.useCallback(async () => {
    await shutdownScanner();
  }, [shutdownScanner]);

  const handleUserStart = React.useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      onScanError?.('Camera API is not available.');
      return;
    }
    setPermissionWorking(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      stream.getTracks().forEach((track) => track.stop());
      await shutdownScanner();
      await startScanner(elementId, {
        preferBackCamera: true,
        facingMode: 'environment',
        fps: 20,
        qrbox: { width: 300, height: 120 },
        aspectRatio: 1.0,
      });
      setShowPermissionPrompt(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Camera permission required.';
      onScanError?.(message);
    } finally {
      setPermissionWorking(false);
    }
  }, [elementId, onScanError, shutdownScanner, startScanner]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="w-[95vw] max-h-[90vh] max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-[9999] flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-foreground shadow-lg"
          onClick={handleClose}
          aria-label="Close scanner"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-3 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Manual barcode entry..."
              className="h-[44px] rounded-xl"
              value={manualValue}
              onChange={(e) => onManualChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onManualSubmit();
                }
              }}
            />
            <Button
              onClick={onManualSubmit}
              className="h-[44px] rounded-xl px-6 font-bold"
            >
              Add
            </Button>
            {secondaryActionLabel && onSecondaryAction && (
              <Button
                variant="outline"
                className="h-[44px] rounded-xl px-6 font-bold"
                onClick={onSecondaryAction}
              >
                {secondaryActionLabel}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">Scanner</h2>
              <p className="text-xs text-muted-foreground">Align barcode with scanner window</p>
              <div className="text-xs text-muted-foreground">
                {status === 'initializing' || isStarting ? 'Initializing Camera...' : 'Scanning...'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cameras.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-[44px] rounded-xl text-[10px] px-4 font-bold"
                  onClick={handleSwitchCamera}
                >
                  Switch Camera
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="h-[44px] rounded-xl text-[10px] px-4 font-bold"
                onClick={handleCameraReset}
              >
                Camera Reset
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-[44px] rounded-xl text-[10px] px-4 font-bold"
                onClick={handleRefreshCamera}
              >
                Refresh Camera
              </Button>
            </div>
          </div>
        </div>
        <div className="relative h-[72vh] bg-black rounded-2xl overflow-hidden">
          <div id={elementId} className="h-full w-full" />
          <div className="absolute inset-6 pointer-events-none rounded-2xl border-2 border-primary/60" />
          {showPermissionPrompt && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Button
                className="h-12 px-6 rounded-xl text-sm font-bold"
                onClick={handleUserStart}
                disabled={permissionWorking}
              >
                {permissionWorking ? 'Starting Camera...' : 'Click to Start Camera'}
              </Button>
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Safari may show a red icon during scanning for privacy. This is normal.
        </p>
      </div>
      <style jsx global>{`
        #${elementId} video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
