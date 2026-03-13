-- Products schema migration for:
-- "The More You Glow By Ingyin POS"
--
-- Goal: make table compatible with CSV headers:
-- barcode, default_code, product_name, category, variant, purchase_price, sale_price,
-- stock_quantity, description_en, description_mm, image_url, reorder, remark
--
-- Paste this into Supabase SQL Editor -> New query -> Run.

begin;

-- 1) Ensure base table exists (if not, create minimal table)
create table if not exists public.products (
  id bigserial primary key,
  created_at timestamptz not null default now()
);

-- 2) Rename older columns if they exist (safe conditional)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='name'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='product_name'
  ) then
    execute 'alter table public.products rename column name to product_name';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='sku'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='default_code'
  ) then
    execute 'alter table public.products rename column sku to default_code';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='quantity'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='stock_quantity'
  ) then
    execute 'alter table public.products rename column quantity to stock_quantity';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='reorder_point'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='reorder'
  ) then
    execute 'alter table public.products rename column reorder_point to reorder';
  end if;
end $$;

-- 3) Add required columns if missing
alter table public.products
  add column if not exists product_name text,
  add column if not exists barcode text,
  add column if not exists default_code text,
  add column if not exists category text,
  add column if not exists variant text,
  add column if not exists purchase_price numeric(12,2),
  add column if not exists sale_price numeric(12,2),
  add column if not exists stock_quantity integer,
  add column if not exists description_en text,
  add column if not exists description_mm text,
  add column if not exists image_url text,
  add column if not exists reorder integer not null default 2,
  add column if not exists remark text;

-- 4) Migrate legacy description -> description_en (then drop legacy columns)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='products' and column_name='description'
  ) then
    execute 'update public.products set description_en = coalesce(description_en, description)';
  end if;

  if exists (select 1 from information_schema.columns where table_schema=''public'' and table_name=''products'' and column_name=''size'') then
    execute 'alter table public.products drop column size';
  end if;

  if exists (select 1 from information_schema.columns where table_schema=''public'' and table_name=''products'' and column_name=''color'') then
    execute 'alter table public.products drop column color';
  end if;

  if exists (select 1 from information_schema.columns where table_schema=''public'' and table_name=''products'' and column_name=''variants'') then
    execute 'alter table public.products drop column variants';
  end if;

  if exists (select 1 from information_schema.columns where table_schema=''public'' and table_name=''products'' and column_name=''created_by'') then
    execute 'alter table public.products drop column created_by';
  end if;

  if exists (select 1 from information_schema.columns where table_schema=''public'' and table_name=''products'' and column_name=''description'') then
    execute 'alter table public.products drop column description';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema=''public'' and table_name=''products'' and column_name=''reorder_point''
  ) then
    execute 'alter table public.products drop column reorder_point';
  end if;
end $$;

-- 5) Enforce uniqueness (barcode should be TEXT and unique)
-- Uses a partial unique index so existing NULL barcodes won't break migration.
create unique index if not exists idx_products_barcode_unique
  on public.products (barcode)
  where barcode is not null;

-- 6) Optional indexes helpful for POS usage
create index if not exists idx_products_default_code on public.products (default_code);
create index if not exists idx_products_category on public.products (category);

commit;

