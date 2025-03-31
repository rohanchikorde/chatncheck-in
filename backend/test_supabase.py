from dotenv import load_dotenv
from utils.supabase import supabase_request
import json
import time

# Load environment variables
load_dotenv()

def test_supabase_connection():
    # Test a simple request to check connection
    response = supabase_request('/interviewers', method='GET')
    if response.get('status_code') == 200:
        print("\nSupabase connection successful!")
        print("Response:", response.get('data'))
        return True
    else:
        print("Supabase connection failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_create_interviewer():
    """Test creating a new interviewer"""
    print("\nTesting create interviewer...")
    
    new_interviewer = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "+1234567890",
        "role": "Technical Lead",
        "availability": {
            "monday": ["09:00-12:00", "14:00-17:00"],
            "wednesday": ["09:00-12:00"],
            "friday": ["14:00-17:00"]
        },
        "max_interviews_per_day": 4
    }
    
    response = supabase_request('/interviewers', method='POST', data=new_interviewer)
    
    if response.get('status_code') == 201:
        print("[+] Create interviewer successful!")
        print("Created interviewer:", response.get('data'))
        return response.get('data')
    else:
        print("[-] Create interviewer failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return None

def test_update_interviewer(interviewer_id):
    """Test updating an existing interviewer"""
    print("\nTesting update interviewer...")
    
    update_data = {
        "name": "John Smith (Updated)",
        "availability": {
            "monday": ["09:00-12:00", "14:00-17:00"],
            "tuesday": ["09:00-12:00"],
            "thursday": ["14:00-17:00"]
        },
        "max_interviews_per_day": 5
    }
    
    response = supabase_request(f'/interviewers/{interviewer_id}', method='PUT', data=update_data)
    
    if response.get('status_code') == 200:
        print("[+] Update interviewer successful!")
        print("Updated interviewer:", response.get('data'))
        return True
    else:
        print("[-] Update interviewer failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_get_interviewer(interviewer_id):
    """Test getting a specific interviewer"""
    print("\nTesting get interviewer...")
    
    response = supabase_request(f'/interviewers/{interviewer_id}', method='GET')
    
    if response.get('status_code') == 200:
        print("[+] Get interviewer successful!")
        print("Interviewer:", response.get('data'))
        return True
    else:
        print("[-] Get interviewer failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_delete_interviewer(interviewer_id):
    """Test deleting an interviewer"""
    print("\nTesting delete interviewer...")
    
    response = supabase_request(f'/interviewers/{interviewer_id}', method='DELETE')
    
    if response.get('status_code') == 204:
        print("[+] Delete interviewer successful!")
        return True
    else:
        print("[-] Delete interviewer failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_list_interviewers():
    """Test listing all interviewers"""
    print("\nTesting list interviewers...")
    
    response = supabase_request('/interviewers', method='GET')
    
    if response.get('status_code') == 200:
        print("[+] List interviewers successful!")
        print("Total interviewers:", len(response.get('data', [])))
        return True
    else:
        print("[-] List interviewers failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_interviewer_availability():
    """Test interviewer availability operations"""
    print("\nTesting interviewer availability...")
    
    # Get existing interviewer
    response = supabase_request('/interviewers', method='GET')
    if response.get('status_code') != 200:
        print("[-] Failed to get interviewers for availability test")
        return False
    
    interviewers = response.get('data', [])
    if not interviewers:
        print("[-] No interviewers found for availability test")
        return False
    
    interviewer = interviewers[0]
    
    # Test updating availability
    update_data = {
        "availability": {
            "monday": ["09:00-12:00", "14:00-17:00"],
            "tuesday": ["09:00-12:00"]
        }
    }
    
    response = supabase_request(f'/interviewers/{interviewer["id"]}', method='PUT', data=update_data)
    
    if response.get('status_code') == 200:
        print("[+] Update availability successful!")
        return True
    else:
        print("[-] Update availability failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_interviewer_availability_update(interviewer_id):
    """Test updating interviewer availability"""
    print("\nTesting update interviewer availability...")
    
    update_data = {
        "availability": {
            "monday": ["09:00-12:00", "14:00-17:00"],
            "tuesday": ["09:00-12:00"]
        }
    }
    
    response = supabase_request(f'/interviewers/{interviewer_id}', method='PUT', data=update_data)
    
    if response.get('status_code') == 200:
        print("[+] Update interviewer availability successful!")
        print("Updated interviewer:", response.get('data'))
        return True
    else:
        print("[-] Update interviewer availability failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

def test_interviewer_availability_get(interviewer_id):
    """Test getting interviewer availability"""
    print("\nTesting get interviewer availability...")
    
    response = supabase_request(f'/interviewers/{interviewer_id}', method='GET')
    
    if response.get('status_code') == 200:
        print("[+] Get interviewer availability successful!")
        print("Interviewer availability:", response.get('data').get('availability'))
        return True
    else:
        print("[-] Get interviewer availability failed!")
        print(f"Status Code: {response.get('status_code')}")
        print(f"Error: {response.get('error', 'Unknown error')}")
        return False

if __name__ == "__main__":
    # Run all tests
    print("\nStarting Supabase Interviewer Tests...")
    
    # Test connection
    test_supabase_connection()
    
    # Test create
    created_interviewer = test_create_interviewer()
    if not created_interviewer:
        print("[-] Failed to create interviewer - skipping remaining tests")
    else:
        # Get the created interviewer's ID
        interviewer_id = created_interviewer.get('id')
        
        # Test get
        test_get_interviewer(interviewer_id)
        
        # Test update
        test_update_interviewer(interviewer_id)
        
        # Test list
        test_list_interviewers()
        
        # Test availability update
        test_interviewer_availability_update(interviewer_id)
        
        # Test availability get
        test_interviewer_availability_get(interviewer_id)
        
        # Test delete
        test_delete_interviewer(interviewer_id)
        
        # Wait a moment before final list to ensure delete is processed
        time.sleep(2)
        
        # Final list to verify deletion
        test_list_interviewers()
    
    print("\nAll tests completed!")
