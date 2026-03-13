begin;

do $$
begin
  if not exists (
    select 1
    from pg_class
    where relname = 'products_id_seq'
  ) then
    create sequence public.products_id_seq;
    alter table public.products alter column id set default nextval('products_id_seq');
  end if;
end $$;

select setval('products_id_seq', coalesce((select max(id) from public.products), 0));

commit;
