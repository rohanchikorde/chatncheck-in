import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import our new component for routes
import InterviewsPage from './pages/admin/InterviewsPage';
import InterviewDetailPage from './pages/admin/InterviewDetailPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
