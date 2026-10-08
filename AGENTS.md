# Agent Operating Guidelines: Uğur Cem Yıldız Portfolio

## Project Overview
Personal portfolio website for **Uğur Cem Yıldız**:
- Molecular Biology & Genetics
- Bioinformatics
- AI-assisted Software Development

Goal: A clean, modern, professional, high-performance portfolio highlighting research projects, technical tools, and software contributions.

---

## Tech Stack & Architecture
- **Framework**: [Astro](https://astro.build) (Static Site Generation / SSG)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Plain, modern CSS (scoped `.astro` `<style>` tags or structured modular CSS).
- **Constraints**:
  - Zero heavy external UI frameworks (no React, Tailwind, shadcn, CSS-in-JS, Framer Motion, or external component libraries unless explicitly requested).
  - Minimal dependencies. Leverage native web standards and Astro's built-in capabilities (Content Collections, image optimization, scoped CSS).
  - 100% static output (`astro build`) with zero runtime JavaScript required for reading/browsing.

---

## Design Principles
1. **Calibrated Aesthetic**: Clean, intellectual, modern scientific feel. Avoid generic "AI SaaS" templates (e.g. no purple-on-white gradients, no excessive card borders, no meaningless emojis).
2. **Typography-First**: Deliberate typeface hierarchy suitable for technical and scientific content (restrained, high-contrast, perfectly legible body text and crisp headers).
3. **Intentional Density & Asymmetry**: Balance white space with structured data grids for publications, pipelines, and code repositories.
4. **Subtle Tactility**: Minimal, purposeful transitions and hover states using pure CSS transitions/transforms; avoid distracting micro-motion spam.
5. **Mobile-First Responsiveness**: Ensure flawless layout down to small mobile viewports (minimum 44px touch targets, fluid layouts, no viewport overflow).

---

## Skill Map & Routing

The global skill catalog contains specialized instructions under `C:\Users\UgurY\.agents\skills\`. Consult these six skills on-demand without copying their files into the workspace:

| Skill Name | Catalog Path | When to Consult | Scope & Responsibilities |
| :--- | :--- | :--- | :--- |
| **`astro`** | `C:\Users\UgurY\.agents\skills\astro\SKILL.md` | Architecture, routing, components, content | Content collections for projects/publications, `.astro` component structure, props validation, layouts, and static build setups. |
| **`frontend-design`** | `C:\Users\UgurY\.agents\skills\frontend-design\SKILL.md` | Visual concept & aesthetic identity | Formulating a distinct visual point of view, spatial balance, color tokens, and avoiding generic UI patterns. |
| **`design-taste-frontend`** | `C:\Users\UgurY\.agents\skills\design-taste-frontend\SKILL.md` | CSS styling rules & anti-slop guardrails | Typography rules, avoiding pure black (`#000`), mobile viewport stability (`100dvh`), tactile button states, and subtle depth. |
| **`interactive-portfolio`** | `C:\Users\UgurY\.agents\skills\interactive-portfolio\SKILL.md` | Portfolio UX & content presentation | The "30-second scan" rule, project case study structure, technical showcase design, clear CTAs, and mobile usability. |
| **`ui-a11y`** | `C:\Users\UgurY\.agents\skills\ui-a11y\SKILL.md` | Accessibility compliance & checks | WCAG 2.2 AA standards: 4.5:1 text contrast, accessible touch targets (≥44px), semantic HTML elements, keyboard navigation, and `prefers-reduced-motion`. |
| **`frontend-lighthouse`** | `C:\Users\UgurY\.agents\skills\frontend-lighthouse\SKILL.md` | Performance budgets & verification | Core Web Vitals checks (LCP ≤ 2500ms, CLS ≤ 0.1, low TBT), zero-JS bundle audit, and asset optimization standards. |

---

## Development & Verification Expectations

- **Development Server**:
  - Run with `npm run dev` or `astro dev --background`.
  - Check status with `npx astro dev status` and stop with `npx astro dev stop`.
- **Pre-flight Checks**:
  1. **Build Test**: Run `npm run build` to confirm clean static compilation without TypeScript or syntax warnings.
  2. **Accessibility (a11y)**: Verify semantic structure, focus visibility, keyboard access, and contrast ratios.
  3. **Responsiveness**: Verify layout integrity across mobile (<768px) and desktop widths.
  4. **Performance**: Verify zero unneeded JS shipped and fast static asset loads.
