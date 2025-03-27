from flask import Blueprint, request, jsonify
from services.auth import AuthService
from utils.validators import validate_registration_data, validate_email

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate registration data
        is_valid, errors = validate_registration_data(data)
        if not is_valid:
            return jsonify({
                'success': False,
                'errors': errors,
                'message': 'Please fix the following errors:'
            }), 400
        
        # Register user
        user = auth_service.register_user(
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone'),
            role=data.get('role', 'client_coordinator')
        )
        
        if user:
            return jsonify({
                'success': True,
                'user': user,
                'message': 'Registration successful'
            }), 201
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to create user account'
            }), 500
            
    except Exception as e:
        error_message = str(e)
        return jsonify({
            'success': False,
            'message': 'Registration failed',
            'error': error_message
        }), 400

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['email', 'password']):
            return jsonify({
                'success': False,
                'message': 'Missing required fields',
                'errors': {
                    'email': 'Email is required',
                    'password': 'Password is required'
                }
            }), 400
        
        # Validate email format
        is_valid, error = validate_email(data['email'])
        if not is_valid:
            return jsonify({
                'success': False,
                'message': 'Invalid email format',
                'errors': {'email': error}
            }), 400
        
        # Login user
        auth_data = auth_service.login_user(
            email=data['email'],
            password=data['password']
        )
        
        if auth_data:
            return jsonify({
                'success': True,
                'user': auth_data['user'],
                'token': auth_data['token'],
                'message': 'Login successful'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401
            
    except Exception as e:
        error_message = str(e)
        return jsonify({
            'success': False,
            'message': 'Login failed',
            'error': error_message
        }), 401

@auth_bp.route('/api/auth/me', methods=['GET'])
def get_current_user():
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                'success': False,
                'message': 'No token provided'
            }), 401
        
        token = auth_header.split(' ')[1]
        user = auth_service.get_current_user(token)
        
        if user:
            return jsonify({
                'success': True,
                'user': user,
                'message': 'User retrieved successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 401
            
    except Exception as e:
        error_message = str(e)
        return jsonify({
            'success': False,
            'message': 'Failed to get user',
            'error': error_message
        }), 401

@auth_bp.route('/api/auth/logout', methods=['POST'])
def logout():
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                'success': True,
                'message': 'Already logged out'
            }), 200
        
        token = auth_header.split(' ')[1]
        auth_service.logout_user(token)
        
        return jsonify({
            'success': True,
            'message': 'Successfully logged out'
        }), 200
        
    except Exception as e:
        error_message = str(e)
        return jsonify({
            'success': False,
            'message': 'Logout failed',
            'error': error_message
        }), 400
