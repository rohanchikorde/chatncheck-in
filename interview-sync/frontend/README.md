# InterviewSync Frontend

The React + TypeScript frontend for the InterviewSync platform.

## Features

- Role-based UI for Admin, Interviewer, and Interviewee
- Modern, responsive design with Tailwind CSS
- Real-time interview scheduling
- File upload and document management
- Interview feedback system
- Skill-based matching
- Real-time notifications

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- TanStack Query
- React Router
- Supabase Integration

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

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update the environment variables:
   ```bash
   copy .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

```plaintext
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
```

## Development

The frontend is configured with:
- Hot Module Replacement (HMR)
- TypeScript support
- Tailwind CSS integration
- ESLint and Prettier for code quality
- Vite for fast development server
