# PaidToBe

PaidToBe is a directory and intelligence platform ranking countries and jurisdictions on their readiness for a post-AI labor economy. It helps mobile individuals (expats, dual citizens) and policy researchers determine which regions offer the best social safety nets, Universal Basic Income (UBI) programs, and universal high-income policies to thrive amid AI disruption.

## Project Context & Documentation

This repository is managed with AI assistants (like Claude) in mind. For comprehensive guidelines, architecture details, and domain knowledge, please reference the `documents/` directory:

- [**CLAUDE.md**](./CLAUDE.md) - Primary instructions for Claude Code and coding agents.
- [**PRD.md**](./documents/PRD.md) - Product Requirements, Target Audience, and Features.
- [**ARCHITECTURE.md**](./documents/ARCHITECTURE.md) - Tech Stack, Data Flow, and Project Structure.
- [**DATA_MODEL.md**](./documents/DATA_MODEL.md) - Data structures and database schemas.
- [**DESIGN_SYSTEM.md**](./documents/DESIGN_SYSTEM.md) - Tailwind tokens, typography, and styling choices.
- [**ROADMAP.md**](./documents/ROADMAP.md) - Development roadmap and feature phases.

## Tech Stack

This project is built with:
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Routing**: React Router v6

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed along with npm.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MikeOlaski/paidtobe.git
   cd paidtobe
   ```

2. Install the necessary dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080` (or the port specified by Vite in the terminal) to view the application.

## Development Workflows

- **Run Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Lint Code**: `npm run lint`
- **Run Tests**: `npm run test`
- **Preview Production Build**: `npm run preview`

## Contributing

When contributing or prompting agents to build features, please ensure the newly generated code adheres to the instructions in `CLAUDE.md` and aligns with the design language established in `documents/DESIGN_SYSTEM.md`.
