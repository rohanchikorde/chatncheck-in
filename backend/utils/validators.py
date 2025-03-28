
from datetime import datetime

def validate_date(date_string):
    """
    Validate date format and check if it's in the future
    """
    try:
        date_format = "%Y-%m-%d"
        date_obj = datetime.strptime(date_string, date_format)
        current_date = datetime.now()
        
        # Set time to midnight for comparison
        current_date = current_date.replace(hour=0, minute=0, second=0, microsecond=0)
        date_obj = date_obj.replace(hour=0, minute=0, second=0, microsecond=0)
        
        if date_obj < current_date:
            return False
        
        return True
    except ValueError:
        return False

def validate_time(time_string):
    """
    Validate time format (HH:MM)
    """
    try:
        time_format = "%H:%M"
        datetime.strptime(time_string, time_format)
        return True
    except ValueError:
        return False

def validate_email(email):
    """
    Validate email format
    """
    if not email or '@' not in email or '.' not in email:
        return False
    return True

def validate_required_fields(data, required_fields):
    """
    Validate that all required fields are present and not empty
    """
    missing_fields = []
    for field in required_fields:
        if field not in data or not data[field]:
            missing_fields.append(field)
    
    return missing_fields
