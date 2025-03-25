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

def supabase_request(endpoint, method='GET', data=None, headers=None, files=None, query=None):
    if headers is None:
        headers = {}
    
    # Add Supabase headers
    headers.update({
        'apikey': config.SUPABASE_KEY,
        'Authorization': f'Bearer {config.SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    })
    
    # Remove leading slash if present
    endpoint = endpoint.lstrip('/')
    
    # Construct proper Supabase REST API URL
    url = f"{config.SUPABASE_URL}/rest/v1/{endpoint}"
    
    logger.info(f"Making Supabase request: {method} {url}")
    logger.info(f"Headers: {headers}")
    if data:
        logger.info(f"Data: {data}")
    if query:
        logger.info(f"Query: {query}")
    
    try:
        # Make the request
        response = session.request(
            method=method,
            url=url,
            headers=headers,
            json=data if method in ['POST', 'PUT'] else None,
            params=query,
            files=files,
            verify=False  # Only for testing
        )
        
        # Log response details
        logger.info(f"Response status: {response.status_code}")
        logger.info(f"Response text: {response.text}")
        
        # Handle error responses
        if response.status_code >= 400:
            error_msg = response.text
            try:
                error_json = response.json()
                if isinstance(error_json, dict):
                    error_msg = error_json.get('message', error_json.get('error', response.text))
            except:
                pass
            logger.error(f"Error response: {error_msg}")
            return {"error": f"HTTP {response.status_code}: {error_msg}"}
        
        # Parse successful response
        try:
            if response.text:
                return response.json()
            return None
        except ValueError as e:
            logger.error(f"Failed to parse JSON response: {e}")
            return {"error": "Invalid JSON response from server"}
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Error making request to Supabase: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            logger.error(f"Response status: {e.response.status_code}")
            logger.error(f"Response text: {e.response.text}")
            return {"error": f"HTTP {e.response.status_code}: {e.response.text}"}
        return {"error": str(e)}

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
