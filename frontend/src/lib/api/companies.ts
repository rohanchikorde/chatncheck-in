
import { supabase } from "../supabase";

// Company types
export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  status: 'active' | 'inactive';
  createdAt: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
}

export interface CompanyStats {
  totalInterviews: number;
  pendingInterviews: number;
  completedInterviews: number;
  activeTeamMembers: number;
  pendingDemos: number;
}

// Get all companies
export const getCompanies = async (): Promise<Company[]> => {
  try {
    // In a real implementation, this would call the Supabase API
    // const { data, error } = await supabase
    //   .from('companies')
    //   .select('*')
    //   .order('name');
    
    // For now, we'll return mock data
    const mockCompanies = [
      {
        id: '1',
        name: 'HireSync Solutions',
        industry: 'Tech Recruitment',
        size: 'Mid-sized (200 employees)',
        status: 'active',
        createdAt: '2023-05-10T09:00:00Z',
        contactPerson: 'Jane Smith',
        email: 'jane.smith@hiresync.com',
        phone: '+1 (555) 123-4567',
      },
      {
        id: '2',
        name: 'TalentWave',
        industry: 'HR Technology',
        size: 'Enterprise (1200+ employees)',
        status: 'active',
        createdAt: '2022-11-15T14:30:00Z',
        contactPerson: 'Michael Chen',
        email: 'michael.chen@talentwave.com',
        phone: '+1 (555) 987-6543',
      },
      {
        id: '3',
        name: 'RecruitPro Solutions',
        industry: 'Recruitment',
        size: 'Small (45 employees)',
        status: 'inactive',
        createdAt: '2023-02-22T11:15:00Z',
        contactPerson: 'Alex Johnson',
        email: 'alex.j@recruitpro.com',
        phone: '+1 (555) 234-5678',
      },
      {
        id: '4',
        name: 'EduHire Academy',
        industry: 'Education',
        size: 'Mid-sized (350 employees)',
        status: 'active',
        createdAt: '2023-06-05T16:45:00Z',
        contactPerson: 'Sarah Wilson',
        email: 's.wilson@eduhire.edu',
        phone: '+1 (555) 876-5432',
      },
      {
        id: '5',
        name: 'TechTalent Inc.',
        industry: 'Technology',
        size: 'Enterprise (950 employees)',
        status: 'active',
        createdAt: '2022-09-30T10:20:00Z',
        contactPerson: 'Robert Lee',
        email: 'robert.lee@techtalent.com',
        phone: '+1 (555) 321-7890',
      },
    ];
    
    return mockCompanies as Company[];
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

// Get a single company by ID
export const getCompany = async (id: string): Promise<Company> => {
  try {
    // In a real implementation, this would call the Supabase API
    // const { data, error } = await supabase
    //   .from('companies')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // For now, we'll return mock data
    const mockCompany = {
      id,
      name: 'HireSync Solutions',
      industry: 'Tech Recruitment',
      size: 'Mid-sized (200 employees)',
      status: 'active' as const,
      createdAt: '2023-05-10T09:00:00Z',
      contactPerson: 'Jane Smith',
      email: 'jane.smith@hiresync.com',
      phone: '+1 (555) 123-4567',
      website: 'www.hiresyncsolutions.com',
      description: 'HireSync Solutions is a tech recruitment company specializing in helping tech companies find the right talent. Their mission is to streamline the hiring process, reduce time-to-hire by 30%, and improve collaboration between HR and engineering teams.',
    };
    
    return mockCompany;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};

// Get company statistics
export const getCompanyStats = async (id: string): Promise<CompanyStats> => {
  try {
    // In a real implementation, this would call a Supabase function
    // const { data, error } = await supabase
    //   .rpc('get_company_statistics', { company_id: id })
    
    // For now, we'll return mock data
    const mockStats = {
      totalInterviews: 28,
      pendingInterviews: 12,
      completedInterviews: 16,
      activeTeamMembers: 8,
      pendingDemos: 3,
    };
    
    return mockStats;
  } catch (error) {
    console.error('Error fetching company stats:', error);
    throw error;
  }
};

// Create a new company
export const createCompany = async (company: Omit<Company, 'id' | 'createdAt'>): Promise<Company> => {
  try {
    // In a real implementation, this would call the Supabase API
    // const { data, error } = await supabase
    //   .from('companies')
    //   .insert([{
    //     ...company,
    //     created_at: new Date().toISOString(),
    //   }])
    //   .select()
    //   .single();
    
    // For now, we'll return mock data
    const mockCompany = {
      id: Math.random().toString(36).substring(2, 11),
      ...company,
      createdAt: new Date().toISOString(),
    };
    
    return mockCompany;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

// Update a company
export const updateCompany = async (id: string, updates: Partial<Company>): Promise<Company> => {
  try {
    // In a real implementation, this would call the Supabase API
    // const { data, error } = await supabase
    //   .from('companies')
    //   .update(updates)
    //   .eq('id', id)
    //   .select()
    //   .single();
    
    // For now, we'll return mock data
    const mockCompany = await getCompany(id);
    const updatedCompany = {
      ...mockCompany,
      ...updates,
    };
    
    return updatedCompany;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};

// Delete a company
export const deleteCompany = async (id: string): Promise<void> => {
  try {
    // In a real implementation, this would call the Supabase API
    // const { error } = await supabase
    //   .from('companies')
    //   .delete()
    //   .eq('id', id);
    
    // For now, we'll just log the deletion
    console.log(`Company ${id} deleted`);
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};
