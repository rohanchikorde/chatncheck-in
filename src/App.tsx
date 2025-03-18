
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Shell from './components/layout/Shell';
import ProfilePage from './pages/ProfilePage';
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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { exposeDevelopmentHelpers } from './utils/testUsers';

// Protected route wrapper for routes that require authentication
const ProtectedRoute = ({ requiredRole, children }: { requiredRole?: string, children: JSX.Element }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  if (requiredRole && profile?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    switch (profile?.role) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'interviewer':
        return <Navigate to="/interviewer" />;
      case 'interviewee':
        return <Navigate to="/interviewee" />;
      default:
        return <Navigate to="/" />;
    }
  }
  
  return children;
};

const AppRoutes = () => {
  useEffect(() => {
    // Expose development helpers in development mode
    exposeDevelopmentHelpers();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Admin routes - removed duplicates */}
      <Route path="/admin" element={<Shell><Outlet /></Shell>}>
        <Route index element={
          <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="interviews" element={
          <ProtectedRoute requiredRole="admin"><InterviewsPage /></ProtectedRoute>
        } />
        <Route path="interviews/:id" element={
          <ProtectedRoute requiredRole="admin"><InterviewDetailPage /></ProtectedRoute>
        } />
        <Route path="users" element={
          <ProtectedRoute requiredRole="admin"><UsersPage /></ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute requiredRole="admin"><ProfilePage /></ProtectedRoute>
        } />
      </Route>

      {/* Interviewer routes - removed duplicates */}
      <Route path="/interviewer" element={<Shell><Outlet /></Shell>}>
        <Route index element={
          <ProtectedRoute requiredRole="interviewer"><InterviewerDashboard /></ProtectedRoute>
        } />
        <Route path="interviews" element={
          <ProtectedRoute requiredRole="interviewer"><InterviewerInterviewsPage /></ProtectedRoute>
        } />
        <Route path="feedback" element={
          <ProtectedRoute requiredRole="interviewer"><InterviewerFeedbackPage /></ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute requiredRole="interviewer"><ProfilePage /></ProtectedRoute>
        } />
      </Route>

      {/* Interviewee routes - removed duplicates */}
      <Route path="/interviewee" element={<Shell><Outlet /></Shell>}>
        <Route index element={
          <ProtectedRoute requiredRole="interviewee"><IntervieweeDashboard /></ProtectedRoute>
        } />
        <Route path="interviews" element={
          <ProtectedRoute requiredRole="interviewee"><IntervieweeInterviewsPage /></ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute requiredRole="interviewee"><ProfilePage /></ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
