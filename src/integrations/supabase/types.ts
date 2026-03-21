export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          annual_cash_transfer: number | null
          annual_cash_transfer_local: string | null
          average_annual_income: number | null
          cost_of_living: string | null
          cost_of_living_index: number | null
          cost_of_thriving_index: number | null
          created_at: string
          dual_citizenship: boolean | null
          economic_capacity: number | null
          expat_accessibility: number | null
          flag: string | null
          gdp_per_capita: number | null
          healthcare_score: number | null
          id: string
          key_policies: Json | null
          name: string
          petition_links: Json | null
          policy_momentum: number | null
          policy_timeline: Json | null
          political_system: string | null
          political_will: number | null
          population: string | null
          readiness_score: number | null
          region: string | null
          safety_net_strength: number | null
          summary: string | null
          tax_implications: string | null
          thriving_target: number | null
          top_industries: Json | null
          ubi_status: string | null
          visa_accessibility: number | null
          visa_types: Json | null
          workforce_vulnerability: number | null
        }
        Insert: {
          annual_cash_transfer?: number | null
          annual_cash_transfer_local?: string | null
          average_annual_income?: number | null
          cost_of_living?: string | null
          cost_of_living_index?: number | null
          cost_of_thriving_index?: number | null
          created_at?: string
          dual_citizenship?: boolean | null
          economic_capacity?: number | null
          expat_accessibility?: number | null
          flag?: string | null
          gdp_per_capita?: number | null
          healthcare_score?: number | null
          id: string
          key_policies?: Json | null
          name: string
          petition_links?: Json | null
          policy_momentum?: number | null
          policy_timeline?: Json | null
          political_system?: string | null
          political_will?: number | null
          population?: string | null
          readiness_score?: number | null
          region?: string | null
          safety_net_strength?: number | null
          summary?: string | null
          tax_implications?: string | null
          thriving_target?: number | null
          top_industries?: Json | null
          ubi_status?: string | null
          visa_accessibility?: number | null
          visa_types?: Json | null
          workforce_vulnerability?: number | null
        }
        Update: {
          annual_cash_transfer?: number | null
          annual_cash_transfer_local?: string | null
          average_annual_income?: number | null
          cost_of_living?: string | null
          cost_of_living_index?: number | null
          cost_of_thriving_index?: number | null
          created_at?: string
          dual_citizenship?: boolean | null
          economic_capacity?: number | null
          expat_accessibility?: number | null
          flag?: string | null
          gdp_per_capita?: number | null
          healthcare_score?: number | null
          id?: string
          key_policies?: Json | null
          name?: string
          petition_links?: Json | null
          policy_momentum?: number | null
          policy_timeline?: Json | null
          political_system?: string | null
          political_will?: number | null
          population?: string | null
          readiness_score?: number | null
          region?: string | null
          safety_net_strength?: number | null
          summary?: string | null
          tax_implications?: string | null
          thriving_target?: number | null
          top_industries?: Json | null
          ubi_status?: string | null
          visa_accessibility?: number | null
          visa_types?: Json | null
          workforce_vulnerability?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          membership: string | null
          role: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          membership?: string | null
          role?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          membership?: string | null
          role?: string | null
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
