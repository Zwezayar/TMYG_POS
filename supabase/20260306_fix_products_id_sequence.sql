begin;

create or replace function public.sync_products_id_seq()
returns void
language plpgsql
security definer
as $$
declare
  seq_name text;
  max_id bigint;
begin
  select pg_get_serial_sequence('public.products', 'id') into seq_name;
  if seq_name is null then
    return;
  end if;

  select coalesce(max(id), 0) into max_id from public.products;
  execute format('select setval(%L, %s, true)', seq_name, max_id);
end;
$$;

grant execute on function public.sync_products_id_seq() to authenticated;

commit;
