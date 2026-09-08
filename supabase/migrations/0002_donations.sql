create table donations (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  amount_cents int not null check (amount_cents >= 0),
  currency text not null default 'usd',
  frequency text not null default 'once' check (frequency in ('once','monthly')),
  purpose text not null default 'General',
  donor_email text,
  donor_name text,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

-- Written only by the Stripe webhook with the service role key. No anon access.
alter table donations enable row level security;
