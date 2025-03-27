import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flask configuration
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
FLASK_PORT = int(os.getenv('FLASK_PORT', '5000'))

# CORS configuration
CORS_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']  # Vite dev server
CORS_HEADERS = ['Content-Type', 'Authorization']
CORS_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

# Supabase configuration
SUPABASE_URL = 'https://igkehjzqgrahfxkwmhbc.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2VoanpxZ3JhaGZ4a3dtaGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjQyMzYsImV4cCI6MjA1Mzk5OTgzNn0.9L5ZLH44ZkZPvZa9610ZJ42tZ0ZyL63kxZ34FkO4Y1I'

# Database configuration
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/interview_platform')

# JWT configuration
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')
JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', '86400'))  # 24 hours in seconds

# Storage configuration
STORAGE_BUCKET = 'interview-platform'

# Email configuration
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')

# Log configuration values
logger.info(f"Flask Debug: {FLASK_DEBUG}")
logger.info(f"Flask Port: {FLASK_PORT}")
logger.info(f"Supabase URL: {SUPABASE_URL}")
logger.info(f"Database URL: {DATABASE_URL}")
logger.info(f"Storage Bucket: {STORAGE_BUCKET}")

# Export all config variables
__all__ = [
    'FLASK_DEBUG', 'FLASK_PORT',
    'CORS_ORIGINS', 'CORS_HEADERS', 'CORS_METHODS',
    'SUPABASE_URL', 'SUPABASE_KEY',
    'DATABASE_URL',
    'JWT_SECRET_KEY', 'JWT_ACCESS_TOKEN_EXPIRES',
    'STORAGE_BUCKET',
    'SMTP_SERVER', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD'
]
