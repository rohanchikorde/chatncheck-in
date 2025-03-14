
from flask import Flask, request, jsonify, make_response
import csv
import os
import json
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CSV_FILE = 'interviews.csv'
CSV_HEADERS = ['id', 'candidate_name', 'interviewer_name', 'scheduled_at', 'status', 'feedback_submitted', 'job_role', 'format', 'duration']

# Helper function to read CSV file
def read_csv():
    if not os.path.exists(CSV_FILE):
        return []
    
    try:
        with open(CSV_FILE, 'r', newline='') as file:
            reader = csv.DictReader(file)
            return list(reader)
    except Exception as e:
        app.logger.error(f"Error reading CSV file: {str(e)}")
        raise Exception("CSV error, check file")

# Helper function to write to CSV file
def write_csv(data):
    try:
        with open(CSV_FILE, 'w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=CSV_HEADERS)
            writer.writeheader()
            writer.writerows(data)
    except Exception as e:
        app.logger.error(f"Error writing to CSV file: {str(e)}")
        raise Exception("CSV error, check file")

# Validate ISO date format
def validate_date(date_string):
    try:
        datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return True
    except ValueError:
        return False

# GET /interviews - Fetch all interviews with optional filtering
@app.route('/interviews', methods=['GET'])
def get_interviews():
    try:
        interviews = read_csv()
        
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
        
        interviews = read_csv()
        
        # Find the interview to update
        for interview in interviews:
            if interview['id'] == id:
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
                
                write_csv(interviews)
                return jsonify(interview)
        
        return make_response(jsonify({"error": "Interview not found"}), 404)
    
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)

# DELETE /interviews/<id> - Delete an interview
@app.route('/interviews/<id>', methods=['DELETE'])
def delete_interview(id):
    try:
        interviews = read_csv()
        
        # Find and remove the interview
        initial_length = len(interviews)
        interviews = [i for i in interviews if i['id'] != id]
        
        if len(interviews) == initial_length:
            return make_response(jsonify({"error": "Interview not found"}), 404)
        
        write_csv(interviews)
        return jsonify({"message": "Interview deleted"})
    
    except Exception as e:
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
        
        interviews = read_csv()
        
        # Generate new ID (simple auto-increment)
        new_id = "1"
        if interviews:
            # Find the highest ID and increment
            max_id = max([int(i.get('id', 0)) for i in interviews])
            new_id = str(max_id + 1)
        
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
        write_csv(interviews)
        
        return jsonify(new_interview), 201
    
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)

# Initialize the CSV file if it doesn't exist
def initialize_csv():
    if not os.path.exists(CSV_FILE):
        # Create empty CSV with headers
        write_csv([])
        print(f"Initialized {CSV_FILE} with headers")

if __name__ == '__main__':
    initialize_csv()
    app.run(debug=True, port=5000)
