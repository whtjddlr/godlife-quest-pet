create table if not exists public.user_states (
  user_id text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.room_states (
  room_id text primary key,
  code text unique not null,
  room jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_states enable row level security;
alter table public.room_states enable row level security;

-- This prototype writes through the backend with SUPABASE_SECRET_KEY
-- or SUPABASE_SERVICE_ROLE_KEY, so no public RLS policy is required here.
-- Add user-scoped policies later when Supabase Auth is attached.

insert into storage.buckets (id, name, public)
values ('proof-photos', 'proof-photos', false)
on conflict (id) do nothing;
