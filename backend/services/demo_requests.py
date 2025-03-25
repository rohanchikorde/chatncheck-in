from .utils.supabase import supabase_request

def create_demo_request(data):
    try:
        # Required fields validation
        required_fields = ['first_name', 'last_name', 'work_email', 'agrees_to_terms']
        
        for field in required_fields:
            if field not in data or not data[field]:
                return None, 400, f"Missing required field: {field}"
        
        # Validate email format
        if '@' not in data['work_email'] or '.' not in data['work_email']:
            return None, 400, "Invalid email format"
        
        demo_request_data = {
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'work_email': data['work_email'],
            'phone_number': data.get('phone_number'),
            'service_interest': data.get('service_interest'),
            'message': data.get('message'),
        }
        
        response, status_code = supabase_request(
            '/rest/v1/demo_requests',
            method='POST',
            data=demo_request_data
        )
        
        if status_code >= 400:
            return None, status_code, f"Failed to save demo request: {response.get('error', 'Unknown error')}"
        
        return response, 201, "Demo request submitted successfully"
    
    except Exception as e:
        print(f"Error in create_demo_request: {str(e)}")
        return None, 500, str(e)
