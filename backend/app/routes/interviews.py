
from flask import Blueprint, request, jsonify, make_response
import logging
from app.controllers.interview_controller import (
    get_all_interviews,
    get_interview_by_id,
    create_interview,
    update_interview,
    delete_interview
)

# Set up logger
logger = logging.getLogger(__name__)

# Create Blueprint
bp = Blueprint('interviews', __name__, url_prefix='/api')

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
def create_interview_route():
    """Create a new interview"""
    try:
        # Check if this is a multipart form (with file upload)
        if request.content_type and 'multipart/form-data' in request.content_type:
            form_data = request.form
            resume_file = request.files.get('resume')
        else:
            form_data = request.json
            resume_file = None
        
        result, status_code = create_interview(form_data, resume_file)
        return jsonify(result), status_code
    
    except Exception as e:
        logger.error(f"Error in create_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for fetching all interviews
@bp.route('/interviews', methods=['GET'])
def get_interviews_route():
    """Get all interviews with optional filtering"""
    try:
        # Get query parameters
        status = request.args.get('status')
        interviewer = request.args.get('interviewer')
        date_start = request.args.get('date_start')
        date_end = request.args.get('date_end')
        
        result, status_code = get_all_interviews(status, interviewer, date_start, date_end)
        return jsonify(result), status_code
    
    except Exception as e:
        logger.error(f"Error in get_interviews_route: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for fetching a specific interview
@bp.route('/interviews/<id>', methods=['GET'])
def get_interview_route(id):
    """Get a specific interview by ID"""
    try:
        result, status_code = get_interview_by_id(id)
        return jsonify(result), status_code
    
    except Exception as e:
        logger.error(f"Error in get_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for updating an interview
@bp.route('/interviews/<id>', methods=['PUT'])
def update_interview_route(id):
    """Update an existing interview"""
    try:
        data = request.json
        result, status_code = update_interview(id, data)
        return jsonify(result), status_code
    
    except Exception as e:
        logger.error(f"Error in update_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# API endpoint for deleting an interview
@bp.route('/interviews/<id>', methods=['DELETE'])
def delete_interview_route(id):
    """Delete an interview by ID"""
    try:
        result, status_code = delete_interview(id)
        return jsonify(result), status_code
    
    except Exception as e:
        logger.error(f"Error in delete_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
