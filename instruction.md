# MISSION: BUILD "THE MORE YOU GLOW" POS SYSTEM
# TECH STACK: NEXT.JS (APP ROUTER), SUPABASE (DB & AUTH), TAILWIND CSS (DARK MODE), SHADCN UI.

## 1. PROJECT OVERVIEW
A professional, high-performance POS for beauty products. Must work perfectly on Computer, iPad, and Mobile.
Theme: Premium Dark Mode UI.
Language: Toggle between English and Burmese.

## 2. DATABASE SCHEMA (SUPABASE)
- profiles: id, username, role (admin/staff), remark
- products: id, barcode, name, category, size, color, sku, purchase_price (Admin only), sale_price, quantity, image_url, remark
- sales: id, inv_id, type (Shop/Deli), customer_name, payment_method, is_cod, total_amount, slip_url (optional), status, remark, created_at
- sale_items: id, sale_id, product_id, quantity, price_at_sale, remark
- delivery_records: id, sale_id, service_name, deli_fee, deli_fee_paid_by, expected_return, status, remark

## 3. CORE LOGIC & SECURITY
- ROLE-BASED ACCESS: Admin can see everything. Staff CANNOT see purchase_price or total_profit.
- DELIVERY CALCULATIONS: 
  - If deli_fee_paid_by is "Shop", Expected_Return = COD_Amount - Deli_Fee.
  - If "Customer", Expected_Return = COD_Amount.
- STOCK AUTOMATION: Subtract quantity on sales; add on purchase records.
- BLANK FIELDS: Optional fields (like remark or e-slip) must not crash the system.

## 4. UI/UX REQUIREMENTS
- Responsive design for all screen sizes.
- Barcode scanning using phone camera (html5-qrcode).
- Dashboard with Daily, Monthly, Yearly graphs.
- Fast data entry (spreadsheet-like behavior).