from functools import wraps
from flask import request, jsonify
from utils.jwt_handler import verify_jwt_token
from services.auth import AuthService

auth_service = AuthService()

def require_auth(f):
    """Decorator to protect routes that require authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'error': 'No authorization header'}), 401
        
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Invalid authorization header format'}), 401
        
        token = auth_header.split(' ')[1]
        
        try:
            # Verify token and get user
            payload = verify_jwt_token(token)
            user = auth_service.get_current_user(token)
            
            # Add user to request context
            request.user = user
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': str(e)}), 401
    
    return decorated
