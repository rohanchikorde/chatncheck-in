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

interface Interview {
  id: string;
  candidateName: string;
  interviewerName: string;
  status: string;
  scheduledTime: string;
  notes?: string;
}

// Function to create a new interview using the Flask backend
export const createInterview = async (
  formData: InterviewFormData, 
  resumeFile?: File | null
): Promise<{ success: boolean; data?: Interview; error?: string }> => {
  try {
    // Validate the form data
    const validatedData = interviewFormSchema.parse(formData);
    
    // Create FormData object for sending to the backend (needed for file upload)
    const formDataObj = new FormData();
    
    // Add all form fields to FormData
    formDataObj.append('candidateName', validatedData.candidateName);
    formDataObj.append('interviewer', validatedData.interviewer);
    formDataObj.append('date', format(validatedData.date, "yyyy-MM-dd"));
    formDataObj.append('time', validatedData.time);
    formDataObj.append('duration', validatedData.duration);
    formDataObj.append('format', validatedData.format);
    formDataObj.append('jobRole', validatedData.jobRole);
    formDataObj.append('useQuestionBank', validatedData.useQuestionBank.toString());

    if (resumeFile) {
      formDataObj.append('resume', resumeFile);
    }

    const response = await fetch('/api/interviews', {
      method: 'POST',
      body: formDataObj
    });

    if (!response.ok) {
      throw new Error('Failed to create interview');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Function to get all interviews from the backend
export const getInterviews = async (): Promise<{ success: boolean; data?: Interview[]; error?: string }> => {
  try {
    const response = await fetch('/api/interviews');
    if (!response.ok) {
      throw new Error('Failed to fetch interviews');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Function to get a specific interview by ID from the backend
export const getInterviewById = async (id: string): Promise<{ success: boolean; data?: Interview; error?: string }> => {
  try {
    const response = await fetch(`/api/interviews/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch interview');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Function to update an interview through the backend
export const updateInterview = async (id: string, updateData: Partial<Interview>): Promise<{ success: boolean; data?: Interview; error?: string }> => {
  try {
    const response = await fetch(`/api/interviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update interview');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Function to delete an interview through the backend
export const deleteInterview = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`/api/interviews/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete interview');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};
