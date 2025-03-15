
from flask import Flask, request, jsonify, make_response
import csv
import os
import json
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define CSV files for different data types
INTERVIEWS_FILE = 'interviews.csv'
USERS_FILE = 'users.csv'
FEEDBACK_FILE = 'feedback.csv'

# Define headers for each CSV file
INTERVIEW_HEADERS = ['id', 'candidate_name', 'interviewer_name', 'scheduled_at', 'status', 
                    'feedback_submitted', 'job_role', 'format', 'duration']
USER_HEADERS = ['id', 'name', 'email', 'role', 'status', 'last_active']
FEEDBACK_HEADERS = ['id', 'interview_id', 'rating', 'comments', 'submitted_by', 'submitted_at',
                   'problem_solving', 'communication']

# Helper function to read CSV file
def read_csv(file_path, headers):
    if not os.path.exists(file_path):
        # Create the file with headers if it doesn't exist
        initialize_csv(file_path, headers)
        return []
    
    try:
        with open(file_path, 'r', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            return list(reader)
    except Exception as e:
        app.logger.error(f"Error reading CSV file {file_path}: {str(e)}")
        raise Exception(f"CSV error, check file {file_path}")

# Helper function to write to CSV file
def write_csv(file_path, data, headers):
    try:
        with open(file_path, 'w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=headers)
            writer.writeheader()
            writer.writerows(data)
    except Exception as e:
        app.logger.error(f"Error writing to CSV file {file_path}: {str(e)}")
        raise Exception(f"CSV error, check file {file_path}")

# Initialize CSV file with headers
def initialize_csv(file_path, headers):
    if not os.path.exists(file_path):
        try:
            with open(file_path, 'w', newline='', encoding='utf-8') as file:
                writer = csv.DictWriter(file, fieldnames=headers)
                writer.writeheader()
            print(f"Initialized {file_path} with headers")
        except Exception as e:
            app.logger.error(f"Error initializing CSV file {file_path}: {str(e)}")
            raise Exception(f"CSV initialization error for {file_path}")

# Validate ISO date format
def validate_date(date_string):
    try:
        datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return True
    except ValueError:
        return False

# Generate a new ID for a record
def generate_id(data):
    if not data:
        return "1"
    max_id = max([int(item.get('id', 0)) for item in data])
    return str(max_id + 1)

# API Routes for Interviews
# GET /interviews - Fetch all interviews with optional filtering
@app.route('/interviews', methods=['GET'])
def get_interviews():
    try:
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Apply filters from query parameters
        status = request.args.get('status')
        interviewer_name = request.args.get('interviewer_name')
        date_start = request.args.get('date_start')
        date_end = request.args.get('date_end')
        search = request.args.get('search')
        interview_id = request.args.get('id')
        
        if interview_id:
            interviews = [i for i in interviews if i.get('id') == interview_id]
        
        if status:
            interviews = [i for i in interviews if i.get('status') == status]
        
        if interviewer_name:
            interviews = [i for i in interviews if i.get('interviewer_name') == interviewer_name]
        
        if date_start:
            if not validate_date(date_start):
                return make_response(jsonify({"error": "Invalid date_start format"}), 400)
            interviews = [i for i in interviews if i.get('scheduled_at') >= date_start]
        
        if date_end:
            if not validate_date(date_end):
                return make_response(jsonify({"error": "Invalid date_end format"}), 400)
            interviews = [i for i in interviews if i.get('scheduled_at') <= date_end]
        
        if search:
            interviews = [i for i in interviews if 
                          search.lower() in i.get('candidate_name', '').lower() or
                          search.lower() in i.get('interviewer_name', '').lower() or
                          search.lower() in i.get('job_role', '').lower()]
        
        # Sort by scheduled_at (default: ascending)
        interviews.sort(key=lambda x: x.get('scheduled_at', ''))
        
        return jsonify(interviews)
    
    except Exception as e:
        app.logger.error(f"Error in get_interviews: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# POST /interviews - Create a new interview
@app.route('/interviews', methods=['POST'])
def create_interview():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['candidate_name', 'interviewer_name', 'scheduled_at', 'status', 'job_role']
        for field in required_fields:
            if field not in data:
                return make_response(jsonify({"error": f"Missing required field: {field}"}), 400)
        
        # Validate date format
        if not validate_date(data['scheduled_at']):
            return make_response(jsonify({"error": "Invalid scheduled_at format"}), 400)
        
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Generate new ID
        new_id = generate_id(interviews)
        
        # Create new interview
        new_interview = {
            'id': new_id,
            'candidate_name': data['candidate_name'],
            'interviewer_name': data['interviewer_name'],
            'scheduled_at': data['scheduled_at'],
            'status': data['status'],
            'feedback_submitted': data.get('feedback_submitted', 'No'),
            'job_role': data['job_role'],
            'format': data.get('format', ''),
            'duration': data.get('duration', '')
        }
        
        interviews.append(new_interview)
        write_csv(INTERVIEWS_FILE, interviews, INTERVIEW_HEADERS)
        
        return jsonify(new_interview), 201
    
    except Exception as e:
        app.logger.error(f"Error in create_interview: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# GET /interviews/<id> - Get a specific interview
@app.route('/interviews/<id>', methods=['GET'])
def get_interview(id):
    try:
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Find the interview
        interview = next((i for i in interviews if i['id'] == id), None)
        
        if not interview:
            return make_response(jsonify({"error": "Interview not found"}), 404)
        
        return jsonify(interview)
    
    except Exception as e:
        app.logger.error(f"Error in get_interview: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# PUT /interviews/<id> - Edit an interview
@app.route('/interviews/<id>', methods=['PUT'])
def update_interview(id):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['candidate_name', 'interviewer_name', 'scheduled_at', 'status', 'job_role']
        for field in required_fields:
            if field not in data:
                return make_response(jsonify({"error": f"Missing required field: {field}"}), 400)
        
        # Validate date format
        if not validate_date(data['scheduled_at']):
            return make_response(jsonify({"error": "Invalid scheduled_at format"}), 400)
        
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Find the interview to update
        interview = next((i for i in interviews if i['id'] == id), None)
        
        if not interview:
            return make_response(jsonify({"error": "Interview not found"}), 404)
            
        # Update fields
        interview['candidate_name'] = data['candidate_name']
        interview['interviewer_name'] = data['interviewer_name']
        interview['scheduled_at'] = data['scheduled_at']
        interview['status'] = data['status']
        interview['job_role'] = data['job_role']
        
        # Optionally update feedback if provided
        if 'feedback_submitted' in data:
            interview['feedback_submitted'] = data['feedback_submitted']
        
        # Update optional fields if provided
        if 'format' in data:
            interview['format'] = data['format']
        if 'duration' in data:
            interview['duration'] = data['duration']
        
        write_csv(INTERVIEWS_FILE, interviews, INTERVIEW_HEADERS)
        return jsonify(interview)
    
    except Exception as e:
        app.logger.error(f"Error in update_interview: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# DELETE /interviews/<id> - Delete an interview
@app.route('/interviews/<id>', methods=['DELETE'])
def delete_interview(id):
    try:
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Find the interview to delete
        initial_length = len(interviews)
        interviews = [i for i in interviews if i['id'] != id]
        
        if len(interviews) == initial_length:
            return make_response(jsonify({"error": "Interview not found"}), 404)
        
        write_csv(INTERVIEWS_FILE, interviews, INTERVIEW_HEADERS)
        return jsonify({"message": "Interview deleted successfully"})
    
    except Exception as e:
        app.logger.error(f"Error in delete_interview: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# API Routes for Users
# GET /users - Fetch all users with optional filtering
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = read_csv(USERS_FILE, USER_HEADERS)
        
        # Apply filters from query parameters
        role = request.args.get('role')
        status = request.args.get('status')
        search = request.args.get('search')
        user_id = request.args.get('id')
        
        if user_id:
            users = [u for u in users if u.get('id') == user_id]
        
        if role:
            users = [u for u in users if u.get('role') == role]
        
        if status:
            users = [u for u in users if u.get('status') == status]
        
        if search:
            users = [u for u in users if 
                    search.lower() in u.get('name', '').lower() or
                    search.lower() in u.get('email', '').lower()]
        
        return jsonify(users)
    
    except Exception as e:
        app.logger.error(f"Error in get_users: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# POST /users - Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'role']
        for field in required_fields:
            if field not in data:
                return make_response(jsonify({"error": f"Missing required field: {field}"}), 400)
        
        users = read_csv(USERS_FILE, USER_HEADERS)
        
        # Check if email already exists
        if any(u.get('email') == data['email'] for u in users):
            return make_response(jsonify({"error": "Email already exists"}), 400)
        
        # Generate new ID
        new_id = generate_id(users)
        
        # Get current time for last_active
        now = datetime.now().isoformat()
        
        # Create new user
        new_user = {
            'id': new_id,
            'name': data['name'],
            'email': data['email'],
            'role': data['role'],
            'status': data.get('status', 'Active'),
            'last_active': now
        }
        
        users.append(new_user)
        write_csv(USERS_FILE, users, USER_HEADERS)
        
        return jsonify(new_user), 201
    
    except Exception as e:
        app.logger.error(f"Error in create_user: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# PUT /users/<id> - Update a user
@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'role', 'status']
        for field in required_fields:
            if field not in data:
                return make_response(jsonify({"error": f"Missing required field: {field}"}), 400)
        
        users = read_csv(USERS_FILE, USER_HEADERS)
        
        # Find the user to update
        user = next((u for u in users if u['id'] == id), None)
        
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)
        
        # Check if email already exists for a different user
        if data['email'] != user['email'] and any(u.get('email') == data['email'] for u in users if u['id'] != id):
            return make_response(jsonify({"error": "Email already exists"}), 400)
        
        # Update fields
        user['name'] = data['name']
        user['email'] = data['email']
        user['role'] = data['role']
        user['status'] = data['status']
        
        write_csv(USERS_FILE, users, USER_HEADERS)
        return jsonify(user)
    
    except Exception as e:
        app.logger.error(f"Error in update_user: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# DELETE /users/<id> - Delete a user
@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        users = read_csv(USERS_FILE, USER_HEADERS)
        
        # Find the user to delete
        initial_length = len(users)
        users = [u for u in users if u['id'] != id]
        
        if len(users) == initial_length:
            return make_response(jsonify({"error": "User not found"}), 404)
        
        write_csv(USERS_FILE, users, USER_HEADERS)
        return jsonify({"message": "User deleted successfully"})
    
    except Exception as e:
        app.logger.error(f"Error in delete_user: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# API Routes for Feedback
# GET /feedback - Fetch all feedback with optional filtering
@app.route('/feedback', methods=['GET'])
def get_feedback():
    try:
        feedback = read_csv(FEEDBACK_FILE, FEEDBACK_HEADERS)
        
        # Apply filters from query parameters
        interview_id = request.args.get('interview_id')
        
        if interview_id:
            feedback = [f for f in feedback if f.get('interview_id') == interview_id]
        
        return jsonify(feedback)
    
    except Exception as e:
        app.logger.error(f"Error in get_feedback: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# POST /feedback - Create new feedback for an interview
@app.route('/feedback', methods=['POST'])
def create_feedback():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['interview_id', 'comments', 'submitted_by', 'problem_solving', 'communication']
        for field in required_fields:
            if field not in data:
                return make_response(jsonify({"error": f"Missing required field: {field}"}), 400)
        
        # Validate interview exists
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        interview = next((i for i in interviews if i['id'] == data['interview_id']), None)
        
        if not interview:
            return make_response(jsonify({"error": "Interview not found"}), 404)
        
        # Read feedback data
        feedback_entries = read_csv(FEEDBACK_FILE, FEEDBACK_HEADERS)
        
        # Check if feedback already exists for this interview
        if any(f.get('interview_id') == data['interview_id'] for f in feedback_entries):
            return make_response(jsonify({"error": "Feedback already exists for this interview"}), 400)
        
        # Generate new ID
        new_id = generate_id(feedback_entries)
        
        # Get current time
        now = datetime.now().isoformat()
        
        # Create new feedback
        new_feedback = {
            'id': new_id,
            'interview_id': data['interview_id'],
            'rating': data.get('rating', ''),
            'comments': data['comments'],
            'submitted_by': data['submitted_by'],
            'submitted_at': now,
            'problem_solving': str(data['problem_solving']),
            'communication': str(data['communication'])
        }
        
        feedback_entries.append(new_feedback)
        write_csv(FEEDBACK_FILE, feedback_entries, FEEDBACK_HEADERS)
        
        # Update interview to mark feedback as submitted
        interview['feedback_submitted'] = 'Yes'
        write_csv(INTERVIEWS_FILE, interviews, INTERVIEW_HEADERS)
        
        return jsonify(new_feedback), 201
    
    except Exception as e:
        app.logger.error(f"Error in create_feedback: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# API Routes for Interviewer
# GET /interviewer/interviews - Fetch interviews for a specific interviewer
@app.route('/interviewer/interviews', methods=['GET'])
def get_interviewer_interviews():
    try:
        interviewer_name = request.args.get('interviewer_name', 'Isha Gupta')  # Default for demo
        status = request.args.get('status')
        date_start = request.args.get('date_start')
        date_end = request.args.get('date_end')
        
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Filter by interviewer
        interviews = [i for i in interviews if i.get('interviewer_name') == interviewer_name]
        
        # Apply additional filters
        if status:
            interviews = [i for i in interviews if i.get('status') == status]
        
        if date_start:
            if not validate_date(date_start):
                return make_response(jsonify({"error": "Invalid date_start format"}), 400)
            interviews = [i for i in interviews if i.get('scheduled_at') >= date_start]
        
        if date_end:
            if not validate_date(date_end):
                return make_response(jsonify({"error": "Invalid date_end format"}), 400)
            interviews = [i for i in interviews if i.get('scheduled_at') <= date_end]
        
        # Sort by date
        interviews.sort(key=lambda x: x.get('scheduled_at', ''))
        
        return jsonify(interviews)
    
    except Exception as e:
        app.logger.error(f"Error in get_interviewer_interviews: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# POST /interviewer/interviews/<id>/feedback - Submit feedback for an interview
@app.route('/interviewer/interviews/<id>/feedback', methods=['POST'])
def submit_interviewer_feedback(id):
    try:
        data = request.get_json()
        interviewer_name = data.get('submitted_by', 'Isha Gupta')  # Default for demo
        
        # Validate required fields
        required_fields = ['problem_solving', 'communication', 'comments']
        for field in required_fields:
            if field not in data:
                return make_response(jsonify({"error": f"Missing required field: {field}"}), 400)
        
        # Check if interview exists and is completed
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        interview = next((i for i in interviews if i['id'] == id), None)
        
        if not interview:
            return make_response(jsonify({"error": "Interview not found"}), 404)
        
        if interview.get('status') != 'Completed':
            return make_response(jsonify({"error": "Cannot submit feedback for an interview that is not completed"}), 400)
        
        if interview.get('feedback_submitted') == 'Yes':
            return make_response(jsonify({"error": "Feedback already submitted for this interview"}), 400)
        
        # Update interview to mark feedback as submitted
        interview['feedback_submitted'] = 'Yes'
        write_csv(INTERVIEWS_FILE, interviews, INTERVIEW_HEADERS)
        
        # Create new feedback entry
        feedback_data = {
            'interview_id': id,
            'problem_solving': data['problem_solving'],
            'communication': data['communication'],
            'comments': data['comments'],
            'submitted_by': interviewer_name
        }
        
        # Add to feedback CSV
        feedback_entries = read_csv(FEEDBACK_FILE, FEEDBACK_HEADERS)
        new_id = generate_id(feedback_entries)
        now = datetime.now().isoformat()
        
        new_feedback = {
            'id': new_id,
            'interview_id': id,
            'rating': '',  # Legacy field, using separate scores now
            'comments': data['comments'],
            'submitted_by': interviewer_name,
            'submitted_at': now,
            'problem_solving': str(data['problem_solving']),
            'communication': str(data['communication'])
        }
        
        feedback_entries.append(new_feedback)
        write_csv(FEEDBACK_FILE, feedback_entries, FEEDBACK_HEADERS)
        
        return jsonify({"message": "Feedback submitted successfully"}), 201
    
    except Exception as e:
        app.logger.error(f"Error in submit_interviewer_feedback: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# GET /interviewer/feedback - Get feedback submitted by an interviewer
@app.route('/interviewer/feedback', methods=['GET'])
def get_interviewer_feedback():
    try:
        interviewer_name = request.args.get('interviewer_name', 'Isha Gupta')  # Default for demo
        
        feedback_entries = read_csv(FEEDBACK_FILE, FEEDBACK_HEADERS)
        
        # Filter by interviewer
        feedback_entries = [f for f in feedback_entries if f.get('submitted_by') == interviewer_name]
        
        # Sort by submission date (newest first)
        feedback_entries.sort(key=lambda x: x.get('submitted_at', ''), reverse=True)
        
        # Enhance feedback data with candidate and job role
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        enhanced_feedback = []
        for feedback in feedback_entries:
            interview = next((i for i in interviews if i['id'] == feedback['interview_id']), None)
            if interview:
                enhanced_entry = feedback.copy()
                enhanced_entry['candidate_name'] = interview.get('candidate_name', '')
                enhanced_entry['job_role'] = interview.get('job_role', '')
                enhanced_entry['interview_date'] = interview.get('scheduled_at', '')
                enhanced_feedback.append(enhanced_entry)
        
        return jsonify(enhanced_feedback)
    
    except Exception as e:
        app.logger.error(f"Error in get_interviewer_feedback: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# API Routes for Interviewee
# GET /interviewee/interviews - Fetch interviews for a specific candidate
@app.route('/interviewee/interviews', methods=['GET'])
def get_interviewee_interviews():
    try:
        candidate_name = request.args.get('candidate_name', 'Sam Patel')  # Default for demo
        
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Filter by candidate
        interviews = [i for i in interviews if i.get('candidate_name') == candidate_name]
        
        # Sort by date
        interviews.sort(key=lambda x: x.get('scheduled_at', ''))
        
        # Add feedback status info
        feedback_entries = read_csv(FEEDBACK_FILE, FEEDBACK_HEADERS)
        
        for interview in interviews:
            feedback = next((f for f in feedback_entries if f.get('interview_id') == interview['id']), None)
            
            if feedback and interview['status'] == 'Completed':
                # For demo purposes, just mark as "Under Review"
                # In a real app, we'd have a more complex feedback status system
                interview['feedback_status'] = 'Under Review'
            elif interview['status'] == 'Completed' and not feedback:
                interview['feedback_status'] = 'Pending'
        
        return jsonify(interviews)
    
    except Exception as e:
        app.logger.error(f"Error in get_interviewee_interviews: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# GET /interviewee/interviews/<id>/join - Join an interview (update status to In Progress)
@app.route('/interviewee/interviews/<id>/join', methods=['GET'])
def join_interview(id):
    try:
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        
        # Find the interview
        interview = next((i for i in interviews if i['id'] == id), None)
        
        if not interview:
            return make_response(jsonify({"error": "Interview not found"}), 404)
        
        # Check if interview is scheduled
        if interview['status'] != 'Scheduled':
            return make_response(jsonify({"error": "Interview is not in Scheduled status"}), 400)
        
        # Check if within time window (15 mins before to 1 hour after)
        interview_time = datetime.fromisoformat(interview['scheduled_at'].replace('Z', '+00:00'))
        now = datetime.now().replace(tzinfo=None)
        time_diff = (interview_time.replace(tzinfo=None) - now).total_seconds() / 60
        
        if time_diff > 15:
            return make_response(jsonify({"error": "Interview not ready yet, please join 15 minutes before the scheduled time"}), 403)
        
        if time_diff < -60:
            return make_response(jsonify({"error": "Interview time has passed"}), 403)
        
        # Update status to In Progress
        interview['status'] = 'In Progress'
        write_csv(INTERVIEWS_FILE, interviews, INTERVIEW_HEADERS)
        
        # Return mock join URL
        return jsonify({"join_url": f"https://video-call/{id}", "message": "Interview joined successfully"})
    
    except Exception as e:
        app.logger.error(f"Error in join_interview: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# GET /statistics - Get statistics for dashboard
@app.route('/statistics', methods=['GET'])
def get_statistics():
    try:
        interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
        users = read_csv(USERS_FILE, USER_HEADERS)
        
        # Calculate statistics
        total_interviews = len(interviews)
        scheduled_interviews = sum(1 for i in interviews if i['status'] == 'Scheduled')
        completed_interviews = sum(1 for i in interviews if i['status'] == 'Completed')
        cancelled_interviews = sum(1 for i in interviews if i['status'] == 'Cancelled')
        
        # Interview formats
        formats = {}
        for interview in interviews:
            format_type = interview.get('format', 'Unspecified')
            if format_type:
                formats[format_type] = formats.get(format_type, 0) + 1
        
        # User statistics
        user_stats = {
            'total': len(users),
            'active': sum(1 for u in users if u['status'] == 'Active'),
            'inactive': sum(1 for u in users if u['status'] == 'Inactive'),
            'by_role': {}
        }
        
        for user in users:
            role = user.get('role', 'Unspecified')
            if role:
                user_stats['by_role'][role] = user_stats['by_role'].get(role, 0) + 1
        
        statistics = {
            'interviews': {
                'total': total_interviews,
                'scheduled': scheduled_interviews,
                'completed': completed_interviews,
                'cancelled': cancelled_interviews,
                'formats': formats
            },
            'users': user_stats
        }
        
        return jsonify(statistics)
    
    except Exception as e:
        app.logger.error(f"Error in get_statistics: {str(e)}")
        return make_response(jsonify({"error": str(e)}), 500)

# Initialize all CSV files on startup
def initialize_all_csv_files():
    initialize_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
    initialize_csv(USERS_FILE, USER_HEADERS)
    initialize_csv(FEEDBACK_FILE, FEEDBACK_HEADERS)
    
    # Add sample data if files are empty
    add_sample_data()

# Add sample data for demonstration (only if files are empty)
def add_sample_data():
    # Add sample interviews if none exist
    interviews = read_csv(INTERVIEWS_FILE, INTERVIEW_HEADERS)
    if not interviews:
        sample_interviews = [
            {
                'id': '1',
                'candidate_name': 'Sam Patel',
                'interviewer_name': 'Isha Gupta',
                'scheduled_at': '2025-03-15T10:00:00Z',
                'status': 'Scheduled',
                'feedback_submitted': 'No',
                'job_role': 'Frontend Developer',
                'format': 'technical',
                'duration': '60'
            },
            {
                'id': '2',
                'candidate_name': 'Sam Patel',
                'interviewer_name': 'Alex Johnson',
                'scheduled_at': '2025-03-18T14:00:00Z',
                'status': 'Scheduled',
                'feedback_submitted': 'No',
                'job_role': 'Frontend Developer',
                'format': 'behavioral',
                'duration': '45'
            },
            {
                'id': '3',
                'candidate_name': 'Sam Patel',
                'interviewer_name': 'Michael Chen',
                'scheduled_at': '2025-03-10T11:00:00Z',
                'status': 'Completed',
                'feedback_submitted': 'No',
                'job_role': 'Frontend Developer',
                'format': 'technical',
                'duration': '60'
            },
            {
                'id': '4',
                'candidate_name': 'John Doe',
                'interviewer_name': 'Isha Gupta',
                'scheduled_at': '2025-03-16T14:00:00Z',
                'status': 'Scheduled',
                'feedback_submitted': 'No',
                'job_role': 'Backend Developer',
                'format': 'technical',
                'duration': '60'
            },
            {
                'id': '5',
                'candidate_name': 'Maria Garcia',
                'interviewer_name': 'Isha Gupta',
                'scheduled_at': '2025-03-10T11:00:00Z',
                'status': 'Completed',
                'feedback_submitted': 'No',
                'job_role': 'UX Designer',
                'format': 'behavioral',
                'duration': '45'
            }
        ]
        write_csv(INTERVIEWS_FILE, sample_interviews, INTERVIEW_HEADERS)
    
    # Add sample users if none exist
    users = read_csv(USERS_FILE, USER_HEADERS)
    if not users:
        sample_users = [
            {
                'id': '1',
                'name': 'Isha Gupta',
                'email': 'isha.gupta@example.com',
                'role': 'Interviewer',
                'status': 'Active',
                'last_active': '2025-03-14T09:30:00Z'
            },
            {
                'id': '2',
                'name': 'Sam Patel',
                'email': 'sam.patel@example.com',
                'role': 'Candidate',
                'status': 'Active',
                'last_active': '2025-03-14T10:15:00Z'
            },
            {
                'id': '3',
                'name': 'Alex Johnson',
                'email': 'alex.johnson@example.com',
                'role': 'Interviewer',
                'status': 'Active',
                'last_active': '2025-03-14T11:45:00Z'
            },
            {
                'id': '4',
                'name': 'Michael Chen',
                'email': 'michael.chen@example.com',
                'role': 'Interviewer',
                'status': 'Active',
                'last_active': '2025-03-14T08:30:00Z'
            }
        ]
        write_csv(USERS_FILE, sample_users, USER_HEADERS)

if __name__ == '__main__':
    # Initialize CSV files before starting the server
    initialize_all_csv_files()
    
    # Start the Flask server
    app.run(debug=True, port=5000)
