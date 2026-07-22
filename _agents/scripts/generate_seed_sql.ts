import * as fs from 'fs';
import * as path from 'path';
import { countries } from '../../src/data/countries';

function generateSql() {
  const OUTPUT_DIR = path.join(process.cwd(), 'supabase', 'migrations');
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const sqlFilePath = path.join(OUTPUT_DIR, '20240101000000_create_countries.sql');
  
  let sql = `
-- Create countries table
CREATE TABLE IF NOT EXISTS public.countries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    flag TEXT,
    region TEXT,
    population TEXT,
    gdp_per_capita NUMERIC,
    political_system TEXT,
    readiness_score NUMERIC,
    ubi_status TEXT,
    safety_net_strength NUMERIC,
    healthcare_score NUMERIC,
    visa_accessibility NUMERIC,
    policy_momentum NUMERIC,
    economic_capacity NUMERIC,
    political_will NUMERIC,
    expat_accessibility NUMERIC,
    workforce_vulnerability NUMERIC,
    top_industries JSONB,
    cost_of_living TEXT,
    dual_citizenship BOOLEAN,
    key_policies JSONB,
    summary TEXT,
    visa_types JSONB,
    tax_implications TEXT,
    petition_links JSONB,
    policy_timeline JSONB,
    cost_of_living_index NUMERIC,
    annual_cash_transfer NUMERIC,
    annual_cash_transfer_local TEXT,
    cost_of_thriving_index NUMERIC,
    average_annual_income NUMERIC,
    thriving_target NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to countries" 
ON public.countries FOR SELECT 
USING (true);

-- Insert seed data
INSERT INTO public.countries (
    id, name, flag, region, population, gdp_per_capita, political_system, 
    readiness_score, ubi_status, safety_net_strength, healthcare_score, 
    visa_accessibility, policy_momentum, economic_capacity, political_will, 
    expat_accessibility, workforce_vulnerability, top_industries, cost_of_living, 
    dual_citizenship, key_policies, summary, visa_types, tax_implications, 
    petition_links, policy_timeline, cost_of_living_index, annual_cash_transfer, 
    annual_cash_transfer_local, cost_of_thriving_index, average_annual_income, thriving_target
) VALUES
`;

  const values = countries.map(c => {
    const escape = (str: string | null | undefined) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
    const num = (n: number | null | undefined) => n !== undefined && n !== null ? n : 'NULL';
    const json = (obj: any) => `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
    const bool = (b: boolean) => b ? 'true' : 'false';

    return `(
        ${escape(c.id)}, ${escape(c.name)}, ${escape(c.flag)}, ${escape(c.region)}, ${escape(c.population)}, 
        ${num(c.gdpPerCapita)}, ${escape(c.politicalSystem)}, ${num(c.readinessScore)}, ${escape(c.ubiStatus)}, 
        ${num(c.safetyNetStrength)}, ${num(c.healthcareScore)}, ${num(c.visaAccessibility)}, ${num(c.policyMomentum)}, 
        ${num(c.economicCapacity)}, ${num(c.politicalWill)}, ${num(c.expatAccessibility)}, ${num(c.workforceVulnerability)}, 
        ${json(c.topIndustries)}, ${escape(c.costOfLiving)}, ${bool(c.dualCitizenship)}, ${json(c.keyPolicies)}, 
        ${escape(c.summary)}, ${json(c.visaTypes)}, ${escape(c.taxImplications)}, ${json(c.petitionLinks)}, 
        ${json(c.policyTimeline)}, ${num(c.costOfLivingIndex)}, ${num(c.annualCashTransfer)}, ${escape(c.annualCashTransferLocal)}, 
        ${num(c.costOfThrivingIndex)}, ${num(c.averageAnnualIncome)}, ${num(c.thrivingTarget)}
    )`;
  });

  sql += values.join(',\n') + ';\n';

  fs.writeFileSync(sqlFilePath, sql);
  console.log(`✅ Created Supabase Migration SQL file at ${sqlFilePath}`);
}

generateSql();
