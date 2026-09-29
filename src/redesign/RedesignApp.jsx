import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import allTranslations, { applyCvVariant, PROJECT_BRIEFS } from "../translations/translations";
import FlowField from "./FlowField";
import HeroFigure from "./HeroFigure";
import RD from "./copy";
import "./redesign.css";

const LANGS = [
  ["english", "EN"], ["catalan", "CA"], ["spanish", "ES"],
  ["french", "FR"], ["german", "DE"], ["italian", "IT"],
];
// Forward-deployed positioning: AI in production, tech tied to CHF decisions, end-to-end business tools.
const SELECTED = ["cvHunter", "sensorlab", "swissGov", "retail", "rovello", "puppyTracker"];
const VIZ_KIND = { cvHunter: 3, sensorlab: 0, zuriKreislauf: 2, retail: 1 }; // CaseViz motif per project
const CASE_IMAGES = {}; // real screenshots → public/images/projects/proj_<id>.jpg
const HERO_PHOTO = `${process.env.PUBLIC_URL}/images/gemma_hero_cut.png`;
const yearOf = (period = "") => (period.match(/\d{4}/) || [""])[0];

const QUOTES = {
  intro: ["Si observes, coneixes; si coneixes, estimes; si estimes, protegeixes.", "Jordi Sabater Pi"],
  s1: ["If you can write the problem down clearly, the matter is half solved.", "Kidlin\u2019s Law"],
  s2: ["\u7a7a\u6c17\u3092\u8aad\u3080 \u00b7 k\u016bki o yomu \u2014 to read the air.", ""],
  s3: ["Quatre coses b\u00e0siques resolen el 80 % dels casos; quatre de dif\u00edcils, la resta.", "Enric, el meu pare"],
  s4: ["There is nothing permanent except change.", "Heraclitus"],
  footer: ["It\u2019s harder to be kind than clever.", ""],
};
const Epigraph = ({ q }) => q ? <p className="epigraph reveal">\u201c{q[0]}\u201d{q[1] ? <span> \u2014 {q[1]}</span> : null}</p> : null;

