# PaidToBe — Build Prompt for AI Studio Code

Use this prompt to recreate the PaidToBe project in another AI code builder.

---

## PROMPT START

Build a web application called **PaidToBe** (domain: PaidToBe.com) — a directory and intelligence platform that ranks countries on their readiness for a post-AI labor economy (UBI, Universal High Income, social safety nets).

### Target Audience
Wealthy, globally mobile expats with dual citizenship or multi-nation mobility, AND concerned citizens wanting to influence policy in their jurisdiction.

### Tech Stack
- React 18 + TypeScript
- Tailwind CSS with a custom design system
- React Router v6 for client-side routing
- Framer Motion for animations
- shadcn/ui component library
- Vite for builds

### Design Direction
Clean editorial aesthetic (like Monocle magazine or Nomad List) with modern SaaS polish. NOT a finance terminal — approachable for everyday people, not just investors.

**Typography**: Serif font for headlines (e.g., Source Serif 4), clean sans-serif for body (e.g., Inter).
**Colors**: Deep blue primary, teal/green accent for growth/opportunity, warm off-white background. All colors as HSL CSS custom properties.
**Tone**: Data-forward but human. Authoritative but welcoming.

### Pages to Build

#### 1. Landing Page (`/`)
- Hero section with dark blue background: "Where will you thrive when AI replaces jobs?"
- Animated statistics bar (jurisdictions tracked, active UBI pilots, policy events, regions)
- 3 value proposition cards: Readiness Scores, Policy Influence, Early Alerts
- Top 6 ranked countries shown as cards
- Bottom CTA for membership

#### 2. Country Directory (`/directory`)
- Search bar + collapsible filter panel
- Filters: Region (Europe, Americas, Asia-Pacific, Middle East, Africa, Oceania), UBI Status (Active Pilot, Proposed, Exploring, None)
- Sort by: Readiness Score, GDP per Capita, Policy Momentum, Name
- Responsive card grid (2 cols on tablet, 3 on desktop)
- Each card shows: flag emoji, country name, region, readiness score (0-10) in colored circle, UBI status badge, key policy badges, 4 mini progress bars (Safety Net, Healthcare, Visa Access, Momentum), GDP/population

#### 3. Country Detail (`/country/:id`)
- Back link to directory
- Header: large flag emoji, country name, region badge, UBI status badge, political system, large readiness score box
- Summary paragraph
- Tabbed content:
  - **Overview**: Key facts (population, GDP, cost of living, dual citizenship), top industries, workforce vulnerability score, key policies list
  - **Scores**: 8 detailed score bars (Overall Readiness, Safety Net, Healthcare, Policy Momentum, Economic Capacity, Political Will, Visa Accessibility, Expat Accessibility)
  - **Policy Timeline**: Vertical timeline with year, event type badge (pilot/proposal/legislation/outcome), title, description
  - **Expat Info**: Visa types, tax implications

#### 4. Rankings (`/rankings`)
- Sort-by pills for 6 dimensions (Overall, Safety Net, Economy, Political Will, Momentum, Expat Access)
- Click any table row to add to comparison (up to 3 countries)
- Comparison panel shows side-by-side scores with best-in-category highlighting
- Full data table with rank number, flag, name, scores, UBI status badge, "View" link

#### 5. Membership (`/membership`)
- 3-tier pricing cards:
  - **Explorer** (Free): Directory access, basic profiles, rankings
  - **Insider** ($39/mo): AI-curated news, alerts, comparison tools, priority support
  - **Strategist** ($399/yr): Everything + watchlists, analysis reports, community, consultation, 2 months free
- "Most Popular" badge on Insider
- FAQ section below (Who is this for?, How are scores calculated?, What alerts?, Can I cancel?)

#### 6. Methodology (`/about`)
- 5 scoring dimensions with weights: Policy Progressiveness (25%), Economic Capacity (25%), Political Will (20%), Expat Accessibility (15%), Policy Momentum (15%)
- Data sources: Public policy databases, academic research, prediction markets, AI-aggregated news
- Mission statement section (dark background)
- Update frequency note

### Shared Components
- **Navbar**: Logo (globe icon + "SafetyNetGlobal"), nav links (Directory, Rankings, Methodology, Membership), "Join Now" accent button, mobile hamburger menu
- **Footer**: 4-column grid (brand description, Explore links, Membership links, Community links with "coming soon" items)
- **CountryCard**: Reusable card component used on landing page and directory

### Seed Data
Pre-populate with 27+ countries across all 6 regions. Include real-world data:
- **Active UBI Pilots**: Finland, Netherlands, Germany, South Korea, Spain, USA (city-level), Kenya (GiveDirectly), Ireland (arts), UK (Wales)
- **Proposed**: Canada, Switzerland, Japan, Brazil (has UBI law since 2004), India, Australia, New Zealand, Taiwan, USA (federal)
- **Exploring**: Denmark, Sweden, Norway, Estonia, Portugal, Iceland, Costa Rica, Uruguay
- **None but relevant**: UAE, Singapore

Each country needs: readiness score (0-10), 8 sub-scores, UBI status, population, GDP per capita, political system, cost of living, dual citizenship boolean, key policies array, 2-3 paragraph summary, visa types, tax implications, policy timeline (2-5 events with year/title/description/type), top industries, workforce vulnerability score.

### Score Color Logic
- ≥ 8.0: Green/teal
- ≥ 6.0: Blue
- ≥ 4.0: Amber/yellow
- < 4.0: Red

### Future Features (do NOT build, but design to accommodate)
- Stripe payment integration for membership
- Supabase backend for user accounts and data editing
- Perplexity API for live news aggregation per country
- Polymarket integration for prediction odds
- Policy influence hub (petitions, civic engagement)
- Community forum
- Interactive world map

### Important Notes
- All colors must use CSS custom properties (HSL format) — no hardcoded colors in components
- Mobile-responsive throughout
- Semantic HTML with proper heading hierarchy (single H1 per page)
- Dark mode support in the design tokens
- The data should be structured as TypeScript types in a separate file, easy to migrate to a database later

## PROMPT END
