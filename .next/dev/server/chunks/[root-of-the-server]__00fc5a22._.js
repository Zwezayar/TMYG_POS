module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabaseServer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerSupabaseClient",
    ()=>createServerSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://sjjjmhbnxckztmahtngh.supabase.co");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
function createServerSupabaseClient() {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false
        }
    });
}
}),
"[project]/app/api/pos/checkout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseServer.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const authHeader = req.headers.get('authorization');
        const accessToken = authHeader?.replace(/^Bearer\s+/i, '');
        if (!accessToken) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const url = ("TURBOPACK compile-time value", "https://sjjjmhbnxckztmahtngh.supabase.co");
        const anonKey = ("TURBOPACK compile-time value", "sb_publishable_N_rDvGSpsj9Aw8cM_deLOA_SRWriUc8");
        const anon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey, {
            auth: {
                persistSession: false
            }
        });
        const { data: { user }, error: userError } = await anon.auth.getUser(accessToken);
        if (userError || !user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid or expired session'
            }, {
                status: 401
            });
        }
        const cashierId = user.id;
        const body = await req.json();
        const rawItems = Array.isArray(body.items) ? body.items : [];
        const saleType = body.sale_type === 'Delivery' ? 'Delivery' : 'Shop';
        const deliveryInfo = body.delivery_info ?? null;
        // Items များကို စစ်ဆေးခြင်း
        const items = rawItems.map((i)=>{
            if (i && typeof i === 'object') {
                return {
                    product_id: Number(i.product_id),
                    quantity: Number(i.quantity),
                    sale_price: Number(i.sale_price)
                };
            }
            return null;
        }).filter((x)=>x !== null && Number.isFinite(x.product_id) && x.product_id > 0 && x.quantity > 0);
        if (items.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Cart is empty or invalid'
            }, {
                status: 400
            });
        }
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
        // ၁။ Generate Invoice ID (INV-YYMMDD-XXX)
        const now = new Date();
        const dateStr = now.toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
        const { data: lastOrder } = await supabase.from('orders').select('invoice_id').like('invoice_id', `INV-${dateStr}-%`).order('invoice_id', {
            ascending: false
        }).limit(1).single();
        let nextNum = 1;
        if (lastOrder) {
            const lastNum = parseInt(lastOrder.invoice_id.split('-').pop() ?? '0');
            nextNum = lastNum + 1;
        }
        const invoiceId = `INV-${dateStr}-${String(nextNum).padStart(3, '0')}`;
        // ၂။ Stock လက်ကျန်ရှိမရှိ စစ်ဆေးခြင်း
        const productIds = items.map((i)=>i.product_id);
        const { data: products, error: productsError } = await supabase.from('products').select('id, stock_quantity').in('id', productIds);
        if (productsError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: productsError.message
            }, {
                status: 500
            });
        }
        // Fix: Normalize ID to string to ensure Map lookup works correctly regardless of number/string type
        const stockById = new Map((products ?? []).map((p)=>[
                Number(p.id),
                p.stock_quantity ?? 0
            ]));
        for (const item of items){
            const stock = stockById.get(item.product_id) ?? 0;
            if (item.quantity > stock) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Out of stock! Only ${stock} units left.`
                }, {
                    status: 400
                });
            }
        }
        const subtotal = items.reduce((sum, i)=>sum + i.quantity * i.sale_price, 0);
        const totalAmount = subtotal;
        // ၃။ Orders Table ထဲသို့ အချက်အလက်သွင်းခြင်း
        let remark = body.remark ?? '';
        if (body.customer_name) remark += ` | Name: ${body.customer_name}`;
        if (body.customer_phone) remark += ` | Phone: ${body.customer_phone}`;
        if (body.customer_address) remark += ` | Addr: ${body.customer_address}`;
        const orderPayload = {
            invoice_id: invoiceId,
            sale_type: saleType,
            payment_method: body.payment_method ?? 'Cash',
            payment_status: 'Check',
            total_amount: totalAmount,
            cashier_id: cashierId,
            remark: remark.trim() || null,
            receipt_payload: body.receipt_payload ?? null
        };
        if (saleType === 'Delivery') {
            orderPayload.customer_name = body.customer_name ?? null;
            orderPayload.customer_phone = body.customer_phone ?? null;
            orderPayload.customer_address = body.customer_address ?? null;
            orderPayload.courier_name = deliveryInfo?.courier_name ?? null;
            orderPayload.delivery_fee = Number(deliveryInfo?.deli_fee ?? 0) || 0;
        }
        let orderRow = null;
        try {
            const { data, error: orderError } = await supabase.from('orders').insert(orderPayload).select('id').single();
            if (orderError) {
                console.error('Order creation failed:', orderError);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Failed to create order record: ${orderError.message}`
                }, {
                    status: 500
                });
            }
            orderRow = data;
        } catch (err) {
            console.error('Order creation exception:', err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Failed to create order record.'
            }, {
                status: 500
            });
        }
        if (!orderRow?.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Order created but ID returned null'
            }, {
                status: 500
            });
        }
        const orderId = orderRow.id;
        // ၄။ Order Items သွင်းခြင်း
        const orderItems = items.map((i)=>({
                order_id: orderId,
                product_id: i.product_id,
                quantity: i.quantity,
                unit_price: i.sale_price,
                subtotal: i.quantity * i.sale_price
            }));
        const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
        if (itemsError) {
            await supabase.from('orders').delete().eq('id', orderId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: itemsError.message
            }, {
                status: 500
            });
        }
        // ၅။ Delivery Table ထဲသို့ အချက်အလက်သွင်းခြင်း (လျှင် Delivery ဖြစ်ပါက)
        if (saleType === 'Delivery' && deliveryInfo) {
            const deliFee = Number(deliveryInfo.deli_fee ?? 0);
            const isBagoSpecial = !!deliveryInfo.is_bago_special;
            let totalToCollect = subtotal;
            let deliFeePayable = deliFee;
            if (isBagoSpecial) {
                // Bago Delivery Logic: total_to_collect = subtotal + deli_fee.
                totalToCollect = subtotal + deliFee;
                // deli_fee_payable traces how much the shop owes the courier. 
                // Logic might vary based on business, but we follow the UI requirement.
                deliFeePayable = deliFee;
            }
            const { error: deliError } = await supabase.from('deliveries').insert({
                order_id: orderId,
                courier_name: deliveryInfo.courier_name || null,
                deli_fee: deliFee,
                deli_fee_payable: deliFeePayable,
                status: 'Pending',
                is_bago_special: isBagoSpecial,
                total_to_collect: totalToCollect
            });
            if (deliError) {
                console.error('Delivery record error:', deliError);
            }
        }
        // ၆။ Stock အရေအတွက် နှုတ်ခြင်း (RPC Call)
        for (const item of items){
            const { error: decrementError } = await supabase.rpc('decrement_stock', {
                product_id_v: item.product_id,
                quantity_v: item.quantity
            });
            if (decrementError) {
                console.error('Stock decrement error:', decrementError);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: decrementError.message
                }, {
                    status: 500
                });
            }
        }
        const customerPhone = typeof body.customer_phone === 'string' ? body.customer_phone.trim() : '';
        const customerSpend = totalAmount + (saleType === 'Delivery' ? Number(deliveryInfo?.deli_fee ?? 0) || 0 : 0);
        if (customerPhone) {
            try {
                const { data: existingCustomer, error: fetchCustomerError } = await supabase.from('customers').select('id, total_spent').eq('phone', customerPhone).maybeSingle();
                if (fetchCustomerError) {
                    console.error('Customer fetch error:', fetchCustomerError);
                } else {
                    const currentTotal = Number(existingCustomer?.total_spent ?? 0);
                    const nextTotal = currentTotal + customerSpend;
                    const loyalStatus = nextTotal >= 500000;
                    if (existingCustomer?.id) {
                        const { error: updateCustomerError } = await supabase.from('customers').update({
                            name: body.customer_name ?? null,
                            address: body.customer_address ?? null,
                            total_spent: nextTotal,
                            loyal_status: loyalStatus
                        }).eq('id', existingCustomer.id);
                        if (updateCustomerError) {
                            console.error('Customer update error:', updateCustomerError);
                        }
                    } else {
                        const { error: insertCustomerError } = await supabase.from('customers').insert({
                            phone: customerPhone,
                            name: body.customer_name ?? null,
                            address: body.customer_address ?? null,
                            total_spent: nextTotal,
                            loyal_status: loyalStatus
                        });
                        if (insertCustomerError) {
                            console.error('Customer insert error:', insertCustomerError);
                        }
                    }
                }
            } catch (err) {
                console.error('Customer upsert exception:', err);
            }
        }
        const { data: updatedProducts, error: updatedProductsError } = await supabase.from('products').select(`
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
        if (updatedProductsError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                orderId,
                invoiceId
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            orderId,
            invoiceId,
            products: updatedProducts ?? []
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00fc5a22._.js.map