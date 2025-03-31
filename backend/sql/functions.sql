
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

-- Function to get company statistics
CREATE OR REPLACE FUNCTION get_company_statistics(company_id UUID)
RETURNS TABLE (
    total_interviews INTEGER,
    pending_interviews INTEGER,
    completed_interviews INTEGER,
    active_team_members INTEGER,
    pending_demos INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM interviews WHERE company_id = $1)::INTEGER AS total_interviews,
        (SELECT COUNT(*) FROM interviews WHERE company_id = $1 AND status = 'scheduled')::INTEGER AS pending_interviews,
        (SELECT COUNT(*) FROM interviews WHERE company_id = $1 AND status = 'completed')::INTEGER AS completed_interviews,
        (SELECT COUNT(*) FROM profiles WHERE company_id = $1 AND is_active = true)::INTEGER AS active_team_members,
        (SELECT COUNT(*) FROM demo_requests WHERE company_id = $1 AND status = 'pending')::INTEGER AS pending_demos;
END;
$$;

-- Function to get company interview history
CREATE OR REPLACE FUNCTION get_company_interview_metrics(company_id UUID, days_ago INTEGER DEFAULT 30)
RETURNS TABLE (
    date DATE,
    interview_count INTEGER,
    hire_count INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    start_date DATE := CURRENT_DATE - days_ago;
    end_date DATE := CURRENT_DATE;
BEGIN
    RETURN QUERY
    SELECT
        d::DATE AS date,
        COUNT(i.id)::INTEGER AS interview_count,
        COUNT(CASE WHEN i.status = 'completed' AND i.rating >= 4 THEN 1 ELSE NULL END)::INTEGER AS hire_count
    FROM generate_series(start_date, end_date, '1 day'::INTERVAL) AS d
    LEFT JOIN interviews i ON DATE(i.scheduled_time) = d AND i.company_id = $1
    GROUP BY d
    ORDER BY d;
END;
$$;

-- Function to track company activities
CREATE OR REPLACE FUNCTION track_company_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Track new interview scheduled
        IF TG_TABLE_NAME = 'interviews' THEN
            INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type)
            VALUES (
                NEW.created_by,
                'New Interview Scheduled',
                'A new interview has been scheduled for ' || (SELECT candidate_name FROM candidates WHERE id = NEW.candidate_id),
                'interview_scheduled',
                NEW.id,
                'interview'
            );
        -- Track new demo request
        ELSIF TG_TABLE_NAME = 'demo_requests' THEN
            -- For demo requests, we might need a different approach since we don't know the admin user yet
            -- This could be solved by using a default admin notification receiver
            NULL;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Track interview status changes
        IF TG_TABLE_NAME = 'interviews' AND OLD.status <> NEW.status THEN
            INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type)
            VALUES (
                NEW.created_by,
                'Interview Status Updated',
                'Interview status changed from ' || OLD.status || ' to ' || NEW.status,
                'interview_status_change',
                NEW.id,
                'interview'
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create triggers for company activity tracking
DROP TRIGGER IF EXISTS track_interview_activity ON interviews;
CREATE TRIGGER track_interview_activity
AFTER INSERT OR UPDATE ON interviews
FOR EACH ROW
EXECUTE FUNCTION track_company_activity();

DROP TRIGGER IF EXISTS track_demo_request_activity ON demo_requests;
CREATE TRIGGER track_demo_request_activity
AFTER INSERT ON demo_requests
FOR EACH ROW
EXECUTE FUNCTION track_company_activity();
