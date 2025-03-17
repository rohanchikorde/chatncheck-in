
# Interview Platform

A comprehensive interview management platform for scheduling and conducting interviews.

## Project Structure

```
interview-platform/
├── backend/                 # Backend Flask API
│   ├── app/                 # Flask application
│   │   ├── __init__.py      # Flask app initialization
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Configuration
│   │   └── logs/            # Application logs
│   ├── .env                 # Backend environment variables
│   └── requirements.txt     # Python dependencies
├── frontend/                # Frontend React application
│   ├── src/                 # React source code
│   ├── .env                 # Frontend environment variables
│   └── package.json         # Node.js dependencies
└── supabase/                # Supabase configuration
    ├── config/              # Supabase client
    └── types/               # TypeScript types for Supabase
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python run.py
   ```

The backend server will start on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend application will be accessible at http://localhost:5173.

## Features

- Schedule and manage interviews
- Upload and store candidate resumes
- Track interview feedback
- Integration with Supabase for data storage
- User role-based access control

## Technologies Used

- **Backend**: Flask, Python
- **Frontend**: React, TypeScript, Vite
- **Database**: Supabase
- **Storage**: Supabase Storage

## API Documentation

### Interviews API

- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get interview by ID
- `POST /api/interviews` - Create a new interview
- `PUT /api/interviews/:id` - Update an interview
- `DELETE /api/interviews/:id` - Delete an interview
