
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
      demo_requests: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          phone_number: string | null
          service_interest: string | null
          work_email: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          phone_number?: string | null
          service_interest?: string | null
          work_email: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          phone_number?: string | null
          service_interest?: string | null
          work_email?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          id: string
          name: string
          industry: string | null
          phone: string | null
          contact_email: string | null
          website: string | null
          address: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          industry?: string | null
          phone?: string | null
          contact_email?: string | null
          website?: string | null
          address?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          industry?: string | null
          phone?: string | null
          contact_email?: string | null
          website?: string | null
          address?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
