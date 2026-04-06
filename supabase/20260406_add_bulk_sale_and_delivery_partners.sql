begin;

create table if not exists public.delivery_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

insert into public.delivery_partners (name)
select name
from (
  values
    ('Thukha'),
    ('Royal')
) as seed(name)
where not exists (
  select 1
  from public.delivery_partners existing
  where lower(existing.name) = lower(seed.name)
);

alter table public.orders
  add column if not exists entry_source text not null default 'POS';

alter table public.order_items
  add column if not exists cost_price numeric(12, 2);

create index if not exists idx_orders_entry_source on public.orders(entry_source);
create index if not exists idx_delivery_partners_name on public.delivery_partners(name);

commit;
