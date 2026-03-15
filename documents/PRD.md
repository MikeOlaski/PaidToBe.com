# SafetyNet Global — Product Requirements Document

## Overview
SafetyNet Global is a directory and intelligence platform ranking countries/jurisdictions on their readiness for a post-AI labor economy. It targets wealthy, mobile individuals (expats, dual citizens, multi-nation mobility) seeking the best social safety nets, UBI programs, and universal high income policies worldwide.

## Problem Statement
AI disruption is transforming global labor markets. Citizens and mobile professionals need to know:
1. Which jurisdictions will have the best post-labor benefits first
2. How policies are evolving in real-time
3. What their options are for relocation or civic advocacy

## Target Audience
- **Primary**: Wealthy expats with dual citizenship or multi-nation mobility
- **Secondary**: Concerned citizens wanting to influence policy in their jurisdiction
- **Tertiary**: Policy researchers, journalists, think tanks

## Core Features

### 1. Country Directory (MVP — ✅ Done)
- Filterable/sortable grid of 28+ countries & autonomous jurisdictions
- Each card: flag, name, Post-Labor Readiness Score (0-10), key policies, UBI status
- Filters: Region, readiness score, UBI status, visa friendliness
- Sort: Readiness score, GDP per capita, policy momentum, name

### 2. Country Detail Pages (MVP — ✅ Done)
- Overview tab: population, GDP, political system, key facts
- Scores tab: detailed breakdown of all scoring dimensions
- Policy Timeline tab: chronological policy events
- Expat Info tab: visa types, tax implications, dual citizenship rules

### 3. Rankings / Leaderboard (MVP — ✅ Done)
- Interactive table with all jurisdictions
- Sort by any scoring dimension
- Compare tool: select up to 3 countries side-by-side

### 4. Membership / Pricing (MVP — ✅ Done, payments pending)
- Free tier: Browse directory, basic profiles
- Insider ($39/mo): AI-curated news, alerts, comparison tools
- Strategist ($399/yr): Full suite, consultations, community

### 5. Stripe Payment Integration (Phase 2 — 🔲 Planned)
- Subscription checkout for Insider and Strategist plans
- User account creation via Supabase auth
- Membership status gating for premium features

### 6. AI News Aggregation (Phase 2 — 🔲 Planned)
- Perplexity API integration for per-country policy news
- Behind membership paywall
- Real-time alerts for policy changes

### 7. Polymarket Integration (Phase 3 — 🔲 Planned)
- Prediction market odds for UBI implementation by country
- Odds change alerts for premium members

### 8. Policy Influence Hub (Phase 3 — 🔲 Planned)
- Active petitions per country
- Civic engagement resources
- Community forum

## Non-Functional Requirements
- Mobile-responsive design
- SEO-optimized (meta tags, semantic HTML, JSON-LD)
- Fast load times (<2s LCP)
- Accessible (WCAG 2.1 AA)

## Success Metrics
- Monthly active users
- Membership conversion rate (free → paid)
- Country page engagement (time on page, tabs viewed)
- Membership retention rate
