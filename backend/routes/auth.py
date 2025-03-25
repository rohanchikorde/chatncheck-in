from flask import Blueprint, request, jsonify
from services.auth import AuthService
from utils.validators import validate_email

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    print("Register endpoint called")
    data = request.get_json()
    
    print("Received data:", data) 
    
    # Validate input
    required_fields = ['email', 'password', 'first_name', 'last_name']
    if not all(key in data for key in required_fields):
        print("Missing required fields")
        return jsonify({'error': 'Missing required fields'}), 400
    
    is_valid_email, error_msg = validate_email(data['email'])
    if not is_valid_email:
        print("Invalid email format")
        return jsonify({'error': error_msg}), 400
    
    try:
        user = auth_service.register_user(
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone'),  # Optional
            role=data.get('role', 'client_coordinator')  # Default role
        )
        print("User registered successfully", user)
        return jsonify(user), 201
    except Exception as e:
        print("Error registering user", str(e))
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not all(key in data for key in ['email', 'password']):
        return jsonify({'error': 'Missing email or password'}), 400
    
    try:
        auth_data = auth_service.login_user(
            email=data['email'],
            password=data['password']
        )
        return jsonify(auth_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401

@auth_bp.route('/api/auth/me', methods=['GET'])
def get_current_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'No token provided'}), 401
    
    token = auth_header.split(' ')[1]
    try:
        user = auth_service.get_current_user(token)
        return jsonify(user), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401

@auth_bp.route('/api/auth/logout', methods=['POST'])
def logout():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Already logged out'}), 200
    
    token = auth_header.split(' ')[1]
    try:
        auth_service.logout_user(token)
        return jsonify({'message': 'Successfully logged out'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
