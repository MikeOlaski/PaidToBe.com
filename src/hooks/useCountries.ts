import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Country } from "@/data/countries";

function mapCountry(raw: any): Country {
  return {
    id: raw.id,
    name: raw.name,
    flag: raw.flag,
    region: raw.region,
    population: raw.population,
    gdpPerCapita: Number(raw.gdp_per_capita),
    politicalSystem: raw.political_system,
    readinessScore: Number(raw.readiness_score),
    ubiStatus: raw.ubi_status,
    safetyNetStrength: Number(raw.safety_net_strength),
    healthcareScore: Number(raw.healthcare_score),
    visaAccessibility: Number(raw.visa_accessibility),
    policyMomentum: Number(raw.policy_momentum),
    economicCapacity: Number(raw.economic_capacity),
    politicalWill: Number(raw.political_will),
    expatAccessibility: Number(raw.expat_accessibility),
    workforceVulnerability: Number(raw.workforce_vulnerability),
    topIndustries: raw.top_industries || [],
    costOfLiving: raw.cost_of_living,
    dualCitizenship: raw.dual_citizenship,
    keyPolicies: raw.key_policies || [],
    summary: raw.summary,
    visaTypes: raw.visa_types || [],
    taxImplications: raw.tax_implications,
    petitionLinks: raw.petition_links || [],
    policyTimeline: raw.policy_timeline || [],
    costOfLivingIndex: Number(raw.cost_of_living_index),
    annualCashTransfer: Number(raw.annual_cash_transfer),
    annualCashTransferLocal: raw.annual_cash_transfer_local,
    costOfThrivingIndex: Number(raw.cost_of_thriving_index),
    averageAnnualIncome: Number(raw.average_annual_income),
    thrivingTarget: Number(raw.thriving_target),
  };
}

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .order("readiness_score", { ascending: false });

      if (error) throw error;
      return (data || []).map(mapCountry);
    },
  });
}

export function useCountry(id: string | undefined) {
  return useQuery({
    queryKey: ["country", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return mapCountry(data);
    },
    enabled: !!id,
  });
}
