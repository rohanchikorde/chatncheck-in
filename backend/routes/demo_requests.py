from flask import Blueprint, request, jsonify
from ..services.demo_requests import create_demo_request

demo_bp = Blueprint('demo', __name__)

@demo_bp.route('/api/demo-requests', methods=['POST'])
def create_demo():
    data = request.json
    response, status_code, message = create_demo_request(data)
    
    if status_code >= 400:
        return jsonify({
            'success': False,
            'error': message
        }), status_code
    
    return jsonify({
        'success': True,
        'message': message,
        'data': response
    }), status_code
