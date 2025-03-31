from flask import current_app
from supabase import create_client
from typing import Optional, List, Dict
from backend.config import config
import logging

logger = logging.getLogger(__name__)

def authenticate_user(email: str, password: str):
    try:
        # Initialize Supabase client
        supabase = create_client(
            current_app.config['SUPABASE_URL'],
            current_app.config['SUPABASE_KEY']
        )

        # First, authenticate with Supabase auth
        auth_response = supabase.auth.sign_in_with_password({
            'email': email,
            'password': password
        })

        if not auth_response.user:
            logger.info(f"Authentication failed for {email}: No user returned")
            return None

        # Get user details from both auth.users and our users table
        auth_user = supabase.table('auth.users').select('*')\
            .eq('email', email)\
            .single()\
            .execute()

        if not auth_user.data:
            logger.info(f"No user found in auth.users table for {email}")
            return None

        # Get role and additional info from our users table
        user_response = supabase.table('users').select('*')\
            .eq('email', email)\
            .single()\
            .execute()

        if not user_response.data:
            logger.info(f"No user found in users table for {email}")
            return None

        return {
            'id': user_response.data.get('id'),
            'email': user_response.data.get('email'),
            'name': user_response.data.get('name'),
            'role': user_response.data.get('role'),
            'token': auth_response.session.access_token
        }

    except Exception as e:
        logger.error(f"Error authenticating user: {str(e)}")
        return None

def get_users() -> Optional[List[Dict]]:
    """
    Retrieve all users from the Supabase database.
    
    Returns:
        List[Dict]: List of user dictionaries containing user information
        None: If there was an error retrieving users
    """
    try:
        supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
        
        # First get users from auth.users table
        auth_users = supabase.table('auth.users')
        auth_users_response = auth_users.select('*').execute()
        
        # Then get users from our custom users table
        users_table = supabase.table('users')
        users_response = users_table.select('*').execute()
        
        if not auth_users_response.data or not users_response.data:
            return None
            
        # Combine the data from both tables
        users = []
        for auth_user in auth_users_response.data:
            user_data = {
                'id': auth_user.get('id'),
                'email': auth_user.get('email'),
                'created_at': auth_user.get('created_at'),
                'role': None,  # Will be updated if found in users table
                'name': None   # Will be updated if found in users table
            }
            
            # Find matching user in our users table
            matching_user = next((u for u in users_response.data if u.get('id') == auth_user.get('id')), None)
            if matching_user:
                user_data['role'] = matching_user.get('role')
                user_data['name'] = matching_user.get('name')
            
            users.append(user_data)
            
        return users
        
    except Exception as e:
        print(f"Error retrieving users: {str(e)}")
        return None
