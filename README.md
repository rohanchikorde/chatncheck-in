# Interview Platform

A modern interview management platform built with React, Vite, and Flask.

## Project Structure

```
interview-platform/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   │   ├── App.tsx    # Root component
│   │   ├── App.css    # Root styles
│   │   ├── main.tsx   # Entry point
│   │   ├── index.css  # Global styles
│   │   ├── components/ # Reusable React components
│   │   │   ├── ui/    # UI components (buttons, inputs, etc.)
│   │   │   └── layout/ # Layout components (header, footer, etc.)
│   │   ├── pages/     # Page components
│   │   │   ├── BookDemoPage.tsx
│   │   │   ├── DemoScheduledPage.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   ├── RequestDemoPage.tsx
│   │   │   ├── admin/ # Admin pages
│   │   │   ├── interviewee/ # Interviewee pages
│   │   │   ├── interviewer/ # Interviewer pages
│   │   │   └── solutions/ # Solutions pages
│   │   ├── features/  # Feature-specific code
│   │   ├── hooks/     # Custom React hooks
│   │   ├── integrations/ # Third-party integrations
│   │   └── lib/       # Shared libraries and utilities
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # Flask backend API
│   ├── app.py         # Main application file
│   ├── config/        # Configuration settings
│   │   ├── __init__.py
│   │   └── config.py
│   ├── routes/        # API routes
│   │   ├── demo_requests.py
│   │   ├── interviews.py
│   │   └── __init__.py
│   ├── services/      # Business logic
│   │   ├── demo_requests.py
│   │   ├── interviews.py
│   │   └── __init__.py
│   ├── utils/         # Utility functions
│   │   ├── __init__.py
│   │   ├── supabase.py
│   │   └── validators.py
│   ├── tests/         # Test files
│   │   ├── __init__.py
│   │   └── test_api.py
│   ├── requirements.txt # Backend dependencies
│   └── run_tests.sh    # Test runner script
├── shared/            # Shared utilities and components
│   ├── types/         # Shared TypeScript types
│   ├── utils/         # Shared utility functions
│   └── constants/     # Shared constants
├── docs/             # Project documentation
└── src/             # Root source directory
```

## Overview
This project is an interview management platform that provides comprehensive tools for managing interviews, interviewers, and analytics.

### Key Features

#### Admin Dashboard
- Interviewer Management:
  - Create, read, update, and delete interviewers
  - Manage weekly availability schedules
  - Set maximum interviews per day
  - Soft delete functionality

- Analytics:
  - Track interview completion rates
  - Analyze feedback ratings
  - Monitor interviewer performance
  - View job role distribution
  - Analyze time slot usage

- Schedule Management:
  - Detect overlapping interviews
  - Monitor daily interview limits
  - Check weekly availability
  - Bulk rescheduling capabilities

#### Technical Stack
- Frontend: React, TypeScript, Vite
- Backend: Python, Flask
- Database: Supabase
- Styling: Tailwind CSS, Radix UI

## Company Persona

- **Company Name**: HireSync Solutions
- **Industry**: Tech Recruitment
- **Size**: Mid-sized (200 employees)
- **Goals**: Streamline the hiring process, reduce time-to-hire by 30%, and improve collaboration between HR and engineering teams.
- **Pain Points**: Manual scheduling leads to double-booked interviewers, lack of centralized tracking for demo requests, and difficulty scaling hiring as the company grows.
- **Key Users**: 
  - HR Manager (oversees all hiring activities and approves demo requests).
  - Recruiter (schedules interviews and tracks candidate progress).
  - Team Lead (reviews interviewer feedback and participates in interviews).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rohanchikorde/chatncheck-in.git
cd chatncheck-in
```

2. Set up environment variables:
Create a `.env` file in the backend directory with:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
FLASK_DEBUG=True
FLASK_PORT=5000
CORS_ORIGINS=*
```

3. Install dependencies:
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

4. Start the servers:
```bash
# Start backend server (in one terminal)
cd backend
python app.py

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

### Testing

1. Run backend tests:
```bash
cd backend
python -m pytest
```

2. Test API endpoints:
```bash
cd backend
curl -X POST http://127.0.0.1:5000/api/auth/login -H "Content-Type: application/json" -d '{"email": "admin@example.com", "password": "Admin123!"}'
```

### Test Users
- Admin: admin@example.com / Admin123!
- User: user@example.com / User123!
- Frontend Developer: frontend@example.com / Frontend123!

## Development

### Frontend Development

The frontend is built with:
- React 18
- Vite as the build tool
- TypeScript for type safety
- Tailwind CSS for styling
- React Router for navigation
- Supabase for database operations

### Backend Development

The backend is built with:
- Flask for the API server
- Supabase for database operations
- Requests for HTTP requests
- Environment variables for configuration

## Features

- Interview scheduling and management
- Demo request system
- Enterprise solutions showcase
- Modern UI with Tailwind CSS
- Responsive design
- Type-safe with TypeScript
- API proxy configuration
- Supabase integration
- Automated testing
- Company admin dashboard with analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
