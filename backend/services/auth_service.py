from flask import current_app
from supabase import create_client

class AuthService:
    def __init__(self):
        self.supabase = create_client(
            current_app.config['SUPABASE_URL'],
            current_app.config['SUPABASE_KEY']
        )

    def login(self, email, password):
        try:
            # First, authenticate with Supabase auth
            response = self.supabase.auth.sign_in_with_password({
                'email': email,
                'password': password
            })

            if not response.user:
                return None, "Invalid credentials"

            # Get user details from the Users table
            user = self.supabase.table('Users').select('*')\
                .eq('email', email)\
                .single()\
                .execute()

            if not user.data:
                return None, "User not found in database"

            # Check if user is an admin
            if user.data.get('role') != 'admin':
                return None, "User is not an admin"

            return {
                'user_id': user.data.get('id'),
                'email': user.data.get('email'),
                'role': user.data.get('role'),
                'token': response.session.access_token
            }, None

        except Exception as e:
            return None, str(e)

# Initialize the service
auth_service = AuthService()
