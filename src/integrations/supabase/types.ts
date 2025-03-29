export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      availability: {
        Row: {
          created_at: string | null
          day_of_week: number | null
          end_time: string
          id: string
          is_recurring: boolean | null
          start_time: string
          updated_at: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: number | null
          end_time: string
          id?: string
          is_recurring?: boolean | null
          start_time: string
          updated_at?: string | null
          user_id: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number | null
          end_time?: string
          id?: string
          is_recurring?: boolean | null
          start_time?: string
          updated_at?: string | null
          user_id?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      candidate_requirements: {
        Row: {
          added_at: string | null
          added_by: string
          candidate_id: string
          current_stage: string | null
          requirement_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          added_at?: string | null
          added_by: string
          candidate_id: string
          current_stage?: string | null
          requirement_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          added_at?: string | null
          added_by?: string
          candidate_id?: string
          current_stage?: string | null
          requirement_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_requirements_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_requirements_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string | null
          created_by: string
          current_company: string | null
          current_ctc: number | null
          email: string | null
          expected_ctc: number | null
          first_name: string
          id: string
          last_name: string
          notice_period: number | null
          phone: string | null
          resume_url: string | null
          total_experience: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          current_company?: string | null
          current_ctc?: number | null
          email?: string | null
          expected_ctc?: number | null
          first_name: string
          id?: string
          last_name: string
          notice_period?: number | null
          phone?: string | null
          resume_url?: string | null
          total_experience?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          current_company?: string | null
          current_ctc?: number | null
          email?: string | null
          expected_ctc?: number | null
          first_name?: string
          id?: string
          last_name?: string
          notice_period?: number | null
          phone?: string | null
          resume_url?: string | null
          total_experience?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          contact_email: string | null
          created_at: string | null
          created_by: string | null
          id: string
          industry: string | null
          is_active: boolean | null
          name: string
          phone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
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
      feedback: {
        Row: {
          comments: string | null
          created_at: string | null
          given_by: string
          id: string
          interview_id: string | null
          rating: number | null
          requirement_id: string | null
          type: string
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          given_by: string
          id?: string
          interview_id?: string | null
          rating?: number | null
          requirement_id?: string | null
          type: string
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          given_by?: string
          id?: string
          interview_id?: string | null
          rating?: number | null
          requirement_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      interviewers: {
        Row: {
          availability: Json | null
          created_at: string | null
          email: string
          id: number
          max_interviews_per_day: number | null
          name: string
          phone: string | null
          role: string | null
          status: string | null
        }
        Insert: {
          availability?: Json | null
          created_at?: string | null
          email: string
          id?: number
          max_interviews_per_day?: number | null
          name: string
          phone?: string | null
          role?: string | null
          status?: string | null
        }
        Update: {
          availability?: Json | null
          created_at?: string | null
          email?: string
          id?: number
          max_interviews_per_day?: number | null
          name?: string
          phone?: string | null
          role?: string | null
          status?: string | null
        }
        Relationships: []
      }
      interviews: {
        Row: {
          candidate_id: string
          created_at: string | null
          created_by: string
          duration_minutes: number
          feedback: string | null
          id: string
          interviewer_id: string | null
          meeting_link: string | null
          rating: number | null
          requirement_id: string
          scheduled_time: string
          status: string
          updated_at: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          created_by: string
          duration_minutes: number
          feedback?: string | null
          id?: string
          interviewer_id?: string | null
          meeting_link?: string | null
          rating?: number | null
          requirement_id: string
          scheduled_time: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          created_by?: string
          duration_minutes?: number
          feedback?: string | null
          id?: string
          interviewer_id?: string | null
          meeting_link?: string | null
          rating?: number | null
          requirement_id?: string
          scheduled_time?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_requests: {
        Row: {
          company_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          preferred_time: string | null
          purpose: string
          rejection_reason: string | null
          requested_by: string
          requested_to: string | null
          status: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          preferred_time?: string | null
          purpose: string
          rejection_reason?: string | null
          requested_by: string
          requested_to?: string | null
          status?: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          preferred_time?: string | null
          purpose?: string
          rejection_reason?: string | null
          requested_by?: string
          requested_to?: string | null
          status?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          reference_id: string | null
          reference_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          reference_id?: string | null
          reference_type?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_items: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          interview_id: string
          payment_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          interview_id: string
          payment_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          interview_id?: string
          payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_items_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_items_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          interviewer_id: string
          payment_method: string | null
          period_end: string
          period_start: string
          processed_at: string | null
          processed_by: string | null
          status: string
          transaction_reference: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          interviewer_id: string
          payment_method?: string | null
          period_end: string
          period_start: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          transaction_reference?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          interviewer_id?: string
          payment_method?: string | null
          period_end?: string
          period_start?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          transaction_reference?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          last_name: string | null
          password_hash: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          password_hash: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          password_hash?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string | null
          id: string
          message: string
          requirement_id: string | null
          sent_at: string | null
          sent_by: string
          sent_to: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          requirement_id?: string | null
          sent_at?: string | null
          sent_by: string
          sent_to: string
          status?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          requirement_id?: string | null
          sent_at?: string | null
          sent_by?: string
          sent_to?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      requirement_skills: {
        Row: {
          requirement_id: string
          skill_id: string
        }
        Insert: {
          requirement_id: string
          skill_id: string
        }
        Update: {
          requirement_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirement_skills_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirement_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      requirements: {
        Row: {
          closed_at: string | null
          company_id: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          max_experience: number | null
          min_experience: number | null
          open_positions: number
          price_per_interview: number | null
          rejection_reason: string | null
          reviewed_by: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          company_id: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          max_experience?: number | null
          min_experience?: number | null
          open_positions: number
          price_per_interview?: number | null
          rejection_reason?: string | null
          reviewed_by?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          max_experience?: number | null
          min_experience?: number | null
          open_positions?: number
          price_per_interview?: number | null
          rejection_reason?: string | null
          reviewed_by?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requirements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
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
      interview_status: "Scheduled" | "In Progress" | "Completed" | "Canceled"
      requirement_status:
        | "Pending"
        | "Hold"
        | "Approved"
        | "Rejected"
        | "Fulfilled"
        | "Canceled"
      ticket_status: "Pending" | "Hold" | "Approved" | "Rejected" | "Escalated"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
