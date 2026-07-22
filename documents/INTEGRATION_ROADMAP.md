# PaidToBe — Platform Integration Roadmap

_Last updated: 2026-03-16_

---

## Ecosystem Overview

PaidToBe is not a standalone product. It's the **diagnosis layer** in a multi-platform ecosystem:

```
┌──────────────────────────────────────────────────────────┐
│                    USER JOURNEY                          │
│                                                          │
│   AWARENESS          PLANNING           TRANSFORMATION   │
│   "Am I at risk?"    "What do I do?"    "Who am I now?"  │
│                                                          │
│   ┌─────────────┐   ┌──────────────┐   ┌─────────────┐  │
│   │  PaidToBe   │──→│  PaidToBe    │──→│  Rehabit.ai  │  │
│   │  Free Tools │   │  Intelligence│   │  Identity &  │  │
│   │  (diagnose) │   │  (plan)      │   │  Purpose     │  │
│   └─────────────┘   └──────┬───────┘   └─────────────┘  │
│                            │                             │
│                    ┌───────┴────────┐                     │
│                    │                │                     │
│              ┌─────┴─────┐  ┌──────┴──────┐              │
│              │ Lescens.com│  │PayPerValue  │              │
│              │ AI Courses │  │.com         │              │
│              │ & Training │  │ Name Your   │              │
│              │ (re-tool,  │  │ Price       │              │
│              │  re-skill) │  │ (value-     │              │
│              └────────────┘  │  based pay) │              │
│                              └─────────────┘              │
└──────────────────────────────────────────────────────────┘
```

---

## Platform Roles

### PaidToBe.com — The Diagnosis Engine
- **Role:** Attract users via free data tools (job risk scores, country rankings). Convert awareness into planning. Surface the "oh shit" moment that drives action.
- **Owns:** Job data, country data, policy tracking, visualizations, AI advisor, intelligence subscriptions
- **Entry points:** SEO ("will AI replace [job]"), viral risk scores, country comparisons

### Rehabit.ai — The Identity Transformation Engine
- **Role:** Help users navigate the inner transition — purpose, identity, habits, mindset — when their career or location changes. The "who am I becoming?" question.
- **Owns:** Identity frameworks, habit systems, purpose work, coaching methodologies
- **Entry points:** PaidToBe referral ("your career is changing — here's how to change with it"), direct (people seeking personal transformation)

### Lescens.com — The AI Course/Training Delivery Agent
- **Role:** Deliver the re-tooling and re-skilling content. AI-powered course creation and delivery platform that serves as the education arm of the ecosystem.
- **Owns:** Course content, learning paths, skill assessments, completion tracking, certifications
- **Integration with PaidToBe:**
  - Job risk score → "Here are the skills you need to pivot" → Lescens delivers the training
  - Country data → "Here's what you need to know about working in [country]" → Lescens delivers immigration/visa/work-culture courses
  - Personalized learning paths generated from PaidToBe's AI advisor recommendations
- **Content examples:**
  - "AI-Proof Your Career" — skill adaptation by occupation category
  - "The Migration Playbook" — country-specific immigration training
  - "Re-Skill for [Target Industry]" — pivot-specific courses
  - "Working in [Country]" — culture, legal, tax, visa training

### PayPerValue.com — The Value-Based Pricing Agent
- **Role:** AI-aided value interpretation that lets users name their price based on the actual value they receive (money saved, money earned, time saved, risk mitigated).
- **Owns:** Value calculation engine, flexible pricing interface, payment processing
- **Integration with PaidToBe:**
  - After a user gets a Personal Risk Report or completes a Lescens course → PayPerValue calculates: "Based on this report, you could save $X by relocating to [country] or earn $Y more by pivoting to [career]. What's that worth to you?"
  - Subscription pricing could optionally use PayPerValue: "This intelligence helped you make a $50K relocation decision — pay what it was worth"
  - Info products offered on a pay-what-it's-worth basis with AI-calculated value anchoring
- **Philosophy:** Aligns with PaidToBe's core belief — everyone deserves access to this intelligence. Pay-per-value means nobody is priced out, and high-value users pay more because the value is transparently demonstrated.

---

## Integration Phases

### Phase 2 (Current Sprint) — Foundation
- PaidToBe: Auth + payments (Stripe) + database migration
- No cross-platform integration yet
- **Prep work:** Design shared user identity model across platforms

### Phase 3 — Intelligence + Lescens Connection
- PaidToBe: AI news aggregation, alerts, AI advisor
- **Lescens integration:** AI advisor recommends specific Lescens courses based on user's job risk profile
- **Implementation:** API handoff — PaidToBe passes user context (occupation, risk score, target countries) → Lescens generates/serves personalized learning path
- Deep links from PaidToBe job pages → relevant Lescens courses

### Phase 4 — Community + Rehabit Connection
- PaidToBe: Community forum, prediction markets, civic engagement
- **Rehabit integration:** Identity transformation content surfaces alongside career/location planning
- "Career Transition" programs that span PaidToBe (data/planning) + Rehabit (identity/purpose) + Lescens (skills/training)
- Shared community features — users in the same transition journey connect across platforms

### Phase 5 — PayPerValue + Full Ecosystem
- **PayPerValue integration:** All info products and premium features optionally priced via value-based model
- AI calculates and presents value created: "This relocation plan could save you $180K over 10 years in cost-of-living differences. This career pivot could increase your AI-resilience score from 3/10 to 8/10."
- User sets their price with the value calculation as anchor
- Subscription tiers remain as the default — PayPerValue is an optional overlay for one-time products and reports

### Phase 6 — Unified Ecosystem
- Single sign-on across PaidToBe, Rehabit, Lescens, PayPerValue
- Unified user profile: occupation, risk score, target countries, learning progress, identity transformation stage
- Cross-platform analytics: "Users who completed the Career Pivot course on Lescens AND the Purpose workshop on Rehabit had 3x higher satisfaction scores"
- The ecosystem becomes a single journey: Diagnose → Plan → Learn → Transform → Thrive

---

## Data Flow Between Platforms

```
PaidToBe (user profile + risk data)
    │
    ├──→ Lescens: "This user is a financial analyst (7/10 AI risk)
    │    targeting Portugal. Serve: AI-augmentation skills +
    │    Portugal work culture + NHR tax regime course."
    │
    ├──→ Rehabit: "This user just discovered their career has
    │    high AI risk. They're in the 'awareness/anxiety' stage.
    │    Serve: identity reframing exercises, purpose discovery."
    │
    └──→ PayPerValue: "This user's Migration Report identified
         $180K in potential savings over 10 years. Anchor the
         report price suggestion at 1-5% of value created."
```

---

## Revenue Attribution

| Platform | Revenue Type | Flows Back To |
|----------|-------------|---------------|
| PaidToBe | Subscriptions ($19-$49/mo) | PaidToBe |
| PaidToBe | Info product sales ($49-$499) | PaidToBe |
| Lescens | Course fees (via PayPerValue or fixed) | Lescens (with PaidToBe referral rev share) |
| Rehabit | Transformation programs | Rehabit (with PaidToBe referral rev share) |
| PayPerValue | Processing fee on value-based transactions | PayPerValue |

---

## Notes

- Each platform should be independently viable — don't create hard dependencies before each has traction
- PaidToBe is the traffic engine (SEO, viral, content) that feeds the ecosystem
- Lescens and PayPerValue are infrastructure — they serve multiple ventures, not just PaidToBe
- Rehabit is the philosophical foundation — the "why" behind everything
- See individual project repos for Lescens, PayPerValue, and Rehabit technical details
