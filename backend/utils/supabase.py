import requests
import logging
import json
from datetime import datetime
import os
from config import config
from config.ssl_config import *
from dotenv import load_dotenv
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure requests session for better connection handling
session = requests.Session()
adapter = requests.adapters.HTTPAdapter(max_retries=3)
session.mount('https://', adapter)

# Disable SSL verification globally for requests
requests.packages.urllib3.disable_warnings()

# Initialize Supabase client
def init_supabase():
    load_dotenv()
    
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        raise ValueError("Supabase URL or Key not found in environment variables")
    
    return {
        'url': supabase_url,
        'key': supabase_key
    }

# Initialize Supabase client
supabase_client = init_supabase()

def supabase_request(endpoint, method='GET', data=None, params=None):
    try:
        # Build full URL
        url = f"{supabase_client['url']}/rest/v1/{endpoint.lstrip('/')}"
        
        # Prepare headers
        headers = {
            'apikey': supabase_client['key'],
            'Authorization': f'Bearer {supabase_client["key"]}',
            'Content-Type': 'application/json'
        }
        
        # Log the request details
        logger.info(f"Making Supabase request: {method} {url}")
        logger.info(f"Headers: {headers}")
        logger.info(f"Data: {data}")
        logger.info(f"Params: {params}")
        
        # Make the request with SSL verification disabled
        response = session.request(method, url, headers=headers, json=data, params=params, verify=False)
        
        # Log the response
        logger.info(f"Response status: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        
        # Check if the response was successful
        if response.status_code >= 200 and response.status_code < 300:
            try:
                response_data = response.json()
                if isinstance(response_data, list) and len(response_data) == 1:
                    response_data = response_data[0]
            except json.JSONDecodeError:
                response_data = None
            
            return {
                'status_code': response.status_code,
                'data': response_data,
                'error': None
            }
        else:
            # If the response was not successful, return an error
            return {
                'status_code': response.status_code,
                'data': None,
                'error': response.text
            }
        
    except Exception as e:
        logger.error(f"Supabase request failed: {str(e)}")
        logger.error(f"Method: {method}")
        logger.error(f"Data: {data}")
        logger.error(f"Full traceback: {traceback.format_exc()}")
        return {
            'status_code': 500,
            'error': str(e)
        }

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
