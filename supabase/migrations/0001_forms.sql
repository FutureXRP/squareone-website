create table form_submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','elc-enrollment')),
  payload jsonb not null,
  created_at timestamptz not null default now(),
  handled boolean not null default false
);

-- Written only by the server with the service role key. No anon access.
alter table form_submissions enable row level security;
