
from flask import Flask
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    filename='app/logs/app.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Import routes
from app.routes import interviews

# Register blueprints
app.register_blueprint(interviews.bp)
