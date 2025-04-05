from flask import Blueprint, request, jsonify
from services.companies_service import CompaniesService
from decorators.auth import login_required
from config.config import supabase_client

companies_bp = Blueprint('companies', __name__)
companies_service = CompaniesService()

@companies_bp.route('/companies', methods=['POST'])
@login_required
def create_company():
    """Create a new company."""
    try:
        print("In create_company API")
        print("Request headers:", dict(request.headers))
        print("Request data:", request.data)
        
        if not request.is_json:
            print("Request is not JSON")
            return jsonify({'error': 'Request must be JSON'}), 400

        print("Getting json from request")
        data = request.get_json()
        print("Received data:", data)
        print("2ooooooooooooooooooooooooooooooooo")

        # Add user_id from the token
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'Authorization header is required'}), 401

        token = auth_header.replace('Bearer ', '').strip()
        user = supabase_client.auth.get_user(token)
        if not user:
            return jsonify({'error': 'Invalid token'}), 401

        data['user_id'] = user.user.id

        # Validate required fields
        required_fields = ['name']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Optional fields with defaults
        data.setdefault('description', '')
        data.setdefault('industry', '')
        data.setdefault('website', '')
        data.setdefault('address', '')
        data.setdefault('logo_url', '')
        
        print("Creating company")
        company = companies_service.create_company(data)
        print("Created company:", company)
        return jsonify(company), 201

    except ValueError as e:
        print("ValueError:", str(e))
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print("Unexpected error:", str(e))
        return jsonify({'error': str(e)}), 500

@companies_bp.route('/companies/<int:company_id>', methods=['GET'])
@login_required
def get_company(company_id):
    """Get a company by ID."""
    try:
        company = companies_service.get_company(company_id)
        if not company:
            return jsonify({'error': 'Company not found'}), 404
        return jsonify(company)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companies_bp.route('/companies', methods=['GET'])
@login_required
def list_companies():
    """List all companies with pagination."""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        companies_data = companies_service.list_companies(page, per_page)
        return jsonify(companies_data)
    except ValueError:
        return jsonify({'error': 'Invalid page or per_page value'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companies_bp.route('/companies/<int:company_id>', methods=['PUT'])
@login_required
def update_company(company_id):
    """Update a company."""
    try:
        print("In update_company API")
        data = request.get_json()
        print("Received data:", data)
        
        company = companies_service.update_company(company_id, data)
        print("Updated company:", company)
        return jsonify(company)
    except ValueError as e:
        print("ValueError:", str(e))
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print("Unexpected error:", str(e))
        return jsonify({'error': str(e)}), 500

@companies_bp.route('/companies/<int:company_id>', methods=['DELETE'])
@login_required
def delete_company(company_id):
    """Delete a company."""
    try:
        companies_service.delete_company(company_id)
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companies_bp.route('/users/<user_id>/companies', methods=['GET'])
@login_required
def get_user_companies(user_id):
    """Get all companies owned by a specific user."""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        companies_data = companies_service.get_user_companies(user_id, page, per_page)
        return jsonify(companies_data)
    except ValueError:
        return jsonify({'error': 'Invalid page or per_page value'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
