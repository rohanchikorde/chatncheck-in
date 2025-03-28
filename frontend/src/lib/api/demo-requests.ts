
/**
 * API functions for demo requests
 */

export interface DemoRequestData {
  first_name: string;
  last_name: string;
  work_email: string;
  phone_number?: string | null;
  service_interest?: string | null;
  message?: string | null;
  agrees_to_terms: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Create a new demo request
 */
export const createDemoRequest = async (data: DemoRequestData): Promise<{success: boolean; data?: any; error?: string}> => {
  try {
    const response = await fetch(`${API_URL}/api/demo-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || responseData.error || 'Failed to create demo request');
    }

    return { 
      success: true, 
      data: responseData.data
    };
  } catch (error) {
    console.error('API error in createDemoRequest:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Get all demo requests
 */
export const getDemoRequests = async (): Promise<{success: boolean; data?: any; error?: string}> => {
  try {
    const response = await fetch(`${API_URL}/api/demo-requests`);
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || responseData.error || 'Failed to fetch demo requests');
    }

    return { 
      success: true, 
      data: responseData.data
    };
  } catch (error) {
    console.error('API error in getDemoRequests:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
