import React, { useRef, useEffect } from "react";
import useReducedMotion from "./useReducedMotion";

/*
  Hero figure — a looping "data spectacle", in place:
    sharp photo → loosens into dots → the dots become an animated wave surface
    → a network graph (edges + hubs) → a rotating globe of points → re-form the sharp photo.
  The canvas bleeds beyond the portrait box so the shapes have room; all coordinates are in the
  canvas frame. Photo targets come from a halftone sample of the cut-out. Shapes may be
  time-dependent (they keep moving while held). Deterministic, pauses off-screen, static photo
  under reduced motion.
*/
const INK = [17, 17, 17], PINK = [255, 59, 125];
const hash2 = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
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
    let P = [], SHAPES = {}, box = null, edges = [], netBase = [];
    let phase = 0, phaseT0 = 0;

    const K = [
      { shape: "photo",    morph: 0,    hold: 3200 },
      { shape: "disperse", morph: 1000, hold: 200 },
      { shape: "wave",     morph: 1500, hold: 2800 },
      { shape: "network",  morph: 1500, hold: 3000 },
      { shape: "globe",    morph: 1500, hold: 3200 },
      { shape: "photo",    morph: 1800, hold: 0 },
    ];

    // ---- geometry ---------------------------------------------------------------------------
    function photoRect() {
      const cr = canvas.getBoundingClientRect(), ir = img.getBoundingClientRect();
      const boxX = ir.left - cr.left, boxY = ir.top - cr.top, boxW = ir.width, boxH = ir.height;
      const ar = img.naturalWidth / img.naturalHeight;
      let dw = boxW, dh = boxW / ar; if (dh > boxH) { dh = boxH; dw = boxH * ar; }
      const pos = getComputedStyle(img).objectPosition || "";
      const dx = boxX + (/left/.test(pos) ? 0 : /right/.test(pos) ? boxW - dw : (boxW - dw) / 2);
      return { x: dx, y: boxY + (boxH - dh), w: dw, h: dh };
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

    // ---- shapes (arrays for static, functions (i, now) for animated) ---------------------------
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
      return photo.map((p, i) => { const ang = hash2(i, 5) * 6.2831, d = 12 + hash2(i, 6) * 80;
        return { x: p.x + Math.cos(ang) * d * 1.2, y: p.y + Math.sin(ang) * d - 18, c: hash2(i, 7) < 0.45 ? PINK : INK, r: 1.3, a: 0.7 }; });
    }
    // animated wave surface in perspective (like the section-01 graphic, but alive)
    const waveCols = isMobile ? 26 : 42, waveRows = Math.ceil(N / waveCols);
    function wave(i, now) {
      const b = box, col = i % waveCols, row = Math.floor(i / waveCols), fx = col / (waveCols - 1), fz = row / (waveRows - 1), persp = 0.42 + fz * 0.58, t = now * 0.0012;
      const z = Math.sin(fx * 8 + fz * 3.4 + t) + 0.5 * Math.sin(fx * 16 - fz * 6 - t * 1.3) + 0.35 * Math.cos(fx * 3 + fz * 9 + t * 0.7);
      const h = Math.max(0, Math.min(1, (z + 1.9) / 3.8));
      return { x: b.x + b.w / 2 + (fx - 0.5) * b.w * persp, y: b.y + b.h * 0.22 + fz * b.h * 0.62 - z * b.h * 0.07 * persp, c: h > 0.6 ? PINK : INK, r: (0.6 + h * 1.6) * (0.6 + persp * 0.5), a: (h > 0.6 ? 0.55 + h * 0.4 : 0.25 + h * 0.4) * (0.5 + persp * 0.5) };
    }
    // network: 6 communities on a ring; nodes breathe; edges precomputed on base positions
    function buildNetwork() {
      const b = box, C = 6, cx = b.x + b.w / 2, cy = b.y + b.h / 2, R = Math.min(b.w, b.h) * 0.36;
      netBase = []; edges = [];
      const centres = Array.from({ length: C }, (_, k) => [cx + Math.cos(k / C * 6.2831 - 0.4) * R, cy + Math.sin(k / C * 6.2831 - 0.4) * R * 0.82]);
      for (let i = 0; i < N; i++) {
        const k = i % C, hub = i < C, ang = hash2(i, 41) * 6.2831, d = hub ? 0 : Math.pow(hash2(i, 42), 0.6) * R * 0.62;
        netBase.push({ x: centres[k][0] + Math.cos(ang) * d, y: centres[k][1] + Math.sin(ang) * d * 0.85, k, hub });
      }
      for (let i = C; i < N; i++) {
        if (hash2(i, 43) < 0.55) edges.push([i, i % C]);                                   // to its hub
        if (hash2(i, 44) < 0.22) edges.push([i, C + Math.floor(hash2(i, 45) * (N - C))]);   // random long link
      }
      for (let a = 0; a < C; a++) for (let b2 = a + 1; b2 < C; b2++) if (hash2(a, b2 + 50) < 0.6) edges.push([a, b2]); // hub-hub
    }
    function network(i, now) {
      const n = netBase[i], wob = n.hub ? 0 : 3, t = now * 0.0016;
      return { x: n.x + Math.sin(t + i) * wob, y: n.y + Math.cos(t * 0.9 + i * 1.3) * wob, c: n.hub || hash2(i, 46) < 0.12 ? PINK : INK, r: n.hub ? 5 : 1.6, a: n.hub ? 1 : 0.7 };
    }
    // globe: fibonacci sphere, rotating; equator band + a few markers in pink; back side dimmer
    function globe(i, now) {
      const b = box, cx = b.x + b.w / 2, cy = b.y + b.h / 2, R = Math.min(b.w, b.h) * 0.42;
      const k = i + 0.5, phi = Math.acos(1 - 2 * k / N), th = Math.PI * (1 + Math.sqrt(5)) * k + now * 0.0005;
      const sx = Math.sin(phi) * Math.cos(th), sy = Math.cos(phi), sz = Math.sin(phi) * Math.sin(th);
      const tilt = 0.4, y2 = sy * Math.cos(tilt) - sz * Math.sin(tilt), z2 = sy * Math.sin(tilt) + sz * Math.cos(tilt);
      const front = (z2 + 1) / 2, eq = Math.abs(sy) < 0.06, mark = hash2(i, 61) < 0.03;
      return { x: cx + sx * R, y: cy + y2 * R * 0.95, c: eq || mark ? PINK : INK, r: (eq ? 1.9 : mark ? 2.6 : 1.2) * (0.55 + front * 0.6), a: (0.18 + front * 0.7) };
    }

    function layout() {
      const cr = canvas.getBoundingClientRect(); W = cr.width; H = cr.height;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!img.naturalWidth) return;
      const pr = photoRect();
      // the shapes live where the portrait is, a bit wider — the cycle happens in place
      box = { x: pr.x - pr.w * 0.22, y: pr.y + pr.h * 0.06, w: pr.w * 1.44, h: pr.h * 0.9 };
      const photo = buildPhoto(pr);
      buildNetwork();
      SHAPES = { photo, disperse: buildDisperse(photo), wave, network, globe };
      P = photo.map((t, i) => ({ x: t.x, y: t.y, sx: t.x, sy: t.y, stag: hash2(i, 31) * 0.28 }));
      phase = 0; phaseT0 = performance.now(); ready = true;
    }

    // ---- chrome (axes, edges, rings) — fades in late in the morph, out early in the next ------
    function chrome(name, alpha, now) {
      if (alpha <= 0.01 || !box) return;
      const b = box; ctx.save(); ctx.globalAlpha = alpha; ctx.font = "9px 'Space Mono', monospace"; ctx.fillStyle = "#8a8781";
      if (name === "wave") {
        
      } else if (name === "network") {
        ctx.lineWidth = 0.6;
        for (let e = 0; e < edges.length; e++) { const [a, c] = edges[e], pa = P[a], pc = P[c]; const hub = a < 6 && c < 6;
          ctx.strokeStyle = hub ? rgba(PINK, 0.55) : rgba(INK, 0.16); ctx.lineWidth = hub ? 1.1 : 0.6;
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pc.x, pc.y); ctx.stroke(); }
        
      } else if (name === "globe") {
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2, R = Math.min(b.w, b.h) * 0.42;
        ctx.strokeStyle = rgba(PINK, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.08, R * 0.28, -0.35, 0, 6.2832); ctx.stroke();
        ctx.strokeStyle = "#cfcbc3"; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.arc(cx, cy, R * 1.01, 0, 6.2832); ctx.stroke();
        
      }
      ctx.restore();
    }
    function imgAlpha(k, p) {
      if (k.shape === "photo" && k.morph === 0) return 1;
      if (k.shape === "disperse") return 1 - smooth(0, 0.55, p);
      if (k.shape === "photo") return smooth(0.72, 1, p);
      return 0;
    }
    const isChart = (s) => s === "wave" || s === "network" || s === "globe";

    // ---- frame ------------------------------------------------------------------------------
    function frame(now) {
      if (!running) return;
      if (!ready) { raf = requestAnimationFrame(frame); return; }
      const k = K[phase], el = now - phaseT0, p = k.morph ? Math.min(1, el / k.morph) : 1;
      if (el >= k.morph + k.hold) {
        P.forEach((q) => { q.sx = q.x; q.sy = q.y; });
        phase = (phase + 1) % K.length; if (K[phase].morph === 0) phase = 1; // the static first entry only runs once
        phaseT0 = now; raf = requestAnimationFrame(frame); return;
      }
      const S = SHAPES[k.shape], ia = imgAlpha(k, p);
      img.style.opacity = ia.toFixed(3);
      ctx.clearRect(0, 0, W, H);
      const partA = 1 - ia * 0.92;
      for (let i = 0; i < P.length; i++) {
        const q = P[i], t = typeof S === "function" ? S(i, now) : S[i];
        const pi = k.morph ? easeInOut(Math.max(0, Math.min(1, (p - q.stag) / (1 - 0.28)))) : 1;
        q.x = q.sx + (t.x - q.sx) * pi; q.y = q.sy + (t.y - q.sy) * pi;
        if (pi > 0 && pi < 1) { const wob = Math.sin(pi * 3.1416) * 12; q.x += Math.sin(now * 0.004 + i) * wob * 0.6; q.y += Math.cos(now * 0.0035 + i * 1.7) * wob * 0.4; }
        q.c = t.c; q.r = t.r; q.a = t.a * partA;
      }
      // chrome under the dots
      if (isChart(k.shape)) chrome(k.shape, smooth(0.6, 1, p), now);
      if (phase > 0 && isChart(K[phase - 1].shape) && k.morph) chrome(K[phase - 1].shape, 1 - smooth(0, 0.3, p), now);
      for (let i = 0; i < P.length; i++) { const q = P[i]; ctx.fillStyle = rgba(q.c, q.a); ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 6.2832); ctx.fill(); }
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