export default function RedesignApp() {
  const [lang, setLang] = useState("english");
  const t = allTranslations[lang] || allTranslations.english;
  const C = RD[lang] || RD.english;                 // editorial copy in the current language
  const cv = applyCvVariant(t.cv, "fde");           // FDE variant for education order; copy comes from C
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

  useEffect(() => { console.log("%c🐾 Caleta was here", "color:#FF3B7D;font-family:monospace;font-size:12px"); }, []);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="rd" ref={rootRef}>
      <a className="rd-brand-fixed" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <NavMark /><span>Gemma Garcia</span>
      </a>
      <header className="rd-topbar">
        <nav>
          <button onClick={() => scrollTo("work")}>{C.nav.work}</button>
          <button onClick={() => scrollTo("path")}>{C.nav.path}</button>
          <button onClick={() => scrollTo("about")}>{C.nav.about}</button>
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
            {HERO_PHOTO && <HeroFigure src={HERO_PHOTO} />}
          </div>
          <div className="hero-side">
            <div className="hero-labels">
              {C.labels.map((l) => <span className="lab" key={l}>{l}</span>)}
            </div>
            <div className="hero-meta">
              <span className="hero-loc">{C.loc}</span>
              <button className="rd-cta" onClick={() => scrollTo("complexity")}>{C.cta} <span className="arrow">→</span></button>
            </div>
          </div>
        </div>
        <div className="scroll-hint">{C.scroll}</div>
      </section>

      {/* 00 INTRO */}
      <section className="rd-band" id="intro">
        <div className="wrap grid12">
          <div style={{ gridColumn: "1 / 7" }}>
            <span className="section-index">00 / INTRO</span>
            <p className="reveal" style={{ fontFamily: "var(--display)", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(22px,2.6vw,40px)", lineHeight: 1.02, margin: "14px 0 0" }}>
              {C.intro[0]}<span className="pink">{C.intro[1]}</span>{C.intro[2]}
            </p>
          </div>
          <div style={{ gridColumn: "7 / 13", alignSelf: "center", maxWidth: "48ch" }}><p className="band-lead reveal" style={{ fontSize: 15 }}>{C.summary}</p><Epigraph q={QUOTES.intro} /></div>
        </div>
      </section>

      {/* 01 COMPLEXITY */}
      <section className="rd-band" id="complexity">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">01</span></div>
            <h2 className="rd-title reveal">{C.s1.title[0]}<br />{C.s1.title[1]}</h2>
            <p className="band-lead reveal">{C.s1.lead}</p><Epigraph q={QUOTES.s1} />
          </div>
          <div className="rd-viz reveal" style={{ gridColumn: "4 / 10", alignSelf: "center" }}><DataSurface /></div>
          <div className="rd-list reveal" style={{ gridColumn: "10 / 13" }}>
            <h4>{C.s1.listTitle}</h4>
            <ul>{C.s1.list.map((m) => <li key={m}>{m}<span className="pl">+</span></li>)}</ul>
          </div>
        </div>
      </section>

      {/* 02 CONNECT — dark, compact */}
      <section className="rd-band dark" id="connect">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">02</span></div>
            <h2 className="rd-title reveal">{C.s2.title[0]}<br />{C.s2.title[1]}</h2>
            <p className="band-lead reveal">{C.s2.lead}</p><Epigraph q={QUOTES.s2} />
          </div>
          <div className="rd-viz reveal" style={{ gridColumn: "4 / 10", alignSelf: "center" }}><ChordOrbital /></div>
          <div className="rd-list reveal" style={{ gridColumn: "10 / 13" }}>
            <h4>{C.s2.listTitle}</h4>
            <ul>{C.s2.list.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* 03 SELECTED WORK — 4 cards in a row */}
      <section className="rd-band" id="work">
        <div className="wrap grid12">
          <div className="colhead" style={{ gridColumn: "1 / 4" }}>
            <div className="band-head"><span className="section-index">03</span></div>
            <h2 className="rd-title reveal">{C.s3.title[0]}<br />{C.s3.title[1]}</h2>
            <p className="band-lead reveal">{C.s3.lead}</p><Epigraph q={QUOTES.s3} />
          </div>
          <div className="rd-cards reveal" style={{ gridColumn: "4 / 13", alignSelf: "center" }}>
            {selected.map((p, i) => (
              <button className="rd-carditem" key={p.id} onClick={() => setModal(p)}>
                <span className="cat">{p.tag}</span>
                <span className="ct">{p.title}</span>
                <span className="cviz">{CASE_IMAGES[p.id]
                  ? <img src={`${process.env.PUBLIC_URL}/images/projects/${CASE_IMAGES[p.id]}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.replaceWith(document.createComment("")); }} />
                  : <CaseViz id={p.id} kind={VIZ_KIND[p.id] ?? i} />}</span>
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
            <h2 className="rd-title reveal">{C.s4.title[0]}<br />{C.s4.title[1]}</h2>
            <p className="band-lead reveal">{C.s4.lead}</p><Epigraph q={QUOTES.s4} />
          </div>
          <div className="rd-viz reveal" style={{ gridColumn: "4 / 13", alignSelf: "center" }}><CareerMap exp={exp} edu={cv?.education} legend={C.s4.legend} events={C.s4.events || []} /></div>
        </div>
      </section>

      {/* 05 FULL EXPERIENCE */}
      <section className="rd-band" id="about">
        <div className="wrap">
          <div className="band-head"><span className="section-index">05</span><h2 className="rd-title reveal" style={{ fontSize: "clamp(24px,3vw,40px)" }}>{C.s5}</h2></div>
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
            <div className="grp reveal"><h4>{cv?.methodologiesTitle || "Methods"}</h4><div className="chips">{C.methods.map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.techStackTitle || "Tools"}</h4><div className="chips">{(cv?.techStack || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            <div className="grp reveal"><h4>{cv?.languagesTitle || "Languages"}</h4><div className="chips">{(cv?.languages || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div></div>
            {C.books && <div className="grp reveal"><h4>{C.books.title}</h4><div className="chips">{C.books.list.map((b) => <a className="chip link" key={b.title} href={b.url} target="_blank" rel="noreferrer"><em>{b.title}</em> — {b.author} ↗</a>)}</div></div>}
            {C.pub && <div className="grp reveal pub"><h4>{C.pub.title}</h4><a href={C.pub.url} target="_blank" rel="noreferrer">{C.pub.paper} ↗</a><div className="meta">{C.pub.journal} · {C.pub.cited}</div></div>}
            <div className="grp reveal"><h4>{cv?.educationTitle || "Education"}</h4><div className="chips" style={{ flexDirection: "column", alignItems: "flex-start" }}>{(cv?.education || []).map((m) => <span className="chip" key={m} style={{ border: 0, padding: "2px 0", fontSize: 12.5, color: "var(--ink-soft)" }}>{m}</span>)}</div></div>
          </div>
        </div>
      </section>

      <footer className="rd-footer">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, alignItems: "baseline" }}>
          <div>
            <div className="mono">{C.footer}</div>
            <a href={`mailto:${t.social?.email}`} style={{ fontFamily: "var(--display)", fontSize: "clamp(24px,4vw,52px)", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "3px solid var(--pink)" }}>{t.social?.email}</a>
          </div>
          <div className="mono" style={{ textAlign: "right", lineHeight: 2 }}>
            <a href={t.social?.linkedin} target="_blank" rel="noreferrer" style={{ display: "block", color: "var(--ink)" }}>LinkedIn ↗</a>
            <a href={t.social?.github} target="_blank" rel="noreferrer" style={{ display: "block", color: "var(--ink)" }}>GitHub ↗</a>
          </div>
          <Epigraph q={QUOTES.footer} />
          {C.colophon && <div className="colophon">🐾 {C.colophon}</div>}
        </div>
      </footer>

      {modal && (
        <div className="rd-modal" onClick={() => setModal(null)}>
          <div className="box" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setModal(null)}>✕</button>
            <span className="cat">{modal.tag}</span>
            <h3>{modal.title}</h3>
            <p>{modal.description}</p>
            {(() => {
              const B = PROJECT_BRIEFS[lang] || PROJECT_BRIEFS.english, EB = PROJECT_BRIEFS.english;
              const b = B[modal.id] || EB[modal.id], L = B.labels || EB.labels;
              return b ? (
                <>
                  <dl className="brief">
                    {[["question", L.question], ["did", L.did], ["result", L.result], ["next", L.next]].map(([k, lab]) => b[k] ? <div key={k}><dt>{lab}</dt><dd>{b[k]}</dd></div> : null)}
                  </dl>
                  {b.credit && <div className="credit">{b.credit}</div>}
                </>
              ) : null;
            })()}
            <div className="stack">{(modal.stack || []).join(" · ")}</div>
            <div className="acts">
              {modal.link && <a className="primary" href={modal.link} target="_blank" rel="noreferrer">{C.modal.open}</a>}
              {modal.repo && <a href={modal.repo} target="_blank" rel="noreferrer">{C.modal.code}</a>}
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
  const COLS = 96, ROWS = 28, W = 940, H = 300;
  const dots = [], rows = [];
  for (let j = 0; j < ROWS; j++) {
    const fz = j / (ROWS - 1), persp = 0.38 + fz * 0.62, row = [];
    for (let i = 0; i < COLS; i++) {
      const fx = i / (COLS - 1);
      const wave = Math.sin(fx * 8 + fz * 3.4) + 0.5 * Math.sin(fx * 16 - fz * 6) + 0.35 * Math.cos(fx * 3 + fz * 9);
      const x = W / 2 + (fx - 0.5) * (W * 0.96) * persp;
      const y = H * 0.24 + fz * (H * 0.6) - wave * 24 * persp;
      const h = Math.max(0, Math.min(1, (wave + 1.9) / 3.8));
      dots.push([x, y, h, persp]); row.push([x, y]);
    }
    rows.push(row);
  }
  const ann = [["PATTERN RECOGNITION", 600, 40, 560, 120], ["ANOMALY DETECTION", 90, 250, 190, 210], ["INSIGHT EXTRACTION", 790, 250, 720, 200]];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {/* ridge lines give the dotted surface a mesh feel; every second row, fading with depth */}
      {rows.map((r, j) => j % 2 === 0 ? <polyline key={"r" + j} points={r.map(([x, y]) => x.toFixed(1) + "," + y.toFixed(1)).join(" ")} fill="none" stroke="#55534e" strokeWidth="0.5" opacity={(0.05 + (j / ROWS) * 0.12).toFixed(2)} /> : null)}
      <g fontFamily="Space Mono, monospace" fontSize="8.5" fill="#a29e96" letterSpacing="0.3">
        <line x1={W * 0.02} y1={H - 14} x2={W * 0.98} y2={H - 14} stroke="#ded9d0" strokeWidth="0.6" />
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((t, i) => <text key={i} x={(W * 0.02 + t * W * 0.96).toFixed(0)} y={H - 4} textAnchor="middle">{["t−4", "t−3", "t−2", "t−1", "t"][i]}</text>)}
      </g>
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
  const onOrbit = (oi, t) => { const [rx, ry, rot] = orbits[oi], a = t * Math.PI * 2, px = Math.cos(a) * rx, py = Math.sin(a) * ry, rr = (rot * Math.PI) / 180; return [cx + px * Math.cos(rr) - py * Math.sin(rr), cy + px * Math.sin(rr) + py * Math.cos(rr)]; };
  const scatter = [];
  orbits.forEach((_, oi) => { for (let k = 0; k < 9; k++) { const [x, y] = onOrbit(oi, rng(oi * 9 + k)); scatter.push([x, y, rng(oi + k * 3) > 0.6]); } });
  // labelled satellites: the concrete skills that orbit the strategy core
  const sats = [["LLM", 0, 0.12], ["SQL", 1, 0.55], ["KPI", 2, 0.3], ["MMM", 3, 0.8], ["A/B", 0, 0.68], ["SPC", 1, 0.9], ["PO", 2, 0.62], ["CI/CD", 3, 0.28]].map(([l, oi, t]) => [l, ...onOrbit(oi, t)]);
  const chords = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3]];
  const ticks = Array.from({ length: 36 }, (_, i) => { const [x, y] = onOrbit(2, i / 36); return [x, y, cx + (x - cx) * 1.025, cy + (y - cy) * 1.025]; });
  return (
    <svg viewBox={`0 0 ${W} ${H}`}>
      <defs><radialGradient id="cg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF3B7D" stopOpacity="0.6" /><stop offset="100%" stopColor="#FF3B7D" stopOpacity="0" /></radialGradient></defs>
      {orbits.map(([rx, ry, rot], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#34343b" strokeWidth="0.9" transform={`rotate(${rot} ${cx} ${cy})`} />)}
      {ticks.map(([x1, y1, x2, y2], i) => <line key={"k" + i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="#4a4a52" strokeWidth="0.8" />)}
      {chords.map(([a, b], i) => <path key={"c" + i} data-draw d={`M ${anchors[a][1]} ${anchors[a][2]} Q ${cx} ${cy} ${anchors[b][1]} ${anchors[b][2]}`} fill="none" stroke="#FF3B7D" strokeWidth="0.7" opacity="0.22" />)}
      {anchors.map(([l, x, y]) => <path key={"a" + l} data-draw d={`M ${cx} ${cy} Q ${(cx + x) / 2 + (y - cy) * 0.12} ${(cy + y) / 2 - (x - cx) * 0.12} ${x} ${y}`} fill="none" stroke="#FF3B7D" strokeWidth="0.9" opacity="0.5" />)}
      {scatter.map(([x, y, big], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={big ? 2.6 : 1.5} fill={big ? "#FF3B7D" : "#7a7a82"} opacity={big ? 0.9 : 0.55} />)}
      {sats.map(([l, x, y]) => <g key={"s" + l} data-pop><circle cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.4" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.2" /><text x={(x + 6).toFixed(1)} y={(y - 5).toFixed(1)} fontFamily="Space Mono, monospace" fontSize="8.5" fill="#b9b6ae" letterSpacing="0.8">{l}</text></g>)}
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

/* ---------- per-project visuals: bespoke, deterministic, editorial (fine strokes, controlled pink) ---------- */
const P = "#FF3B7D", PD = "#D91662", INK = "#111", G2 = "#8a8781", G3 = "#e5e2db";
const srand = (s) => { const x = Math.sin(s * 9301 + 49297) * 233280; return x - Math.floor(x); };
const pts = (arr) => arr.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const noiseLine = (seed, n, x0, x1, y, amp) => Array.from({ length: n }, (_, i) => {
  const t = i / (n - 1), v = Math.sin(t * 9 + seed) * 0.5 + Math.sin(t * 23 + seed * 3) * 0.3 + (srand(seed * 100 + i) - 0.5) * 0.9;
  return [x0 + t * (x1 - x0), y + v * amp];
});

// CV Hunter — candidates in embedding space, a role, its top-5 matches with cosine scores
function VizCvHunter() {
  const clusters = [[62, 78], [150, 60], [110, 150]], dots = [];
  clusters.forEach(([cx, cy], c) => { for (let i = 0; i < 26; i++) { const a = srand(c * 50 + i) * 6.283, r = 6 + srand(c * 70 + i) * 34; dots.push([cx + Math.cos(a) * r * 1.15, cy + Math.sin(a) * r * 0.8]); } });
  const role = [176, 132];
  const top = dots.map((d) => [d, Math.hypot(d[0] - role[0], d[1] - role[1])]).sort((a, b) => a[1] - b[1]).slice(0, 5);
  return (
    <svg viewBox="0 0 240 220">
      {dots.map(([x, y], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="1.7" fill={INK} opacity="0.32" />)}
      {top.map(([d], k) => <line key={k} x1={role[0]} y1={role[1]} x2={d[0]} y2={d[1]} stroke={P} strokeWidth={k === 0 ? 1.3 : 0.8} opacity={0.9 - k * 0.15} />)}
      {top.map(([d], k) => <g key={"t" + k}><circle cx={d[0]} cy={d[1]} r={k === 0 ? 3.2 : 2.4} fill={P} /><text className="annp" x={d[0] + 5} y={d[1] - 4}>{(0.93 - k * 0.025).toFixed(2)}</text></g>)}
      <rect x={role[0] - 5} y={role[1] - 5} width="10" height="10" fill={INK} transform={`rotate(45 ${role[0]} ${role[1]})`} />
      <text className="ann" x={role[0] + 9} y={role[1] + 3}>role</text>
      <text className="ann" x="8" y="14">candidates · pgvector</text>
      <text className="ann" x="8" y="210">embedding space · cosine similarity</text>
    </svg>
  );
}

// Sensorlab — six sensor traces, a detected fault window, and the RUL bar that drives the CHF decision
function VizSensorlab() {
  const rows = 6, x0 = 8, x1 = 232, win = [148, 186];
  return (
    <svg viewBox="0 0 240 220">
      <rect x={win[0]} y="6" width={win[1] - win[0]} height="150" fill={P} opacity="0.10" />
      {Array.from({ length: rows }).map((_, r) => {
        const y = 22 + r * 24, line = noiseLine(r + 1, 60, x0, x1, y, 6);
        const spiked = line.map(([x, v]) => (x > win[0] && x < win[1]) ? [x, v + (r % 2 ? -1 : 1) * (7 + srand(r * 9 + x) * 6)] : [x, v]);
        return (<g key={r}>
          <line x1={x0} y1={y} x2={x1} y2={y} stroke={G3} strokeWidth="0.6" />
          <polyline points={pts(spiked)} fill="none" stroke={INK} strokeWidth="0.9" opacity="0.7" />
          <polyline points={pts(spiked.filter(([x]) => x > win[0] && x < win[1]))} fill="none" stroke={P} strokeWidth="1.2" />
          <text className="ann" x={x0} y={y - 9}>s{r + 1}</text>
        </g>);
      })}
      <line x1={win[0]} y1="6" x2={win[0]} y2="156" stroke={PD} strokeWidth="0.8" strokeDasharray="2 2" />
      <text className="annp" x={win[0] - 2} y="166" textAnchor="end">fault detected</text>
      <text className="ann" x="8" y="188">remaining useful life</text>
      <rect x="8" y="193" width="224" height="6" fill={G3} />
      <rect x="8" y="193" width="96" height="6" fill={P} />
      <text className="annp" x="108" y="199">43 cycles · schedule</text>
      <text className="ann" x="8" y="214">intervene · schedule · wait — priced in CHF</text>
    </svg>
  );
}

// Züri-Kreislauf — Hotelling T² control chart with the real 8-month outage window, throughput bars below
function VizZuri() {
  const n = 78, x0 = 10, x1 = 232, ucl = 74, out = [20, 28];
  const series = Array.from({ length: n }, (_, i) => { const base = 8 + srand(i * 3) * 9; const spike = i >= out[0] && i < out[1] ? 26 + srand(i) * 12 : (i === 41 || i === 63 ? 20 + srand(i) * 8 : 0); return 130 - (base + spike) * 2.0; });
  const X = (i) => x0 + (i / (n - 1)) * (x1 - x0);
  const bars = Array.from({ length: n }, (_, i) => 12 + Math.abs(Math.sin(i * 0.55)) * 10 + srand(i * 7) * 6);
  return (
    <svg viewBox="0 0 240 220">
      <rect x={X(out[0])} y="18" width={X(out[1]) - X(out[0])} height="122" fill={P} opacity="0.12" />
      <line x1={x0} y1={ucl} x2={x1} y2={ucl} stroke={PD} strokeWidth="0.8" strokeDasharray="3 2" />
      <text className="ann" x={x1} y={ucl - 4} textAnchor="end">T² control limit</text>
      <polyline points={pts(series.map((y, i) => [X(i), y]))} fill="none" stroke={INK} strokeWidth="0.9" opacity="0.8" />
      {series.map((y, i) => y < ucl ? <circle key={i} cx={X(i).toFixed(1)} cy={y.toFixed(1)} r="2" fill={P} /> : null)}
      <text className="annp" x={X(out[1]) + 4} y="30">8-month outage</text>
      <text className="annp" x={X(out[1]) + 4} y="41">≈ CHF 18.8M</text>
      <text className="ann" x={x0} y="152">monthly throughput · t</text>
      {bars.map((h, i) => <rect key={i} x={(X(i) - 1.1).toFixed(1)} y={(198 - h).toFixed(1)} width="2.2" height={h.toFixed(1)} fill={i >= out[0] && i < out[1] ? P : INK} opacity={i >= out[0] && i < out[1] ? 0.9 : 0.35} />)}
      <text className="ann" x={x0} y="214">2020</text><text className="ann" x={x1} y="214" textAnchor="end">2026</text>
    </svg>
  );
}

// Supply Chain Lab — observed demand, a P10–P90 forecast fan, and stock-health allocation by store
function VizRetail() {
  const x0 = 10, split = 138, x1 = 232, n = 40, m = 14;
  const hist = Array.from({ length: n }, (_, i) => [x0 + (i / (n - 1)) * (split - x0), 96 - Math.sin(i * 0.6) * 14 - i * 0.35 + (srand(i * 5) - 0.5) * 10]);
  const last = hist[n - 1];
  const fc = Array.from({ length: m }, (_, i) => { const t = i / (m - 1); return [split + t * (x1 - split), last[1] - t * 12 - Math.sin(i * 0.7) * 6]; });
  const band = (k) => [...fc.map(([x, y], i) => [x, y - (i / (m - 1)) * k]), ...fc.map(([x, y], i) => [x, y + (i / (m - 1)) * k]).reverse()];
  const stores = [["ZRH", 0.82], ["BSL", 0.61], ["GVA", 0.44], ["BRN", 0.3]];
  return (
    <svg viewBox="0 0 240 220">
      {[40, 70, 100, 130].map((y) => <line key={y} x1={x0} y1={y} x2={x1} y2={y} stroke={G3} strokeWidth="0.6" />)}
      <polygon points={pts(band(30))} fill={P} opacity="0.12" />
      <polygon points={pts(band(15))} fill={P} opacity="0.2" />
      <polyline points={pts(hist)} fill="none" stroke={INK} strokeWidth="1.1" />
      <polyline points={pts(fc)} fill="none" stroke={P} strokeWidth="1.4" />
      <line x1={split} y1="24" x2={split} y2="140" stroke={G2} strokeWidth="0.7" strokeDasharray="2 2" />
      <text className="ann" x={split - 3} y="22" textAnchor="end">observed</text>
      <text className="ann" x={split + 3} y="22">forecast</text>
      <text className="annp" x={x1} y={(fc[m - 1][1] - 6).toFixed(1)} textAnchor="end">P10–P90</text>
      <text className="ann" x={x0} y="160">allocation · stock health by store</text>
      {stores.map(([s, v], i) => <g key={s}><text className="ann" x={x0} y={172 + i * 12}>{s}</text><rect x="38" y={165 + i * 12} width="190" height="6" fill={G3} /><rect x="38" y={165 + i * 12} width={(190 * v).toFixed(1)} height="6" fill={i === 2 ? P : INK} opacity={i === 2 ? 1 : 0.75} /></g>)}
    </svg>
  );
}

// Swiss Governance — small multiples: one sparkline per indicator, last observation in pink
function VizSwissGov() {
  const cols = 4, rows = 3, cw = 54, ch = 52, gx = 8, gy = 12, names = ["CO₂", "PV", "water", "edu", "rail", "housing", "waste", "air", "forest", "energy", "health", "jobs"];
  return (
    <svg viewBox="0 0 240 220">
      {Array.from({ length: cols * rows }).map((_, k) => {
        const c = k % cols, r = Math.floor(k / cols), ox = 8 + c * (cw + gx), oy = 10 + r * (ch + gy);
        const line = Array.from({ length: 16 }, (_, i) => [ox + (i / 15) * cw, oy + 34 - (Math.sin(i * 0.5 + k) * 6 + i * (srand(k) - 0.4) * 1.4 + srand(k * 31 + i) * 4)]);
        const hot = k === 5;
        return (<g key={k}>
          <line x1={ox} y1={oy + 40} x2={ox + cw} y2={oy + 40} stroke={G3} strokeWidth="0.6" />
          <polyline points={pts(line)} fill="none" stroke={hot ? P : INK} strokeWidth={hot ? 1.3 : 0.9} opacity={hot ? 1 : 0.7} />
          <circle cx={line[15][0].toFixed(1)} cy={line[15][1].toFixed(1)} r="2" fill={P} />
          <text className="ann" x={ox} y={oy + 49}>{names[k]}</text>
        </g>);
      })}
      <text className="ann" x="8" y="210">35 indicators · 26 cantons · forecast to 2040</text>
    </svg>
  );
}

// LabM — incremental ROI per channel (Bayesian MMM) and the saturation curve behind the reallocation
function VizLabm() {
  const chans = ["TV", "search", "social", "OOH", "print", "radio", "display", "email"], x0 = 12, bw = 18, gap = 9, base = 150;
  return (
    <svg viewBox="0 0 240 220">
      <text className="ann" x={x0} y="14">incremental ROI per channel · 90% credible</text>
      {chans.map((c, i) => { const h = 30 + srand(i * 13) * 90, u = 10 + srand(i * 7) * 22, x = x0 + i * (bw + gap); return (<g key={c}>
        <rect x={x} y={(base - h).toFixed(1)} width={bw} height={h.toFixed(1)} fill={INK} opacity="0.8" />
        <rect x={x} y={(base - h - u).toFixed(1)} width={bw} height={u.toFixed(1)} fill={P} />
        <text className="ann" x={x + bw / 2} y={base + 11} textAnchor="middle">{c}</text>
      </g>); })}
      <text className="ann" x={x0} y="190">response curve · saturation</text>
      <path d={`M ${x0} 208 C 60 205, 90 185, 130 180 S 200 174, 230 173`} fill="none" stroke={P} strokeWidth="1.3" />
      <text className="annp" x="232" y="168" textAnchor="end">+€31.5M reallocation</text>
    </svg>
  );
}

// Pharma RWD — forest plot: five estimators, 95% CI, null line
function VizFarma() {
  const rows = [["naïve", 0.31, 0.16], ["PSM", 0.18, 0.12], ["AIPW", 0.14, 0.09], ["DR-learner", 0.13, 0.10], ["E-value", 0.12, 0.08]], cx = 130, sc = 200;
  return (
    <svg viewBox="0 0 240 220">
      <line x1={cx} y1="18" x2={cx} y2="176" stroke={G2} strokeWidth="0.8" strokeDasharray="2 2" />
      <text className="ann" x={cx} y="12" textAnchor="middle">null</text>
      {rows.map(([n, est, w], i) => { const y = 36 + i * 30, hot = i === 2; return (<g key={n}>
        <text className="ann" x="8" y={y + 3}>{n}</text>
        <line x1={(cx + (est - w) * sc).toFixed(1)} y1={y} x2={(cx + (est + w) * sc).toFixed(1)} y2={y} stroke={hot ? P : INK} strokeWidth={hot ? 1.6 : 1} />
        <rect x={(cx + est * sc - 3.5).toFixed(1)} y={y - 3.5} width="7" height="7" fill={hot ? P : INK} />
      </g>); })}
      <text className="ann" x="8" y="196">effect estimate · 95% CI · n = 5,735</text>
      <text className="annp" x="8" y="210">|SMD| 33 → 1 of 53 covariates</text>
    </svg>
  );
}

// Rovelló — an image patch grid and the top-5 species probabilities
function VizRovello() {
  const top = [["Lactarius deliciosus", 0.73], ["L. sanguifluus", 0.11], ["L. semisanguifluus", 0.06], ["L. quieticolor", 0.04], ["other", 0.06]];
  return (
    <svg viewBox="0 0 240 220">
      {Array.from({ length: 36 }).map((_, i) => { const c = i % 6, r = Math.floor(i / 6), v = srand(i * 17); return <rect key={i} x={8 + c * 13} y={8 + r * 13} width="12" height="12" fill={v > 0.62 ? P : INK} opacity={(v > 0.62 ? 0.5 + v * 0.5 : 0.15 + v * 0.45).toFixed(2)} />; })}
      <text className="ann" x="8" y="98">224×224 · ConvNeXt-Tiny</text>
      {top.map(([n, p], i) => { const y = 116 + i * 20; return (<g key={n}>
        <text className="ann" x="8" y={y - 3}>{n}</text>
        <rect x="8" y={y} width="224" height="5" fill={G3} />
        <rect x="8" y={y} width={(224 * p).toFixed(1)} height="5" fill={i === 0 ? P : INK} opacity={i === 0 ? 1 : 0.6} />
        <text className="annp" x="232" y={y - 3} textAnchor="end">{(p * 100).toFixed(0)}%</text>
      </g>); })}
      <text className="ann" x="8" y="216">1,035 species · top-1 73.4%</text>
    </svg>
  );
}

// generic fallback by kind (projects without a bespoke visual)
function VizGeneric({ kind }) {
  const k = kind % 4;
  if (k === 0) return (<svg viewBox="0 0 240 220"><g stroke={G3} strokeWidth="0.8">{[40, 80, 120, 160, 200].map((x) => <line key={x} x1={x} y1="14" x2={x} y2="200" />)}{[60, 110, 160].map((y) => <line key={y} x1="10" y1={y} x2="230" y2={y} />)}</g>
    <polyline fill="none" stroke={P} strokeWidth="1.4" points="10,170 34,150 58,158 82,110 106,124 130,86 154,102 178,60 202,76 226,50" />
    {[[34, 150], [82, 110], [130, 86], [178, 60], [226, 50]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill={P} />)}</svg>);
  if (k === 1) return (<svg viewBox="0 0 240 220">{Array.from({ length: 14 }).map((_, i) => { const v = 20 + Math.abs(Math.sin(i * 1.3)) * 150; return <rect key={i} x={12 + i * 16} y={200 - v} width="9" height={v} fill={i % 2 ? P : INK} opacity={i % 2 ? 0.9 : 0.85} />; })}</svg>);
  if (k === 2) return (<svg viewBox="0 0 240 220">{Array.from({ length: 90 }).map((_, i) => { const cl = i % 3; return <circle key={i} cx={50 + cl * 70 + Math.sin(i * 2.1) * 26} cy={110 + Math.cos(i * 1.7) * 70} r={cl === 1 ? 2.4 : 1.6} fill={cl === 1 ? P : INK} opacity="0.65" />; })}</svg>);
  return (<svg viewBox="0 0 240 220">{Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * 6.283, x = 120 + Math.cos(a) * (55 + (i % 3) * 14), y = 110 + Math.sin(a) * (56 + (i % 2) * 12); return <g key={i}><line x1="120" y1="110" x2={x} y2={y} stroke="#ddd" strokeWidth="0.7" /><circle cx={x} cy={y} r={i % 3 ? 2 : 3} fill={P} opacity="0.85" /></g>; })}<circle cx="120" cy="110" r="4.5" fill={INK} /></svg>);
}


// Puppy Tracker — growth curve inside the healthy breed band, and training mastery bars
function VizPuppy() {
  const x0 = 12, x1 = 228, n = 26;
  const band = Array.from({ length: n }, (_, i) => { const t = i / (n - 1), x = x0 + t * (x1 - x0), w = 22 + 90 * (1 - Math.exp(-t * 2.6)); return [x, 120 - w * 0.8, 120 - w * 1.05]; });
  const line = band.map(([x, lo, hi], i) => [x, lo + (hi - lo) * (0.35 + 0.3 * Math.sin(i * 0.9)) + (srand(i * 3) - 0.5) * 3]);
  const skills = [["sit", 0.9], ["recall", 0.55], ["settle", 0.4], ["leash", 0.7]];
  return (
    <svg viewBox="0 0 240 220">
      <polygon points={pts([...band.map(([x, lo]) => [x, lo]), ...band.map(([x, , hi]) => [x, hi]).reverse()])} fill={P} opacity="0.12" />
      <polyline points={pts(line)} fill="none" stroke={INK} strokeWidth="1.3" />
      <circle cx={line[n - 1][0].toFixed(1)} cy={line[n - 1][1].toFixed(1)} r="3" fill={P} />
      <text className="ann" x={x0} y="14">weight · healthy breed range</text>
      <text className="ann" x={x1} y="132" textAnchor="end">weeks 8 → 34</text>
      <text className="ann" x={x0} y="152">training · mastery</text>
      {skills.map(([s, v], i) => <g key={s}><text className="ann" x={x0} y={166 + i * 14}>{s}</text><rect x="52" y={159 + i * 14} width="176" height="6" fill={G3} /><rect x="52" y={159 + i * 14} width={(176 * v).toFixed(1)} height="6" fill={i === 1 ? P : INK} opacity={i === 1 ? 1 : 0.75} /></g>)}
    </svg>
  );
}

const VIZ_BY_ID = { puppyTracker: VizPuppy, cvHunter: VizCvHunter, sensorlab: VizSensorlab, zuriKreislauf: VizZuri, retail: VizRetail, swissGov: VizSwissGov, labm: VizLabm, farma: VizFarma, rovello: VizRovello };
function CaseViz({ id, kind }) { const V = VIZ_BY_ID[id]; return V ? <V /> : <VizGeneric kind={kind} />; }

// career graph on a real time axis: the life line runs through the middle; studies branch above and
// rejoin when they end, work branches below (simultaneous things run in parallel), stays abroad are
// small pink loops, the move to Zürich is a milestone. Nothing here is a straight line on purpose.
function CareerMap({ exp, edu, legend = { work: "WORK", studies: "STUDIES" }, events = [] }) {
  const MONTHS = { jan: 1, gen: 1, ene: 1, feb: 2, fev: 2, mar: 3, abr: 4, apr: 4, avr: 4, mai: 5, may: 5, mag: 5, jun: 6, giu: 6, jul: 7, lug: 7, aug: 8, ago: 8, aou: 8, sep: 9, set: 9, oct: 10, okt: 10, ott: 10, nov: 11, dec: 12, des: 12, dic: 12, dez: 12 };
  const monthOf = (p = "") => { const w = p.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); if (w.startsWith("juin")) return 6; if (w.startsWith("juil")) return 7; return MONTHS[w.slice(0, 3)] || 0; };
  const NOW = 2026.75, yr = (s) => +((s.match(/\d{4}/) || [0])[0]);
  const tOf = (s) => { const y = yr(s); return y ? y + (Math.max(1, monthOf(s)) - 1) / 12 : 0; };
  const work = exp.map((e) => { const [a, b] = e.period.split(/\s*[–—]\s*/); const t0 = tOf(a || ""); const t1 = b && yr(b) ? tOf(b) + 1 / 12 : NOW; return { t0, t1, y0: yr(a || ""), y1: b && yr(b) ? yr(b) : null, type: "work", label: e.company.split(" ")[0], sub: e.location }; });
  const study = (edu || []).map((e) => { const m = e.match(/(\d{4})\s*[–—-]\s*(\d{4})/); if (!m) return null;
    return { t0: +m[1] + 0.7, t1: +m[2] + 0.5, y0: +m[1], y1: +m[2], type: "study", label: e.split("—")[0].trim().replace(/\s+in\s+/i, " "), sub: (e.match(/\(([^)]+)\)/) || [, ""])[1] }; }).filter(Boolean);
  const extra = events.map((ev) => ({ ...ev, t1: ev.t1 || ev.t0, y0: Math.floor(ev.t0), y1: ev.t1 ? Math.floor(ev.t1 - 0.02) : null }));
  const span = (it) => (it.y1 === null || it.y1 === undefined) ? `${it.y0} →` : it.y1 === it.y0 ? `${it.y0}` : `${it.y0}–${it.y1}`;
  // layout
  const W = 1400, H = 420, padL = 56, padR = 44, T0 = 2012.6, T1 = 2027.1, PPY = (W - padL - padR) / (T1 - T0);
  const X = (t) => padL + ((t - T0) / (T1 - T0)) * (W - padL - padR);
  // the life line itself meanders and climbs — it is not a straight line by design
  const yb = (t) => 214 + Math.sin((t - 2013) * 0.9) * 22 + Math.sin((t - 2013) * 2.1) * 8 - (t - 2013) * 2.4;
  // lanes by real time overlap; inside a lane, labels that would collide drop to a second row
  const lanes = (items, offsets) => { const ends = [], rows = []; return items.sort((p, q) => p.t0 - q.t0).map((it) => {
    let k = ends.findIndex((e) => e <= it.t0 + 0.1); if (k < 0) k = ends.length; ends[k] = it.occ || it.t1; k = Math.min(k, offsets.length - 1);
    const lw = (14 + Math.max((it.label || "").length * 6.8, ((it.sub || "") + "2020–2021 · ").length * 5.3)) / PPY;
    rows[k] = rows[k] || []; let r = rows[k].findIndex((e) => e <= it.t0); if (r < 0) r = rows[k].length; rows[k][r] = it.t0 + lw;
    return { ...it, dy: offsets[k], row: Math.min(r, 2) }; }); };
  const above = lanes([...study, ...extra.filter((e) => e.type === "study")], [-56, -98, -140]);
  const isStint = (e) => e.type === "work" && (e.t1 - e.t0) < 0.5;
  // stints block their lane for as long as their label runs, so the long roles move to the next lane
  const belowAll = lanes([...work, ...extra.filter((e) => e.type === "work")].map((e) => isStint(e) ? { ...e, occ: e.t1 + (14 + Math.max(e.label.length * 6.6, (e.sub || "").length * 5.3)) / PPY } : e), [62, 118]);
  const below = belowAll.filter((e) => !isStint(e));
  const stints = belowAll.filter(isStint).map((e, i) => ({ ...e, dy: 30, row: i % 2 }));
  const trips = extra.filter((e) => e.type === "trip").map((e) => ({ ...e, dy: 38 }));
  const life = extra.filter((e) => e.type === "life");
  const pubs = extra.filter((e) => e.type === "pub");
  const branch = (it) => { const x0 = X(it.t0), x1 = Math.max(X(it.t1), x0 + 26), e = Math.min(24, (x1 - x0) / 2.3), y0 = yb(it.t0), yB = (t) => yb(t) + it.dy;
    let d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${(x0 + e * 0.55).toFixed(1)} ${y0.toFixed(1)}, ${(x0 + e * 0.45).toFixed(1)} ${yB(it.t0).toFixed(1)}, ${(x0 + e).toFixed(1)} ${yB(it.t0).toFixed(1)}`;
    for (let x = x0 + e + 18; x < x1 - e; x += 18) { const t = T0 + ((x - padL) / (W - padL - padR)) * (T1 - T0); d += ` L ${x.toFixed(1)} ${yB(t).toFixed(1)}`; }
    const y1 = yb(it.t1); d += ` L ${(x1 - e).toFixed(1)} ${yB(it.t1).toFixed(1)} C ${(x1 - e * 0.45).toFixed(1)} ${yB(it.t1).toFixed(1)}, ${(x1 - e * 0.55).toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    return { d, xs: x0 + e, xe: x1 - e, xm: (x0 + x1) / 2, yl: yB((it.t0 + it.t1) / 2) }; };
  const base = (() => { let d = ""; for (let t = T0 + 0.3; t <= T1 - 0.3; t += 0.12) d += (d ? " L " : "M ") + X(t).toFixed(1) + " " + yb(t).toFixed(1); return d; })();
  const grid = []; for (let y = 22; y < H - 40; y += 14) for (let x = 16; x < W - 16; x += 14) { const f = Math.sin(x / 140 + y / 60) * Math.cos(y / 45 - x / 220) + 0.35 * Math.sin(x / 37); if (f > 0.05) grid.push([x, y, 0.12 + Math.min(1, f) * 0.3]); }
  const years = []; for (let y = 2013; y <= 2026; y++) years.push(y);
  const mono = { fontFamily: "Space Mono, monospace" };
  return (
    <svg viewBox={`0 0 ${W} ${H}`}>
      {grid.map(([x, y, o], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#6a6a72" opacity={o.toFixed(2)} />)}
      {/* year axis */}
      <line x1={padL} y1={H - 26} x2={W - padR} y2={H - 26} stroke="#2c2c31" strokeWidth="0.8" />
      {years.map((y) => <g key={y}><line x1={X(y)} y1={H - 30} x2={X(y)} y2={H - 22} stroke="#4a4a52" strokeWidth="0.8" /><text x={X(y)} y={H - 10} textAnchor="middle" {...mono} fontSize="8.5" fill="#8a8781">{y}</text></g>)}
      {/* life line */}
      <path data-draw d={base} fill="none" stroke="#FF3B7D" strokeWidth="2" opacity="0.9" />
      {/* studies above */}
      {above.map((it, i) => { const b = branch(it); return (<g key={"s" + i}>
        <path data-draw d={b.d} fill="none" stroke="#FF3B7D" strokeWidth="1.3" opacity="0.75" strokeDasharray="4 3" />
        <g data-pop><circle cx={b.xs.toFixed(1)} cy={(yb(it.t0) + it.dy).toFixed(1)} r="4.5" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.4" />
          <text x={(b.xs + 9).toFixed(1)} y={(yb(it.t0) + it.dy - 7 - it.row * 24).toFixed(1)} {...mono} fontSize="9.5" fill="#e6e3dc">{it.label}</text>
          <text x={(b.xs + 9).toFixed(1)} y={(yb(it.t0) + it.dy + 12 - it.row * 24).toFixed(1)} {...mono} fontSize="8.5" fill="#8a8781">{span(it)} · {it.sub}</text></g></g>); })}
      {/* work below */}
      {below.map((it, i) => { const b = branch(it); return (<g key={"w" + i}>
        <path data-draw d={b.d} fill="none" stroke="#FF3B7D" strokeWidth="2" />
        <g data-pop><circle cx={b.xs.toFixed(1)} cy={(yb(it.t0) + it.dy).toFixed(1)} r="5.5" fill="#FF3B7D" />
          <text x={(b.xs + 10).toFixed(1)} y={(yb(it.t0) + it.dy + 4 + it.row * 24).toFixed(1)} fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="600" fill="#f2f0eb">{it.label}</text>
          <text x={(b.xs + 10).toFixed(1)} y={(yb(it.t0) + it.dy + 18 + it.row * 24).toFixed(1)} {...mono} fontSize="8.5" fill="#8a8781">{it.t1 >= NOW - 0.01 ? `${it.y0} →` : span(it)} · {it.sub}</text></g></g>); })}
      {/* stays abroad: small loops under the line */}
      {trips.map((it, i) => { const b = branch(it); return (<g key={"t" + i}>
        <path data-draw d={b.d} fill="none" stroke="#FF3B7D" strokeWidth="1.2" opacity="0.8" />
        <g data-pop><circle cx={b.xm.toFixed(1)} cy={b.yl.toFixed(1)} r="2.6" fill="#FF3B7D" />
          <text x={b.xm.toFixed(1)} y={(b.yl + 14 + (i % 2) * 15).toFixed(1)} textAnchor="middle" {...mono} fontSize="8.5" fill="#f0a3bd">{it.label}</text></g></g>); })}
      {/* short roles: shallow loops with compact labels */}
      {stints.map((it, i) => { const b = branch(it); const y = b.yl + 13 + it.row * 26; return (<g key={"k" + i}>
        <path data-draw d={b.d} fill="none" stroke="#FF3B7D" strokeWidth="1.4" />
        <g data-pop><circle cx={b.xs.toFixed(1)} cy={(yb(it.t0) + it.dy).toFixed(1)} r="3.5" fill="#FF3B7D" />
          <text x={b.xs.toFixed(1)} y={y.toFixed(1)} {...mono} fontSize="9" fill="#e6e3dc">{it.label}</text>
          <text x={b.xs.toFixed(1)} y={(y + 11).toFixed(1)} {...mono} fontSize="8" fill="#8a8781">{span(it)} · {it.sub}</text></g></g>); })}
      {/* milestone: the move */}
      {life.map((it, i) => (<g key={"l" + i} data-pop>
        <circle cx={X(it.t0).toFixed(1)} cy={yb(it.t0).toFixed(1)} r="9" fill="none" stroke="#FF3B7D" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx={X(it.t0).toFixed(1)} cy={yb(it.t0).toFixed(1)} r="3.5" fill="#FF3B7D" />
        <line x1={X(it.t0).toFixed(1)} y1={(yb(it.t0) - 10).toFixed(1)} x2={X(it.t0).toFixed(1)} y2={(yb(it.t0) - 108).toFixed(1)} stroke="#FF3B7D" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.7" />
        <text x={(X(it.t0) + 6).toFixed(1)} y={(yb(it.t0) - 112).toFixed(1)} {...mono} fontSize="9" fill="#FF3B7D" letterSpacing="0.8">{it.label} · {it.y0}</text></g>))}
      {/* publications: a diamond on the life line, label to the left */}
      {pubs.map((it, i) => (<a key={"p" + i} href={it.url} target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}><g data-pop>
        <rect x={(X(it.t0) - 5).toFixed(1)} y={(yb(it.t0) - 5).toFixed(1)} width="10" height="10" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.4" transform={`rotate(45 ${X(it.t0).toFixed(1)} ${yb(it.t0).toFixed(1)})`} />
        <line x1={X(it.t0).toFixed(1)} y1={(yb(it.t0) + 8).toFixed(1)} x2={(X(it.t0) - 10).toFixed(1)} y2={(yb(it.t0) + 22).toFixed(1)} stroke="#FF3B7D" strokeWidth="0.7" opacity="0.7" />
        <text x={(X(it.t0) - 14).toFixed(1)} y={(yb(it.t0) + 26).toFixed(1)} textAnchor="end" {...mono} fontSize="8.5" fill="#c9c6c0" textDecoration="underline">{it.label} · {it.y0} ↗</text></g></a>))}
      {/* the dog: a paw above the life line */}
      {extra.filter((e) => e.type === "pet").map((it, i) => { const x = X(it.t0), y = yb(it.t0) - 22; return (<g key={"d" + i} data-pop>
        <line x1={x.toFixed(1)} y1={(yb(it.t0) - 6).toFixed(1)} x2={x.toFixed(1)} y2={(y + 8).toFixed(1)} stroke="#FF3B7D" strokeWidth="0.7" opacity="0.7" />
        <ellipse cx={x.toFixed(1)} cy={(y + 2).toFixed(1)} rx="3.6" ry="3" fill="#FF3B7D" />
        {[[-4.2, -3.6], [-1.4, -5.6], [1.4, -5.6], [4.2, -3.6]].map(([dx, dy], k) => <circle key={k} cx={(x + dx).toFixed(1)} cy={(y + dy).toFixed(1)} r="1.5" fill="#FF3B7D" />)}
        <text x={(x - 9).toFixed(1)} y={(y + 1).toFixed(1)} textAnchor="end" {...mono} fontSize="9" fill="#f0a3bd">{it.label} · {it.y0}</text></g>); })}
      {/* now */}
      <g><circle cx={X(NOW).toFixed(1)} cy={(yb(NOW) + 64).toFixed(1)} r="14" fill="none" stroke="#FF3B7D" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 3" /><text x={(X(NOW) - 4).toFixed(1)} y={(yb(NOW) + 92).toFixed(1)} textAnchor="end" {...mono} fontSize="9" fill="#FF3B7D" letterSpacing="1">NOW</text></g>
      <g {...mono} fontSize="9" fill="#8a8781">
        <circle cx={padL} cy="14" r="4" fill="#FF3B7D" /><text x={padL + 10} y="18">{legend.work}</text>
        <circle cx={padL + 96} cy="14" r="4" fill="#0d0d0f" stroke="#FF3B7D" strokeWidth="1.4" /><text x={padL + 106} y="18">{legend.studies}</text>
      </g>
    </svg>
  );
}
