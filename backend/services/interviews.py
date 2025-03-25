from backend.utils.supabase import supabase_request
from backend.utils.validators import validate_date, validate_time

def create_interview(data):
    try:
        # Validate required fields
        required_fields = ['candidate_name', 'interviewer_name', 'interview_date', 'interview_time']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return None, 400, f"Missing required fields: {', '.join(missing_fields)}"

        # Validate date and time
        if not validate_date(data['interview_date']):
            return None, 400, "Invalid interview date format"
        
        if not validate_time(data['interview_time']):
            return None, 400, "Invalid interview time format"

        # Prepare data for Supabase
        interview_data = {
            'candidate_name': data['candidate_name'],
            'interviewer_name': data['interviewer_name'],
            'interview_date': data['interview_date'],
            'interview_time': data['interview_time'],
            'status': data.get('status', 'scheduled'),
            'notes': data.get('notes', '')
        }

        # Make request to Supabase
        response = supabase_request('interviews', interview_data, method='POST')
        
        if response.status_code == 201:
            return response.json(), 201, "Interview created successfully"
        else:
            return None, response.status_code, "Failed to create interview"

    except Exception as e:
        return None, 500, f"Internal server error: {str(e)}"

def get_interviews():
    try:
        response = supabase_request('interviews', method='GET')
        
        if response.status_code == 200:
            return response.json(), 200, "Interviews retrieved successfully"
        else:
            return None, response.status_code, "Failed to retrieve interviews"

    except Exception as e:
        return None, 500, f"Internal server error: {str(e)}"

def get_interview(interview_id):
    try:
        response = supabase_request(f'interviews/{interview_id}', method='GET')
        
        if response.status_code == 200:
            return response.json(), 200, "Interview retrieved successfully"
        elif response.status_code == 404:
            return None, 404, "Interview not found"
        else:
            return None, response.status_code, "Failed to retrieve interview"

    except Exception as e:
        return None, 500, f"Internal server error: {str(e)}"

def update_interview(interview_id, data):
    try:
        # Validate required fields
        if 'interview_date' in data and not validate_date(data['interview_date']):
            return None, 400, "Invalid interview date format"
        
        if 'interview_time' in data and not validate_time(data['interview_time']):
            return None, 400, "Invalid interview time format"

        # Make request to Supabase
        response = supabase_request(f'interviews/{interview_id}', data, method='PUT')
        
        if response.status_code == 200:
            return response.json(), 200, "Interview updated successfully"
        elif response.status_code == 404:
            return None, 404, "Interview not found"
        else:
            return None, response.status_code, "Failed to update interview"

    except Exception as e:
        return None, 500, f"Internal server error: {str(e)}"

def delete_interview(interview_id):
    try:
        response = supabase_request(f'interviews/{interview_id}', method='DELETE')
        
        if response.status_code == 204:
            return True, 204, "Interview deleted successfully"
        elif response.status_code == 404:
            return None, 404, "Interview not found"
        else:
            return None, response.status_code, "Failed to delete interview"

    except Exception as e:
        return None, 500, f"Internal server error: {str(e)}"
