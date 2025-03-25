import logging
from utils.supabase import supabase_request
from utils.jwt_handler import create_jwt_token, verify_jwt_token
from werkzeug.security import generate_password_hash, check_password_hash
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AuthService:
    def __init__(self):
        self.table_name = 'users'  # Table name without schema
    
    def register_user(self, email: str, password: str, first_name: str, last_name: str, phone: str = None, role: str = 'client_coordinator') -> dict:
        """Register a new user"""
        try:
            logger.info(f"Attempting to register user with email: {email}")
            
            # Check if user already exists
            existing_user = self._get_user_by_email(email)
            if existing_user:
                logger.warning(f"User with email {email} already exists")
                raise ValueError('User with this email already exists')
            
            # Hash password
            hashed_password = generate_password_hash(password)
            
            # Create user in Supabase
            user_data = {
                'email': email,
                'password_hash': hashed_password,  
                'first_name': first_name,  
                'last_name': last_name,    
                'phone': phone,            
                'role': role               
            }
            
            logger.info("Making request to Supabase to create user")
            response = supabase_request(
                'users',  
                method='POST',
                data=user_data
            )
            
            logger.info(f"Supabase response: {response}")
            
            if isinstance(response, dict) and 'error' in response:
                logger.error(f"Error from Supabase: {response['error']}")
                raise ValueError(response['error'])
            
            return response
            
        except Exception as e:
            logger.error(f"Error in register_user: {str(e)}")
            raise ValueError(str(e))
    
    def login_user(self, email: str, password: str) -> dict:
        """Authenticate a user and return JWT token"""
        logger.info(f"Attempting to login user with email: {email}")
        user = self._get_user_by_email(email)
        if not user or not check_password_hash(user['password_hash'], password):
            logger.warning(f"Invalid email or password for user with email {email}")
            raise ValueError('Invalid email or password')
        
        # Create JWT token
        logger.info("Creating JWT token")
        token = create_jwt_token({'user_id': user['id'], 'email': user['email']})
        
        # Remove password from response
        user.pop('password_hash')
        return {
            'token': token,
            'user': user
        }
    
    def get_current_user(self, token: str) -> dict:
        """Get current user from JWT token"""
        try:
            logger.info("Verifying JWT token")
            payload = verify_jwt_token(token)
            logger.info("Getting user by ID")
            user = self._get_user_by_id(payload['user_id'])
            if not user:
                logger.warning(f"User not found with ID {payload['user_id']}")
                raise ValueError('User not found')
            
            # Remove password from response
            user.pop('password_hash')
            return user
        except Exception as e:
            logger.error(f"Error in get_current_user: {str(e)}")
            raise ValueError('Invalid token')
    
    def logout_user(self, token: str) -> None:
        """Logout user (can be extended to handle token blacklisting)"""
        try:
            logger.info("Verifying JWT token")
            verify_jwt_token(token)
            # In a more complex implementation, you might want to:
            # 1. Add the token to a blacklist
            # 2. Clear any session data
            # 3. Handle refresh tokens
            return True
        except:
            logger.error("Invalid token")
            raise ValueError('Invalid token')
    
    def _get_user_by_email(self, email: str) -> dict:
        """Helper method to get user by email"""
        logger.info(f"Getting user by email: {email}")
        response = supabase_request(
            'users',  
            method='GET',
            query={'email': f'eq.{email}'})
        
        return response[0] if response and len(response) > 0 else None
        
    def _get_user_by_id(self, user_id: str) -> dict:
        """Helper method to get user by ID"""
        logger.info(f"Getting user by ID: {user_id}")
        response = supabase_request(
            f'users?id=eq.{user_id}',  
            method='GET'
        )
        
        return response[0] if response and len(response) > 0 else None
