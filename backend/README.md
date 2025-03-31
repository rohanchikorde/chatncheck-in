# Interview Platform Backend

The backend API for the Interview Platform, built with Flask and Supabase.

## Project Structure

```
backend/
├── app.py                 # Main application file
├── config.py             # Configuration settings
├── routes/              # API routes
│   ├── demo_requests.py  # Demo request endpoints
│   ├── interviews.py     # Interview management endpoints
│   └── test.py          # Test endpoints
├── services/            # Business logic
│   ├── demo_requests.py  # Demo request service
│   └── interviews.py     # Interview service
├── utils/              # Utility functions
│   ├── __init__.py      # Package initialization
│   ├── supabase.py      # Supabase integration
│   ├── validators.py    # Input validation
│   └── ssl_config.py    # SSL configuration
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
- Comprehensive test suite for API endpoints
- Interviewer management with availability scheduling
- Soft delete functionality for interviewers
- Maximum interviews per day limit
- Weekly availability scheduling

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

### Interviewers (Admin)

- `POST /admin/interviewers` - Create a new interviewer
- `PUT /admin/interviewers/:id` - Update an interviewer
- `DELETE /admin/interviewers/:id` - Delete an interviewer
- `GET /admin/interviewers` - List all interviewers
- `GET /admin/interviewers/:id` - Get a specific interviewer
- `GET /admin/interviewers/:id/availability` - Get interviewer availability
- `PUT /admin/interviewers/:id/availability` - Update interviewer availability

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     ```

3. Run the application:
   ```bash
   python app.py
   ```

4. Run tests:
   ```bash
   python test_supabase.py
   ```

## Testing

The project includes a comprehensive test suite for:
- Supabase connection
- Interviewer CRUD operations
- Interviewer availability management
- Error handling and response validation

## Error Handling

The API implements robust error handling with:
- Consistent error response format
- Detailed error messages
- Proper HTTP status codes
- Retry mechanism for failed requests
- SSL verification handling

## Security

- SSL/TLS encryption for all API requests
- Secure Supabase authentication
- Input validation for all endpoints
- Rate limiting for API endpoints
- CORS configuration for frontend integration

## Logging

The application includes comprehensive logging for:
- API requests and responses
- Error tracking
- Performance monitoring
- Security events

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
