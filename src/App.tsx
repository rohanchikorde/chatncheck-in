
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Shell from './components/layout/Shell';
import AdminDashboard from './pages/admin/AdminDashboard';
import InterviewsPage from './pages/admin/InterviewsPage';
import InterviewDetailPage from './pages/admin/InterviewDetailPage';
import UsersPage from './pages/admin/UsersPage';
import InterviewerDashboard from './pages/interviewer/InterviewerDashboard';
import InterviewerInterviewsPage from './pages/interviewer/InterviewerInterviewsPage';
import InterviewerFeedbackPage from './pages/interviewer/InterviewerFeedbackPage';
import IntervieweeInterviewsPage from './pages/interviewee/IntervieweeInterviewsPage';
import IntervieweeDashboard from './pages/interviewee/IntervieweeDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<Shell><Outlet /></Shell>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="interviews" element={<InterviewsPage />} />
          <Route path="interviews/:id" element={<InterviewDetailPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        {/* Interviewer routes */}
        <Route path="/interviewer" element={<Shell><Outlet /></Shell>}>
          <Route index element={<InterviewerDashboard />} />
          <Route path="dashboard" element={<InterviewerDashboard />} />
          <Route path="interviews" element={<InterviewerInterviewsPage />} />
          <Route path="feedback" element={<InterviewerFeedbackPage />} />
        </Route>

        {/* Interviewee routes */}
        <Route path="/interviewee" element={<Shell><Outlet /></Shell>}>
          <Route index element={<IntervieweeDashboard />} />
          <Route path="dashboard" element={<IntervieweeDashboard />} />
          <Route path="interviews" element={<IntervieweeInterviewsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
