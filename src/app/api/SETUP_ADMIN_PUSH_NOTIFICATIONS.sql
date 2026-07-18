create table if not exists public.admin_push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  admin_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_push_subscriptions_admin_email_idx
  on public.admin_push_subscriptions (admin_email);

alter table public.admin_push_subscriptions enable row level security;

comment on table public.admin_push_subscriptions is
  'Server-managed browser push subscriptions for authenticated FLA admins.';

notify pgrst, 'reload schema';
