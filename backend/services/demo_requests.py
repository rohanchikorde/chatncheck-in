from backend.utils.supabase import supabase_request

def create_demo_request(data):
    try:
        # Validate required fields
        required_fields = ['first_name', 'last_name', 'work_email']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return None, 400, f"Missing required fields: {', '.join(missing_fields)}"

        # Prepare data for Supabase
        demo_request_data = {
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'work_email': data['work_email'],
            'phone_number': data.get('phone_number'),
            'service_interest': data.get('service_interest'),
            'message': data.get('message'),
        }

        # Make request to Supabase
        response = supabase_request('demo_requests', demo_request_data, method='POST')
        
        if response.status_code == 201:
            return response.json(), 201, "Demo request created successfully"
        else:
            return None, response.status_code, "Failed to create demo request"

    except Exception as e:
        return None, 500, f"Internal server error: {str(e)}"
