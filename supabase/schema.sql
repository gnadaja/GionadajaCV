create table if not exists public.cv_requests (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.cv_requests enable row level security;

create policy "Allow anonymous inserts"
  on public.cv_requests
  for insert
  with check (true);

create policy "Allow read for authenticated users"
  on public.cv_requests
  for select
  using (auth.role() = 'authenticated');
