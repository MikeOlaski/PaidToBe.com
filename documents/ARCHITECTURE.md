# SafetyNet Global — Architecture

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + TypeScript | UI framework |
| Styling | Tailwind CSS + shadcn/ui | Design system & components |
| Animation | Framer Motion | Page transitions, micro-interactions |
| Routing | React Router v6 | Client-side navigation |
| State | React hooks + React Query | Local & server state |
| Backend | Lovable Cloud (Supabase) | Auth, DB, edge functions (Phase 2) |
| Payments | Stripe | Subscription billing (Phase 2) |
| AI/News | Perplexity API | News aggregation (Phase 3) |
| Predictions | Polymarket API | Odds tracking (Phase 4) |
| Build | Vite | Dev server & bundler |

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives (Button, Card, etc.)
│   ├── Navbar.tsx        # Global navigation
│   ├── Footer.tsx        # Global footer
│   └── CountryCard.tsx   # Reusable country card component
├── data/
│   └── countries.ts      # Seed data (28 countries, types, constants)
├── pages/
│   ├── Index.tsx          # Landing page / hero
│   ├── Directory.tsx      # Filterable country grid
│   ├── CountryDetail.tsx  # Individual country view (tabbed)
│   ├── Rankings.tsx       # Leaderboard + comparison tool
│   ├── Membership.tsx     # Pricing tiers
│   ├── About.tsx          # Methodology & mission
│   └── NotFound.tsx       # 404 page
├── hooks/                 # Custom React hooks
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
├── App.tsx                # Root component, routing
├── main.tsx               # Entry point
└── index.css              # Design tokens & global styles

documents/                 # Project documentation
├── PRD.md                 # Product Requirements Document
├── ROADMAP.md             # Development roadmap
├── ARCHITECTURE.md        # This file
├── DATA_MODEL.md          # Data schema & types
├── DESIGN_SYSTEM.md       # Design decisions & tokens
└── CHANGELOG.md           # Version history
```

## Data Flow

### Current (Phase 1)
```
countries.ts (static JSON) → React components → UI
```

### Phase 2 (with Supabase)
```
Supabase DB → React Query → React components → UI
                ↑
Admin edits → Supabase DB
Stripe webhook → Edge function → Supabase (membership status)
Auth → Supabase Auth → Context provider → Protected routes
```

### Phase 3 (with Intelligence)
```
Perplexity API → Edge function → Supabase (cached news)
                                      ↓
                              React Query → News feed UI
Polymarket API → Edge function → Supabase (cached odds)
```

## Design System

### Color Tokens (HSL)
- **Primary**: `210 70% 32%` — Deep blue, trust/authority
- **Accent**: `158 50% 42%` — Teal green, growth/opportunity
- **Warning**: `38 92% 50%` — Amber, attention
- **Success**: `158 50% 42%` — Same as accent
- **Info**: `210 70% 50%` — Lighter blue
- **Background**: `40 20% 98%` — Warm off-white
- **Surface**: `40 20% 96%` — Slightly darker for sections

### Typography
- **Headlines**: Source Serif 4 (serif) — editorial authority
- **Body**: Inter (sans-serif) — clean readability

### Component Patterns
- Country cards with score badges and progress bars
- Tabbed detail views for complex data
- Comparison panels for side-by-side analysis
- Filter pills with active state badges

## Security Considerations (Phase 2)
- User roles stored in separate `user_roles` table (never on profiles)
- RLS policies on all user data
- Stripe webhook verification via edge functions
- API keys stored as Lovable secrets, never in code
- Admin status verified server-side only
