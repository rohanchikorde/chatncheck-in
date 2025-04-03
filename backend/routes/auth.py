from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.auth import authenticate_user
from utils.validators import validate_email
from supabase import create_client, Client
from datetime import datetime
import logging
import requests
from flask import request, jsonify
import requests


# Initialize Supabase client
url = "https://pnhwhamhqslmqkvsfmth.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuaHdoYW1ocXNsbXFrdnNmbXRoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE3NzE5NywiZXhwIjoyMDU4NzUzMTk3fQ.SMQbrU3S-3yJD_xka7fPI801zCGeAQJCSIUhUdI2Meo"
supabase: Client = create_client(url, key)

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        print("In Login API")
        print("Request Object:", request)
        
        # Get JSON data from the request
        data = request.get_json()
        print("In Login API - data:", data)

        # Validate required fields
        if not data or not all(key in data for key in ['email', 'password']):
            return jsonify({'error': 'Email and password are required.'}), 400

        email = data['email']
        password = data['password']

        print("In Login API - email:", email)
        print("In Login API - password:", password)

        # Using Supabase's built-in auth method (recommended approach)
        try:
            # Sign in with Supabase auth
            auth_response = supabase.auth.sign_in_with_password({
                'email': email,
                'password': password
            })
            
            # Extract user and session data
            user = auth_response.user
            session = auth_response.session

            print("Supabase Auth Response:", auth_response)

            return jsonify({
                'message': 'Login successful',
                'access_token': session.access_token,
                'refresh_token': session.refresh_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'created_at': user.created_at
                }
            }), 200

        except Exception as auth_error:
            print("Authentication error:", str(auth_error))
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        print("Exception occurred:", str(e))
        return jsonify({'error': 'Internal server error'}), 500
    try:
        print("In Login API")
        print("Request Object:", request)
        
        # Get JSON data from the request
        data = request.get_json()

        print("In Login API - data:", data)

        # Validate required fields
        if not all(key in data for key in ['email', 'password']):
            return jsonify({'error': 'Email and password are required.'}), 400

        email = data['email']
        password = data['password']

        print("In Login API - email:", email)
        print("In Login API - password:", password)

        # Prepare the payload for Supabase Auth
        payload = {
            "grant_type": "password",  # Explicitly set to "password"
            "email": email,
            "password": password
        }

        # Set headers for the request
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "apikey": key  # Supabase also accepts the key in the apikey header
        }

        print("Making POST request to Supabase with payload:", payload)
        print("Headers:", headers)

        print("1ooooooooooooooooooooooooooooooooo")


        data = supabase.auth.sign_in_with_password({
        'email': email,
        'password': password,
        })

        print("2ooooooooooooooooooooooooooooooooo")

        print("Supabase Response:", data)
        print("Supabase Response Status Code:", data.status)

        # Make POST request to Supabase /auth/v1/token
        response = requests.post(
            f"{url}/auth/v1/token",
            headers=headers,
            data=payload
        )



        print("=======================")
        print("URL:", f"{url}/auth/v1/token")
        print("Payload: ", payload)
        print("Headers: ", headers)

        print("=======================")

        print("Supabase Response:", response)

        print("Supabase Response Status Code:", response.status_code)
        print("Supabase Response Content:", response.text)

        # Check if the request was successful
        if response.status_code == 200:
            token_data = response.json()
            # Return the access token and user data
            return jsonify({
                'message': 'Login successful',
                'access_token': token_data.get('access_token'),
                'refresh_token': token_data.get('refresh_token'),
                'user': token_data.get('user')  # Supabase may return user info
            }), 200
        else:
            # Handle authentication failure
            error_data = response.json()
            error_msg = error_data.get('msg', 'Invalid credentials')
            return jsonify({'error': error_msg}), response.status_code

    except Exception as e:
        print("Exception occurred:", str(e))
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
