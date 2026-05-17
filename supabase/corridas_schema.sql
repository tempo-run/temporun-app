-- TempoRun: complete schema expected by the app for public.corridas.
-- Run this in Supabase SQL Editor, then run corridas_rls_policies.sql.

alter table public.corridas
  add column if not exists source text default 'local',
  add column if not exists nome text default 'Corrida livre',
  add column if not exists tipo text default 'Corrida',
  add column if not exists data_treino date,
  add column if not exists timestamp timestamptz,
  add column if not exists distancia_km numeric default 0,
  add column if not exists duracao_seg integer default 0,
  add column if not exists pace_medio text,
  add column if not exists bpm_medio integer default 0,
  add column if not exists cadencia_media integer default 0,
  add column if not exists calorias integer default 0,
  add column if not exists dplus integer default 0,
  add column if not exists xp_ganho integer default 0,
  add column if not exists polyline jsonb,
  add column if not exists created_at timestamptz default now();

create index if not exists corridas_user_timestamp_idx
on public.corridas (user_id, timestamp desc);
