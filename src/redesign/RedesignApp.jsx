import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import allTranslations from "../translations/translations";
import FlowField from "./FlowField";
import HeroFigure from "./HeroFigure";
import "./redesign.css";

const LANGS = [
  ["english", "EN"], ["catalan", "CA"], ["spanish", "ES"],
  ["french", "FR"], ["german", "DE"], ["italian", "IT"],
];
const SELECTED = ["swissGov", "labm", "farma", "cvHunter", "retail"];
// project thumbnails (in public/images/projects/); missing ones fall back to the abstract
// data motif. To use a real screenshot: save it as public/images/projects/proj_<id>.jpg
// and add an entry here, e.g. swissGov: "proj_swissgov.jpg".
const CASE_IMAGES = {};
const yearOf = (period = "") => (period.match(/\d{4}/) || [""])[0];

// ── Hero photo — SINGLE point of change ──────────────────────────
// Drop a new file in public/images/ and change this filename. A plain
// photo against a light wall works: it is desaturated and its edges are
// masked so the person dissolves into the pink flow-field (no cutout needed).
const HERO_PHOTO = `${process.env.PUBLIC_URL}/images/gemma_hero_cut.png`;

export default function RedesignApp() {
  const [lang, setLang] = useState("english");
  const t = allTranslations[lang] || allTranslations.english;
  const cv = t.cv;
  const rootRef = useRef(null);
  const [openExp, setOpenExp] = useState(0);

  const projects = t.personalProjects?.projects || [];
  const selected = useMemo(
    () => SELECTED.map((id) => projects.find((p) => p.id === id)).filter(Boolean),
    [projects]
  );
  const exp = cv?.experiences || [];

  // reveal + GSAP scroll-drawing
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // reveal-on-scroll
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    if (reduced) {
      root.querySelectorAll("path[data-draw]").forEach((p) => {
        p.style.strokeDasharray = "none"; p.style.strokeDashoffset = "0";
      });
      return () => io.disconnect();
    }

    root.classList.add("js-motion");
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      root.querySelectorAll("path[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: p.closest("section"), start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        });
      });
      // node pop-in for the network / path dots
      root.querySelectorAll("[data-pop]").forEach((g, i) => {
        gsap.from(g, {
          opacity: 0, scale: 0, transformOrigin: "center", duration: 0.5, delay: (i % 8) * 0.05,
          scrollTrigger: { trigger: g.closest("section"), start: "top 70%" },
        });
      });
    }, root);
    return () => { io.disconnect(); ctx.revert(); };
  }, [lang]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="rd" ref={rootRef}>
      <a className="rd-brand-fixed" href="#redesign" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <NavMark /><span>Gemma Garcia</span>
      </a>
      <header className="rd-topbar">
        <nav>
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("path")}>Path</button>
          <button onClick={() => scrollTo("about")}>About</button>
        </nav>
        <div className="rd-lang" style={{ display: "flex", gap: 12 }}>
          {LANGS.map(([code, ab]) => (
            <button key={code} className={lang === code ? "active" : ""} onClick={() => setLang(code)}
              style={{ background: "none", border: 0, cursor: "pointer", color: "inherit", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em" }}>
              {ab}
            </button>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section className="rd-hero">
        <FlowField />
        {HERO_PHOTO && <HeroFigure src={HERO_PHOTO} />}
        <div className="wrap hero-inner">
          <h1 className="hero-name">
            <span className="em">Gemma</span><span>Garcia</span><span>de la</span><span>Fuente</span>
          </h1>
          <div className="hero-labels">
            <span className="lab">Data Science</span><span className="lab">Product</span>
            <span className="lab">Strategy</span><span className="lab">Execution</span>
          </div>
          <div className="hero-meta">
            <span className="hero-loc">Based in Zürich · Working internationally</span>
            <button className="rd-cta" onClick={() => scrollTo("complexity")}>Explore my work <span className="arrow">→</span></button>
          </div>
        </div>
        <div className="scroll-hint">Scroll ↓</div>
      </section>

      {/* 00 INTRO */}
      <section className="rd-section" id="intro">
        <div className="wrap">
          <div className="sec-head"><span className="section-index">00 / INTRO</span></div>
          <p className="sec-lead reveal" style={{ maxWidth: "30ch", fontSize: "clamp(22px,3.4vw,40px)", color: "var(--ink)", lineHeight: 1.25 }}>
            I turn <span className="pink">ambiguous problems</span> into data, decisions and things that ship.
          </p>
          <p className="sec-lead reveal" style={{ marginTop: 22 }}>{cv?.summary}</p>
        </div>
      </section>

      {/* 01 COMPLEXITY */}
      <section className="rd-section" id="complexity">
        <hr className="rule" />
        <div className="wrap">
          <div className="sec-head" style={{ marginTop: 40 }}>
            <span className="section-index">01</span>
            <h2 className="sec-title reveal">I make sense<br />of complexity</h2>
          </div>
          <p className="sec-lead reveal">Statistics, modelling, forecasting, experimentation and clear visualisation — the path from raw data to a decision someone can act on.</p>
          <div className="reveal"><DataSurface /></div>
          <p className="mono reveal" style={{ marginTop: 18 }}>raw data → patterns → insight → decision</p>
        </div>
      </section>

      {/* 02 CONNECT — dark */}
      <section className="rd-section rd-section--dark" id="connect">
        <div className="wrap">
          <div className="sec-head">
            <span className="section-index">02</span>
            <h2 className="sec-title reveal">I connect<br />the dots</h2>
          </div>
          <p className="sec-lead reveal">As a Product Owner I sit between data, business and people — translating needs into direction and analysis into decisions leaders act on.</p>
          <div className="rd-network reveal" style={{ marginTop: 20 }}><ChordOrbital /></div>
        </div>
      </section>

      {/* 03 SELECTED WORK */}
      <section className="rd-section" id="work">
        <div className="wrap">
          <div className="sec-head">
            <span className="section-index">03</span>
            <h2 className="sec-title reveal">I make<br />things happen</h2>
          </div>
          <div className="rd-work">
            {selected.map((p, i) => (
              <article className="rd-case reveal" key={p.id}>
                <a className="case-viz" href={p.link || p.repo} target="_blank" rel="noreferrer">
                  {CASE_IMAGES[p.id]
                    ? <img src={`${process.env.PUBLIC_URL}/images/projects/${CASE_IMAGES[p.id]}`} alt={p.title}
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    : <CaseViz kind={i} />}
                </a>
                <div>
                  <span className="case-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p className="case-body">{p.description}</p>
                  <p className="case-stack">{(p.stack || []).join(" · ")}</p>
                  <div className="case-links" style={{ marginTop: 16 }}>
                    {p.link && <a className="case-cta" href={p.link} target="_blank" rel="noreferrer">View project <span>→</span></a>}
                    {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 CAREER PATH — dark terrain */}
      <section className="rd-section rd-section--dark" id="path">
        <div className="wrap">
          <div className="sec-head">
            <span className="section-index">04</span>
            <h2 className="sec-title reveal">My path isn't<br />a straight line</h2>
          </div>
          <p className="sec-lead reveal">Different roles, sectors and countries — one trajectory. Growth isn't linear; it's layers of learning and impact.</p>
          <div className="rd-terrain reveal"><CareerTerrain exp={exp} edu={cv?.education} /></div>
        </div>
      </section>

      {/* 05 FULL EXPERIENCE */}
      <section className="rd-section" id="about">
        <div className="wrap">
          <div className="sec-head">
            <span className="section-index">05</span>
            <h2 className="sec-title reveal">Full experience</h2>
          </div>
          <div className="rd-exp">
            {exp.map((e, i) => (
              <div className={"exp-row" + (openExp === i ? " open" : "")} key={i}>
                <button className="exp-head" onClick={() => setOpenExp(openExp === i ? -1 : i)}>
                  <span className="exp-year">{yearOf(e.period)}</span>
                  <span className="exp-role">{e.role} <span className="co">— {e.company}, {e.location}</span></span>
                  <span className="exp-toggle">{openExp === i ? "–" : "+"}</span>
                </button>
                <div className="exp-body"><ul>{(e.description || []).map((b, j) => <li key={j}>{b}</li>)}</ul></div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64 }} className="rd-skills">
            <div className="grp reveal"><h4>{cv?.methodologiesTitle || "Methods"}</h4><div className="chips">{(cv?.methodologies || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.techStackTitle || "Tools"}</h4><div className="chips">{(cv?.techStack || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.languagesTitle || "Languages"}</h4><div className="chips">{(cv?.languages || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.educationTitle || "Education"}</h4>
              <div className="chips" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                {(cv?.education || []).map((m) => <span className="chip" key={m} style={{ border: 0, padding: "2px 0", fontSize: 13, color: "var(--ink-soft)" }}>{m}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="rd-footer">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, alignItems: "baseline" }}>
          <div>
            <div className="mono">Let's talk</div>
            <a href={`mailto:${t.social?.email}`} style={{ fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,64px)", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "3px solid var(--pink)" }}>{t.social?.email}</a>
          </div>
          <div className="mono" style={{ textAlign: "right", lineHeight: 2 }}>
            <a href={t.social?.linkedin} target="_blank" rel="noreferrer" style={{ display: "block", color: "var(--ink)" }}>LinkedIn ↗</a>
            <a href={t.social?.github} target="_blank" rel="noreferrer" style={{ display: "block", color: "var(--ink)" }}>GitHub ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= visuals ================= */

// small pink "data" monogram for the nav (nodes + links)
function NavMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" style={{ display: "block" }}>
      <g stroke="#FF3B7D" strokeWidth="1.2">
        <line x1="4" y1="20" x2="12" y2="7" /><line x1="12" y1="7" x2="20" y2="14" /><line x1="4" y1="20" x2="20" y2="14" />
      </g>
      <g fill="#FF3B7D">
        <circle cx="4" cy="20" r="2.4" /><circle cx="12" cy="7" r="2.4" /><circle cx="20" cy="14" r="2.4" />
      </g>
    </svg>
  );
}

// flowing dotted DATA SURFACE (reference 01) — perspective grid warped by a wave,
// pink at the peaks, fading with depth; annotated callouts.
function DataSurface() {
  const COLS = 64, ROWS = 22, W = 1000, H = 380;
  const dots = [];
  for (let j = 0; j < ROWS; j++) {           // depth: 0 back -> 1 front
    const fz = j / (ROWS - 1);
    const persp = 0.4 + fz * 0.6;
    for (let i = 0; i < COLS; i++) {
      const fx = i / (COLS - 1);
      const wave = Math.sin(fx * 7.5 + fz * 3.2) + 0.5 * Math.sin(fx * 15 - fz * 6) + 0.4 * Math.cos(fx * 3 + fz * 8);
      const x = W / 2 + (fx - 0.5) * (W * 0.94) * persp;
      const y = H * 0.30 + fz * (H * 0.52) - wave * 24 * persp;
      const hgt = (wave + 1.9) / 3.8;         // 0..1
      dots.push([x, y, hgt, persp]);
    }
  }
  const ann = [
    ["PATTERN RECOGNITION", 640, 60, 610, 150],
    ["ANOMALY DETECTION", 150, 300, 250, 250],
    ["INSIGHT EXTRACTION", 830, 300, 760, 250],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", marginTop: 30 }} aria-hidden="true">
      {dots.map(([x, y, hgt, persp], i) => (
        <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(0.7 + persp * 1.3).toFixed(2)}
          fill={hgt > 0.62 ? "#FF3B7D" : "#111"}
          opacity={((hgt > 0.62 ? 0.35 + hgt * 0.6 : 0.12 + hgt * 0.3) * (0.45 + persp * 0.55)).toFixed(2)} />
      ))}
      {ann.map(([label, tx, ty, lx, ly]) => (
        <g key={label} fontFamily="Space Mono, monospace" fontSize="11" fill="#6b6b68" letterSpacing="0.5">
          <line x1={tx} y1={ty + 4} x2={lx} y2={ly} stroke="#c9c6c0" strokeWidth="1" />
          <circle cx={lx} cy={ly} r="2.5" fill="#FF3B7D" />
          <text x={tx} y={ty} textAnchor={tx > 500 ? "start" : "start"}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

// orbital connection network (reference 02) — concentric orbits, scattered nodes,
// four labelled anchors around a glowing CLARITY / IMPACT core. Dark section.
function ChordOrbital() {
  const W = 1000, H = 460, cx = 500, cy = 220;
  const orbits = [[300, 120, -18], [250, 150, 12], [340, 90, 30], [200, 110, -40]];
  const anchors = [["DATA", cx, cy - 165], ["BUSINESS", cx + 320, cy], ["PRODUCT", cx, cy + 165], ["PEOPLE", cx - 320, cy]];
  // scattered nodes on orbit ellipses
  const rng = (s) => { let x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const scatter = [];
  orbits.forEach(([rx, ry, rot], oi) => {
    for (let k = 0; k < 7; k++) {
      const a = rng(oi * 9 + k) * Math.PI * 2;
      const px = Math.cos(a) * rx, py = Math.sin(a) * ry;
      const rr = (rot * Math.PI) / 180;
      const x = cx + px * Math.cos(rr) - py * Math.sin(rr);
      const y = cy + px * Math.sin(rr) + py * Math.cos(rr);
      scatter.push([x, y, rng(oi + k * 3) > 0.5]);
    }
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }}>
      <defs>
        <radialGradient id="coreglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF3B7D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF3B7D" stopOpacity="0" />
        </radialGradient>
      </defs>
      {orbits.map(([rx, ry, rot], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#33333a" strokeWidth="1"
          transform={`rotate(${rot} ${cx} ${cy})`} opacity="0.8" />
      ))}
      {anchors.map(([l, x, y]) => (
        <path key={"e" + l} data-draw d={`M ${cx} ${cy} Q ${(cx + x) / 2 + (y - cy) * 0.12} ${(cy + y) / 2 - (x - cx) * 0.12} ${x} ${y}`}
          fill="none" stroke="#FF3B7D" strokeWidth="1" opacity="0.5" />
      ))}
      {scatter.map(([x, y, big], i) => (
        <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={big ? 3 : 1.8} fill={big ? "#FF3B7D" : "#7a7a82"} opacity={big ? 0.9 : 0.6} />
      ))}
      <circle cx={cx} cy={cy} r="80" fill="url(#coreglow)" />
      <circle cx={cx} cy={cy} r="7" fill="#FF3B7D" />
      <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="12" fill="#fff" letterSpacing="1.5">STRATEGY</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="12" fill="#FF3B7D" letterSpacing="1.5">CLARITY · IMPACT</text>
      {anchors.map(([l, x, y]) => (
        <g key={l} data-pop>
          <circle cx={x} cy={y} r="6" fill="#f2f0eb" />
          <text x={x} y={y < cy ? y - 14 : y + 22} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="12" fill="#f2f0eb" letterSpacing="1">{l}</text>
        </g>
      ))}
    </svg>
  );
}

function CaseViz({ kind }) {
  const c = "#FF3B7D", k = kind % 5;
  if (k === 0) return <svg viewBox="0 0 200 150"><g stroke="#e5e2db">{[40,70,100,130,160].map((x)=><line key={x} x1={x} y1="10" x2={x} y2="140"/>)}</g><polyline fill="none" stroke={c} strokeWidth="1.6" points="10,120 40,90 70,100 100,55 130,70 160,30 190,45" /></svg>;
  if (k === 1) return <svg viewBox="0 0 200 150">{[30,70,55,95,40,110,60].map((v,i)=><rect key={i} x={12+i*26} y={140-v} width="16" height={v} fill={i%2?c:"#111"}/>)}</svg>;
  if (k === 2) return <svg viewBox="0 0 200 150">{Array.from({length:60}).map((_,i)=>{const cl=i%3;const cx=40+cl*60+(Math.random()-.5)*40;const cy=75+(Math.random()-.5)*80;return <circle key={i} cx={cx} cy={cy} r="2.4" fill={cl===1?c:"#111"} opacity="0.7"/>;})}</svg>;
  if (k === 3) return <svg viewBox="0 0 200 150">{Array.from({length:9}).map((_,i)=>{const a=i/9*6.28;const x=100+Math.cos(a)*55;const y=75+Math.sin(a)*45;return <g key={i}><line x1="100" y1="75" x2={x} y2={y} stroke="#ddd"/><circle cx={x} cy={y} r="3" fill={c}/></g>;})}<circle cx="100" cy="75" r="5" fill="#111"/></svg>;
  return <svg viewBox="0 0 200 150">{[20,40,60,80,100].map((r,i)=><ellipse key={i} cx="100" cy="75" rx={r} ry={r*0.6} fill="none" stroke={i===2?c:"#e5e2db"}/>)}</svg>;
}

// dark terrain + drawn path merging WORK and STUDIES on one trajectory
function CareerTerrain({ exp, edu }) {
  const work = [...exp].map((s) => ({
    year: +((s.period.match(/\d{4}/) || [0])[0]),
    label: s.company.split(" ")[0], sub: s.location, type: "work",
  }));
  const study = (edu || []).map((e) => {
    const year = +((e.match(/\d{4}/) || [0])[0]);
    const degree = e.split("—")[0].trim().replace(/\s+in\s+/i, " ");
    const inst = (e.match(/\(([^)]+)\)/) || [, ""])[1];
    return { year, label: degree, sub: inst, type: "study" };
  });
  const all = [...work, ...study].filter((d) => d.year).sort((a, b) => a.year - b.year);

  const W = 1000, H = 420, pad = 64;
  const n = all.length;
  const terr = [];
  for (let x = 0; x <= W; x += 20) terr.push([x, 330 + Math.sin(x * 0.012) * 24 + Math.sin(x * 0.05) * 10 + (Math.random() - 0.5) * 6]);
  const terrD = "M0," + H + " " + terr.map(([x, y]) => `L${x},${y.toFixed(1)}`).join(" ") + ` L${W},${H} Z`;
  const pts = all.map((s, i) => {
    const x = pad + (i / Math.max(1, n - 1)) * (W - pad * 2);
    const y = 210 - Math.sin(i * 0.9) * 52 - i * 3;
    return [x, y, s];
  });
  const d = pts.map(([x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1]; const mx = (px + x) / 2;
    return `C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", marginTop: 24 }}>
      <path d={terrD} fill="#161619" stroke="#2a2a2e" strokeWidth="1" />
      {terr.filter((_, i) => i % 2 === 0).map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" fill="#3a3a40" />)}
      <path data-draw d={d} fill="none" stroke="#FF3B7D" strokeWidth="2.5" />
      {pts.map(([x, y, s], i) => (
        <g key={i} data-pop>
          {s.type === "work" ? (
            <>
              <circle cx={x} cy={y} r="6" fill="#FF3B7D" />
              <text x={x} y={y + 26} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#f2f0eb">{s.label}</text>
              <text x={x} y={y + 41} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" fill="#8a8781">{s.year} · {s.sub}</text>
            </>
          ) : (
            <>
              <circle cx={x} cy={y} r="5" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.5" />
              <text x={x} y={y - 22} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="10" fill="#c9c6c0" letterSpacing="0.5">{s.label}</text>
              <text x={x} y={y - 10} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" fill="#8a8781">{s.year} · {s.sub}</text>
            </>
          )}
        </g>
      ))}
      <g fontFamily="Space Mono, monospace" fontSize="9" fill="#8a8781">
        <circle cx={pad} cy={H - 16} r="4" fill="#FF3B7D" /><text x={pad + 10} y={H - 12}>WORK</text>
        <circle cx={pad + 90} cy={H - 16} r="4" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.5" /><text x={pad + 100} y={H - 12}>STUDIES</text>
      </g>
    </svg>
  );
}
