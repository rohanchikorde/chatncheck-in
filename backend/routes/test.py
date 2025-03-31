from flask import Blueprint, jsonify

test_bp = Blueprint('test', __name__)

@test_bp.route('/demo-requests/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'status': 'success',
        'message': 'Backend API is working',
        'timestamp': '2025-03-31T12:31:18+05:30'
    })
