import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Supabase Configuration
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')

    # SQLAlchemy Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour

    # CORS Configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
    CORS_HEADERS = os.getenv('CORS_HEADERS', 'Content-Type, Authorization')
    CORS_METHODS = os.getenv('CORS_METHODS', 'GET, POST, PUT, DELETE, OPTIONS')

    # Application Configuration
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    ENV = os.getenv('ENV', 'development')
    PORT = int(os.getenv('PORT', 5000))
