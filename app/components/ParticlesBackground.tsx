'use client';

import { useEffect, useRef } from 'react';

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
  speed: number; // per-particle drift speed (px/frame) for organic variation
  opacity: number; // steady per-particle alpha factor (no pulsing)
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
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
        ),
        lerp(
          v,
          lerp(
            u,
            grad(p[AA + 1], x, y, z - 1),
            grad(p[BA + 1], x - 1, y, z - 1)
          ),
          lerp(
            u,
            grad(p[AB + 1], x, y - 1, z - 1),
            grad(p[BB + 1], x - 1, y - 1, z - 1)
          )
        )
      );
    },
  };
}

const FALLBACK_COLOR = '#2c66b2'; // --color-blue

// Parse a hex color to an "r, g, b" string for rgba().
function hexToRgb(hex: string): string {
  const m = hex.trim().replace('#', '');
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
  return '44, 102, 178'; // fallback rgb for #2c66b2
}

export default function ParticlesBackground({
  particleCount,
  color,
  maxOpacity = 0.1,
  noiseIntensity = 0.003,
  particleSize = { min: 0.5, max: 1.2 },
  className,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced-motion: render nothing, run no loop.
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resolve particle color from the brand token (or prop), once.
    let resolved = color;
    if (!resolved) {
      const token = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-blue')
        .trim();
      resolved = token || FALLBACK_COLOR;
    }
    const rgb = hexToRgb(resolved.startsWith('#') ? resolved : FALLBACK_COLOR);

    // Page background (cream) — trails fade toward this so streaks don't muddy.
    const paperToken = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-paper')
      .trim();
    const paperRgb = hexToRgb(
      paperToken.startsWith('#') ? paperToken : '#f7f5ee'
    );

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
        speed: 0.6 + Math.random() * 1.6, // varied drift → organic, not uniform
        opacity: 0.4 + Math.random() * 0.6, // steady per-particle alpha factor
      }));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seedParticles();
    };

    resizeCanvas();

    const animate = () => {
      // Fade the previous frame toward the page bg instead of a hard clear.
      // Low alpha leaves a soft fading streak behind each particle → current lines.
      ctx.fillStyle = `rgba(${paperRgb}, 0.06)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        // Noise perturbs the flow angle around a dominant rightward current,
        // rather than choosing a fully random direction. Vertical sway is damped
        // so the overall motion reads as horizontal flow with gentle eddies.
        const n = noise.simplex3(
          particle.x * noiseIntensity,
          particle.y * noiseIntensity,
          frame * 0.0008
        );
        const angle = n * Math.PI; // eddy deflection
        particle.x += (Math.cos(angle) * 0.4 + 1) * particle.speed; // bias right
        particle.y += Math.sin(angle) * 0.5 * particle.speed; // damped sway

        // Recycle off the right/edges → re-enter from the left at a fresh height,
        // keeping a continuous current with no teleport pop.
        if (particle.x > canvas.width + 8) {
          particle.x = -8;
          particle.y = Math.random() * canvas.height;
        }
        if (particle.y < -8) particle.y = canvas.height + 8;
        if (particle.y > canvas.height + 8) particle.y = -8;

        ctx.fillStyle = `rgba(${rgb}, ${maxOpacity * particle.opacity})`;
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
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, color, maxOpacity, noiseIntensity, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
