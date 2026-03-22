"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; r: number; vx: number; vy: number };

export function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const nodes: Node[] = [
      { x: 0.22, y: 0.28, r: 5, vx: 0.00012, vy: 0.00009 },
      { x: 0.78, y: 0.22, r: 4, vx: -0.0001, vy: 0.00011 },
      { x: 0.52, y: 0.62, r: 6, vx: 0.00008, vy: -0.0001 },
      { x: 0.35, y: 0.72, r: 3.5, vx: 0.00011, vy: 0.00007 },
      { x: 0.68, y: 0.48, r: 4.5, vx: -0.00009, vy: -0.00008 },
      { x: 0.15, y: 0.55, r: 3, vx: 0.00006, vy: -0.00012 },
    ];

    const edges = [
      [0, 2],
      [1, 2],
      [2, 3],
      [1, 4],
      [0, 5],
      [3, 5],
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const pulse = 0.35 + 0.15 * Math.sin(t * 0.001);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0.08 || n.x > 0.92) n.vx *= -1;
        if (n.y < 0.08 || n.y > 0.92) n.vy *= -1;
      }

      ctx.strokeStyle = `rgba(34, 197, 94, ${0.22 * pulse})`;
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x * w, na.y * h);
        ctx.lineTo(nb.x * w, nb.y * h);
        ctx.stroke();
      }

      for (const n of nodes) {
        const cx = n.x * w;
        const cy = n.y * h;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r * 4);
        grd.addColorStop(0, `rgba(34, 197, 94, ${0.45})`);
        grd.addColorStop(1, "rgba(34, 197, 94, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(250, 250, 250, 0.9)";
        ctx.beginPath();
        ctx.arc(cx, cy, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-90 pointer-events-none"
      aria-hidden
    />
  );
}
