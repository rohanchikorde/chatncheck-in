# Interview Platform Backend

The backend API for the Interview Platform, built with Flask and Supabase.

## Project Structure

```
backend/
├── app.py                 # Main application file
├── config.py             # Configuration settings
├── routes/              # API routes
│   ├── auth.py          # Authentication endpoints
│   ├── companies.py     # Company management endpoints
│   ├── demo_requests.py  # Demo request endpoints
│   ├── interviews.py     # Interview management endpoints
│   └── test.py          # Test endpoints
├── services/            # Business logic
│   ├── auth.py          # Authentication service
│   ├── companies.py     # Company management service
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

## Authentication API

### User Registration

- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "full_name": "string",
    "phone_number": "string",
    "role": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "email": "string",
    "full_name": "string",
    "phone_number": "string",
    "role": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### User Login

- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and get JWT token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "string",  // JWT token
    "user": {
      "id": "string",
      "email": "string",
      "full_name": "string",
      "phone_number": "string",
      "role": "string"
    }
  }
  ```

## Companies API

### Create Company

- **Endpoint**: `POST /api/companies`
- **Description**: Create a new company
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "name": "string",  // Required
    "description": "string",
    "industry": "string",
    "website": "string",
    "address": "string",
    "logo_url": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "industry": "string",
    "website": "string",
    "address": "string",
    "logo_url": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "is_active": "boolean"
  }
  ```

### Get Company

- **Endpoint**: `GET /api/companies/:id`
- **Description**: Get a company by ID
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "industry": "string",
    "website": "string",
    "address": "string",
    "logo_url": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "is_active": "boolean"
  }
  ```

### List Companies

- **Endpoint**: `GET /api/companies`
- **Description**: List all companies with pagination
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Query Parameters**:
  ```
  page: number  // Default: 1
  per_page: number  // Default: 10
  ```
- **Response**:
  ```json
  {
    "companies": [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "industry": "string",
        "website": "string",
        "address": "string",
        "logo_url": "string",
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "is_active": "boolean"
      }
    ],
    "total": "integer",
    "page": "integer",
    "per_page": "integer"
  }
  ```

### Update Company

- **Endpoint**: `PUT /api/companies/:id`
- **Description**: Update an existing company
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "industry": "string",
    "website": "string",
    "address": "string",
    "logo_url": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "industry": "string",
    "website": "string",
    "address": "string",
    "logo_url": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "is_active": "boolean"
  }
  ```

### Delete Company

- **Endpoint**: `DELETE /api/companies/:id`
- **Description**: Delete a company by ID
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**: Empty response with status 204

## Error Responses

All endpoints may return error responses with the following structure:

```json
{
  "error": "string"
}
```

Common error codes:
- 400: Bad Request (invalid input)
- 401: Unauthorized (invalid or missing token)
- 404: Not Found (resource not found)
- 500: Internal Server Error

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
