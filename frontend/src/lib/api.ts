
import { supabase } from './supabase';

// Companies API
export const companiesApi = {
  async getAll() {
    const { data, error } = await supabase.from('companies').select('*');
    if (error) throw error;
    return data;
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('companies').select('*').eq('company_id', id).single();
    if (error) throw error;
    return data;
  },
  
  async create(name: string) {
    const { data, error } = await supabase.from('companies').insert({ company_name: name }).select().single();
    if (error) throw error;
    return data;
  },
  
  async update(id: string, name: string) {
    const { data, error } = await supabase.from('companies').update({ company_name: name }).eq('company_id', id).select().single();
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('companies').delete().eq('company_id', id);
    if (error) throw error;
  }
};

// Roles API
export const rolesApi = {
  async getAll() {
    const { data, error } = await supabase.from('roles').select('*, companies(*)');
    if (error) throw error;
    return data;
  },
  
  async getByCompany(companyId: string) {
    const { data, error } = await supabase.from('roles').select('*').eq('company_id', companyId);
    if (error) throw error;
    return data;
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('roles').select('*, companies(*)').eq('role_id', id).single();
    if (error) throw error;
    return data;
  },
  
  async create(role: { role_name: string, open_positions: number, company_id: string }) {
    const { data, error } = await supabase.from('roles').insert(role).select().single();
    if (error) throw error;
    return data;
  },
  
  async update(id: string, role: { role_name?: string, open_positions?: number, company_id?: string }) {
    const { data, error } = await supabase.from('roles').update(role).eq('role_id', id).select().single();
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('roles').delete().eq('role_id', id);
    if (error) throw error;
  }
};

// Skills API
export const skillsApi = {
  async getAll() {
    const { data, error } = await supabase.from('skills').select('*');
    if (error) throw error;
    return data;
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('skills').select('*').eq('skill_id', id).single();
    if (error) throw error;
    return data;
  },
  
  async create(name: string) {
    const { data, error } = await supabase.from('skills').insert({ skill_name: name }).select().single();
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('skills').delete().eq('skill_id', id);
    if (error) throw error;
  }
};

// Users API
export const usersApi = {
  async getAll() {
    const { data, error } = await supabase.from('users').select('*, companies(*)');
    if (error) throw error;
    return data;
  },
  
  async getInterviewers() {
    const { data, error } = await supabase.from('users').select('*, companies(*)').eq('role', 'Interviewer');
    if (error) throw error;
    return data;
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('users').select('*, companies(*)').eq('user_id', id).single();
    if (error) throw error;
    return data;
  },
  
  async create(user: { username: string, password_hash: string, role: string, company_id?: string }) {
    const { data, error } = await supabase.from('users').insert(user).select().single();
    if (error) throw error;
    return data;
  },
  
  async update(id: string, user: { username?: string, password_hash?: string, role?: string, company_id?: string }) {
    const { data, error } = await supabase.from('users').update(user).eq('user_id', id).select().single();
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('users').delete().eq('user_id', id);
    if (error) throw error;
  }
};

// Candidates API
export const candidatesApi = {
  async getAll() {
    const { data, error } = await supabase.from('candidates').select('*');
    if (error) throw error;
    return data;
  },
  
  async getById(id: string) {
    const { data, error } = await supabase.from('candidates').select('*').eq('candidate_id', id).single();
    if (error) throw error;
    return data;
  },
  
  async create(candidate: { candidate_name: string, email: string }) {
    const { data, error } = await supabase.from('candidates').insert(candidate).select().single();
    if (error) throw error;
    return data;
  },
  
  async update(id: string, candidate: { candidate_name?: string, email?: string }) {
    const { data, error } = await supabase.from('candidates').update(candidate).eq('candidate_id', id).select().single();
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('candidates').delete().eq('candidate_id', id);
    if (error) throw error;
  }
};

// Applications API
export const applicationsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('applications')
      .select('*');
    if (error) throw error;
    return data;
  },
  
  async getById(id: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('application_id', id)
      .single();
    if (error) throw error;
    return data;
  },
  
  async getByCandidate(candidateId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('candidate_id', candidateId);
    if (error) throw error;
    return data;
  },
  
  async create(application: { candidate_id: string, role_id: string, application_status: string }) {
    const { data, error } = await supabase.from('applications').insert(application).select().single();
    if (error) throw error;
    return data;
  },
  
  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('applications')
      .update({ application_status: status })
      .eq('application_id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const { error } = await supabase.from('applications').delete().eq('application_id', id);
    if (error) throw error;
  }
};

// Note: The interviewsApi functions have been removed since they're now 
// handled via the Flask backend in src/lib/api/interviews.ts

// Role Skills API
export const roleSkillsApi = {
  async getByRole(roleId: string) {
    const { data, error } = await supabase
      .from('role_skills')
      .select('*, skills(*)')
      .eq('role_id', roleId);
    if (error) throw error;
    return data;
  },
  
  async addSkillToRole(roleId: string, skillId: string) {
    const { data, error } = await supabase
      .from('role_skills')
      .insert({ role_id: roleId, skill_id: skillId })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async removeSkillFromRole(roleId: string, skillId: string) {
    const { error } = await supabase
      .from('role_skills')
      .delete()
      .eq('role_id', roleId)
      .eq('skill_id', skillId);
    if (error) throw error;
  }
};

// Interviewer Skills API
export const interviewerSkillsApi = {
  async getByInterviewer(userId: string) {
    const { data, error } = await supabase
      .from('interviewer_skills')
      .select('*, skills(*)')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },
  
  async addSkillToInterviewer(userId: string, skillId: string) {
    const { data, error } = await supabase
      .from('interviewer_skills')
      .insert({ user_id: userId, skill_id: skillId })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async removeSkillFromInterviewer(userId: string, skillId: string) {
    const { error } = await supabase
      .from('interviewer_skills')
      .delete()
      .eq('user_id', userId)
      .eq('skill_id', skillId);
    if (error) throw error;
  },
  
  async findInterviewersBySkill(skillId: string) {
    const { data, error } = await supabase
      .from('interviewer_skills')
      .select('*, users(*)')
      .eq('skill_id', skillId);
    if (error) throw error;
    return data;
  }
};

// Helper function to find interviewers with matching skills for a role
export async function findInterviewersForRole(roleId: string) {
  // Get the skills required for the role
  const roleSkills = await roleSkillsApi.getByRole(roleId);
  const skillIds = roleSkills.map(rs => rs.skill_id);
  
  // If no skills are required, return empty array
  if (skillIds.length === 0) return [];
  
  // Find interviewers with any of these skills
  const { data, error } = await supabase
    .from('interviewer_skills')
    .select('user_id')
    .in('skill_id', skillIds);
    
  if (error) throw error;
  
  // Get unique interviewer IDs
  const interviewerIds = [...new Set(data.map(item => item.user_id))];
  
  // Fetch full interviewer details
  if (interviewerIds.length === 0) return [];
  
  const { data: interviewers, error: interviewersError } = await supabase
    .from('users')
    .select('*')
    .in('user_id', interviewerIds)
    .eq('role', 'Interviewer');
    
  if (interviewersError) throw interviewersError;
  
  return interviewers;
}
