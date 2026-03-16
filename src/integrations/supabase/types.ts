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
      countries: {
        Row: {
          id: string
          name: string
          flag: string | null
          region: string | null
          population: string | null
          gdp_per_capita: number | null
          political_system: string | null
          readiness_score: number | null
          ubi_status: string | null
          safety_net_strength: number | null
          healthcare_score: number | null
          visa_accessibility: number | null
          policy_momentum: number | null
          economic_capacity: number | null
          political_will: number | null
          expat_accessibility: number | null
          workforce_vulnerability: number | null
          top_industries: Json | null
          cost_of_living: string | null
          dual_citizenship: boolean | null
          key_policies: Json | null
          summary: string | null
          visa_types: Json | null
          tax_implications: string | null
          petition_links: Json | null
          policy_timeline: Json | null
          cost_of_living_index: number | null
          annual_cash_transfer: number | null
          annual_cash_transfer_local: string | null
          cost_of_thriving_index: number | null
          average_annual_income: number | null
          thriving_target: number | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          flag?: string | null
          region?: string | null
          population?: string | null
          gdp_per_capita?: number | null
          political_system?: string | null
          readiness_score?: number | null
          ubi_status?: string | null
          safety_net_strength?: number | null
          healthcare_score?: number | null
          visa_accessibility?: number | null
          policy_momentum?: number | null
          economic_capacity?: number | null
          political_will?: number | null
          expat_accessibility?: number | null
          workforce_vulnerability?: number | null
          top_industries?: Json | null
          cost_of_living?: string | null
          dual_citizenship?: boolean | null
          key_policies?: Json | null
          summary?: string | null
          visa_types?: Json | null
          tax_implications?: string | null
          petition_links?: Json | null
          policy_timeline?: Json | null
          cost_of_living_index?: number | null
          annual_cash_transfer?: number | null
          annual_cash_transfer_local?: string | null
          cost_of_thriving_index?: number | null
          average_annual_income?: number | null
          thriving_target?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          flag?: string | null
          region?: string | null
          population?: string | null
          gdp_per_capita?: number | null
          political_system?: string | null
          readiness_score?: number | null
          ubi_status?: string | null
          safety_net_strength?: number | null
          healthcare_score?: number | null
          visa_accessibility?: number | null
          policy_momentum?: number | null
          economic_capacity?: number | null
          political_will?: number | null
          expat_accessibility?: number | null
          workforce_vulnerability?: number | null
          top_industries?: Json | null
          cost_of_living?: string | null
          dual_citizenship?: boolean | null
          key_policies?: Json | null
          summary?: string | null
          visa_types?: Json | null
          tax_implications?: string | null
          petition_links?: Json | null
          policy_timeline?: Json | null
          cost_of_living_index?: number | null
          annual_cash_transfer?: number | null
          annual_cash_transfer_local?: string | null
          cost_of_thriving_index?: number | null
          average_annual_income?: number | null
          thriving_target?: number | null
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          membership: string | null
          role: string | null
          stripe_customer_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          membership?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          membership?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedSchema: "auth"
          }
        ]
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          country_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          country_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          country_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlists_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedSchema: "public"
          },
          {
            foreignKeyName: "watchlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedSchema: "auth"
          }
        ]
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
