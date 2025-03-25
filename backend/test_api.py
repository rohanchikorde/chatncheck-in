
import requests
import json
import unittest
from datetime import datetime, timedelta

BASE_URL = "http://localhost:5000"

class TestInterviewAPI(unittest.TestCase):
    """Test cases for the Interview APIs"""

    def setUp(self):
        """Set up test data that we'll use across multiple tests"""
        self.interview_data = {
            "candidateName": "Test Candidate",
            "interviewer": "John Doe",
            "date": (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d'),
            "time": "14:00",
            "duration": "60",
            "format": "Video",
            "jobRole": "Software Engineer",
            "useQuestionBank": "true"
        }
        self.demo_request_data = {
            "first_name": "Test",
            "last_name": "User",
            "work_email": "test@example.com",
            "phone_number": "1234567890",
            "service_interest": "Enterprise",
            "message": "This is a test message",
            "agrees_to_terms": True
        }
        
        # For storing created interview ID
        self.interview_id = None

    def test_01_create_interview(self):
        """Test creating a new interview"""
        response = requests.post(f"{BASE_URL}/api/interviews", json=self.interview_data)
        data = response.json()
        
        # Check status code and success flag
        self.assertEqual(response.status_code, 201)
        self.assertTrue(data['success'])
        
        # Store interview ID for later tests
        self.interview_id = data['data']['id']
        print(f"Created interview with ID: {self.interview_id}")
        
        # Verify data was saved correctly
        self.assertEqual(data['data']['candidate_name'], self.interview_data['candidateName'])
        self.assertEqual(data['data']['interviewer_name'], self.interview_data['interviewer'])
        self.assertEqual(data['data']['job_role'], self.interview_data['jobRole'])

    def test_02_get_all_interviews(self):
        """Test retrieving all interviews"""
        response = requests.get(f"{BASE_URL}/api/interviews")
        data = response.json()
        
        # Check status code and success flag
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        
        # Verify we have at least one interview
        self.assertGreater(len(data['data']), 0)

    def test_03_get_interview_by_id(self):
        """Test retrieving a specific interview by ID"""
        # Skip if we don't have an interview ID
        if not self.interview_id:
            self.skipTest("No interview ID available")
            
        response = requests.get(f"{BASE_URL}/api/interviews/{self.interview_id}")
        data = response.json()
        
        # Check status code and success flag
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        
        # Verify correct interview was retrieved
        self.assertEqual(data['data']['id'], self.interview_id)
        self.assertEqual(data['data']['candidate_name'], self.interview_data['candidateName'])

    def test_04_update_interview(self):
        """Test updating an interview"""
        # Skip if we don't have an interview ID
        if not self.interview_id:
            self.skipTest("No interview ID available")
            
        # Update data
        update_data = {
            "candidateName": "Updated Candidate",
            "interviewer": self.interview_data['interviewer'],
            "date": self.interview_data['date'],
            "time": self.interview_data['time'],
            "duration": self.interview_data['duration'],
            "format": "In-person",  # Changed from Video
            "jobRole": self.interview_data['jobRole'],
            "useQuestionBank": self.interview_data['useQuestionBank']
        }
        
        response = requests.put(f"{BASE_URL}/api/interviews/{self.interview_id}", json=update_data)
        data = response.json()
        
        # Check status code and success flag
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        
        # Verify data was updated correctly
        self.assertEqual(data['data']['candidate_name'], "Updated Candidate")
        self.assertEqual(data['data']['format'], "In-person")

    def test_05_create_demo_request(self):
        """Test creating a demo request"""
        response = requests.post(f"{BASE_URL}/api/demo-requests", json=self.demo_request_data)
        data = response.json()
        
        # Check status code and success flag
        self.assertEqual(response.status_code, 201)
        self.assertTrue(data['success'])
        
        # Verify demo request was created
        self.assertIsNotNone(data.get('data'))
        print(f"Created demo request: {data}")

    def test_06_delete_interview(self):
        """Test deleting an interview"""
        # Skip if we don't have an interview ID
        if not self.interview_id:
            self.skipTest("No interview ID available")
            
        response = requests.delete(f"{BASE_URL}/api/interviews/{self.interview_id}")
        data = response.json()
        
        # Check status code and success flag
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        
        # Verify interview was deleted by trying to fetch it
        verify_response = requests.get(f"{BASE_URL}/api/interviews/{self.interview_id}")
        self.assertEqual(verify_response.status_code, 404)
        
if __name__ == "__main__":
    print("\n=== INTERVIEW API TEST SUITE ===")
    print("Make sure your backend server is running at", BASE_URL)
    print("Running tests...")
    unittest.main(verbosity=2)
