module.exports = [
"[project]/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors", "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
}),
"[project]/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-xs font-medium text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/useBarcodeScanner.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBarcodeScanner",
    ()=>useBarcodeScanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/html5-qrcode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$state$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/state-manager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2d$scanner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/html5-qrcode-scanner.js [app-ssr] (ecmascript)");
'use client';
;
;
let globalScannerInstance = null;
function stopLocalStreamTracks() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const stream = undefined;
}
async function forceStopGlobalScanner() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!globalScannerInstance) return;
    try {
        if (globalScannerInstance.getState?.() === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$state$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Html5QrcodeScannerState"].SCANNING) {
            await globalScannerInstance.stop();
        }
    } catch  {}
    try {
        if (typeof globalScannerInstance.clear === 'function') {
            await Promise.resolve(globalScannerInstance.clear());
        }
    } catch  {}
    stopLocalStreamTracks();
    globalScannerInstance = null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function useBarcodeScanner(onScanSuccess, onScanError) {
    const scannerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const scannerUiRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const lastStartRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](0);
    const isProcessing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const instanceIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](`scanner-${Math.random().toString(36).slice(2)}`);
    const [status, setStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('idle');
    const [cameras, setCameras] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [selectedCameraId, setSelectedCameraId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const stopScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
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
                if (scannerRef.current.getState?.() === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$state$2d$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Html5QrcodeScannerState"].SCANNING) {
                    await scannerRef.current.stop();
                }
                if (typeof scannerRef.current.clear === 'function') {
                    await Promise.resolve(scannerRef.current.clear());
                }
                await new Promise((resolve)=>setTimeout(resolve, 1000));
                scannerRef.current = null;
            } catch (err) {
                if (!`${err}`.includes('AbortError')) {
                    console.warn('Non-critical error stopping scanner:', err);
                }
                scannerRef.current = null;
            } finally{
                isProcessing.current = false;
            }
        }
        await forceStopGlobalScanner();
        stopLocalStreamTracks();
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        isProcessing.current = false;
    }, [
        status
    ]);
    const startScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async (elementId, options)=>{
        if (status === 'scanning' || status === 'initializing') {
            console.warn('Scanner is already active.');
            return;
        }
        if (isProcessing.current) {
            return;
        }
        if (scannerRef.current || scannerUiRef.current) {
            await stopScanner();
            await new Promise((resolve)=>setTimeout(resolve, 1000));
        }
        setStatus('initializing');
        setError(null);
        const attemptStart = async ()=>{
            isProcessing.current = true;
            const now = Date.now();
            const sinceLastStart = now - lastStartRef.current;
            if (sinceLastStart < 500) {
                await new Promise((resolve)=>setTimeout(resolve, 500 - sinceLastStart));
            }
            lastStartRef.current = Date.now();
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const availableCameras = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Html5Qrcode"].getCameras();
            if (!availableCameras || availableCameras.length === 0) {
                throw new Error('No cameras found.');
            }
            setCameras(availableCameras);
            let cameraId = selectedCameraId;
            if (!cameraId && options?.preferBackCamera) {
                const backCamera = availableCameras.find((camera)=>/back|rear|environment/i.test(camera.label || ''));
                cameraId = backCamera?.id;
            }
            if (!cameraId) {
                cameraId = availableCameras[0].id;
            }
            setSelectedCameraId(cameraId);
            const scanConfig = {
                fps: options?.fps ?? 12,
                qrbox: options?.qrbox ?? ((viewfinderWidth, viewfinderHeight)=>{
                    const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7);
                    return {
                        width: size,
                        height: size
                    };
                })
            };
            if (options?.preferBackCamera || options?.facingMode) {
                await forceStopGlobalScanner();
                stopLocalStreamTracks();
                const html5Qrcode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Html5Qrcode"](elementId, {
                    verbose: false
                });
                globalScannerInstance = html5Qrcode;
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                scannerRef.current = html5Qrcode;
                const cameraSource = {
                    facingMode: 'environment'
                };
                await html5Qrcode.start(cameraSource, scanConfig, async (decodedText, result)=>{
                    await stopScanner();
                    onScanSuccess(decodedText, result);
                }, (errorMessage)=>{
                    if (/NotFoundException|No MultiFormat Readers were able to detect/.test(errorMessage)) {
                        return;
                    }
                    onScanError?.(errorMessage);
                });
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            } else {
                const config = {
                    fps: scanConfig.fps,
                    qrbox: scanConfig.qrbox ?? {
                        width: 240,
                        height: 240
                    },
                    rememberLastUsedCamera: true,
                    showTorchButtonIfSupported: true,
                    showZoomSliderIfSupported: true
                };
                const ui = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2d$scanner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Html5QrcodeScanner"](elementId, config, false);
                scannerUiRef.current = ui;
                ui.render(async (decodedText, result)=>{
                    await stopScanner();
                    onScanSuccess(decodedText, result);
                }, (errorMessage)=>{
                    if (/NotFoundException|No MultiFormat Readers were able to detect/.test(errorMessage)) {
                        return;
                    }
                    onScanError?.(errorMessage);
                });
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
                await new Promise((resolve)=>setTimeout(resolve, 500));
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
    }, [
        onScanSuccess,
        onScanError,
        selectedCameraId,
        status,
        stopScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        return ()=>{
            stopScanner();
        };
    }, [
        stopScanner
    ]);
    return {
        status,
        error,
        cameras,
        selectedCameraId,
        setSelectedCameraId,
        startScanner,
        stopScanner
    };
}
}),
"[project]/lib/image.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compressImageFile",
    ()=>compressImageFile
]);
async function compressImageFile(file, maxSize = 500) {
    if ("TURBOPACK compile-time truthy", 1) {
        return file;
    }
    //TURBOPACK unreachable
    ;
    const imageUrl = undefined;
}
function loadImage(src) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>resolve(img);
        img.onerror = (err)=>reject(err);
        img.src = src;
    });
}
}),
"[project]/app/(dashboard)/admin/inventory/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminInventoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useBarcodeScanner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useBarcodeScanner.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/image.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
'use client';
;
;
;
;
;
;
;
;
;
;
const CACHE_KEY = 'admin-inventory-cache-v1';
const QUEUE_KEY = 'admin-inventory-queue-v1';
function loadQueue() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function saveQueue(items) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function loadCache() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function saveCache(items) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function dataUrlToBlob(dataUrl) {
    const [meta, content] = dataUrl.split(',');
    const match = /data:(.*);base64/.exec(meta || '');
    const mime = match?.[1] || 'image/jpeg';
    const binary = atob(content || '');
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i += 1){
        bytes[i] = binary.charCodeAt(i);
    }
    return {
        blob: new Blob([
            bytes
        ], {
            type: mime
        }),
        mime
    };
}
function readFileAsDataUrl(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            const result = typeof reader.result === 'string' ? reader.result : '';
            const match = /data:(.*);base64/.exec(result);
            const mime = match?.[1] || file.type || 'image/jpeg';
            resolve({
                dataUrl: result,
                mime
            });
        };
        reader.onerror = ()=>reject(new Error('Failed to read file.'));
        reader.readAsDataURL(file);
    });
}
function formatPrice(value) {
    if (value == null || Number.isNaN(value)) return '—';
    return new Intl.NumberFormat('en-US').format(value) + ' Ks';
}
function withCacheBust(url) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}t=${Date.now()}`;
}
const InventoryRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](function InventoryRow({ product, onEdit, onDelete, isAdmin, deleting }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-t border-border/40 hover:bg-secondary/40 h-[48px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 font-mono text-[11px] text-muted-foreground",
                children: product.id
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3",
                children: product.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: product.image_url,
                    alt: product.product_name ?? 'Product',
                    className: "h-12 w-12 rounded-md border border-border/70 object-cover",
                    onError: (e)=>{
                        e.target.src = '';
                    }
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 132,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-12 w-12 rounded-md border border-dashed border-border/70 bg-muted/40"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[12px] font-medium",
                children: product.product_name || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.default_code || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.category || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.variant || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.barcode || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.stock_quantity ?? '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-right text-[12px] font-semibold",
                children: formatPrice(product.sale_price)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: "outline",
                            className: "h-12 px-4",
                            onClick: ()=>onEdit(product),
                            children: "Edit"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: "outline",
                            className: "h-12 px-4 text-destructive border-destructive/40 hover:bg-destructive/10",
                            onClick: ()=>onDelete(product),
                            disabled: deleting,
                            children: "Delete"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
});
function AdminInventoryPage() {
    const { role } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDashboardAuth"])();
    const isAdmin = role === 'admin';
    const [products, setProducts] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](true);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [query, setQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [isOnline, setIsOnline] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](true);
    const [syncing, setSyncing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [scannerOpen, setScannerOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [dialogOpen, setDialogOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [editing, setEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [name, setName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [defaultCode, setDefaultCode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [size, setSize] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [variant, setVariant] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [price, setPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [costPrice, setCostPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [stockQuantity, setStockQuantity] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [descriptionEn, setDescriptionEn] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [descriptionMm, setDescriptionMm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [category, setCategory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [barcode, setBarcode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [remark, setRemark] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [imageFile, setImageFile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [imagePreviewUrl, setImagePreviewUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [imageUrlInput, setImageUrlInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [saving, setSaving] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [uploading, setUploading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [deletingId, setDeletingId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [scanFlash, setScanFlash] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [scanStatus, setScanStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('scanning');
    const [scanManualInput, setScanManualInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const [scanningForForm, setScanningForForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const isBusy = saving || uploading;
    const uploadProductImage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async (productId, file)=>{
        const compressed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compressImageFile"])(file, 600);
        const path = `public/product-${productId}-${Date.now()}.jpg`;
        const contentType = compressed.type || 'image/jpeg';
        const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').upload(path, compressed, {
            upsert: true,
            contentType
        });
        if (uploadError) {
            return {
                error: uploadError.message || 'Image upload failed.'
            };
        }
        const { data: publicData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').getPublicUrl(path);
        if (!publicData?.publicUrl) {
            return {
                error: 'Image uploaded but public URL was not returned.'
            };
        }
        return {
            url: withCacheBust(publicData.publicUrl)
        };
    }, []);
    const onScanSuccess = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((decodedText)=>{
        if (dialogOpen && scanningForForm) {
            setBarcode(decodedText);
            setScanStatus('found');
            setScanningForForm(false);
            setScannerOpen(false);
            return;
        }
        setQuery(decodedText);
        setScanFlash(true);
        setTimeout(()=>setScanFlash(false), 150);
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 880;
            gain.gain.value = 0.05;
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            setTimeout(()=>{
                osc.stop();
                ctx.close();
            }, 120);
        } catch  {}
        const match = products.find((p)=>(p.barcode ?? '').toLowerCase() === decodedText.toLowerCase());
        if (!match) {
            setScanStatus('missing');
            setEditing(null);
            setName('');
            setDefaultCode('');
            setSize('');
            setVariant('');
            setPrice('');
            setCostPrice('');
            setDescriptionEn('');
            setDescriptionMm('');
            setCategory('');
            setBarcode(decodedText);
            setImageFile(null);
            setImagePreviewUrl(null);
            setDialogOpen(true);
        } else {
            setScanStatus('found');
        }
        setScannerOpen(false);
    }, [
        dialogOpen,
        products,
        scanningForForm
    ]);
    const handleManualBarcode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        const value = scanManualInput.trim();
        if (!value) return;
        if (dialogOpen && scanningForForm) {
            setBarcode(value);
            setScanningForForm(false);
        } else {
            setQuery(value);
        }
        setScanManualInput('');
        setScannerOpen(false);
    }, [
        dialogOpen,
        scanManualInput,
        scanningForForm
    ]);
    const { startScanner, stopScanner, status, error: scanError, cameras, selectedCameraId, setSelectedCameraId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useBarcodeScanner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBarcodeScanner"])(onScanSuccess);
    const handleCloseScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        await stopScanner();
        setScanManualInput('');
        setScannerOpen(false);
    }, [
        stopScanner
    ]);
    const handleResetScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        await stopScanner();
        setScannerOpen(false);
        setTimeout(()=>{
            setScannerOpen(true);
        }, 300);
    }, [
        stopScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        return ()=>{
            stopScanner();
        };
    }, [
        stopScanner
    ]);
    const refreshProducts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').select(`
        id,
        product_name,
        default_code,
        barcode,
        image_url,
        category,
        variant,
        purchase_price,
        sale_price,
        stock_quantity,
        description_en,
        description_mm,
        reorder,
        remark,
        created_at
      `).order('created_at', {
            ascending: false
        });
        if (fetchError) {
            setError(fetchError.message);
            setLoading(false);
            return;
        }
        const next = data ?? [];
        setProducts(next);
        saveCache(next);
        setLoading(false);
    }, []);
    const applyOptimistic = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((next)=>{
        setProducts(next);
        saveCache(next);
    }, []);
    const resetForm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        setName('');
        setDefaultCode('');
        setSize('');
        setVariant('');
        setPrice('');
        setCostPrice('');
        setStockQuantity('');
        setDescriptionEn('');
        setDescriptionMm('');
        setCategory('');
        setBarcode('');
        setImageUrlInput('');
        setImageFile(null);
        setImagePreviewUrl(null);
        setEditing(null);
        setUploading(false);
        setScanningForForm(false);
        setDialogOpen(false);
    }, []);
    const queueAction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async (mode, productId)=>{
        const parsedCost = costPrice.trim() ? Number(costPrice) : null;
        const parsedStock = stockQuantity.trim() ? Number(stockQuantity) : null;
        const payload = {
            product_name: name.trim(),
            sale_price: Number(price),
            purchase_price: Number.isFinite(parsedCost) ? parsedCost : null,
            stock_quantity: Number.isFinite(parsedStock) ? parsedStock : null,
            default_code: defaultCode.trim() || null,
            size: size.trim() || null,
            variant: variant.trim() || null,
            description_en: descriptionEn.trim() || null,
            description_mm: descriptionMm.trim() || null,
            category: category.trim() || null,
            barcode: barcode.trim() || null
        };
        const item = {
            id: crypto.randomUUID(),
            type: 'upsert',
            mode,
            productId,
            payload,
            createdAt: Date.now()
        };
        if (imageFile) {
            const { dataUrl, mime } = await readFileAsDataUrl(imageFile);
            item.imageDataUrl = dataUrl;
            item.imageMime = mime;
        }
        const queue = loadQueue();
        queue.push(item);
        saveQueue(queue);
        const tempId = mode === 'create' ? -Date.now() : productId ?? -Date.now();
        const optimistic = {
            id: tempId,
            product_name: payload.product_name,
            default_code: payload.default_code,
            barcode: payload.barcode,
            image_url: item.imageDataUrl ?? null,
            category: payload.category,
            size: payload.size,
            variant: payload.variant,
            purchase_price: payload.purchase_price,
            sale_price: payload.sale_price,
            stock_quantity: payload.stock_quantity,
            description_en: payload.description_en,
            description_mm: payload.description_mm,
            reorder: 2,
            remark: null,
            created_at: new Date().toISOString()
        };
        if (mode === 'create') {
            applyOptimistic([
                optimistic,
                ...products
            ]);
        } else {
            applyOptimistic(products.map((p)=>p.id === productId ? {
                    ...p,
                    ...optimistic,
                    id: productId
                } : p));
        }
    }, [
        applyOptimistic,
        barcode,
        category,
        costPrice,
        defaultCode,
        descriptionEn,
        descriptionMm,
        imageFile,
        name,
        price,
        products,
        size,
        variant,
        stockQuantity,
        imageUrlInput
    ]);
    const syncQueue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!isOnline) return;
        const queue = loadQueue();
        if (queue.length === 0) return;
        setSyncing(true);
        const remaining = [];
        for (const item of queue){
            try {
                if (item.mode === 'create') {
                    const { data, error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').insert({
                        ...item.payload,
                        image_url: null
                    }).select().single();
                    if (insertError || !data) {
                        remaining.push(item);
                        continue;
                    }
                    if (item.imageDataUrl) {
                        const { blob, mime } = dataUrlToBlob(item.imageDataUrl);
                        const path = `public/product-${data.id}-${Date.now()}.jpg`;
                        const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').upload(path, blob, {
                            upsert: true,
                            contentType: mime
                        });
                        if (uploadError) {
                            setError(uploadError.message || 'Image upload failed.');
                            remaining.push({
                                ...item,
                                mode: 'update',
                                productId: data.id
                            });
                            continue;
                        }
                        const { data: publicData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').getPublicUrl(path);
                        if (!publicData?.publicUrl) {
                            setError('Image uploaded but public URL was not returned.');
                            remaining.push({
                                ...item,
                                mode: 'update',
                                productId: data.id
                            });
                            continue;
                        }
                        const imageUrl = withCacheBust(publicData.publicUrl);
                        const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
                            image_url: imageUrl
                        }).eq('id', data.id);
                        if (updateError) {
                            remaining.push({
                                ...item,
                                mode: 'update',
                                productId: data.id
                            });
                            continue;
                        }
                    }
                } else {
                    let imageUrl = null;
                    if (item.imageDataUrl && item.productId != null) {
                        const { blob, mime } = dataUrlToBlob(item.imageDataUrl);
                        const path = `public/product-${item.productId}-${Date.now()}.jpg`;
                        const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').upload(path, blob, {
                            upsert: true,
                            contentType: mime
                        });
                        if (uploadError) {
                            setError(uploadError.message || 'Image upload failed.');
                            remaining.push(item);
                            continue;
                        }
                        const { data: publicData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').getPublicUrl(path);
                        if (!publicData?.publicUrl) {
                            setError('Image uploaded but public URL was not returned.');
                            remaining.push(item);
                            continue;
                        }
                        imageUrl = withCacheBust(publicData.publicUrl);
                    }
                    const payload = {
                        ...item.payload,
                        ...imageUrl ? {
                            image_url: imageUrl
                        } : {}
                    };
                    const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update(payload).eq('id', item.productId);
                    if (updateError) {
                        remaining.push(item);
                        continue;
                    }
                }
            } catch  {
                remaining.push(item);
            }
        }
        saveQueue(remaining);
        setSyncing(false);
        await refreshProducts();
    }, [
        isOnline,
        refreshProducts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const cached = loadCache();
        if (cached.length > 0) {
            setProducts(cached);
        }
        const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
        setIsOnline(online);
        if (online) {
            refreshProducts();
        } else {
            setLoading(false);
        }
    }, [
        refreshProducts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const onOnline = ()=>{
            setIsOnline(true);
            syncQueue();
        };
        const onOffline = ()=>setIsOnline(false);
        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
        return ()=>{
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        };
    }, [
        syncQueue
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!scannerOpen) return;
        setScanStatus('scanning');
        const timeoutId = setTimeout(()=>{
            startScanner('admin-inventory-scanner', {
                preferBackCamera: true,
                facingMode: 'environment',
                fps: 20,
                qrbox: (viewfinderWidth, viewfinderHeight)=>{
                    const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7);
                    return {
                        width: size,
                        height: size
                    };
                },
                aspectRatio: 1.333
            });
        }, 500);
        return ()=>{
            clearTimeout(timeoutId);
            stopScanner();
        };
    }, [
        scannerOpen,
        selectedCameraId,
        startScanner,
        stopScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!imageFile) return;
        const url = URL.createObjectURL(imageFile);
        setImagePreviewUrl(url);
        return ()=>{
            URL.revokeObjectURL(url);
        };
    }, [
        imageFile
    ]);
    const handleToggleCamera = async ()=>{
        if (cameras.length < 2) return;
        const currentIndex = cameras.findIndex((cam)=>cam.id === selectedCameraId);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % cameras.length : 0;
        setSelectedCameraId(cameras[nextIndex].id);
        await stopScanner();
        if (scannerOpen) {
            startScanner('admin-inventory-scanner', {
                facingMode: 'environment',
                fps: 20,
                qrbox: (viewfinderWidth, viewfinderHeight)=>{
                    const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7);
                    return {
                        width: size,
                        height: size
                    };
                },
                aspectRatio: 1.333
            });
        }
    };
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p)=>{
            const nameValue = (p.product_name ?? '').toLowerCase();
            const skuValue = (p.default_code ?? '').toLowerCase();
            const barcodeValue = (p.barcode ?? '').toLowerCase();
            const categoryValue = (p.category ?? '').toLowerCase();
            const variantValue = (p.variant ?? '').toLowerCase();
            return nameValue.includes(q) || skuValue.includes(q) || barcodeValue.includes(q) || categoryValue.includes(q) || variantValue.includes(q);
        });
    }, [
        products,
        query
    ]);
    const openCreate = ()=>{
        resetForm();
        setDialogOpen(true);
    };
    const openEdit = (product)=>{
        setEditing(product);
        setName(product.product_name ?? '');
        setDefaultCode(product.default_code ?? '');
        setSize(product.size ?? '');
        setVariant(product.variant ?? '');
        setPrice(product.sale_price != null ? String(product.sale_price) : '');
        setCostPrice(product.purchase_price != null ? String(product.purchase_price) : '');
        setStockQuantity(product.stock_quantity != null ? String(product.stock_quantity) : '');
        setDescriptionEn(product.description_en ?? '');
        setDescriptionMm(product.description_mm ?? '');
        setCategory(product.category ?? '');
        setBarcode(product.barcode ?? '');
        setImageFile(null);
        setImagePreviewUrl(product.image_url ?? null);
        setDialogOpen(true);
    };
    const handleSave = async ()=>{
        if (!name.trim()) return;
        const parsedPrice = Number(price);
        const parsedCost = costPrice.trim() ? Number(costPrice) : null;
        const parsedStock = stockQuantity.trim() ? Number(stockQuantity) : null;
        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) return;
        if (parsedCost != null && (!Number.isFinite(parsedCost) || parsedCost < 0)) return;
        if (parsedStock != null && (!Number.isFinite(parsedStock) || parsedStock < 0)) return;
        setError(null);
        setSaving(true);
        const mode = editing ? 'update' : 'create';
        const productId = editing?.id;
        if (!isOnline) {
            await queueAction(mode, productId);
            setSaving(false);
            resetForm();
            return;
        }
        const payload = {
            product_name: name.trim(),
            sale_price: parsedPrice,
            purchase_price: parsedCost,
            stock_quantity: parsedStock,
            default_code: defaultCode.trim() || null,
            size: size.trim() || null,
            variant: variant.trim() || null,
            description_en: descriptionEn.trim() || null,
            description_mm: descriptionMm.trim() || null,
            category: category.trim() || null,
            barcode: barcode.trim() || null,
            image_url: imageUrlInput.trim() || null
        };
        if (mode === 'create') {
            const { data, error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').insert({
                ...payload,
                image_url: null
            }).select().single();
            if (insertError || !data) {
                setError(insertError?.message ?? 'Failed to add product.');
                setSaving(false);
                return;
            }
            let nextData = data;
            if (imageFile) {
                setUploading(true);
                const uploadResult = await uploadProductImage(data.id, imageFile);
                if (uploadResult.error || !uploadResult.url) {
                    setError(uploadResult.error ?? 'Image upload failed.');
                    setUploading(false);
                    setSaving(false);
                    return;
                }
                const { data: updated, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
                    image_url: uploadResult.url
                }).eq('id', data.id).select().single();
                if (updateError || !updated) {
                    setError(updateError?.message ?? 'Failed to update image.');
                    setUploading(false);
                    setSaving(false);
                    return;
                }
                nextData = updated;
                setImagePreviewUrl(uploadResult.url);
            }
            applyOptimistic([
                nextData,
                ...products
            ]);
        } else if (productId != null) {
            let imageUrl = editing?.image_url ?? null;
            if (imageFile) {
                setUploading(true);
                const uploadResult = await uploadProductImage(productId, imageFile);
                if (uploadResult.error || !uploadResult.url) {
                    setError(uploadResult.error ?? 'Image upload failed.');
                    setUploading(false);
                    setSaving(false);
                    return;
                }
                imageUrl = uploadResult.url;
                setImagePreviewUrl(imageUrl);
            }
            const { data, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
                ...payload,
                image_url: imageUrl
            }).eq('id', productId).select().single();
            if (updateError || !data) {
                setError(updateError?.message ?? 'Failed to update product.');
                setSaving(false);
                setUploading(false);
                return;
            }
            applyOptimistic(products.map((p)=>p.id === productId ? data : p));
        }
        setUploading(false);
        setSaving(false);
        resetForm();
    };
    const handleDelete = async (product)=>{
        if (!isAdmin) return;
        if (!isOnline) {
            setError('Offline mode. Delete will sync when online.');
            return;
        }
        const confirmed = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : false;
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const deleteError = undefined;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen max-h-[100vh] w-full flex-col gap-4 overflow-hidden bg-background p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 rounded-2xl border border-border bg-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-semibold tracking-tight",
                                        children: "Inventory Management"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 787,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: isOnline ? 'Online sync ready.' : 'Offline mode. Changes will sync later.'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 786,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-12 px-5 text-base",
                                        onClick: ()=>setScannerOpen(true),
                                        children: "Scan Barcode"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 793,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "h-12 px-5 text-base",
                                        onClick: openCreate,
                                        children: "Add Product"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 796,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 792,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 785,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value),
                                    placeholder: "Search by name, category, or barcode...",
                                    className: "h-12 rounded-xl text-base"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 803,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 802,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground",
                                children: syncing ? 'Syncing changes...' : `${filtered.length} items`
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 810,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 801,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 815,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 784,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden rounded-2xl border border-border bg-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-full overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-[980px] w-full border-collapse text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-10 bg-background/90 backdrop-blur",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-border/60 text-[11px] uppercase tracking-wide text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "ID"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 826,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Image"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 827,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 828,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "SKU"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 829,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 830,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Specification"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 831,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Barcode"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 832,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 833,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-right font-semibold",
                                            children: "Price"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 834,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-right font-semibold",
                                            children: "Action"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 835,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 825,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 824,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 10,
                                            className: "px-3 py-8 text-center text-sm text-muted-foreground",
                                            children: "Loading inventory..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 841,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 17
                                    }, this),
                                    !loading && filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 10,
                                            className: "px-3 py-8 text-center text-sm text-muted-foreground",
                                            children: "No products found."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 848,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 847,
                                        columnNumber: 17
                                    }, this),
                                    !loading && filtered.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InventoryRow, {
                                            product: product,
                                            onEdit: openEdit,
                                            onDelete: handleDelete,
                                            isAdmin: isAdmin,
                                            deleting: deletingId === product.id
                                        }, product.id, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 838,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 823,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 822,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 821,
                columnNumber: 7
            }, this),
            dialogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-[90vh] overflow-y-auto p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold",
                                                children: editing ? 'Edit Product' : 'Add Product'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 875,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: isOnline ? 'Changes sync immediately.' : 'Saved locally for later sync.'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 878,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 874,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        className: "h-9 w-9 p-0",
                                        onClick: resetForm,
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 882,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 873,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 text-sm md:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_name",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 888,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_name",
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 889,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 887,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_sku",
                                                children: "SKU (Default Code)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 897,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_sku",
                                                value: defaultCode,
                                                onChange: (e)=>setDefaultCode(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 898,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 896,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_price",
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 906,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_price",
                                                type: "number",
                                                inputMode: "decimal",
                                                value: price,
                                                onChange: (e)=>setPrice(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 907,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 905,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_cost_price",
                                                children: "Cost Price (ရင်းဈေး)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 917,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_cost_price",
                                                type: "number",
                                                inputMode: "decimal",
                                                value: costPrice,
                                                onChange: (e)=>setCostPrice(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 918,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 916,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_stock",
                                                children: "Stock Quantity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 928,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_stock",
                                                type: "number",
                                                inputMode: "numeric",
                                                value: stockQuantity,
                                                onChange: (e)=>setStockQuantity(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 929,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 927,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_spec",
                                                children: "Specification (Size/Variant)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 939,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_spec",
                                                value: specification,
                                                onChange: (e)=>setSpecification(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 940,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 938,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_category",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 948,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_category",
                                                value: category,
                                                onChange: (e)=>setCategory(e.target.value),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 949,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 947,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_barcode",
                                                children: "Barcode"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 957,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        id: "inv_barcode",
                                                        value: barcode,
                                                        onChange: (e)=>setBarcode(e.target.value),
                                                        className: "h-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 19
                                                    }, this),
                                                    !editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        type: "button",
                                                        variant: "outline",
                                                        className: "h-12 px-4",
                                                        onClick: ()=>{
                                                            setScanningForForm(true);
                                                            setScannerOpen(true);
                                                        },
                                                        children: "Scan Barcode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 958,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 956,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_desc_en",
                                                children: "Description (EN)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 981,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: "inv_desc_en",
                                                value: descriptionEn,
                                                onChange: (e)=>setDescriptionEn(e.target.value),
                                                rows: 3,
                                                className: "min-h-[72px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 982,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 980,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_desc_mm",
                                                children: "Description (MM)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 991,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: "inv_desc_mm",
                                                value: descriptionMm,
                                                onChange: (e)=>setDescriptionMm(e.target.value),
                                                rows: 3,
                                                className: "min-h-[72px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 992,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 990,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "inv_image",
                                                children: "Image"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1001,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "inv_image",
                                                type: "file",
                                                accept: "image/*",
                                                onChange: (e)=>setImageFile(e.target.files?.[0] ?? null),
                                                className: "h-12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1002,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1000,
                                        columnNumber: 15
                                    }, this),
                                    imagePreviewUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: imagePreviewUrl,
                                            alt: "Preview",
                                            className: "h-28 w-28 rounded-xl border border-border object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1012,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1011,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 886,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-destructive",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 1020,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-12 px-4",
                                        onClick: resetForm,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1022,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "h-12 px-5",
                                        onClick: handleSave,
                                        disabled: isBusy,
                                        children: isBusy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-4 w-4 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1028,
                                                    columnNumber: 21
                                                }, this),
                                                uploading ? 'Uploading...' : 'Saving...'
                                            ]
                                        }, void 0, true) : 'Save'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1025,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 1021,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 872,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 871,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 870,
                columnNumber: 9
            }, this),
            scannerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4",
                onClick: handleCloseScanner,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[95vw] max-h-[90vh] overflow-y-auto max-w-4xl rounded-2xl border border-border bg-card p-4 relative",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "absolute right-3 top-3 z-[9999] flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-foreground shadow-lg",
                            onClick: handleCloseScanner,
                            "aria-label": "Close scanner",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1044,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Manual barcode entry...",
                                            className: "h-11",
                                            value: scanManualInput,
                                            onChange: (e)=>setScanManualInput(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') {
                                                    handleManualBarcode();
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1054,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            className: "h-11 px-4",
                                            onClick: handleManualBarcode,
                                            children: "Use"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1053,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: status === 'initializing' ? 'Initializing Camera...' : status === 'scanning' ? 'Scanning...' : scanError || 'Ready'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1070,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1069,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-base font-semibold",
                                                    children: "Scan Barcode"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Point the camera at the barcode."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                cameras.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "h-12 px-4",
                                                    onClick: handleToggleCamera,
                                                    children: "Switch Camera"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1085,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "h-12 px-4",
                                                    onClick: handleResetScanner,
                                                    children: "Reset Camera"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1089,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1083,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1052,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-black relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    id: "admin-inventory-scanner",
                                    className: "h-full w-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-6 rounded-2xl border-2 border-primary/60 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1097,
                                    columnNumber: 15
                                }, this),
                                scanFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-green-400/20 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1099,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1095,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 text-xs text-muted-foreground",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: scanStatus === 'found' ? 'text-emerald-500 font-semibold' : scanStatus === 'missing' ? 'text-red-500 font-semibold' : 'text-muted-foreground',
                                children: scanStatus === 'found' ? 'Found' : scanStatus === 'missing' ? 'Not Found' : status === 'initializing' ? 'Initializing Camera...' : status === 'scanning' ? 'Scanning...' : scanError || 'Ready'
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 1103,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1102,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 1043,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 1042,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
        lineNumber: 783,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_775a1da9._.js.map