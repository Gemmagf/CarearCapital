import React, { useRef, useEffect } from "react";
import useReducedMotion from "./useReducedMotion";

/*
  Ambient pink flow-field on a single <canvas>.
  - Particles advect along a smooth sine-based vector field (no noise dep).
  - Low-alpha trails on an off-white ground; cursor gives a gentle local push.
  - Paused when off-screen (IntersectionObserver); static scatter under reduced motion.
  Motion is slow and ambient by design — "data the person emerges from", not a screensaver.
*/
export default function FlowField() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const BG = "#F7F5F1";
    let raf = 0, running = true, w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const COUNT = isMobile ? 80 : 240;
    let ps = [];

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG; ctx.fillRect(0, 0, w, h);
    }
    function seed() {
      ps = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: 0, vy: 0, life: Math.random() * 200,
      }));
    }
    // smooth pseudo-noise angle from sine layers
    function angle(x, y, t) {
      const s = 0.0016;
      return (
        Math.sin(x * s + t) * 1.3 +
        Math.cos(y * s * 1.2 - t * 0.8) * 1.1 +
        Math.sin((x + y) * s * 0.6 + t * 0.5)
      );
    }
    function step(t) {
      // fade toward bg for trails
      ctx.fillStyle = "rgba(247,245,241,0.055)";
      ctx.fillRect(0, 0, w, h);
      for (const p of ps) {
        const a = angle(p.x, p.y, t);
        p.vx += Math.cos(a) * 0.09;
        p.vy += Math.sin(a) * 0.09;
        // gentle cursor push
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            const f = (1 - d2 / 22000) * 0.9;
            p.vx += (dx / (Math.sqrt(d2) + 1)) * f;
            p.vy += (dy / (Math.sqrt(d2) + 1)) * f;
          }
        }
        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
        p.life -= 1;
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life < 0) {
          p.x = Math.random() * w; p.y = Math.random() * h;
          p.vx = p.vy = 0; p.life = 120 + Math.random() * 200;
        }
        const spd = Math.min(Math.hypot(p.vx, p.vy), 3);
        ctx.fillStyle = `rgba(255,59,125,${0.14 + spd * 0.14})`;
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
    }
    let t0 = 0;
    function loop(ts) {
      if (!running) return;
      t0 = ts * 0.00018;
      step(t0);
      raf = requestAnimationFrame(loop);
    }
    function staticScatter() {
      ctx.fillStyle = BG; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < COUNT; i++) {
        ctx.fillStyle = "rgba(255,59,125,0.22)";
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6);
      }
    }

    resize(); seed();
    if (reduced) { staticScatter(); }
    else { raf = requestAnimationFrame(loop); }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; };
    const onResize = () => { resize(); seed(); if (reduced) staticScatter(); };

    let io;
    if (!reduced) {
      io = new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !running) { running = true; raf = requestAnimationFrame(loop); }
        else if (!en.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
      }, { threshold: 0 });
      io.observe(canvas);
      if (!("ontouchstart" in window)) {
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
      }
    }
    window.addEventListener("resize", onResize);
    return () => {
      running = false; cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden="true" />;
}
