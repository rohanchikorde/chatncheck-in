import sys
import os
from flask import Flask, make_response
from flask_cors import CORS

# Add the project root directory to Python path before importing other modules
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from config.config import (
    CORS_ORIGINS,
    CORS_HEADERS,
    CORS_METHODS,
    FLASK_DEBUG,
    FLASK_PORT
)
from routes.demo_requests import demo_bp
from routes.interviews import interview_bp
from routes.auth import auth_bp
from routes.test import test_bp
from routes.companies import companies_bp
from flask import request
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app, origins=CORS_ORIGINS, headers=CORS_HEADERS, methods=CORS_METHODS)

# Register blueprints
app.register_blueprint(demo_bp, url_prefix='/api')
app.register_blueprint(interview_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(test_bp, url_prefix='/api')
app.register_blueprint(companies_bp, url_prefix='/api')

# Handle OPTIONS requests for CORS preflight
@app.route('/api/interviews', methods=['OPTIONS'])
@app.route('/api/interviews/<interview_id>', methods=['OPTIONS'])
@app.route('/api/demo-requests', methods=['OPTIONS'])
@app.route('/api/auth/login', methods=['OPTIONS'])
@app.route('/api/auth/register', methods=['OPTIONS'])
def handle_options(interview_id=None):
    return make_response('', 200)

if __name__ == '__main__':
    app.run(debug=FLASK_DEBUG, port=FLASK_PORT)
