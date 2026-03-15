# PaidToBe — Data Model

## Core Types

### Country
The primary entity. Currently stored as static TypeScript data; will migrate to Supabase in Phase 2.

```typescript
interface Country {
  id: string;                    // URL-safe slug ("finland", "south-korea")
  name: string;                  // Display name
  flag: string;                  // Emoji flag
  region: Region;                // Geographic region
  population: string;            // Human-readable ("5.5M")
  gdpPerCapita: number;          // USD
  politicalSystem: string;       // Description
  
  // Scores (0-10 scale)
  readinessScore: number;        // Composite score
  safetyNetStrength: number;     // Existing social safety net quality
  healthcareScore: number;       // Healthcare accessibility & quality
  visaAccessibility: number;     // Ease of immigration
  policyMomentum: number;        // Rate of policy progress
  economicCapacity: number;      // Ability to fund programs
  politicalWill: number;         // Government/public support
  expatAccessibility: number;    // Overall expat-friendliness
  workforceVulnerability: number; // AI disruption exposure
  
  // Categorization
  ubiStatus: UBIStatus;          // "Active Pilot" | "Proposed" | "Exploring" | "None"
  topIndustries: string[];
  costOfLiving: string;
  dualCitizenship: boolean;
  
  // Content
  keyPolicies: string[];
  summary: string;               // 2-3 paragraph overview
  visaTypes: string[];
  taxImplications: string;
  petitionLinks: string[];
  policyTimeline: PolicyEvent[];
}
```

### PolicyEvent
Timeline entries for each country's policy history.

```typescript
interface PolicyEvent {
  year: number;
  title: string;
  description: string;
  type: "pilot" | "proposal" | "legislation" | "outcome";
}
```

### Enums
```typescript
type Region = "Europe" | "Asia-Pacific" | "Americas" | "Middle East" | "Africa" | "Oceania";
type UBIStatus = "Active Pilot" | "Proposed" | "Exploring" | "None";
```

## Phase 2: Database Schema (Planned)

### `countries` table
All Country fields mapped to columns. `id` as primary key (text slug).

### `profiles` table
```sql
id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
email       text
full_name   text
membership  text DEFAULT 'free'  -- 'free' | 'insider' | 'strategist'
stripe_customer_id text
created_at  timestamptz DEFAULT now()
```

### `user_roles` table
```sql
id       uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id  uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
role     app_role NOT NULL  -- enum: 'admin', 'moderator', 'user'
UNIQUE(user_id, role)
```

### `watchlists` table
```sql
id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE
country_id  text REFERENCES countries(id)
created_at  timestamptz DEFAULT now()
UNIQUE(user_id, country_id)
```

### `news_items` table (Phase 3)
```sql
id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
country_id  text REFERENCES countries(id)
title       text NOT NULL
summary     text
source_url  text
source_name text
published_at timestamptz
fetched_at  timestamptz DEFAULT now()
is_premium  boolean DEFAULT true
```

## Current Seed Data Coverage

| Region | Countries | Count |
|--------|-----------|-------|
| Europe | Finland, Denmark, Sweden, Norway, Netherlands, Germany, Spain, Portugal, Switzerland, UK, Ireland, Estonia, Iceland | 13 |
| Americas | Canada, USA, Brazil, Costa Rica, Uruguay | 5 |
| Asia-Pacific | South Korea, Singapore, Japan, Taiwan, India | 5 |
| Middle East | UAE | 1 |
| Africa | Kenya | 1 |
| Oceania | New Zealand, Australia | 2 |
| **Total** | | **27** |
