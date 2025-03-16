
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Shell from "./components/layout/Shell";
import InterviewerInterviewsPage from "./pages/interviewer/InterviewerInterviewsPage";
import IntervieweeInterviewsPage from "./pages/interviewee/IntervieweeInterviewsPage";
import InterviewsPage from "./pages/admin/InterviewsPage";
import { seedSampleData } from "./utils/seedData";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";

function App() {
  // Seed sample data when the app first loads
  useEffect(() => {
    const initializeData = async () => {
      try {
        await seedSampleData();
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    
    initializeData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/index" element={<Index />} />
        
        {/* App routes with Shell layout */}
        <Route path="/" element={<Shell><Outlet /></Shell>}>
          {/* Default route - redirect to index */}
          <Route index element={<Navigate to="/index" replace />} />
          
          {/* Admin routes */}
          <Route path="admin/interviews" element={<InterviewsPage />} />
          
          {/* Interviewer routes */}
          <Route path="interviewer/interviews" element={<InterviewerInterviewsPage />} />
          
          {/* Interviewee routes */}
          <Route path="interviewee/interviews" element={<IntervieweeInterviewsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
