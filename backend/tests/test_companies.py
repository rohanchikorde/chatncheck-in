import pytest
from flask import json
import time

@pytest.mark.usefixtures('client', 'auth_headers')
class TestCompanies:
    def test_create_company(self, client, auth_headers):
        """Test creating a new company"""
        company_data = {
            "name": "Test Company",
            "description": "Test description",
            "industry": "Technology",
            "website": "https://test.com",
            "address": "123 Test Street",
            "logo_url": "https://test.com/logo.png"
        }

        response = client.post(
            '/api/companies',
            headers=auth_headers,
            json=company_data
        )
        assert response.status_code == 201
        data = json.loads(response.data)
        assert 'id' in data
        assert data['name'] == company_data['name']
        assert data['description'] == company_data['description']
        assert data['user_id'] is not None

    def test_get_company(self, client, auth_headers):
        """Test getting a company by ID"""
        # First create a company
        company_data = {
            "name": "Test Company",
            "description": "Test description"
        }
        response = client.post(
            '/api/companies',
            headers=auth_headers,
            json=company_data
        )
        company_id = json.loads(response.data)['id']

        # Now get the company
        response = client.get(
            f'/api/companies/{company_id}',
            headers=auth_headers
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['id'] == company_id
        assert data['name'] == company_data['name']

    def test_list_companies(self, client, auth_headers):
        """Test listing all companies"""
        # Create two companies for testing
        for i in range(2):
            response = client.post(
                '/api/companies',
                headers=auth_headers,
                json={
                    "name": f"Test Company {i}",
                    "description": f"Test description {i}"
                }
            )
            assert response.status_code == 201

        # List companies
        response = client.get(
            '/api/companies?page=1&per_page=10',
            headers=auth_headers
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'companies' in data
        assert 'total' in data
        assert len(data['companies']) >= 2

    def test_list_user_companies(self, client, auth_headers, jwt_token):
        """Test listing companies for specific user"""
        # Get user ID from token
        user = supabase_client.auth.get_user(jwt_token)
        user_id = user.user.id

        # Create a company
        response = client.post(
            '/api/companies',
            headers=auth_headers,
            json={
                "name": "Test Company",
                "description": "Test description"
            }
        )
        assert response.status_code == 201

        # List user's companies
        response = client.get(
            f'/api/users/{user_id}/companies?page=1&per_page=10',
            headers=auth_headers
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'companies' in data
        assert 'total' in data
        assert len(data['companies']) >= 1

    def test_update_company(self, client, auth_headers):
        """Test updating a company"""
        # First create a company
        company_data = {
            "name": "Test Company",
            "description": "Test description"
        }
        response = client.post(
            '/api/companies',
            headers=auth_headers,
            json=company_data
        )
        company_id = json.loads(response.data)['id']

        # Update the company
        update_data = {
            "name": "Updated Company Name",
            "description": "Updated description"
        }
        response = client.put(
            f'/api/companies/{company_id}',
            headers=auth_headers,
            json=update_data
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['name'] == update_data['name']
        assert data['description'] == update_data['description']

    def test_delete_company(self, client, auth_headers):
        """Test deleting a company"""
        # First create a company
        company_data = {
            "name": "Test Company",
            "description": "Test description"
        }
        response = client.post(
            '/api/companies',
            headers=auth_headers,
            json=company_data
        )
        company_id = json.loads(response.data)['id']

        # Delete the company
        response = client.delete(
            f'/api/companies/{company_id}',
            headers=auth_headers
        )
        assert response.status_code == 204

        # Verify company is deleted
        response = client.get(
            f'/api/companies/{company_id}',
            headers=auth_headers
        )
        assert response.status_code == 404
