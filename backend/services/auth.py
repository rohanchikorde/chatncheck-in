from utils.supabase import supabase_request
import logging

logger = logging.getLogger(__name__)

def authenticate_user(email: str, password: str):
    try:
        # Query Supabase for user with matching email
        response = supabase_request(
            endpoint='/rest/v1/users',
            method='GET',
            params={
                'email': email
            }
        )
        
        if not response.get('data'):
            return None
            
        users = response['data']
        if not users:
            return None

        user = users[0]
        
        # TODO: Implement actual password verification
        # For now, we'll just check if the user exists
        if user:
            return {
                'id': user['id'],
                'email': user['email'],
                'name': user.get('name', ''),
                'role': user.get('role', 'interviewee')
            }
        
        return None
        
    except Exception as e:
        logger.error(f"Error authenticating user: {str(e)}")
        return None
