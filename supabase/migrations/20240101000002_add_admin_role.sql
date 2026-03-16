-- Add role to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Update handle_new_user to handle role (defaults to user though)
-- We can manually elevate users to admin in the Supabase dashboard or via SQL

-- Add policy for admins to see all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add policy for admins to update all profiles
CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Update country policies to allow admins to insert/update/delete
-- First, let's enable RLS on countries if not already (it should be)
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

-- Countries policies
DROP POLICY IF EXISTS "Anyone can view countries" ON public.countries;
CREATE POLICY "Anyone can view countries" ON public.countries
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage countries" ON public.countries;
CREATE POLICY "Admins can manage countries" ON public.countries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
