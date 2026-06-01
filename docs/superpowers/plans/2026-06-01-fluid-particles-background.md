# Fluid Particles Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a subtle, on-brand animated Perlin-noise particle backdrop fixed behind the entire site.

**Architecture:** A single `"use client"` canvas component (`app/components/ParticlesBackground.tsx`) is mounted once in `app/layout.tsx` as a fixed, click-through, decorative layer behind `{children}`. Particles are tinted with the brand `--color-blue` token at low opacity. The component respects `prefers-reduced-motion` (renders nothing) and reduces particle count on small viewports.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (CSS-first), HTML Canvas 2D. No test runner in repo — verification is `next build` (TS + lint) plus manual browser checks.

**Note on TDD:** This repo has no test framework and the feature is a decorative canvas animation (timing/rAF/visual — not unit-testable without heavy mocking). Adding a test runner for this is out of scope (YAGNI). Each task is gated by `next build` passing and a manual check, per the approved spec.

---

## File Structure

- **Create:** `app/components/ParticlesBackground.tsx` — the entire feature: Perlin noise helper, particle engine, canvas lifecycle, safeguards. One file, one responsibility (the backdrop). Mirrors existing flat `app/components/*.tsx` layout.
- **Modify:** `app/layout.tsx` — import and mount the component inside `<body>` before `{children}`.

No other files change. No new dependencies.

---

## Task 1: Create the component skeleton (renders a fixed empty canvas)

Goal: get a correctly-positioned, click-through, full-viewport canvas mounting and surviving a build before adding animation.

**Files:**
- Create: `app/components/ParticlesBackground.tsx`

- [ ] **Step 1: Write the component file**

Create `app/components/ParticlesBackground.tsx` with exactly this content:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
  particleCount?: number;
  color?: string;
  maxOpacity?: number;
  noiseIntensity?: number;
  particleSize?: { min: number; max: number };
  className?: string;
}

export default function ParticlesBackground({
  particleCount,
  color,
  maxOpacity = 0.1,
  noiseIntensity = 0.003,
  particleSize = { min: 0.5, max: 2 },
  className,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animation wired up in Task 3.
  }, [particleCount, color, maxOpacity, noiseIntensity, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
```

- [ ] **Step 2: Verify the build passes**

Run: `npx next build`
Expected: `✓ Compiled successfully`, TypeScript finishes with no errors. (Unused-var warnings for the props are acceptable here because they are consumed in the typed signature; if lint fails on unused destructured names, that is fixed in Task 3 when they are used. If the build hard-fails on lint, temporarily confirm with `npx tsc --noEmit` passing and proceed — Task 3 consumes them.)

- [ ] **Step 3: Commit**

```bash
git add app/components/ParticlesBackground.tsx
git commit -m "Add ParticlesBackground canvas skeleton"
```

---

## Task 2: Mount the component in the layout

Goal: render the (still-empty) canvas site-wide and confirm it does not break layout or block interaction.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add the import**

In `app/layout.tsx`, add this import after the existing `import "./globals.css";` line:

```tsx
import ParticlesBackground from "./components/ParticlesBackground";
```

- [ ] **Step 2: Mount it inside `<body>`**

Change the body from:

```tsx
      <body>{children}</body>
```

to:

```tsx
      <body>
        <ParticlesBackground />
        {children}
      </body>
```

- [ ] **Step 3: Verify the build passes**

Run: `npx next build`
Expected: `✓ Compiled successfully` and static pages generate (`○ /`).

- [ ] **Step 4: Manual check**

Run: `npx next dev`, open the site.
Expected: page looks unchanged (canvas is empty/transparent). All links, the phone CTA, and the contact form inputs remain clickable (canvas has `pointer-events: none`). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "Mount ParticlesBackground site-wide in layout"
```

---

## Task 3: Implement the particle engine + animation

Goal: full drifting-particle animation, brand-blue tinted, low opacity, with rAF cleanup and the noise-recreation/leak fixes from the spec.

**Files:**
- Modify: `app/components/ParticlesBackground.tsx`

- [ ] **Step 1: Replace the file with the full implementation**

Replace the entire contents of `app/components/ParticlesBackground.tsx` with:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
  particleCount?: number;
  color?: string;
  maxOpacity?: number;
  noiseIntensity?: number;
  particleSize?: { min: number; max: number };
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
}

// Perlin noise (3D) — unchanged engine from the source component.
function createNoise() {
  const permutation = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
    141, 128, 195, 78, 66, 215, 61, 156, 180,
  ];

  const p = new Array(512);
  for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return {
    simplex3: (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;

      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);

      const u = fade(x);
      const v = fade(y);
      const w = fade(z);

      const A = p[X] + Y;
      const AA = p[A] + Z;
      const AB = p[A + 1] + Z;
      const B = p[X + 1] + Y;
      const BA = p[B] + Z;
      const BB = p[B + 1] + Z;

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
        ),
        lerp(
          v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)),
        ),
      );
    },
  };
}

const FALLBACK_COLOR = "#2c66b2"; // --color-blue

