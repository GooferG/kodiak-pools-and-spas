# Fluid Particles Background — Design

**Date:** 2026-06-01
**Status:** Approved (design), pending spec review

## Goal

Add a subtle, on-brand animated particle backdrop behind the whole site to give
the page "more life" without distracting from content or hurting legibility. The
effect is a Perlin-noise fluid drift, reading as gentle water/current — fitting
for a pool-service site.

## Source

Adapted from a community `FluidParticlesBackground` component. The source targets
a **shadcn + Tailwind dark-mode** stack this repo does NOT use. We adapt rather
than scaffold shadcn (Approach A — chosen over installing shadcn just for one
background).

### Why the source doesn't drop in verbatim

- Imports `cn` from `@/lib/utils` — does not exist here (no shadcn, no clsx/tailwind-merge).
- Uses Tailwind `dark:` classes + a light/dark `COLOR_SCHEME` — this repo themes
  via CSS custom properties (`--color-*` tokens in `app/globals.css`), not Tailwind dark mode.
- Expects `components/ui/` path — this repo places components in `app/components/`.
- Demo renders content *inside* the component (`h-screen` fullscreen wrapper) — we
  want a fixed page-wide backdrop with site content rendered separately.

## Architecture

### Component: `app/components/ParticlesBackground.tsx`

- `"use client"` (uses canvas, `useRef`, `useEffect`, `window`).
- Keeps the source's Perlin-noise engine (`createNoise` / `simplex3`) unchanged —
  the math is sound.
- **Removes** the `cn` / `@/lib/utils` import — replaced with a plain `className`
  string (only one merge site).
- **Removes** the light/dark `COLOR_SCHEME` — single on-brand color instead.
- Particles drawn in cornflower-blue. Color read once from the `--color-blue`
  token (`#2c66b2`) via `getComputedStyle(document.documentElement)`, with a
  hardcoded hex fallback. Light-blue `#8fb4e6` acceptable alternative tint.
- **Max alpha ~0.10** so text over the canvas stays crisp everywhere.
- Canvas clears each frame with a very faint transparent fill (keeps the source's
  trail effect) — does NOT paint an opaque background (source filled white/black;
  we let the page's cream `--color-paper` show through).

### Props (all optional, sensible defaults)

| Prop | Default | Purpose |
|------|---------|---------|
| `particleCount` | `2000` (desktop) | Number of particles; auto-reduced on mobile |
| `color` | `--color-blue` token / `#2c66b2` | Particle tint |
| `maxOpacity` | `0.10` | Legibility ceiling |
| `noiseIntensity` | `0.003` | Drift turbulence (source default) |
| `particleSize` | `{ min: 0.5, max: 2 }` | Particle radius range |
| `className` | — | Extra classes on the wrapper |

No `children` prop — this is a pure backdrop. Site content lives in layout's
`{children}`, not inside the component.

### Mount point: `app/layout.tsx`

Rendered once, fixed, behind all content:

```tsx
<body>
  <ParticlesBackground />   {/* fixed, inset:0, z-index:-1, pointer-events:none, aria-hidden */}
  {children}
</body>
```

- One canvas for the whole site.
- `position: fixed; inset: 0; z-index: -1` — sits under all sections.
- `pointer-events: none` — never blocks clicks/scroll.
- `aria-hidden="true"` — decorative, hidden from assistive tech.
- Existing sections keep their own backgrounds; particles show through transparent/
  translucent gaps and page edges as subtle texture.

## Safeguards (chosen)

1. **Respect `prefers-reduced-motion`.** If `matchMedia("(prefers-reduced-motion: reduce)")`
   matches, render nothing — no canvas, no animation loop. Re-check on media-query change.
2. **Lower mobile particle count.** `2000` desktop, `600` when `innerWidth < 768`.
   Recomputed on (debounced) resize.
3. **Legibility (always on, not optional).** Max alpha ~0.10, faint blue tint.

Not included (per user choice): pause-on-tab-hidden, brighter mode.

## Performance / lifecycle fixes vs source

- Single `requestAnimationFrame` loop, **cancelled on unmount** (source leaks the
  rAF handle — fixed).
- `noise` created **once** and not in the effect dependency array (source recreates
  it every render and lists it as a dep, which would re-run the effect — fixed).
- Canvas sized to `window` and **DPR-aware** (crisp on retina).
- Resize handler debounced; rebuilds particle array on viewport-class change.

## Error handling

- Bail early if canvas ref or 2D context is null (source already does this).
- Token read wrapped so a missing/empty `--color-blue` falls back to `#2c66b2`.

## Testing / verification

No test runner in repo. Verification:

- `next build` passes (TypeScript + lint clean).
- Manual: load page → particles drift; click links/buttons → still work (pointer-events);
  toggle OS reduced-motion → canvas absent/static; resize to < 768px → fewer particles.

## Out of scope

- Installing shadcn / `lib/utils` / Tailwind dark mode (Approach B, rejected).
- Particles behind a single section only (Approach C, rejected — full-page chosen).
- Interactive particles (mouse repel, etc.).
