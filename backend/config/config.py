import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ehcobpmrrtdkebphqaui.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2VoanpxZ3JhaGZ4a3dtaGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDU1MjEsImV4cCI6MjA1NzUyMTUyMX0.MOCLW0QA4wRoYtt3E9wXWd1RVcx2ceMRC_6qgEgIMng')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY', SUPABASE_KEY)  # Fallback to SUPABASE_KEY if not provided
STORAGE_BUCKET = 'interview-documents'

# Validate Supabase configuration
if not SUPABASE_URL:
    logger.error("SUPABASE_URL is not configured")
    raise ValueError("SUPABASE_URL must be configured")

if not SUPABASE_KEY:
    logger.error("SUPABASE_KEY is not configured")
    raise ValueError("SUPABASE_KEY must be configured")

# JWT Configuration
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')  # Change in production
JWT_EXPIRATION_HOURS = 24

# Flask configuration
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
FLASK_PORT = int(os.getenv('FLASK_PORT', '5000'))

# CORS configuration
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
CORS_HEADERS = os.getenv('CORS_HEADERS', 'Content-Type,Authorization').split(',')
CORS_METHODS = os.getenv('CORS_METHODS', 'GET,POST,PUT,DELETE,OPTIONS').split(',')

# Log configuration
logger.info("Supabase URL: %s", SUPABASE_URL)
logger.info("Flask Debug: %s", FLASK_DEBUG)
logger.info("Flask Port: %s", FLASK_PORT)
logger.info("CORS Origins: %s", CORS_ORIGINS)
logger.info("CORS Headers: %s", CORS_HEADERS)
logger.info("CORS Methods: %s", CORS_METHODS)
logger.info("JWT Secret Key: %s", JWT_SECRET_KEY)
logger.info("JWT Expiration Hours: %s", JWT_EXPIRATION_HOURS)
