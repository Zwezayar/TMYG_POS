(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors", "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/useBarcodeScanner.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBarcodeScanner",
    ()=>useBarcodeScanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/html5-qrcode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$state$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/state-manager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2d$scanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html5-qrcode/esm/html5-qrcode-scanner.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
let globalScannerInstance = null;
function stopLocalStreamTracks() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stream = window.localStream;
    if (stream?.getTracks) {
        stream.getTracks().forEach((track)=>{
            try {
                track.stop();
            } catch  {}
        });
    }
}
async function forceStopGlobalScanner() {
    if ("TURBOPACK compile-time truthy", 1) {
        const instance = window.__html5QrCodeInstance;
        if (instance) {
            globalScannerInstance = instance;
        }
    }
    if (!globalScannerInstance) return;
    try {
        if (globalScannerInstance.getState?.() === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$state$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5QrcodeScannerState"].SCANNING) {
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
    if ("TURBOPACK compile-time truthy", 1) {
        window.__html5QrCodeInstance = null;
    }
}
function useBarcodeScanner(onScanSuccess, onScanError) {
    _s();
    const scannerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const scannerUiRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const lastStartRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const isProcessing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const instanceIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](`scanner-${Math.random().toString(36).slice(2)}`);
    const [status, setStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('idle');
    const [cameras, setCameras] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [selectedCameraId, setSelectedCameraId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](undefined);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const stopScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBarcodeScanner.useCallback[stopScanner]": async ()=>{
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
                    if (scannerRef.current.getState?.() === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$state$2d$manager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5QrcodeScannerState"].SCANNING) {
                        await scannerRef.current.stop();
                    }
                    if (typeof scannerRef.current.clear === 'function') {
                        await Promise.resolve(scannerRef.current.clear());
                    }
                    await new Promise({
                        "useBarcodeScanner.useCallback[stopScanner]": (resolve)=>setTimeout(resolve, 1000)
                    }["useBarcodeScanner.useCallback[stopScanner]"]);
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
            if ("TURBOPACK compile-time truthy", 1) {
                const state = window.__tmygScannerLockState;
                if (state?.id === instanceIdRef.current) {
                    window.__tmygScannerLockState = null;
                }
            }
            isProcessing.current = false;
        }
    }["useBarcodeScanner.useCallback[stopScanner]"], [
        status
    ]);
    const startScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBarcodeScanner.useCallback[startScanner]": async (elementId, options)=>{
            if (status === 'scanning' || status === 'initializing') {
                console.warn('Scanner is already active.');
                return;
            }
            if (isProcessing.current) {
                return;
            }
            if (scannerRef.current || scannerUiRef.current) {
                await stopScanner();
                await new Promise({
                    "useBarcodeScanner.useCallback[startScanner]": (resolve)=>setTimeout(resolve, 1000)
                }["useBarcodeScanner.useCallback[startScanner]"]);
            }
            setStatus('initializing');
            setError(null);
            const attemptStart = {
                "useBarcodeScanner.useCallback[startScanner].attemptStart": async ()=>{
                    isProcessing.current = true;
                    const now = Date.now();
                    const sinceLastStart = now - lastStartRef.current;
                    if (sinceLastStart < 500) {
                        await new Promise({
                            "useBarcodeScanner.useCallback[startScanner].attemptStart": (resolve)=>setTimeout(resolve, 500 - sinceLastStart)
                        }["useBarcodeScanner.useCallback[startScanner].attemptStart"]);
                    }
                    lastStartRef.current = Date.now();
                    if ("TURBOPACK compile-time truthy", 1) {
                        const state = window.__tmygScannerLockState;
                        if (state?.id && state.id !== instanceIdRef.current) {
                            await state.release?.();
                            window.__tmygScannerLockState = null;
                            await new Promise({
                                "useBarcodeScanner.useCallback[startScanner].attemptStart": (resolve)=>setTimeout(resolve, 1000)
                            }["useBarcodeScanner.useCallback[startScanner].attemptStart"]);
                        }
                        window.__tmygScannerLockState = {
                            id: instanceIdRef.current,
                            release: ({
                                "useBarcodeScanner.useCallback[startScanner].attemptStart": async ()=>{
                                    await stopScanner();
                                }
                            })["useBarcodeScanner.useCallback[startScanner].attemptStart"]
                        };
                    }
                    const availableCameras = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5Qrcode"].getCameras();
                    if (!availableCameras || availableCameras.length === 0) {
                        throw new Error('No cameras found.');
                    }
                    setCameras(availableCameras);
                    let cameraId = selectedCameraId;
                    if (!cameraId && options?.preferBackCamera) {
                        const backCamera = availableCameras.find({
                            "useBarcodeScanner.useCallback[startScanner].attemptStart.backCamera": (camera)=>/back|rear|environment/i.test(camera.label || '')
                        }["useBarcodeScanner.useCallback[startScanner].attemptStart.backCamera"]);
                        cameraId = backCamera?.id;
                    }
                    if (!cameraId) {
                        cameraId = availableCameras[0].id;
                    }
                    setSelectedCameraId(cameraId);
                    const scanConfig = {
                        fps: options?.fps ?? 12,
                        qrbox: options?.qrbox ?? ({
                            "useBarcodeScanner.useCallback[startScanner].attemptStart": (viewfinderWidth, viewfinderHeight)=>{
                                const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7);
                                return {
                                    width: size,
                                    height: size
                                };
                            }
                        })["useBarcodeScanner.useCallback[startScanner].attemptStart"]
                    };
                    if (options?.preferBackCamera || options?.facingMode) {
                        await forceStopGlobalScanner();
                        stopLocalStreamTracks();
                        const html5Qrcode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5Qrcode"](elementId, {
                            verbose: false
                        });
                        globalScannerInstance = html5Qrcode;
                        if ("TURBOPACK compile-time truthy", 1) {
                            window.__html5QrCodeInstance = html5Qrcode;
                        }
                        scannerRef.current = html5Qrcode;
                        const cameraSource = {
                            facingMode: 'environment'
                        };
                        await html5Qrcode.start(cameraSource, scanConfig, {
                            "useBarcodeScanner.useCallback[startScanner].attemptStart": async (decodedText, result)=>{
                                await stopScanner();
                                onScanSuccess(decodedText, result);
                            }
                        }["useBarcodeScanner.useCallback[startScanner].attemptStart"], {
                            "useBarcodeScanner.useCallback[startScanner].attemptStart": (errorMessage)=>{
                                if (/NotFoundException|No MultiFormat Readers were able to detect/.test(errorMessage)) {
                                    return;
                                }
                                onScanError?.(errorMessage);
                            }
                        }["useBarcodeScanner.useCallback[startScanner].attemptStart"]);
                        if ("TURBOPACK compile-time truthy", 1) {
                            const video = document.querySelector(`#${elementId} video`);
                            if (video?.srcObject) {
                                window.localStream = video.srcObject;
                            }
                        }
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
                        const ui = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html5$2d$qrcode$2f$esm$2f$html5$2d$qrcode$2d$scanner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html5QrcodeScanner"](elementId, config, false);
                        scannerUiRef.current = ui;
                        ui.render({
                            "useBarcodeScanner.useCallback[startScanner].attemptStart": async (decodedText, result)=>{
                                await stopScanner();
                                onScanSuccess(decodedText, result);
                            }
                        }["useBarcodeScanner.useCallback[startScanner].attemptStart"], {
                            "useBarcodeScanner.useCallback[startScanner].attemptStart": (errorMessage)=>{
                                if (/NotFoundException|No MultiFormat Readers were able to detect/.test(errorMessage)) {
                                    return;
                                }
                                onScanError?.(errorMessage);
                            }
                        }["useBarcodeScanner.useCallback[startScanner].attemptStart"]);
                    }
                    setStatus('scanning');
                    isProcessing.current = false;
                }
            }["useBarcodeScanner.useCallback[startScanner].attemptStart"];
            try {
                await attemptStart();
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                if (/AbortError/.test(errorMessage)) {
                    if (isProcessing.current) {
                        isProcessing.current = false;
                    }
                    await new Promise({
                        "useBarcodeScanner.useCallback[startScanner]": (resolve)=>setTimeout(resolve, 500)
                    }["useBarcodeScanner.useCallback[startScanner]"]);
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
        }
    }["useBarcodeScanner.useCallback[startScanner]"], [
        onScanSuccess,
        onScanError,
        selectedCameraId,
        status,
        stopScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBarcodeScanner.useEffect": ()=>{
            return ({
                "useBarcodeScanner.useEffect": ()=>{
                    stopScanner();
                }
            })["useBarcodeScanner.useEffect"];
        }
    }["useBarcodeScanner.useEffect"], [
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
_s(useBarcodeScanner, "keIbxh5o1XbYy1XUeTdopiQRxx4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/image.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compressImageFile",
    ()=>compressImageFile
]);
async function compressImageFile(file, maxSize = 500) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!file.type.startsWith("image/")) {
        return file;
    }
    const imageUrl = URL.createObjectURL(file);
    try {
        const image = await loadImage(imageUrl);
        const { width, height } = image;
        const scale = Math.min(maxSize / width, maxSize / height, 1);
        const targetWidth = Math.round(width * scale);
        const targetHeight = Math.round(height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return file;
        }
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
        const blob = await new Promise((resolve)=>{
            canvas.toBlob((result)=>{
                resolve(result);
            }, "image/jpeg", 0.7);
        });
        return blob ?? file;
    } finally{
        URL.revokeObjectURL(imageUrl);
    }
}
function loadImage(src) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>resolve(img);
        img.onerror = (err)=>reject(err);
        img.src = src;
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(dashboard)/admin/inventory/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminInventoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useBarcodeScanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useBarcodeScanner.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/image.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch  {
        return [];
    }
}
function saveQueue(items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
}
function loadCache() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch  {
        return [];
    }
}
function saveCache(items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(items));
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
const InventoryRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](function InventoryRow({ product, onEdit, onDelete, isAdmin, deleting }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-t border-border/40 hover:bg-secondary/40 h-[48px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 font-mono text-[11px] text-muted-foreground",
                children: product.id
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3",
                children: product.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[12px] font-medium",
                children: product.product_name || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.default_code || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.category || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.variant || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.barcode || '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-[11px] text-muted-foreground",
                children: product.stock_quantity ?? '—'
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-right text-[12px] font-semibold",
                children: formatPrice(product.sale_price)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-3 text-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
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
                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
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
_c = InventoryRow;
function AdminInventoryPage() {
    _s();
    const { role } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardAuth"])();
    const isAdmin = role === 'admin';
    const [products, setProducts] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [query, setQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [isOnline, setIsOnline] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const [syncing, setSyncing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [scannerOpen, setScannerOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [dialogOpen, setDialogOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [editing, setEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [name, setName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [defaultCode, setDefaultCode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [size, setSize] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [variant, setVariant] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [price, setPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [costPrice, setCostPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [stockQuantity, setStockQuantity] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [descriptionEn, setDescriptionEn] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [descriptionMm, setDescriptionMm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [category, setCategory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [barcode, setBarcode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [remark, setRemark] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [imageFile, setImageFile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [imagePreviewUrl, setImagePreviewUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [imageUrlInput, setImageUrlInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [saving, setSaving] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [uploading, setUploading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [deletingId, setDeletingId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [scanFlash, setScanFlash] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [scanStatus, setScanStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('scanning');
    const [scanManualInput, setScanManualInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [scanningForForm, setScanningForForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const isBusy = saving || uploading;
    const uploadProductImage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[uploadProductImage]": async (productId, file)=>{
            const compressed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImageFile"])(file, 600);
            const path = `public/product-${productId}-${Date.now()}.jpg`;
            const contentType = compressed.type || 'image/jpeg';
            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').upload(path, compressed, {
                upsert: true,
                contentType
            });
            if (uploadError) {
                return {
                    error: uploadError.message || 'Image upload failed.'
                };
            }
            const { data: publicData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').getPublicUrl(path);
            if (!publicData?.publicUrl) {
                return {
                    error: 'Image uploaded but public URL was not returned.'
                };
            }
            return {
                url: withCacheBust(publicData.publicUrl)
            };
        }
    }["AdminInventoryPage.useCallback[uploadProductImage]"], []);
    const onScanSuccess = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[onScanSuccess]": (decodedText)=>{
            if (dialogOpen && scanningForForm) {
                setBarcode(decodedText);
                setScanStatus('found');
                setScanningForForm(false);
                setScannerOpen(false);
                return;
            }
            setQuery(decodedText);
            setScanFlash(true);
            setTimeout({
                "AdminInventoryPage.useCallback[onScanSuccess]": ()=>setScanFlash(false)
            }["AdminInventoryPage.useCallback[onScanSuccess]"], 150);
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
                setTimeout({
                    "AdminInventoryPage.useCallback[onScanSuccess]": ()=>{
                        osc.stop();
                        ctx.close();
                    }
                }["AdminInventoryPage.useCallback[onScanSuccess]"], 120);
            } catch  {}
            const match = products.find({
                "AdminInventoryPage.useCallback[onScanSuccess].match": (p)=>(p.barcode ?? '').toLowerCase() === decodedText.toLowerCase()
            }["AdminInventoryPage.useCallback[onScanSuccess].match"]);
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
        }
    }["AdminInventoryPage.useCallback[onScanSuccess]"], [
        dialogOpen,
        products,
        scanningForForm
    ]);
    const handleManualBarcode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[handleManualBarcode]": ()=>{
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
        }
    }["AdminInventoryPage.useCallback[handleManualBarcode]"], [
        dialogOpen,
        scanManualInput,
        scanningForForm
    ]);
    const { startScanner, stopScanner, status, error: scanError, cameras, selectedCameraId, setSelectedCameraId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useBarcodeScanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBarcodeScanner"])(onScanSuccess);
    const handleCloseScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[handleCloseScanner]": async ()=>{
            await stopScanner();
            setScanManualInput('');
            setScannerOpen(false);
        }
    }["AdminInventoryPage.useCallback[handleCloseScanner]"], [
        stopScanner
    ]);
    const handleResetScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[handleResetScanner]": async ()=>{
            await stopScanner();
            setScannerOpen(false);
            setTimeout({
                "AdminInventoryPage.useCallback[handleResetScanner]": ()=>{
                    setScannerOpen(true);
                }
            }["AdminInventoryPage.useCallback[handleResetScanner]"], 300);
        }
    }["AdminInventoryPage.useCallback[handleResetScanner]"], [
        stopScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AdminInventoryPage.useEffect": ()=>{
            return ({
                "AdminInventoryPage.useEffect": ()=>{
                    stopScanner();
                }
            })["AdminInventoryPage.useEffect"];
        }
    }["AdminInventoryPage.useEffect"], [
        stopScanner
    ]);
    const refreshProducts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[refreshProducts]": async ()=>{
            setLoading(true);
            setError(null);
            const { data, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').select(`
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
        }
    }["AdminInventoryPage.useCallback[refreshProducts]"], []);
    const applyOptimistic = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[applyOptimistic]": (next)=>{
            setProducts(next);
            saveCache(next);
        }
    }["AdminInventoryPage.useCallback[applyOptimistic]"], []);
    const resetForm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[resetForm]": ()=>{
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
            setRemark('');
            setImageFile(null);
            setImagePreviewUrl(null);
            setEditing(null);
            setUploading(false);
            setScanningForForm(false);
            setDialogOpen(false);
        }
    }["AdminInventoryPage.useCallback[resetForm]"], []);
    const queueAction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[queueAction]": async (mode, productId)=>{
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
                barcode: barcode.trim() || null,
                image_url: imageUrlInput.trim() || null,
                remark: remark.trim() || null
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
                image_url: item.imageDataUrl ?? payload.image_url ?? null,
                category: payload.category,
                size: payload.size,
                variant: payload.variant,
                purchase_price: payload.purchase_price,
                sale_price: payload.sale_price,
                stock_quantity: payload.stock_quantity,
                description_en: payload.description_en,
                description_mm: payload.description_mm,
                reorder: 2,
                remark: payload.remark,
                created_at: new Date().toISOString()
            };
            if (mode === 'create') {
                applyOptimistic([
                    optimistic,
                    ...products
                ]);
            } else {
                applyOptimistic(products.map({
                    "AdminInventoryPage.useCallback[queueAction]": (p)=>p.id === productId ? {
                            ...p,
                            ...optimistic,
                            id: productId
                        } : p
                }["AdminInventoryPage.useCallback[queueAction]"]));
            }
        }
    }["AdminInventoryPage.useCallback[queueAction]"], [
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
    const syncQueue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "AdminInventoryPage.useCallback[syncQueue]": async ()=>{
            if (!isOnline) return;
            const queue = loadQueue();
            if (queue.length === 0) return;
            setSyncing(true);
            const remaining = [];
            for (const item of queue){
                try {
                    if (item.mode === 'create') {
                        const { data, error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').insert({
                            ...item.payload,
                            image_url: item.imageDataUrl ? null : item.payload.image_url ?? null
                        }).select().single();
                        if (insertError || !data) {
                            remaining.push(item);
                            continue;
                        }
                        if (item.imageDataUrl) {
                            const { blob, mime } = dataUrlToBlob(item.imageDataUrl);
                            const path = `public/product-${data.id}-${Date.now()}.jpg`;
                            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').upload(path, blob, {
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
                            const { data: publicData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').getPublicUrl(path);
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
                            const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
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
                            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').upload(path, blob, {
                                upsert: true,
                                contentType: mime
                            });
                            if (uploadError) {
                                setError(uploadError.message || 'Image upload failed.');
                                remaining.push(item);
                                continue;
                            }
                            const { data: publicData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].storage.from('product-images').getPublicUrl(path);
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
                        const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update(payload).eq('id', item.productId);
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
        }
    }["AdminInventoryPage.useCallback[syncQueue]"], [
        isOnline,
        refreshProducts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AdminInventoryPage.useEffect": ()=>{
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
        }
    }["AdminInventoryPage.useEffect"], [
        refreshProducts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AdminInventoryPage.useEffect": ()=>{
            const onOnline = {
                "AdminInventoryPage.useEffect.onOnline": ()=>{
                    setIsOnline(true);
                    syncQueue();
                }
            }["AdminInventoryPage.useEffect.onOnline"];
            const onOffline = {
                "AdminInventoryPage.useEffect.onOffline": ()=>setIsOnline(false)
            }["AdminInventoryPage.useEffect.onOffline"];
            window.addEventListener('online', onOnline);
            window.addEventListener('offline', onOffline);
            return ({
                "AdminInventoryPage.useEffect": ()=>{
                    window.removeEventListener('online', onOnline);
                    window.removeEventListener('offline', onOffline);
                }
            })["AdminInventoryPage.useEffect"];
        }
    }["AdminInventoryPage.useEffect"], [
        syncQueue
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AdminInventoryPage.useEffect": ()=>{
            if (!scannerOpen) return;
            setScanStatus('scanning');
            const timeoutId = setTimeout({
                "AdminInventoryPage.useEffect.timeoutId": ()=>{
                    startScanner('admin-inventory-scanner', {
                        preferBackCamera: true,
                        facingMode: 'environment',
                        fps: 20,
                        qrbox: {
                            "AdminInventoryPage.useEffect.timeoutId": (viewfinderWidth, viewfinderHeight)=>{
                                const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7);
                                return {
                                    width: size,
                                    height: size
                                };
                            }
                        }["AdminInventoryPage.useEffect.timeoutId"],
                        aspectRatio: 1.333
                    });
                }
            }["AdminInventoryPage.useEffect.timeoutId"], 500);
            return ({
                "AdminInventoryPage.useEffect": ()=>{
                    clearTimeout(timeoutId);
                    stopScanner();
                }
            })["AdminInventoryPage.useEffect"];
        }
    }["AdminInventoryPage.useEffect"], [
        scannerOpen,
        selectedCameraId,
        startScanner,
        stopScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "AdminInventoryPage.useEffect": ()=>{
            if (imageFile) {
                const url = URL.createObjectURL(imageFile);
                setImagePreviewUrl(url);
                return ({
                    "AdminInventoryPage.useEffect": ()=>{
                        URL.revokeObjectURL(url);
                    }
                })["AdminInventoryPage.useEffect"];
            }
            const trimmed = imageUrlInput.trim();
            if (trimmed) {
                setImagePreviewUrl(trimmed);
                return;
            }
            setImagePreviewUrl(null);
        }
    }["AdminInventoryPage.useEffect"], [
        imageFile,
        imageUrlInput
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
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "AdminInventoryPage.useMemo[filtered]": ()=>{
            const q = query.trim().toLowerCase();
            if (!q) return products;
            return products.filter({
                "AdminInventoryPage.useMemo[filtered]": (p)=>{
                    const nameValue = (p.product_name ?? '').toLowerCase();
                    const skuValue = (p.default_code ?? '').toLowerCase();
                    const barcodeValue = (p.barcode ?? '').toLowerCase();
                    const categoryValue = (p.category ?? '').toLowerCase();
                    const variantValue = (p.variant ?? '').toLowerCase();
                    return nameValue.includes(q) || skuValue.includes(q) || barcodeValue.includes(q) || categoryValue.includes(q) || variantValue.includes(q);
                }
            }["AdminInventoryPage.useMemo[filtered]"]);
        }
    }["AdminInventoryPage.useMemo[filtered]"], [
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
        setRemark(product.remark ?? '');
        setImageFile(null);
        setImageUrlInput(product.image_url ?? '');
        setImagePreviewUrl(product.image_url ?? null);
        setDialogOpen(true);
    };
    const handleSave = async ()=>{
        if (!name.trim()) {
            setError('Product name is required.');
            return;
        }
        const parsedPrice = Number(price);
        const parsedCost = costPrice.trim() ? Number(costPrice) : null;
        const parsedStock = stockQuantity.trim() ? Number(stockQuantity) : null;
        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
            setError('Sale price must be a non-negative number.');
            return;
        }
        if (parsedCost != null && (!Number.isFinite(parsedCost) || parsedCost < 0)) {
            setError('Purchase price must be a non-negative number.');
            return;
        }
        if (parsedStock != null && (!Number.isFinite(parsedStock) || parsedStock < 0)) {
            setError('Stock quantity must be a non-negative number.');
            return;
        }
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
            const { data, error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').insert({
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
                const { data: updated, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
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
            const { data, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
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
        const confirmed = ("TURBOPACK compile-time truthy", 1) ? window.confirm('Delete this product?') : "TURBOPACK unreachable";
        if (!confirmed) return;
        setDeletingId(product.id);
        const { error: deleteError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').delete().eq('id', product.id);
        if (deleteError) {
            setError(deleteError.message);
            setDeletingId(null);
            return;
        }
        applyOptimistic(products.filter((p)=>p.id !== product.id));
        setDeletingId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen max-h-[100vh] w-full flex-col gap-4 overflow-hidden bg-background p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 rounded-2xl border border-border bg-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-semibold tracking-tight",
                                        children: "Inventory Management"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 811,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: isOnline ? 'Online sync ready.' : 'Offline mode. Changes will sync later.'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 812,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 810,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-12 px-5 text-base",
                                        onClick: ()=>setScannerOpen(true),
                                        children: "Scan Barcode"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 817,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "h-12 px-5 text-base",
                                        onClick: openCreate,
                                        children: "Add Product"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 820,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 816,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 809,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value),
                                    placeholder: "Search by name, category, or barcode...",
                                    className: "h-12 rounded-xl text-base"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 827,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 826,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground",
                                children: syncing ? 'Syncing changes...' : `${filtered.length} items`
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 834,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 825,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 839,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 808,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden rounded-2xl border border-border bg-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-full overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-[980px] w-full border-collapse text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "sticky top-0 z-10 bg-background/90 backdrop-blur",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-border/60 text-[11px] uppercase tracking-wide text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "ID"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 850,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Image"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 851,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 852,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "SKU"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 853,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 854,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Specification"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Barcode"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 856,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-left font-semibold",
                                            children: "Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 857,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-right font-semibold",
                                            children: "Price"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 858,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-3 py-3 text-right font-semibold",
                                            children: "Action"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 859,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 849,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 848,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 10,
                                            className: "px-3 py-8 text-center text-sm text-muted-foreground",
                                            children: "Loading inventory..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 865,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 864,
                                        columnNumber: 17
                                    }, this),
                                    !loading && filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 10,
                                            className: "px-3 py-8 text-center text-sm text-muted-foreground",
                                            children: "No products found."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 872,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 17
                                    }, this),
                                    !loading && filtered.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InventoryRow, {
                                            product: product,
                                            onEdit: openEdit,
                                            onDelete: handleDelete,
                                            isAdmin: isAdmin,
                                            deleting: deletingId === product.id
                                        }, product.id, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 879,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 862,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 847,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 846,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 845,
                columnNumber: 7
            }, this),
            dialogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-[90vh] overflow-y-auto p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between border-b border-border/60 pb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-base font-bold",
                                                children: editing ? 'Edit Product' : 'Add Product'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 899,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-semibold uppercase text-muted-foreground",
                                                        children: "Barcode:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 901,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: barcode,
                                                        onChange: (e)=>setBarcode(e.target.value),
                                                        className: "h-8 w-40 text-[11px] font-mono rounded-lg",
                                                        placeholder: "Manual Barcode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 902,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 900,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 898,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        className: "h-[44px] px-4 rounded-xl",
                                        onClick: resetForm,
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 910,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 897,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                children: "Product Name *"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 916,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                placeholder: "Essential Face Cream",
                                                className: "h-[44px] rounded-xl",
                                                autoComplete: "off"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 919,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 915,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 md:grid-cols-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "SKU"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 929,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: defaultCode,
                                                        onChange: (e)=>setDefaultCode(e.target.value),
                                                        placeholder: "SKU-001",
                                                        className: "h-[44px] rounded-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 928,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "Size"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 940,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: size,
                                                        onChange: (e)=>setSize(e.target.value),
                                                        placeholder: "250ml",
                                                        className: "h-[44px] rounded-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 943,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 939,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "Variant"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: variant,
                                                        onChange: (e)=>setVariant(e.target.value),
                                                        placeholder: "Lavender",
                                                        className: "h-[44px] rounded-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 954,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 950,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 927,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 965,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: category,
                                                    onChange: (e)=>setCategory(e.target.value),
                                                    placeholder: "Skin Care",
                                                    className: "h-[44px] rounded-xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 968,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 964,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 963,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "Purchase Price (Ks)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: costPrice,
                                                        onChange: (e)=>setCostPrice(e.target.value),
                                                        type: "number",
                                                        inputMode: "decimal",
                                                        placeholder: "0",
                                                        className: "h-[44px] rounded-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 982,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 978,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "Sale Price (Ks) *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 992,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: price,
                                                        onChange: (e)=>setPrice(e.target.value),
                                                        type: "number",
                                                        inputMode: "decimal",
                                                        placeholder: "0",
                                                        className: "h-[44px] rounded-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 995,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 991,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 977,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                children: "Stock Quantity *"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1007,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: stockQuantity,
                                                onChange: (e)=>setStockQuantity(e.target.value),
                                                type: "number",
                                                inputMode: "numeric",
                                                placeholder: "0",
                                                className: "h-[44px] rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1010,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1006,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                children: "Image URL"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1021,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: imageUrlInput,
                                                onChange: (e)=>setImageUrlInput(e.target.value),
                                                placeholder: "https://example.com/item.jpg",
                                                className: "h-[44px] rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1024,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1020,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                children: "Image Upload"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1032,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "file",
                                                accept: "image/*",
                                                onChange: (e)=>setImageFile(e.target.files?.[0] ?? null),
                                                className: "h-[44px] rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1031,
                                        columnNumber: 17
                                    }, this),
                                    imagePreviewUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: imagePreviewUrl,
                                            alt: "Preview",
                                            className: "h-28 w-28 rounded-xl border border-border object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1044,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1043,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 md:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "Description (EN)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 1054,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: descriptionEn,
                                                        onChange: (e)=>setDescriptionEn(e.target.value),
                                                        className: "min-h-[90px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                                        placeholder: "Product details..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 1057,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1053,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                        children: "Description (MM)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 1065,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: descriptionMm,
                                                        onChange: (e)=>setDescriptionMm(e.target.value),
                                                        className: "min-h-[90px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                                        placeholder: "မြန်မာစာ ဖော်ပြချက်..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                        lineNumber: 1068,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1064,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1052,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                children: "Remark"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1078,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: remark,
                                                onChange: (e)=>setRemark(e.target.value),
                                                placeholder: "Notes / Batch number",
                                                className: "h-[44px] rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1077,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 914,
                                columnNumber: 15
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-destructive",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 1089,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-12 px-4",
                                        onClick: resetForm,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1091,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "h-12 px-5",
                                        onClick: handleSave,
                                        disabled: isBusy,
                                        children: isBusy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-4 w-4 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1097,
                                                    columnNumber: 21
                                                }, this),
                                                uploading ? 'Uploading...' : 'Saving...'
                                            ]
                                        }, void 0, true) : 'Save'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 1090,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                        lineNumber: 896,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 895,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 894,
                columnNumber: 9
            }, this),
            scannerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4",
                onClick: handleCloseScanner,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[95vw] max-h-[90vh] overflow-y-auto max-w-4xl rounded-2xl border border-border bg-card p-4 relative",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "absolute right-3 top-3 z-[9999] flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-foreground shadow-lg",
                            onClick: handleCloseScanner,
                            "aria-label": "Close scanner",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
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
                                            lineNumber: 1123,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            className: "h-11 px-4",
                                            onClick: handleManualBarcode,
                                            children: "Use"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: status === 'initializing' ? 'Initializing Camera...' : status === 'scanning' ? 'Scanning...' : scanError || 'Ready'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                        lineNumber: 1139,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-base font-semibold",
                                                    children: "Scan Barcode"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1149,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Point the camera at the barcode."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1150,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1148,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                cameras.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "h-12 px-4",
                                                    onClick: handleToggleCamera,
                                                    children: "Switch Camera"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1154,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "h-12 px-4",
                                                    onClick: handleResetScanner,
                                                    children: "Reset Camera"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                                    lineNumber: 1158,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                            lineNumber: 1152,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1147,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1121,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 h-[26vh] overflow-hidden rounded-2xl bg-black relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    id: "admin-inventory-scanner",
                                    className: "h-full w-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1165,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-6 rounded-2xl border-2 border-primary/60 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1166,
                                    columnNumber: 15
                                }, this),
                                scanFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-green-400/20 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1164,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 text-xs text-muted-foreground",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: scanStatus === 'found' ? 'text-emerald-500 font-semibold' : scanStatus === 'missing' ? 'text-red-500 font-semibold' : 'text-muted-foreground',
                                children: scanStatus === 'found' ? 'Found' : scanStatus === 'missing' ? 'Not Found' : status === 'initializing' ? 'Initializing Camera...' : status === 'scanning' ? 'Scanning...' : scanError || 'Ready'
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                                lineNumber: 1172,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                            lineNumber: 1171,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                    lineNumber: 1112,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
                lineNumber: 1111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/admin/inventory/page.tsx",
        lineNumber: 807,
        columnNumber: 5
    }, this);
}
_s(AdminInventoryPage, "noJK/uMvFFPMhBpcYwi3TJbkAJM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useBarcodeScanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBarcodeScanner"]
    ];
});
_c1 = AdminInventoryPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "InventoryRow");
__turbopack_context__.k.register(_c1, "AdminInventoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_392f2a9e._.js.map