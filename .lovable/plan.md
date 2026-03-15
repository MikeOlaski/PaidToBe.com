

# SafetyNet Global — Post-Labor Economy Directory

## Concept
A directory and intelligence platform ranking countries/jurisdictions on their readiness for a post-AI labor economy. Targets wealthy, mobile individuals seeking the best social safety nets, UBI programs, and universal high income policies worldwide.

## Pages & Features

### 1. Landing Page / Hero
- Bold editorial headline: "Where will you thrive when AI replaces jobs?"
- Key value props: Country rankings, policy tracking, early alerts
- CTA for free browsing + membership upsell
- Animated global stats (e.g., "342 occupations scored", "195 jurisdictions tracked")

### 2. Country Directory (Core)
- Filterable/sortable grid of ~195 countries + autonomous jurisdictions (EU, Nordic states, Gulf states, Singapore, etc.)
- Each card shows: Country flag, name, "Post-Labor Readiness Score" (0-10), key policies (UBI pilot status, social safety net strength, healthcare, visa accessibility)
- Filters: Region, readiness score range, UBI status (Active pilot / Proposed / None), visa friendliness for expats
- Sort by: Readiness score, GDP per capita, policy momentum

### 3. Country Detail Page
- Overview: Population, GDP, political system, current safety net
- AI Exposure section: Top industries, workforce vulnerability score
- Policy tracker: Timeline of UBI/social policy proposals and outcomes
- Expat considerations: Visa types, tax implications, dual citizenship rules, cost of living
- "Policy influence" section: Links to active petitions, civic engagement opportunities
- News feed (AI-seeded initially, live via Perplexity API later with membership)

### 4. Rankings / Leaderboard
- Interactive table ranking all jurisdictions by composite score
- Breakdown categories: Policy progressiveness, economic capacity, political will, expat accessibility
- Visual comparison tool (select 2-3 countries side by side)

### 5. Membership / Pricing Page
- Stripe-powered subscription ($29-49/mo or $299-499/yr positioning)
- Free tier: Browse directory, basic country profiles
- Premium tier: News aggregation, odds/prediction changes alerts, detailed policy analysis, comparison tools, community access
- Stripe checkout integration

### 6. About / Methodology
- How scores are calculated
- Data sources and update frequency
- Mission statement

## Data Approach
- AI-generated seed data for all countries with known UBI pilots, social programs, and policy proposals hardcoded
- Admin-editable interface (simple edit capability for you to update data)
- Perplexity API integration (later) for live news per country behind the paywall

## Design Direction
- Clean editorial feel (Monocle/Nomad List inspired) with modern SaaS polish
- Light base with subtle accent colors per region
- Country cards with flags, clean typography, data-forward but approachable
- Accessible language — not just for finance bros, also for concerned citizens

## Tech
- React + Tailwind frontend with hardcoded seed data (JSON)
- Stripe for membership payments
- Supabase for user accounts and membership status
- Perplexity connector for news aggregation (phase 2)

