-- Drop existing table if it exists
drop table if exists public.profiles;

-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    role text not null check (role in ('admin', 'interviewer', 'interviewee')),
    first_name text,
    last_name text,
    phone text,
    position text,
    company text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;

-- Create policies
create policy "Users can view their own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

create policy "Users can insert their own profile"
    on profiles for insert
    with check (auth.uid() = id);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Drop existing trigger if it exists
drop trigger if exists handle_profiles_updated_at on profiles;

-- Create trigger for updated_at
create trigger handle_profiles_updated_at
    before update on public.profiles
    for each row
    execute function public.handle_updated_at();

-- Grant necessary permissions
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on public.profiles to postgres;
grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;

-- Insert default admin profile if it doesn't exist
insert into public.profiles (id, role, first_name, last_name)
select 
    id,
    'admin',
    'Admin',
    'User'
from auth.users
where email = 'admin@example.com'
and not exists (
    select 1 from public.profiles where id = auth.users.id
); 