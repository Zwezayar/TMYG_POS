begin;

alter table public.orders
  add column if not exists courier_name text,
  add column if not exists delivery_fee numeric(12, 2);

commit;
