
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://ehcobpmrrtdkebphqaui.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY29icG1ycnRka2VicGhxYXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MjAyNzAsImV4cCI6MjAyMzI5NjI3MH0.Wx6H98f00YP2XAXaPJTAARNbxn6xmr25aPpw1IVZcW0';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

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
