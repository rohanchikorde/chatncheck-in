-- Create function to clear all demo requests
CREATE OR REPLACE FUNCTION clear_demo_requests()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM demo_requests;
END;
$$;
