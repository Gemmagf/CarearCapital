/* Headless cover letter → 1-page A4 PDF in the CV's style (Helvetica, accent #E11D48).
   Usage: node scripts/render_letter.cjs letter.json OUT.pdf
   letter.json: { subtitle, contactLine, date, recipient: [lines], subject, salutation,
                  paragraphs: [text], closing, signature, portfolioLine } */
const path = require("path");
const fs = require("fs");
const REPO = path.resolve(__dirname, "..");
const React = require(path.join(REPO, "node_modules/react"));
const { Document, Page, View, Text, Link, StyleSheet, renderToFile } =
  require(path.join(REPO, "node_modules/@react-pdf/renderer"));

const [jsonPath, OUT = "/tmp/letter.pdf"] = process.argv.slice(2);
const L = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const ACCENT = L.accent || "#E11D48", DARK = "#1F2937", GRAY = "#6B7280";
const PORTFOLIO = "https://gemmagf.github.io/CarearCapital";

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 36, paddingHorizontal: 52, fontFamily: "Helvetica", fontSize: 10.2, color: DARK, lineHeight: 1.45 },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", lineHeight: 1.1 },
  subtitle: { fontSize: 11, fontFamily: "Helvetica-Oblique", color: ACCENT, marginTop: 2 },
  contact: { fontSize: 8.8, color: GRAY, marginTop: 4 },
  link: { color: ACCENT, textDecoration: "none" },
  rule: { borderBottom: `0.6pt solid ${ACCENT}`, marginTop: 8, marginBottom: 14 },
  recipient: { fontSize: 9.6, color: GRAY, lineHeight: 1.35 },
  date: { fontSize: 9.6, color: GRAY, textAlign: "right" },
  subject: { fontSize: 10.6, fontFamily: "Helvetica-Bold", marginTop: 14, marginBottom: 10 },
  p: { marginBottom: 7.5, textAlign: "justify" },
  closing: { marginTop: 4 },
  signature: { marginTop: 14, fontFamily: "Helvetica-Bold" },
  portfolio: { fontSize: 9.2, color: GRAY, marginTop: 4 },
});

const h = React.createElement;
const Letter = () =>
  h(Document, { title: L.subject, author: L.signature },
    h(Page, { size: "A4", style: s.page },
      h(Text, { style: s.name }, L.signature),
      L.subtitle && h(Text, { style: s.subtitle }, L.subtitle),
      h(Text, { style: s.contact }, L.contactLine, "  ·  ", h(Link, { src: PORTFOLIO, style: s.link }, "gemmagf.github.io/CarearCapital")),
      h(View, { style: s.rule }),
      h(View, { style: { flexDirection: "row", justifyContent: "space-between" } },
        h(View, null, ...(L.recipient || []).map((r, i) => h(Text, { key: i, style: s.recipient }, r))),
        h(Text, { style: s.date }, L.date)),
      h(Text, { style: s.subject }, L.subject),
      h(Text, { style: s.p }, L.salutation),
      ...(L.paragraphs || []).map((t, i) => h(Text, { key: i, style: s.p }, t)),
      L.portfolioLine && h(Text, { style: s.portfolio }, L.portfolioLine, " ", h(Link, { src: PORTFOLIO, style: s.link }, "gemmagf.github.io/CarearCapital")),
      h(Text, { style: [s.p, s.closing] }, L.closing),
      h(Text, { style: s.signature }, L.signature)));

renderToFile(h(Letter), OUT).then(() => console.log("WROTE", OUT)).catch((e) => { console.error(e); process.exit(1); });
