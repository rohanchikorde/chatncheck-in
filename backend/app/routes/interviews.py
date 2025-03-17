
from flask import Blueprint, request, jsonify, make_response
from datetime import datetime
import logging
from app.utils.supabase_client import supabase_request, upload_file_to_supabase

# Set up logger
logger = logging.getLogger(__name__)

# Create Blueprint
bp = Blueprint('interviews', __name__, url_prefix='/api')

# Validation functions
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

# Make sure to add CORS headers for all responses
@bp.after_request
def add_cors_headers(response):
    """Add CORS headers to all responses"""
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

# Handle OPTIONS requests for CORS preflight
@bp.route('/interviews', methods=['OPTIONS'])
@bp.route('/interviews/<id>', methods=['OPTIONS'])
def handle_options(id=None):
    """Handle OPTIONS requests for CORS preflight"""
    return make_response('', 200)

# API endpoint for creating interviews
@bp.route('/interviews', methods=['POST'])
def create_interview():
    """Create a new interview"""
    try:
        # Check if this is a multipart form (with file upload)
        if request.content_type and 'multipart/form-data' in request.content_type:
            form_data = request.form
            resume_file = request.files.get('resume')
        else:
            form_data = request.json
            resume_file = None
        
        # Validate required fields
        required_fields = ['candidateName', 'interviewer', 'date', 'time', 'duration', 'format', 'jobRole']
        
        for field in required_fields:
            if field not in form_data or not form_data[field]:
                return jsonify({
                    'success': False,
                    'error': f"Missing required field: {field}"
                }), 400
        
        # Validate date
        is_valid_date, date_error = validate_date(form_data['date'])
        if not is_valid_date:
            return jsonify({
                'success': False,
                'error': date_error
            }), 400
        
        # Validate time
        is_valid_time, time_error = validate_time(form_data['time'])
        if not is_valid_time:
            return jsonify({
                'success': False,
                'error': time_error
            }), 400
        
        # Validate duration (convert to integer)
        try:
            duration_minutes = int(form_data['duration'])
            if duration_minutes <= 0:
                return jsonify({
                    'success': False,
                    'error': "Duration must be a positive number"
                }), 400
        except ValueError:
            return jsonify({
                'success': False,
                'error': "Duration must be a valid number"
            }), 400
        
        # Handle resume file upload
        resume_url = None
        if resume_file:
            # Validate file type
            allowed_types = ['application/pdf', 'application/msword', 
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            file_type = resume_file.content_type
            
            if file_type not in allowed_types:
                return jsonify({
                    'success': False,
                    'error': "Resume must be a PDF, DOC, or DOCX file"
                }), 400
            
            # Validate file size (max 10MB)
            max_size = 10 * 1024 * 1024  # 10MB in bytes
            if resume_file.content_length and resume_file.content_length > max_size:
                return jsonify({
                    'success': False,
                    'error': "Resume file size must not exceed 10MB"
                }), 400
            
            # Upload file to Supabase Storage
            resume_url = upload_file_to_supabase(resume_file, form_data['candidateName'])
            
            if not resume_url:
                return jsonify({
                    'success': False,
                    'error': "Failed to upload resume file"
                }), 500
        
        # Combine date and time
        scheduled_at = f"{form_data['date']}T{form_data['time']}:00"
        
        # Set use_question_bank to boolean
        use_question_bank = form_data.get('useQuestionBank') in ['true', 'True', True, 1, '1']
        
        # Prepare data for Supabase
        interview_data = {
            'candidate_name': form_data['candidateName'],
            'interviewer_name': form_data['interviewer'],
            'scheduled_at': scheduled_at,
            'duration_minutes': duration_minutes,
            'format': form_data['format'],
            'job_role': form_data['jobRole'],
            'status': 'Scheduled',
            'feedback_submitted': 'No',
            'use_question_bank': use_question_bank
        }
        
        # Add resume URL if available
        if resume_url:
            interview_data['resume_url'] = resume_url
        
        # Insert into Supabase
        response, status_code = supabase_request(
            '/rest/v1/interviews',
            method='POST',
            data=interview_data
        )
        
        if status_code >= 400:
            return jsonify({
                'success': False,
                'error': f"Failed to create interview: {response.get('error', 'Unknown error')}"
            }), status_code
        
        return jsonify({
            'success': True,
            'data': response
        }), 201
    
    except Exception as e:
        logger.error(f"Error in create_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for fetching all interviews
@bp.route('/interviews', methods=['GET'])
def get_interviews():
    """Get all interviews with optional filtering"""
    try:
        # Get query parameters
        status = request.args.get('status')
        interviewer = request.args.get('interviewer')
        date_start = request.args.get('date_start')
        date_end = request.args.get('date_end')
        
        # Build query
        endpoint = '/rest/v1/interviews?select=*'
        
        if status:
            endpoint += f"&status=eq.{status}"
        
        if interviewer:
            endpoint += f"&interviewer_name=eq.{interviewer}"
        
        if date_start:
            endpoint += f"&scheduled_at=gte.{date_start}"
        
        if date_end:
            endpoint += f"&scheduled_at=lte.{date_end}"
        
        # Order by scheduled_at
        endpoint += "&order=scheduled_at.asc"
        
        # Make Supabase request
        response, status_code = supabase_request(endpoint)
        
        if status_code >= 400:
            return jsonify({
                'success': False,
                'error': f"Failed to fetch interviews: {response.get('error', 'Unknown error')}"
            }), status_code
        
        return jsonify({
            'success': True,
            'data': response
        })
    
    except Exception as e:
        logger.error(f"Error in get_interviews: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for fetching a specific interview
@bp.route('/interviews/<id>', methods=['GET'])
def get_interview(id):
    """Get a specific interview by ID"""
    try:
        endpoint = f"/rest/v1/interviews?id=eq.{id}&select=*"
        
        response, status_code = supabase_request(endpoint)
        
        if status_code >= 400:
            return jsonify({
                'success': False,
                'error': f"Failed to fetch interview: {response.get('error', 'Unknown error')}"
            }), status_code
        
        if not response or len(response) == 0:
            return jsonify({
                'success': False,
                'error': "Interview not found"
            }), 404
        
        return jsonify({
            'success': True,
            'data': response[0]
        })
    
    except Exception as e:
        logger.error(f"Error in get_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for updating an interview
@bp.route('/interviews/<id>', methods=['PUT'])
def update_interview(id):
    """Update an existing interview"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['candidateName', 'interviewer', 'date', 'time', 'duration', 'format', 'jobRole']
        
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'error': f"Missing required field: {field}"
                }), 400
        
        # Validate date and time
        is_valid_date, date_error = validate_date(data['date'])
        if not is_valid_date:
            return jsonify({
                'success': False,
                'error': date_error
            }), 400
        
        is_valid_time, time_error = validate_time(data['time'])
        if not is_valid_time:
            return jsonify({
                'success': False,
                'error': time_error
            }), 400
        
        # Combine date and time
        scheduled_at = f"{data['date']}T{data['time']}:00"
        
        # Prepare update data
        update_data = {
            'candidate_name': data['candidateName'],
            'interviewer_name': data['interviewer'],
            'scheduled_at': scheduled_at,
            'duration_minutes': int(data['duration']),
            'format': data['format'],
            'job_role': data['jobRole']
        }
        
        # Update optional fields
        if 'status' in data:
            update_data['status'] = data['status']
        
        if 'feedbackSubmitted' in data:
            update_data['feedback_submitted'] = data['feedbackSubmitted']
        
        if 'useQuestionBank' in data:
            update_data['use_question_bank'] = data['useQuestionBank']
        
        # Make Supabase request
        endpoint = f"/rest/v1/interviews?id=eq.{id}"
        response, status_code = supabase_request(endpoint, method='PUT', data=update_data)
        
        if status_code >= 400:
            return jsonify({
                'success': False,
                'error': f"Failed to update interview: {response.get('error', 'Unknown error')}"
            }), status_code
        
        # Fetch the updated interview
        get_endpoint = f"/rest/v1/interviews?id=eq.{id}&select=*"
        get_response, get_status_code = supabase_request(get_endpoint)
        
        if get_status_code >= 400 or not get_response or len(get_response) == 0:
            return jsonify({
                'success': True,
                'message': "Interview updated but unable to retrieve the updated data"
            })
        
        return jsonify({
            'success': True,
            'data': get_response[0]
        })
    
    except Exception as e:
        logger.error(f"Error in update_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for deleting an interview
@bp.route('/interviews/<id>', methods=['DELETE'])
def delete_interview(id):
    """Delete an interview by ID"""
    try:
        # Check if interview exists
        get_endpoint = f"/rest/v1/interviews?id=eq.{id}&select=id"
        get_response, get_status_code = supabase_request(get_endpoint)
        
        if get_status_code >= 400:
            return jsonify({
                'success': False,
                'error': f"Failed to check if interview exists: {get_response.get('error', 'Unknown error')}"
            }), get_status_code
        
        if not get_response or len(get_response) == 0:
            return jsonify({
                'success': False,
                'error': "Interview not found"
            }), 404
        
        # Delete the interview
        endpoint = f"/rest/v1/interviews?id=eq.{id}"
        response, status_code = supabase_request(endpoint, method='DELETE')
        
        if status_code >= 400:
            return jsonify({
                'success': False,
                'error': f"Failed to delete interview: {response.get('error', 'Unknown error')}"
            }), status_code
        
        return jsonify({
            'success': True,
            'message': "Interview deleted successfully"
        })
    
    except Exception as e:
        logger.error(f"Error in delete_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
