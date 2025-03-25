from .utils.supabase import supabase_request
from .utils.validators import validate_date, validate_time

def create_interview(data):
    try:
        # Validate required fields
        required_fields = ['candidate_name', 'interviewer_name', 'interview_date', 'interview_time']
        for field in required_fields:
            if field not in data or not data[field]:
                return None, 400, f"Missing required field: {field}"
        
        # Validate date and time
        is_valid_date, date_error = validate_date(data['interview_date'])
        if not is_valid_date:
            return None, 400, date_error
            
        is_valid_time, time_error = validate_time(data['interview_time'])
        if not is_valid_time:
            return None, 400, time_error
        
        interview_data = {
            'candidate_name': data['candidate_name'],
            'interviewer_name': data['interviewer_name'],
            'interview_date': data['interview_date'],
            'interview_time': data['interview_time'],
            'status': data.get('status', 'scheduled'),
            'notes': data.get('notes', '')
        }
        
        response, status_code = supabase_request(
            '/rest/v1/interviews',
            method='POST',
            data=interview_data
        )
        
        if status_code >= 400:
            return None, status_code, f"Failed to create interview: {response.get('error', 'Unknown error')}"
            
        return response, 201, "Interview created successfully"
        
    except Exception as e:
        print(f"Error in create_interview: {str(e)}")
        return None, 500, str(e)

def get_interviews():
    try:
        response, status_code = supabase_request('/rest/v1/interviews')
        
        if status_code >= 400:
            return None, status_code, f"Failed to fetch interviews: {response.get('error', 'Unknown error')}"
            
        return response, 200, "Interviews fetched successfully"
        
    except Exception as e:
        print(f"Error in get_interviews: {str(e)}")
        return None, 500, str(e)

def get_interview(id):
    try:
        response, status_code = supabase_request(f'/rest/v1/interviews?id=eq.{id}')
        
        if status_code >= 400:
            return None, status_code, f"Failed to fetch interview: {response.get('error', 'Unknown error')}"
            
        return response, 200, "Interview fetched successfully"
        
    except Exception as e:
        print(f"Error in get_interview: {str(e)}")
        return None, 500, str(e)

def update_interview(id, data):
    try:
        # Validate required fields
        if 'id' in data and data['id'] != id:
            return None, 400, "ID in URL and request body do not match"
        
        # Validate date and time if provided
        if 'interview_date' in data:
            is_valid_date, date_error = validate_date(data['interview_date'])
            if not is_valid_date:
                return None, 400, date_error
        
        if 'interview_time' in data:
            is_valid_time, time_error = validate_time(data['interview_time'])
            if not is_valid_time:
                return None, 400, time_error
        
        response, status_code = supabase_request(
            f'/rest/v1/interviews?id=eq.{id}',
            method='PUT',
            data=data
        )
        
        if status_code >= 400:
            return None, status_code, f"Failed to update interview: {response.get('error', 'Unknown error')}"
            
        return response, 200, "Interview updated successfully"
        
    except Exception as e:
        print(f"Error in update_interview: {str(e)}")
        return None, 500, str(e)

def delete_interview(id):
    try:
        response, status_code = supabase_request(
            f'/rest/v1/interviews?id=eq.{id}',
            method='DELETE'
        )
        
        if status_code >= 400:
            return None, status_code, f"Failed to delete interview: {response.get('error', 'Unknown error')}"
            
        return response, 200, "Interview deleted successfully"
        
    except Exception as e:
        print(f"Error in delete_interview: {str(e)}")
        return None, 500, str(e)
