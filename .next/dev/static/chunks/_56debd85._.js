(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/useProducts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProducts",
    ()=>useProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useProducts() {
    _s();
    const [products, setProducts] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const fetchProducts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useProducts.useCallback[fetchProducts]": async ()=>{
            setLoading(true);
            setError(null);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').select(`
        id,
        product_name,
        default_code,
        barcode,
        image_url,
        category,
        size,
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
            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }
            setProducts(data ?? []);
            setLoading(false);
        }
    }["useProducts.useCallback[fetchProducts]"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useProducts.useEffect": ()=>{
            fetchProducts();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].channel('products-changes').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'products'
            }, {
                "useProducts.useEffect.channel": ()=>{
                    fetchProducts();
                }
            }["useProducts.useEffect.channel"]).subscribe();
            return ({
                "useProducts.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].removeChannel(channel);
                }
            })["useProducts.useEffect"];
        }
    }["useProducts.useEffect"], [
        fetchProducts
    ]);
    return {
        products,
        loading,
        error,
        refresh: fetchProducts
    };
}
_s(useProducts, "B0cKykw2W1YWdIApKYQsi4osLNc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/lib/useCategories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCategories",
    ()=>useCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useCategories() {
    _s();
    const [categories, setCategories] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const fetchCategories = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useCategories.useCallback[fetchCategories]": async ()=>{
            setLoading(true);
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('categories').select('*').order('name');
            setCategories(data ?? []);
            setLoading(false);
        }
    }["useCategories.useCallback[fetchCategories]"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useCategories.useEffect": ()=>{
            fetchCategories();
        }
    }["useCategories.useEffect"], [
        fetchCategories
    ]);
    return {
        categories,
        loading,
        refresh: fetchCategories
    };
}
_s(useCategories, "9COGWhxC74tZNijNUiikOE6FDLs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(dashboard)/pos/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PosPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useProducts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useProducts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/image.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript) <export default as Waves>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wind.js [app-client] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useCategories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
;
const normalizeBarcode = (bc)=>bc?.trim() || "";
const formatPrice = (price)=>{
    return new Intl.NumberFormat("en-US").format(price) + " Ks";
};
const formatStaffName = (value)=>{
    if (!value) return null;
    const base = value.split('@')[0]?.trim();
    if (!base) return null;
    return base.charAt(0).toUpperCase() + base.slice(1);
};
// Helper function to validate and format image URLs
const getValidImageUrl = (url)=>{
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:') || url.includes('supabase.co/storage')) {
        return url;
    }
    if (url.startsWith('/')) {
        return url;
    }
    return null;
};
// --- Icons Map for Categories ---
const iconMap = {
    Sparkles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
    Droplets: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"],
    Wind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"],
    Palette: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"],
    Scissors: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"]
};
// Redundant NavSidebar removed since navigation is now centrally located in App Sidebar.
function ProductCard({ product, onAddToCart, onClick }) {
    _s();
    const stock = product.stock_quantity ?? 0;
    const isOutOfStock = stock <= 0;
    const [imgError, setImgError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const finalImageUrl = getValidImageUrl(product.image_url);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>onClick(product),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex flex-col rounded-xl border border-border bg-card p-2 text-left transition-all relative overflow-hidden h-auto min-h-[280px] cursor-pointer touch-manipulation", isOutOfStock ? "opacity-60" : "hover:border-primary/30 hover:shadow-lg"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-32 w-full overflow-hidden rounded-md bg-muted flex items-center justify-center shrink-0 flex-none",
                children: [
                    finalImageUrl && !imgError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: finalImageUrl,
                        alt: product.product_name || '',
                        className: "h-full w-full object-cover transition-transform group-hover:scale-105",
                        onError: ()=>setImgError(true)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center h-full w-full text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                className: "h-8 w-8 opacity-30 mb-1"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase font-medium",
                                children: "No Image"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    isOutOfStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-destructive text-white text-[9px] font-black uppercase px-2 py-1 rounded",
                            children: "Sold Out"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col min-w-0 justify-between pt-2 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "line-clamp-3 min-h-[3.5rem] text-[12px] font-bold leading-tight text-foreground group-hover:text-primary transition-colors",
                        children: product.product_name || '—'
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 mt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-muted-foreground truncate",
                                children: product.variant || (product.default_code ? `SKU: ${product.default_code}` : 'Standard')
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-black text-[#8B5CF6]",
                                        children: formatPrice(product.sale_price ?? 0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-bold px-1.5 py-0.5 rounded-md", stock > 0 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"),
                                        children: [
                                            stock,
                                            " left"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                if (!isOutOfStock) onAddToCart(product);
                            },
                            disabled: isOutOfStock,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full h-[44px] items-center justify-center gap-2 rounded-lg text-[12px] font-black transition-all border-none touch-manipulation shadow-sm active:scale-95", isOutOfStock ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                "Add to Cart"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/pos/page.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(ProductCard, "0doYx/lFKmVVbvtO/eWR8SJrtgo=");
_c = ProductCard;
const MemoProductCard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](ProductCard);
_c1 = MemoProductCard;
function ProductArea({ products, query, onQueryChange, onScanClick, onAddToCart, onProductClick, categories, activeCategory, onCategoryChange, loading, missingBarcode, onQuickAdd }) {
    _s1();
    const [isCategoryOpen, setCategoryOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-1 flex-col min-h-0 overflow-hidden bg-background/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[72px] flex items-center border-b border-border bg-card px-4 gap-2 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>setCategoryOpen(!isCategoryOpen),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-[48px] px-3 gap-1.5 rounded-xl border-border transition-all font-bold active:scale-95 shadow-sm min-w-[100px]", activeCategory ? "border-primary text-primary" : "text-muted-foreground"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate max-w-[60px] hidden sm:inline-block text-[13px]",
                                        children: activeCategory || "Category"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate max-w-[60px] sm:hidden text-[13px]",
                                        children: activeCategory || "Cat"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 transition-transform ml-auto", isCategoryOpen && "rotate-90")
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            isCategoryOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed inset-0 z-40",
                                        onClick: ()=>setCategoryOpen(false)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-full mt-2 z-50 w-64 rounded-xl border border-border bg-card shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        onCategoryChange(null);
                                                        setCategoryOpen(false);
                                                    },
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-bold transition-colors", activeCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 21
                                                        }, this),
                                                        "All Products"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, this),
                                                categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            onCategoryChange(cat.name);
                                                            setCategoryOpen(false);
                                                        },
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-bold transition-colors text-left", activeCategory === cat.name ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"),
                                                        children: cat.name
                                                    }, cat.id, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 items-center gap-2 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1 min-w-[140px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "text",
                                        placeholder: "Search...",
                                        value: query,
                                        onChange: (e)=>onQueryChange(e.target.value),
                                        className: "h-[48px] w-full rounded-xl border border-border bg-muted/30 pl-10 pr-8 text-base focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all font-medium"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 13
                                    }, this),
                                    query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onQueryChange(''),
                                        className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none p-1.5 transition-colors touch-manipulation",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: onScanClick,
                                className: "h-[48px] px-3 sm:px-4 gap-2 rounded-xl border-border hover:bg-muted hover:border-primary/30 text-muted-foreground hover:text-primary transition-all font-bold transition-all active:scale-95 shadow-sm shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden min-[800px]:inline text-xs",
                                        children: "Scan"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            missingBarcode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-b border-border bg-card/80 flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium",
                        children: [
                            "Barcode not found: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: missingBarcode
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 318,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "h-[48px] px-5",
                        onClick: onQuickAdd,
                        children: "Quick Add"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 320,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 316,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto bg-background p-3 sm:p-4 custom-scrollbar",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-8 w-8 animate-spin text-primary/50"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 329,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 328,
                    columnNumber: 11
                }, this) : products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 min-[800px]:grid-cols-3 gap-3 pb-20",
                    children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemoProductCard, {
                            product: product,
                            onAddToCart: onAddToCart,
                            onClick: onProductClick
                        }, product.id, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 334,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 332,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full flex-col items-center justify-center text-muted-foreground p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-full bg-muted mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                className: "h-8 w-8 opacity-20"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 345,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 344,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-bold",
                            children: "No products found"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs opacity-60",
                            children: "Try adjusting your search or category"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 343,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/pos/page.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_s1(ProductArea, "gMxxHxZwVgibw1Pn5elO23jeqMY=");
