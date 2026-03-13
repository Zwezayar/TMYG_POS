-- Create Category Management System
begin;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_id uuid references public.categories(id) on delete cascade,
  unique (name, parent_id), -- Ensure unique names under the same parent (or null)
  created_at timestamptz default now()
);

-- 1. Insert unique Top-Level (Main) Categories
insert into public.categories (name)
select distinct split_part(category, ' / ', 1)
from public.products
where category is not null and category != ''
on conflict (name) where parent_id is null do nothing;

-- 2. Insert unique Subcategories
insert into public.categories (name, parent_id)
select distinct 
  trim(split_part(p.category, ' / ', 2)) as sub_name,
  c.id as parent_uuid
from public.products p
join public.categories c on trim(split_part(p.category, ' / ', 1)) = c.name
where p.category like '% / %'
  and trim(split_part(p.category, ' / ', 2)) != ''
  and c.parent_id is null
on conflict (name, parent_id) do nothing;

-- Note: We keep the products.category text field for backward compatibility,
-- but the new dropdown will use this table.

commit;
