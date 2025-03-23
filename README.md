# Interview Platform

A modern interview management platform built with React, Vite, and Flask.

## Project Structure

```
interview-platform/
├── frontend/           # React frontend application
├── backend/           # Flask backend API
├── shared/            # Shared utilities and components
├── tests/             # Test files
├── docs/              # Documentation
└── package.json       # Root package configuration
```

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
# Install root dependencies
npm install

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
python server.py

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

## Development

The project uses a monorepo structure with separate frontend and backend directories. The frontend is built with React and Vite, while the backend uses Flask.

### Frontend Development

The frontend is located in the `frontend` directory and uses:
- React 18
- Vite as the build tool
- TypeScript for type safety
- Tailwind CSS for styling
- React Router for navigation

### Backend Development

The backend is located in the `backend` directory and uses:
- Flask for the API server
- SQLAlchemy for database operations
- JWT for authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
