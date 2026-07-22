-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- Replaces the old Prisma `Letter` model. Sender name is denormalized onto the
-- row itself so the public read page never needs to query auth.users.

create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  content text not null,
  theme text not null default 'classic',
  sender_name text not null,
  recipient_name text,
  recipient_email text not null,
  status text not null default 'draft' check (status in ('draft', 'sent', 'read')),
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_id uuid not null references auth.users (id) on delete cascade
);

create index if not exists letters_author_id_idx on public.letters (author_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists letters_set_updated_at on public.letters;
create trigger letters_set_updated_at
before update on public.letters
for each row execute function public.set_updated_at();

alter table public.letters enable row level security;

drop policy if exists "Authors can view own letters" on public.letters;
create policy "Authors can view own letters"
on public.letters for select
using (auth.uid() = author_id);

drop policy if exists "Authors can insert own letters" on public.letters;
create policy "Authors can insert own letters"
on public.letters for insert
with check (auth.uid() = author_id);

drop policy if exists "Authors can update own letters" on public.letters;
create policy "Authors can update own letters"
on public.letters for update
using (auth.uid() = author_id);

drop policy if exists "Authors can delete own letters" on public.letters;
create policy "Authors can delete own letters"
on public.letters for delete
using (auth.uid() = author_id);

-- Lets anyone with the link read a letter once it has been sent, without
-- needing an account. Recipients never get list/enumeration access because
-- the app always queries by exact slug.
drop policy if exists "Anyone can read sent letters by slug" on public.letters;
create policy "Anyone can read sent letters by slug"
on public.letters for select
using (status in ('sent', 'read'));
