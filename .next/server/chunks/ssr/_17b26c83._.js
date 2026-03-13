module.exports=[5522,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(97895);let e=c.forwardRef(({className:a,type:c,...e},f)=>(0,b.jsx)("input",{type:c,className:(0,d.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors","placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background","disabled:cursor-not-allowed disabled:opacity-50",a),ref:f,...e}));e.displayName="Input",a.s(["Input",0,e])},17171,a=>{"use strict";var b=a.i(87924),c=a.i(97895);function d({className:a,...d}){return(0,b.jsx)("label",{className:(0,c.cn)("text-xs font-medium text-muted-foreground",a),...d})}a.s(["Label",()=>d])},15625,a=>{"use strict";var b=a.i(72131),c=a.i(7291);function d(){let[a,d]=b.useState([]),[e,f]=b.useState(!0),[g,h]=b.useState(null),i=b.useCallback(async()=>{f(!0),h(null);let{data:a,error:b}=await c.supabaseClient.from("products").select(`
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
      `).order("created_at",{ascending:!1});if(b){h(b.message),f(!1);return}d(a??[]),f(!1)},[]);return b.useEffect(()=>{i();let a=c.supabaseClient.channel("products-changes").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{i()}).subscribe();return()=>{c.supabaseClient.removeChannel(a)}},[i]),{products:a,loading:e,error:g,refresh:i}}a.s(["useProducts",()=>d])},41413,a=>{"use strict";var b=a.i(72131),c=a.i(7291);function d(){let[a,d]=b.useState([]),[e,f]=b.useState(!0),g=b.useCallback(async()=>{f(!0);let{data:a}=await c.supabaseClient.from("categories").select("*").order("name");d(a??[]),f(!1)},[]);return b.useEffect(()=>{g()},[g]),{categories:a,loading:e,refresh:g}}a.s(["useCategories",()=>d])},33508,a=>{"use strict";let b=(0,a.i(70106).default)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);a.s(["X",()=>b],33508)}];

//# sourceMappingURL=_17b26c83._.js.map