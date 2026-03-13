begin;

alter table public.orders
  add column if not exists receipt_payload jsonb;

commit;
