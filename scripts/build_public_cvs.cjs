/* Builds the two downloadable one-page CVs served by the site (public/cv/):
     Gemma_Garcia_de_la_Fuente_CV.pdf      — editorial version (site design: cream + ink + pink, node mark)
     Gemma_Garcia_de_la_Fuente_CV_ATS.pdf  — parser-friendly version (single column, plain headings, no graphics)
   Both are generated from translations.js (english, variant `fde`) so they never drift from the site.
   Usage: node scripts/build_public_cvs.cjs [outDir=public/cv]  — then check page count with pypdf. */
const path = require("path"), fs = require("fs");
const REPO = path.resolve(__dirname, "..");
const babel = require(path.join(REPO, "node_modules/@babel/core"));
const Module = require("module"); const origJs = Module._extensions[".js"];
Module._extensions[".js"] = function (m, f) {
  if (f.includes(path.join(REPO, "src") + path.sep)) {
    const { code } = babel.transformFileSync(f, { cwd: REPO, presets: [[path.join(REPO, "node_modules/@babel/preset-env"), { targets: { node: "current" } }], [path.join(REPO, "node_modules/@babel/preset-react"), { runtime: "classic" }]], babelrc: false, configFile: false });
    return m._compile(code, f);
  }
  return origJs(m, f);
};
const React = require(path.join(REPO, "node_modules/react"));
const { Document, Page, View, Text, Link, Svg, Line, Circle, StyleSheet, Font, renderToFile } = require(path.join(REPO, "node_modules/@react-pdf/renderer"));
Font.registerHyphenationCallback((w) => [w]); // no mid-word breaks: parsers and eyes both prefer whole words
const tr = require(path.join(REPO, "src/translations/translations.js"));
const T = (tr.default || tr).english;
const cv = tr.applyCvVariant(T.cv, "fde");
const h = React.createElement;

const OUT = path.resolve(process.argv[2] || path.join(REPO, "public/cv")); fs.mkdirSync(OUT, { recursive: true });
const NAME = T.name || "Gemma Garcia de la Fuente", PORTFOLIO = "https://gemmagf.github.io/CarearCapital";
const c = cv.contact || {}, social = T.social || {};
const exp = (cv.experiences || []).filter((e) => !e.siteOnly);
const projects = (T.personalProjects && T.personalProjects.projects) || [];
const pick = (ids) => ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
const SELECTED = pick(["cvHunter", "sensorlab", "swissGov"]);
const strip = (u = "") => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
const cap = (arr, n) => (arr || []).slice(0, n);

/* ------------------------------------------------------------------ editorial ---- */
const PINK = "#FF3B7D", PINKD = "#D91662", INK = "#111111", CREAM = "#F2F0EB", SOFT = "#8a8781", LINE = "#d9d6cf";
const E = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 8, color: INK, backgroundColor: CREAM },
  left: { width: 178, backgroundColor: INK, color: CREAM, paddingTop: 34, paddingBottom: 26, paddingHorizontal: 20, justifyContent: "space-between" },
  right: { flex: 1, paddingTop: 34, paddingBottom: 26, paddingLeft: 26, paddingRight: 30 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 26, lineHeight: 0.98, color: CREAM, marginTop: 14 },
  em: { color: PINK },
  headline: { fontFamily: "Courier", fontSize: 7.4, color: PINK, letterSpacing: 0.6, marginTop: 10, textTransform: "uppercase" },
  lgrp: { marginTop: 16 },
  lhead: { fontFamily: "Courier-Bold", fontSize: 6.6, letterSpacing: 1, color: SOFT, textTransform: "uppercase", marginBottom: 4 },
  ltext: { fontSize: 7.6, lineHeight: 1.45, color: "#d8d5ce" },
  llink: { color: CREAM, textDecoration: "none" },
  chip: { fontSize: 7.4, lineHeight: 1.5, color: "#d8d5ce" },
  quote: { fontFamily: "Helvetica-Oblique", fontSize: 7.6, lineHeight: 1.4, color: PINK, marginTop: 18 },
  sec: { marginTop: 11 },
  shead: { flexDirection: "row", alignItems: "baseline", gap: 8, borderBottom: `0.7pt solid ${INK}`, paddingBottom: 3, marginBottom: 6 },
  sidx: { fontFamily: "Courier-Bold", fontSize: 7, color: PINKD, letterSpacing: 1 },
  stitle: { fontFamily: "Helvetica-Bold", fontSize: 9.4, letterSpacing: 0.2, textTransform: "uppercase" },
  body: { fontSize: 8.2, lineHeight: 1.4 },
  proj: { flexDirection: "row", gap: 8, marginBottom: 5 },
  ptag: { fontFamily: "Courier", fontSize: 6.4, color: PINKD, width: 70, letterSpacing: 0.4, textTransform: "uppercase", paddingTop: 1.5 },
  ptitle: { fontFamily: "Helvetica-Bold", fontSize: 8.4 },
  pmeta: { fontSize: 7.2, color: SOFT, lineHeight: 1.35 },
  plink: { color: PINKD, textDecoration: "none" },
  xrow: { flexDirection: "row", gap: 8, marginBottom: 5 },
  xdate: { fontFamily: "Courier", fontSize: 6.6, color: SOFT, width: 70, paddingTop: 1.6, lineHeight: 1.3 },
  xrole: { fontFamily: "Helvetica-Bold", fontSize: 8.6 },
  xco: { fontSize: 7.4, color: SOFT, marginBottom: 1.5 },
  brow: { flexDirection: "row", marginBottom: 0.6 },
  bmark: { width: 7, color: PINK, fontSize: 8 },
  btext: { flex: 1, fontSize: 7.8, lineHeight: 1.32 },
  edu: { fontSize: 7.8, lineHeight: 1.4 },
});
const Mark = () => h(Svg, { width: 40, height: 40, viewBox: "0 0 64 64" },
  h(Line, { x1: 14, y1: 47, x2: 31, y2: 18, stroke: PINK, strokeWidth: 3.2, strokeLinecap: "round" }),
  h(Line, { x1: 31, y1: 18, x2: 50, y2: 34, stroke: PINK, strokeWidth: 3.2, strokeLinecap: "round" }),
  h(Line, { x1: 14, y1: 47, x2: 50, y2: 34, stroke: PINK, strokeWidth: 3.2, strokeLinecap: "round" }),
  h(Circle, { cx: 14, cy: 47, r: 6, fill: PINK }), h(Circle, { cx: 31, cy: 18, r: 6, fill: PINK }), h(Circle, { cx: 50, cy: 34, r: 6, fill: PINK }));
