from flask import Blueprint, request, jsonify
from services.demo_requests import create_demo_request, get_demo_requests
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

demo_requests_bp = Blueprint('demo_requests', __name__, url_prefix='/api/v1')

@demo_requests_bp.route('/demo-requests', methods=['POST', 'OPTIONS'])
def create_demo_request_route():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({
                'error': 'No JSON data provided',
                'status': 'error'
            }), 400

        logger.info("Received demo request data: %s", data)
        
        # Create demo request
        response, status_code, message = create_demo_request(data)
        
        # Prepare response
        result = {
            'data': response if response else None,
            'message': message,
            'success': status_code == 201
        }
        
        logger.info("Returning response: %s", result)
        return jsonify(result), status_code
        
    except Exception as e:
        logger.error("Error in demo request route: %s", str(e))
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@demo_requests_bp.route('/demo-requests', methods=['GET'])
def get_all_demo_requests():
    try:
        logger.info("Received GET request to /demo-requests")
        requests = get_demo_requests()
        logger.info("Response from service: %s", requests)
        
        return jsonify({
            'data': requests,
            'message': 'Demo requests retrieved successfully',
            'success': True
        }), 200
    except Exception as e:
        logger.error("Error getting demo requests: %s", str(e), exc_info=True)
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500
