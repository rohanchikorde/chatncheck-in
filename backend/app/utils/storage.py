
from datetime import datetime
import logging
from app.utils.supabase_client import supabase_request

# Set up logger
logger = logging.getLogger(__name__)

def upload_interview_resume(file, candidate_name, bucket='interview-documents'):
    """Upload resume file to Supabase Storage"""
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
            logger.error(f"Failed to upload file: {response}")
            return None
        
        # Get public URL
        from app.config.config import SUPABASE_URL
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket}/{file_path}"
        return public_url
    
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        return None
