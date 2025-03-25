import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ehcobpmrrtdkebphqaui.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY29icG1ycnRka2VicGhxYXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MjAyNzAsImV4cCI6MjAyMzI5NjI3MH0.Wx6H98f00YP2XAXaPJTAARNbxn6xmr25aPpw1IVZcW0')
STORAGE_BUCKET = 'interview-documents'

# Flask configuration
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
FLASK_PORT = int(os.getenv('FLASK_PORT', '5000'))

# CORS configuration
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
CORS_HEADERS = os.getenv('CORS_HEADERS', 'Content-Type, Authorization')
CORS_METHODS = os.getenv('CORS_METHODS', 'GET, POST, PUT, DELETE, OPTIONS')
