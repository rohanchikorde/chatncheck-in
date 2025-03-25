from flask import Blueprint, request, jsonify
from backend.services.interviews import create_interview, get_interviews, get_interview, update_interview, delete_interview

interview_bp = Blueprint('interview', __name__)

@interview_bp.route('/api/interviews', methods=['POST'])
def create_interview_route():
    data = request.json
    response, status_code, message = create_interview(data)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_bp.route('/api/interviews', methods=['GET'])
def get_interviews_route():
    response, status_code, message = get_interviews()
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_bp.route('/api/interviews/<interview_id>', methods=['GET'])
def get_interview_route(interview_id):
    response, status_code, message = get_interview(interview_id)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_bp.route('/api/interviews/<interview_id>', methods=['PUT'])
def update_interview_route(interview_id):
    data = request.json
    response, status_code, message = update_interview(interview_id, data)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_bp.route('/api/interviews/<interview_id>', methods=['DELETE'])
def delete_interview_route(interview_id):
    response, status_code, message = delete_interview(interview_id)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code
