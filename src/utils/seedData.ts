
// Utility to seed initial data for testing
import { supabase } from "@/integrations/supabase/client";

export const seedSampleData = async () => {
  try {
    console.log("Checking if sample data needs to be seeded...");
    
    // Check if organizations exist
    const { data: existingOrgs, error: orgsError } = await supabase
      .from('organizations')
      .select('id')
      .limit(1);
      
    if (orgsError) throw orgsError;
    
    // If there are already organizations, don't seed
    if (existingOrgs && existingOrgs.length > 0) {
      console.log("Data already exists, skipping seed");
      return;
    }
    
    console.log("No data found, seeding sample data...");
    
    // Step 1: Create sample organizations
    const { data: orgs, error: createOrgsError } = await supabase
      .from('organizations')
      .insert([
        { name: 'TechCorp' },
        { name: 'DesignHub' },
        { name: 'DataSystems' }
      ])
      .select();
      
    if (createOrgsError) throw createOrgsError;
    
    console.log("Created organizations:", orgs);
    
    if (!orgs || orgs.length === 0) {
      throw new Error("Failed to create organizations");
    }
    
    // Step 2: Create sample interviewers
    const { data: interviewers, error: interviewersError } = await supabase
      .from('interviewers')
      .insert([
        { 
          name: 'Isha Patel', 
          email: 'isha.patel@example.com',
          specialization: 'Frontend Developer',
          organization_id: orgs[0].id
        },
        { 
          name: 'Michael Chen', 
          email: 'michael.chen@example.com',
          specialization: 'UX Designer',
          organization_id: orgs[1].id
        },
        { 
          name: 'Alex Rivera', 
          email: 'alex.rivera@example.com',
          specialization: 'Product Manager',
          organization_id: orgs[2].id
        }
      ])
      .select();
      
    if (interviewersError) throw interviewersError;
    
    console.log("Created interviewers:", interviewers);
    
    // Step 3: Create sample interviewees
    const { data: interviewees, error: intervieweesError } = await supabase
      .from('interviewees')
      .insert([
        {
          name: 'Sam Patel',
          email: 'sam.patel@example.com',
          role_applied: 'Frontend Developer',
          organization_id: orgs[0].id
        },
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          role_applied: 'Backend Developer',
          organization_id: orgs[0].id
        },
        {
          name: 'Maria Garcia',
          email: 'maria.garcia@example.com',
          role_applied: 'UX Designer',
          organization_id: orgs[1].id
        }
      ])
      .select();
      
    if (intervieweesError) throw intervieweesError;
    
    console.log("Created interviewees:", interviewees);
    
    // Step 4: Create sample interviews
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const { data: interviews, error: interviewsError } = await supabase
      .from('interviews')
      .insert([
        {
          interviewer_id: interviewers[0].id,
          interviewee_id: interviewees[0].id,
          organization_id: orgs[0].id,
          scheduled_at: tomorrow.toISOString(),
          status: 'Scheduled',
          notes: 'Format: technical, Duration: 60 minutes'
        },
        {
          interviewer_id: interviewers[1].id,
          interviewee_id: interviewees[0].id,
          organization_id: orgs[1].id,
          scheduled_at: nextWeek.toISOString(),
          status: 'Scheduled',
          notes: 'Format: behavioral, Duration: 45 minutes'
        },
        {
          interviewer_id: interviewers[2].id,
          interviewee_id: interviewees[1].id,
          organization_id: orgs[2].id,
          scheduled_at: nextWeek.toISOString(),
          status: 'Scheduled',
          notes: 'Format: panel, Duration: 90 minutes'
        }
      ])
      .select();
      
    if (interviewsError) throw interviewsError;
    
    console.log("Created interviews:", interviews);
    
    // Step 5: Create sample organization admins
    const { data: orgAdmins, error: orgAdminsError } = await supabase
      .from('organization_admins')
      .insert([
        {
          name: 'Admin TechCorp',
          email: 'admin@techcorp.com',
          organization_id: orgs[0].id
        },
        {
          name: 'Admin DesignHub',
          email: 'admin@designhub.com',
          organization_id: orgs[1].id
        }
      ])
      .select();
      
    if (orgAdminsError) throw orgAdminsError;
    
    console.log("Created organization admins:", orgAdmins);
    
    console.log("Sample data seeding complete!");
    
    return {
      organizations: orgs,
      interviewers,
      interviewees,
      interviews,
      organizationAdmins: orgAdmins
    };
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
};
