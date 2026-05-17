-- TempoRun: policies for per-user run history.
-- Run this in Supabase SQL Editor if public.corridas stays empty after recording a run.

alter table public.corridas enable row level security;

drop policy if exists "corridas_select_own" on public.corridas;
drop policy if exists "corridas_insert_own" on public.corridas;
drop policy if exists "corridas_update_own" on public.corridas;
drop policy if exists "corridas_delete_own" on public.corridas;

create policy "corridas_select_own"
on public.corridas
for select
to authenticated
using (
  user_id = auth.uid()
  or user_id in (select id from public.users where auth_id = auth.uid())
);

create policy "corridas_insert_own"
on public.corridas
for insert
to authenticated
with check (
  user_id = auth.uid()
  or user_id in (select id from public.users where auth_id = auth.uid())
);

create policy "corridas_update_own"
on public.corridas
for update
to authenticated
using (
  user_id = auth.uid()
  or user_id in (select id from public.users where auth_id = auth.uid())
)
with check (
  user_id = auth.uid()
  or user_id in (select id from public.users where auth_id = auth.uid())
);

create policy "corridas_delete_own"
on public.corridas
for delete
to authenticated
using (
  user_id = auth.uid()
  or user_id in (select id from public.users where auth_id = auth.uid())
);
