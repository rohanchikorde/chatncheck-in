
-- Create interviews table with all required fields
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_name TEXT NOT NULL,
  interviewer_name TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  format TEXT NOT NULL,
  job_role TEXT NOT NULL,
  status TEXT NOT NULL,
  feedback_submitted TEXT NOT NULL DEFAULT 'No',
  resume_url TEXT,
  use_question_bank BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Create policy for full access (you may want to restrict this in production)
CREATE POLICY "Allow full access to interviews" 
  ON public.interviews 
  FOR ALL 
  USING (true);

-- Enable realtime subscription for the interviews table
ALTER PUBLICATION supabase_realtime ADD TABLE public.interviews;
ALTER TABLE public.interviews REPLICA IDENTITY FULL;

-- Create storage bucket for interview documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('interview-documents', 'interview-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy to allow public read access but authenticated uploads
CREATE POLICY "Allow public read access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'interview-documents');

CREATE POLICY "Allow authenticated uploads"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'interview-documents');
