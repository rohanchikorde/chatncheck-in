import json
import logging
import requests
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define Supabase configuration directly
SUPABASE_URL = 'https://ehcobpmrrtdkebphqaui.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2VoanpxZ3JhaGZ4a3dtaGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDU1MjEsImV4cCI6MjA1NzUyMTUyMX0.MOCLW0QA4wRoYtt3E9wXWd1RVcx2ceMRC_6qgEgIMng'
SUPABASE_SERVICE_KEY = SUPABASE_KEY  # Fallback to SUPABASE_KEY if not provided

# Create a session for connection pooling
session = requests.Session()
session.verify = True  # Enable SSL verification

# Set up headers
headers = {
    "apikey": SUPABASE_KEY,
    "Content-Type": "application/json"
}

def supabase_request(endpoint, method='GET', data=None, timeout=30):
    """
    Make a request to Supabase API
    
    Args:
        endpoint (str): API endpoint to call
        method (str): HTTP method (GET, POST, PUT, DELETE)
        data (dict): Data to send in the request body
        timeout (int): Request timeout in seconds
        
    Returns:
        dict: Response data or error message
    """
    url = f"{SUPABASE_URL}{endpoint}"
    
    try:
        logger.info(f"Making {method} request to {url}")
        
        response = session.request(
            method=method, 
            url=url, 
            headers=headers, 
            json=data,
            timeout=timeout
        )
        
        # Log response status
        logger.info(f"Response status: {response.status_code}")
        
        # Try to parse response as JSON
        try:
            response_data = response.json()
        except json.JSONDecodeError:
            response_data = {"message": response.text}
        
        # Check for error status codes
        if response.status_code >= 400:
            error_message = response_data.get("message", "Unknown error")
            logger.error(f"Request failed with status {response.status_code}: {error_message}")
            return {'error': f'HTTP {response.status_code}: {error_message}'}
        
        return response_data
        
    except requests.exceptions.Timeout:
        logger.error(f"Request to {url} timed out after {timeout} seconds")
        return {'error': f'Request timed out after {timeout} seconds'}
        
    except requests.exceptions.ConnectionError as e:
        logger.error(f"Connection error: {str(e)}")
        return {'error': f'Connection error: {str(e)}'}
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return {'error': f'Unexpected error: {str(e)}'}

def supabase_admin_request(endpoint, method='GET', data=None, timeout=30):
    """
    Make a request to Supabase API with service role key
    
    Args:
        endpoint (str): API endpoint to call
        method (str): HTTP method (GET, POST, PUT, DELETE)
        data (dict): Data to send in the request body
        timeout (int): Request timeout in seconds
        
    Returns:
        dict: Response data or error message
    """
    url = f"{SUPABASE_URL}{endpoint}"
    admin_headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        logger.info(f"Making admin {method} request to {url}")
        
        response = session.request(
            method=method, 
            url=url, 
            headers=admin_headers, 
            json=data,
            timeout=timeout
        )
        
        # Log response status
        logger.info(f"Response status: {response.status_code}")
        
        # Try to parse response as JSON
        try:
            response_data = response.json()
        except json.JSONDecodeError:
            response_data = {"message": response.text}
        
        # Check for error status codes
        if response.status_code >= 400:
            error_message = response_data.get("message", "Unknown error")
            logger.error(f"Admin request failed with status {response.status_code}: {error_message}")
            return {'error': f'HTTP {response.status_code}: {error_message}'}
        
        return response_data
        
    except requests.exceptions.Timeout:
        logger.error(f"Admin request to {url} timed out after {timeout} seconds")
        return {'error': f'Request timed out after {timeout} seconds'}
        
    except requests.exceptions.ConnectionError as e:
        logger.error(f"Admin connection error: {str(e)}")
        return {'error': f'Connection error: {str(e)}'}
        
    except Exception as e:
        logger.error(f"Unexpected error in admin request: {str(e)}")
        return {'error': f'Unexpected error: {str(e)}'}

def upload_file_to_supabase(file, candidate_name):
    """
    Upload a file to Supabase storage
    
    Args:
        file: File object to upload
        candidate_name: Name of the candidate for file naming
        
    Returns:
        dict: Response from Supabase
    """
    try:
        # Generate a unique filename
        filename = f"{candidate_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
        
        # Upload the file
        response = supabase_request(
            f"/storage/v1/object/interview-files/{filename}",
            method='POST',
            data=None,
            timeout=30
        )
        
        return response
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        return {
            'error': str(e),
            'status': 'error',
            'timestamp': datetime.now().isoformat()
        }
