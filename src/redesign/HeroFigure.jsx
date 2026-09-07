import React, { useRef, useEffect } from "react";
import useReducedMotion from "./useReducedMotion";

/*
  Hero figure: the cut-out person + a pink particle burst that appears to
  emanate from her body (à la the art-direction mock — "emerging from data").
  The burst canvas sits over the right/lower side of the figure so the edge
  dissolves into particles, never over the face.
*/
export default function HeroFigure({ src }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0, running = true, w = 0, h = 0, ps = [];
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const COUNT = isMobile ? 140 : 420;

    // emission source ≈ where the figure sits (right), burst radiates left/out
    const SRC = { x: 0.72, y: 0.5 };

    function resize() {
      const r = wrap.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      const ang = Math.random() * Math.PI * 2;              // full radial
      const sp = 0.4 + Math.random() * 2.6;
      return {
        x: w * SRC.x + (Math.random() - 0.5) * w * 0.16,
        y: h * SRC.y + (Math.random() - 0.5) * h * 0.34,
        vx: Math.cos(ang) * sp - 0.55,                      // drift left, into the name gap
        vy: Math.sin(ang) * sp * 0.8,
        life: 60 + Math.random() * 220, max: 280,
      };
    }
    function seed() { ps = Array.from({ length: COUNT }, () => { const p = spawn(); p.life = Math.random() * p.max; return p; }); }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.006; p.vx *= 0.995; p.life -= 1;
        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y > h + 20) { ps[i] = spawn(); continue; }
        const a = Math.min(p.life / 70, 1) * 0.9;
        const r = p.life > p.max * 0.75 ? 1.2 : 1.9;
        ctx.fillStyle = `rgba(255,59,125,${a})`;
        ctx.fillRect(p.x, p.y, r, r);
      }
      raf = requestAnimationFrame(frame);
    }
    function staticScatter() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < COUNT; i++) {
        const p = spawn(); p.x += Math.random() * 120;
        ctx.fillStyle = "rgba(255,59,125,0.4)";
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
    }
    resize(); seed();
    if (reduced) staticScatter(); else raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => {
      if (reduced) return;
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    const onR = () => { resize(); seed(); if (reduced) staticScatter(); };
    window.addEventListener("resize", onR);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", onR); };
  }, [reduced, src]);

  return (
    <div className="hero-figure" ref={wrapRef}>
      <img className="hero-cut" src={src} alt="Gemma Garcia de la Fuente"
        onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
