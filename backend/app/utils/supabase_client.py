
import requests
import json
import logging
from app.config.config import SUPABASE_URL, SUPABASE_KEY

logger = logging.getLogger(__name__)

def supabase_request(endpoint, method='GET', data=None, headers=None, files=None):
    """
    Helper function to make requests to Supabase
    """
    if headers is None:
        headers = {}
    
    # Add Supabase headers
    headers.update({
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}'
    })
    
    url = f"{SUPABASE_URL}{endpoint}"
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            if files:
                response = requests.post(url, headers=headers, data=data, files=files)
            else:
                headers['Content-Type'] = 'application/json'
                response = requests.post(url, headers=headers, data=json.dumps(data))
        elif method == 'PUT':
            headers['Content-Type'] = 'application/json'
            response = requests.put(url, headers=headers, data=json.dumps(data))
        elif method == 'DELETE':
            response = requests.delete(url, headers=headers)
        else:
            return {'error': 'Invalid method'}, 400
        
        # Handle response
        if response.status_code >= 400:
            logger.error(f"Supabase API error: {response.status_code} - {response.text}")
            return {'error': f"Supabase API error: {response.status_code}"}, response.status_code
        
        return response.json(), response.status_code
    
    except Exception as e:
        logger.error(f"Error in Supabase request: {str(e)}")
        return {'error': str(e)}, 500

def upload_file_to_supabase(file, candidate_name, bucket=None):
    """
    Helper function to upload file to Supabase Storage
    """
    from datetime import datetime
    from app.config.config import STORAGE_BUCKET
    
    if bucket is None:
        bucket = STORAGE_BUCKET
    
    try:
        # Create a unique file name
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        file_ext = file.filename.split('.')[-1]
        file_name = f"{candidate_name.replace(' ', '_')}_{timestamp}.{file_ext}"
        file_path = f"resumes/{file_name}"
        
        # Upload to Supabase Storage
        endpoint = f"/storage/v1/object/{bucket}/{file_path}"
        
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
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket}/{file_path}"
        return public_url
    
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        return None
