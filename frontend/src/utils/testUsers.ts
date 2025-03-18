
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

// Function to create test users for development
export const createTestUsers = async () => {
  try {
    // Test interviewer
    const { error: interviewerError } = await supabase.auth.signUp({
      email: 'interviewer@test.com',
      password: 'password123',
      options: {
        data: {
          role: 'interviewer',
          full_name: 'Test Interviewer',
          username: 'testinterviewer'
        }
      }
    });
    
    if (interviewerError) {
      console.error('Error creating interviewer:', interviewerError);
      toast.error(`Error creating interviewer: ${interviewerError.message}`);
    } else {
      toast.success('Test interviewer created successfully!');
    }
    
    // Test interviewee
    const { error: intervieweeError } = await supabase.auth.signUp({
      email: 'interviewee@test.com',
      password: 'password123',
      options: {
        data: {
          role: 'interviewee',
          full_name: 'Test Interviewee',
          username: 'testinterviewee'
        }
      }
    });
    
    if (intervieweeError) {
      console.error('Error creating interviewee:', intervieweeError);
      toast.error(`Error creating interviewee: ${intervieweeError.message}`);
    } else {
      toast.success('Test interviewee created successfully!');
    }
    
    return !interviewerError && !intervieweeError;
  } catch (error: any) {
    console.error('Error creating test users:', error);
    toast.error(`Error creating test users: ${error.message}`);
    return false;
  }
};

// Function to expose test user creation to the console for development
export const exposeDevelopmentHelpers = () => {
  if (process.env.NODE_ENV === 'development') {
    (window as any).createTestUsers = createTestUsers;
    console.info('Development helpers exposed. Run window.createTestUsers() to create test users.');
  }
};
