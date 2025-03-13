
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Shell from "./components/layout/Shell";

// Import pages
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import IntervieweeDashboard from "./pages/interviewee/IntervieweeDashboard";
import NotFound from "./pages/NotFound";

// Create a layout wrapper component
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Don't apply shell to landing page
  if (location.pathname === '/') {
    return <>{children}</>;
  }
  
  return <Shell>{children}</Shell>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/admin" element={
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            } />
            <Route path="/admin/interviews" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Interviews</h1>
                  <p>This page would list all interviews.</p>
                </div>
              </PageWrapper>
            } />
            <Route path="/admin/users" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
                  <p>This page would manage users.</p>
                </div>
              </PageWrapper>
            } />
            <Route path="/admin/settings" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                  <p>Admin settings would go here.</p>
                </div>
              </PageWrapper>
            } />
            
            <Route path="/interviewer" element={
              <PageWrapper>
                <InterviewerDashboard />
              </PageWrapper>
            } />
            <Route path="/interviewer/interviews" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">My Interviews</h1>
                  <p>This page would list all your interviews.</p>
                </div>
              </PageWrapper>
            } />
            <Route path="/interviewer/feedback" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Feedback</h1>
                  <p>This page would show feedback you've provided.</p>
                </div>
              </PageWrapper>
            } />
            <Route path="/interviewer/settings" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                  <p>Interviewer settings would go here.</p>
                </div>
              </PageWrapper>
            } />
            
            <Route path="/interviewee" element={
              <PageWrapper>
                <IntervieweeDashboard />
              </PageWrapper>
            } />
            <Route path="/interviewee/interviews" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">My Interviews</h1>
                  <p>This page would list all your upcoming and past interviews.</p>
                </div>
              </PageWrapper>
            } />
            <Route path="/interviewee/feedback" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Feedback</h1>
                  <p>This page would show feedback you've received.</p>
                </div>
              </PageWrapper>
            } />
            <Route path="/interviewee/settings" element={
              <PageWrapper>
                <div className="space-y-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                  <p>Interviewee settings would go here.</p>
                </div>
              </PageWrapper>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
