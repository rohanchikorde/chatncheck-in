from flask import Flask, make_response
from flask_cors import CORS
from config.config import config
from routes.demo_requests import demo_bp
from routes.interviews import interview_bp

app = Flask(__name__)
CORS(app, origins=config.CORS_ORIGINS, headers=config.CORS_HEADERS, methods=config.CORS_METHODS)

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
    app.run(debug=config.FLASK_DEBUG, port=config.FLASK_PORT)
