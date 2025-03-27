import sys
import os

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from flask import Flask, make_response
from flask_cors import CORS
from config import (
    FLASK_DEBUG,
    FLASK_PORT,
    CORS_ORIGINS,
    CORS_HEADERS,
    CORS_METHODS
)
from routes import demo_requests_bp, interview_bp, auth_bp

app = Flask(__name__)

# Configure CORS
CORS(app, 
     origins=CORS_ORIGINS,
     methods=CORS_METHODS,
     allow_headers=['Content-Type', 'Authorization'] + CORS_HEADERS,
     supports_credentials=True)

# Register blueprints
app.register_blueprint(demo_requests_bp)
app.register_blueprint(interview_bp)
app.register_blueprint(auth_bp)

# Handle OPTIONS requests for CORS preflight
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    response = make_response('', 200)
    response.headers['Access-Control-Allow-Origin'] = '*' if '*' in CORS_ORIGINS else ','.join(CORS_ORIGINS)
    response.headers['Access-Control-Allow-Methods'] = ','.join(CORS_METHODS)
    response.headers['Access-Control-Allow-Headers'] = ','.join(['Content-Type', 'Authorization'] + CORS_HEADERS)
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.route('/')
def index():
    return make_response({'message': 'API is running'})

if __name__ == '__main__':
    app.run(debug=FLASK_DEBUG, port=FLASK_PORT)
