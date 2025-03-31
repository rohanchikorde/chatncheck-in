import unittest
import sys
import os
import requests
import json
from datetime import datetime

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from backend.services.demo_requests import create_demo_request, get_demo_requests
from backend.utils.supabase import supabase_request

BASE_URL = 'http://127.0.0.1:5000'

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

    def test_get_demo_requests_success(self):
        """Test GET /api/demo-requests - Success case"""
        # Create a test request first
        create_demo_request(self.test_data)
        
        # Make GET request
        response = requests.get(f'{BASE_URL}/api/demo-requests')
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertEqual(data['message'], 'Successfully retrieved demo requests')
        self.assertIsInstance(data['data'], list)
        self.assertGreater(len(data['data']), 0)

    def test_get_demo_requests_empty(self):
        """Test GET /api/demo-requests - Empty case"""
        # Clear all demo requests first
        response = requests.delete(f'{BASE_URL}/api/demo-requests')
        
        # Make GET request
        response = requests.get(f'{BASE_URL}/api/demo-requests')
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertEqual(data['message'], 'Successfully retrieved demo requests')
        self.assertEqual(data['data'], [])

    def test_create_demo_request_success(self):
        """Test POST /api/demo-requests - Success case"""
        response = requests.post(
            f'{BASE_URL}/api/demo-requests',
            json=self.test_data
        )

        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertEqual(data['message'], 'Demo request created successfully')
        self.assertIn('id', data['data'])
        self.assertEqual(data['data']['first_name'], self.test_data['first_name'])
        self.assertEqual(data['data']['last_name'], self.test_data['last_name'])
        self.assertEqual(data['data']['work_email'], self.test_data['work_email'])

    def test_create_demo_request_invalid_email(self):
        """Test POST /api/demo-requests - Invalid email"""
        invalid_data = self.test_data.copy()
        invalid_data['work_email'] = 'invalid-email'
        
        response = requests.post(
            f'{BASE_URL}/api/demo-requests',
            json=invalid_data
        )

        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('Invalid email format', data['message'])

    def test_create_demo_request_missing_required_field(self):
        """Test POST /api/demo-requests - Missing required field"""
        invalid_data = self.test_data.copy()
        del invalid_data['first_name']
        
        response = requests.post(
            f'{BASE_URL}/api/demo-requests',
            json=invalid_data
        )

        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('Missing required field', data['message'])

    def test_create_demo_request_invalid_phone(self):
        """Test POST /api/demo-requests - Invalid phone number"""
        invalid_data = self.test_data.copy()
        invalid_data['phone_number'] = '123'  # Too short
        
        response = requests.post(
            f'{BASE_URL}/api/demo-requests',
            json=invalid_data
        )

        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('Invalid phone number format', data['message'])

    def test_create_demo_request_invalid_service_interest(self):
        """Test POST /api/demo-requests - Invalid service interest"""
        invalid_data = self.test_data.copy()
        invalid_data['service_interest'] = 'Invalid Service'
        
        response = requests.post(
            f'{BASE_URL}/api/demo-requests',
            json=invalid_data
        )

        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data['success'])
        self.assertIn('Invalid service interest', data['message'])

    def tearDown(self):
        """Clean up after each test"""
        # Clear all demo requests
        requests.delete(f'{BASE_URL}/api/demo-requests')

if __name__ == '__main__':
    unittest.main()
