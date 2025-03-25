from datetime import datetime

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
