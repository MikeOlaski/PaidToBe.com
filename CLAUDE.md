# Claude Code Project Guidelines

This file provides instructions and context for Claude when working on this repository.

## Commands

- **Development Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** `npm run test` (uses Vitest)
- **Install Dependencies:** `npm install` (using npm as the package manager)

## Project Documentation

Detailed project contexts are located in the `documents/` directory. When making architectural, design, or data model changes, please refer to:
- **Architecture:** `documents/ARCHITECTURE.md`
- **Data Model:** `documents/DATA_MODEL.md`
- **Design System:** `documents/DESIGN_SYSTEM.md`
- **Product Requirements:** `documents/PRD.md`
- **Roadmap:** `documents/ROADMAP.md`

## Tech Stack & Code Conventions

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **State Management:** React hooks, React Query (Phase 2+)
- **Routing:** React Router v6

### Code Style Guidelines

1. **TypeScript:** Use strict typing. Prefer interfaces over types for object definitions. Avoid `any`.
2. **React Components:** Use functional components. Destructure props in the function signature.
3. **Styling:** Use Tailwind CSS utility classes. For complex conditional classes, use `clsx` and `tailwind-merge` (available in `lib/utils.ts` as `cn()`).
4. **UI Components:** Use the existing `shadcn/ui` components located in `src/components/ui`. Don't build custom components if a shadcn equivalent exists.
5. **State:** Keep component state local when possible. Use React Query for server state.
6. **Error Handling:** Add proper error boundaries and loading states for async operations.
7. **File Structure:**
   - Pages in `src/pages/`
   - Reusable UI components in `src/components/ui/`
   - Feature-specific components in `src/components/`
   - Hooks in `src/hooks/`
   - Utilities in `src/lib/`

## Workflows
- Always verify tests (`npm run test`) and linter (`npm run lint`) after significant changes.
- Update `documents/CHANGELOG.md` when completing major features.
