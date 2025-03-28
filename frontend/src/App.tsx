import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookDemoPage from './pages/BookDemoPage';
import RequestDemoPage from './pages/RequestDemoPage';
import DemoScheduledPage from './pages/DemoScheduledPage';
import EnterpriseSolutionsPage from './pages/solutions/EnterpriseSolutionsPage';
import ITServicesPage from './pages/solutions/ITServicesPage';
import StaffingSolutionsPage from './pages/solutions/StaffingSolutionsPage';
import StartupSolutionsPage from './pages/solutions/StartupSolutionsPage';
import EducationSolutionsPage from './pages/solutions/EducationSolutionsPage';
import Shell from './components/layout/Shell';
import AdminDashboard from './pages/admin/AdminDashboard';
import InterviewsPage from './pages/admin/InterviewsPage';
import InterviewDetailPage from './pages/admin/InterviewDetailPage';
import UsersPage from './pages/admin/UsersPage';
import DemoRequestsPage from './pages/admin/DemoRequestsPage';
import InterviewerDashboard from './pages/interviewer/InterviewerDashboard';
import InterviewerInterviewsPage from './pages/interviewer/InterviewerInterviewsPage';
import InterviewerFeedbackPage from './pages/interviewer/InterviewerFeedbackPage';
import IntervieweeInterviewsPage from './pages/interviewee/IntervieweeInterviewsPage';
import IntervieweeDashboard from './pages/interviewee/IntervieweeDashboard';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-demo" element={<BookDemoPage />} />
        <Route path="/request-demo" element={<RequestDemoPage />} />
        <Route path="/demo-scheduled" element={<DemoScheduledPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Solution pages */}
        <Route path="/solutions/enterprise" element={<EnterpriseSolutionsPage />} />
        <Route path="/solutions/it-services" element={<ITServicesPage />} />
        <Route path="/solutions/staffing" element={<StaffingSolutionsPage />} />
        <Route path="/solutions/startups" element={<StartupSolutionsPage />} />
        <Route path="/solutions/education" element={<EducationSolutionsPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<Shell><Outlet /></Shell>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="interviews" element={<InterviewsPage />} />
          <Route path="interviews/:id" element={<InterviewDetailPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="demo-requests" element={<DemoRequestsPage />} />
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
