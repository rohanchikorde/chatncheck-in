from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.auth import authenticate_user
from utils.validators import validate_email

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['email', 'password']):
            return jsonify({'error': 'Missing required fields'}), 400

        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400

        # Authenticate user
        user = authenticate_user(data['email'], data['password'])
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401

        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'name': user['name'],
                'role': user['role']
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
