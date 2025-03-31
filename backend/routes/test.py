
from flask import Blueprint, jsonify

test_bp = Blueprint('test', __name__)

@test_bp.route('/demo-requests/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'status': 'success',
        'message': 'Backend API is working',
        'timestamp': '2025-03-31T12:31:18+05:30'
    })

@test_bp.route('/companies/test', methods=['GET'])
def test_companies_endpoint():
    return jsonify({
        'status': 'success',
        'message': 'Company API is working',
        'company': {
            'id': '1',
            'name': 'HireSync Solutions',
            'industry': 'Tech Recruitment',
            'size': 'Mid-sized (200 employees)',
            'created_at': '2023-05-10T09:00:00Z'
        },
        'stats': {
            'total_interviews': 28,
            'pending_interviews': 12,
            'completed_interviews': 16,
            'active_team_members': 8,
            'pending_demos': 3
        }
    })
