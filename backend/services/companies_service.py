from typing import Dict, Any, Optional
from datetime import datetime
from config.config import supabase_client

class CompaniesService:
    def __init__(self):
        self.client = supabase_client

    def create_company(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new company in the database.
        
        Args:
            data (Dict[str, Any]): Company data containing name, description, industry, etc.
            
        Returns:
            Dict[str, Any]: Created company data with ID
        """
        print("In create_company service")
        required_fields = ['name', 'user_id']
        
        # Validate required fields
        for field in required_fields:
            print("Validating required field:", field)
            if field not in data:
                print("Missing required field:", field)
                raise ValueError(f"Missing required field: {field}")

        # Set default values if not provided
        data.setdefault('description', '')
        data.setdefault('industry', '')
        data.setdefault('website', '')
        data.setdefault('address', '')
        data.setdefault('logo_url', '')
        data.setdefault('is_active', True)

        # Add timestamps
        data['created_at'] = datetime.utcnow().isoformat()
        data['updated_at'] = datetime.utcnow().isoformat()

        print("Creating company with data:", data)

        # Insert company into database
        response = self.client.table('companies').insert(data).execute()
        
        if not response.data:
            raise Exception("Failed to create company")
            
        return response.data[0]

    def get_company(self, company_id: int) -> Optional[Dict[str, Any]]:
        """
        Get a company by ID.
        
        Args:
            company_id (int): ID of the company to retrieve
            
        Returns:
            Optional[Dict[str, Any]]: Company data or None if not found
        """
        response = self.client.table('companies').select('*').eq('id', company_id).execute()
        return response.data[0] if response.data else None

    def update_company(self, company_id: int, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update an existing company.
        
        Args:
            company_id (int): ID of the company to update
            data (Dict[str, Any]): Updated company data
            
        Returns:
            Dict[str, Any]: Updated company data
        """
        # Update updated_at timestamp
        data['updated_at'] = datetime.utcnow().isoformat()

        # Don't allow updating user_id
        if 'user_id' in data:
            del data['user_id']

        response = self.client.table('companies').update(data).eq('id', company_id).execute()
        
        if not response.data:
            raise Exception(f"Company with ID {company_id} not found")
            
        return response.data[0]

    def list_companies(self, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
        """
        List all companies with pagination.
        
        Args:
            page (int): Page number (default: 1)
            per_page (int): Number of items per page (default: 10)
            
        Returns:
            Dict[str, Any]: List of companies and pagination info
        """
        offset = (page - 1) * per_page
        
        # Get total count
        total = self.client.table('companies').select('id').execute()
        total_count = len(total.data)
        
        # Get paginated results
        companies = self.client.table('companies')\
            .select('*')\
            .order('created_at', desc=True)\
            .range(offset, offset + per_page - 1)\
            .execute()
            
        return {
            'companies': companies.data,
            'total': total_count,
            'page': page,
            'per_page': per_page
        }

    def delete_company(self, company_id: int) -> None:
        """
        Delete a company by ID.
        
        Args:
            company_id (int): ID of the company to delete
        """
        self.client.table('companies').delete().eq('id', company_id).execute()

    def get_user_companies(self, user_id: str, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
        """
        Get all companies owned by a specific user.
        
        Args:
            user_id (str): ID of the user
            page (int): Page number (default: 1)
            per_page (int): Number of items per page (default: 10)
            
        Returns:
            Dict[str, Any]: List of user's companies and pagination info
        """
        offset = (page - 1) * per_page
        
        # Get total count for user
        total = self.client.table('companies')\
            .select('id')\
            .eq('user_id', user_id)\
            .execute()
        total_count = len(total.data)
        
        # Get paginated results for user
        companies = self.client.table('companies')\
            .select('*')\
            .eq('user_id', user_id)\
            .order('created_at', desc=True)\
            .range(offset, offset + per_page - 1)\
            .execute()
            
        return {
            'companies': companies.data,
            'total': total_count,
            'page': page,
            'per_page': per_page
        }