const SHead = (i, t) => h(View, { style: E.shead }, h(Text, { style: E.sidx }, i), h(Text, { style: E.stitle }, t));
const B = (t, k) => h(View, { key: k, style: E.brow }, h(Text, { style: E.bmark }, "•"), h(Text, { style: E.btext }, t));

const Editorial = () => h(Document, { title: `CV — ${NAME}`, author: NAME },
  h(Page, { size: "A4", style: E.page },
    h(View, { style: E.left },
      h(View, null,
        h(Mark),
        h(Text, { style: E.name }, h(Text, { style: E.em }, "Gemma"), "\nGarcia\nde la\nFuente"),
        h(Text, { style: E.headline }, "Data scientist · Product owner\nForward deployed"),
        h(View, { style: E.lgrp }, h(Text, { style: E.lhead }, "Contact"),
          h(Text, { style: E.ltext }, c.location || "Zürich, Switzerland"),
          h(Text, { style: E.ltext }, c.phone || ""),
          h(Link, { src: `mailto:${c.email}`, style: [E.ltext, E.llink] }, c.email || ""),
          h(Link, { src: PORTFOLIO, style: [E.ltext, E.llink] }, strip(PORTFOLIO)),
          h(Link, { src: social.linkedin, style: [E.ltext, E.llink] }, strip(social.linkedin || ""))),
        h(View, { style: E.lgrp }, h(Text, { style: E.lhead }, "Languages"),
          ...(cv.languages || []).map((l, i) => h(Text, { key: i, style: E.ltext }, l))),
        h(View, { style: E.lgrp }, h(Text, { style: E.lhead }, "Stack"),
          ...(cv.techStack || []).map((s, i) => h(Text, { key: i, style: E.chip }, s)))),
      h(Text, { style: E.quote }, "Being kind is harder than being smart.\nLet's try hard things together.")),
    h(View, { style: E.right },
      h(View, { style: [E.sec, { marginTop: 0 }] }, SHead("01", "Summary"), h(Text, { style: E.body }, cv.summary)),
      h(View, { style: E.sec }, SHead("02", "Selected work"),
        ...SELECTED.map((p, i) => h(View, { key: i, style: E.proj },
          h(Text, { style: E.ptag }, p.tag || ""),
          h(View, { style: { flex: 1 } },
            h(Text, { style: E.ptitle }, p.title),
            h(Text, { style: E.pmeta }, cap(p.stack, 5).join(" · ")),
            p.link ? h(Link, { src: p.link, style: [E.pmeta, E.plink] }, strip(p.link)) : null)))),
      h(View, { style: E.sec }, SHead("03", "Experience"),
        ...exp.map((e, i) => h(View, { key: i, style: E.xrow },
          h(Text, { style: E.xdate }, (e.period || "").replace(" – ", "\n– ")),
          h(View, { style: { flex: 1 } },
            h(Text, { style: E.xrole }, e.role),
            h(Text, { style: E.xco }, [e.company, e.location].filter(Boolean).join(" · ")),
            ...cap(e.description, i < 2 ? 5 : 3).map((b, k) => B(b, k)))))),
      h(View, { style: E.sec }, SHead("04", "Education"),
        ...(cv.education || []).map((e, i) => h(Text, { key: i, style: E.edu }, e))),
      h(View, { style: E.sec }, SHead("05", "How I work"),
        h(Text, { style: E.body }, (cv.methodologies || []).join(", "))))));

