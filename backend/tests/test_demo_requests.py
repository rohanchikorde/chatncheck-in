import unittest
import sys
import os
import requests

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from backend.services.demo_requests import create_demo_request, get_demo_requests
from backend.utils.supabase import supabase_request

class TestDemoRequests(unittest.TestCase):
    def setUp(self):
        self.test_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'work_email': 'john.doe@example.com',
            'phone_number': '+1234567890',
            'service_interest': 'Job Interview',
            'message': 'I am interested in your job interview services'
        }

    def test_create_demo_request(self):
        """Test creating a demo request"""
        result, status_code, message = create_demo_request(self.test_data)
        
        # Check if request was successful
        self.assertEqual(status_code, 201)
        self.assertIn('id', result)
        self.assertEqual(result['first_name'], self.test_data['first_name'])
        self.assertEqual(result['last_name'], self.test_data['last_name'])
        self.assertEqual(result['work_email'], self.test_data['work_email'])

    def test_get_demo_requests(self):
        """Test retrieving demo requests"""
        # First create a test request
        create_demo_request(self.test_data)
        
        # Now try to get all requests
        data, status_code, message = get_demo_requests()
        self.assertEqual(status_code, 200)
        
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)

    def test_invalid_data(self):
        """Test creating demo request with invalid data"""
        # Missing required field
        invalid_data = self.test_data.copy()
        del invalid_data['first_name']

        result, status_code, message = create_demo_request(invalid_data)
        self.assertEqual(status_code, 400)
        self.assertIn('Missing required fields', message)

        # Invalid email format
        invalid_data = self.test_data.copy()
        invalid_data['work_email'] = 'invalid-email'

        result, status_code, message = create_demo_request(invalid_data)
        self.assertEqual(status_code, 400)
        self.assertIn('Invalid email format', message)

if __name__ == '__main__':
    unittest.main()