_c2 = ProductArea;
const MemoProductArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](ProductArea);
_c3 = MemoProductArea;
function CartSidebar({ cart, onUpdateQuantity, onUpdatePrice, onRemoveItem, totalAmount, customerName, onCustomerNameChange, customerPhone, onCustomerPhoneChange, customerAddress, onCustomerAddressChange, customerMatch, saleType, onSaleTypeChange, paymentMethod, onPaymentMethodChange, courierName, onCourierNameChange, deliFee, onDeliFeeChange, isBagoSpecial, onBagoSpecialChange, remark, onRemarkChange, onCheckout, isCheckingOut, canCheckout, checkoutError, collapsed, onToggleCollapse, onClearCart, checkoutMode, onToggleCheckout }) {
    _s2();
    const [editingId, setEditingId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [editPrice, setEditPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("");
    const invoiceId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CartSidebar.useMemo[invoiceId]": ()=>{
            const now = new Date();
            const yy = String(now.getFullYear()).slice(-2);
            const mm = String(now.getMonth() + 1).padStart(2, "0");
            const dd = String(now.getDate()).padStart(2, "0");
            const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
            return `INV-${yy}${mm}${dd}-${seq}`;
        }
    }["CartSidebar.useMemo[invoiceId]"], []);
    const saleTypeValue = saleType;
    const formatDateTime = ()=>{
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).format(new Date());
    };
    const paymentMethodsList = [
        {
            id: "cash",
            label: "Cash",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"]
        },
        {
            id: "kpay",
            label: "KPay",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"]
        },
        {
            id: "wave",
            label: "Wave",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__["Waves"]
        },
        {
            id: "bank",
            label: "Bank",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"]
        }
    ];
    const [paymentTier, setPaymentTier] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('cash');
    const handleEditPrice = (id, currentPrice)=>{
        setEditingId(id);
        setEditPrice(String(currentPrice));
    };
    const handleSavePrice = (id)=>{
        const newPrice = parseInt(editPrice, 10);
        if (!isNaN(newPrice) && newPrice >= 0) {
            onUpdatePrice(id, newPrice);
        }
        setEditingId(null);
        setEditPrice("");
    };
    const deliveryFeeNum = saleType === "Delivery" ? parseInt(deliFee, 10) || 0 : 0;
    const finalTotal = totalAmount + deliveryFeeNum;
    const itemCount = cart.reduce((sum, line)=>sum + line.quantity, 0);
    const [isCustomerInfoCollapsed, setIsCustomerInfoCollapsed] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full flex-col border-l border-border bg-card transition-all duration-300 shrink-0", checkoutMode ? "w-full" : "w-[300px] lg:w-[350px]"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-[72px] flex-col justify-center border-b border-border px-4 py-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    checkoutMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onToggleCheckout,
                                        className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary bg-transparent border-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 495,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        className: "h-4.5 w-4.5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 498,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-bold text-foreground",
                                        children: checkoutMode ? "Checkout" : "Current Order"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 499,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClearCart,
                                className: "flex h-[44px] w-[44px] items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl bg-transparent border-none transition-colors",
                                title: "Clear Cart",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 53
                                    }, this),
                                    " ",
                                    invoiceId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 53
                                    }, this),
                                    " ",
                                    formatDateTime()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 515,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 513,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-border px-4 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-[48px] rounded-xl bg-muted/60 p-1 gap-0.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onSaleTypeChange("Shop"),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none", saleType === "Shop" ? "bg-[#8B5CF6] text-white shadow-md" : "bg-transparent text-muted-foreground hover:bg-muted/50"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 531,
                                    columnNumber: 13
                                }, this),
                                " Shop"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 521,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onSaleTypeChange("Delivery"),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none", saleType === "Delivery" ? "bg-[#F97316] text-white shadow-md" : "bg-transparent text-muted-foreground hover:bg-muted/50"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 543,
                                    columnNumber: 13
                                }, this),
                                " Delivery"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 533,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 520,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 519,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar min-h-0",
                children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full flex-col items-center justify-center text-muted-foreground opacity-50 px-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                            className: "mb-3 h-10 w-10"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium",
                            children: "Cart is empty"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 552,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 550,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col", checkoutMode && "mx-auto max-w-lg"),
                    children: cart.map((item, idx)=>{
                        const price = item.manualPrice ?? item.product.sale_price ?? 0;
                        const isEditing = editingId === item.product.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-3", idx < cart.length - 1 && "border-b border-border"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex-1 text-[13px] font-bold leading-snug line-clamp-2",
                                            children: item.product.product_name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 562,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onRemoveItem(item.product.id),
                                            className: "flex h-[44px] w-[44px] items-center justify-center text-muted-foreground hover:text-destructive bg-transparent border-none transition-colors",
                                            title: "Remove Item",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 568,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 561,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5",
                                            children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: editPrice,
                                                        onChange: (e)=>setEditPrice(e.target.value),
                                                        className: "h-[44px] w-24 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none",
                                                        autoFocus: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleSavePrice(item.product.id),
                                                        className: "h-[44px] w-[44px] rounded-lg bg-primary text-primary-foreground flex items-center justify-center border-none shadow-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 582,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 574,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-bold", item.manualPrice !== undefined && "text-[#D4AF37]"),
                                                        children: [
                                                            price.toLocaleString(),
                                                            " Ks"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 588,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleEditPrice(item.product.id, price),
                                                        className: "h-[44px] w-[44px] border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary bg-transparent active:scale-95 transition-all",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 590,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 589,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 572,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onUpdateQuantity(item.product.id, item.quantity - 1),
                                                    className: "h-[44px] w-[44px] border border-border rounded-lg flex items-center justify-center bg-transparent active:scale-95 transition-all",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 596,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-10 text-center text-sm font-bold",
                                                    children: item.quantity
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 599,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onUpdateQuantity(item.product.id, item.quantity + 1),
                                                    className: "h-[44px] w-[44px] border border-border rounded-lg flex items-center justify-center bg-transparent active:scale-95 transition-all",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 600,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 595,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 571,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, item.product.id, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 560,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 555,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-t border-border bg-card p-4 flex flex-col min-h-0", checkoutMode && "mx-auto w-full max-w-lg"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto custom-scrollbar space-y-3 max-h-[calc(100vh-200px)] pr-1",
                        children: [
                            saleType === "Delivery" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border-2 border-[#3b82f6] bg-[#3b82f6]/10 p-3 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsCustomerInfoCollapsed(!isCustomerInfoCollapsed),
                                        className: "flex items-center justify-between w-full text-sm font-black text-foreground transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Customer Info"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 17
                                            }, this),
                                            isCustomerInfoCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 621,
                                                columnNumber: 44
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "h-5 w-5 -rotate-90"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 621,
                                                columnNumber: 87
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 616,
                                        columnNumber: 15
                                    }, this),
                                    !isCustomerInfoCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 animate-in slide-in-from-top-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-[52px] rounded-xl bg-muted/60 p-1 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>onSaleTypeChange("Shop"),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none", saleTypeValue === "Shop" ? "bg-[#8B5CF6] text-white shadow-md" : "bg-transparent text-muted-foreground hover:bg-muted/50"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                                lineNumber: 637,
                                                                columnNumber: 23
                                                            }, this),
                                                            " Shop"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>onSaleTypeChange("Delivery"),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 items-center justify-center gap-2 rounded-lg text-[13px] font-bold transition-all border-none", saleTypeValue === "Delivery" ? "bg-[#F97316] text-white shadow-md" : "bg-transparent text-muted-foreground hover:bg-muted/50"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                                lineNumber: 649,
                                                                columnNumber: 23
                                                            }, this),
                                                            " Delivery"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 626,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold",
                                                        children: "Customer Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: customerName,
                                                        onChange: (e)=>onCustomerNameChange(e.target.value),
                                                        placeholder: "Customer Name",
                                                        className: "h-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 654,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 652,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold",
                                                        children: "Phone Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: customerPhone,
                                                        onChange: (e)=>onCustomerPhoneChange(e.target.value),
                                                        placeholder: "Phone Number",
                                                        className: "h-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 21
                                                    }, this),
                                                    customerMatch?.phone === customerPhone.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-muted-foreground",
                                                        children: [
                                                            "Customer found: ",
                                                            customerMatch.name || 'Unknown'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 661,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold",
                                                        children: "Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: customerAddress,
                                                        onChange: (e)=>onCustomerAddressChange(e.target.value),
                                                        placeholder: "Address",
                                                        rows: 4,
                                                        className: "min-h-[96px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 677,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold",
                                                                children: "Courier"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                                lineNumber: 687,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: courierName,
                                                                onChange: (e)=>onCourierNameChange(e.target.value),
                                                                placeholder: "Courier",
                                                                className: "h-12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                                lineNumber: 688,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 686,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold",
                                                                children: "Delivery Fee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                                lineNumber: 696,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "number",
                                                                inputMode: "decimal",
                                                                value: deliFee,
                                                                onChange: (e)=>onDeliFeeChange(e.target.value),
                                                                placeholder: "Fee",
                                                                className: "h-12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 695,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 685,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 615,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onPaymentMethodChange('cash');
                                                    setPaymentTier('cash');
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center justify-center gap-1 rounded-xl h-[56px] transition-all border-none", paymentMethod === 'cash' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted/50 text-muted-foreground hover:bg-muted bg-transparent"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold",
                                                        children: "Cash"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 714,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onPaymentMethodChange('pay');
                                                    setPaymentTier('pay');
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center justify-center gap-1 rounded-xl h-[56px] transition-all border-none", paymentTier === 'pay' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-muted/50 text-muted-foreground hover:bg-muted bg-transparent"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 737,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold",
                                                        children: "Pay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onPaymentMethodChange('bank');
                                                    setPaymentTier('banking');
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center justify-center gap-1 rounded-xl h-[56px] transition-all border-none", paymentTier === 'banking' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-muted/50 text-muted-foreground hover:bg-muted bg-transparent"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold",
                                                        children: "Banking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                        lineNumber: 751,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 740,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 713,
                                        columnNumber: 13
                                    }, this),
                                    paymentTier === 'pay' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-1 px-0.5",
                                        children: [
                                            {
                                                id: 'kpay',
                                                label: 'KBZ Pay',
                                                color: '#0056B3'
                                            },
                                            {
                                                id: 'aya_pay',
                                                label: 'AYA Pay',
                                                color: '#ED1C24'
                                            },
                                            {
                                                id: 'cb_pay',
                                                label: 'CB Pay',
                                                color: '#008A45'
                                            },
                                            {
                                                id: 'uab_pay',
                                                label: 'UAB Pay',
                                                color: '#6A2A8F'
                                            },
                                            {
                                                id: 'wave_pay',
                                                label: 'Wave Pay',
                                                color: '#F47920'
                                            },
                                            {
                                                id: 'others_pay',
                                                label: 'Others',
                                                color: '#4B5563'
                                            }
                                        ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onPaymentMethodChange(opt.id),
                                                style: {
                                                    backgroundColor: paymentMethod === opt.id ? opt.color : 'transparent',
                                                    color: paymentMethod === opt.id ? 'white' : undefined,
                                                    borderColor: opt.color
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg h-[44px] text-[9px] font-bold transition-all border", paymentMethod === opt.id ? "shadow-md brightness-110" : "text-muted-foreground hover:bg-muted/10 bg-transparent"),
                                                children: opt.label
                                            }, opt.id, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 15
                                    }, this),
                                    paymentTier === 'banking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-1 px-0.5",
                                        children: [
                                            {
                                                id: 'kbz_bank',
                                                label: 'KBZ',
                                                color: '#0056B3'
                                            },
                                            {
                                                id: 'aya_bank',
                                                label: 'AYA',
                                                color: '#ED1C24'
                                            },
                                            {
                                                id: 'cb_bank',
                                                label: 'CB',
                                                color: '#008A45'
                                            },
                                            {
                                                id: 'uab_bank',
                                                label: 'UAB',
                                                color: '#6A2A8F'
                                            },
                                            {
                                                id: 'others_bank',
                                                label: 'Others',
                                                color: '#4B5563'
                                            }
                                        ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onPaymentMethodChange(opt.id),
                                                style: {
                                                    backgroundColor: paymentMethod === opt.id ? opt.color : 'transparent',
                                                    color: paymentMethod === opt.id ? 'white' : undefined,
                                                    borderColor: opt.color
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg h-[44px] text-[9px] font-bold transition-all border", paymentMethod === opt.id ? "shadow-md brightness-110" : "text-muted-foreground hover:bg-muted/10 bg-transparent"),
                                                children: opt.label
                                            }, opt.id, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 795,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 787,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 712,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1 px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Subtotal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 819,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    totalAmount.toLocaleString(),
                                                    " Ks"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 820,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 818,
                                        columnNumber: 13
                                    }, this),
                                    saleType === "Delivery" && deliveryFeeNum > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Deli Fee"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 824,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    deliveryFeeNum.toLocaleString(),
                                                    " Ks"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 825,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 823,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between border-t border-dashed pt-2 text-base font-bold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 829,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    finalTotal.toLocaleString(),
                                                    " Ks"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 830,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 828,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 817,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky bottom-0 bg-card pt-3 border-t border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 text-[11px] text-muted-foreground text-center",
                                children: [
                                    "Total: ",
                                    itemCount,
                                    " items | MMK ",
                                    finalTotal.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 836,
                                columnNumber: 11
                            }, this),
                            !checkoutMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: cart.length === 0,
                                onClick: onToggleCheckout,
                                className: "h-12 w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 disabled:opacity-50 border-none",
                                children: [
                                    "Checkout - ",
                                    finalTotal.toLocaleString(),
                                    " Ks"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 840,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: !canCheckout || isCheckingOut,
                                onClick: onCheckout,
                                className: "h-12 w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 border-none",
                                children: [
                                    isCheckingOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-4 w-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 853,
                                        columnNumber: 33
                                    }, this),
                                    saleType === "Shop" ? "Confirm & Pay" : "Confirm Delivery"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 848,
                                columnNumber: 13
                            }, this),
                            checkoutError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[10px] text-destructive text-center",
                                children: checkoutError
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 857,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 835,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/pos/page.tsx",
        lineNumber: 481,
        columnNumber: 5
    }, this);
}
_s2(CartSidebar, "s7zLRRa5EwpuDut26nwbHLp0ycI=");
_c4 = CartSidebar;
function ScannerComponent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "reader",
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/app/(dashboard)/pos/page.tsx",
        lineNumber: 865,
        columnNumber: 10
    }, this);
}
_c5 = ScannerComponent;
function PosPage() {
    _s3();
    const { username } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardAuth"])();
    const { products: hookProducts, loading: productsLoading, refresh: refreshProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useProducts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"])();
    const [productsOverride, setProductsOverride] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const products = productsOverride ?? hookProducts;
    const { categories: dbCategories, refresh: refreshCategories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategories"])();
    const searchRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const scannerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const cameraStateRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]('IDLE');
    const scannerLockIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](`pos-${Math.random().toString(36).slice(2)}`);
    const [cameras, setCameras] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [currentCameraIndex, setCurrentCameraIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const [activeView, setActiveView] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('pos');
    const [navCollapsed, setNavCollapsed] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [catCollapsed, setCatCollapsed] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [cartCollapsed, setCartCollapsed] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [checkoutMode, setCheckoutMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [query, setQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [cart, setCart] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [checkingOut, setCheckingOut] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isConfirmingCheckout, setIsConfirmingCheckout] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [checkoutError, setCheckoutError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [checkoutSuccessOpen, setCheckoutSuccessOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [checkoutInvoiceId, setCheckoutInvoiceId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [lastReceipt, setLastReceipt] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [cartSidebarKey, setCartSidebarKey] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const [scanOpen, setScanOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [manualBarcodeInput, setManualBarcodeInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [missingBarcode, setMissingBarcode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [scanFlash, setScanFlash] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [scanStatus, setScanStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('scanning');
    const [cameraLoading, setCameraLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [torchOn, setTorchOn] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [zoomValue, setZoomValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](1);
    const [cameraCapabilities, setCameraCapabilities] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const videoTrackRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const isProcessingScan = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const scanUnlockTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const cleanupCamera = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[cleanupCamera]": ()=>{
            const container = typeof document === 'undefined' ? null : document.getElementById('reader');
            const video = container?.querySelector('video') ?? null;
            const stream = video?.srcObject ?? null;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach({
                    "PosPage.useCallback[cleanupCamera]": (track)=>{
                        try {
                            track.stop();
                            stream.removeTrack(track);
                        } catch  {}
                    }
                }["PosPage.useCallback[cleanupCamera]"]);
            }
            if (video) {
                try {
                    video.srcObject = null;
                    video.load(); // Force reset
                } catch  {}
            }
            videoTrackRef.current = null;
            isProcessingScan.current = false;
        }
    }["PosPage.useCallback[cleanupCamera]"], []);
    const releaseScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[releaseScanner]": async ()=>{
            const scanner = scannerRef.current;
            if (scanner) {
                try {
                    if (scanner.isScanning) {
                        await scanner.stop();
                    }
                } catch  {}
                try {
                    scanner.clear();
                } catch  {}
            }
            scannerRef.current = null;
            cameraStateRef.current = 'IDLE';
            cleanupCamera();
            if ("TURBOPACK compile-time truthy", 1) {
                const state = window.__tmygScannerLockState;
                if (state?.id === scannerLockIdRef.current) {
                    window.__tmygScannerLockState = null;
                }
            }
        }
    }["PosPage.useCallback[releaseScanner]"], [
        cleanupCamera
    ]);
    const handleCloseScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[handleCloseScanner]": async ()=>{
            await releaseScanner();
            setScanOpen(false);
            setManualBarcodeInput('');
            setCameraLoading(false);
        }
    }["PosPage.useCallback[handleCloseScanner]"], [
        releaseScanner
    ]);
    const handleResetScanner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[handleResetScanner]": async ()=>{
            await releaseScanner();
            setCameraLoading(true);
            setScanStatus('scanning');
            setScanOpen(false);
            setTimeout({
                "PosPage.useCallback[handleResetScanner]": ()=>{
                    setScanOpen(true);
                }
            }["PosPage.useCallback[handleResetScanner]"], 300);
        }
    }["PosPage.useCallback[handleResetScanner]"], [
        releaseScanner
    ]);
    const acquireGlobalScannerLock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[acquireGlobalScannerLock]": async ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const state = window.__tmygScannerLockState;
            if (state?.id && state.id !== scannerLockIdRef.current) {
                await state.release?.();
                window.__tmygScannerLockState = null;
            }
            window.__tmygScannerLockState = {
                id: scannerLockIdRef.current,
                release: ({
                    "PosPage.useCallback[acquireGlobalScannerLock]": async ()=>{
                        await releaseScanner();
                    }
                })["PosPage.useCallback[acquireGlobalScannerLock]"]
            };
        }
    }["PosPage.useCallback[acquireGlobalScannerLock]"], [
        releaseScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            return ({
                "PosPage.useEffect": ()=>{
                    releaseScanner();
                }
            })["PosPage.useEffect"];
        }
    }["PosPage.useEffect"], [
        releaseScanner
    ]);
    const [quickAddOpen, setQuickAddOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [quickBarcode, setQuickBarcode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickName, setQuickName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickDefaultCode, setQuickDefaultCode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickSize, setQuickSize] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickCategory, setQuickCategory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickVariant, setQuickVariant] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickDescription, setQuickDescription] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickDescriptionMm, setQuickDescriptionMm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickSalePrice, setQuickSalePrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickStock, setQuickStock] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickImageUrl, setQuickImageUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickImageFile, setQuickImageFile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [quickImagePreviewUrl, setQuickImagePreviewUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [quickRemark, setQuickRemark] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickPurchasePrice, setQuickPurchasePrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [quickError, setQuickError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [toasts, setToasts] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [selectedMainCategory, setSelectedMainCategory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [selectedSubCategory, setSelectedSubCategory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    // Delivery & Customer State
    const [customerName, setCustomerName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [customerPhone, setCustomerPhone] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [customerAddress, setCustomerAddress] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [saleType, setSaleType] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('Shop');
    const [courierName, setCourierName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [deliFee, setDeliFee] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [isBagoSpecial, setIsBagoSpecial] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [remark, setRemark] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [paymentMethod, setPaymentMethod] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('cash');
    const [customerMatch, setCustomerMatch] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [selectedProduct, setSelectedProduct] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    // Last Toast Time Ref
    const lastToastRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mainCategoriesList = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PosPage.useMemo[mainCategoriesList]": ()=>{
            const fromDb = (dbCategories ?? []).length > 0 ? (dbCategories.some({
                "PosPage.useMemo[mainCategoriesList]": (c)=>c.parent_id
            }["PosPage.useMemo[mainCategoriesList]"]) ? dbCategories.filter({
                "PosPage.useMemo[mainCategoriesList]": (c)=>!c.parent_id
            }["PosPage.useMemo[mainCategoriesList]"]) : dbCategories).map({
                "PosPage.useMemo[mainCategoriesList]": (c, idx)=>({
                        id: String(c.id ?? idx),
                        name: c.name || '',
                        icon: [
                            'Sparkles',
                            'Droplets',
                            'Wind',
                            'Palette',
                            'Scissors'
                        ][idx % 5]
                    })
            }["PosPage.useMemo[mainCategoriesList]"]) : [];
            if (fromDb.length > 0) return fromDb;
            // Fallback: derive from product.category so the category bar shows more than "All Products"
            const fromProducts = new Set();
            (products ?? []).forEach({
                "PosPage.useMemo[mainCategoriesList]": (p)=>{
                    if (p?.category) {
                        const main = p.category.split(' / ').map({
                            "PosPage.useMemo[mainCategoriesList]": (s)=>s.trim()
                        }["PosPage.useMemo[mainCategoriesList]"])[0];
                        if (main) fromProducts.add(main);
                    }
                }
            }["PosPage.useMemo[mainCategoriesList]"]);
            return Array.from(fromProducts).sort().map({
                "PosPage.useMemo[mainCategoriesList]": (name, idx)=>({
                        id: `prod-${idx}`,
                        name,
                        icon: [
                            'Sparkles',
                            'Droplets',
                            'Wind',
                            'Palette',
                            'Scissors'
                        ][idx % 5]
                    })
            }["PosPage.useMemo[mainCategoriesList]"]);
        }
    }["PosPage.useMemo[mainCategoriesList]"], [
        dbCategories,
        products
    ]);
    const [editingProductId, setEditingProductId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [tempPrice, setTempPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const addToast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[addToast]": (type, message)=>{
            const now = Date.now();
            if (lastToastRef.current && lastToastRef.current.msg === message && now - lastToastRef.current.time < 2000) {
                return; // Prevent duplicate toasts
            }
            lastToastRef.current = {
                msg: message,
                time: now
            };
            const id = Date.now() + Math.random();
            setToasts({
                "PosPage.useCallback[addToast]": (prev)=>[
                        ...prev,
                        {
                            id,
                            type,
                            message
                        }
                    ]
            }["PosPage.useCallback[addToast]"]);
            setTimeout({
                "PosPage.useCallback[addToast]": ()=>{
                    setToasts({
                        "PosPage.useCallback[addToast]": (prev)=>prev.filter({
                                "PosPage.useCallback[addToast]": (t)=>t.id !== id
                            }["PosPage.useCallback[addToast]"])
                    }["PosPage.useCallback[addToast]"]);
                }
            }["PosPage.useCallback[addToast]"], 4000);
        }
    }["PosPage.useCallback[addToast]"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            setProductsOverride(null);
        }
    }["PosPage.useEffect"], [
        hookProducts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            searchRef.current?.focus();
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
                addToast('error', 'Camera requires HTTPS. Please use an SSL tunnel or local dev tools.');
            }
        }
    }["PosPage.useEffect"], [
        addToast
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            if (saleType !== 'Delivery') {
                setCustomerMatch(null);
                return;
            }
            const phone = customerPhone.trim();
            if (phone.length < 4) {
                setCustomerMatch(null);
                return;
            }
            const timer = setTimeout({
                "PosPage.useEffect.timer": async ()=>{
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('customers').select('phone, name, address').eq('phone', phone).maybeSingle();
                    if (error) {
                        console.error('Customer lookup error:', error);
                        return;
                    }
                    if (data?.phone) {
                        setCustomerMatch({
                            phone: data.phone,
                            name: data.name ?? null,
                            address: data.address ?? null
                        });
                        if (data.name) setCustomerName(data.name);
                        if (data.address) setCustomerAddress(data.address);
                    } else {
                        setCustomerMatch(null);
                    }
                }
            }["PosPage.useEffect.timer"], 300);
            return ({
                "PosPage.useEffect": ()=>clearTimeout(timer)
            })["PosPage.useEffect"];
        }
    }["PosPage.useEffect"], [
        customerPhone,
        saleType
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            if (!scanOpen) {
                releaseScanner();
                return;
            }
            return ({
                "PosPage.useEffect": ()=>{
                    releaseScanner();
                }
            })["PosPage.useEffect"];
        }
    }["PosPage.useEffect"], [
        scanOpen,
        releaseScanner
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            return ({
                "PosPage.useEffect": ()=>{
                    if (scanUnlockTimeoutRef.current) {
                        clearTimeout(scanUnlockTimeoutRef.current);
                    }
                    releaseScanner();
                }
            })["PosPage.useEffect"];
        }
    }["PosPage.useEffect"], [
        releaseScanner
    ]);
    const normalizeString = (str)=>str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const matches = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PosPage.useMemo[matches]": ()=>{
            const q = normalizeString(query.trim());
            const items = products || [];
            return items.filter({
                "PosPage.useMemo[matches]": (p)=>{
                    const name = normalizeString(p?.product_name ?? '');
                    const barcode = normalizeBarcode(p?.barcode).toLowerCase();
                    const sku = (p?.default_code ?? '').toLowerCase();
                    const categoryStr = p?.category ?? '';
                    const parts = categoryStr.split(' / ').map({
                        "PosPage.useMemo[matches].parts": (s)=>s.trim()
                    }["PosPage.useMemo[matches].parts"]);
                    const main = parts[0];
                    const sub = parts.length > 1 ? parts.slice(1).join(' / ') : '';
                    const matchesQuery = name.includes(q) || barcode.includes(q) || sku.includes(q);
                    let matchesCategory = true;
                    if (selectedMainCategory) {
                        if (main !== selectedMainCategory && categoryStr !== selectedMainCategory) {
                            matchesCategory = false;
                        } else if (selectedSubCategory && sub !== selectedSubCategory) {
                            matchesCategory = false;
                        }
                    }
                    return matchesQuery && matchesCategory;
                }
            }["PosPage.useMemo[matches]"]);
        }
    }["PosPage.useMemo[matches]"], [
        products,
        query,
        selectedMainCategory,
        selectedSubCategory
    ]);
    const { mainCategories, subCategoriesMap, allCategories } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PosPage.useMemo": ()=>{
            const mainCats = new Set();
            const subCatsMap = new Map();
            const allCats = new Set();
            products.forEach({
                "PosPage.useMemo": (p)=>{
                    if (p.category) {
                        allCats.add(p.category);
                        const parts = p.category.split(' / ').map({
                            "PosPage.useMemo.parts": (s)=>s.trim()
                        }["PosPage.useMemo.parts"]);
                        const main = parts[0];
                        const sub = parts.length > 1 ? parts.slice(1).join(' / ') : '';
                        mainCats.add(main);
                        if (!subCatsMap.has(main)) {
                            subCatsMap.set(main, new Set());
                        }
                        if (sub) {
                            subCatsMap.get(main).add(sub);
                        }
                    }
                }
            }["PosPage.useMemo"]);
            const mainArray = Array.from(mainCats).sort();
            const map = new Map();
            for (const main of mainArray){
                map.set(main, Array.from(subCatsMap.get(main) || []).sort());
            }
            return {
                mainCategories: mainArray,
                subCategoriesMap: map,
                allCategories: Array.from(allCats).sort()
            };
        }
    }["PosPage.useMemo"], [
        products
    ]);
    const categories = allCategories; // For Quick Add backward compatibility
    const totalAmount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PosPage.useMemo[totalAmount]": ()=>cart.reduce({
                "PosPage.useMemo[totalAmount]": (sum, line)=>sum + (line.manualPrice ?? line.product.sale_price ?? 0) * line.quantity
            }["PosPage.useMemo[totalAmount]"], 0)
    }["PosPage.useMemo[totalAmount]"], [
        cart
    ]);
    const cartQtyByProductId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PosPage.useMemo[cartQtyByProductId]": ()=>{
            const m = new Map();
            for (const line of cart){
                m.set(line.product.id, (m.get(line.product.id) ?? 0) + line.quantity);
            }
            return m;
        }
    }["PosPage.useMemo[cartQtyByProductId]"], [
        cart
    ]);
    function addToCart(product, qty = 1) {
        const stock = product.stock_quantity ?? 0;
        const inCart = cartQtyByProductId.get(product.id) ?? 0;
        const maxAdd = Math.max(0, stock - inCart);
        if (maxAdd === 0) {
            addToast('error', 'Out of stock for this product.');
            return;
        }
        const add = Math.min(qty, maxAdd);
        setCart((prev)=>{
            const i = prev.findIndex((l)=>l.product.id === product.id);
            if (i >= 0) {
                const next = [
                    ...prev
                ];
                next[i] = {
                    ...next[i],
                    quantity: next[i].quantity + add
                };
                return next;
            }
            return [
                ...prev,
                {
                    product,
                    quantity: add
                }
            ];
        });
        setQuery('');
        searchRef.current?.focus();
    }
    function setCartQuantity(productId, quantity) {
        if (quantity <= 0) {
            setCart((prev)=>prev.filter((l)=>l.product.id !== productId));
            return;
        }
        const product = products.find((p)=>p.id === productId);
        const stock = product?.stock_quantity ?? 0;
        const clamped = Math.min(quantity, stock);
        setCart((prev)=>{
            const i = prev.findIndex((l)=>l.product.id === productId);
            if (i < 0) return prev;
            const next = [
                ...prev
            ];
            next[i] = {
                ...next[i],
                quantity: clamped
            };
            return next;
        });
    }
    function setCartPrice(productId, price) {
        setCart((prev)=>{
            const i = prev.findIndex((l)=>l.product.id === productId);
            if (i < 0) return prev;
            const next = [
                ...prev
            ];
            next[i] = {
                ...next[i],
                manualPrice: price
            };
            return next;
        });
    }
    function removeFromCart(productId) {
        setCart((prev)=>prev.filter((l)=>l.product.id !== productId));
    }
    const canCheckout = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PosPage.useMemo[canCheckout]": ()=>{
            if (cart.length === 0) return false;
            // Stock check
            const stockOk = cart.every({
                "PosPage.useMemo[canCheckout].stockOk": (line)=>{
                    const stock = line.product.stock_quantity ?? 0;
                    return line.quantity <= stock;
                }
            }["PosPage.useMemo[canCheckout].stockOk"]);
            if (!stockOk) return false;
            // Mode specific checks
            if (saleType === 'Delivery') {
                // Make customer fields optional for delivery if needed, but at least allow checkout if user confirms
                // Assuming 'Confirm Delivery' implies user has filled what's necessary.
                // If we want to make them optional:
                return true;
            }
            // For Shop mode, we allow checkout without customer details
            return true;
        }
    }["PosPage.useMemo[canCheckout]"], [
        cart,
        saleType,
        customerName,
        customerPhone,
        customerAddress
    ]);
    async function handleCheckout() {
        if (!canCheckout || checkingOut) return;
        setCheckoutError(null);
        setCheckoutSuccessOpen(false);
        setCheckingOut(true);
        try {
            const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].auth.getSession();
            if (!session) {
                setCheckoutError('Not logged in.');
                setCheckingOut(false);
                return;
            }
            const now = new Date();
            const deliveryFee = saleType === 'Delivery' ? Number(deliFee) || 0 : 0;
            const receiptItems = cart.map((line)=>{
                const price = line.manualPrice ?? line.product.sale_price ?? 0;
                return {
                    name: line.product.product_name ?? 'Item',
                    qty: line.quantity,
                    price,
                    amount: price * line.quantity
                };
            });
            const receiptTotal = totalAmount + deliveryFee;
            const receiptSnapshot = {
                invoiceId: '',
                date: now.toLocaleDateString('en-US'),
                time: now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                staffName: formatStaffName(username),
                saleType,
                customerName,
                customerPhone,
                customerAddress,
                customer: {
                    name: customerName,
                    phone: customerPhone,
                    address: customerAddress
                },
                items: receiptItems,
                total: receiptTotal,
                discount: 0,
                netAmount: receiptTotal
            };
            const items = cart.map((line)=>({
                    product_id: Number(line.product.id),
                    quantity: line.quantity,
                    sale_price: line.manualPrice ?? line.product.sale_price ?? 0
                }));
            const res = await fetch('/api/pos/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    items,
                    customer_name: customerName,
                    customer_phone: customerPhone,
                    customer_address: customerAddress,
                    sale_type: saleType === 'Delivery' ? 'Delivery' : 'Shop',
                    payment_method: paymentMethod,
                    remark: remark,
                    receipt_payload: receiptSnapshot,
                    delivery_info: saleType === 'Delivery' ? {
                        courier_name: courierName,
                        deli_fee: Number(deliFee),
                        is_bago_special: isBagoSpecial
                    } : null
                })
            });
            const data = await res.json().catch(()=>({}));
            if (!res.ok) {
                const message = data?.error ?? res.statusText ?? 'Checkout failed';
                const finalMessage = `Error: ${message}`;
                setCheckoutError(finalMessage);
                addToast('error', finalMessage);
                setCheckingOut(false);
                return;
            }
            setCart([]);
            setCustomerName('');
            setCustomerPhone('');
            setCustomerAddress('');
            setSaleType('Shop');
            setCourierName('');
            setDeliFee('');
            setIsBagoSpecial(false);
            setRemark('');
            setPaymentMethod('cash');
            setIsConfirmingCheckout(false);
            const invoiceIdValue = data?.invoiceId ?? '';
            setCheckoutInvoiceId(invoiceIdValue || null);
            const finalReceipt = {
                ...receiptSnapshot,
                invoiceId: invoiceIdValue
            };
            setLastReceipt(finalReceipt);
            setCheckoutSuccessOpen(true);
            if (Array.isArray(data?.products)) {
                setProductsOverride(data.products);
            } else {
                await refreshProducts();
            }
            searchRef.current?.focus();
            addToast('success', 'Sale Successful - Stock Updated');
        } catch (e) {
            console.error('FULL API ERROR:', e);
            const msg = e instanceof Error ? e.message : 'Checkout failed';
            const finalMessage = `Error: ${msg}`;
            setCheckoutError(finalMessage);
            addToast('error', finalMessage);
            setCheckingOut(false);
        } finally{
            setCheckingOut(false);
        }
    }
    const handlePrintReceipt = ()=>{
        if (!lastReceipt) return;
        window.print();
    };
    const handleCloseSuccessModal = ()=>{
        setCheckoutSuccessOpen(false);
        setCart([]);
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
        setSaleType('Shop');
        setCourierName('');
        setDeliFee('');
        setIsBagoSpecial(false);
        setRemark('');
        setPaymentMethod('cash');
        setCustomerMatch(null);
        setCheckoutInvoiceId(null);
        setLastReceipt(null);
        setCheckoutError(null);
        setCheckoutMode(false);
        setQuery('');
        setMissingBarcode(null);
        setProductsOverride(null);
        setCartSidebarKey((value)=>value + 1);
    };
    const isLocked = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const openQuickAddForBarcode = (code)=>{
        setQuickBarcode(code);
        setQuickName('');
        setQuickDefaultCode('');
        setQuickSize('');
        setQuickCategory('');
        setQuickVariant('');
        setQuickDescription('');
        setQuickDescriptionMm('');
        setQuickSalePrice('');
        setQuickStock('');
        setQuickImageUrl('');
        setQuickImageFile(null);
        setQuickImagePreviewUrl(null);
        setQuickRemark('');
        setQuickPurchasePrice('');
        setQuickError(null);
        setMissingBarcode(null);
        setQuickAddOpen(true);
    };
    function handleScannedBarcode(raw) {
        if (isLocked.current) return false;
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.isProcessingScan) return false;
        isLocked.current = true;
        if ("TURBOPACK compile-time truthy", 1) {
            window.isProcessingScan = true;
        }
        const code = normalizeBarcode(raw);
        if (!code) {
            if (scanUnlockTimeoutRef.current) {
                clearTimeout(scanUnlockTimeoutRef.current);
            }
            scanUnlockTimeoutRef.current = setTimeout(()=>{
                isLocked.current = false;
            }, 3000);
            return false;
        }
        const existing = products.find((p)=>normalizeBarcode(p.barcode).toLowerCase() === code.toLowerCase());
        if (existing) {
            setMissingBarcode(null);
            setScanStatus('found');
            addToCart(existing, 1);
            addToast('success', 'Product added from scanner.');
            if (scanUnlockTimeoutRef.current) {
                clearTimeout(scanUnlockTimeoutRef.current);
            }
            scanUnlockTimeoutRef.current = setTimeout(()=>{
                isLocked.current = false;
                isProcessingScan.current = false;
                if ("TURBOPACK compile-time truthy", 1) {
                    window.isProcessingScan = false;
                }
            }, 800);
            return true;
        }
        setMissingBarcode(code);
        setScanStatus('missing');
        addToast('error', 'Product not found.');
        if (scanUnlockTimeoutRef.current) {
            clearTimeout(scanUnlockTimeoutRef.current);
        }
        scanUnlockTimeoutRef.current = setTimeout(()=>{
            isLocked.current = false;
            isProcessingScan.current = false;
            if ("TURBOPACK compile-time truthy", 1) {
                window.isProcessingScan = false;
            }
        }, 800);
        return false;
    }
    const isScannerModalOpen = scanOpen && !quickAddOpen && !selectedProduct && !isConfirmingCheckout;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            let cancelled = false;
            let startTimeoutId = null;
            /** Log every state transition so it's visible in DevTools. */ const transition = {
                "PosPage.useEffect.transition": (from, to)=>{
                    console.log(`[POS] Camera state: ${from} → ${to}`);
                    cameraStateRef.current = to;
                    if (to === 'STARTING') {
                        setCameraLoading(true);
                    }
                    if (to === 'RUNNING' || to === 'IDLE') {
                        setCameraLoading(false);
                    }
                }
            }["PosPage.useEffect.transition"];
            /**
     * Safely stop + clear the current scanner instance and move to IDLE.
     * Returns a Promise that resolves once the scanner is fully torn down.
     */ const stopScanner = {
                "PosPage.useEffect.stopScanner": async (from)=>{
                    transition(from, 'STOPPING');
                    videoTrackRef.current = null;
                    setCameraCapabilities(null);
                    setTorchOn(false);
                    const scanner = scannerRef.current;
                    scannerRef.current = null;
                    if (scanner) {
                        try {
                            if (scanner.isScanning) {
                                await scanner.stop().catch({
                                    "PosPage.useEffect.stopScanner": (e)=>console.warn('[POS] Scanner stop ignored:', e)
                                }["PosPage.useEffect.stopScanner"]);
                            }
                        } catch (e) {
                            console.warn('[POS] Scanner stop error:', e);
                        }
                        try {
                            const videoElement = document.querySelector('#reader video');
                            if (videoElement && videoElement.srcObject) {
                                const stream = videoElement.srcObject;
                                stream.getTracks().forEach({
                                    "PosPage.useEffect.stopScanner": (t)=>t.stop()
                                }["PosPage.useEffect.stopScanner"]);
                                videoElement.srcObject = null;
                            }
                            scanner.clear();
                        } catch (e) {}
                    }
                    transition('STOPPING', 'IDLE');
                }
            }["PosPage.useEffect.stopScanner"];
            const isScannerActive = {
                "PosPage.useEffect.isScannerActive": ()=>{
                    const scanner = scannerRef.current;
                    if (!scanner) return false;
                    try {
                        if (scanner.isScanning) return true;
                        if (typeof scanner.getState === 'function') {
                            const state = scanner.getState();
                            return state > 1 && state !== 3;
                        }
                    } catch  {}
                    return false;
                }
            }["PosPage.useEffect.isScannerActive"];
            const cleanup = {
                "PosPage.useEffect.cleanup": ()=>{
                    try {
                        cancelled = true;
                        cleanupCamera();
                        if (startTimeoutId) {
                            clearTimeout(startTimeoutId);
                            startTimeoutId = null;
                        }
                        const cur = cameraStateRef.current;
                        if (cur === 'STARTING' || cur === 'RUNNING') {
                            if (isScannerActive()) {
                                try {
                                    stopScanner(cur).catch({
                                        "PosPage.useEffect.cleanup": ()=>{}
                                    }["PosPage.useEffect.cleanup"]);
                                } catch  {}
                            }
                        }
                    } catch  {}
                }
            }["PosPage.useEffect.cleanup"];
            // ── Modal closed ────────────────────────────────────────────────────────
            if (!isScannerModalOpen) {
                const cur = cameraStateRef.current;
                cleanupCamera();
                if (cur === 'STARTING' || cur === 'RUNNING') {
                    if (isScannerActive()) {
                        try {
                            stopScanner(cur).catch({
                                "PosPage.useEffect": ()=>{}
                            }["PosPage.useEffect"]);
                        } catch  {}
                    }
                }
                return cleanup;
            }
            // ── Modal open – only start if we're truly IDLE ──────────────────────
            if (cameraStateRef.current !== 'IDLE') {
                console.log(`[POS] Camera start requested but state is ${cameraStateRef.current} – skipping.`);
                return cleanup;
            }
            // ── Global Keyboard Listener ──────────────────────────────────────────
            const handleKeyDown = {
                "PosPage.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        if (quickAddOpen) setQuickAddOpen(false);
                        else if (scanOpen) {
                            setScanOpen(false);
                            releaseScanner();
                        }
                    }
                }
            }["PosPage.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            ({
                "PosPage.useEffect": async ()=>{
                    try {
                        console.log('[POS] Initializing html5-qrcode scanner...');
                        const html5 = await __turbopack_context__.A("[project]/node_modules/html5-qrcode/esm/index.js [app-client] (ecmascript, async loader)");
                        const { Html5Qrcode, Html5QrcodeSupportedFormats } = html5;
                        if (!Html5Qrcode || !Html5QrcodeSupportedFormats) {
                            console.error('[POS] Html5Qrcode / Html5QrcodeSupportedFormats not found in html5-qrcode import:', html5);
                            addToast('error', 'html5-qrcode library not available.');
                            if ("TURBOPACK compile-time truthy", 1) {
                                alert('Camera scanner failed to load (Html5Qrcode missing). Check console for details.');
                            }
                            return;
                        }
                        if (typeof navigator === 'undefined' || !navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
                            const msg = 'Camera API (mediaDevices.getUserMedia) is not available in this browser.';
                            console.error('[POS] ' + msg);
                            addToast('error', msg);
                            if ("TURBOPACK compile-time truthy", 1) {
                                alert(msg);
                            }
                            return;
                        }
                        // This call triggers camera permission in Firefox/Chrome.
                        const devices = await Html5Qrcode.getCameras();
                        console.log('[POS] Available cameras:', devices);
                        if (!devices || devices.length === 0) {
                            const msg = 'No camera devices found. Check Firefox site permissions.';
                            console.error('[POS] ' + msg);
                            addToast('error', msg);
                            if ("TURBOPACK compile-time truthy", 1) {
                                alert(msg);
                            }
                            return;
                        }
                        setCameras(devices);
                        // Prefer a back/environment camera if available.
                        let index = currentCameraIndex;
                        if (!Number.isInteger(index) || index < 0 || index >= devices.length) {
                            const backIndex = devices.findIndex({
                                "PosPage.useEffect.backIndex": (d)=>/back|rear|environment/i.test(d.label || '')
                            }["PosPage.useEffect.backIndex"]);
                            index = backIndex >= 0 ? backIndex : 0;
                            setCurrentCameraIndex(index);
                        }
                        // Tear down any stale instance before starting fresh.
                        if (scannerRef.current) {
                            await stopScanner(cameraStateRef.current);
                            if (cancelled) return;
                        }
                        const startCamera = {
                            "PosPage.useEffect.startCamera": async ()=>{
                                if (cancelled) return;
                                // Stricter guard: return instantly if we are already transitioning.
                                const currentState = cameraStateRef.current;
                                if (currentState === 'STARTING' || currentState === 'STOPPING' || currentState === 'RUNNING') {
                                    console.log(`[POS] startCamera: already in ${currentState} state - ignoring start request.`);
                                    return;
                                }
                                transition('IDLE', 'STARTING');
                                await acquireGlobalScannerLock();
                                // Ensure no stale instance.
                                if (scannerRef.current) {
                                    try {
                                        const state = scannerRef.current.getState();
                                        if (state > 1 && state !== 3) {
                                            await scannerRef.current.stop().catch({
                                                "PosPage.useEffect.startCamera": ()=>{}
                                            }["PosPage.useEffect.startCamera"]);
                                        }
                                    } catch (e) {}
                                    try {
                                        scannerRef.current.clear();
                                    } catch (e) {}
                                    scannerRef.current = null;
                                }
                                const qr = new Html5Qrcode('reader');
                                scannerRef.current = qr;
                                const preferred = devices[index];
                                const isBackLike = preferred ? /back|rear|environment/i.test(preferred.label || '') : false;
                                // Advanced video constraints to help iOS/Safari decode EAN/UPC barcodes.
                                const videoConstraints = {
                                    facingMode: 'environment',
                                    width: {
                                        min: 640,
                                        ideal: 1280,
                                        max: 1920
                                    },
                                    height: {
                                        min: 480,
                                        ideal: 720,
                                        max: 1080
                                    },
                                    advanced: [
                                        {
                                            zoom: 1
                                        }
                                    ],
                                    ...preferred && preferred.id ? {
                                        deviceId: {
                                            exact: preferred.id
                                        }
                                    } : {}
                                };
                                const fallbackStartConfig = isBackLike ? {
                                    facingMode: 'environment'
                                } : {
                                    facingMode: 'environment'
                                };
                                const scanConfig = {
                                    fps: 20,
                                    qrbox: {
                                        "PosPage.useEffect.startCamera": (viewfinderWidth, viewfinderHeight)=>{
                                            const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.6);
                                            return {
                                                width: size,
                                                height: size
                                            };
                                        }
                                    }["PosPage.useEffect.startCamera"],
                                    aspectRatio: 1.0,
                                    disableFlip: false,
                                    formatsToSupport: [
                                        Html5QrcodeSupportedFormats.EAN_13,
                                        Html5QrcodeSupportedFormats.UPC_A,
                                        Html5QrcodeSupportedFormats.CODE_128
                                    ],
                                    useBarCodeDetectorIfSupported: true
                                };
                                const successCallback = {
                                    "PosPage.useEffect.startCamera.successCallback": async (decodedText)=>{
                                        if (isLocked.current) return;
                                        if (isProcessingScan.current) return;
                                        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.isProcessingScan) return;
                                        isProcessingScan.current = true;
                                        if ("TURBOPACK compile-time truthy", 1) {
                                            window.isProcessingScan = true;
                                            setTimeout({
                                                "PosPage.useEffect.startCamera.successCallback": ()=>{
                                                    window.isProcessingScan = false;
                                                }
                                            }["PosPage.useEffect.startCamera.successCallback"], 1000);
                                        }
                                        console.log('[POS] Barcode decoded:', decodedText);
                                        setScanFlash(true);
                                        setTimeout({
                                            "PosPage.useEffect.startCamera.successCallback": ()=>setScanFlash(false)
                                        }["PosPage.useEffect.startCamera.successCallback"], 150);
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
                                                "PosPage.useEffect.startCamera.successCallback": ()=>{
                                                    osc.stop();
                                                    ctx.close();
                                                }
                                            }["PosPage.useEffect.startCamera.successCallback"], 120);
                                        } catch  {}
                                        const matched = handleScannedBarcode(decodedText);
                                        if (!matched) {
                                            return;
                                        }
                                        setScanOpen(false);
                                        if (cameraStateRef.current === 'RUNNING') {
                                            transition('RUNNING', 'STOPPING');
                                        }
                                        try {
                                            const state = qr.getState();
                                            if (state > 1 && state !== 3) {
                                                await qr.stop().catch({
                                                    "PosPage.useEffect.startCamera.successCallback": ()=>{}
                                                }["PosPage.useEffect.startCamera.successCallback"]);
                                            }
                                        } catch (e) {}
                                        cleanupCamera();
                                        cameraStateRef.current = 'IDLE';
                                        scannerRef.current = null;
                                    }
                                }["PosPage.useEffect.startCamera.successCallback"];
                                const errorCallback = {
                                    "PosPage.useEffect.startCamera.errorCallback": (errorMessage)=>{
                                        console.debug('[POS] Scanner decode error:', errorMessage);
                                    }
                                }["PosPage.useEffect.startCamera.errorCallback"];
                                console.log('[POS] Starting camera with constraints:', videoConstraints, 'preferred device:', preferred);
                                const setupTorchZoom = {
                                    "PosPage.useEffect.startCamera.setupTorchZoom": ()=>{
                                        setTimeout({
                                            "PosPage.useEffect.startCamera.setupTorchZoom": ()=>{
                                                if (cancelled) return;
                                                const video = document.querySelector('#reader video');
                                                if (video && video.srcObject) {
                                                    const stream = video.srcObject;
                                                    const track = stream.getVideoTracks()[0];
                                                    if (track) {
                                                        videoTrackRef.current = track;
                                                        const caps = track.getCapabilities();
                                                        const zoom = caps?.zoom;
                                                        const zoomMin = zoom?.min ?? 1;
                                                        const zoomMax = zoom?.max ?? 1;
                                                        setCameraCapabilities({
                                                            torchSupported: caps?.torch === true,
                                                            zoomSupported: zoomMax > 1,
                                                            zoomMin,
                                                            zoomMax
                                                        });
                                                        setZoomValue(zoomMin);
                                                    }
                                                }
                                            }
                                        }["PosPage.useEffect.startCamera.setupTorchZoom"], 300);
                                    }
                                }["PosPage.useEffect.startCamera.setupTorchZoom"];
                                try {
                                    await qr.start(videoConstraints, scanConfig, successCallback, errorCallback);
                                    // Verify state hasn't changed while we were awaiting start().
                                    if (cameraStateRef.current !== 'STARTING') {
                                        console.log(`[POS] State changed to ${cameraStateRef.current} during start – tearing down.`);
                                        try {
                                            const state = qr.getState();
                                            if (state > 1 && state !== 3) {
                                                await qr.stop().catch({
                                                    "PosPage.useEffect.startCamera": ()=>{}
                                                }["PosPage.useEffect.startCamera"]);
                                            }
                                        } catch (e) {}
                                        try {
                                            qr.clear();
                                        } catch (e) {}
                                        transition(cameraStateRef.current, 'IDLE');
                                        return;
                                    }
                                    transition('STARTING', 'RUNNING');
                                    setupTorchZoom();
                                } catch (startErr) {
                                    console.warn('[POS] Advanced constraints failed, falling back after delay:', startErr);
                                    // 1. Thoroughly teardown the failed instance.
                                    try {
                                        const state = qr.getState();
                                        if (state > 1 && state !== 3) {
                                            await qr.stop().catch({
                                                "PosPage.useEffect.startCamera": ()=>{}
                                            }["PosPage.useEffect.startCamera"]);
                                        }
                                    } catch (e) {}
                                    try {
                                        qr.clear();
                                    } catch (e) {}
                                    if (scannerRef.current === qr) {
                                        scannerRef.current = null;
                                    }
                                    // 2. Wait for browser to release resources.
                                    await new Promise({
                                        "PosPage.useEffect.startCamera": (resolve)=>setTimeout(resolve, 800)
                                    }["PosPage.useEffect.startCamera"]);
                                    if (cancelled || cameraStateRef.current !== 'STARTING') return;
                                    // 3. Create a FRESH instance for the fallback attempt.
                                    // This is the CRITICAL fix for "already under transition".
                                    const fallbackQr = new Html5Qrcode('reader');
                                    scannerRef.current = fallbackQr;
                                    try {
                                        await fallbackQr.start(fallbackStartConfig, scanConfig, successCallback, errorCallback);
                                        if (cameraStateRef.current !== 'STARTING') {
                                            try {
                                                const state = fallbackQr.getState();
                                                if (state > 1 && state !== 3) {
                                                    await fallbackQr.stop().catch({
                                                        "PosPage.useEffect.startCamera": ()=>{}
                                                    }["PosPage.useEffect.startCamera"]);
                                                }
                                            } catch (e) {}
                                            try {
                                                fallbackQr.clear();
                                            } catch (e) {}
                                            transition(cameraStateRef.current, 'IDLE');
                                            return;
                                        }
                                        transition('STARTING', 'RUNNING');
                                        setupTorchZoom();
                                    } catch (fallbackErr) {
                                        console.error('[POS] Fallback camera start failed:', fallbackErr);
                                        cameraStateRef.current = 'IDLE';
                                        const msg = fallbackErr instanceof Error ? fallbackErr.message : 'Unable to start camera scanner.';
                                        addToast('error', msg);
                                        if ("TURBOPACK compile-time truthy", 1) {
                                            alert('Camera failed to start: ' + msg);
                                        }
                                    }
                                }
                            }
                        }["PosPage.useEffect.startCamera"];
                        // Delay slightly so the DOM node is fully rendered.
                        startTimeoutId = setTimeout({
                            "PosPage.useEffect": ()=>{
                                if (cancelled) return;
                                startCamera().catch({
                                    "PosPage.useEffect": (err)=>{
                                        console.error('[POS] startCamera error:', err);
                                        cameraStateRef.current = 'IDLE';
                                    }
                                }["PosPage.useEffect"]);
                            }
                        }["PosPage.useEffect"], 500);
                    } catch (e) {
                        console.error('[POS] Scanner init failed', e);
                        cameraStateRef.current = 'IDLE';
                        const msg = e instanceof Error ? e.message : 'Unable to start camera scanner.';
                        addToast('error', msg);
                        if ("TURBOPACK compile-time truthy", 1) {
                            alert('Camera failed to start: ' + msg);
                        }
                    }
                }
            })["PosPage.useEffect"]();
            return ({
                "PosPage.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    cleanup();
                }
            })["PosPage.useEffect"];
        }
    }["PosPage.useEffect"], [
        isScannerModalOpen,
        quickAddOpen,
        currentCameraIndex,
        addToast,
        cleanupCamera,
        acquireGlobalScannerLock
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            if (scanOpen) {
                isLocked.current = false;
                setScanStatus('scanning');
                if ("TURBOPACK compile-time truthy", 1) {
                    window.isProcessingScan = false;
                }
            }
        }
    }["PosPage.useEffect"], [
        scanOpen
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PosPage.useEffect": ()=>{
            if (quickImageFile) {
                const url = URL.createObjectURL(quickImageFile);
                setQuickImagePreviewUrl(url);
                return ({
                    "PosPage.useEffect": ()=>{
                        URL.revokeObjectURL(url);
                    }
                })["PosPage.useEffect"];
            }
            const trimmed = quickImageUrl.trim();
            if (trimmed) {
                setQuickImagePreviewUrl(trimmed);
                return;
            }
            setQuickImagePreviewUrl(null);
        }
    }["PosPage.useEffect"], [
        quickImageFile,
        quickImageUrl
    ]);
    const uploadQuickAddImage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "PosPage.useCallback[uploadQuickAddImage]": async (productId, file)=>{
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
            const separator = publicData.publicUrl.includes('?') ? '&' : '?';
            return {
                url: `${publicData.publicUrl}${separator}t=${Date.now()}`
            };
        }
    }["PosPage.useCallback[uploadQuickAddImage]"], []);
    async function handleQuickAddSave() {
        setQuickError(null);
        const name = quickName.trim();
        const salePrice = Number(quickSalePrice);
        const stockQty = Number(quickStock);
        if (!name) {
            setQuickError('Product name is required.');
            return;
        }
        if (!Number.isFinite(salePrice) || salePrice < 0) {
            setQuickError('Sale price must be a non-negative number.');
            return;
        }
        if (!Number.isFinite(stockQty) || stockQty < 0) {
            setQuickError('Stock quantity must be a non-negative number.');
            return;
        }
        if (quickPurchasePrice.trim()) {
            const purchase = Number(quickPurchasePrice);
            if (!Number.isFinite(purchase) || purchase < 0) {
                setQuickError('Purchase price must be a non-negative number.');
                return;
            }
        }
        try {
            // Check if barcode already exists
            if (quickBarcode) {
                const { data: existing } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').select('id, stock_quantity, product_name').eq('barcode', quickBarcode).maybeSingle();
                if (existing) {
                    const newStock = (existing.stock_quantity ?? 0) + stockQty;
                    const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
                        stock_quantity: newStock
                    }).eq('id', existing.id);
                    if (updateError) {
                        setQuickError(updateError.message);
                        return;
                    }
                    addToast('success', `Updated stock for existing product: ${existing.product_name}`);
                    await refreshProducts();
                    const updatedProduct = products.find((p)=>p.id === existing.id);
                    if (updatedProduct) {
                        addToCart({
                            ...updatedProduct,
                            stock_quantity: newStock
                        }, 1);
                    }
                    setQuickAddOpen(false);
                    return;
                }
            }
            const payload = {
                product_name: name || null,
                barcode: quickBarcode || null,
                category: quickCategory || null,
                default_code: quickDefaultCode || null,
                size: quickSize || null,
                variant: quickVariant || null,
                sale_price: salePrice,
                purchase_price: Number(quickPurchasePrice) || null,
                stock_quantity: stockQty,
                description_en: quickDescription || null,
                description_mm: quickDescriptionMm || null,
                image_url: quickImageUrl || null,
                remark: quickRemark || null,
                reorder: 2
            };
            let { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').insert(payload).select().single();
            if (error && /duplicate key value violates unique constraint/i.test(error.message)) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].rpc('sync_products_id_seq');
                ({ data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').insert(payload).select().single());
            }
            if (error || !data) {
                const msg = error?.message ?? 'Failed to create product.';
                setQuickError(msg);
                addToast('error', msg);
                return;
            }
            let created = data;
            if (quickImageFile) {
                const uploadResult = await uploadQuickAddImage(created.id, quickImageFile);
                if (uploadResult.error || !uploadResult.url) {
                    setQuickError(uploadResult.error ?? 'Image upload failed.');
                } else {
                    const { data: updated } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseClient"].from('products').update({
                        image_url: uploadResult.url
                    }).eq('id', created.id).select().single();
                    if (updated) {
                        created = updated;
                    }
                }
            }
            // Add immediately to cart and close modal
            addToCart(created, 1);
            await refreshProducts();
            setQuickAddOpen(false);
            setQuickImageFile(null);
            setQuickImagePreviewUrl(null);
            addToast('success', `${created.product_name} added to inventory and cart.`);
        } catch (e) {
            const msg = e instanceof Error ? e.message : 'Failed to create product.';
            setQuickError(msg);
            addToast('error', msg);
        }
    }
    const selectedImageUrl = selectedProduct ? getValidImageUrl(selectedProduct.image_url) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-c99c8882a51a21f8" + " " + "flex h-screen max-h-[100vh] w-full overflow-hidden bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "c99c8882a51a21f8",
                children: ".scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.custom-scrollbar::-webkit-scrollbar{width:5px;height:5px}.custom-scrollbar::-webkit-scrollbar-track{background:0 0}.custom-scrollbar::-webkit-scrollbar-thumb{background:#0000000d;border-radius:10px}.dark .custom-scrollbar::-webkit-scrollbar-thumb{background:#ffffff0d}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#0000001a}.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#ffffff1a}.print-only{display:none}@media print{body{color:#000;background:#fff}body *{visibility:hidden}#print-receipt,#print-receipt *{visibility:visible}.print-only{display:block!important}#print-receipt{width:80mm;padding:4mm;font-family:Pyidaungsu,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-size:11px;line-height:1.4;position:absolute;top:0;left:0}#print-receipt .receipt-title{text-align:center;margin-bottom:6px;font-size:13px;font-weight:700}#print-receipt .receipt-row{justify-content:space-between;gap:8px;display:flex}#print-receipt table{border-collapse:collapse;table-layout:fixed;width:100%}#print-receipt th,#print-receipt td{vertical-align:top;padding:2px 4px}#print-receipt th{text-transform:uppercase;font-size:10px}#print-receipt .receipt-item{word-wrap:break-word;white-space:normal}#print-receipt .receipt-amount{font-weight:700}#print-receipt .divider{border-top:1px dashed #444;margin:6px 0}}"
            }, void 0, false, void 0, this),
            lastReceipt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "print-receipt",
                className: "jsx-c99c8882a51a21f8" + " " + "print-only",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-title",
                        children: "THE MORE YOU GLOW BY INGYIN"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2244,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Invoice"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: lastReceipt.invoiceId || '—'
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2245,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: lastReceipt.date
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2251,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2249,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Time"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2254,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: lastReceipt.time
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2255,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Staff"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2258,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: lastReceipt.staffName || '—'
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2259,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2257,
                        columnNumber: 11
                    }, this),
                    lastReceipt.saleType === 'Delivery' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c99c8882a51a21f8" + " " + "divider"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2263,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: "Customer Name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2265,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: lastReceipt.customerName || '—'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2266,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2264,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: "Phone"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2269,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: lastReceipt.customerPhone || '—'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2270,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2268,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: "Address"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2273,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: lastReceipt.customerAddress || '—'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2274,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2272,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "divider"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2278,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "jsx-c99c8882a51a21f8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "jsx-c99c8882a51a21f8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "jsx-c99c8882a51a21f8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            align: "left",
                                            style: {
                                                width: '44mm'
                                            },
                                            className: "jsx-c99c8882a51a21f8",
                                            children: "Item"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2282,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            align: "right",
                                            style: {
                                                width: '8mm'
                                            },
                                            className: "jsx-c99c8882a51a21f8",
                                            children: "Qty"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2283,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            align: "right",
                                            style: {
                                                width: '14mm'
                                            },
                                            className: "jsx-c99c8882a51a21f8",
                                            children: "Price"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2284,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            align: "right",
                                            style: {
                                                width: '14mm'
                                            },
                                            className: "jsx-c99c8882a51a21f8",
                                            children: "Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2285,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2281,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "jsx-c99c8882a51a21f8",
                                children: lastReceipt.items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "jsx-c99c8882a51a21f8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "jsx-c99c8882a51a21f8" + " " + "receipt-item",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2291,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                align: "right",
                                                className: "jsx-c99c8882a51a21f8",
                                                children: item.qty
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2292,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                align: "right",
                                                className: "jsx-c99c8882a51a21f8",
                                                children: item.price.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2293,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                align: "right",
                                                className: "jsx-c99c8882a51a21f8" + " " + "receipt-amount",
                                                children: item.amount.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2294,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${item.name}-${index}`, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2290,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2288,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2279,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "divider"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2299,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: [
                                    lastReceipt.total.toLocaleString(),
                                    " Ks"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2302,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Discount"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2305,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c99c8882a51a21f8",
                                children: [
                                    lastReceipt.discount.toLocaleString(),
                                    " Ks"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2306,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2304,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + "receipt-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "jsx-c99c8882a51a21f8",
                                children: "Net"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2309,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "jsx-c99c8882a51a21f8",
                                children: [
                                    lastReceipt.netAmount.toLocaleString(),
                                    " Ks"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2310,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2308,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2243,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c99c8882a51a21f8" + " " + "flex flex-1 flex-col min-h-0 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-c99c8882a51a21f8" + " " + "flex flex-1 min-h-0 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "flex flex-1 flex-col min-w-0 overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemoProductArea, {
                                products: matches,
                                query: query,
                                onQueryChange: setQuery,
                                onScanClick: ()=>setScanOpen(true),
                                onAddToCart: addToCart,
                                onProductClick: setSelectedProduct,
                                categories: mainCategoriesList,
                                activeCategory: selectedMainCategory,
                                onCategoryChange: setSelectedMainCategory,
                                loading: productsLoading,
                                missingBarcode: missingBarcode,
                                onQuickAdd: ()=>{
                                    if (!missingBarcode) return;
                                    openQuickAddForBarcode(missingBarcode);
                                    setMissingBarcode(null);
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2319,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartSidebar, {
                            cart: cart,
                            onUpdateQuantity: setCartQuantity,
                            onUpdatePrice: setCartPrice,
                            onRemoveItem: removeFromCart,
                            totalAmount: totalAmount,
                            customerName: customerName,
                            onCustomerNameChange: setCustomerName,
                            customerPhone: customerPhone,
                            onCustomerPhoneChange: setCustomerPhone,
                            customerAddress: customerAddress,
                            onCustomerAddressChange: setCustomerAddress,
                            customerMatch: customerMatch,
                            saleType: saleType,
                            onSaleTypeChange: setSaleType,
                            paymentMethod: paymentMethod,
                            onPaymentMethodChange: setPaymentMethod,
                            courierName: courierName,
                            onCourierNameChange: setCourierName,
                            deliFee: deliFee,
                            onDeliFeeChange: setDeliFee,
                            isBagoSpecial: isBagoSpecial,
                            onBagoSpecialChange: setIsBagoSpecial,
                            remark: remark,
                            onRemarkChange: setRemark,
                            onCheckout: ()=>setIsConfirmingCheckout(true),
                            isCheckingOut: checkingOut,
                            canCheckout: canCheckout,
                            checkoutError: checkoutError,
                            collapsed: cartCollapsed,
                            onToggleCollapse: ()=>setCartCollapsed(!cartCollapsed),
                            onClearCart: ()=>setCart([]),
                            checkoutMode: checkoutMode,
                            onToggleCheckout: ()=>setCheckoutMode(!checkoutMode)
                        }, cartSidebarKey, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2340,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 2316,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2315,
                columnNumber: 7
            }, this),
            isScannerModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleCloseScanner,
                className: "jsx-c99c8882a51a21f8" + " " + "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-c99c8882a51a21f8" + " " + "w-[95vw] max-h-[90vh] overflow-y-auto max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-2xl relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleCloseScanner,
                            "aria-label": "Close scanner",
                            className: "jsx-c99c8882a51a21f8" + " " + "absolute right-3 top-3 z-[9999] flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-foreground shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                lineNumber: 2396,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2390,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "mb-4 flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Manual barcode entry...",
                                            className: "h-[44px] rounded-xl",
                                            value: manualBarcodeInput,
                                            onChange: (e)=>setManualBarcodeInput(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') {
                                                    handleScannedBarcode(manualBarcodeInput);
                                                    setManualBarcodeInput('');
                                                    setScanOpen(false);
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2400,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>{
                                                handleScannedBarcode(manualBarcodeInput);
                                                setManualBarcodeInput('');
                                                setScanOpen(false);
                                            },
                                            className: "h-[44px] rounded-xl px-6 font-bold",
                                            children: "Add"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2413,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            className: "h-[44px] rounded-xl px-6 font-bold",
                                            onClick: ()=>{
                                                openQuickAddForBarcode(manualBarcodeInput.trim());
                                                setManualBarcodeInput('');
                                                setScanOpen(false);
                                            },
                                            children: "Quick Add Product"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2418,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2399,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-lg font-bold",
                                            children: "Scanner"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2431,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-xs text-muted-foreground",
                                            children: "Align barcode with scanner window"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2432,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + ((scanStatus === 'found' ? 'text-xs font-semibold text-emerald-500' : scanStatus === 'missing' ? 'text-xs font-semibold text-red-500' : 'text-xs text-muted-foreground') || ""),
                                            children: scanStatus === 'found' ? 'Found' : scanStatus === 'missing' ? 'Not Found' : cameraLoading ? 'Initializing Camera...' : 'Scanning...'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2433,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2430,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "flex items-center gap-2",
                                    children: [
                                        cameras.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            className: "h-[44px] rounded-xl text-[10px] px-4 font-bold",
                                            onClick: ()=>setCurrentCameraIndex((prev)=>(prev + 1) % cameras.length),
                                            children: "Switch"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2453,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            className: "h-[44px] rounded-xl text-[10px] px-4 font-bold",
                                            onClick: handleResetScanner,
                                            children: "Reset Camera"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2462,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2451,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2398,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "relative h-[28vh] sm:h-[32vh] md:h-[36vh] bg-black rounded-2xl overflow-hidden",
                            children: [
                                isScannerModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScannerComponent, {}, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2474,
                                    columnNumber: 38
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "absolute inset-6 pointer-events-none rounded-2xl border-2 border-primary/60"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2476,
                                    columnNumber: 15
                                }, this),
                                scanFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "absolute inset-0 bg-green-400/20 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2478,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2473,
                            columnNumber: 13
                        }, this),
                        (cameraCapabilities?.torchSupported || cameraCapabilities?.zoomSupported) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "mt-4 flex items-center justify-center gap-6 border-t pt-4",
                            children: [
                                cameraCapabilities.torchSupported && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: torchOn ? "default" : "outline",
                                    className: "h-[44px] rounded-xl gap-2 px-6 font-bold",
                                    onClick: ()=>{
                                        const track = videoTrackRef.current;
                                        if (!track) return;
                                        const next = !torchOn;
                                        track.applyConstraints({
                                            advanced: [
                                                {
                                                    torch: next
                                                }
                                            ]
                                        }).then(()=>setTorchOn(next)).catch(()=>addToast('error', 'Flash not supported'));
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4", torchOn && "fill-current")
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2497,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8",
                                            children: "Flash"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2498,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2485,
                                    columnNumber: 19
                                }, this),
                                cameraCapabilities.zoomSupported && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-xs font-mono",
                                            children: [
                                                zoomValue.toFixed(1),
                                                "x"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2503,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "range",
                                            min: cameraCapabilities.zoomMin,
                                            max: cameraCapabilities.zoomMax,
                                            step: 0.1,
                                            value: zoomValue,
                                            onChange: (e)=>{
                                                const v = parseFloat(e.target.value);
                                                setZoomValue(v);
                                                videoTrackRef.current?.applyConstraints({
                                                    advanced: [
                                                        {
                                                            zoom: v
                                                        }
                                                    ]
                                                });
                                            },
                                            className: "jsx-c99c8882a51a21f8" + " " + "w-32 accent-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2504,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2502,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2483,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 2386,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2382,
                columnNumber: 9
            }, this),
            quickAddOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>{
                    setQuickAddOpen(false);
                    setQuickError(null);
                    if (scanOpen) setScanOpen(false);
                },
                className: "jsx-c99c8882a51a21f8" + " " + "fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-c99c8882a51a21f8" + " " + "w-full max-w-lg rounded-lg border border-border bg-card p-5 shadow-xl scrollbar-hide max-h-[90vh] overflow-y-auto pointer-events-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "mb-4 flex items-center justify-between border-b border-border/60 pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-base font-bold",
                                            children: "New Product"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2542,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[10px] font-semibold uppercase text-muted-foreground",
                                                    children: "Barcode:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2544,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: quickBarcode,
                                                    onChange: (e)=>setQuickBarcode(e.target.value),
                                                    className: "h-8 w-40 text-[11px] font-mono rounded-lg",
                                                    placeholder: "Manual Barcode"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2545,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2543,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2541,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    className: "h-[44px] px-4 rounded-xl",
                                    onClick: ()=>{
                                        setQuickAddOpen(false);
                                        setQuickError(null);
                                        setQuickImageFile(null);
                                        setQuickImagePreviewUrl(null);
                                        if (scanOpen) setScanOpen(false);
                                    },
                                    "aria-label": "Close",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2553,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2540,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "grid gap-4 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Product Name *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2572,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: quickName,
                                            onChange: (e)=>setQuickName(e.target.value),
                                            placeholder: "Essential Face Cream",
                                            className: "h-[44px] rounded-xl",
                                            autoFocus: true,
                                            autoComplete: "off"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2575,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2571,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "grid gap-3 md:grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "SKU"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2586,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: quickDefaultCode,
                                                    onChange: (e)=>setQuickDefaultCode(e.target.value),
                                                    placeholder: "SKU-001",
                                                    className: "h-[44px] rounded-xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2589,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2585,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Size"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2597,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: quickSize,
                                                    onChange: (e)=>setQuickSize(e.target.value),
                                                    placeholder: "250ml",
                                                    className: "h-[44px] rounded-xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2600,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2596,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Variant"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2608,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: quickVariant,
                                                    onChange: (e)=>setQuickVariant(e.target.value),
                                                    placeholder: "Lavender",
                                                    className: "h-[44px] rounded-xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2611,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2607,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2584,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2622,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: quickCategory,
                                                onChange: (e)=>setQuickCategory(e.target.value),
                                                placeholder: "Skin Care",
                                                className: "h-[44px] rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2625,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2621,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2620,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Purchase Price (Ks)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2636,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: quickPurchasePrice,
                                                    onChange: (e)=>setQuickPurchasePrice(e.target.value),
                                                    type: "number",
                                                    inputMode: "decimal",
                                                    placeholder: "0",
                                                    className: "h-[44px] rounded-xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2639,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2635,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Sale Price (Ks) *"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2649,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: quickSalePrice,
                                                    onChange: (e)=>setQuickSalePrice(e.target.value),
                                                    type: "number",
                                                    inputMode: "decimal",
                                                    placeholder: "0",
                                                    className: "h-[44px] rounded-xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2652,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2648,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2634,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Stock Quantity *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2664,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: quickStock,
                                            onChange: (e)=>setQuickStock(e.target.value),
                                            type: "number",
                                            inputMode: "numeric",
                                            placeholder: "0",
                                            className: "h-[44px] rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2667,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2663,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Image URL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2678,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: quickImageUrl,
                                            onChange: (e)=>setQuickImageUrl(e.target.value),
                                            placeholder: "https://example.com/item.jpg",
                                            className: "h-[44px] rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2681,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2677,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Image Upload"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2690,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            accept: "image/*",
                                            onChange: (e)=>setQuickImageFile(e.target.files?.[0] ?? null),
                                            className: "h-[44px] rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2693,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2689,
                                    columnNumber: 17
                                }, this),
                                quickImagePreviewUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "md:col-span-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: quickImagePreviewUrl,
                                        alt: "Preview",
                                        className: "jsx-c99c8882a51a21f8" + " " + "h-28 w-28 rounded-xl border border-border object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2703,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2702,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "grid gap-3 md:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Description (EN)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2713,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: quickDescription,
                                                    onChange: (e)=>setQuickDescription(e.target.value),
                                                    placeholder: "Product details...",
                                                    className: "jsx-c99c8882a51a21f8" + " " + "min-h-[90px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2716,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2712,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                                    children: "Description (MM)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2724,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: quickDescriptionMm,
                                                    onChange: (e)=>setQuickDescriptionMm(e.target.value),
                                                    placeholder: "မြန်မာစာ ဖော်ပြချက်...",
                                                    className: "jsx-c99c8882a51a21f8" + " " + "min-h-[90px] w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2727,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2723,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2711,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Remark"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2737,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: quickRemark,
                                            onChange: (e)=>setQuickRemark(e.target.value),
                                            placeholder: "Notes / Batch number",
                                            className: "h-[44px] rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2740,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2736,
                                    columnNumber: 17
                                }, this),
                                quickError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-[11px] text-destructive",
                                    children: quickError
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2749,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2570,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "mt-6 flex justify-end gap-3 border-t border-border pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    className: "h-[44px] px-6 rounded-xl",
                                    onClick: ()=>{
                                        setQuickAddOpen(false);
                                        if (scanOpen) setScanOpen(false);
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2756,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    className: "h-[44px] px-8 rounded-xl font-bold",
                                    onClick: handleQuickAddSave,
                                    children: "Save & Add to Cart"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2767,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2755,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 2536,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2528,
                columnNumber: 11
            }, this),
            selectedProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setSelectedProduct(null),
                className: "jsx-c99c8882a51a21f8" + " " + "fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-c99c8882a51a21f8" + " " + "w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "flex items-center justify-between p-6 pb-4 border-b border-border bg-card shrink-0 z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "text-xl font-bold truncate pr-4",
                                    children: selectedProduct.product_name
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2792,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-10 w-10 rounded-xl shrink-0",
                                    onClick: ()=>setSelectedProduct(null),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2799,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2793,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2791,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "relative aspect-square rounded-xl bg-muted overflow-hidden flex items-center justify-center border shrink-0",
                                            children: selectedImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: selectedImageUrl,
                                                alt: selectedProduct.product_name || '',
                                                onError: (e)=>{
                                                    e.target.src = '';
                                                },
                                                className: "jsx-c99c8882a51a21f8" + " " + "h-full w-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2808,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                className: "h-16 w-16 opacity-10"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2817,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2806,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "flex flex-col gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-bold uppercase text-muted-foreground tracking-wider",
                                                            children: "Price"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2823,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-2xl font-black text-[#8B5CF6]",
                                                            children: formatPrice(selectedProduct.sale_price ?? 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2824,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2822,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-bold uppercase text-muted-foreground tracking-wider",
                                                            children: "Inventory"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2828,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-bold", (selectedProduct.stock_quantity ?? 0) > 0 ? "text-primary" : "text-destructive") || ""),
                                                            children: [
                                                                selectedProduct.stock_quantity ?? 0,
                                                                " available"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2829,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2827,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c99c8882a51a21f8" + " " + "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-bold uppercase text-muted-foreground tracking-wider",
                                                            children: "Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2835,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground",
                                                            children: [
                                                                "Variant: ",
                                                                selectedProduct.variant || 'Standard'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2836,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground",
                                                            children: [
                                                                "Barcode: ",
                                                                selectedProduct.barcode || 'N/A'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2839,
                                                            columnNumber: 21
                                                        }, this),
                                                        selectedProduct.default_code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground",
                                                            children: [
                                                                "SKU: ",
                                                                selectedProduct.default_code
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                            lineNumber: 2843,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                    lineNumber: 2834,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2821,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2805,
                                    columnNumber: 15
                                }, this),
                                selectedProduct.description_en && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "mt-6 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-[11px] font-bold uppercase text-muted-foreground tracking-wider",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2853,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg leading-relaxed",
                                            children: selectedProduct.description_en
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2854,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2852,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2804,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "p-6 pt-4 border-t border-border bg-card shrink-0 flex gap-3 z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "flex-1 h-14 rounded-xl font-bold text-base",
                                    onClick: ()=>setSelectedProduct(null),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2863,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "flex-[2] h-14 rounded-xl font-black text-base shadow-lg shadow-primary/20",
                                    disabled: (selectedProduct.stock_quantity ?? 0) <= 0,
                                    onClick: ()=>{
                                        addToCart(selectedProduct);
                                        setSelectedProduct(null);
                                        addToast('success', `${selectedProduct.product_name} added to cart.`);
                                    },
                                    children: "Confirm Add to Cart"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2870,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2862,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 2786,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2782,
                columnNumber: 9
            }, this),
            isConfirmingCheckout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>!checkingOut && setIsConfirmingCheckout(false),
                className: "jsx-c99c8882a51a21f8" + " " + "fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-c99c8882a51a21f8" + " " + "w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "text-center space-y-2 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        className: "h-6 w-6 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2898,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2897,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "text-xl font-bold",
                                    children: "Confirm Sale"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2900,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground",
                                    children: "Please review the total amount before proceeding."
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2901,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2896,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "bg-muted/30 rounded-xl p-4 space-y-3 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "flex justify-between text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-muted-foreground",
                                            children: [
                                                "Subtotal (",
                                                cart.reduce((a, b)=>a + b.quantity, 0),
                                                " items)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2908,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "font-bold",
                                            children: formatPrice(totalAmount)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2909,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2907,
                                    columnNumber: 15
                                }, this),
                                saleType === 'Delivery' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "flex justify-between text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "text-muted-foreground",
                                            children: "Delivery Fee"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2913,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "font-bold",
                                            children: formatPrice(Number(deliFee) || 0)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2914,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2912,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "border-t border-dashed pt-3 flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "font-bold text-base",
                                            children: "Total Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2918,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-c99c8882a51a21f8" + " " + "font-black text-xl text-primary",
                                            children: formatPrice(totalAmount + (saleType === 'Delivery' ? Number(deliFee) || 0 : 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                            lineNumber: 2919,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2917,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2906,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "flex-1 h-12 rounded-xl font-bold",
                                    onClick: ()=>setIsConfirmingCheckout(false),
                                    disabled: checkingOut,
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2926,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "flex-[1.5] h-12 rounded-xl font-bold shadow-lg shadow-primary/20",
                                    onClick: handleCheckout,
                                    disabled: checkingOut,
                                    children: checkingOut ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                                lineNumber: 2941,
                                                columnNumber: 21
                                            }, this),
                                            "Processing..."
                                        ]
                                    }, void 0, true) : "Confirm Sale"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2934,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2925,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 2892,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2888,
                columnNumber: 9
            }, this),
            checkoutSuccessOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleCloseSuccessModal,
                className: "jsx-c99c8882a51a21f8" + " " + "fixed inset-0 z-[160] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-c99c8882a51a21f8" + " " + "w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "text-center space-y-2 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-6 w-6 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                        lineNumber: 2964,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2963,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "text-xl font-bold",
                                    children: "Payment Successful"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2966,
                                    columnNumber: 15
                                }, this),
                                checkoutInvoiceId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground",
                                    children: [
                                        "Invoice: ",
                                        checkoutInvoiceId
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2968,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-c99c8882a51a21f8" + " " + "text-sm text-muted-foreground",
                                    children: "Stock updated and cart cleared."
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2970,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2962,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c99c8882a51a21f8" + " " + "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "h-12 flex-1 rounded-xl font-bold",
                                    onClick: handlePrintReceipt,
                                    disabled: !lastReceipt,
                                    children: "Print"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2973,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "h-12 flex-1 rounded-xl font-bold",
                                    onClick: handleCloseSuccessModal,
                                    children: "Done"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                                    lineNumber: 2981,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/pos/page.tsx",
                            lineNumber: 2972,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/pos/page.tsx",
                    lineNumber: 2958,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2954,
                columnNumber: 9
            }, this),
            toasts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c99c8882a51a21f8" + " " + "fixed bottom-4 right-4 z-50 space-y-2",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c99c8882a51a21f8" + " " + `rounded-md border px-3 py-2 text-sm shadow-md ${t.type === 'success' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' : 'border-destructive/60 bg-destructive/10 text-destructive'}`,
                        children: t.message
                    }, t.id, false, {
                        fileName: "[project]/app/(dashboard)/pos/page.tsx",
                        lineNumber: 2997,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/pos/page.tsx",
                lineNumber: 2995,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/pos/page.tsx",
        lineNumber: 2147,
        columnNumber: 5
    }, this);
}
_s3(PosPage, "W5m60uhX0oiZ5wleL6/rLQniq4Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useProducts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProducts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useCategories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategories"]
    ];
});
_c6 = PosPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "ProductCard");
__turbopack_context__.k.register(_c1, "MemoProductCard");
__turbopack_context__.k.register(_c2, "ProductArea");
__turbopack_context__.k.register(_c3, "MemoProductArea");
__turbopack_context__.k.register(_c4, "CartSidebar");
__turbopack_context__.k.register(_c5, "ScannerComponent");
__turbopack_context__.k.register(_c6, "PosPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_56debd85._.js.map