
import { supabase, uploadResume } from '../supabase';
import { format, isValid, parseISO } from 'date-fns';
import * as z from 'zod';

// Define validation schema for the interview form
export const interviewFormSchema = z.object({
  candidateName: z.string().min(2, {
    message: "Candidate name must be at least 2 characters.",
  }),
  interviewer: z.string({
    required_error: "Please select an interviewer.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  }),
  format: z.string({
    required_error: "Please select an interview format.",
  }),
  jobRole: z.string().min(2, {
    message: "Job role must be at least 2 characters.",
  }),
  useQuestionBank: z.boolean().default(false),
});

// Define the type for interviewData based on the schema
export type InterviewFormData = z.infer<typeof interviewFormSchema>;

// Interface for the interview data to be stored in Supabase
interface InterviewData {
  candidate_name: string;
  interviewer_name: string;
  scheduled_at: string;
  duration_minutes: number;
  format: string;
  job_role: string;
  status: string;
  feedback_submitted: string;
  resume_url?: string;
  use_question_bank: boolean;
}

// Function to create a new interview in Supabase
export const createInterview = async (
  formData: InterviewFormData, 
  resumeFile?: File | null
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // Validate the form data
    const validatedData = interviewFormSchema.parse(formData);
    
    // Check if date is valid and in the future
    const currentDate = new Date();
    if (validatedData.date < currentDate && validatedData.date.setHours(0,0,0,0) !== currentDate.setHours(0,0,0,0)) {
      return { 
        success: false, 
        error: "Interview date must be today or in the future." 
      };
    }
    
    // Validate time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(validatedData.time)) {
      return { 
        success: false, 
        error: "Time must be in a valid format (HH:MM)." 
      };
    }
    
    // Parse duration to number
    const durationMinutes = parseInt(validatedData.duration);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      return { 
        success: false, 
        error: "Duration must be a positive number." 
      };
    }
    
    // Combine date and time into a timestamp
    const dateTimeString = `${format(validatedData.date, "yyyy-MM-dd")}T${validatedData.time}:00`;
    const scheduledAt = new Date(dateTimeString).toISOString();
    
    // Upload resume if provided
    let resumeUrl: string | null = null;
    if (resumeFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
        return { 
          success: false, 
          error: "Resume must be a PDF, DOC, or DOCX file." 
        };
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (resumeFile.size > maxSize) {
        return { 
          success: false, 
          error: "Resume file size must not exceed 10MB." 
        };
      }
      
      // Upload file to Supabase Storage
      resumeUrl = await uploadResume(resumeFile, validatedData.candidateName);
    }
    
    // Prepare data for Supabase
    const interviewData: InterviewData = {
      candidate_name: validatedData.candidateName,
      interviewer_name: validatedData.interviewer,
      scheduled_at: scheduledAt,
      duration_minutes: durationMinutes,
      format: validatedData.format,
      job_role: validatedData.jobRole,
      status: "Scheduled",
      feedback_submitted: "No",
      use_question_bank: validatedData.useQuestionBank,
    };
    
    // Add resume URL if available
    if (resumeUrl) {
      interviewData.resume_url = resumeUrl;
    }
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('interviews')
      .insert(interviewData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating interview:", error);
      return { 
        success: false, 
        error: error.message 
      };
    }
    
    return { 
      success: true, 
      data 
    };
  } catch (error) {
    console.error("Error in createInterview:", error);
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const issues = error.issues.map(issue => issue.message).join(", ");
      return { 
        success: false, 
        error: `Validation error: ${issues}` 
      };
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};

// Function to get all interviews
export const getInterviews = async () => {
  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .order('scheduled_at', { ascending: true });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch interviews" 
    };
  }
};

// Function to get a specific interview by ID
export const getInterviewById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching interview with ID ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch interview" 
    };
  }
};

// Function to update an interview
export const updateInterview = async (id: string, updateData: Partial<InterviewData>) => {
  try {
    const { data, error } = await supabase
      .from('interviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error(`Error updating interview with ID ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update interview" 
    };
  }
};

// Function to delete an interview
export const deleteInterview = async (id: string) => {
  try {
    const { error } = await supabase
      .from('interviews')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error(`Error deleting interview with ID ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete interview" 
    };
  }
};
