
import requests
import logging
import os
from config.config import SUPABASE_URL, SUPABASE_KEY

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure requests session for better connection handling
session = requests.Session()
adapter = requests.adapters.HTTPAdapter(max_retries=3)
session.mount('https://', adapter)

def supabase_request(endpoint, data=None, method='GET', headers=None, files=None):
    """
    Helper function to make requests to Supabase
    """
    if headers is None:
        headers = {}
    
    # Add Supabase headers
    headers.update({
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json' if method in ['POST', 'PUT'] and not files else 'application/json'
    })
    
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    
    try:
        logger.info(f"Making {method} request to {url}")
        
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
            logger.error(f"Invalid method: {method}")
            return None
        
        # Log response status
        logger.info(f"Supabase response status: {response.status_code}")
        
        if response.status_code >= 400:
            logger.error(f"Supabase error: {response.text}")
        
        return response
    
    except requests.exceptions.RequestException as e:
        logger.error(f"Supabase request failed: {str(e)}")
        return None
