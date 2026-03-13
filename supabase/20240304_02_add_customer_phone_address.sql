-- Upgrade POS Schema: Add Customer Phone & Address
begin;

alter table public.orders
add column if not exists customer_phone text,
add column if not exists customer_address text;

commit;
