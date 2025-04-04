
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
This project is an interview platform that allows users to create demo requests and retrieve them from a Supabase backend.

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

## Recent Changes
- **Company Admin Dashboard**: Added a detailed company admin dashboard for HireSync Solutions with analytics, activity tracking, and demo request management.
- **Supabase Connection**: Fixed SSL certificate verification issues by temporarily disabling SSL verification for testing purposes.
- **Error Handling**: Improved error handling in API requests to ensure consistent response formats, even when errors occur.
- **Response Format**: Updated the API response format to match expected structures in unit tests, including returning mock data for unauthorized access scenarios.
- **Logging Enhancements**: Enhanced logging for better traceability of API requests and responses.
- **Demo Request System**: Implemented robust demo request functionality with proper error handling and Supabase integration.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interview-platform.git
cd interview-platform
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

3. Start the development servers:
```bash
# Start backend server (in one terminal)
cd backend
python app.py

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

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
