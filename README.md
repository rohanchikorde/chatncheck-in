# InterviewSync Platform

A modern interview management platform built with React, TypeScript, and Supabase, featuring role-based access control for Admins, Interviewers, and Interviewees.

## Features

### Admin Role
- Comprehensive Dashboard
- Interview Management
  - View all interviews
  - Create new interviews
  - Edit existing interviews
  - Delete interviews
- User Management
  - View and manage users
  - Role-based access control
- Detailed Interview Views

### Interviewer Role
- Personal Dashboard
- Interview Management
  - View assigned interviews
  - Submit feedback
  - Track interview status
- Feedback System
  - Submit structured feedback
  - View feedback history

### Interviewee Role
- Personal Dashboard
- Interview Management
  - View scheduled interviews
  - Track interview status
  - Access relevant documents

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- TanStack Query
- React Router
- Supabase Integration

### Backend
- Supabase
  - Database
  - Authentication
  - Storage
- File Upload Support
- CORS Enabled
- Environment Variable Configuration

## Project Structure

```
src/
├── App.tsx          # Main application component
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── integrations/   # Third-party service integrations
├── lib/           # Utility functions
├── pages/         # Page components organized by user roles
└── types/         # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Create a `.env` file in the root directory
- Add your Supabase configuration:
  ```
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Routing Structure

```
Public Routes:
/

Admin Routes:
/admin/dashboard
/admin/interviews
/admin/interviews/:id
/admin/users

Interviewer Routes:
/interviewer/dashboard
/interviewer/interviews
/interviewer/feedback

Interviewee Routes:
/interviewee/dashboard
/interviewee/interviews
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
