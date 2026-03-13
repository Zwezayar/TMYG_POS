(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, attribute = 'class', defaultTheme = 'dark', enableSystem = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: attribute,
        defaultTheme: defaultTheme,
        enableSystem: enableSystem,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/language-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage,
    "useT",
    ()=>useT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
const LanguageContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('en');
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "LanguageProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const stored = window.localStorage.getItem('tmyg-lang');
            if (stored === 'en' || stored === 'mm') {
                setLanguage(stored);
                document.documentElement.lang = stored === 'en' ? 'en' : 'my';
            }
        }
    }["LanguageProvider.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "LanguageProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.localStorage.setItem('tmyg-lang', language);
            document.documentElement.lang = language === 'en' ? 'en' : 'my';
        }
    }["LanguageProvider.useEffect"], [
        language
    ]);
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LanguageProvider.useMemo[value]": ()=>({
                language,
                setLanguage
            })
    }["LanguageProvider.useMemo[value]"], [
        language
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/language-provider.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "VvXRdARNdny1oTkn4WBX22+z9PE=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return ctx;
}
_s1(useLanguage, "/dMy7t63NXD4eYACoT93CePwGrg=");
const translations = {
    en: {
        appName: 'The More You Glow By Ingyin POS',
        appShort: 'The More You Glow By Ingyin',
        dashboardSubtitle: 'POS Dashboard',
        loginBadge: 'Sign in to The More You Glow By Ingyin',
        loginHeading: 'Welcome back',
        loginButton: 'Sign in',
        loginEmail: 'Email',
        loginPassword: 'Password',
        dashboardOverview: 'Overview',
        dashboardSubtext: 'Daily, monthly, and yearly performance at a glance.',
        inventoryTitle: 'Inventory',
        inventorySubtext: 'Manage products, prices, and stock levels.',
        addProduct: 'Add product'
    },
    mm: {
        appName: 'THE MORE YOU GLOW By Ingyin POS',
        appShort: 'The More You Glow By Ingyin',
        dashboardSubtitle: 'အရောင်းစနစ်',
        loginBadge: 'The More You Glow By Ingyin သို့ ဝင်ရောက်ပါ',
        loginHeading: 'ပြန်လည်ကြိုဆိုပါတယ်',
        loginButton: 'လော့ဂ်အင်ဝင်မည်',
        loginEmail: 'အီးမေးလ်',
        loginPassword: 'လျှို့ဝှက်နံပါတ်',
        dashboardOverview: 'အထွေထွေ အမြင်',
        dashboardSubtext: 'နေ့စဉ် / လစဉ် / နှစ်အလိုက် အရောင်း အခြေအနေ။',
        inventoryTitle: 'ကုန်ပစ္စည်း စာရင်း',
        inventorySubtext: 'အရောင်းဈေးနှုန်း၊ စတော့နှင့် ကုန်ပစ္စည်းများ စီမံခန့်ခွဲရန်။',
        addProduct: 'ကုန်ပစ္စည်းအသစ် ထည့်မည်'
    }
};
function useT() {
    _s2();
    const { language } = useLanguage();
    return (key)=>translations[language][key];
}
_s2(useT, "d1ORxvPBup+C3Qetit/BVjvgCJk=", false, function() {
    return [
        useLanguage
    ];
});
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_9e6d8c48._.js.map