from flask import Blueprint, request, jsonify
from backend.services.demo_requests import create_demo_request, get_demo_requests
from backend.utils.supabase import supabase_request
import logging

logger = logging.getLogger(__name__)

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
        logger.exception("Internal server error")
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
        logger.exception("Internal server error")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500

@demo_bp.route('/api/demo-requests', methods=['DELETE'])
def delete_demo_requests_route():
    try:
        # Make request to Supabase to delete all demo requests
        response = supabase_request('demo_requests', method='DELETE')
        
        if response is None:
            return jsonify({
                'success': False,
                'message': 'Failed to delete demo requests',
                'data': None
            }), 500
            
        if response['status_code'] == 200:
            return jsonify({
                'success': True,
                'message': 'Demo requests deleted successfully',
                'data': None
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to delete demo requests',
                'data': None
            }), response['status_code']

    except Exception as e:
        logger.exception("Internal server error")
        return jsonify({
            'success': False,
            'message': f"Internal server error: {str(e)}",
            'data': None
        }), 500