/* ------------------------------------------------------------------ ATS ---- */
const A = StyleSheet.create({
  page: { paddingTop: 34, paddingBottom: 30, paddingHorizontal: 46, fontFamily: "Helvetica", fontSize: 8.8, color: "#000", lineHeight: 1.3 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 17, lineHeight: 1.2, marginBottom: 3 },
  title: { fontSize: 9.6, marginBottom: 4 },
  contact: { fontSize: 8.6, marginBottom: 1.5 },
  h: { fontFamily: "Helvetica-Bold", fontSize: 9.6, textTransform: "uppercase", marginTop: 7, marginBottom: 2.5, borderBottom: "0.6pt solid #000", paddingBottom: 1.5 },
  p: { marginBottom: 1.5 },
  role: { fontFamily: "Helvetica-Bold", fontSize: 9, marginTop: 3 },
  meta: { fontSize: 8.4, marginBottom: 1 },
  bullet: { flexDirection: "row", marginBottom: 0.5 },
  bm: { width: 9 }, bt: { flex: 1 },
});
const AB = (t, k) => h(View, { key: k, style: A.bullet }, h(Text, { style: A.bm }, "-"), h(Text, { style: A.bt }, t));
const ATS = () => h(Document, { title: `${NAME} - CV`, author: NAME, keywords: "data scientist, product owner, forward deployed engineer, machine learning, LLM, Python, SQL" },
  h(Page, { size: "A4", style: A.page },
    h(Text, { style: A.name }, NAME),
    h(Text, { style: A.title }, "Senior Data Scientist | Product Owner | Forward Deployed Engineer"),
    h(Text, { style: A.contact }, [c.location, c.phone, c.email].filter(Boolean).join("  |  ")),
    h(Text, { style: A.contact }, ["Portfolio: " + strip(PORTFOLIO), social.linkedin ? "LinkedIn: " + strip(social.linkedin) : null, social.github ? "GitHub: " + strip(social.github) : null].filter(Boolean).join("  |  ")),
    h(Text, { style: A.h }, "Professional summary"), h(Text, { style: A.p }, cv.summary),
    h(Text, { style: A.h }, "Skills"),
    h(Text, { style: A.p }, h(Text, { style: { fontFamily: "Helvetica-Bold" } }, "Technical: "), (cv.techStack || []).join(", ")),
    h(Text, { style: A.p }, h(Text, { style: { fontFamily: "Helvetica-Bold" } }, "Methods: "), (cv.methodologies || []).join(", ")),
    h(Text, { style: A.h }, "Professional experience"),
    ...exp.map((e, i) => h(View, { key: i, wrap: false },
      h(Text, { style: A.role }, `${e.role} - ${e.company}`),
      h(Text, { style: A.meta }, [e.location, e.period].filter(Boolean).join("  |  ")),
      ...cap(e.description, i < 2 ? 4 : 3).map((b, k) => AB(b, k)))),
    h(Text, { style: A.h }, "Selected projects"),
    ...SELECTED.map((p, i) => h(View, { key: i, wrap: false },
      h(Text, { style: A.role }, p.title),
      h(Text, { style: A.meta }, [cap(p.stack, 6).join(", "), strip(p.link || p.repo || "")].filter(Boolean).join("  |  ")))),
    h(Text, { style: A.h }, "Education"), ...(cv.education || []).map((e, i) => AB(e, i)),
    h(Text, { style: A.h }, "Languages"), h(Text, { style: A.p }, (cv.languages || []).join(", "))));

(async () => {
  const f1 = path.join(OUT, "Gemma_Garcia_de_la_Fuente_CV.pdf"), f2 = path.join(OUT, "Gemma_Garcia_de_la_Fuente_CV_ATS.pdf");
  await renderToFile(h(Editorial), f1); await renderToFile(h(ATS), f2);
  console.log("WROTE", f1, "\nWROTE", f2);
})().catch((e) => { console.error(e); process.exit(1); });
