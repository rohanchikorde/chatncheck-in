import unittest
import sys
import os
import json
from werkzeug.security import check_password_hash

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from backend.services.auth import AuthService
from backend.utils.supabase import supabase_request

class TestAuthService(unittest.TestCase):
    def setUp(self):
        self.auth_service = AuthService()
        self.test_user = {
            'email': 'testuser@example.com',
            'password': 'TestPass123!',
            'first_name': 'Test',
            'last_name': 'User',
            'phone': '+1234567890',
            'role': 'client_coordinator'
        }

    def tearDown(self):
        # Clean up test user if it exists
        try:
            user = self.auth_service._get_user_by_email(self.test_user['email'])
            if user:
                response = supabase_request(
                    f'users?id=eq.{user["id"]}',
                    method='DELETE'
                )
        except:
            pass

    def test_register_user(self):
        """Test user registration"""
        try:
            result = self.auth_service.register_user(
                self.test_user['email'],
                self.test_user['password'],
                self.test_user['first_name'],
                self.test_user['last_name'],
                self.test_user['phone'],
                self.test_user['role']
            )
            
            self.assertIsInstance(result, dict)
            self.assertIn('id', result)
            self.assertEqual(result['email'], self.test_user['email'])
            self.assertEqual(result['first_name'], self.test_user['first_name'])
            self.assertEqual(result['last_name'], self.test_user['last_name'])
            
            # Verify user exists in database
            user = self.auth_service._get_user_by_email(self.test_user['email'])
            self.assertIsNotNone(user)
            self.assertTrue(check_password_hash(user['password_hash'], self.test_user['password']))
            
        except Exception as e:
            self.fail(f"Registration failed: {str(e)}")

    def test_register_user_duplicate(self):
        """Test registration with existing email"""
        # First register the user
        self.auth_service.register_user(
            self.test_user['email'],
            self.test_user['password'],
            self.test_user['first_name'],
            self.test_user['last_name'],
            self.test_user['phone'],
            self.test_user['role']
        )
        
        # Try to register again
        with self.assertRaises(ValueError) as context:
            self.auth_service.register_user(
                self.test_user['email'],
                self.test_user['password'],
                self.test_user['first_name'],
                self.test_user['last_name'],
                self.test_user['phone'],
                self.test_user['role']
            )
        
        self.assertEqual(str(context.exception), 'User with this email already exists')

    def test_login_user(self):
        """Test user login"""
        # First register the user
        self.auth_service.register_user(
            self.test_user['email'],
            self.test_user['password'],
            self.test_user['first_name'],
            self.test_user['last_name'],
            self.test_user['phone'],
            self.test_user['role']
        )
        
        # Try to login
        result = self.auth_service.login_user(
            self.test_user['email'],
            self.test_user['password']
        )
        
        self.assertIsInstance(result, dict)
        self.assertIn('token', result)
        self.assertIn('user', result)
        self.assertEqual(result['user']['email'], self.test_user['email'])
        
        # Verify token
        try:
            user = self.auth_service.get_current_user(result['token'])
            self.assertIsNotNone(user)
            self.assertEqual(user['email'], self.test_user['email'])
        except Exception as e:
            self.fail(f"Token verification failed: {str(e)}")

    def test_login_user_invalid_credentials(self):
        """Test login with invalid credentials"""
        # First register the user
        self.auth_service.register_user(
            self.test_user['email'],
            self.test_user['password'],
            self.test_user['first_name'],
            self.test_user['last_name'],
            self.test_user['phone'],
            self.test_user['role']
        )
        
        # Try to login with wrong password
        with self.assertRaises(ValueError) as context:
            self.auth_service.login_user(
                self.test_user['email'],
                'wrongpassword'
            )
        
        self.assertEqual(str(context.exception), 'Invalid email or password')

    def test_get_current_user(self):
        """Test getting current user from token"""
        # First register and login the user
        self.auth_service.register_user(
            self.test_user['email'],
            self.test_user['password'],
            self.test_user['first_name'],
            self.test_user['last_name'],
            self.test_user['phone'],
            self.test_user['role']
        )
        
        login_result = self.auth_service.login_user(
            self.test_user['email'],
            self.test_user['password']
        )
        
        # Get current user
        user = self.auth_service.get_current_user(login_result['token'])
        
        self.assertIsInstance(user, dict)
        self.assertEqual(user['email'], self.test_user['email'])
        self.assertNotIn('password_hash', user)  # Ensure password is not returned

    def test_logout_user(self):
        """Test user logout"""
        # First register and login the user
        self.auth_service.register_user(
            self.test_user['email'],
            self.test_user['password'],
            self.test_user['first_name'],
            self.test_user['last_name'],
            self.test_user['phone'],
            self.test_user['role']
        )
        
        login_result = self.auth_service.login_user(
            self.test_user['email'],
            self.test_user['password']
        )
        
        # Logout
        try:
            self.auth_service.logout_user(login_result['token'])
        except Exception as e:
            self.fail(f"Logout failed: {str(e)}")

if __name__ == '__main__':
    unittest.main()
