# fullstackdev.cz redesign — design spec

**Date:** 2026-09-25
**Owner:** Marcela Řezková
**Repo:** marcelrezkova/WEB-me_2.0 (branch `main`, deployed by Netlify to https://www.fullstackdev.cz)

## Purpose

Two goals, in this order:

1. **Proof of craft.** A recruiter or AI-team lead (target: Top Women Tech Summit Berlin, 20 Nov 2026, employers such as BCG, CERN, E.On) opens the site from LinkedIn and within ten seconds understands that Marcela designs products and builds them with AI agents. The site itself is the demo.
2. **Entry to her business.** A paid 45-minute consultation (39 EUR) is the first product; later Simon-driven digital products will use the site as their base.

Positioning: **AI Engineer, agentic systems & product builder.** Creative when there is room, decisive when the facts are in hand, always data-driven. Interested in AI teams and R&D.

## Non-goals

- No Czech version. English only.
- No project names or client links except where explicitly listed below. Work is described generically.
- No Buy-me-a-coffee, no terminal/hacker styling, no collapsible `show_projects()` buttons.
- No CMS, no backend of our own. Payment via Stripe Payment Link, booking via Google Calendar appointment page.

## Stack

- Keep: React 18, Vite, TypeScript, TailwindCSS, Netlify (`netlify/netlify.toml` unchanged).
- Add: `@react-three/fiber` + `three` (hero particle field), `framer-motion` (scroll and layout animation), `lenis` (smooth scroll). No other runtime dependencies.
- Remove: `@supabase/supabase-js` (unused); `lucide-react` stays for icons.
- Fonts via Google Fonts: one display/sans (Space Grotesk) and one mono for accents (JetBrains Mono).

## Visual language

- Dark base (`#05060a`), one accent (electric cyan `#5ef2ff`) plus a secondary warm accent (`#ffb86b`) used sparingly for the paid CTA. Text in near-white with two grey steps.
- Timeless: minimal palette, precise typography, generous spacing. Effects add depth and motion, never decoration for its own sake.
- **Hero:** full-viewport WebGL particle field (several thousand points forming a slowly rotating network of nodes and faint links, a "knowledge network"), reacting to pointer position. Short boot sequence on first load (0.8 s max): thin progress line, then the headline assembles character by character.
- **Scroll:** sections fade/slide in; headings assemble from scrambled glyphs into final text once (not on every scroll); a thin vertical progress line on the left edge.
- **Cards:** glass surface, 1 px gradient border that follows the pointer (light edge), slight 3D tilt on hover.
- **Nav:** fixed, transparent until scrolled, fox icon (existing `TechFoxIcon`) + wordmark `marcela.ai`; links to sections; primary CTA "Book a session".
- **Reduced motion:** honour `prefers-reduced-motion` (no particle motion, no tilt, fades only). Mobile (< 768 px): particle count reduced to about a quarter, no pointer tilt, boot sequence skipped.
- **Performance budget:** Lighthouse mobile performance at least 85, LCP under 2.5 s on 4G. Three.js loaded lazily after first paint.

## Content (final copy, English)

### 1. Hero
- Kicker: `AI ENGINEER · AGENTIC SYSTEMS · PRODUCT BUILDER`
- H1: **I design products and build them with AI agents.**
- Sub: Knowledge-driven agent orchestration, full-stack and data engineering underneath, and a product mindset that starts from market data.
- CTAs: **Book a session** (to `#work-with-me`), **See how I work** (to `#how`).
- Location line: Czech Republic · open to AI & R&D teams in Europe.

### 2. What I do (three cards)
- **Agentic AI systems.** Multi-agent orchestration with clear roles (planner, implementer, reviewer), MCP integrations, and knowledge networks that give agents the context they need. Spec → plan → build → review workflows that ship.
- **Full-stack & data foundation.** React/Next.js frontends, Python/FastAPI and Rust services, DuckDB/SQL analytics, ETL pipelines and CI automation. Production systems with auth, payments, SEO.
- **Product & delivery.** From market data to a shipped product: opportunity analysis, unit economics, specification, and delivery with measurable results. Founder experience, public-sector and community projects, team presentations.

### 3. How I work (four steps + one line about her)
1. **Validate with data.** Market and pricing data first; an idea only survives if the numbers do.
2. **Specify and plan.** Design spec, decomposition into independent tasks, explicit interfaces.
3. **Build with agents, review with agents.** Implementation by orchestrated agents, every task reviewed for spec compliance and code quality before merge.
4. **Ship and measure.** Automated deploys, event-driven monitoring, iterate on what the data says.

Line: *Creative when there is room to explore, decisive when I know what I am holding, and always anchored in data.*

### 4. Selected work (five generic cards, no external links)
- **Agentic market-opportunity platform.** Local AI orchestrator in Rust that collects public signals from dozens of sources, scores emerging opportunities for a target market, and produces a daily brief with audience, pricing and timing. Event-driven, MCP-ready. *In active development.*
- **Automotive data platform with multi-agent development.** Five-layer ETL (raw → staging → core → metrics → mart) over scraped listings, deal-scoring engine, React frontend with 3D visualisation; development tasks dispatched to specialised agents via Slack and CI.
- **Analytics tool for regional government.** API-first FastAPI service over a live SQL Server database that detects stale investment actions across thousands of records using configurable validators; built in a three-person team and presented to stakeholders.
- **Production web apps with bookings and payments.** Next.js and React applications with admin panels, booking systems, e-mail notifications, payment-gateway integration and structured-data SEO for small businesses.
- **Labour-market and pricing analytics.** Automated daily pipelines comparing official statistics with real market data from 14+ sources; DuckDB analytics and interactive dashboards.

### 5. Work with me (paid consultation)
- Title: **45-minute working session — 39 EUR**
- What you get: a focused call on one question: where AI agents fit in your product or workflow, a review of your existing agentic setup, or scoping of a web/data build. You leave with a written summary and concrete next steps within 24 hours.
- Flow: **Pay & book** button → Stripe Payment Link (39 EUR, one-time) → on success Stripe redirects to the Google Calendar appointment page `https://calendar.app.google/QfV5shFu5VgQiV3s7`. Below the button, small text: "Already paid? Pick your slot" linking directly to the calendar.
- The Stripe Payment Link is created once via the Stripe connector (product "45-minute working session", 39 EUR, success URL = calendar link) and its URL is stored in `src/config.ts`.

### 6. Stack (compact chip groups)
Languages: Python, TypeScript, Rust, SQL · AI: Claude API & Agent SDK, MCP, multi-agent orchestration, prompt & eval design, Ollama · Frontend: React, Next.js, Tailwind, Three.js · Backend & data: FastAPI, DuckDB, Supabase, SurrealDB, ETL · Ops: Docker, GitHub Actions, Netlify, Railway, Fly.io

### 7. Contact
E-mail (marcelarezkova98@icloud.com), LinkedIn (linkedin.com/in/marcelrezkova), GitHub (github.com/marcelrezkova), Download CV (existing `/MarcelaRezkova_CV_EN.pdf` until the new CV replaces it), Book a session.

## Architecture

```
src/
  main.tsx                 entry
  App.tsx                  page shell: Nav, sections in order, Footer
  config.ts                links: calendar URL, Stripe link URL, socials, CV path
  content/                 copy as typed data (hero.ts, services.ts, process.ts, work.ts, stack.ts)
  components/
    Nav.tsx, Footer.tsx
    hero/ParticleField.tsx (R3F canvas, lazy)  hero/BootSequence.tsx
    motion/Reveal.tsx (scroll reveal)  motion/Scramble.tsx (glyph assemble)  motion/TiltCard.tsx
    sections/Hero.tsx, WhatIDo.tsx, HowIWork.tsx, SelectedWork.tsx, WorkWithMe.tsx, Stack.tsx, Contact.tsx
    FoxMascot.tsx (kept)
  hooks/useReducedMotion.ts, useIsMobile.ts
  index.css                tokens, base styles
index.html                 meta/OG/schema.org Person updated to the new positioning
```

- Content lives in `src/content/*` so copy edits never touch components.
- Every motion component reads `useReducedMotion()` and degrades to a static render.
- `ParticleField` is imported with `React.lazy` inside `Suspense` with a static gradient fallback.

## Error handling

- WebGL unavailable: `ParticleField` catches context-creation failure and renders the static fallback.
- Stripe or Calendar link unreachable is outside our control; both are plain anchors with `rel="noopener"`.

## Testing and verification

- `npm run typecheck`, `npm run lint`, `npm run build` must pass in CI (GitHub Actions workflow added: install, typecheck, lint, build) and the Netlify deploy must succeed for each PR.
- Manual check per PR in the built-in browser: desktop 1440 px and mobile 375 px, plus `prefers-reduced-motion` emulation.
- Final: Lighthouse mobile run against the live site, performance at least 85.

## Delivery

Small PRs into `main`, each deployable on its own (the site must never be half-migrated on production):
1. Foundation: dependencies, tokens, fonts, config, content files, CI workflow (no visual change yet).
2. New page shell + all sections with static styling (replaces old page in one PR).
3. Hero particle field + boot sequence.
4. Scroll motion: reveal, scramble, tilt, progress line.
5. Stripe Payment Link + Work-with-me flow.
6. Meta/SEO/OG image refresh, old assets cleanup, Lighthouse pass.

Commit messages end with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Accepted deviations (2026-09-25)

- Hero headline does not assemble character by character; it renders as a static H1 for LCP. Section headings use the scramble-in effect instead.
- Particle count is 1600 on desktop and 600 on mobile, set to stay inside the Lighthouse performance budget.
- Lighthouse mobile score is 90 with an LCP of 3.2 s, due to the web font swap.
- Contact e-mail is info@fullstackdev.cz.
- `@react-three/fiber` is pinned to v8 for React 18 compatibility.

## Open infrastructure items

- The bare domain `fullstackdev.cz` has DNS pointed at Google forwarding, so HTTPS fails there and only the `www` subdomain is served by Netlify. Fix the DNS before 20 Nov 2026, or switch absolute URLs to `www` in the meantime.
- `netlify/netlify.toml` is not at the repo root, so its headers/redirects are inactive. Move it only after the DNS issue above is fixed.
