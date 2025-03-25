from flask import Blueprint, request, jsonify
from backend.services.demo_requests import create_demo_request, get_demo_requests

demo_bp = Blueprint('demo', __name__)

@demo_bp.route('/api/demo-requests', methods=['POST'])
def create_demo_request_route():
    try:
        data = request.json
        response, status_code, message = create_demo_request(data)
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500

@demo_bp.route('/api/demo-requests', methods=['GET'])
def get_demo_requests_route():
    try:
        response, status_code, message = get_demo_requests()
        return jsonify({
            'success': status_code < 400,
            'message': message,
            'data': response
        }), status_code
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500
