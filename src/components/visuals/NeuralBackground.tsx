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

    /* Low-res canvas everywhere: this layer is decorative dots and 1px lines
       behind the hero, so extra resolution is invisible but fill cost is not.
       At DPR 2 this was a 2.7M-pixel repaint per frame on integrated GPUs. */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dprCap = coarse ? 1 : 1.25;
    const maxNodes = coarse ? 55 : 90;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let nodes: Node[] = [];
    let raf = 0;
    /* 30fps cap: this is decorative chrome behind the hero copy, not
       something anyone tracks frame-by-frame, so halving the render rate
       halves its main-thread cost for a difference nobody notices. */
    const frameInterval = 1000 / 30;
    let lastFrameTime = 0;
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

    /* Stop the loop entirely while the canvas is scrolled out of view (no
       idle rAF spinning); the observer restarts it when it comes back. */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible && !coarse) raf = requestAnimationFrame(tick);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const render = () => {
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

      /* connections: one path + one stroke for the whole frame instead of a
         beginPath/stroke pair per segment (was up to ~4000 separate draw
         calls a frame at the full node count). Opacity varies by distance,
         so segments are bucketed into a few alpha bands rather than given
         one lineWidth/strokeStyle call each. */
      const bands = 6;
      for (let band = 0; band < bands; band++) {
        const alpha = ((band + 1) / bands) * 0.5;
        let any = false;
        ctx.beginPath();
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 >= 18000) continue;
            const segBand = Math.min(bands - 1, Math.floor((1 - d2 / 18000) * bands));
            if (segBand !== band) continue;
            any = true;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
        if (!any) continue;
        ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // nodes: one fill path for all of them
      ctx.fillStyle = `rgba(${accent}, 0.9)`;
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x + 1.6, n.y);
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const tick = (now: number) => {
      if (!visible) return;
      raf = requestAnimationFrame(tick);
      if (now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;
      render();
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

    const onResize = () => {
      resize();
      if (coarse) render();
    };

    resize();
    if (coarse) {
      /* touch devices: one static frame instead of a perpetual rAF loop —
         there's no cursor to react to and this was a steady main-thread
         cost stacked on top of the hero's WebGL core. */
      render();
    } else {
      raf = requestAnimationFrame(tick);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
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
