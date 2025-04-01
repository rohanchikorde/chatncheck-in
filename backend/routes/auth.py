from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.auth import authenticate_user
from utils.validators import validate_email
from supabase import create_client, Client
from datetime import datetime
import logging

# Initialize Supabase client
url = "https://pnhwhamhqslmqkvsfmth.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuaHdoYW1ocXNsbXFrdnNmbXRoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE3NzE5NywiZXhwIjoyMDU4NzUzMTk3fQ.SMQbrU3S-3yJD_xka7fPI801zCGeAQJCSIUhUdI2Meo"
supabase: Client = create_client(url, key)

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

@auth_bp.route('/register', methods=['POST'])
def register_user():

    print("In Register user API", request)
    data = request.get_json()

    print("Calling register user", data)
    logging.info(f'Received data: {data}')
    required_fields = ['email', 'password', 'full_name', 'phone_number', 'role']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400

    email = data['email']
    password = data['password']
    full_name = data['full_name']
    phone_number = data['phone_number']
    role = data['role']

    # Interact with Supabase to create the user
    try:
        print("Calling auth sign up", email, password)
        user = supabase.auth.sign_up({
            'email': email,
            'password': password
        })

        print("User created", user)

        # Insert additional user data into the users table
        supabase.table('users').insert({
            'email': email,
            'full_name': full_name,
            'phone_number': phone_number,
            'role': role,
            'created_at': datetime.utcnow().isoformat()
        }).execute()

        print("User added in users table", user)

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        print("Error in register_user", e)
        logging.error(f'Error during registration: {str(e)}')
        return jsonify({'error': str(e)}), 500
