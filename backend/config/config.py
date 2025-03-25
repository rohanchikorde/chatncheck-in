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
SUPABASE_KEY = os.getenv('SUPABASE_KEY', '')
STORAGE_BUCKET = 'interview-documents'

# Validate Supabase configuration
if not SUPABASE_URL:
    logger.error("SUPABASE_URL is not configured")
    raise ValueError("SUPABASE_URL must be configured")

if not SUPABASE_KEY:
    logger.error("SUPABASE_KEY is not configured")
    raise ValueError("SUPABASE_KEY must be configured")

# Flask configuration
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
FLASK_PORT = int(os.getenv('FLASK_PORT', '5000'))

# CORS configuration
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
CORS_HEADERS = os.getenv('CORS_HEADERS', 'Content-Type, Authorization')
CORS_METHODS = os.getenv('CORS_METHODS', 'GET, POST, PUT, DELETE, OPTIONS')

# Log configuration
logger.info(f"Supabase URL: {SUPABASE_URL}")
logger.info(f"Flask Debug: {FLASK_DEBUG}")
logger.info(f"Flask Port: {FLASK_PORT}")
logger.info(f"CORS Origins: {CORS_ORIGINS}")
logger.info(f"CORS Headers: {CORS_HEADERS}")
logger.info(f"CORS Methods: {CORS_METHODS}")
