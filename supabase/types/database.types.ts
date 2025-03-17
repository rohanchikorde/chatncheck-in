
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          company_id: string
          company_name: string
        }
        Insert: {
          company_id?: string
          company_name: string
        }
        Update: {
          company_id?: string
          company_name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          skill_id: string
          skill_name: string
        }
        Insert: {
          skill_id?: string
          skill_name: string
        }
        Update: {
          skill_id?: string
          skill_name?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          role_id: string
          role_name: string
          open_positions: number
          company_id: string
        }
        Insert: {
          role_id?: string
          role_name: string
          open_positions: number
          company_id: string
        }
        Update: {
          role_id?: string
          role_name?: string
          open_positions?: number
          company_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          }
        ]
      }
      role_skills: {
        Row: {
          role_id: string
          skill_id: string
        }
        Insert: {
          role_id: string
          skill_id: string
        }
        Update: {
          role_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_skills_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "role_skills_skill_id_fkey"
            columns: ["skill_id"]
            referencedRelation: "skills"
            referencedColumns: ["skill_id"]
          }
        ]
      }
      users: {
        Row: {
          user_id: string
          username: string
          password_hash: string
          role: string
          company_id: string | null
        }
        Insert: {
          user_id?: string
          username: string
          password_hash: string
          role: string
          company_id?: string | null
        }
        Update: {
          user_id?: string
          username?: string
          password_hash?: string
          role?: string
          company_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          }
        ]
      }
      interviewer_skills: {
        Row: {
          user_id: string
          skill_id: string
        }
        Insert: {
          user_id: string
          skill_id: string
        }
        Update: {
          user_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviewer_skills_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interviewer_skills_skill_id_fkey"
            columns: ["skill_id"]
            referencedRelation: "skills"
            referencedColumns: ["skill_id"]
          }
        ]
      }
      candidates: {
        Row: {
          candidate_id: string
          candidate_name: string
          email: string
        }
        Insert: {
          candidate_id?: string
          candidate_name: string
          email: string
        }
        Update: {
          candidate_id?: string
          candidate_name?: string
          email?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          application_id: string
          candidate_id: string
          role_id: string
          application_status: string
        }
        Insert: {
          application_id?: string
          candidate_id: string
          role_id: string
          application_status: string
        }
        Update: {
          application_id?: string
          candidate_id?: string
          role_id?: string
          application_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            referencedRelation: "candidates"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "applications_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          }
        ]
      }
      interviews: {
        Row: {
          id: string
          candidate_name: string
          interviewer_name: string
          scheduled_at: string
          duration_minutes: number
          format: string
          job_role: string
          status: string
          feedback_submitted: string
          resume_url: string | null
          use_question_bank: boolean
          created_at: string
        }
        Insert: {
          id?: string
          candidate_name: string
          interviewer_name: string
          scheduled_at: string
          duration_minutes: number
          format: string
          job_role: string
          status: string
          feedback_submitted?: string
          resume_url?: string | null
          use_question_bank?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          candidate_name?: string
          interviewer_name?: string
          scheduled_at?: string
          duration_minutes?: number
          format?: string
          job_role?: string
          status?: string
          feedback_submitted?: string
          resume_url?: string | null
          use_question_bank?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
