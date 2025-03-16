
// Type definitions for Supabase tables

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
      interviewees: {
        Row: {
          id: string
          name: string
          email: string
          role_applied: string | null
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role_applied?: string | null
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role_applied?: string | null
          organization_id?: string
          created_at?: string
        }
      }
      interviewers: {
        Row: {
          id: string
          name: string
          email: string
          specialization: string | null
          organization_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          specialization?: string | null
          organization_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          specialization?: string | null
          organization_id?: string | null
          created_at?: string
        }
      }
      interviews: {
        Row: {
          id: string
          interviewer_id: string
          interviewee_id: string
          organization_id: string
          scheduled_at: string
          status: string
          notes: string | null
          feedback_submitted: string | null
          created_at: string
        }
        Insert: {
          id?: string
          interviewer_id: string
          interviewee_id: string
          organization_id: string
          scheduled_at: string
          status?: string
          notes?: string | null
          feedback_submitted?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          interviewer_id?: string
          interviewee_id?: string
          organization_id?: string
          scheduled_at?: string
          status?: string
          notes?: string | null
          feedback_submitted?: string | null
          created_at?: string
        }
      }
      organization_admins: {
        Row: {
          id: string
          name: string
          email: string
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          organization_id?: string
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
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
