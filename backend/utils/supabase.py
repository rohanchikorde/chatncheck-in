import requests
import logging
from datetime import datetime
import os
from config import config

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    
    # Construct proper Supabase REST API URL
    url = f"{config.SUPABASE_URL}/rest/v1/{endpoint}"
    
    try:
        # Disable SSL verification for testing purposes
        verify = False
        if method == 'GET':
            response = session.get(url, headers=headers, verify=verify)
        elif method == 'POST':
            if files:
                response = session.post(url, headers=headers, data=data, files=files, verify=verify)
            else:
                response = session.post(url, headers=headers, json=data, verify=verify)
        elif method == 'PUT':
            response = session.put(url, headers=headers, json=data, verify=verify)
        elif method == 'DELETE':
            response = session.delete(url, headers=headers, verify=verify)
        else:
            raise ValueError(f"Unsupported HTTP method: {method}")
            
        response.raise_for_status()
        return response
        
    except requests.exceptions.RequestException as e:
        logger.error("Supabase request failed: %s", str(e))
        logger.error("URL: %s", url)
        logger.error("Method: %s", method)
        logger.error("Headers: %s", headers)
        logger.error("Data: %s", data)
        
        # Create a mock response object with status_code and text attributes
        class MockResponse:
            def __init__(self, status_code, text):
                self.status_code = status_code
                self.text = text
                
            def json(self):
                return {"error": self.text}
        
        # Return a proper error response object
        if hasattr(e, 'response') and e.response is not None:
            return MockResponse(e.response.status_code, e.response.text)
        return MockResponse(500, f"Internal server error: {str(e)}")

def upload_file_to_supabase(file, candidate_name):
    """
    Upload a file to Supabase storage
    
    Args:
        file: File object to upload
        candidate_name: Name of the candidate for file naming
        
    Returns:
        str: URL of the uploaded file
    """
    try:
        # Create file name with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = os.path.splitext(file.filename)[1]
        file_name = f"{candidate_name}_{timestamp}{file_extension}"
        
        # Upload file to storage
        url = f"{config.SUPABASE_URL}/storage/v1/object/{config.STORAGE_BUCKET}/{file_name}"
        response = supabase_request(
            f"/storage/v1/object/{config.STORAGE_BUCKET}/{file_name}",
            method='POST',
            data=file.read(),
            headers={'Content-Type': file.content_type}
        )
        
        # Get public URL
        public_url = f"{config.SUPABASE_URL}/storage/v1/object/public/{config.STORAGE_BUCKET}/{file_name}"
        return public_url
        
    except Exception as e:
        logger.error(f"Failed to upload file to Supabase: {str(e)}")
        raise
