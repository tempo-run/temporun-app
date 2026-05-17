-- TempoRun: keep public.users in sync with Supabase Auth users.
-- Needed because public.corridas.user_id references public.users(id).

create extension if not exists pgcrypto;

alter table public.users
  add column if not exists auth_id uuid,
  add column if not exists email text,
  add column if not exists created_at timestamptz default now();

alter table public.users
  alter column id set default gen_random_uuid();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'users_auth_id_key'
      and conrelid = 'public.users'::regclass
  ) then
    alter table public.users add constraint users_auth_id_key unique (auth_id);
  end if;
end $$;

insert into public.users (auth_id, email)
select au.id, au.email
from auth.users au
where not exists (
  select 1
  from public.users u
  where u.auth_id = au.id
);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (auth_id, email)
  values (new.id, new.email)
  on conflict (auth_id) do update
  set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();
