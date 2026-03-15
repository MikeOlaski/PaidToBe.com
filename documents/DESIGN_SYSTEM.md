# SafetyNet Global — Design System

## Design Philosophy
Clean editorial aesthetic (Monocle/Nomad List inspired) with modern SaaS polish. Data-forward but approachable — not just for finance professionals, also for concerned citizens advocating for policy change.

## Typography

### Fonts
- **Headlines**: `Source Serif 4` (Google Fonts) — serif, editorial authority
- **Body**: `Inter` (Google Fonts) — clean sans-serif readability

### Scale
- Hero h1: `text-4xl md:text-6xl` (font-serif, font-bold)
- Page h1: `text-3xl md:text-4xl` (font-serif, font-bold)
- Section h2: `text-2xl md:text-3xl` (font-serif, font-bold)
- Card title: `text-lg` (font-serif, font-semibold)
- Body: `text-sm` to `text-base` (font-sans)
- Caption: `text-xs` (text-muted-foreground)

## Color Palette

All colors defined as HSL in `src/index.css` and mapped in `tailwind.config.ts`.

### Core Tokens
| Token | Light Mode | Usage |
|-------|-----------|-------|
| `--background` | `40 20% 98%` | Warm off-white page background |
| `--foreground` | `220 25% 10%` | Primary text |
| `--primary` | `210 70% 32%` | Deep blue — trust, CTAs, readiness scores |
| `--primary-foreground` | `0 0% 100%` | White text on primary |
| `--accent` | `158 50% 42%` | Teal green — growth, opportunity, key actions |
| `--accent-foreground` | `0 0% 100%` | White text on accent |
| `--muted` | `40 15% 94%` | Subtle backgrounds |
| `--muted-foreground` | `220 10% 46%` | Secondary text |
| `--surface` | `40 20% 96%` | Section backgrounds (stats, alternating sections) |

### Semantic Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--warning` | `38 92% 50%` | Amber — policy momentum, attention items |
| `--success` | `158 50% 42%` | Teal — positive scores, active pilots |
| `--info` | `210 70% 50%` | Blue — informational, economic capacity |
| `--destructive` | `0 84% 60%` | Red — low scores, errors |

### Score Color Logic
```
≥ 8.0 → bg-success (green/teal)
≥ 6.0 → bg-info (blue)
≥ 4.0 → bg-warning (amber)
< 4.0 → bg-destructive (red)
```

## Component Patterns

### Country Card
- White card with hover lift (`hover:shadow-lg hover:-translate-y-1`)
- Flag emoji (3xl) + country name (serif) + region caption
- Score circle (colored by score tier) top-right
- UBI status badge + truncated policy badges
- 4 mini progress bars (Safety Net, Healthcare, Visa Access, Momentum)
- GDP/population caption at bottom

### Score Bar
- Label + numeric score on same line
- Full-width track (`bg-muted`, 6px height)
- Colored fill proportional to score (score × 10%)
- Color varies by category

### Hero Section
- Full-width primary background with radial gradient overlay
- Centered content, badge → h1 → subtitle → dual CTAs
- framer-motion fade-up animation

### Filter Controls
- Search input with icon
- Collapsible filter panel with Select dropdowns
- Active filter badges (removable)
- Result count display

## Layout
- Container: max-width 1400px, 2rem padding
- Sections alternate between `bg-background` and `bg-surface`
- Cards use `bg-card` consistently
- Grid: `sm:grid-cols-2 lg:grid-cols-3` for card layouts

## Dark Mode
Full dark mode support via `.dark` class with inverted token values.
Primary shifts to lighter blue (`210 60% 55%`), backgrounds go dark navy.

## Spacing Conventions
- Section padding: `py-16` to `py-20`
- Card padding: `p-6`
- Between sections: `mt-12` to `mt-16`
- Between related items: `gap-4` to `gap-6`
