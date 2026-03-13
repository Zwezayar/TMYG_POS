(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,23750,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(47163);let a=s.forwardRef(({className:e,type:s,...a},i)=>(0,t.jsx)("input",{type:s,className:(0,r.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors","placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:cursor-not-allowed disabled:opacity-50",e),ref:i,...a}));a.displayName="Input",e.s(["Input",0,a])},31278,e=>{"use strict";let t=(0,e.i(75254).default)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",()=>t],31278)},17967,e=>{"use strict";var t=e.i(71645),s=e.i(53210);function r(){let[e,r]=t.useState([]),[a,i]=t.useState(!0),[u,c]=t.useState(null),l=t.useCallback(async()=>{i(!0),c(null);let{data:e,error:t}=await s.supabaseClient.from("products").select(`
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
      `).order("created_at",{ascending:!1});if(t){c(t.message),i(!1);return}r(e??[]),i(!1)},[]);return t.useEffect(()=>{l();let e=s.supabaseClient.channel("products-changes").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{l()}).subscribe();return()=>{s.supabaseClient.removeChannel(e)}},[l]),{products:e,loading:a,error:u,refresh:l}}e.s(["useProducts",()=>r])},37727,e=>{"use strict";let t=(0,e.i(75254).default)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);e.s(["X",()=>t],37727)},73679,e=>{"use strict";var t=e.i(71645),s=e.i(53210);function r(){let[e,r]=t.useState([]),[a,i]=t.useState(!0),u=t.useCallback(async()=>{i(!0);let{data:e}=await s.supabaseClient.from("categories").select("*").order("name");r(e??[]),i(!1)},[]);return t.useEffect(()=>{u()},[u]),{categories:e,loading:a,refresh:u}}e.s(["useCategories",()=>r])},87087,e=>{e.v(t=>Promise.all(["static/chunks/1c9ffce5dd967e02.js"].map(t=>e.l(t))).then(()=>t(5003)))}]);