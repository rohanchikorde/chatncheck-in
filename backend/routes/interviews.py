from flask import Blueprint, request, jsonify
from services.interviews import create_interview, get_interviews, get_interview, update_interview, delete_interview

interview_blueprint = Blueprint('interview', __name__)

@interview_blueprint.route('/api/interviews', methods=['POST'])
def create_interview_endpoint():
    data = request.json
    response, status_code, message = create_interview(data)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_blueprint.route('/api/interviews', methods=['GET'])
def get_interviews_endpoint():
    response, status_code, message = get_interviews()
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_blueprint.route('/api/interviews/<int:interview_id>', methods=['GET'])
def get_interview_endpoint(interview_id: int):
    response, status_code, message = get_interview(interview_id)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_blueprint.route('/api/interviews/<int:interview_id>', methods=['PUT'])
def update_interview_endpoint(interview_id: int):
    data = request.json
    response, status_code, message = update_interview(interview_id, data)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code

@interview_blueprint.route('/api/interviews/<int:interview_id>', methods=['DELETE'])
def delete_interview_endpoint(interview_id: int):
    response, status_code, message = delete_interview(interview_id)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code
