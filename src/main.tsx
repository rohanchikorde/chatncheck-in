
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'

// Import components for routes
import InterviewsPage from './pages/admin/InterviewsPage';
import InterviewDetailPage from './pages/admin/InterviewDetailPage';
import UsersPage from './pages/admin/UsersPage';
import Shell from './components/layout/Shell';
import AdminDashboard from './pages/admin/AdminDashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Shell><AdminDashboard /></Shell>} />
        <Route path="/admin/interviews" element={<Shell><InterviewsPage /></Shell>} />
        <Route path="/admin/interviews/:id" element={<Shell><InterviewDetailPage /></Shell>} />
        <Route path="/admin/users" element={<Shell><UsersPage /></Shell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
