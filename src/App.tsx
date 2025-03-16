// Keep the existing imports and add the seed data function
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Shell from "./components/layout/Shell";
import InterviewerInterviewsPage from "./pages/interviewer/InterviewerInterviewsPage";
import IntervieweeInterviewsPage from "./pages/interviewee/IntervieweeInterviewsPage";
import InterviewsPage from "./pages/admin/InterviewsPage";
import { seedSampleData } from "./utils/seedData"; // Add this import

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
        <Route path="/" element={<Shell />}>
          <Route path="admin/interviews" element={<InterviewsPage />} />
          <Route path="interviewer/interviews" element={<InterviewerInterviewsPage />} />
          <Route path="interviewee/interviews" element={<IntervieweeInterviewsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
