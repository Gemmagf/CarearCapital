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
const SELECTED = ["swissGov", "labm", "farma", "cvHunter"];
const CASE_IMAGES = {}; // real screenshots → public/images/projects/proj_<id>.jpg
const HERO_PHOTO = `${process.env.PUBLIC_URL}/images/gemma_hero_cut.png`;
const yearOf = (period = "") => (period.match(/\d{4}/) || [""])[0];
const IMPACT = ["Align stakeholders", "Define strategy", "Build products", "Drive decisions", "Measure impact"];

export default function RedesignApp() {
  const [lang, setLang] = useState("english");
  const t = allTranslations[lang] || allTranslations.english;
  const cv = t.cv;
  const rootRef = useRef(null);
  const [openExp, setOpenExp] = useState(0);
  const [modal, setModal] = useState(null);

  const projects = t.personalProjects?.projects || [];
  const selected = useMemo(
    () => SELECTED.map((id) => projects.find((p) => p.id === id)).filter(Boolean), [projects]);
  const exp = cv?.experiences || [];

  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.1 });
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    if (reduced) {
      root.querySelectorAll("path[data-draw]").forEach((p) => { p.style.strokeDasharray = "none"; p.style.strokeDashoffset = "0"; });
      return () => io.disconnect();
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      root.querySelectorAll("path[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: p.closest("section"), start: "top 80%", end: "bottom 60%", scrub: 0.6 } });
      });
      root.querySelectorAll("[data-pop]").forEach((g, i) => gsap.from(g, {
        opacity: 0, scale: 0, transformOrigin: "center", duration: 0.45, delay: (i % 6) * 0.05,
        scrollTrigger: { trigger: g.closest("section"), start: "top 75%" } }));
    }, root);
    return () => { io.disconnect(); ctx.revert(); };
  }, [lang]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);

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
            <button key={code} className={lang === code ? "active" : ""} onClick={() => setLang(code)}>{ab}</button>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section className="rd-hero">
        <FlowField />
        <div className="wrap hero-inner">
          <div className="hero-text">
            <h1 className="hero-name"><span className="em">Gemma</span><span>Garcia</span><span>de la</span><span>Fuente</span></h1>
            <div className="hero-labels">
              <span className="lab">Data Science</span><span className="lab">Product</span><span className="lab">Strategy</span><span className="lab">Execution</span>
            </div>
            <div className="hero-meta">
              <span className="hero-loc">Based in Zürich · Working internationally</span>
              <button className="rd-cta" onClick={() => scrollTo("complexity")}>Explore my work <span className="arrow">→</span></button>
            </div>
          </div>
          {HERO_PHOTO && <HeroFigure src={HERO_PHOTO} />}
        </div>
        <div className="scroll-hint">Scroll ↓</div>
      </section>

      {/* 00 INTRO */}
      <section className="rd-band" id="intro">
        <div className="wrap grid12">
          <div style={{ gridColumn: "1 / 7" }}>
            <span className="section-index">00 / INTRO</span>
            <p className="reveal" style={{ fontFamily: "var(--display)", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(22px,2.6vw,40px)", lineHeight: 1.02, margin: "14px 0 0" }}>
              I turn <span className="pink">ambiguous problems</span> into data, decisions and things that ship.
            </p>
          </div>
          <p className="band-lead reveal" style={{ gridColumn: "7 / 13", alignSelf: "center", maxWidth: "48ch", fontSize: 15 }}>{cv?.summary}</p>
        </div>
      </section>

      {/* 01 COMPLEXITY */}
      <section className="rd-band" id="complexity">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">01</span></div>
            <h2 className="rd-title reveal">I make sense<br />of complexity</h2>
            <p className="band-lead reveal">From raw data to a decision someone can act on — statistics, modelling, forecasting, experimentation.</p>
          </div>
          <div className="rd-viz reveal" style={{ gridColumn: "4 / 10", alignSelf: "center" }}><DataSurface /></div>
          <div className="rd-list reveal" style={{ gridColumn: "10 / 13" }}>
            <h4>Expertise</h4>
            <ul>{(cv?.methodologies || []).slice(0, 6).map((m) => <li key={m}>{m}<span className="pl">+</span></li>)}</ul>
          </div>
        </div>
      </section>

      {/* 02 CONNECT — dark, compact */}
      <section className="rd-band dark" id="connect">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">02</span></div>
            <h2 className="rd-title reveal">I connect<br />the dots</h2>
            <p className="band-lead reveal">Between data, business and people — turning needs into direction and analysis into decisions.</p>
          </div>
          <div className="rd-viz reveal" style={{ gridColumn: "4 / 10", alignSelf: "center" }}><ChordOrbital /></div>
          <div className="rd-list reveal" style={{ gridColumn: "10 / 13" }}>
            <h4>/ Cross-functional impact</h4>
            <ul>{IMPACT.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* 03 SELECTED WORK — 4 cards in a row */}
      <section className="rd-band" id="work">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">03</span></div>
            <h2 className="rd-title reveal">I make<br />things happen</h2>
            <p className="band-lead reveal">Selected projects, from zero to shipped. Click any card for the full story.</p>
          </div>
          <div className="rd-cards reveal" style={{ gridColumn: "4 / 13", alignSelf: "center" }}>
            {selected.map((p, i) => (
              <button className="rd-carditem" key={p.id} onClick={() => setModal(p)}>
                <span className="cat">{p.tag}</span>
                <span className="ct">{p.title}</span>
                <span className="cviz">{CASE_IMAGES[p.id]
                  ? <img src={`${process.env.PUBLIC_URL}/images/projects/${CASE_IMAGES[p.id]}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.replaceWith(document.createComment("")); }} />
                  : <CaseViz kind={i} />}</span>
                <span className="cgo">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 04 PATH — panoramic dark */}
      <section className="rd-band dark" id="path">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">04</span></div>
            <h2 className="rd-title reveal">My path isn't<br />a straight line</h2>
            <p className="band-lead reveal">Different roles, sectors and countries — one trajectory. Growth is layers of learning and impact.</p>
          </div>
          <div className="rd-viz reveal" style={{ gridColumn: "4 / 13", alignSelf: "center" }}><CareerMap exp={exp} edu={cv?.education} /></div>
        </div>
      </section>

      {/* 05 FULL EXPERIENCE */}
      <section className="rd-band" id="about">
        <div className="wrap">
          <div className="band-head"><span className="section-index">05</span><h2 className="rd-title reveal" style={{ fontSize: "clamp(24px,3vw,40px)" }}>Full experience</h2></div>
          <div className="rd-exp" style={{ marginTop: 18 }}>
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
          <div style={{ marginTop: 40 }} className="rd-skills">
            <div className="grp reveal"><h4>{cv?.methodologiesTitle || "Methods"}</h4><div className="chips">{(cv?.methodologies || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.techStackTitle || "Tools"}</h4><div className="chips">{(cv?.techStack || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.languagesTitle || "Languages"}</h4><div className="chips">{(cv?.languages || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.educationTitle || "Education"}</h4><div className="chips" style={{ flexDirection: "column", alignItems: "flex-start" }}>{(cv?.education || []).map((m) => <span className="chip" key={m} style={{ border: 0, padding: "2px 0", fontSize: 12.5, color: "var(--ink-soft)" }}>{m}</span>)}</div></div>
          </div>
        </div>
      </section>

      <footer className="rd-footer">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, alignItems: "baseline" }}>
          <div>
            <div className="mono">Let's talk</div>
            <a href={`mailto:${t.social?.email}`} style={{ fontFamily: "var(--display)", fontSize: "clamp(24px,4vw,52px)", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "3px solid var(--pink)" }}>{t.social?.email}</a>
          </div>
          <div className="mono" style={{ textAlign: "right", lineHeight: 2 }}>
            <a href={t.social?.linkedin} target="_blank" rel="noreferrer" style={{ display: "block", color: "var(--ink)" }}>LinkedIn ↗</a>
            <a href={t.social?.github} target="_blank" rel="noreferrer" style={{ display: "block", color: "var(--ink)" }}>GitHub ↗</a>
          </div>
        </div>
      </footer>

      {modal && (
        <div className="rd-modal" onClick={() => setModal(null)}>
          <div className="box" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setModal(null)}>✕</button>
            <span className="cat">{modal.tag}</span>
            <h3>{modal.title}</h3>
            <p>{modal.description}</p>
            <div className="stack">{(modal.stack || []).join(" · ")}</div>
            <div className="acts">
              {modal.link && <a className="primary" href={modal.link} target="_blank" rel="noreferrer">Open live ↗</a>}
              {modal.repo && <a href={modal.repo} target="_blank" rel="noreferrer">View code ↗</a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= visuals ================= */

function NavMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" style={{ display: "block" }}>
      <g stroke="#FF3B7D" strokeWidth="1.2"><line x1="4" y1="20" x2="12" y2="7" /><line x1="12" y1="7" x2="20" y2="14" /><line x1="4" y1="20" x2="20" y2="14" /></g>
      <g fill="#FF3B7D"><circle cx="4" cy="20" r="2.4" /><circle cx="12" cy="7" r="2.4" /><circle cx="20" cy="14" r="2.4" /></g>
    </svg>
  );
}

// flowing dotted DATA SURFACE — dense, fine, grey→pink, small annotations
function DataSurface() {
  const COLS = 88, ROWS = 26, W = 940, H = 300;
  const dots = [];
  for (let j = 0; j < ROWS; j++) {
    const fz = j / (ROWS - 1), persp = 0.38 + fz * 0.62;
    for (let i = 0; i < COLS; i++) {
      const fx = i / (COLS - 1);
      const wave = Math.sin(fx * 8 + fz * 3.4) + 0.5 * Math.sin(fx * 16 - fz * 6) + 0.35 * Math.cos(fx * 3 + fz * 9);
      const x = W / 2 + (fx - 0.5) * (W * 0.96) * persp;
      const y = H * 0.24 + fz * (H * 0.6) - wave * 22 * persp;
      const h = Math.max(0, Math.min(1, (wave + 1.9) / 3.8));
      dots.push([x, y, h, persp]);
    }
  }
  const ann = [["PATTERN RECOGNITION", 600, 40, 560, 120], ["ANOMALY DETECTION", 90, 250, 190, 210], ["INSIGHT EXTRACTION", 790, 250, 720, 200]];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {dots.map(([x, y, h, persp], i) => {
        const pink = h > 0.58;
        return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(0.45 + h * 1.5).toFixed(2)}
          fill={pink ? "#FF3B7D" : "#55534e"} opacity={((pink ? 0.35 + h * 0.6 : 0.1 + h * 0.32) * (0.4 + persp * 0.6)).toFixed(2)} />;
      })}
      {ann.map(([label, tx, ty, lx, ly]) => (
        <g key={label} fontFamily="Space Mono, monospace" fontSize="9.5" fill="#8a8781" letterSpacing="0.4">
          <line x1={tx} y1={ty + 3} x2={lx} y2={ly} stroke="#cfcbc3" strokeWidth="0.8" />
          <circle cx={lx} cy={ly} r="2" fill="#FF3B7D" />
          <text x={tx} y={ty}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

// orbital network — wide & short, glowing core, four anchors
function ChordOrbital() {
  const W = 1000, H = 300, cx = 500, cy = 150;
  const orbits = [[330, 95, -16], [270, 120, 14], [380, 70, 30], [210, 88, -42]];
  const anchors = [["DATA", cx, cy - 118], ["BUSINESS", cx + 360, cy], ["PRODUCT", cx, cy + 118], ["PEOPLE", cx - 360, cy]];
  const rng = (s) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const scatter = [];
  orbits.forEach(([rx, ry, rot], oi) => {
    for (let k = 0; k < 7; k++) {
      const a = rng(oi * 9 + k) * Math.PI * 2, px = Math.cos(a) * rx, py = Math.sin(a) * ry, rr = (rot * Math.PI) / 180;
      scatter.push([cx + px * Math.cos(rr) - py * Math.sin(rr), cy + px * Math.sin(rr) + py * Math.cos(rr), rng(oi + k * 3) > 0.55]);
    }
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`}>
      <defs><radialGradient id="cg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF3B7D" stopOpacity="0.6" /><stop offset="100%" stopColor="#FF3B7D" stopOpacity="0" /></radialGradient></defs>
      {orbits.map(([rx, ry, rot], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#34343b" strokeWidth="0.9" transform={`rotate(${rot} ${cx} ${cy})`} />)}
      {anchors.map(([l, x, y]) => <path key={"a" + l} data-draw d={`M ${cx} ${cy} Q ${(cx + x) / 2 + (y - cy) * 0.12} ${(cy + y) / 2 - (x - cx) * 0.12} ${x} ${y}`} fill="none" stroke="#FF3B7D" strokeWidth="0.9" opacity="0.5" />)}
      {scatter.map(([x, y, big], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={big ? 2.6 : 1.5} fill={big ? "#FF3B7D" : "#7a7a82"} opacity={big ? 0.9 : 0.55} />)}
      <circle cx={cx} cy={cy} r="62" fill="url(#cg)" />
      <circle cx={cx} cy={cy} r="6" fill="#FF3B7D" />
      <text x={cx} y={cy - 1} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="11" fill="#fff" letterSpacing="1.3">STRATEGY</text>
      <text x={cx} y={cy + 15} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="11" fill="#FF3B7D" letterSpacing="1.3">CLARITY · IMPACT</text>
      {anchors.map(([l, x, y]) => (
        <g key={l} data-pop>
          <circle cx={x} cy={y} r="5" fill="#f2f0eb" />
          <text x={x} y={y < cy ? y - 12 : y + 20} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="11" fill="#f2f0eb" letterSpacing="1">{l}</text>
        </g>
      ))}
    </svg>
  );
}

// per-project data motif — finer, denser, fills the card
function CaseViz({ kind }) {
  const c = "#FF3B7D", k = kind % 4;
  if (k === 0) return ( // time-series / governance
    <svg viewBox="0 0 240 180"><g stroke="#e5e2db" strokeWidth="0.8">{[40,80,120,160,200].map((x) => <line key={x} x1={x} y1="14" x2={x} y2="166" />)}{[50,90,130].map((y) => <line key={y} x1="10" y1={y} x2="230" y2={y} />)}</g>
      <polyline fill="none" stroke={c} strokeWidth="1.4" points="10,140 34,120 58,128 82,90 106,104 130,70 154,86 178,48 202,64 226,40" />
      {[[34,120],[82,90],[130,70],[178,48],[226,40]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill={c}/>)}</svg>);
  if (k === 1) return ( // MMM / allocation bars
    <svg viewBox="0 0 240 180">{Array.from({length:14}).map((_,i)=>{const v=20+Math.abs(Math.sin(i*1.3))*120;return <rect key={i} x={12+i*16} y={168-v} width="9" height={v} fill={i%2?c:"#111"} opacity={i%2?0.9:0.85}/>;})}</svg>);
  if (k === 2) return ( // causal / clusters scatter
    <svg viewBox="0 0 240 180">{Array.from({length:90}).map((_,i)=>{const cl=i%3;const cx=50+cl*70+(Math.sin(i*2.1))*26;const cy=90+(Math.cos(i*1.7))*58;return <circle key={i} cx={cx} cy={cy} r={cl===1?2.4:1.6} fill={cl===1?c:"#111"} opacity="0.65"/>;})}</svg>);
  return ( // embeddings / graph
    <svg viewBox="0 0 240 180">{Array.from({length:12}).map((_,i)=>{const a=i/12*6.283;const x=120+Math.cos(a)*(55+(i%3)*14);const y=90+Math.sin(a)*(46+(i%2)*12);return <g key={i}><line x1="120" y1="90" x2={x} y2={y} stroke="#ddd" strokeWidth="0.7"/><circle cx={x} cy={y} r={i%3?2:3} fill={c} opacity="0.85"/></g>;})}<circle cx="120" cy="90" r="4.5" fill="#111"/></svg>);
}

// panoramic career map: faint dotted "map" + pink curve across, real work+study nodes
function CareerMap({ exp, edu }) {
  const work = [...exp].map((s) => ({ year: +((s.period.match(/\d{4}/) || [0])[0]), label: s.company.split(" ")[0], sub: s.location, type: "work" }));
  const study = (edu || []).map((e) => {
    const year = +((e.match(/\d{4}/) || [0])[0]);
    const degree = e.split("—")[0].trim().replace(/\s+in\s+/i, " ");
    const inst = (e.match(/\(([^)]+)\)/) || [, ""])[1];
    return { year, label: degree, sub: inst, type: "study" };
  });
  const all = [...work, ...study].filter((d) => d.year).sort((a, b) => a.year - b.year);
  const W = 1400, H = 320, pad = 70, n = all.length;
  // faint dot "map" grid
  const grid = [];
  for (let y = 30; y < H - 30; y += 16) for (let x = 20; x < W - 20; x += 16) if ((x * 7 + y * 13) % 5 < 3) grid.push([x, y]);
  const pts = all.map((s, i) => [pad + (i / Math.max(1, n - 1)) * (W - pad * 2), H / 2 - Math.sin(i * 0.8) * 46 - (i - n / 2) * 4, s]);
  const d = pts.map(([x, y], i) => { if (i === 0) return `M ${x} ${y}`; const [px, py] = pts[i - 1], mx = (px + x) / 2; return `C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`; }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`}>
      {grid.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#2c2c31" />)}
      <path data-draw d={d} fill="none" stroke="#FF3B7D" strokeWidth="2.2" />
      {pts.map(([x, y, s], i) => (
        <g key={i} data-pop>
          {s.type === "work"
            ? <><circle cx={x} cy={y} r="5.5" fill="#FF3B7D" /><text x={x} y={y + 22} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#f2f0eb">{s.label}</text><text x={x} y={y + 37} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" fill="#8a8781">{s.year} · {s.sub}</text></>
            : <><circle cx={x} cy={y} r="4.5" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.4" /><text x={x} y={y - 18} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9.5" fill="#c9c6c0">{s.label}</text><text x={x} y={y - 7} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8.5" fill="#8a8781">{s.year}</text></>}
        </g>
      ))}
      <g fontFamily="Space Mono, monospace" fontSize="9" fill="#8a8781">
        <circle cx={pad} cy={H - 12} r="4" fill="#FF3B7D" /><text x={pad + 10} y={H - 8}>WORK</text>
        <circle cx={pad + 86} cy={H - 12} r="4" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.4" /><text x={pad + 96} y={H - 8}>STUDIES</text>
      </g>
    </svg>
  );
}
