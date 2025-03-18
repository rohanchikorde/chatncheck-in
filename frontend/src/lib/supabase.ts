
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://ehcobpmrrtdkebphqaui.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY29icG1ycnRka2VicGhxYXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MjAyNzAsImV4cCI6MjAyMzI5NjI3MH0.Wx6H98f00YP2XAXaPJTAARNbxn6xmr25aPpw1IVZcW0';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// User session management
export type Profile = {
  id: string;
  username: string | null;
  email: string | null;
  role: 'admin' | 'interviewer' | 'interviewee';
  full_name: string | null;
  avatar_url: string | null;
};

// Get user profile
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data as Profile;
  } catch (error) {
    console.error('Error in getProfile:', error);
    return null;
  }
};

// Update user profile
export const updateProfile = async (profile: Partial<Profile>): Promise<Profile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const updates = {
      ...profile,
      updated_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }
    
    return data as Profile;
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return null;
  }
};

// Function to create test users for development
export const createTestUsers = async () => {
  try {
    // Test interviewer
    await supabase.auth.signUp({
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
    
    // Test interviewee
    await supabase.auth.signUp({
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
    
    return true;
  } catch (error) {
    console.error('Error creating test users:', error);
    return false;
  }
};
