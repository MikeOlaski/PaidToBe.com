# PaidToBe — Original Brief & Design Decisions

## Original Prompt (verbatim)

> Build a directory site of sorts that lists every country or autonomous jurisdiction that would likely be responsible for defining the social safety net as relates to POST LABOUR ECONOMY - POST AI Disruption in Job Market that include UBI but also Universal HIGH Income where we all have our needs met. Presumably it will take a while to reach consensus. The problem we're solving is knowing which jurisdiction will have the best benefits first, and tie to Polymarket perhaps... Also sell a membership that gets news aggregated and early odds changes. Market likely to be wealthy expats with dual citizen or multi-nation mobility

## Clarifying Questions & Answers

### 1. Data Source
**Question**: How should countries/jurisdictions be presented initially?
**Answer**: "Both 2 and 3, but options to edit. AI-generated seed data — pre-populate with known UBI pilots, social safety net rankings, and policy proposals using hardcoded data. Live research via API — use Perplexity/Firecrawl to pull latest policy news per country (requires connectors)."

### 2. Polymarket Integration
**Question**: What's the MVP scope for the Polymarket integration?
**Answer**: "Skip for now" — focus on the directory first, add Polymarket later.

### 3. Membership / Payments
**Question**: How should the paid membership work?
**Answer**: "Stripe paywall" — actual payment integration with Stripe for subscriptions.

### 4. Visual Style
**Question**: What visual style fits the target audience?
**Answer**: "Clean editorial but, touch of modern SaaS and every man/woman common appeal as we may touch on petitions and policy influence options for those stuck in a location"

## Key Design Decisions Made

1. **Name**: SafetyNet Global
2. **Tagline**: "Where will you thrive when AI replaces jobs?"
3. **Typography**: Source Serif 4 (headlines) + Inter (body) — editorial authority with modern readability
4. **Palette**: Deep blue primary (#1A3A5C), teal accent (#3D9E7C), warm off-white background — trustworthy but not cold
5. **Tone**: Accessible to everyone, not just finance professionals. Citizens advocating for change are equally welcome.
6. **Pricing tiers**: Free Explorer / Insider $39-mo / Strategist $399-yr
7. **Data**: 27 countries seeded with scores, timelines, expat info. Editable by admin.
8. **Deferred features**: Polymarket odds, Perplexity news feed, community forum, petition hub
