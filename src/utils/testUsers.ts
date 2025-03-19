// This file contains utility functions for test/development purposes

export const exposeDevelopmentHelpers = () => {
  // This function is a stub that might be expanded in a development environment
  // In a real app, you might add more sophisticated testing helpers here
  console.log('Development helpers exposed');
  
  return {
    // Example function that logs test user credentials for development
    logTestUsers: () => {
      console.log('Available test users:');
      console.log('- Admin: admin@example.com / password123');
      console.log('- Interviewer: interviewer@example.com / password123');
      console.log('- Interviewee: interviewee@example.com / password123');
    }
  };
};
