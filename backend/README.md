
# Interview Platform Backend

The backend API for the Interview Platform, built with Flask and Supabase.

## Project Structure

```
backend/
├── app.py                 # Main application file
├── config/                # Configuration settings
│   ├── __init__.py
│   └── config.py
├── routes/                # API routes
│   ├── __init__.py
│   ├── demo_requests.py   # Demo request endpoints
│   └── interviews.py      # Interview management endpoints
├── services/              # Business logic
│   ├── __init__.py
│   ├── demo_requests.py   # Demo request service
│   └── interviews.py      # Interview service
├── utils/                 # Utility functions
│   ├── __init__.py
│   ├── supabase.py        # Supabase integration
│   └── validators.py      # Input validation
├── tests/                 # Test files
│   ├── __init__.py
│   └── test_api.py        # API tests
├── run_tests.sh           # Test runner script
└── requirements.txt       # Backend dependencies
```

## Features

- RESTful API endpoints for interview management
- Demo request system with robust error handling
- Supabase integration for data storage
- Input validation and error handling
- CORS support for frontend integration
- Modular architecture with clear separation of concerns
- Improved SSL handling for Supabase requests
- Enhanced error logging and debugging

## API Endpoints

### Demo Requests

- `POST /api/demo-requests` - Create a new demo request
- `GET /api/demo-requests` - Get all demo requests

### Interviews

- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get a specific interview
- `POST /api/interviews` - Create a new interview
- `PUT /api/interviews/:id` - Update an interview
- `DELETE /api/interviews/:id` - Delete an interview

## Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   source venv/bin/activate  # macOS/Linux
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and update the environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   python app.py
   ```

## Running Tests

Run the tests using the test script:
```bash
./run_tests.sh
```

Or manually:
```bash
python -m pytest tests/
```

## Environment Variables

```plaintext
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
FLASK_DEBUG=1
FLASK_PORT=5000
CORS_ORIGINS="*"
CORS_HEADERS="Content-Type"
CORS_METHODS="GET,POST,PUT,DELETE,OPTIONS"
```

## Development

The backend is configured with:
- Flask running in debug mode during development
- CORS enabled for frontend integration
- Python path configured for module imports
- Error handling and logging

## Launch Instructions

To launch the entire application (both backend and frontend):

1. Make sure all dependencies are installed:
   ```bash
   pip install -r requirements.txt
   cd ../frontend
   npm install
   ```

2. Use the provided shell script:
   ```bash
   chmod +x ../run_app.sh
   ../run_app.sh
   ```

Or start each component separately:

1. Start the backend:
   ```bash
   python app.py
   ```

2. Start the frontend (in another terminal):
   ```bash
   cd ../frontend
   npm run dev
   ```
