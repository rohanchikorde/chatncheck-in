# InterviewSync Backend

The backend API for the InterviewSync platform, built with Flask and Supabase.

## Features

- RESTful API endpoints for interview management
- User authentication and authorization
- File upload and storage
- Real-time notifications
- Interview scheduling and tracking
- Skill-based matching

## API Endpoints

### Interviews

- `POST /api/interviews` - Create a new interview
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get a specific interview
- `PUT /api/interviews/:id` - Update an interview
- `DELETE /api/interviews/:id` - Delete an interview

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Companies

- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get a specific company
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Delete a company

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
   python server.py
   ```

## Environment Variables

```plaintext
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=5000
FLASK_ENV=development
FLASK_APP=server.py
```

## Running Tests

```bash
python -m pytest
```

## Development

The backend is configured with CORS enabled and runs in debug mode during development. All API endpoints are documented using Swagger/OpenAPI.
