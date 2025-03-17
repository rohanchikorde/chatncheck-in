
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

// Define the API URL for interviews
const API_URL = 'http://localhost:5000/api';

// Function to create a new interview using the Flask backend
export const createInterview = async (
  formData: InterviewFormData, 
  resumeFile?: File | null
): Promise<{ success: boolean; data?: any; error?: string }> => {
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
    
    // Add resume file if provided
    if (resumeFile) {
      formDataObj.append('resume', resumeFile);
    }
    
    // Make POST request to the Flask backend
    const response = await fetch(`${API_URL}/interviews`, {
      method: 'POST',
      body: formDataObj,
    });
    
    // Parse the response
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to create interview');
    }
    
    return { 
      success: true, 
      data: result.data 
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

// Function to get all interviews from the backend
export const getInterviews = async () => {
  try {
    const response = await fetch(`${API_URL}/interviews`);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch interviews');
    }
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch interviews" 
    };
  }
};

// Function to get a specific interview by ID from the backend
export const getInterviewById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/interviews/${id}`);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch interview');
    }
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error(`Error fetching interview with ID ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch interview" 
    };
  }
};

// Function to update an interview through the backend
export const updateInterview = async (id: string, updateData: Partial<InterviewFormData>) => {
  try {
    // Format date if it exists in updateData
    let formattedData: any = { ...updateData };
    if (updateData.date) {
      formattedData.date = format(updateData.date, "yyyy-MM-dd");
    }
    
    const response = await fetch(`${API_URL}/interviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to update interview');
    }
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error(`Error updating interview with ID ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update interview" 
    };
  }
};

// Function to delete an interview through the backend
export const deleteInterview = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/interviews/${id}`, {
      method: 'DELETE',
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete interview');
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting interview with ID ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete interview" 
    };
  }
};
