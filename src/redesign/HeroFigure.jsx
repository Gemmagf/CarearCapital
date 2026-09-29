import React, { useRef, useEffect } from "react";
import useReducedMotion from "./useReducedMotion";

/*
  Hero figure — a looping "data spectacle":
    sharp photo → dissolves into scattered dots → the dots regroup into a scatter chart
    → morph into a bar chart → travel back and re-form the sharp photo.
  One canvas covers the whole hero-inner; the real <img> (bottom-right) fades in only when the
  particles have re-formed it. Particle targets for the photo come from a halftone sample of
  the cut-out; chart shapes are laid out in the free area (left column on desktop, in place on
  mobile). Deterministic (hash-based), pauses off-screen, static photo under reduced motion.
*/
const INK = [17, 17, 17], PINK = [255, 59, 125];
const hash2 = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
const gauss = (i, k) => { const u = Math.max(1e-6, hash2(i, k)), v = hash2(i + 7, k + 3); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2831 * v); };
const smooth = (a, b, t) => { const k = Math.max(0, Math.min(1, (t - a) / (b - a))); return k * k * (3 - 2 * k); };
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

export default function HeroFigure({ src }) {
  const canvasRef = useRef(null), imgRef = useRef(null), wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const img = imgRef.current, canvas = canvasRef.current, wrap = wrapRef.current;
    if (!img || !canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const N = isMobile ? 650 : 1500;
    let W = 0, H = 0, raf = 0, running = true, ready = false;
    let P = [];              // particles: {x,y, sx,sy, r, stag}
    let SHAPES = {};         // name -> array of N targets {x,y,c,r}
    let boxes = {};          // layout boxes for the charts
    let phase = 0, phaseT0 = 0;

    // ---- timeline ---------------------------------------------------------------------------
    const K = [
      { shape: "photo",    morph: 0,    hold: 3400 },
      { shape: "disperse", morph: 1100, hold: 250 },
      { shape: "scatter",  morph: 1500, hold: 2600 },
      { shape: "bars",     morph: 1400, hold: 2400 },
      { shape: "photo",    morph: 1700, hold: 0 },
    ];

    // ---- layout + shapes --------------------------------------------------------------------
    function photoRect() {
      const wr = wrap.getBoundingClientRect(), ir = img.getBoundingClientRect();
      const boxX = ir.left - wr.left, boxY = ir.top - wr.top, boxW = ir.width, boxH = ir.height;
      const ar = img.naturalWidth / img.naturalHeight;
      let dw = boxW, dh = boxW / ar; if (dh > boxH) { dh = boxH; dw = boxH * ar; }
      return { x: boxX + (boxW - dw), y: boxY + (boxH - dh), w: dw, h: dh }; // object-position: bottom right
    }
    function downsample(cols, rows) {
      let s = img, sw = img.naturalWidth, sh = img.naturalHeight;
      while (sw / 2 >= cols * 2 && sh / 2 >= rows * 2) {
        const half = document.createElement("canvas"); half.width = Math.round(sw / 2); half.height = Math.round(sh / 2);
        const c = half.getContext("2d"); c.imageSmoothingEnabled = true; c.imageSmoothingQuality = "high";
        c.drawImage(s, 0, 0, sw, sh, 0, 0, half.width, half.height); s = half; sw = half.width; sh = half.height;
      }
      const out = document.createElement("canvas"); out.width = cols; out.height = rows;
      const c = out.getContext("2d", { willReadFrequently: true }); c.imageSmoothingEnabled = true; c.imageSmoothingQuality = "high";
      c.drawImage(s, 0, 0, sw, sh, 0, 0, cols, rows);
      return c.getImageData(0, 0, cols, rows).data;
    }
    function buildPhoto(rect) {
      const cell = Math.max(2.4, Math.min(5, rect.w / 95)), cols = Math.ceil(rect.w / cell), rows = Math.ceil(rect.h / cell);
      const px = downsample(cols, rows), cand = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const k = (j * cols + i) * 4, a = px[k + 3] / 255; if (a < 0.4) continue;
        const lum = (0.2126 * px[k] + 0.7152 * px[k + 1] + 0.0722 * px[k + 2]) / 255, dark = (1 - lum) * a;
        if (dark < 0.12) continue;
        cand.push({ x: rect.x + (i + 0.5) * cell, y: rect.y + (j + 0.5) * cell, dark, score: dark + hash2(i, j) * 0.5, nx: i / cols });
      }
      cand.sort((a, b) => b.score - a.score);
      const out = [];
      for (let i = 0; i < N; i++) {
        const c = cand[i % Math.max(1, cand.length)] || { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2, dark: 0.3, nx: 0.5 };
        const pink = hash2(i, 91) < 0.05 + 0.55 * smooth(0.55, 1, c.nx);
        out.push({ x: c.x, y: c.y, c: pink ? PINK : INK, r: 0.9 + 1.7 * Math.pow(c.dark, 1.2), a: 0.85 });
      }
      return out;
    }
    function buildDisperse(photo) {
      return photo.map((p, i) => {
        // a loosening, not an explosion: the portrait dissolves into dots where it stands
        const ang = hash2(i, 5) * 6.2831, d = 12 + hash2(i, 6) * 80;
        return { x: p.x + Math.cos(ang) * d * 1.2, y: p.y + Math.sin(ang) * d - 18, c: hash2(i, 7) < 0.45 ? PINK : INK, r: 1.3, a: 0.7 };
      });
    }
    function buildScatter(b) {
      const out = [];
      for (let i = 0; i < N; i++) {
        const outlier = hash2(i, 11) < 0.07;
        let xn = outlier ? hash2(i, 12) : 0.5 + 0.19 * gauss(i, 13), yn = outlier ? hash2(i, 14) : 0.52 - (xn - 0.5) * 0.85 + 0.075 * gauss(i, 15);
        xn = Math.max(0.02, Math.min(0.98, xn)); yn = Math.max(0.04, Math.min(0.96, yn));
        out.push({ x: b.x + xn * b.w, y: b.y + yn * b.h, c: outlier || hash2(i, 16) < 0.1 ? PINK : INK, r: 1.7, a: 0.75 });
      }
      return out;
    }
    function buildBars(b) {
      const nb = 12, out = [];
      for (let i = 0; i < N; i++) {
        const k = i % nb, hgt = 0.22 + 0.72 * hash2(k, 21), x0 = k / nb, bw = 1 / nb * 0.68;
        out.push({ x: b.x + (x0 + 0.16 / nb + hash2(i, 22) * bw) * b.w, y: b.y + b.h * (1 - hash2(i, 23) * hgt), c: k % 2 ? PINK : INK, r: 1.6, a: 0.8 });
      }
      return out;
    }
    function layout() {
      const r = wrap.getBoundingClientRect(); W = r.width; H = r.height;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!img.naturalWidth) return;
      const pr = photoRect();
      // the cycle happens IN PLACE: the charts form where the portrait was, from its own dots
      const chart = { x: pr.x - pr.w * 0.18, y: pr.y + pr.h * 0.12, w: pr.w * 1.36, h: pr.h * 0.8 };
      boxes = { pr, chart };
      const photo = buildPhoto(pr);
      SHAPES = { photo, disperse: buildDisperse(photo), scatter: buildScatter(chart), bars: buildBars(chart) };
      P = photo.map((t, i) => ({ x: t.x, y: t.y, sx: t.x, sy: t.y, stag: hash2(i, 31) * 0.28 }));
      phase = 0; phaseT0 = performance.now(); ready = true;
    }

    // ---- frame ------------------------------------------------------------------------------
    function imgAlpha(k, p) {
      if (k.shape === "photo" && k.morph === 0) return 1;
      if (k.shape === "disperse") return 1 - smooth(0, 0.5, p);
      if (k.shape === "photo") return smooth(0.72, 1, p);
      return 0;
    }
    function drawChartChrome(name, alpha) {
      if (alpha <= 0.01) return;
      const b = boxes.chart; ctx.save(); ctx.globalAlpha = alpha; ctx.lineWidth = 1;
      ctx.strokeStyle = "#cfcbc3"; ctx.beginPath(); ctx.moveTo(b.x, b.y + b.h); ctx.lineTo(b.x + b.w, b.y + b.h); ctx.stroke();
      ctx.font = "9px 'Space Mono', monospace"; ctx.fillStyle = "#8a8781";
      if (name === "scatter") {
        ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y + b.h); ctx.stroke();
        ctx.strokeStyle = rgba(PINK, 0.9); ctx.lineWidth = 1.4; ctx.beginPath();
        ctx.moveTo(b.x + b.w * 0.06, b.y + b.h * (0.52 + 0.44 * 0.85)); ctx.lineTo(b.x + b.w * 0.94, b.y + b.h * (0.52 - 0.44 * 0.85)); ctx.stroke();
        ctx.fillText("SIGNAL VS NOISE · R² 0.81", b.x, b.y - 8);
      } else {
        ctx.fillText("CONTRIBUTION BY CHANNEL", b.x, b.y - 8);
      }
      ctx.restore();
    }
    function frame(now) {
      if (!running) return;
      if (!ready) { raf = requestAnimationFrame(frame); return; }
      const k = K[phase], el = now - phaseT0, p = k.morph ? Math.min(1, el / k.morph) : 1;
      if (el >= k.morph + k.hold) {
        // advance: freeze current positions as the next morph's origin
        P.forEach((q) => { q.sx = q.x; q.sy = q.y; });
        phase = (phase + 1) % K.length; if (phase === 0) phase = 1; // loop skips the initial static photo entry
        if (K[phase].shape === "photo" && K[phase].morph === 0) phase = 1;
        phaseT0 = now; raf = requestAnimationFrame(frame); return;
      }
      const T = SHAPES[k.shape], ia = imgAlpha(k, p);
      img.style.opacity = ia.toFixed(3);
      ctx.clearRect(0, 0, W, H);
      const chromeA = (k.shape === "scatter" || k.shape === "bars") ? smooth(0.55, 1, p) * (el > k.morph ? 1 : 1) : 0;
      // chrome fades out during the following morph
      const nextIsChart = k.shape === "scatter" || k.shape === "bars";
      drawChartChrome(k.shape, nextIsChart ? chromeA : 0);
      if (phase > 0 && (K[phase - 1].shape === "scatter" || K[phase - 1].shape === "bars") && k.morph) drawChartChrome(K[phase - 1].shape, 1 - smooth(0, 0.35, p));
      const partA = 1 - ia * 0.92;
      for (let i = 0; i < P.length; i++) {
        const q = P[i], t = T[i];
        const pi = k.morph ? easeInOut(Math.max(0, Math.min(1, (p - q.stag) / (1 - 0.28)))) : 1;
        q.x = q.sx + (t.x - q.sx) * pi; q.y = q.sy + (t.y - q.sy) * pi;
        if (pi > 0 && pi < 1) { const wob = Math.sin(pi * 3.1416) * 14; q.x += Math.sin(now * 0.004 + i) * wob * 0.6; q.y += Math.cos(now * 0.0035 + i * 1.7) * wob * 0.4; }
        ctx.fillStyle = rgba(t.c, t.a * partA);
        ctx.beginPath(); ctx.arc(q.x, q.y, t.r, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      layout();
      if (reduced) { img.style.opacity = "1"; ctx.clearRect(0, 0, W, H); return; }
      cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
    }
    if (img.complete && img.naturalWidth) start(); else img.addEventListener("load", start);
    const io = new IntersectionObserver(([e]) => {
      if (reduced) return;
      if (e.isIntersecting && !running) { running = true; phaseT0 = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    let rt = 0; const onR = () => { clearTimeout(rt); rt = setTimeout(start, 120); };
    window.addEventListener("resize", onR);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); img.removeEventListener("load", start); window.removeEventListener("resize", onR); clearTimeout(rt); };
  }, [reduced, src]);

  return (
    <div className="hero-figure" ref={wrapRef}>
      <img ref={imgRef} className="hero-cut" src={src} alt="Gemma Garcia de la Fuente"
        onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <canvas ref={canvasRef} className="hero-anim" aria-hidden="true" />
    </div>
  );
}
