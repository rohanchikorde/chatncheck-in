
from datetime import datetime
import logging

# Set up logger
logger = logging.getLogger(__name__)

def validate_date(date_string):
    """Validate date format and check if it's in the future"""
    try:
        date_format = "%Y-%m-%d"
        date_obj = datetime.strptime(date_string, date_format)
        current_date = datetime.now()
        
        # Set time to midnight for comparison
        current_date = current_date.replace(hour=0, minute=0, second=0, microsecond=0)
        date_obj = date_obj.replace(hour=0, minute=0, second=0, microsecond=0)
        
        if date_obj < current_date:
            return False, "Date must be in the future"
        
        return True, None
    
    except ValueError:
        return False, "Invalid date format. Use YYYY-MM-DD"

def validate_time(time_string):
    """Validate time format (HH:MM)"""
    try:
        time_format = "%H:%M"
        datetime.strptime(time_string, time_format)
        return True, None
    
    except ValueError:
        return False, "Invalid time format. Use HH:MM (24-hour format)"

def validate_interview_form(form_data):
    """Validate interview form data"""
    # Validate required fields
    required_fields = ['candidateName', 'interviewer', 'date', 'time', 'duration', 'format', 'jobRole']
    
    for field in required_fields:
        if field not in form_data or not form_data[field]:
            return False, f"Missing required field: {field}"
    
    # Validate date
    is_valid_date, date_error = validate_date(form_data['date'])
    if not is_valid_date:
        return False, date_error
    
    # Validate time
    is_valid_time, time_error = validate_time(form_data['time'])
    if not is_valid_time:
        return False, time_error
    
    # Validate duration (convert to integer)
    try:
        duration_minutes = int(form_data['duration'])
        if duration_minutes <= 0:
            return False, "Duration must be a positive number"
    except ValueError:
        return False, "Duration must be a valid number"
    
    return True, None

def validate_resume_file(file):
    """Validate resume file type and size"""
    if not file:
        return True, None  # File is optional
        
    # Validate file type
    allowed_types = ['application/pdf', 'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    file_type = file.content_type
    
    if file_type not in allowed_types:
        return False, "Resume must be a PDF, DOC, or DOCX file"
    
    # Validate file size (max 10MB)
    max_size = 10 * 1024 * 1024  # 10MB in bytes
    if file.content_length and file.content_length > max_size:
        return False, "Resume file size must not exceed 10MB"
    
    return True, None
