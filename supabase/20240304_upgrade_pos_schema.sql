-- Upgrade POS Schema: Orders, Order Items, and Deliveries
-- This migration adds support for relational sales logging and delivery tracking.

begin;

-- 1. Create sale_type enum
do $$
begin
  if not exists (select 1 from pg_type where typname = 'sale_type') then
    create type public.sale_type as enum ('Shop', 'Delivery');
  end if;
end $$;

-- 2. Create orders table (replaces/extends sales)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  invoice_id text unique not null,
  customer_id text,
  customer_name text,
  sale_type public.sale_type not null default 'Shop',
  payment_method text,
  payment_status text default 'Check', -- 'Confirmed' or 'Check'
  total_amount numeric(12, 2) not null default 0,
  cashier_id uuid references auth.users(id),
  remark text,
  created_at timestamptz not null default now()
);

-- 3. Create order_items table (replaces/extends sale_items)
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint not null references public.products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null,
  subtotal numeric(12, 2) not null,
  created_at timestamptz not null default now()
);

-- 4. Create deliveries table
create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  courier_name text,
  deli_fee numeric(12, 2) not null default 0,
  deli_fee_payable numeric(12, 2) not null default 0, -- Amount shop owes courier
  status text default 'Pending',
  is_bago_special boolean default false,
  total_to_collect numeric(12, 2) default 0, -- subtotal + deli_fee for Bago special
  created_at timestamptz not null default now()
);

-- 5. Indexes for better performance
create index if not exists idx_orders_invoice_id on public.orders(invoice_id);
create index if not exists idx_orders_created_at on public.orders(created_at);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_deliveries_order_id on public.deliveries(order_id);

-- 6. RPC function for stock decrement (if not already exists)
-- This is often used in the route.ts
create or replace function public.decrement_stock(product_id_v bigint, quantity_v integer)
returns void as $$
begin
  update public.products
  set stock_quantity = stock_quantity - quantity_v
  where id = product_id_v;
end;
$$ language plpgsql security definer;

commit;
