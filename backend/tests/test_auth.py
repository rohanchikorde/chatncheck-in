import json
import unittest
from unittest.mock import patch, MagicMock
from flask import Flask

# Add the project root to Python path
import sys
import os
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from backend.services.auth import authenticate_user, get_users
from backend.config import config

class TestAuth(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['SUPABASE_URL'] = config.SUPABASE_URL
        self.app.config['SUPABASE_KEY'] = config.SUPABASE_KEY
        self.client = self.app.test_client()

    @patch('backend.services.auth.create_client')
    def test_valid_admin_login(self, mock_create_client):
        # Load test user data
        with open(os.path.join(project_root, 'backend', 'tests', 'data', 'test_users.json'), 'r', encoding='utf-8') as f:
            test_users = json.load(f)
            admin_user = test_users['admin']

        # Mock Supabase responses
        mock_supabase = MagicMock()
        mock_auth = MagicMock()
        mock_auth.sign_in_with_password.return_value = MagicMock(
            user={'id': '1', 'email': admin_user['email']},
            session=MagicMock(access_token='test-token')
        )
        mock_supabase.auth = mock_auth
        
        mock_table = MagicMock()
        mock_response = MagicMock()
        mock_response.data = {
            'id': '1',
            'email': admin_user['email'],
            'role': admin_user['role'],
            'name': admin_user['name']
        }
        mock_table.select.return_value.eq.return_value.single.return_value.execute.return_value = mock_response
        mock_supabase.table.return_value = mock_table
        
        mock_create_client.return_value = mock_supabase

        # Test login
        with self.app.app_context():
            result = authenticate_user(admin_user['email'], admin_user['password'])
            print(f"\nAdmin login result: {result}")
            self.assertIsNotNone(result, "Authentication result should not be None")
            self.assertEqual(result['email'], admin_user['email'], "Email should match")
            self.assertEqual(result['role'], 'admin', "Role should be admin")
            self.assertIn('token', result, "Token should be present")
            print("\nAdmin login successful!")

    @patch('backend.services.auth.create_client')
    def test_valid_frontend_login(self, mock_create_client):
        # Load test user data
        with open(os.path.join(project_root, 'backend', 'tests', 'data', 'test_users.json'), 'r', encoding='utf-8') as f:
            test_users = json.load(f)
            frontend_user = test_users['frontend']

        # Mock Supabase responses
        mock_supabase = MagicMock()
        mock_auth = MagicMock()
        mock_auth.sign_in_with_password.return_value = MagicMock(
            user={'id': '2', 'email': frontend_user['email']},
            session=MagicMock(access_token='frontend-token')
        )
        mock_supabase.auth = mock_auth
        
        mock_table = MagicMock()
        mock_response = MagicMock()
        mock_response.data = {
            'id': '2',
            'email': frontend_user['email'],
            'role': frontend_user['role'],
            'name': frontend_user['name']
        }
        mock_table.select.return_value.eq.return_value.single.return_value.execute.return_value = mock_response
        mock_supabase.table.return_value = mock_table
        
        mock_create_client.return_value = mock_supabase

        # Test login
        with self.app.app_context():
            result = authenticate_user(frontend_user['email'], frontend_user['password'])
            print(f"\nFrontend login result: {result}")
            self.assertIsNotNone(result, "Authentication result should not be None")
            self.assertEqual(result['email'], frontend_user['email'], "Email should match")
            self.assertEqual(result['role'], 'frontend', "Role should be frontend")
            self.assertIn('token', result, "Token should be present")
            print("\nFrontend login successful!")

    @patch('backend.services.auth.create_client')
    def test_invalid_credentials(self, mock_create_client):
        # Load test user data
        with open(os.path.join(project_root, 'backend', 'tests', 'data', 'test_users.json'), 'r', encoding='utf-8') as f:
            test_users = json.load(f)
            invalid_user = test_users['invalid']

        # Mock Supabase responses
        mock_supabase = MagicMock()
        mock_auth = MagicMock()
        mock_auth.sign_in_with_password.return_value = MagicMock(user=None)
        mock_supabase.auth = mock_auth
        
        mock_create_client.return_value = mock_supabase

        # Test login
        with self.app.app_context():
            result = authenticate_user(invalid_user['email'], invalid_user['password'])
            print(f"\nInvalid credentials result: {result}")
            self.assertIsNone(result, "Authentication should fail for invalid credentials")
            print("\nInvalid credentials test successful!")

    @patch('backend.services.auth.create_client')
    def test_user_not_in_users_table(self, mock_create_client):
        # Load test user data
        with open(os.path.join(project_root, 'backend', 'tests', 'data', 'test_users.json'), 'r', encoding='utf-8') as f:
            test_users = json.load(f)
            admin_user = test_users['admin']

        # Mock Supabase responses
        mock_supabase = MagicMock()
        mock_auth = MagicMock()
        mock_auth.sign_in_with_password.return_value = MagicMock(
            user={'id': '1', 'email': admin_user['email']},
            session=MagicMock(access_token='test-token')
        )
        mock_supabase.auth = mock_auth
        
        # Mock auth.users table (exists)
        mock_auth_table = MagicMock()
        mock_auth_response = MagicMock()
        mock_auth_response.data = {
            'id': '1',
            'email': admin_user['email']
        }
        mock_auth_table.select.return_value.eq.return_value.single.return_value.execute.return_value = mock_auth_response
        
        # Mock users table (does not exist)
        mock_users_table = MagicMock()
        mock_users_response = MagicMock()
        mock_users_response.data = None
        mock_users_table.select.return_value.eq.return_value.single.return_value.execute.return_value = mock_users_response
        
        mock_supabase.table.side_effect = [
            mock_auth_table,  # First call for auth.users
            mock_users_table  # Second call for users table
        ]
        
        mock_create_client.return_value = mock_supabase

        # Test login
        with self.app.app_context():
            result = authenticate_user(admin_user['email'], admin_user['password'])
            print(f"\nUser not in users table result: {result}")
            self.assertIsNone(result, "Authentication should fail if user not in users table")
            print("\nUser not in users table test successful!")

    @patch('backend.services.auth.create_client')
    def test_get_users_success(self, mock_create_client):
        print("\nTesting get_users_success...")
        # Mock Supabase responses
        mock_supabase = MagicMock()
        
        # Mock auth.users table
        mock_auth_table = MagicMock()
        mock_auth_response = MagicMock()
        mock_auth_response.data = [
            {
                'id': '1',
                'email': 'admin@example.com',
                'created_at': '2024-03-31T15:11:57+00:00'
            },
            {
                'id': '2',
                'email': 'frontend@example.com',
                'created_at': '2024-03-31T15:11:58+00:00'
            }
        ]
        mock_auth_table.select.return_value.execute.return_value = mock_auth_response
        
        # Mock users table
        mock_users_table = MagicMock()
        mock_users_response = MagicMock()
        mock_users_response.data = [
            {
                'id': '1',
                'role': 'admin',
                'name': 'Admin User'
            },
            {
                'id': '2',
                'role': 'frontend',
                'name': 'Frontend User'
            }
        ]
        mock_users_table.select.return_value.execute.return_value = mock_users_response
        
        mock_supabase.table.side_effect = [mock_auth_table, mock_users_table]
        mock_create_client.return_value = mock_supabase

        # Test getting users
        with self.app.app_context():
            result = get_users()
            print("\nUsers retrieved:")
            for user in result:
                print(f"- {user['email']}: {user['role']} ({user['name']})")
            
            self.assertIsNotNone(result, "Users should not be None")
            self.assertEqual(len(result), 2, "Should return 2 users")
            
            # Verify admin user data
            admin_user = next((u for u in result if u['email'] == 'admin@example.com'), None)
            self.assertIsNotNone(admin_user, "Admin user should exist")
            self.assertEqual(admin_user['role'], 'admin', "Admin role should be correct")
            self.assertEqual(admin_user['name'], 'Admin User', "Admin name should be correct")
            
            # Verify frontend user data
            frontend_user = next((u for u in result if u['email'] == 'frontend@example.com'), None)
            self.assertIsNotNone(frontend_user, "Frontend user should exist")
            self.assertEqual(frontend_user['role'], 'frontend', "Frontend role should be correct")
            self.assertEqual(frontend_user['name'], 'Frontend User', "Frontend name should be correct")
            print("\nGet users success test successful!")

    @patch('backend.services.auth.create_client')
    def test_get_users_no_users(self, mock_create_client):
        print("\nTesting get_users_no_users...")
        # Mock Supabase responses
        mock_supabase = MagicMock()
        
        # Mock auth.users table (empty)
        mock_auth_table = MagicMock()
        mock_auth_response = MagicMock()
        mock_auth_response.data = []
        mock_auth_table.select.return_value.execute.return_value = mock_auth_response
        
        # Mock users table (empty)
        mock_users_table = MagicMock()
        mock_users_response = MagicMock()
        mock_users_response.data = []
        mock_users_table.select.return_value.execute.return_value = mock_users_response
        
        mock_supabase.table.side_effect = [mock_auth_table, mock_users_table]
        mock_create_client.return_value = mock_supabase

        # Test getting users
        with self.app.app_context():
            result = get_users()
            print(f"\nResult for no users case: {result}")
            self.assertIsNone(result, "Should return None when no users exist")
            print("\nGet users no users test successful!")

    @patch('backend.services.auth.create_client')
    def test_get_users_error(self, mock_create_client):
        print("\nTesting get_users_error...")
        # Mock Supabase connection error
        mock_create_client.side_effect = Exception("Failed to connect to Supabase")

        # Test getting users
        with self.app.app_context():
            result = get_users()
            print(f"\nResult for error case: {result}")
            self.assertIsNone(result, "Should return None when there's an error")
            print("\nGet users error test successful!")

if __name__ == '__main__':
    unittest.main()
