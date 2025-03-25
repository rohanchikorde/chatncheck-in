import requests
from datetime import datetime
from config import config

# Configure requests session for better connection handling
session = requests.Session()
adapter = requests.adapters.HTTPAdapter(max_retries=3)
session.mount('https://', adapter)

def supabase_request(endpoint, method='GET', data=None, headers=None, files=None):
    if headers is None:
        headers = {}
    
    # Add Supabase headers
    headers.update({
        'apikey': config.SUPABASE_KEY,
        'Authorization': f'Bearer {config.SUPABASE_KEY}',
        'Content-Type': 'application/json' if method in ['POST', 'PUT'] else 'application/json'
    })
    
    url = f"{config.SUPABASE_URL}{endpoint}"
    
    try:
        if method == 'GET':
            response = session.get(url, headers=headers)
        elif method == 'POST':
            if files:
                response = session.post(url, headers=headers, data=data, files=files)
            else:
                response = session.post(url, headers=headers, json=data)
        elif method == 'PUT':
            response = session.put(url, headers=headers, json=data)
        elif method == 'DELETE':
            response = session.delete(url, headers=headers)
        else:
            return {'error': 'Invalid method'}, 400
        
        response.raise_for_status()
        return response.json(), response.status_code
    except requests.exceptions.RequestException as e:
        print(f"Supabase request failed: {str(e)}")
        return {
            'error': f"Failed to connect to Supabase: {str(e)}"
        }, 500

def upload_file_to_supabase(file, candidate_name):
    try:
        # Create a unique file name
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        file_ext = file.filename.split('.')[-1]
        file_name = f"{candidate_name.replace(' ', '_')}_{timestamp}.{file_ext}"
        file_path = f"resumes/{file_name}"
        
        # Upload to Supabase Storage
        endpoint = f"/storage/v1/object/{config.STORAGE_BUCKET}/{file_path}"
        
        headers = {
            'Cache-Control': 'max-age=3600'
        }
        
        data = file.read()
        file.seek(0)  # Reset file pointer
        
        response, status_code = supabase_request(
            endpoint, 
            method='POST', 
            headers=headers, 
            data=data
        )
        
        if status_code >= 400:
            return None
        
        # Get public URL
        public_url = f"{config.SUPABASE_URL}/storage/v1/object/public/{config.STORAGE_BUCKET}/{file_path}"
        return public_url
    
    except Exception as e:
        print(f"Error uploading file: {str(e)}")
        return None
