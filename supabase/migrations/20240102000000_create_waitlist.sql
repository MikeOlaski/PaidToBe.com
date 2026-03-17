create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  source text,
  created_at timestamp with time zone default now()
);

-- Prevent duplicate emails
create unique index if not exists waitlist_email_idx on public.waitlist (lower(email));

-- Allow anyone to insert (anon key is fine for lead capture)
alter table public.waitlist enable row level security;

create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

-- Only admins can read
create policy "Admins can read waitlist"
  on public.waitlist for select
  using (auth.role() = 'authenticated');
