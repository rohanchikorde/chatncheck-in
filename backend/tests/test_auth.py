import pytest
from flask import json

@pytest.mark.usefixtures('client')
class TestAuth:
    def test_register(self, client, test_user):
        """Test user registration"""
        response = client.post(
            '/api/auth/register',
            json=test_user
        )
        assert response.status_code == 201
        data = json.loads(response.data)
        assert 'id' in data
        assert data['email'] == test_user['email']
        assert data['full_name'] == test_user['full_name']

    def test_login(self, client, test_user):
        """Test user login"""
        # Login with correct credentials
        response = client.post(
            '/api/auth/login',
            json={
                "email": test_user["email"],
                "password": test_user["password"]
            }
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'access_token' in data
        assert 'user' in data
        assert data['user']['email'] == test_user['email']

        # Login with incorrect password
        response = client.post(
            '/api/auth/login',
            json={
                "email": test_user["email"],
                "password": "wrong_password"
            }
        )
        assert response.status_code == 401

        # Login with non-existent user
        response = client.post(
            '/api/auth/login',
            json={
                "email": "nonexistent@example.com",
                "password": "password"
            }
        )
        assert response.status_code == 401
