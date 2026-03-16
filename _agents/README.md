# PaidToBe — Resident Agents & Autonomous Operations

Welcome to the **Autonomous Site-as-a-Business** hub. 

This directory contains the documentation, workflows, and prompts for the AI Agents tasked with operating, maintaining, and scaling the `PaidToBe` platform. The ultimate goal of this architecture is a **Zero-Human / Solo-Founder Enterprise** where specialized AI agents operate the entire lifecycle of the business asynchronously.

## Fleet of Resident Agents

The following specialized agents form the operational backbone of PaidToBe, orchestrated by a single primary decision-maker:

### 1. CEO Agent (The Prime Orchestrator)
* **Entity:** Primary LLM Supervisor (e.g., Claude Opus / autonomous orchestrator)
* **Role:** The first "employee." Operates as the central brain of the Site-as-a-Business. Monitors high-level metrics (traffic, MRR, error rates) and makes strategic decisions.
* **Special Action - "Hiring":** The CEO Agent operates solo until its task queue or complexity threshold is exceeded (exhaustion). At that point, it has the authority to instantiate and delegate tasks to the specialized agents below.
* **Instruction Source:** `ROADMAP.md` and `PRD.md`.

### 2. Developer Agent (Codebase & Infrastructure)
* **Entity:** Claude Code (CLI) / Lovable UI
* **Role:** Manages the React source code, layout changes, bug fixes, and feature integrations outlined in the project `ROADMAP.md`.
* **Access:** Full Git/GitHub repository access + Local IDE execution.
* **Instruction Source:** `CLAUDE.md` and `documents/` directory.

### 3. Database Admin Agent (Backend & Security)
* **Entity:** Lovable Cloud AI / Supabase AI
* **Role:** Constructs database schemas (e.g., countries, sub_regions, profiles), manages Row Level Security (RLS) policies, and handles Edge Functions for backend execution.
* **Access:** Supabase Dashboard / SQL execution.
* **Instruction Source:** `documents/DATA_MODEL.md`.

### 4. Programmatic SEO Agent (Content & Growth)
* **Entity:** Automated Edge Function / Scheduled CLI Agent
* **Role:** Continuously scales the directory by programmatically generating long-tail search pages (e.g., "Universal Basic Income in King County, Washington") and localized policy content.
* **Duties:** 
  - Generate programmatic SEO templates.
  - Insert correct JSON-LD schemas and meta tags.
  - Generate structured blog content.

### 5. Intelligence Agent (Data Ingestion)
* **Entity:** Perplexity API Integration + GitHub Actions/Cron
* **Role:** Autonomously monitors global policy shifts.
* **Duties:**
  - Ingest news on UBI and AI disruption globally.
  - Parse events and inject new timeline entries to the Supabase database.
  - Ping the Polymarket API to update betting odds on UBI thresholds.

### 6. Engagement Agent (Marketing & Distribution)
* **Entity:** Mailing List Automation + AI Copywriter
* **Role:** Manages the premium subscription value pipeline.
* **Duties:**
  - Auto-generate the weekly "Insider" and daily "Strategist" policy digests.
  - Dispatch email alerts upon major legislative changes in users' watched countries.

---

## Operating Principles

1. **Self-Healing Codebase:** If a build fails or tests do not pass, the Developer Agent is expected to autonomously debug the logs, fix the Typescript/React error, and re-commit the code.
2. **Schema-Driven Execution:** AI agents must always consult `DATA_MODEL.md` and `ARCHITECTURE.md` to ensure any new feature fits within the established structure.
3. **Data Independence:** Scraped/generated intelligence data lives in Supabase natively. The frontend merely displays what the backend autonomous agents scrape.

## Workflows

Operating workflows for autonomous operations are stored in `_agents/workflows/`. These `.md` files provide rigid checklists and standard operating procedures (SOPs) for specific tasks.
