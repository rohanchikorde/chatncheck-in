
-- Companies Table
CREATE TABLE public.companies (
    company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT UNIQUE NOT NULL
);

-- Skills Table
CREATE TABLE public.skills (
    skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name TEXT UNIQUE NOT NULL
);

-- Roles Table
CREATE TABLE public.roles (
    role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name TEXT NOT NULL,
    open_positions INTEGER NOT NULL CHECK (open_positions >= 0),
    company_id UUID NOT NULL REFERENCES public.companies(company_id) ON DELETE CASCADE
);

-- Role_Skills Junction Table
CREATE TABLE public.role_skills (
    role_id UUID NOT NULL REFERENCES public.roles(role_id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(skill_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, skill_id)
);

-- Users Table (includes interviewers, company admins, platform admins)
CREATE TABLE public.users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Platform_Admin', 'Company_Admin', 'Interviewer')),
    company_id UUID REFERENCES public.companies(company_id) ON DELETE SET NULL
);

-- Interviewer_Skills Junction Table
CREATE TABLE public.interviewer_skills (
    user_id UUID NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(skill_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_id),
    CONSTRAINT check_interviewer_role CHECK (
        EXISTS (SELECT 1 FROM public.users WHERE users.user_id = interviewer_skills.user_id AND users.role = 'Interviewer')
    )
);

-- Candidates Table
CREATE TABLE public.candidates (
    candidate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- Applications Table
CREATE TABLE public.applications (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(role_id) ON DELETE CASCADE,
    application_status TEXT NOT NULL CHECK (application_status IN ('Applied', 'Interviewing', 'Offered', 'Rejected'))
);

-- Interviews Table
CREATE TABLE public.interviews (
    interview_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(application_id) ON DELETE CASCADE,
    interviewer_id UUID NOT NULL REFERENCES public.users(user_id) ON DELETE SET NULL,
    round_number INTEGER NOT NULL CHECK (round_number > 0),
    interview_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    interview_status TEXT NOT NULL CHECK (interview_status IN ('Scheduled', 'Completed', 'Canceled')),
    CONSTRAINT check_interviewer_role_interview CHECK (
        EXISTS (SELECT 1 FROM public.users WHERE users.user_id = interviews.interviewer_id AND users.role = 'Interviewer')
    )
);

-- Enable Row Level Security on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviewer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Insert sample data
-- Add sample companies
INSERT INTO public.companies (company_name)
VALUES 
  ('Apple'),
  ('Microsoft'),
  ('Google')
ON CONFLICT (company_name) DO NOTHING;

-- Add sample skills
INSERT INTO public.skills (skill_name)
VALUES 
  ('AI Scientist'),
  ('Java Developer'),
  ('Front End Developer')
ON CONFLICT (skill_name) DO NOTHING;

-- Add sample roles for companies
INSERT INTO public.roles (role_name, open_positions, company_id)
SELECT 'AI Scientist', 5, company_id FROM public.companies WHERE company_name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO public.roles (role_name, open_positions, company_id)
SELECT 'Java Developer', 6, company_id FROM public.companies WHERE company_name = 'Apple'
ON CONFLICT DO NOTHING;

INSERT INTO public.roles (role_name, open_positions, company_id)
SELECT 'Java Developer', 6, company_id FROM public.companies WHERE company_name = 'Microsoft'
ON CONFLICT DO NOTHING;

INSERT INTO public.roles (role_name, open_positions, company_id)
SELECT 'AI Scientist', 5, company_id FROM public.companies WHERE company_name = 'Microsoft'
ON CONFLICT DO NOTHING;

INSERT INTO public.roles (role_name, open_positions, company_id)
SELECT 'Front End Developer', 5, company_id FROM public.companies WHERE company_name = 'Google'
ON CONFLICT DO NOTHING;

-- Create RLS policies
-- Companies table policies
CREATE POLICY "Public companies are viewable by everyone" 
  ON public.companies FOR SELECT 
  USING (true);

-- Skills table policies
CREATE POLICY "Skills are viewable by everyone" 
  ON public.skills FOR SELECT 
  USING (true);

-- Roles table policies
CREATE POLICY "Roles are viewable by everyone" 
  ON public.roles FOR SELECT 
  USING (true);

-- Role_Skills table policies
CREATE POLICY "Role skills are viewable by everyone" 
  ON public.role_skills FOR SELECT 
  USING (true);

-- Users table policies (need more restrictive policies in production)
CREATE POLICY "Users are viewable by authenticated users" 
  ON public.users FOR SELECT 
  USING (true);

-- Interviewer_Skills table policies
CREATE POLICY "Interviewer skills are viewable by everyone" 
  ON public.interviewer_skills FOR SELECT 
  USING (true);

-- Candidates table policies (need more restrictive policies in production)
CREATE POLICY "Candidates are viewable by authenticated users" 
  ON public.candidates FOR SELECT 
  USING (true);

-- Applications table policies
CREATE POLICY "Applications are viewable by authenticated users" 
  ON public.applications FOR SELECT 
  USING (true);

-- Interviews table policies
CREATE POLICY "Interviews are viewable by authenticated users" 
  ON public.interviews FOR SELECT 
  USING (true);