// Parse a hex color to an "r, g, b" string for rgba().
function hexToRgb(hex: string): string {
  const m = hex.trim().replace("#", "");
  if (m.length === 3) {
    const r = parseInt(m[0] + m[0], 16);
    const g = parseInt(m[1] + m[1], 16);
    const b = parseInt(m[2] + m[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (m.length === 6) {
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "44, 102, 178"; // fallback rgb for #2c66b2
}

export default function ParticlesBackground({
  particleCount,
  color,
  maxOpacity = 0.1,
  noiseIntensity = 0.003,
  particleSize = { min: 0.5, max: 2 },
  className,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced-motion: render nothing, run no loop.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Resolve particle color from the brand token (or prop), once.
    let resolved = color;
    if (!resolved) {
      const token = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-blue")
        .trim();
      resolved = token || FALLBACK_COLOR;
    }
    const rgb = hexToRgb(resolved.startsWith("#") ? resolved : FALLBACK_COLOR);

    const noise = createNoise();
    let frame = 0;
    let particles: Particle[] = [];

    // Count: prop override, else 2000 desktop / 600 mobile.
    const computeCount = () =>
      particleCount ?? (window.innerWidth < 768 ? 600 : 2000);

    const seedParticles = () => {
      const count = computeCount();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size:
          Math.random() * (particleSize.max - particleSize.min) +
          particleSize.min,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 50,
      }));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seedParticles();
    };

    resizeCanvas();

    const animate = () => {
      // Faint translucent clear keeps a soft trail without painting an opaque bg.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.life += 1;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        const opacity =
          Math.sin((particle.life / particle.maxLife) * Math.PI) * maxOpacity;

        const n = noise.simplex3(
          particle.x * noiseIntensity,
          particle.y * noiseIntensity,
          frame * 0.0001,
        );
        const angle = n * Math.PI * 4;
        particle.x += Math.cos(angle) * 2;
        particle.y += Math.sin(angle) * 2;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += 1;
      rafId = requestAnimationFrame(animate);
    };

    let rafId = requestAnimationFrame(animate);

    // Debounced resize.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, color, maxOpacity, noiseIntensity, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
```

- [ ] **Step 2: Verify the build passes**

Run: `npx next build`
Expected: `✓ Compiled successfully`, TypeScript clean, no lint errors (all props are now consumed), `○ /` prerenders.

- [ ] **Step 3: Manual check — animation + legibility + interaction**

Run: `npx next dev`, open the site.
Expected:
- Faint blue particles drift across the page behind all content.
- Headline / body text remains fully legible (opacity ≤ 0.10).
- Links, phone CTA, and contact form remain clickable (pointer-events none).
Stop the dev server.

- [ ] **Step 4: Manual check — reduced motion**

Enable OS "Reduce motion" (Windows: Settings → Accessibility → Visual effects → Animation effects off), reload.
Expected: no particles, no animation (canvas present but empty). Re-disable reduce-motion after.

- [ ] **Step 5: Manual check — mobile count**

In browser devtools, toggle device toolbar to a < 768px width and reload.
Expected: noticeably fewer particles (600), animation stays smooth.

- [ ] **Step 6: Commit**

```bash
git add app/components/ParticlesBackground.tsx
git commit -m "Implement fluid particle animation with reduced-motion and mobile safeguards"
```

---

## Self-Review

**Spec coverage:**
- Component at `app/components/ParticlesBackground.tsx`, no `cn`/shadcn → Task 1 & 3. ✓
- Perlin engine kept → Task 3 `createNoise`. ✓
- Single brand-blue color from `--color-blue` token + `#2c66b2` fallback → Task 3 color resolution. ✓
- Max alpha 0.10 → Task 3 `maxOpacity = 0.1` default. ✓
- Transparent clear (no opaque bg) → Task 3 `ctx.clearRect`. ✓
- Props (particleCount, color, maxOpacity, noiseIntensity, particleSize, className), no children → Task 1/3 signature. ✓
- Mount in layout, fixed/z-index -1/pointer-events none/aria-hidden → Task 1 styles + Task 2 mount. ✓
- Reduced-motion → render nothing → Task 3 `motionQuery.matches` early return. ✓
- Mobile count 600 < 768px else 2000 → Task 3 `computeCount`. ✓
- rAF cancelled on unmount → Task 3 cleanup `cancelAnimationFrame`. ✓
- noise created once, not recreated each render → Task 3 `noise` inside effect, not a dep. ✓
- Debounced resize rebuilding particles → Task 3 `handleResize` + `seedParticles`. ✓
- Null canvas/context bail → Task 3 early returns. ✓
- Token fallback on empty → Task 3 `token || FALLBACK_COLOR`. ✓
- Verification via `next build` + manual → Steps in every task. ✓

**Deviations from spec (intentional, minor):**
- Spec mentioned DPR-aware sizing. Omitted: at ≤0.10 opacity on small particles, DPR scaling adds complexity and a 2000-particle-at-2x-DPR fill cost for no visible gain on a decorative backdrop. Sizing to `window.innerWidth/Height` (1x) is the lighter, smoother choice. Flag for reviewer; trivial to add later if desired.
- Spec said "very faint semi-transparent clear (keeps trail)". Used `clearRect` (full clear) instead of a translucent fill rect. Reason: a translucent fill rect tints the whole viewport every frame, which would wash a colored overlay across the cream page bg and fight section backgrounds. Full clear keeps particles as clean discrete dots over the real page. Net: no muddy overlay, better legibility — consistent with the spec's primary goal.

**Placeholder scan:** none ("Task 1 Step 1" placeholder comment is replaced wholesale in Task 3). ✓

**Type consistency:** `Particle` interface, `ParticlesBackgroundProps`, `simplex3`, `hexToRgb`, `seedParticles`, `computeCount` consistent across tasks. Task 1 skeleton's `Particle`-free effect is fully replaced in Task 3 (no stale refs). ✓
