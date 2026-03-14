
'use client';

import * as React from 'react';
import { Html5Qrcode, Html5QrcodeScannerState, type CameraDevice, type Html5QrcodeResult, Html5QrcodeScanner } from 'html5-qrcode';

type ScannerStatus = 'idle' | 'initializing' | 'scanning' | 'success' | 'error' | 'stopped';

type ScannerOptions = {
  preferBackCamera?: boolean;
  facingMode?: 'environment' | 'user';
  fps?: number;
  qrbox?: { width: number; height: number } | ((viewfinderWidth: number, viewfinderHeight: number) => { width: number; height: number });
  aspectRatio?: number;
};

let globalScannerInstance: Html5Qrcode | null = null;

function stopLocalStreamTracks() {
  if (typeof window === 'undefined') return;
  const stream = (window as any).localStream as MediaStream | undefined;
  if (stream?.getTracks) {
    stream.getTracks().forEach((track) => {
      try {
        track.stop();
      } catch { }
    });
  }
}

async function forceStopCamera() {
  stopLocalStreamTracks();
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

async function forceStopGlobalScanner() {
  if (typeof window !== 'undefined') {
    const instance = (window as any).__html5QrCodeInstance as Html5Qrcode | undefined;
    if (instance) {
      globalScannerInstance = instance;
    }
  }
  if (!globalScannerInstance) return;
  try {
    if (globalScannerInstance.getState?.() === Html5QrcodeScannerState.SCANNING) {
      await globalScannerInstance.stop();
    }
  } catch { }
  try {
    if (typeof globalScannerInstance.clear === 'function') {
      await Promise.resolve(globalScannerInstance.clear());
    }
  } catch { }
  stopLocalStreamTracks();
  globalScannerInstance = null;
  if (typeof window !== 'undefined') {
    (window as any).__html5QrCodeInstance = null;
  }
}

export function useBarcodeScanner(
  onScanSuccess: (decodedText: string, result: Html5QrcodeResult) => void,
  onScanError?: (errorMessage: string) => void
) {
  const scannerRef = React.useRef<Html5Qrcode | null>(null);
  const scannerUiRef = React.useRef<Html5QrcodeScanner | null>(null);
  const lastStartRef = React.useRef<number>(0);
  const isProcessing = React.useRef(false);
  const instanceIdRef = React.useRef(`scanner-${Math.random().toString(36).slice(2)}`);
  const [status, setStatus] = React.useState<ScannerStatus>('idle');
  const [cameras, setCameras] = React.useState<CameraDevice[]>([]);
  const [selectedCameraId, setSelectedCameraId] = React.useState<string | undefined>(undefined);
  const [error, setError] = React.useState<string | null>(null);

  const stopScanner = React.useCallback(async () => {
    if (isProcessing.current) {
      return;
    }
    isProcessing.current = true;
    if (scannerUiRef.current) {
      try {
        scannerUiRef.current.clear();
      } catch (err) {
        console.warn('Non-critical error stopping scanner UI:', err);
      }
      scannerUiRef.current = null;
    }
    if (scannerRef.current) {
      setStatus('stopped');
      try {
        if (scannerRef.current.getState?.() === Html5QrcodeScannerState.SCANNING) {
          await scannerRef.current.stop();
        }
        if (typeof scannerRef.current.clear === 'function') {
          await Promise.resolve(scannerRef.current.clear());
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        scannerRef.current = null;
      } catch (err) {
        if (!`${err}`.includes('AbortError')) {
          console.warn('Non-critical error stopping scanner:', err);
        }
        scannerRef.current = null;
      } finally {
        isProcessing.current = false;
      }
    }
    await forceStopGlobalScanner();
    await forceStopCamera();
    if (typeof window !== 'undefined') {
      const state = (window as any).__tmygScannerLockState as { id?: string; release?: () => Promise<void> | void } | undefined;
      if (state?.id === instanceIdRef.current) {
        (window as any).__tmygScannerLockState = null;
      }
    }
    isProcessing.current = false;
  }, [status]);

  const startScanner = React.useCallback(async (elementId: string, options?: ScannerOptions) => {
    if (status === 'scanning' || status === 'initializing') {
      console.warn('Scanner is already active.');
      return;
    }

    if (isProcessing.current) {
      return;
    }

    if (scannerRef.current || scannerUiRef.current) {
      await stopScanner();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setStatus('initializing');
    setError(null);
    await forceStopCamera();

    const attemptStart = async () => {
      isProcessing.current = true;
      const now = Date.now();
      const sinceLastStart = now - lastStartRef.current;
      if (sinceLastStart < 500) {
        await new Promise((resolve) => setTimeout(resolve, 500 - sinceLastStart));
      }
      lastStartRef.current = Date.now();

      if (typeof window !== 'undefined') {
        const state = (window as any).__tmygScannerLockState as { id?: string; release?: () => Promise<void> | void } | undefined;
        if (state?.id && state.id !== instanceIdRef.current) {
          await state.release?.();
          (window as any).__tmygScannerLockState = null;
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        (window as any).__tmygScannerLockState = {
          id: instanceIdRef.current,
          release: async () => {
            await stopScanner();
          },
        };
      }

      const availableCameras = await Html5Qrcode.getCameras();
      if (!availableCameras || availableCameras.length === 0) {
        throw new Error('No cameras found.');
      }
      setCameras(availableCameras);

      let cameraId = selectedCameraId;
      if (!cameraId && options?.preferBackCamera) {
        const backCamera = availableCameras.find((camera) =>
          /back|rear|environment/i.test(camera.label || '')
        );
        cameraId = backCamera?.id;
      }
      if (!cameraId) {
        cameraId = availableCameras[0].id;
      }
      setSelectedCameraId(cameraId);

      const scanConfig = {
        fps: options?.fps ?? 12,
        qrbox:
          options?.qrbox ??
          ((viewfinderWidth: number, viewfinderHeight: number) => {
            const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7);
            return { width: size, height: size };
          }),
      };

      if (options?.preferBackCamera || options?.facingMode) {
        await forceStopGlobalScanner();
        await forceStopCamera();
        const html5Qrcode = new Html5Qrcode(elementId, { verbose: false });
        globalScannerInstance = html5Qrcode;
        if (typeof window !== 'undefined') {
          (window as any).__html5QrCodeInstance = html5Qrcode;
        }
        scannerRef.current = html5Qrcode;
        const cameraSource = { facingMode: 'environment' };
        await html5Qrcode.start(
          cameraSource as any,
          scanConfig,
          async (decodedText, result) => {
            await stopScanner();
            onScanSuccess(decodedText, result);
          },
          (errorMessage) => {
            if (/NotFoundException|No MultiFormat Readers were able to detect/.test(errorMessage)) {
              return;
            }
            onScanError?.(errorMessage);
          }
        );
        if (typeof window !== 'undefined') {
          const video = document.querySelector(`#${elementId} video`) as HTMLVideoElement | null;
          if (video?.srcObject) {
            (window as any).localStream = video.srcObject;
          }
        }
      } else {
        const config = {
          fps: scanConfig.fps,
          qrbox: scanConfig.qrbox ?? { width: 240, height: 240 },
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
        };
        const ui = new Html5QrcodeScanner(elementId, config, false);
        scannerUiRef.current = ui;
        ui.render(
          async (decodedText, result) => {
            await stopScanner();
            onScanSuccess(decodedText, result);
          },
          (errorMessage) => {
            if (/NotFoundException|No MultiFormat Readers were able to detect/.test(errorMessage)) {
              return;
            }
            onScanError?.(errorMessage);
          }
        );
      }

      setStatus('scanning');
      isProcessing.current = false;
    };

    try {
      await attemptStart();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (/AbortError/.test(errorMessage)) {
        if (isProcessing.current) {
          isProcessing.current = false;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          await attemptStart();
          return;
        } catch (retryErr) {
          const retryMessage = retryErr instanceof Error ? retryErr.message : String(retryErr);
          if (!/AbortError/.test(retryMessage)) {
            console.error('Failed to start scanner after retry:', retryMessage);
          }
          setError(`Failed to start scanner: ${retryMessage}`);
          setStatus('error');
          isProcessing.current = false;
        }
        return;
      }
      if (!/NotFoundException/.test(errorMessage)) {
        console.error('Failed to start scanner:', errorMessage);
      }
      setError(`Failed to start scanner: ${errorMessage}`);
      setStatus('error');
      isProcessing.current = false;
    }
  }, [onScanSuccess, onScanError, selectedCameraId, status, stopScanner]);

  React.useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return {
    status,
    error,
    cameras,
    selectedCameraId,
    setSelectedCameraId,
    startScanner,
    stopScanner,
  };
}
