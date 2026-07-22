# Testing Guidelines

This document outlines the testing strategy, frameworks, and conventions for the PaidToBe platform. When contributing or generating code via AI (like Claude), ensure tests are robust, adhere to these practices, and test both expected functionality and edge cases.

## Tools & Frameworks

- **Unit & Component Testing:** [Vitest](https://vitest.dev/)
- **UI & DOM Testing:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End (E2E) Testing:** [Playwright](https://playwright.dev/)

## Commands

- `npm run test` – Run the Vitest test suite.
- `npm run test:watch` – Run the Vitest test suite in watch mode.
- `npx playwright test` – Run the Playwright E2E tests.

## Unit and Component Testing (Vitest & RTL)

Unit and component tests should be placed adjacent to the file they are testing or in a `__tests__` directory, using the `.test.tsx` or `.test.ts` extension.

### Best Practices
- **Test User Behavior:** Use React Testing Library to test components the way users interact with them. Rely on ARIA roles and labels (e.g., `getByRole`, `getByLabelText`) rather than implementation details (like CSS classes or Test IDs when possible).
- **Mocking:** Mock external dependencies (like React Router, Recharts, or API calls/React Query) when testing isolated components.
- **Coverage:** Aim to cover:
  - Happy paths
  - Error states and boundary conditions
  - Loading states

**Example Component Test (`CountryCard.test.tsx`):**
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CountryCard from '../CountryCard';

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    render(<CountryCard name="Norway" score={9.5} ubiStatus="Active" />);
    expect(screen.getByRole('heading', { name: /Norway/i })).toBeInTheDocument();
    expect(screen.getByText('Score: 9.5')).toBeInTheDocument();
  });
});
```

## End-to-End Testing (Playwright)

E2E tests should be located in the `e2e` or `tests` directory relative to the project root.

### Best Practices
- **User Flows:** Focus on testing critical user journeys (e.g., navigating from the Landing Page to the Directory, filtering countries, accessing a Country Detail page).
- **Resilience:** Use Playwright's built-in auto-waiting mechanisms and user-facing locators (e.g., `page.getByRole()`, `page.getByText()`).
- **Fixtures:** Utilize fixtures (like `playwright-fixture.ts`) to setup authenticated states or mocked data when Phase 2 (Supabase/Auth) is implemented.

**Example E2E Test (`navigation.spec.ts`):**
```ts
import { test, expect } from '@playwright/test';

test('navigate to directory and filter countries', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Directory/i }).click();
  await expect(page).toHaveURL(/.*\/directory/);
  
  // Test filtering
  await page.getByRole('button', { name: /Filter by Region/i }).click();
  await page.getByRole('option', { name: /Europe/i }).click();
  await expect(page.getByRole('heading', { name: /Norway/i })).toBeVisible();
});
```

## AI Generation Rules for Claude

1. Whenever generating new complex utility functions or React hooks, generate a corresponding `.test.ts` file using Vitest.
2. Whenever creating new critical UI components (like complex forms or data tables), generate a `.test.tsx` file using React Testing Library.
3. Keep E2E Playwright tests focused strictly on major workflow changes. Add E2E tests for features defined in Phase 2 (like Stripe integration flows) and Phase 3 (News feeds).
