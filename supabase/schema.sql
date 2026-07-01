create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  mensaje text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;
