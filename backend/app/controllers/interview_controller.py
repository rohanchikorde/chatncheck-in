
from flask import jsonify
import logging
from datetime import datetime
from app.utils.supabase_client import supabase_request
from app.utils.validators import validate_interview_form, validate_resume_file
from app.utils.storage import upload_interview_resume

# Set up logger
logger = logging.getLogger(__name__)

def get_all_interviews(status=None, interviewer=None, date_start=None, date_end=None):
    """Get all interviews with optional filtering"""
    try:
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
            return {
                'success': False,
                'error': f"Failed to fetch interviews: {response.get('error', 'Unknown error')}"
            }, status_code
        
        return {
            'success': True,
            'data': response
        }, 200
    
    except Exception as e:
        logger.error(f"Error in get_all_interviews: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }, 500

def get_interview_by_id(id):
    """Get a specific interview by ID"""
    try:
        endpoint = f"/rest/v1/interviews?id=eq.{id}&select=*"
        
        response, status_code = supabase_request(endpoint)
        
        if status_code >= 400:
            return {
                'success': False,
                'error': f"Failed to fetch interview: {response.get('error', 'Unknown error')}"
            }, status_code
        
        if not response or len(response) == 0:
            return {
                'success': False,
                'error': "Interview not found"
            }, 404
        
        return {
            'success': True,
            'data': response[0]
        }, 200
    
    except Exception as e:
        logger.error(f"Error in get_interview_by_id: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }, 500

def create_interview(form_data, resume_file=None):
    """Create a new interview"""
    try:
        # Validate form data
        is_valid, error_message = validate_interview_form(form_data)
        if not is_valid:
            return {
                'success': False,
                'error': error_message
            }, 400
        
        # Validate resume file if present
        if resume_file:
            is_valid_file, file_error = validate_resume_file(resume_file)
            if not is_valid_file:
                return {
                    'success': False,
                    'error': file_error
                }, 400
            
            # Upload resume file
            resume_url = upload_interview_resume(resume_file, form_data['candidateName'])
            
            if not resume_url:
                return {
                    'success': False,
                    'error': "Failed to upload resume file"
                }, 500
        else:
            resume_url = None
        
        # Combine date and time
        scheduled_at = f"{form_data['date']}T{form_data['time']}:00"
        
        # Set use_question_bank to boolean
        use_question_bank = form_data.get('useQuestionBank') in ['true', 'True', True, 1, '1']
        
        # Prepare data for Supabase
        interview_data = {
            'candidate_name': form_data['candidateName'],
            'interviewer_name': form_data['interviewer'],
            'scheduled_at': scheduled_at,
            'duration_minutes': int(form_data['duration']),
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
            return {
                'success': False,
                'error': f"Failed to create interview: {response.get('error', 'Unknown error')}"
            }, status_code
        
        return {
            'success': True,
            'data': response
        }, 201
    
    except Exception as e:
        logger.error(f"Error in create_interview: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }, 500

def update_interview(id, data):
    """Update an existing interview"""
    try:
        # Validate required fields
        is_valid, error_message = validate_interview_form(data)
        if not is_valid:
            return {
                'success': False,
                'error': error_message
            }, 400
        
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
            return {
                'success': False,
                'error': f"Failed to update interview: {response.get('error', 'Unknown error')}"
            }, status_code
        
        # Fetch the updated interview
        get_endpoint = f"/rest/v1/interviews?id=eq.{id}&select=*"
        get_response, get_status_code = supabase_request(get_endpoint)
        
        if get_status_code >= 400 or not get_response or len(get_response) == 0:
            return {
                'success': True,
                'message': "Interview updated but unable to retrieve the updated data"
            }, 200
        
        return {
            'success': True,
            'data': get_response[0]
        }, 200
    
    except Exception as e:
        logger.error(f"Error in update_interview: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }, 500

def delete_interview(id):
    """Delete an interview by ID"""
    try:
        # Check if interview exists
        get_endpoint = f"/rest/v1/interviews?id=eq.{id}&select=id"
        get_response, get_status_code = supabase_request(get_endpoint)
        
        if get_status_code >= 400:
            return {
                'success': False,
                'error': f"Failed to check if interview exists: {get_response.get('error', 'Unknown error')}"
            }, get_status_code
        
        if not get_response or len(get_response) == 0:
            return {
                'success': False,
                'error': "Interview not found"
            }, 404
        
        # Delete the interview
        endpoint = f"/rest/v1/interviews?id=eq.{id}"
        response, status_code = supabase_request(endpoint, method='DELETE')
        
        if status_code >= 400:
            return {
                'success': False,
                'error': f"Failed to delete interview: {response.get('error', 'Unknown error')}"
            }, status_code
        
        return {
            'success': True,
            'message': "Interview deleted successfully"
        }, 200
    
    except Exception as e:
        logger.error(f"Error in delete_interview: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }, 500
