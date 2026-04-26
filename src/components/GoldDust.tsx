import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  base: number;
}

const COLORS = [
  "rgba(232,194,112,",
  "rgba(212,164,74,",
  "rgba(244,235,216,",
  "rgba(198,153,99,",
];

const GoldDust: React.FC<{ count?: number }> = ({ count = 70 }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const scrollVelRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollT = useRef(performance.now());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const seed = (p?: Particle): Particle => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const size = Math.random() * 1.6 + 0.4;
      return Object.assign(p || ({} as Particle), {
        x: Math.random() * w,
        y: p ? h + Math.random() * 60 : Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.05),
        size,
        base: size,
        alpha: Math.random() * 0.55 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * 800 + 600,
      });
    };

    particlesRef.current = Array.from({ length: count }, () => seed());

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastScrollY.current;
      const dt = Math.max(1, now - lastScrollT.current);
      const v = dy / dt;
      scrollVelRef.current = v;
      lastScrollY.current = window.scrollY;
      lastScrollT.current = now;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Decay scroll velocity
      scrollVelRef.current *= 0.92;
      const scrollPush = Math.min(2.5, Math.abs(scrollVelRef.current) * 0.6);

      const m = mouseRef.current;
      const repelRadius = 140;

      for (const p of particlesRef.current) {
        // Drift
        p.x += p.vx;
        p.y += p.vy - scrollPush * Math.sign(scrollVelRef.current || 1);

        // Subtle horizontal sway
        p.vx += (Math.random() - 0.5) * 0.005;
        p.vx *= 0.985;

        // Mouse repulsion
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repelRadius * repelRadius) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / repelRadius) * 1.4;
            p.vx += (dx / d) * f * 0.3;
            p.vy += (dy / d) * f * 0.3;
            p.size = p.base + f * 1.4;
            p.alpha = Math.min(0.95, p.alpha + f * 0.15);
          } else {
            p.size += (p.base - p.size) * 0.1;
          }
        } else {
          p.size += (p.base - p.size) * 0.05;
        }

        p.life -= 1;
        if (
          p.y < -20 ||
          p.x < -20 ||
          p.x > w + 20 ||
          p.life <= 0
        ) {
          seed(p);
        }

        ctx.beginPath();
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + "0.6)";
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      if (!reduced) rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-screen"
    />
  );
};

export default GoldDust;
