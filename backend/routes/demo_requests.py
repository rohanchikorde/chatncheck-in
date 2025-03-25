from flask import Blueprint, request, jsonify
from backend.services.demo_requests import create_demo_request

demo_bp = Blueprint('demo', __name__)

@demo_bp.route('/api/demo-requests', methods=['POST'])
def create_demo_request_route():
    data = request.json
    response, status_code, message = create_demo_request(data)
    return jsonify({
        'success': status_code < 400,
        'message': message,
        'data': response
    }), status_code
