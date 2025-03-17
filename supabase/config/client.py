
import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ehcobpmrrtdkebphqaui.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY29icG1ycnRka2VicGhxYXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MjAyNzAsImV4cCI6MjAyMzI5NjI3MH0.Wx6H98f00YP2XAXaPJTAARNbxn6xmr25aPpw1IVZcW0')

class SupabaseClient:
    def __init__(self, url=SUPABASE_URL, key=SUPABASE_KEY):
        self.url = url
        self.key = key
        self.headers = {
            'apikey': key,
            'Authorization': f'Bearer {key}'
        }
    
    def from_table(self, table_name):
        """Create a query builder for a table"""
        return TableQuery(self, table_name)
    
    def storage_from(self, bucket_name):
        """Create a storage instance for a bucket"""
        return StorageBucket(self, bucket_name)

class TableQuery:
    def __init__(self, client, table_name):
        self.client = client
        self.table_name = table_name
        self.query_params = {}
    
    def select(self, columns='*'):
        """Select columns from the table"""
        self.query_params['select'] = columns
        return self
    
    def eq(self, column, value):
        """Filter by column equal to value"""
        self.query_params[column] = f'eq.{value}'
        return self
    
    def execute(self):
        """Execute the query"""
        url = f"{self.client.url}/rest/v1/{self.table_name}"
        
        # Build query string
        query_string = '&'.join([f"{k}={v}" for k, v in self.query_params.items()])
        if query_string:
            url = f"{url}?{query_string}"
        
        response = requests.get(url, headers=self.client.headers)
        
        if response.status_code >= 400:
            return {'data': None, 'error': response.text}
        
        return {'data': response.json(), 'error': None}
    
    def insert(self, data):
        """Insert data into the table"""
        url = f"{self.client.url}/rest/v1/{self.table_name}"
        
        headers = self.client.headers.copy()
        headers['Content-Type'] = 'application/json'
        headers['Prefer'] = 'return=representation'
        
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code >= 400:
            return {'data': None, 'error': response.text}
        
        return {'data': response.json(), 'error': None}
    
    def update(self, data):
        """Update data in the table"""
        url = f"{self.client.url}/rest/v1/{self.table_name}"
        
        # Add query params
        query_string = '&'.join([f"{k}={v}" for k, v in self.query_params.items() if k != 'select'])
        if query_string:
            url = f"{url}?{query_string}"
        
        headers = self.client.headers.copy()
        headers['Content-Type'] = 'application/json'
        headers['Prefer'] = 'return=representation'
        
        response = requests.patch(url, headers=headers, data=json.dumps(data))
        
        if response.status_code >= 400:
            return {'data': None, 'error': response.text}
        
        return {'data': response.json(), 'error': None}
    
    def delete(self):
        """Delete data from the table"""
        url = f"{self.client.url}/rest/v1/{self.table_name}"
        
        # Add query params
        query_string = '&'.join([f"{k}={v}" for k, v in self.query_params.items() if k != 'select'])
        if query_string:
            url = f"{url}?{query_string}"
        
        response = requests.delete(url, headers=self.client.headers)
        
        if response.status_code >= 400:
            return {'error': response.text}
        
        return {'error': None}

class StorageBucket:
    def __init__(self, client, bucket_name):
        self.client = client
        self.bucket_name = bucket_name
    
    def upload(self, path, file_data, file_options=None):
        """Upload a file to the bucket"""
        url = f"{self.client.url}/storage/v1/object/{self.bucket_name}/{path}"
        
        headers = self.client.headers.copy()
        if file_options and 'cacheControl' in file_options:
            headers['Cache-Control'] = file_options['cacheControl']
        
        response = requests.post(url, headers=headers, data=file_data)
        
        if response.status_code >= 400:
            return {'data': None, 'error': response.text}
        
        return {'data': response.json(), 'error': None}
    
    def get_public_url(self, path):
        """Get the public URL for a file"""
        url = f"{self.client.url}/storage/v1/object/public/{self.bucket_name}/{path}"
        return {'publicUrl': url}

# Create a client instance
supabase = SupabaseClient()
