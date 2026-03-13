begin;

create table if not exists public.customers (
  id bigserial primary key,
  phone text not null unique,
  name text,
  facebook_username text,
  address text,
  remark text,
  total_spent numeric(12, 2) not null default 0,
  loyal_status boolean not null default false,
  created_at timestamptz not null default now()
);

commit;
