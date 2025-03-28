
from flask import Blueprint, request, jsonify
from services.interviews import create_interview, get_interviews, get_interview, update_interview, delete_interview
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

interview_bp = Blueprint('interview', __name__)

@interview_bp.route('/api/interviews', methods=['POST'])
def create_interview_route():
    try:
        data = request.json
        logger.info(f"Received interview creation data: {data}")
        response, status_code, message = create_interview(data)
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        logger.error(f"Error in create_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500

@interview_bp.route('/api/interviews', methods=['GET'])
def get_interviews_route():
    try:
        logger.info("Getting all interviews")
        response, status_code, message = get_interviews()
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        logger.error(f"Error in get_interviews_route: {str(e)}")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500

@interview_bp.route('/api/interviews/<interview_id>', methods=['GET'])
def get_interview_route(interview_id):
    try:
        logger.info(f"Getting interview with ID: {interview_id}")
        response, status_code, message = get_interview(interview_id)
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        logger.error(f"Error in get_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500

@interview_bp.route('/api/interviews/<interview_id>', methods=['PUT'])
def update_interview_route(interview_id):
    try:
        data = request.json
        logger.info(f"Updating interview {interview_id} with data: {data}")
        response, status_code, message = update_interview(interview_id, data)
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        logger.error(f"Error in update_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500

@interview_bp.route('/api/interviews/<interview_id>', methods=['DELETE'])
def delete_interview_route(interview_id):
    try:
        logger.info(f"Deleting interview with ID: {interview_id}")
        response, status_code, message = delete_interview(interview_id)
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        logger.error(f"Error in delete_interview_route: {str(e)}")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500
