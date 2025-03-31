# Routes

This directory contains all the API route handlers for the Interview Platform backend.

## Structure

```
routes/
├── demo_requests.py     # Demo request endpoints
├── interviews.py        # Interview management endpoints
└── test.py            # Test endpoints
```

## Demo Requests Routes

### Endpoints

- `POST /api/demo-requests` - Create a new demo request
- `GET /api/demo-requests` - Get all demo requests

### Usage

```python
from routes.demo_requests import create_demo_request, get_demo_requests
```

## Interviews Routes

### Endpoints

- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get a specific interview
- `POST /api/interviews` - Create a new interview
- `PUT /api/interviews/:id` - Update an interview
- `DELETE /api/interviews/:id` - Delete an interview

### Usage

```python
from routes.interviews import (
    get_interviews,
    get_interview,
    create_interview,
    update_interview,
    delete_interview
)
```

## Test Routes

### Endpoints

- `GET /api/test` - Test endpoint for API connectivity
- `POST /api/test` - Test endpoint for POST requests

### Usage

```python
from routes.test import test_endpoint
```

## Error Handling

All routes implement consistent error handling with:
- Proper HTTP status codes
- Detailed error messages
- Input validation
- Exception handling

## Security

- All routes are protected with proper authentication
- Input validation for all endpoints
- Rate limiting implementation
- CORS configuration

## Logging

All routes include comprehensive logging for:
- Request tracking
- Error monitoring
- Performance metrics
- Security events
