
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'

// Import layout components
import Shell from './components/layout/Shell';

// Import our pages
import Index from './pages/Index';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import InterviewsPage from './pages/admin/InterviewsPage';
import InterviewDetailPage from './pages/admin/InterviewDetailPage';
import UsersPage from './pages/admin/UsersPage';

// Interviewer pages
import InterviewerDashboard from './pages/interviewer/InterviewerDashboard';

// Interviewee pages
import IntervieweeDashboard from './pages/interviewee/IntervieweeDashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/" element={<Shell />}>
          <Route index element={<Navigate to="/admin" replace />} />
          
          {/* Admin routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/interviews" element={<InterviewsPage />} />
          <Route path="admin/interviews/:id" element={<InterviewDetailPage />} />
          <Route path="admin/users" element={<UsersPage />} />
          
          {/* Interviewer routes */}
          <Route path="interviewer" element={<InterviewerDashboard />} />
          
          {/* Interviewee routes */}
          <Route path="interviewee" element={<IntervieweeDashboard />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
