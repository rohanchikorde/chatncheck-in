
import { supabase } from '@/integrations/supabase/client';

// Types
export interface Interviewer {
  id?: string;
  name: string;
  email: string;
  specialization?: string;
  organization_id?: string;
  created_at?: string;
}

export interface Interviewee {
  id?: string;
  name: string;
  email: string;
  role_applied?: string;
  organization_id: string;
  created_at?: string;
}

export interface Interview {
  id?: string;
  interviewer_id: string;
  interviewee_id: string;
  organization_id: string;
  scheduled_at: string;
  status: string;
  notes?: string;
  feedback_submitted?: string;
  created_at?: string;
}

export interface Organization {
  id?: string;
  name: string;
  created_at?: string;
}

export interface OrganizationAdmin {
  id?: string;
  organization_id: string;
  name: string;
  email: string;
  created_at?: string;
}

// Organizations
export const getOrganizations = async () => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getOrganizationById = async (id: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createOrganization = async (organization: Organization) => {
  const { data, error } = await supabase
    .from('organizations')
    .insert([organization])
    .select();
  
  if (error) throw error;
  return data[0];
};

// Interviewers
export const getInterviewers = async () => {
  const { data, error } = await supabase
    .from('interviewers')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getInterviewerById = async (id: string) => {
  const { data, error } = await supabase
    .from('interviewers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createInterviewer = async (interviewer: Interviewer) => {
  const { data, error } = await supabase
    .from('interviewers')
    .insert([interviewer])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateInterviewer = async (id: string, updates: Partial<Interviewer>) => {
  const { data, error } = await supabase
    .from('interviewers')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

// Interviewees
export const getInterviewees = async () => {
  const { data, error } = await supabase
    .from('interviewees')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getIntervieweeById = async (id: string) => {
  const { data, error } = await supabase
    .from('interviewees')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createInterviewee = async (interviewee: Interviewee) => {
  const { data, error } = await supabase
    .from('interviewees')
    .insert([interviewee])
    .select();
  
  if (error) throw error;
  return data[0];
};

// Interviews
export const getInterviews = async () => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getInterviewById = async (id: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createInterview = async (interview: Interview) => {
  const { data, error } = await supabase
    .from('interviews')
    .insert([interview])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateInterview = async (id: string, updates: Partial<Interview>) => {
  const { data, error } = await supabase
    .from('interviews')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteInterview = async (id: string) => {
  const { error } = await supabase
    .from('interviews')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

export const getInterviewsByInterviewer = async (interviewerId: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('interviewer_id', interviewerId);
  
  if (error) throw error;
  return data;
};

export const getInterviewsByInterviewee = async (intervieweeId: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('interviewee_id', intervieweeId);
  
  if (error) throw error;
  return data;
};

// Organization Admins
export const getOrganizationAdmins = async (organizationId: string) => {
  const { data, error } = await supabase
    .from('organization_admins')
    .select('*')
    .eq('organization_id', organizationId);
  
  if (error) throw error;
  return data;
};

export const createOrganizationAdmin = async (admin: OrganizationAdmin) => {
  const { data, error } = await supabase
    .from('organization_admins')
    .insert([admin])
    .select();
  
  if (error) throw error;
  return data[0];
};
