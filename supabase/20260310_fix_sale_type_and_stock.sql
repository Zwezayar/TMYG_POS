begin;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'sale_type') then
    create type public.sale_type as enum ('Shop', 'Delivery');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'sale_type' and e.enumlabel = 'Shop'
  ) then
    alter type public.sale_type add value 'Shop';
  end if;
  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'sale_type' and e.enumlabel = 'Delivery'
  ) then
    alter type public.sale_type add value 'Delivery';
  end if;
end $$;

alter table public.orders
  add column if not exists customer_phone text,
  add column if not exists customer_address text;

create or replace function public.decrement_stock(product_id_v text, quantity_v integer)
returns void
language plpgsql
security definer
as $$
declare
  id_type text;
begin
  select data_type
  into id_type
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'products'
    and column_name = 'id';

  if id_type = 'uuid' then
    execute 'update public.products set stock_quantity = stock_quantity - $1 where id = $2::uuid'
      using quantity_v, product_id_v;
  else
    execute 'update public.products set stock_quantity = stock_quantity - $1 where id = $2::bigint'
      using quantity_v, product_id_v;
  end if;
end;
$$;

grant execute on function public.decrement_stock(text, integer) to authenticated;

commit;
