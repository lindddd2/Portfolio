# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite on port 5173 by default; launch config uses `--port 5174`)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Lint:** `npm run lint`
- **Preview production build:** `npm run preview`

## Architecture

This is a personal portfolio website for Linxuan Qiu built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.

### Routing

Hash-based routing in `App.tsx` — no router library. Pages are determined by `window.location.hash`:
- `#` → Home (hero with photo overlay)
- `#about` → About page
- `#projects` → Projects with scroll-stacking cards
- `#strengths` → Strengths with scroll-stacking cards
- `#contact` → Contact footer (full-screen)
- `#danacol` → Danacol case study sub-page (has its own back nav, hides main Navbar)

The `navigate()` function in App.tsx handles all page transitions. The Navbar reads `window.location.hash` to highlight the active link.

### Layer Structure

The app uses a fixed z-index layering system:
- **z-0:** `Threads` WebGL background (fixed, `pointerEvents: none`) — golden animated lines via `ogl` shader
- **z-1:** Page content (all sections have `background: transparent` so Threads shows through)
- **z-50:** Navbar (fixed, blur backdrop on scroll)
- **z-200:** ScrollProgress bar

### Design System

Dark palette with golden accents — all colors are inline styles, not Tailwind theme tokens:
- Background: `#0c0a07` (set on `body` in `index.css`)
- Card surfaces: `#161310`, `#131110`
- Borders: `rgba(255,255,255,0.04)`
- Golden accent: `#c8913a` (used sparingly for labels, icons, stat numbers)
- Text: `#f2f0ed` (headings), `#6a6560` / `#5a5650` (body/muted)
- Fonts: Space Grotesk (headings), Archivo (body) — loaded via Google Fonts in `index.css`

### Key Components

**`src/components/ui/`** — Reusable UI primitives (shadcn-style structure):
- `BorderGlow` — Hover-reactive glowing border card (CSS + JS, uses CSS custom properties for glow color/intensity)
- `CardStack` — Scroll-linked stacking cards using Framer Motion `useScroll`/`useTransform` (no external scroll library). Takes `stickyHeight` prop to control scroll distance per card.
- `Threads` — WebGL animated lines background using `ogl`. Renders to a canvas. Color is RGB array `[r,g,b]` in 0-1 range.
- `radial-orbital-timeline` — Orbiting nodes with click-to-expand cards. Uses `setInterval` for auto-rotation.
- `shape-landing-hero` — Hero section with giant MARKETING/MANAGER text and photo overlay
- `accordion`, `badge`, `button`, `card` — shadcn/ui components using Radix primitives
- `button-colorful` — Gradient glow CTA button

**`src/components/`** — Page sections:
- `DanacolCaseStudy` — Full case study page with accordion layout (left: section descriptions, right: interactive content panels including the orbital timeline). Embeds PDF via iframe from `/docs/danacol-presentation.pdf`.

### Path Alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Static Assets

`public/` contains:
- `photo-nobg.png` — Profile photo with background removed (via `rembg`)
- `logo.png` — Logo icon for navbar
- `docs/danacol-presentation.pdf` — Embedded PDF for case study

### CSS

Tailwind v4 via `@tailwindcss/vite` plugin. Custom theme tokens defined in `index.css` under `@theme`. Accordion animations (`accordion-up`/`accordion-down`) are also defined there with `@keyframes`. Some components have co-located CSS files (`BorderGlow.css`, `Threads.css`, `ScrollStack.css`).

### Important Notes

- This is a Vite project, NOT Next.js. Do not use `"use client"` directives — they cause hooks errors.
- All section backgrounds must be `transparent` so the fixed Threads WebGL layer shows through. Never set opaque backgrounds on sections.
- The `ScrollStack` component (using `lenis`) is installed but NOT used — it was replaced by `CardStack` (Framer Motion only) to avoid scroll hijacking conflicts. Do not reintroduce Lenis-based scroll.
