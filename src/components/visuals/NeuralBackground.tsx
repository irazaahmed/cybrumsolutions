"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * Animated neural-network canvas: drifting nodes connected by lines that
 * brighten with proximity, plus a soft mouse-follow pull. Pure canvas, no deps.
 * Renders nothing for users who prefer reduced motion.
 */
export function NeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* phones get a lower-res canvas and fewer nodes so the hero stays smooth */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dprCap = coarse ? 1.5 : 2;
    const maxNodes = coarse ? 55 : 90;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let nodes: Node[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const accent = "30, 136, 232"; // rgb of --color-accent

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scales with area, capped for performance
      const count = Math.min(Math.floor((width * height) / 16000), maxNodes);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    /* skip all work while the canvas is scrolled out of view */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const tick = () => {
      if (!visible) {
        raf = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        // gentle pull toward cursor
        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 26000) {
          n.vx += dxm * 0.000015;
          n.vy += dym * 0.000015;
        }

        n.x += n.vx;
        n.y += n.vy;

        // friction + wrap
        n.vx *= 0.99;
        n.vy *= 0.99;
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000) {
            const alpha = (1 - d2 / 18000) * 0.5;
            ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${accent}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
