
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

// Function to handle file uploads to Supabase Storage
export const uploadResume = async (file: File, candidateName: string): Promise<string | null> => {
  try {
    // Create a unique file name using candidate name and timestamp
    const timestamp = new Date().getTime();
    const fileExt = file.name.split('.').pop();
    const fileName = `${candidateName.replace(/\s+/g, '_')}_${timestamp}.${fileExt}`;
    const filePath = `resumes/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('interview-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading resume:', error);
      return null;
    }
    
    // Return the public URL for the file
    const { data: urlData } = supabase.storage
      .from('interview-documents')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in upload process:', error);
    return null;
  }
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
