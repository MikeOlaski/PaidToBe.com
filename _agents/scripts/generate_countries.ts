import fs from 'fs';
import path from 'path';

// Note: To run this script, you will need to install `@anthropic-ai/sdk` and `dotenv`
// npm install @anthropic-ai/sdk dotenv
import Anthropic from '@anthropic-ai/sdk';

// This script acts as the "Intelligence Agent" tasked with bootstrapping the remaining
// ~167 global countries with hallucinated/researched PaidToBe metrics.
// It fetches a list of all countries, filters out our existing 28 seed countries,
// and queries the LLM to generate the specialized data objects.

const SEED_COUNTRIES = [
  "Finland", "Denmark", "Sweden", "Norway", "Netherlands", "Germany", "Spain",
  "Portugal", "Switzerland", "United Kingdom", "Ireland", "Estonia", "Iceland",
  "Canada", "United States", "Brazil", "Costa Rica", "Uruguay", "South Korea",
  "Singapore", "Japan", "Taiwan", "India", "United Arab Emirates", "Kenya",
  "New Zealand", "Australia"
];

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Set this in your local .env file
});

async function fetchAllCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,region,population,flags');
  const data = await response.json();
  return data
    .filter((c: any) => !SEED_COUNTRIES.includes(c.name.common) && !SEED_COUNTRIES.includes(c.name.official))
    .map((c: any) => ({
      name: c.name.common,
      region: c.region,
      population: c.population >= 1000000 ? `${(c.population / 1000000).toFixed(1)}M` : `${(c.population / 1000).toFixed(0)}K`,
      flag: c.flags.emoji || '🏳️',
    }));
}

const SYSTEM_PROMPT = `You are the Data Intelligence Agent for PaidToBe, a platform ranking countries on their readiness for a post-AI labor economy. 
Your task is to generate realistic, accurate or highly educated estimates for the given country based on this TypeScript schema.
Ensure your response is valid JSON output matching this interface:

interface GeneratedCountryData {
  gdpPerCapita: number; // USD integer
  politicalSystem: string; // e.g., "Federal Republic", "Constitutional Monarchy"
  readinessScore: number; // 0.0 to 10.0 scale, 1 decimal place. High AI resilience/UBI readiness = High score.
  safetyNetStrength: number; // 0.0 to 10.0
  healthcareScore: number; // 0.0 to 10.0
  visaAccessibility: number; // 0.0 to 10.0
  policyMomentum: number; // 0.0 to 10.0
  economicCapacity: number; // 0.0 to 10.0
  politicalWill: number; // 0.0 to 10.0
  expatAccessibility: number; // 0.0 to 10.0
  workforceVulnerability: number; // 0.0 to 10.0. High = more at risk of AI disruption.
  ubiStatus: "Active Pilot" | "Proposed" | "Exploring" | "None";
  topIndustries: string[]; // 3-4 strings
  costOfLiving: "Very High" | "High" | "Moderate" | "Low" | "Very Low";
  dualCitizenship: boolean;
  keyPolicies: string[]; // 2-3 bullet points
  summary: string; // 2 paragraphs on the country's AI resilience and social safety net
  visaTypes: string[]; // 2-4 strings (e.g., "Digital Nomad", "Startup Visa", "Tourist")
  taxImplications: string; // 1-2 sentences on tax rules mapping into their social policies
  policyTimeline: { year: number; title: string; description: string; type: "pilot" | "proposal" | "legislation" | "outcome" }[]; // 1-3 policy events, can be past or highly plausible near-future projections.
}`;

async function generateCountryData(countryName: string): Promise<any> {
  console.log(`🧠 Hallucinating/researching PaidToBe indices for: ${countryName}...`);
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      temperature: 0.2, // Low temp for more factual/grounded data
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate the JSON data for: ${countryName}`,
        },
      ],
    });
    
    // Parse the JSON block out of the response
    const content = (response.content[0] as any).text;
    const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error(`❌ Error generating data for ${countryName}:`, error);
    return null;
  }
}

async function main() {
  console.log("🌍 Fetching global country list from RESTCountries API...");
  const rawCountries = await fetchAllCountries();
  console.log(`Found ${rawCountries.length} countries not currently in the seed list.`);
  
  // Create output directories
  const OUTPUT_DIR = path.join(process.cwd(), '_agents', 'data_output');
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  // Set up SQL insert statement generation file
  const sqlFilePath = path.join(OUTPUT_DIR, '01_countries_bulk_insert.sql');
  fs.writeFileSync(sqlFilePath, '-- PaidToBe Massive Country Bulk Insert\\n\\nINSERT INTO countries (id, name, flag, region, population, gdp_per_capita, political_system, readiness_score, safety_net_strength, healthcare_score, visa_accessibility, policy_momentum, economic_capacity, political_will, expat_accessibility, workforce_vulnerability, ubi_status, top_industries, cost_of_living, dual_citizenship, key_policies, summary, visa_types, tax_implications, policy_timeline)\\nVALUES\\n');
  
  const allResults = [];
  
  // NOTE: In production, batch these to avoid rate-limiting! 
  // We're just looping sequentially here for demonstration.
  for (let i = 0; i < Math.min(rawCountries.length, 5); i++) { // JUST RUNNING 5 FOR TESTING
    const baseObj = rawCountries[i];
    const generatedData = await generateCountryData(baseObj.name);
    
    if (generatedData) {
      const slug = baseObj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const finalObj = {
        id: slug,
        ...baseObj,
        ...generatedData,
      };
      allResults.push(finalObj);
      
      // Build the SQL tuple string here...
      const sqlTuple = `('${finalObj.id}', '${finalObj.name.replace(/'/g, "''")}', '${finalObj.flag}', '${finalObj.region}', '${finalObj.population}', ${finalObj.gdpPerCapita}, '${finalObj.politicalSystem}', ${finalObj.readinessScore}, ${finalObj.safetyNetStrength}, ${finalObj.healthcareScore}, ${finalObj.visaAccessibility}, ${finalObj.policyMomentum}, ${finalObj.economicCapacity}, ${finalObj.politicalWill}, ${finalObj.expatAccessibility}, ${finalObj.workforceVulnerability}, '${finalObj.ubiStatus}', '${JSON.stringify(finalObj.topIndustries).replace(/'/g, "''")}'::jsonb, '${finalObj.costOfLiving}', ${finalObj.dualCitizenship}, '${JSON.stringify(finalObj.keyPolicies).replace(/'/g, "''")}'::jsonb, '${finalObj.summary.replace(/'/g, "''")}', '${JSON.stringify(finalObj.visaTypes).replace(/'/g, "''")}'::jsonb, '${finalObj.taxImplications.replace(/'/g, "''")}', '${JSON.stringify(finalObj.policyTimeline).replace(/'/g, "''")}'::jsonb),\n`;
      
      fs.appendFileSync(sqlFilePath, sqlTuple);
      console.log(`✅ Finished ${baseObj.name}`);
    }
    
    // Quick delay to avoid Anthropic API rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save full JSON backup
  fs.writeFileSync(path.join(OUTPUT_DIR, 'raw_countries_generation.json'), JSON.stringify(allResults, null, 2));
  console.log(`\\n🎉 Completed! SQL file written to: ${sqlFilePath}`);
}

main();
