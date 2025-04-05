from functools import wraps
from flask import request, jsonify
from config.config import supabase_client

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            print("In login_required decorator")
            print("Request Object:", request)
            auth_header = request.headers.get('Authorization')

            print("Authorization header:", auth_header)
            if not auth_header:
                return jsonify({'error': 'Authorization header is required'}), 401

            token = auth_header.replace('Bearer ', '').strip()
            print("Token:", token)
            print("2ooooooooooooooooooooooooooooooooo")
            user = supabase_client.auth.get_user(token)
            print("Hiitted api")

            

            print("User:", user)
            print("User user:", user.user)

            if not user.user:
                print("Invalid or expired token")
                return jsonify({'error': 'Invalid or expired token'}), 401

            # Add user to the request context
            request.user = user.user

            return f(*args, **kwargs)

        except Exception as e:
            return jsonify({'error': str(e)}), 401

    return decorated_function
