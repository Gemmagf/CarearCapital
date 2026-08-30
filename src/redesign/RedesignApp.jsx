import React, { useState, useEffect, useRef, useMemo } from "react";
import allTranslations from "../translations/translations";
import FlowField from "./FlowField";
import "./redesign.css";

const LANGS = [
  ["english", "EN"], ["catalan", "CA"], ["spanish", "ES"],
  ["french", "FR"], ["german", "DE"], ["italian", "IT"],
];

// Ids of the projects shown as "selected work" (the strongest professional ones).
const SELECTED = ["swissGov", "labm", "farma", "cvHunter", "retail"];

// tiny reveal-on-scroll
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const yearOf = (period = "") => (period.match(/\d{4}/) || [""])[0];

export default function RedesignApp() {
  const [lang, setLang] = useState("english");
  const t = allTranslations[lang] || allTranslations.english;
  const cv = t.cv;
  const rootRef = useReveal();
  const [openExp, setOpenExp] = useState(0);

  const projects = t.personalProjects?.projects || [];
  const selected = useMemo(
    () => SELECTED.map((id) => projects.find((p) => p.id === id)).filter(Boolean),
    [projects]
  );
  const exp = cv?.experiences || [];

  const nameParts = (t.name || "Gemma Garcia de la Fuente").split(" ");

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="rd" ref={rootRef}>
      {/* top bar */}
      <header className="rd-topbar">
        <div className="brand">GG · Data / Product</div>
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
        <div className="wrap hero-inner">
          <h1 className="hero-name">
            <span>Gemma</span>
            <span>Garcia</span>
            <span>de la</span>
            <span className="em">Fuente</span>
          </h1>
          <div className="hero-labels">
            <span className="lab">Data Science</span>
            <span className="lab">Product</span>
            <span className="lab">Strategy</span>
            <span className="lab">Execution</span>
          </div>
          <div className="hero-meta">
            <span className="hero-loc">Based in Zürich · Working internationally</span>
            <button className="rd-cta" onClick={() => scrollTo("complexity")}>
              Explore my work <span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="scroll-hint">Scroll ↓</div>
      </section>

      {/* 00 INTRO */}
      <section className="rd-section" id="intro">
        <div className="wrap">
          <div className="sec-head">
            <span className="section-index">00 / INTRO</span>
          </div>
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
          <p className="sec-lead reveal">Statistics, modelling, forecasting, experimentation and clear data visualisation — the path from raw data to a decision someone can act on.</p>
          <ComplexitySurface />
          <p className="mono reveal" style={{ marginTop: 18 }}>raw data → patterns → insight → decision</p>
        </div>
      </section>

      {/* 02 CONNECT THE DOTS */}
      <section className="rd-section" id="connect">
        <hr className="rule" />
        <div className="wrap">
          <div className="sec-head" style={{ marginTop: 40 }}>
            <span className="section-index">02</span>
            <h2 className="sec-title reveal">I connect<br />the dots</h2>
          </div>
          <p className="sec-lead reveal">As a Product Owner I sit between data, business and people — translating needs into direction and turning analysis into decisions leaders act on.</p>
          <div className="rd-network reveal"><Network /></div>
        </div>
      </section>

      {/* 03 SELECTED WORK */}
      <section className="rd-section" id="work">
        <hr className="rule" />
        <div className="wrap">
          <div className="sec-head" style={{ marginTop: 40 }}>
            <span className="section-index">03</span>
            <h2 className="sec-title reveal">I make<br />things happen</h2>
          </div>
          <div className="rd-work">
            {selected.map((p, i) => (
              <article className="rd-case reveal" key={p.id}>
                <div className="case-viz"><CaseViz kind={i} /></div>
                <div>
                  <span className="case-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p className="case-body">{p.description}</p>
                  <p className="case-stack">{(p.stack || []).join(" · ")}</p>
                  <div className="case-links" style={{ marginTop: 10 }}>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer">View →</a>}
                    {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code →</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER PATH */}
      <section className="rd-section" id="path">
        <hr className="rule" />
        <div className="wrap">
          <div className="sec-head" style={{ marginTop: 40 }}>
            <span className="section-index">04</span>
            <h2 className="sec-title reveal">My path isn't<br />a straight line</h2>
          </div>
          <p className="sec-lead reveal">Different roles, sectors and countries — one trajectory. Adaptability isn't a lack of direction.</p>
          <div className="rd-path reveal"><CareerPath exp={exp} /></div>
        </div>
      </section>

      {/* FULL EXPERIENCE */}
      <section className="rd-section" id="about">
        <hr className="rule" />
        <div className="wrap">
          <div className="sec-head" style={{ marginTop: 40 }}>
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
                <div className="exp-body">
                  <ul>{(e.description || []).map((b, j) => <li key={j}>{b}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>

          {/* skills + education */}
          <div style={{ marginTop: 64 }} className="rd-skills">
            <div className="grp reveal">
              <h4>{cv?.methodologiesTitle || "Methods"}</h4>
              <div className="chips">{(cv?.methodologies || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div>
            </div>
            <div className="grp reveal">
              <h4>{cv?.techStackTitle || "Tools"}</h4>
              <div className="chips">{(cv?.techStack || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div>
            </div>
            <div className="grp reveal">
              <h4>{cv?.languagesTitle || "Languages"}</h4>
              <div className="chips">{(cv?.languages || []).map((m) => <span className="chip" key={m}>{m}</span>)}</div>
            </div>
            <div className="grp reveal">
              <h4>{cv?.educationTitle || "Education"}</h4>
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
            <a href={`mailto:${t.social?.email}`} style={{ fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,64px)", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "3px solid var(--pink)" }}>
              {t.social?.email}
            </a>
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

/* ---------- inline visuals (SVG/canvas) ---------- */

function ComplexitySurface() {
  // a light "distribution / data surface" made of dots thinning left→right into a curve
  const cols = 46, rows = 14, W = 1000, H = 260;
  const dots = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = (c / (cols - 1)) * W;
      const order = c / cols; // 0 chaos -> 1 order
      const jitter = (1 - order) * 90;
      const baseY = H / 2 + Math.sin(c * 0.3) * 60 * order;
      const y = baseY + (r - rows / 2) * (6 + jitter * 0.4) + (Math.random() - 0.5) * jitter;
      const on = Math.random() < 0.35 + order * 0.5;
      if (on) dots.push([x, y, order]);
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", marginTop: 34 }} aria-hidden="true">
      {dots.map(([x, y, o], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill={o > 0.6 ? "#FF3B7D" : "#111"} opacity={0.25 + o * 0.6} />
      ))}
    </svg>
  );
}

function Network() {
  const W = 1000, H = 420;
  const nodes = {
    data: [200, 90, "DATA"],
    business: [140, 210, "BUSINESS"],
    strategy: [500, 210, "STRATEGY"],
    product: [860, 210, "PRODUCT"],
    people: [200, 330, "PEOPLE"],
    core: [500, 210, "CLARITY / IMPACT"],
  };
  const center = [500, 210];
  const edges = [["data"], ["business"], ["strategy"], ["product"], ["people"]];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", marginTop: 30 }}>
      {edges.map(([k], i) => (
        <line key={i} x1={center[0]} y1={center[1]} x2={nodes[k][0]} y2={nodes[k][1]} stroke="#FF3B7D" strokeWidth="1" opacity="0.5" />
      ))}
      {["data", "business", "product", "people"].map((k) => (
        <g key={k}>
          <circle cx={nodes[k][0]} cy={nodes[k][1]} r="5" fill="#111" />
          <text x={nodes[k][0]} y={nodes[k][1] - 14} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="12" fill="#111" letterSpacing="1">{nodes[k][2]}</text>
        </g>
      ))}
      <circle cx={center[0]} cy={center[1]} r="10" fill="#FF3B7D" />
      <text x={center[0]} y={center[1] + 34} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="13" fill="#D91662" letterSpacing="2">CLARITY / IMPACT</text>
    </svg>
  );
}

function CaseViz({ kind }) {
  // a tiny problem-typed motif per case: forecast, network, clusters, curve, contour
  const c = "#FF3B7D", k = kind % 5;
  if (k === 0) // governance / lines
    return <svg viewBox="0 0 200 150"><polyline fill="none" stroke={c} strokeWidth="1.5" points="10,120 40,90 70,100 100,55 130,70 160,30 190,45" /><g stroke="#ccc">{[40,70,100,130,160].map((x)=><line key={x} x1={x} y1="10" x2={x} y2="140"/>)}</g></svg>;
  if (k === 1) // MMM bars / allocation
    return <svg viewBox="0 0 200 150">{[30,70,55,95,40,110,60].map((v,i)=><rect key={i} x={12+i*26} y={140-v} width="16" height={v} fill={i%2?c:"#111"}/>)}</svg>;
  if (k === 2) // causal / clusters
    return <svg viewBox="0 0 200 150">{Array.from({length:60}).map((_,i)=>{const cl=i%3;const cx=40+cl*60+(Math.random()-.5)*40;const cy=75+(Math.random()-.5)*80;return <circle key={i} cx={cx} cy={cy} r="2.4" fill={cl===1?c:"#111"} opacity="0.7"/>;})}</svg>;
  if (k === 3) // embeddings / graph
    return <svg viewBox="0 0 200 150">{Array.from({length:9}).map((_,i)=>{const a=i/9*6.28;const x=100+Math.cos(a)*55;const y=75+Math.sin(a)*45;return <g key={i}><line x1="100" y1="75" x2={x} y2={y} stroke="#ddd"/><circle cx={x} cy={y} r="3" fill={c}/></g>;})}<circle cx="100" cy="75" r="5" fill="#111"/></svg>;
  return <svg viewBox="0 0 200 150">{[20,40,60,80,100].map((r,i)=><ellipse key={i} cx="100" cy="75" rx={r} ry={r*0.6} fill="none" stroke={i===2?c:"#ccc"}/>)}</svg>;
}

function CareerPath({ exp }) {
  const stages = [...exp].reverse(); // oldest -> newest
  const W = 1000, H = 300, pad = 60;
  const n = stages.length;
  const pts = stages.map((s, i) => {
    const x = pad + (i / Math.max(1, n - 1)) * (W - pad * 2);
    const y = H / 2 + Math.sin(i * 1.1) * 70;
    return [x, y, s];
  });
  const d = pts.map(([x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const mx = (px + x) / 2;
    return `C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", marginTop: 30 }}>
      <path d={d} fill="none" stroke="#FF3B7D" strokeWidth="2" />
      {pts.map(([x, y, s], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#111" />
          <text x={x} y={y - 18} textAnchor="middle" className="stage-label" fill="#D91662">{(s.period.match(/\d{4}/) || [""])[0]}</text>
          <text x={x} y={y + 26} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#111">{s.company.split(" ")[0]}</text>
          <text x={x} y={y + 42} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" fill="#666">{s.location}</text>
        </g>
      ))}
    </svg>
  );
}
