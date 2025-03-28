# Interview Platform Backend

The backend API for the Interview Platform, built with Flask and Supabase.

## Project Structure

```
backend/
├── app.py                 # Main application file
├── config.py             # Configuration settings
├── routes/              # API routes
│   ├── demo_requests.py  # Demo request endpoints
│   └── interviews.py     # Interview management endpoints
├── services/            # Business logic
│   ├── demo_requests.py  # Demo request service
│   └── interviews.py     # Interview service
├── utils/              # Utility functions
│   ├── __init__.py      # Package initialization
│   ├── supabase.py      # Supabase integration
│   └── validators.py    # Input validation
└── requirements.txt      # Backend dependencies
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
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and update the environment variables:
   ```bash
   copy .env.example .env
   ```

4. Start the server:
   ```bash
   python app.py
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
