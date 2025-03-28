
import sys
import os

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from flask import Flask, make_response
from flask_cors import CORS
from config.config import *
from routes.demo_requests import demo_bp
from routes.interviews import interview_bp
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=CORS_ORIGINS, headers=CORS_HEADERS, methods=CORS_METHODS)

# Register blueprints
app.register_blueprint(demo_bp)
app.register_blueprint(interview_bp)

# Handle OPTIONS requests for CORS preflight
@app.route('/api/interviews', methods=['OPTIONS'])
@app.route('/api/interviews/<interview_id>', methods=['OPTIONS'])
@app.route('/api/demo-requests', methods=['OPTIONS'])
def handle_options(interview_id=None):
    return make_response('', 200)

if __name__ == '__main__':
    logger.info(f"Starting Flask server in debug mode: {FLASK_DEBUG}, port: {FLASK_PORT}")
    app.run(debug=FLASK_DEBUG, port=FLASK_PORT)
