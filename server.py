
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import json
from datetime import datetime
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ehcobpmrrtdkebphqaui.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY29icG1ycnRka2VicGhxYXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MjAyNzAsImV4cCI6MjAyMzI5NjI3MH0.Wx6H98f00YP2XAXaPJTAARNbxn6xmr25aPpw1IVZcW0')
STORAGE_BUCKET = 'interview-documents'

# Helper function to make requests to Supabase
def supabase_request(endpoint, method='GET', data=None, headers=None, files=None):
    if headers is None:
        headers = {}
    
    # Add Supabase headers
    headers.update({
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}'
    })
    
    url = f"{SUPABASE_URL}{endpoint}"
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            if files:
                response = requests.post(url, headers=headers, data=data, files=files)
            else:
                headers['Content-Type'] = 'application/json'
                response = requests.post(url, headers=headers, data=json.dumps(data))
        elif method == 'PUT':
            headers['Content-Type'] = 'application/json'
            response = requests.put(url, headers=headers, data=json.dumps(data))
        elif method == 'DELETE':
            response = requests.delete(url, headers=headers)
        else:
            return {'error': 'Invalid method'}, 400
        
        # Handle response
        if response.status_code >= 400:
            app.logger.error(f"Supabase API error: {response.status_code} - {response.text}")
            return {'error': f"Supabase API error: {response.status_code}"}, response.status_code
        
        return response.json(), response.status_code
    
    except Exception as e:
        app.logger.error(f"Error in Supabase request: {str(e)}")
        return {'error': str(e)}, 500

# Helper function to upload file to Supabase Storage
def upload_file_to_supabase(file, candidate_name):
    try:
        # Create a unique file name
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        file_ext = file.filename.split('.')[-1]
        file_name = f"{candidate_name.replace(' ', '_')}_{timestamp}.{file_ext}"
        file_path = f"resumes/{file_name}"
        
        # Upload to Supabase Storage
        endpoint = f"/storage/v1/object/{STORAGE_BUCKET}/{file_path}"
        
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
            return None
        
        # Get public URL
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{STORAGE_BUCKET}/{file_path}"
        return public_url
    
    except Exception as e:
        app.logger.error(f"Error uploading file: {str(e)}")
        return None

# Validate date format and check if it's in the future
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

# Validate time format (HH:MM)
def validate_time(time_string):
    try:
        time_format = "%H:%M"
        datetime.strptime(time_string, time_format)
        return True, None
    
    except ValueError:
        return False, "Invalid time format. Use HH:MM (24-hour format)"

# API endpoint for creating interviews
@app.route('/api/interviews', methods=['POST'])
def create_interview():
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
        app.logger.error(f"Error in create_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for fetching all interviews
@app.route('/api/interviews', methods=['GET'])
def get_interviews():
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
        app.logger.error(f"Error in get_interviews: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for fetching a specific interview
@app.route('/api/interviews/<id>', methods=['GET'])
def get_interview(id):
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
        app.logger.error(f"Error in get_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for updating an interview
@app.route('/api/interviews/<id>', methods=['PUT'])
def update_interview(id):
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
        app.logger.error(f"Error in update_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for deleting an interview
@app.route('/api/interviews/<id>', methods=['DELETE'])
def delete_interview(id):
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
        app.logger.error(f"Error in delete_interview: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
