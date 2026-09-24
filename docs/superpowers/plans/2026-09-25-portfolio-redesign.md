# fullstackdev.cz Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current "fullstack dev" portfolio with a futuristic, heavily animated English-only site positioning Marcela as an AI Engineer (agentic systems & product builder) and selling a 39 EUR working session via Stripe + Google Calendar.

**Architecture:** Single-page React app (Vite + Tailwind). Copy lives in `src/content/*` as typed data; sections are dumb components; motion is isolated in `src/components/motion/*` and `src/components/hero/*`, every motion component degrades to static under `prefers-reduced-motion`. Deployed by Netlify from `main`; each task is one PR that leaves production coherent.

**Tech Stack:** React 18, TypeScript, Vite 5, TailwindCSS 3, framer-motion, @react-three/fiber + three, lenis, vitest (pure-logic tests), GitHub Actions (typecheck + lint + build).

**Spec:** `docs/superpowers/specs/2026-09-25-portfolio-redesign-design.md`

## Global Constraints

- English only. No Czech strings anywhere in `src/` or `index.html` after Task 2.
- No project names or client links in the UI. Work cards use the generic titles from the spec verbatim.
- Colours: base `#05060a`, accent `#5ef2ff`, warm accent `#ffb86b` (paid CTA only), text `#f2f4f8` / `#a6adbb` / `#6b7280`.
- Fonts: Space Grotesk (body/display) and JetBrains Mono (accents) from Google Fonts.
- Runtime dependencies allowed to add: `framer-motion`, `@react-three/fiber`, `three`, `lenis`. Remove `@supabase/supabase-js`.
- Every motion component must render statically when `useReducedMotion()` returns `true`.
- Three.js is loaded with `React.lazy`, never in the initial bundle.
- `npm run typecheck && npm run lint && npm run build && npm test` must pass before every commit.
- Commit messages end with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Each task = one branch `redesign/<n>-<slug>` from `main`, one PR into `main`, merged after review. Netlify deploys `main`.
- Calendar URL: `https://calendar.app.google/QfV5shFu5VgQiV3s7`. Stripe link URL is filled in Task 5; until then the button points at the calendar.

---

### Task 1: Foundation — dependencies, tokens, config, content, CI

**Files:**
- Modify: `package.json`, `tailwind.config.js`, `src/index.css`, `index.html` (fonts only)
- Create: `src/config.ts`, `src/content/hero.ts`, `src/content/services.ts`, `src/content/process.ts`, `src/content/work.ts`, `src/content/stack.ts`, `src/content/index.ts`
- Create: `src/hooks/useReducedMotion.ts`, `src/hooks/useIsMobile.ts`
- Create: `vitest.config.ts`, `src/content/content.test.ts`
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces: `links` (config), typed content arrays, `useReducedMotion(): boolean`, `useIsMobile(): boolean`. No visual change in this task (old `App.tsx` still renders).

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull && git checkout -b redesign/1-foundation
```

- [ ] **Step 2: Dependencies**

```bash
npm uninstall @supabase/supabase-js
npm install framer-motion @react-three/fiber three lenis
npm install -D vitest @types/three
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 3: Tailwind tokens** — replace `theme.extend` in `tailwind.config.js` with:

```js
extend: {
  colors: {
    base: '#05060a',
    surface: '#0b0d14',
    line: 'rgba(255,255,255,0.08)',
    accent: '#5ef2ff',
    warm: '#ffb86b',
    ink: { DEFAULT: '#f2f4f8', muted: '#a6adbb', dim: '#6b7280' },
  },
  fontFamily: {
    sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
    mono: ['"JetBrains Mono"', 'monospace'],
  },
  maxWidth: { page: '72rem' },
}
```

- [ ] **Step 4: Base CSS** — replace `src/index.css` entirely:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
html, body, #root { min-height: 100%; }
body {
  @apply bg-base text-ink font-sans antialiased;
  overflow-x: hidden;
}
::selection { background: rgba(94,242,255,0.25); }

.glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
  border: 1px solid var(--line, rgba(255,255,255,0.08));
  backdrop-filter: blur(14px);
}
.hairline { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent); }
.kicker { @apply font-mono text-xs tracking-[0.3em] uppercase text-accent/80; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 5: Fonts in `index.html`** — replace the two Google Fonts `<link>` tags (preload + stylesheet) with the Space Grotesk + JetBrains Mono URL:

`https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap`

Also set `<meta name="theme-color" content="#05060a">`.

- [ ] **Step 6: Config**

`src/config.ts`:
```ts
export const links = {
  calendar: 'https://calendar.app.google/QfV5shFu5VgQiV3s7',
  /** Stripe Payment Link; empty string means "not configured yet" — UI falls back to calendar. */
  stripe: '',
  email: 'marcelarezkova98@icloud.com',
  linkedin: 'https://www.linkedin.com/in/marcelrezkova/',
  github: 'https://github.com/marcelrezkova',
  cv: '/MarcelaRezkova_CV_EN.pdf',
} as const;

export const bookingUrl = () => links.stripe || links.calendar;
```

- [ ] **Step 7: Content files** (copy verbatim from spec section "Content")

`src/content/hero.ts`:
```ts
export const hero = {
  kicker: 'AI Engineer · Agentic systems · Product builder',
  title: 'I design products and build them with AI agents.',
  sub: 'Knowledge-driven agent orchestration, full-stack and data engineering underneath, and a product mindset that starts from market data.',
  primary: { label: 'Book a session', href: '#work-with-me' },
  secondary: { label: 'See how I work', href: '#how' },
  location: 'Czech Republic · open to AI & R&D teams in Europe',
};
```

`src/content/services.ts`:
```ts
export type Service = { title: string; body: string };
export const services: Service[] = [
  { title: 'Agentic AI systems', body: 'Multi-agent orchestration with clear roles (planner, implementer, reviewer), MCP integrations, and knowledge networks that give agents the context they need. Spec → plan → build → review workflows that ship.' },
  { title: 'Full-stack & data foundation', body: 'React/Next.js frontends, Python/FastAPI and Rust services, DuckDB/SQL analytics, ETL pipelines and CI automation. Production systems with auth, payments, SEO.' },
  { title: 'Product & delivery', body: 'From market data to a shipped product: opportunity analysis, unit economics, specification, and delivery with measurable results. Founder experience, public-sector and community projects, team presentations.' },
];
```

`src/content/process.ts`:
```ts
export type Step = { n: string; title: string; body: string };
export const steps: Step[] = [
  { n: '01', title: 'Validate with data', body: 'Market and pricing data first; an idea only survives if the numbers do.' },
  { n: '02', title: 'Specify and plan', body: 'Design spec, decomposition into independent tasks, explicit interfaces.' },
  { n: '03', title: 'Build with agents, review with agents', body: 'Implementation by orchestrated agents, every task reviewed for spec compliance and code quality before merge.' },
  { n: '04', title: 'Ship and measure', body: 'Automated deploys, event-driven monitoring, iterate on what the data says.' },
];
export const processLine = 'Creative when there is room to explore, decisive when I know what I am holding, and always anchored in data.';
```

`src/content/work.ts`:
```ts
export type Work = { title: string; body: string; tags: string[]; status?: string };
export const work: Work[] = [
  { title: 'Agentic market-opportunity platform', body: 'Local AI orchestrator in Rust that collects public signals from dozens of sources, scores emerging opportunities for a target market, and produces a daily brief with audience, pricing and timing. Event-driven, MCP-ready.', tags: ['Rust', 'SurrealDB', 'MCP', 'Ollama'], status: 'In active development' },
  { title: 'Automotive data platform with multi-agent development', body: 'Five-layer ETL (raw → staging → core → metrics → mart) over scraped listings, deal-scoring engine, React frontend with 3D visualisation; development tasks dispatched to specialised agents via Slack and CI.', tags: ['Python', 'FastAPI', 'DuckDB', 'React', 'Claude API'] },
  { title: 'Analytics tool for regional government', body: 'API-first FastAPI service over a live SQL Server database that detects stale investment actions across thousands of records using configurable validators; built in a three-person team and presented to stakeholders.', tags: ['Python', 'FastAPI', 'SQL Server', 'Docker'] },
  { title: 'Production web apps with bookings and payments', body: 'Next.js and React applications with admin panels, booking systems, e-mail notifications, payment-gateway integration and structured-data SEO for small businesses.', tags: ['Next.js', 'Convex', 'TypeScript', 'SEO'] },
  { title: 'Labour-market and pricing analytics', body: 'Automated daily pipelines comparing official statistics with real market data from 14+ sources; DuckDB analytics and interactive dashboards.', tags: ['Python', 'DuckDB', 'GitHub Actions', 'Streamlit'] },
];
```

`src/content/stack.ts`:
```ts
export const stack: Record<string, string[]> = {
  Languages: ['Python', 'TypeScript', 'Rust', 'SQL'],
  AI: ['Claude API & Agent SDK', 'MCP', 'Multi-agent orchestration', 'Prompt & eval design', 'Ollama'],
  Frontend: ['React', 'Next.js', 'Tailwind', 'Three.js'],
  'Backend & data': ['FastAPI', 'DuckDB', 'Supabase', 'SurrealDB', 'ETL'],
  Ops: ['Docker', 'GitHub Actions', 'Netlify', 'Railway', 'Fly.io'],
};
```

`src/content/index.ts`:
```ts
export * from './hero'; export * from './services'; export * from './process'; export * from './work'; export * from './stack';
```

- [ ] **Step 8: Hooks**

`src/hooks/useReducedMotion.ts`:
```ts
import { useEffect, useState } from 'react';
const QUERY = '(prefers-reduced-motion: reduce)';
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

`src/hooks/useIsMobile.ts` — same shape with query `(max-width: 767px)` and name `useIsMobile`.

- [ ] **Step 9: Failing content test**

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['src/**/*.test.ts'] } });
```

`src/content/content.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { hero, services, steps, work, stack } from './index';
import { links, bookingUrl } from '../config';

const CZECH = /[ěščřžýáíéůú]/i;
const BANNED = /trefk|simon|iiidm|czechpaygap|drahenice|kraj vyso|elmarce/i;

describe('content', () => {
  it('has three services, four steps, five work cards', () => {
    expect(services).toHaveLength(3); expect(steps).toHaveLength(4); expect(work).toHaveLength(5);
  });
  it('contains no Czech text and no project names', () => {
    const all = JSON.stringify({ hero, services, steps, work, stack });
    expect(all).not.toMatch(CZECH); expect(all).not.toMatch(BANNED);
  });
  it('booking falls back to calendar when stripe is empty', () => {
    expect(links.calendar).toMatch(/^https:\/\/calendar\.app\.google\//);
    expect(bookingUrl()).toBe(links.stripe || links.calendar);
  });
});
```

Run `npm test` → PASS (content already matches). Run `npm run typecheck && npm run lint && npm run build` → all pass.

- [ ] **Step 10: CI workflow**

`.github/workflows/ci.yml`:
```yaml
name: ci
on: { pull_request: {}, push: { branches: [main] } }
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

- [ ] **Step 11: Commit, PR, merge**

```bash
git add -A && git commit -m "chore: redesign foundation — tokens, content, config, vitest, CI" -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
git push -u origin redesign/1-foundation
gh pr create --fill --base main && gh pr merge --squash --delete-branch
```

---

### Task 2: New page shell and all sections (static)

**Files:**
- Rewrite: `src/App.tsx`
- Create: `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Section.tsx`, `src/components/sections/{Hero,WhatIDo,HowIWork,SelectedWork,WorkWithMe,Stack,Contact}.tsx`
- Delete: `src/components/DecorativeElements.tsx`
- Modify: `index.html` (replace hidden SEO block with English version; update title/description/OG/JSON-LD to new positioning)
- Keep: `src/components/FoxMascot.tsx` (use `TechFoxIcon` with `color="#5ef2ff"`)

**Interfaces:**
- Consumes: `links`, `bookingUrl`, content modules, hooks from Task 1.
- Produces: section ids `hero`, `what`, `how`, `work`, `work-with-me`, `stack`, `contact`; `Button` (`variant: 'primary' | 'ghost' | 'warm'`, `href`); `Section` (`id`, `kicker`, `title`, `children`). Task 3 replaces the hero background; Task 4 wraps these with motion.

- [ ] **Step 1: Branch** `git checkout main && git pull && git checkout -b redesign/2-sections`

- [ ] **Step 2: UI primitives**

`src/components/ui/Button.tsx`:
```tsx
import type { ReactNode } from 'react';
type Props = { href: string; children: ReactNode; variant?: 'primary' | 'ghost' | 'warm'; external?: boolean; className?: string };
const styles = {
  primary: 'bg-accent text-base hover:shadow-[0_0_40px_rgba(94,242,255,0.35)]',
  ghost: 'border border-line text-ink hover:border-accent/60 hover:text-accent',
  warm: 'bg-warm text-base hover:shadow-[0_0_40px_rgba(255,184,107,0.35)]',
};
export function Button({ href, children, variant = 'primary', external, className = '' }: Props) {
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300 ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}
```

`src/components/ui/Section.tsx`:
```tsx
import type { ReactNode } from 'react';
type Props = { id: string; kicker: string; title: string; children: ReactNode; className?: string };
export function Section({ id, kicker, title, children, className = '' }: Props) {
  return (
    <section id={id} className={`relative mx-auto max-w-page px-6 py-24 md:py-32 ${className}`}>
      <p className="kicker mb-4">{kicker}</p>
      <h2 className="mb-12 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Nav and Footer**

`src/components/Nav.tsx`: fixed header; `useEffect` scroll listener toggles `glass` class after 40 px; left: `TechFoxIcon` + `marcela.ai` wordmark; center (md+): anchors `What I do`, `How I work`, `Work`, `Stack`, `Contact`; right: `<Button href={bookingUrl()} variant="primary">Book a session</Button>`; mobile: hamburger (`Menu`/`X` from lucide) opening a full-screen overlay with the same links.

`src/components/Footer.tsx`: hairline, one row: `© {new Date().getFullYear()} Marcela Řezková · Built with React, Three.js and AI agents.` plus LinkedIn/GitHub icon links from `links`.

- [ ] **Step 4: Sections** (all static, Tailwind only)

- `Hero.tsx`: `min-h-screen flex items-center`, static radial gradient background (`bg-[radial-gradient(ellipse_at_top,rgba(94,242,255,0.12),transparent_60%)]`); renders `hero.kicker`, `<h1 className="text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl">`, sub, two Buttons (primary → `#work-with-me`, ghost → `#how`), location line in mono. Exports `Hero({ background }: { background?: ReactNode })` so Task 3 can inject the particle canvas behind the content.
- `WhatIDo.tsx`: `Section id="what" kicker="What I do" title="Three layers, one builder."`, grid of three `glass rounded-2xl p-8` cards from `services`.
- `HowIWork.tsx`: `Section id="how" kicker="How I work" title="From data to shipped."`, four steps in a 2×2 grid (number in mono accent, title, body), then `processLine` in italic ink-muted below.
- `SelectedWork.tsx`: `Section id="work" kicker="Selected work" title="Things I have built."`, list of five cards (title, optional status pill in accent, body, tags as mono chips).
- `WorkWithMe.tsx`: `Section id="work-with-me" kicker="Work with me" title="45-minute working session — 39 EUR"`, paragraph from spec, `<Button href={bookingUrl()} variant="warm" external>Pay & book</Button>`, small line `Already paid? <a href={links.calendar}>Pick your slot</a>`.
- `Stack.tsx`: `Section id="stack" kicker="Stack" title="Tools I reach for."`, groups from `stack` as rows of chips.
- `Contact.tsx`: `Section id="contact" kicker="Contact" title="Let's talk."`, four links (email `mailto:`, LinkedIn, GitHub, Download CV) + Book a session button.

- [ ] **Step 5: App.tsx**

```tsx
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { WhatIDo } from './components/sections/WhatIDo';
import { HowIWork } from './components/sections/HowIWork';
import { SelectedWork } from './components/sections/SelectedWork';
import { WorkWithMe } from './components/sections/WorkWithMe';
import { Stack } from './components/sections/Stack';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIDo /><HowIWork /><SelectedWork /><WorkWithMe /><Stack /><Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: index.html** — title `Marcela Řezková — AI Engineer · Agentic systems & product builder`; description `AI Engineer building agentic systems and products: multi-agent orchestration, MCP, knowledge networks, full-stack and data engineering. Book a 45-minute working session.`; OG/Twitter titles and descriptions to match; JSON-LD `jobTitle` → `AI Engineer`, remove `worksFor`, `knowsAbout` → `["AI Agents","Multi-agent orchestration","MCP","Rust","Python","TypeScript","React","DuckDB","ETL","Product development"]`; replace the hidden crawler block with English `<h1>`, one paragraph per section (copy from content files), section anchors matching new ids.

- [ ] **Step 7: Verify** — `npm run typecheck && npm run lint && npm test && npm run build`; `npm run dev` and check in the built-in browser at 1440 and 375 px: all seven sections render, nav anchors scroll, no Czech text (`grep -rn "[ěščřžýáíéůú]" src index.html` returns only the name Řezková).

- [ ] **Step 8: Commit, PR, merge** — `feat: new page shell and sections for AI-engineer positioning`.

---

### Task 3: Hero particle field and boot sequence

**Files:**
- Create: `src/components/hero/ParticleField.tsx`, `src/components/hero/particles.ts`, `src/components/hero/particles.test.ts`, `src/components/hero/BootSequence.tsx`
- Modify: `src/components/sections/Hero.tsx`, `src/App.tsx`

**Interfaces:**
- Produces: `makeNetwork(count: number, radius: number, seed: number): { positions: Float32Array; links: Uint16Array }` (pure, tested); `ParticleField` default export (lazy); `BootSequence({ onDone })`.

- [ ] **Step 1: Branch** `redesign/3-hero`

- [ ] **Step 2: Failing test for the network generator**

`src/components/hero/particles.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { makeNetwork } from './particles';
describe('makeNetwork', () => {
  it('returns count*3 positions inside the radius and pairs of valid indices', () => {
    const { positions, links } = makeNetwork(200, 5, 42);
    expect(positions).toHaveLength(600);
    for (let i = 0; i < 200; i++) {
      const r = Math.hypot(positions[i*3], positions[i*3+1], positions[i*3+2]);
      expect(r).toBeLessThanOrEqual(5.0001);
    }
    expect(links.length % 2).toBe(0);
    for (const idx of links) expect(idx).toBeLessThan(200);
  });
  it('is deterministic for a seed', () => {
    expect(makeNetwork(50, 3, 7).positions).toEqual(makeNetwork(50, 3, 7).positions);
  });
});
```
Run `npm test` → FAIL (module missing).

- [ ] **Step 3: Implement `particles.ts`**

```ts
function mulberry32(seed: number) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function makeNetwork(count: number, radius: number, seed = 1) {
  const rnd = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rnd(), v = rnd();
    const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(rnd());
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
  }
  const out: number[] = [];
  const maxD2 = (radius * 0.35) ** 2;
  for (let i = 0; i < count; i++) {
    let made = 0;
    for (let j = i + 1; j < count && made < 2; j++) {
      const dx = positions[i*3]-positions[j*3], dy = positions[i*3+1]-positions[j*3+1], dz = positions[i*3+2]-positions[j*3+2];
      if (dx*dx+dy*dy+dz*dz < maxD2) { out.push(i, j); made++; }
    }
  }
  return { positions, links: Uint16Array.from(out) };
}
```
Run `npm test` → PASS.

- [ ] **Step 4: `ParticleField.tsx`** (default export, R3F)

```tsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { makeNetwork } from './particles';

function Network({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const { positions, links } = useMemo(() => makeNetwork(count, 6, 11), [count]);
  const linePositions = useMemo(() => {
    const arr = new Float32Array(links.length * 3);
    links.forEach((idx, k) => { arr[k*3] = positions[idx*3]; arr[k*3+1] = positions[idx*3+1]; arr[k*3+2] = positions[idx*3+2]; });
    return arr;
  }, [positions, links]);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.25, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.25, 0.05);
  });
  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <pointsMaterial size={0.035} color="#5ef2ff" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#5ef2ff" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function ParticleField({ count = 2400, animate = true }: { count?: number; animate?: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 55 }} frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ position: 'absolute', inset: 0 }} aria-hidden>
      <Network count={count} />
    </Canvas>
  );
}
```

- [ ] **Step 5: `BootSequence.tsx`** — full-screen fixed overlay (`bg-base z-[60]`), a 1 px accent line growing from 0 to 100 % width over 700 ms (framer-motion `animate={{ width: '100%' }}`), mono caption `initialising · marcela.ai`, then fades out (`exit={{ opacity: 0 }}`) and calls `onDone`. Skipped entirely (renders `null` and calls `onDone` immediately) when `useReducedMotion()` or `useIsMobile()` is true, or when `sessionStorage.getItem('booted')` is set; sets that key on completion.

- [ ] **Step 6: Wire into Hero and App**

In `Hero.tsx`: wrap content in `relative`, render `background` prop in an absolutely positioned div with a static fallback gradient. In `App.tsx`:
```tsx
const ParticleField = lazy(() => import('./components/hero/ParticleField'));
// inside Hero:
<Hero background={
  <Suspense fallback={null}>
    <ParticleField count={isMobile ? 600 : 2400} animate={!reduced} />
  </Suspense>
} />
```
with `const reduced = useReducedMotion(); const isMobile = useIsMobile();` and `<AnimatePresence>{!booted && <BootSequence onDone={() => setBooted(true)} />}</AnimatePresence>`. Wrap `ParticleField` in a tiny error boundary component (`class CanvasBoundary extends Component` with `componentDidCatch` → render `null`) so WebGL failure leaves the gradient.

- [ ] **Step 7: Verify** — build; check in browser: particles rotate and tilt with the pointer; boot line appears once per session; `resize_window` to mobile → no boot, lighter field; emulate reduced motion → static field. `npm run build` output: `three` lands in a separate chunk (check `dist/assets` names).

- [ ] **Step 8: Commit, PR, merge** — `feat: hero knowledge-network particle field and boot sequence`.

---

### Task 4: Scroll motion — reveal, scramble, tilt cards, progress line, smooth scroll

**Files:**
- Create: `src/components/motion/Reveal.tsx`, `src/components/motion/Scramble.tsx`, `src/components/motion/scramble.ts`, `src/components/motion/scramble.test.ts`, `src/components/motion/TiltCard.tsx`, `src/components/motion/ScrollProgress.tsx`, `src/components/motion/SmoothScroll.tsx`
- Modify: `src/components/ui/Section.tsx` (title uses `Scramble`), all `sections/*.tsx` (cards wrapped in `TiltCard`, blocks in `Reveal`), `src/App.tsx` (`SmoothScroll`, `ScrollProgress`)

**Interfaces:**
- Produces: `scrambleFrames(target: string, frames: number, rnd: () => number): string[]` (pure, tested); `Reveal({ children, delay? })`, `Scramble({ text })`, `TiltCard({ children, className? })`, `ScrollProgress()`, `SmoothScroll({ children })`.

- [ ] **Step 1: Branch** `redesign/4-motion`

- [ ] **Step 2: Failing test**

`src/components/motion/scramble.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { scrambleFrames } from './scramble';
describe('scrambleFrames', () => {
  it('ends on the target, keeps length and spaces, resolves left to right', () => {
    const frames = scrambleFrames('AB CD', 6, () => 0.5);
    expect(frames.at(-1)).toBe('AB CD');
    for (const f of frames) { expect(f).toHaveLength(5); expect(f[2]).toBe(' '); }
    expect(frames[3].startsWith('AB')).toBe(true);
  });
});
```

- [ ] **Step 3: Implement `scramble.ts`**

```ts
const GLYPHS = '#%&/<>=+*_-01';
export function scrambleFrames(target: string, frames: number, rnd: () => number = Math.random): string[] {
  const out: string[] = [];
  for (let f = 1; f <= frames; f++) {
    const resolved = Math.round((f / frames) * target.length);
    let s = '';
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      s += ch === ' ' || i < resolved ? ch : GLYPHS[Math.floor(rnd() * GLYPHS.length)];
    }
    out.push(s);
  }
  out[out.length - 1] = target;
  return out;
}
```
`npm test` → PASS.

- [ ] **Step 4: Motion components**

- `Scramble.tsx`: `useInView` (framer-motion, `once: true`) on a `<span>`; when in view and not reduced, iterate `scrambleFrames(text, 18)` at 40 ms per frame via `setInterval`; reduced → render `text` directly. Keep `aria-label={text}`.
- `Reveal.tsx`: `motion.div` with `initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}`; reduced → plain `div`.
- `TiltCard.tsx`: wraps children in `motion.div` with `style={{ rotateX, rotateY, transformPerspective: 900 }}` driven by `useMotionValue` + `useSpring` from `onPointerMove` (max ±6°), plus a CSS var `--mx/--my` for a radial highlight border (`background: radial-gradient(240px circle at var(--mx) var(--my), rgba(94,242,255,0.18), transparent 60%)` on a `::before` layer). Disabled (plain `div`) when reduced or mobile.
- `ScrollProgress.tsx`: fixed 2 px line at `left-0 top-0 h-full`, `scaleY` bound to `useScroll().scrollYProgress` with `useSpring`, `origin-top`, accent colour, hidden on mobile.
- `SmoothScroll.tsx`: instantiates `lenis` in `useEffect` with `{ lerp: 0.08 }`, `requestAnimationFrame` loop, destroyed on unmount; renders children; no-op when reduced.

- [ ] **Step 5: Apply** — `Section` title → `<Scramble text={title} />`; every card in `WhatIDo`, `SelectedWork`, `HowIWork` → `<TiltCard>`; each card/paragraph group → `<Reveal delay={i * 0.08}>`; `App` → `<SmoothScroll><Nav/>…<ScrollProgress/></SmoothScroll>`.

- [ ] **Step 6: Verify** — build; browser: headings scramble once, cards tilt and glow toward the pointer, progress line tracks scroll; reduced motion → none of it; mobile → no tilt. Lint clean (hooks rules).

- [ ] **Step 7: Commit, PR, merge** — `feat: scroll motion — reveal, glyph scramble, tilt cards, progress line`.

---

### Task 5: Stripe Payment Link and Work-with-me flow

**Files:**
- Modify: `src/config.ts` (fill `links.stripe`), `src/components/sections/WorkWithMe.tsx` (final layout), `src/content/content.test.ts` (assert stripe URL shape)

**Interfaces:**
- Consumes: Stripe connector (`stripe_api_write`) to create Product + Price + Payment Link. Not code: done once by the operator.

- [ ] **Step 1: Branch** `redesign/5-stripe`

- [ ] **Step 2: Create Stripe objects via the connector** (live mode, after Marcela confirms the account): Product `45-minute working session` (description from spec), Price `3900` EUR one-time, Payment Link with `after_completion = { type: 'redirect', redirect: { url: 'https://calendar.app.google/QfV5shFu5VgQiV3s7' } }`, `billing_address_collection: 'auto'`. Record the link URL.

- [ ] **Step 3: Update test** — add `expect(links.stripe).toMatch(/^https:\/\/buy\.stripe\.com\//);` to the booking test. Run → FAIL.

- [ ] **Step 4: Fill `links.stripe`** with the URL. Run `npm test` → PASS.

- [ ] **Step 5: Final `WorkWithMe` layout** — two-column on md+: left = what you get (three bullet lines: "Where AI agents fit in your product or workflow", "Review of your existing agentic setup", "Scoping of a web or data build") + "Written summary and next steps within 24 hours"; right = `glass` price card: `39 EUR` large, `45 minutes · video call · pay first, then pick a slot`, `Pay & book` warm button (`links.stripe`, external), then `Already paid? Pick your slot` (calendar link).

- [ ] **Step 6: Verify** — build; click-through in browser opens the Stripe page with the right product/price (do not pay); calendar link opens the appointment page.

- [ ] **Step 7: Commit, PR, merge** — `feat: paid working session via Stripe Payment Link`.

---

### Task 6: SEO, OG image, cleanup, performance pass

**Files:**
- Modify: `og-image-template.html` (new positioning, new palette), regenerate `public/og-image.png` (1200×630) with the built-in browser screenshot
- Modify: `public/sitemap.xml` (lastmod today), `public/robots.txt` (unchanged unless wrong)
- Delete: `document.pdf` (root, stray), `src/components/DecorativeElements.tsx` if still present, unused Tailwind keyframes
- Modify: `netlify/netlify.toml` — add headers block: `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`

**Interfaces:** none new.

- [ ] **Step 1: Branch** `redesign/6-polish`
- [ ] **Step 2: OG image** — update template copy to `Marcela Řezková · AI Engineer` / `I design products and build them with AI agents.` on the `#05060a` background with an accent hairline; open the template in the built-in browser at 1200×630 and save the screenshot as `public/og-image.png`.
- [ ] **Step 3: Cleanup and headers** as listed; `npm run build` and confirm the initial JS chunk (excluding `three`) is under 180 kB gzipped (`ls -la dist/assets`).
- [ ] **Step 4: Lighthouse** — after merge, run Lighthouse (mobile) against https://fullstackdev.cz in the built-in browser devtools or `npx lighthouse https://fullstackdev.cz --preset=mobile --only-categories=performance`; performance ≥ 85. If below: lower particle count to 1600 desktop, defer fonts with `font-display: swap` (already), or cap `dpr` at 1.25.
- [ ] **Step 5: Commit, PR, merge** — `chore: SEO metadata, OG image, cache headers and cleanup`.

---

## Self-review

- **Spec coverage:** purpose/positioning (T1 content, T2 copy), stack changes (T1), visual language incl. hero, scroll, cards, nav, reduced motion, mobile, lazy three (T2–T4), all seven content sections (T2, T5), architecture layout (T1–T4), error handling WebGL (T3), Stripe flow (T5), CI + manual + Lighthouse (T1, each task, T6), delivery as six PRs (one per task). Fonts and theme colour (T1). Old features removed: coffee link, terminal style, Czech (T2). ✔
- **Placeholders:** none; every step has code or an exact action.
- **Type consistency:** `links`, `bookingUrl`, `hero`, `services`, `steps`, `processLine`, `work`, `stack`, `useReducedMotion`, `useIsMobile`, `Button`, `Section`, `Hero({ background })`, `makeNetwork`, `ParticleField({ count, animate })`, `BootSequence({ onDone })`, `scrambleFrames`, `Reveal`, `Scramble`, `TiltCard`, `ScrollProgress`, `SmoothScroll` used with the same names throughout. ✔
