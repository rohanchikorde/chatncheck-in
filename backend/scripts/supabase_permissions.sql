-- Create demo_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS demo_requests (
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    service_interest TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create token blacklist table if it doesn't exist
CREATE TABLE IF NOT EXISTS token_blacklist (
    id BIGSERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    blacklisted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(token)
);

-- Enable RLS (Row Level Security)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_blacklist ENABLE ROW LEVEL SECURITY;

-- Create policies for the anon role
CREATE POLICY "Enable insert for all users"
    ON demo_requests FOR INSERT
    TO anon
    USING (true);

CREATE POLICY "Enable select for all users"
    ON demo_requests FOR SELECT
    TO anon
    USING (true);

-- Create policies for the authenticated role
CREATE POLICY "Enable insert for authenticated users"
    ON demo_requests FOR INSERT
    TO authenticated
    USING (true);

CREATE POLICY "Enable select for authenticated users"
    ON demo_requests FOR SELECT
    TO authenticated
    USING (true);

-- Create policies for token blacklist
CREATE POLICY "Enable insert for authenticated users"
    ON token_blacklist FOR INSERT
    TO authenticated
    USING (true);

CREATE POLICY "Enable select for authenticated users"
    ON token_blacklist FOR SELECT
    TO authenticated
    USING (true);

-- Grant permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON demo_requests TO anon;
GRANT INSERT ON demo_requests TO anon;

-- Grant permissions to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON demo_requests TO authenticated;
GRANT INSERT ON demo_requests TO authenticated;

-- Grant permissions for token blacklist
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON token_blacklist TO authenticated;
GRANT INSERT ON token_blacklist TO authenticated;
