import pytest
from app import app
from config.config import supabase_client
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def test_user():
    """Create a test user for authentication tests"""
    return {
        "email": "test@example.com",
        "password": "test_password123",
        "full_name": "Test User",
        "phone_number": "1234567890",
        "role": "user"
    }

@pytest.fixture
def jwt_token(client, test_user):
    """Register and login test user to get JWT token"""
    # Register user
    register_response = client.post(
        '/api/auth/register',
        json=test_user
    )
    assert register_response.status_code == 201

    # Login user
    login_response = client.post(
        '/api/auth/login',
        json={
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )
    assert login_response.status_code == 200
    
    token = json.loads(login_response.data)["access_token"]
    return token

@pytest.fixture
def auth_headers(jwt_token):
    """Return headers with JWT token"""
    return {
        'Authorization': f'Bearer {jwt_token}',
        'Content-Type': 'application/json'
    }
