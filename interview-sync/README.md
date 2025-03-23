# InterviewSync

A modern interview management platform built with React, TypeScript, and Supabase.

## Project Structure

```
interview-sync/
├── backend/          # Flask backend API
├── frontend/         # React + TypeScript frontend
├── shared/           # Shared utilities and configurations
├── docs/            # Project documentation
├── tests/           # Test files
└── .env.example     # Example environment variables
```

## Features

- Role-based access control (Admin, Interviewer, Interviewee)
- Interview scheduling and management
- Candidate tracking
- Resume upload and storage
- Interview feedback system
- Skill-based matching
- Real-time notifications

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn
- Python virtual environment recommended

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy `.env.example` to `.env` and update the environment variables:
   ```bash
   copy .env.example .env
   ```

5. Start the backend server:
   ```bash
   python server.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update the environment variables:
   ```bash
   copy .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the Application

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:5000`

## Environment Variables

### Backend (.env)

```plaintext
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=5000
FLASK_ENV=development
FLASK_APP=server.py
```

### Frontend (.env)

```plaintext
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

## Development

### Running Tests

```bash
# Backend tests
python -m pytest

# Frontend tests
npm test
```

### Building for Production

```bash
# Frontend production build
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
