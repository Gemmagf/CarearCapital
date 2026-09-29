import React, { useRef, useEffect } from "react";
import useReducedMotion from "./useReducedMotion";

/*
  Hero figure: the cut-out portrait rendered as a DATA HALFTONE — a grid of ink dots sized by
  darkness, shifting to pink toward the right edge so the figure dissolves into the particle
  burst. The <img> stays in the DOM but invisible: CSS keeps deciding its size/position and the
  dots are drawn into exactly that rect (object-fit: contain, object-position: bottom center).
  Deterministic (hash-based pink), redrawn on load/resize only; the burst animates on its own canvas.
*/
const INK = "17,17,17", PINK = "255,59,125";
const hash2 = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
const smooth = (a, b, t) => { const k = Math.max(0, Math.min(1, (t - a) / (b - a))); return k * k * (3 - 2 * k); };

export default function HeroFigure({ src }) {
  const burstRef = useRef(null), dotsRef = useRef(null), imgRef = useRef(null), wrapRef = useRef(null);
  const reduced = useReducedMotion();

  // ---- halftone portrait (static) -------------------------------------------------------
  useEffect(() => {
    const img = imgRef.current, canvas = dotsRef.current, wrap = wrapRef.current;
    if (!img || !canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let sampler = null;

    function draw() {
      if (!img.naturalWidth) return;
      const wr = wrap.getBoundingClientRect(), ir = img.getBoundingClientRect();
      const W = wr.width, H = wr.height;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      // rect actually covered by the image inside its box (contain + bottom center)
      const boxX = ir.left - wr.left, boxY = ir.top - wr.top, boxW = ir.width, boxH = ir.height;
      const ar = img.naturalWidth / img.naturalHeight;
      let dw = boxW, dh = boxW / ar; if (dh > boxH) { dh = boxH; dw = boxH * ar; }
      // object-position: bottom left on desktop, bottom center when the box is wider than the image
      const pos = getComputedStyle(img).objectPosition || "";
      const dx = boxX + (/left/.test(pos) ? 0 : (boxW - dw) / 2), dy = boxY + (boxH - dh);
      const cell = Math.max(2.6, Math.min(5, dw / 120));
      const cols = Math.ceil(dw / cell), rows = Math.ceil(dh / cell);
      // Progressive downscale (halve until within 2× of the grid) with high-quality smoothing —
      // a single 10×+ drawImage step aliases badly and distorts facial features.
      let src = img, sw = img.naturalWidth, sh = img.naturalHeight;
      while (sw / 2 >= cols * 2 && sh / 2 >= rows * 2) {
        const half = document.createElement("canvas");
        half.width = Math.round(sw / 2); half.height = Math.round(sh / 2);
        const hctx = half.getContext("2d");
        hctx.imageSmoothingEnabled = true; hctx.imageSmoothingQuality = "high";
        hctx.drawImage(src, 0, 0, sw, sh, 0, 0, half.width, half.height);
        src = half; sw = half.width; sh = half.height;
      }
      sampler = sampler || document.createElement("canvas");
      sampler.width = cols; sampler.height = rows;
      const sctx = sampler.getContext("2d", { willReadFrequently: true });
      sctx.imageSmoothingEnabled = true; sctx.imageSmoothingQuality = "high";
      sctx.clearRect(0, 0, cols, rows); sctx.drawImage(src, 0, 0, sw, sh, 0, 0, cols, rows);
      const px = sctx.getImageData(0, 0, cols, rows).data;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const k = (j * cols + i) * 4, a = px[k + 3] / 255; if (a < 0.35) continue;
        const lum = (0.2126 * px[k] + 0.7152 * px[k + 1] + 0.0722 * px[k + 2]) / 255;
        const dark = (1 - lum) * a, nx = i / cols, ny = j / rows;
        if (dark < 0.10) continue; // light areas (skin highlights, white top) stay paper — only shadows and hair make dots
        // pink probability grows toward the right edge (and the lower-right), where the burst lives
        const pinkP = 0.04 + 0.6 * smooth(0.5, 1, nx) + 0.25 * smooth(0.55, 1, ny) * smooth(0.3, 1, nx);
        const pink = hash2(i, j) < pinkP;
        const r = cell * 0.62 * Math.pow(dark, 1.25); // darks overlap into solid areas, mids stay airy
        const fade = 1 - 0.92 * smooth(0.84, 1, ny); // the cut-out's straight bottom edge dissolves into the paper
        ctx.fillStyle = pink ? `rgba(${PINK},${(0.9 * fade).toFixed(3)})` : `rgba(${INK},${(0.84 * fade).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(dx + (i + 0.5) * cell, dy + (j + 0.5) * cell, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (img.complete && img.naturalWidth) draw(); else img.addEventListener("load", draw);
    const onR = () => draw();
    window.addEventListener("resize", onR);
    return () => { img.removeEventListener("load", draw); window.removeEventListener("resize", onR); };
  }, [src]);

  // ---- pink particle burst (emanates from the figure, drifts left into the name gap) ---
  useEffect(() => {
    const canvas = burstRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0, running = true, w = 0, h = 0, ps = [];
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const COUNT = isMobile ? 140 : 420;
    const SRC = { x: 0.5, y: 0.5 }; // burst emanates from the figure itself, radially

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      const ang = Math.random() * Math.PI * 2, sp = 0.4 + Math.random() * 2.6;
      return { x: w * SRC.x + (Math.random() - 0.5) * w * 0.16, y: h * SRC.y + (Math.random() - 0.5) * h * 0.34,
        vx: Math.cos(ang) * sp - 0.15, vy: Math.sin(ang) * sp * 0.8, life: 60 + Math.random() * 220, max: 280 };
    }
    function seed() { ps = Array.from({ length: COUNT }, () => { const p = spawn(); p.life = Math.random() * p.max; return p; }); }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.006; p.vx *= 0.995; p.life -= 1;
        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y > h + 20) { ps[i] = spawn(); continue; }
        const a = Math.min(p.life / 70, 1) * 0.9, r = p.life > p.max * 0.75 ? 1.2 : 1.9;
        ctx.fillStyle = `rgba(255,59,125,${a})`; ctx.fillRect(p.x, p.y, r, r);
      }
      raf = requestAnimationFrame(frame);
    }
    function staticScatter() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < COUNT; i++) { const p = spawn(); p.x += Math.random() * 120; ctx.fillStyle = "rgba(255,59,125,0.4)"; ctx.fillRect(p.x, p.y, 1.6, 1.6); }
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
      <img ref={imgRef} className="hero-cut" src={src} alt="Gemma Garcia de la Fuente"
        onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <canvas ref={dotsRef} className="hero-dots" aria-hidden="true" />
      <canvas ref={burstRef} className="hero-burst" aria-hidden="true" />
    </div>
  );
}
