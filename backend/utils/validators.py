from datetime import datetime
import re

def validate_date(date_string):
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
    try:
        time_format = "%H:%M"
        datetime.strptime(time_string, time_format)
        return True, None
    
    except ValueError:
        return False, "Invalid time format. Use HH:MM (24-hour format)"

def validate_email(email: str) -> tuple:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if bool(re.match(pattern, email)):
        return True, None
    else:
        return False, "Invalid email format"

def validate_password(password: str) -> tuple:
    """
    Validate password requirements:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'[0-9]', password):
        return False, "Password must contain at least one number"
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character"
    
    return True, None

def validate_name(name: str) -> tuple:
    """
    Validate name requirements:
    - Minimum 2 characters
    - Only letters and spaces allowed
    - Must start with a letter
    """
    if len(name) < 2:
        return False, "Name must be at least 2 characters long"
    
    if not re.match(r'^[A-Za-z]+(?:\s+[A-Za-z]+)*$', name):
        return False, "Name can only contain letters and spaces"
    
    return True, None

def validate_phone(phone: str) -> tuple:
    """
    Validate phone number format:
    - Optional field
    - Must be a valid phone number format
    """
    if not phone:
        return True, None
    
    # Support for international phone numbers
    pattern = r'^\+?[1-9]\d{1,14}$'
    if not re.match(pattern, phone):
        return False, "Invalid phone number format"
    
    return True, None

def validate_registration_data(data: dict) -> tuple:
    """
    Validate all registration data
    Returns a tuple of (is_valid: bool, errors: dict)
    """
    errors = {}
    
    # Validate required fields
    required_fields = ['email', 'password', 'first_name', 'last_name']
    for field in required_fields:
        if field not in data:
            errors[field] = f"{field.replace('_', ' ').title()} is required"
            continue
        
        if not data[field].strip():
            errors[field] = f"{field.replace('_', ' ').title()} cannot be empty"
            continue
    
    # Validate email
    is_valid, error = validate_email(data.get('email', ''))
    if not is_valid:
        errors['email'] = error
    
    # Validate password
    is_valid, error = validate_password(data.get('password', ''))
    if not is_valid:
        errors['password'] = error
    
    # Validate names
    for name_field in ['first_name', 'last_name']:
        is_valid, error = validate_name(data.get(name_field, ''))
        if not is_valid:
            errors[name_field] = error
    
    # Validate phone (optional)
    is_valid, error = validate_phone(data.get('phone', ''))
    if not is_valid:
        errors['phone'] = error
    
    return not bool(errors), errors
