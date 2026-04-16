# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# daze — minimal aesthetic diary PWA

## What is daze
A minimal aesthetic daily diary for Gen Z students. Anti-Dayol: calm,
clean, no clutter. "for your daily daze."

## Tech Stack
- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS v4 (CSS-based config in globals.css, no tailwind.config.ts)
- localStorage for data persistence
- Framer Motion for animations
- Lucide React for icons
- PWA: serwist service worker + app/manifest.ts route

## v1 Features
1. Daily entry writing (calendar + write today, auto-save)
2. Mood tracker (5 emoji per entry)
3. Streak counter (consecutive writing days)
4. Tags / categories (max 3 per entry)
5. Decorative themes (5 minimal aesthetic options)

## Aesthetic Direction
- Always lowercase "daze" — never DAZE or Daze
- Minimal, generous whitespace, single-column mobile
- Default theme: "Midnight" (dark slate + soft purple)
- Typography: serif for entry text, clean sans for UI
- Animations: subtle and calm, never bouncy
- Microcopy: soft and warm — "What's on your mind today?"

## Commands

```bash
npm run dev       # start dev server with Turbopack (localhost:3000)
npm run build     # production build (uses --webpack for serwist compatibility)
npm run lint      # ESLint
```

## Architecture

- **Theming**: CSS variables (`--theme-bg`, `--theme-surface`, `--theme-accent`, `--theme-text`, `--theme-muted`) set on `:root` in `globals.css`. `ThemeProvider` reads the active theme from localStorage and overrides these via `document.documentElement.style.setProperty`. Use `style={{ color: "var(--theme-accent)" }}` in components — do not use hardcoded colors.
- **Fonts**: Geist (sans, UI) and Lora (serif, entry text) loaded via `next/font/google` as `--font-geist` / `--font-lora`. Use `font-sans` and `font-serif` Tailwind utilities.
- **PWA**: Service worker source at `app/sw.ts`, compiled by serwist to `public/sw.js` at build time. Disabled in dev (Turbopack incompatibility). Manifest served via `app/manifest.ts` route handler.
- **Navigation**: `BottomNav` uses `usePathname()` to detect active tab. `PageTransition` wraps `{children}` in layout with a `motion.div` keyed to pathname for enter animations.

## Conventions
- Tailwind v4 — no `tailwind.config.ts`. Extend the design system via `@theme` block in `globals.css`.
- Components in `/components`, hooks in `/hooks`, theme data in `/lib/themes.ts`
- All data in localStorage via `useLocalStorage` hook (SSR-safe, returns `[value, setter, isHydrated]`)
- Mobile-first design (375px minimum)
