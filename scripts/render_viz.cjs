/* Headless render of the per-project card graphics (VizXxx in RedesignApp.jsx) → SVG files.
   Usage: node scripts/render_viz.cjs OUT_DIR [VizName ...]   (default: all) — rasterize with `qlmanage -t -s 800`. */
const path = require("path"), fs = require("fs");
const REPO = path.resolve(__dirname, "..");
const babel = require(path.join(REPO, "node_modules/@babel/core"));
const React = require(path.join(REPO, "node_modules/react"));
const RDS = require(path.join(REPO, "node_modules/react-dom/server"));
const src = fs.readFileSync(path.join(REPO, "src/redesign/RedesignApp.jsx"), "utf8");
const a = src.indexOf("/* ---------- per-project visuals"), b = src.indexOf("const VIZ_BY_ID");
const names = [...src.slice(a, b).matchAll(/^function (Viz\w+)\(/gm)].map((m) => m[1]).filter((n) => n !== "VizGeneric");
const body = src.slice(a, b) + "\nmodule.exports={" + names.join(",") + "};";
const { code } = babel.transformSync(body, { presets: [[path.join(REPO, "node_modules/@babel/preset-env"), { targets: { node: "current" } }], [path.join(REPO, "node_modules/@babel/preset-react"), { runtime: "classic" }]], babelrc: false, configFile: false, filename: "viz.jsx" });
const m = { exports: {} }; new Function("module", "exports", "require", "React", code)(m, m.exports, require, React);
const outDir = process.argv[2] || ".", want = process.argv.slice(3);
const css = `<style>.ann{font-family:monospace;font-size:8px;letter-spacing:.08em;fill:#6b6963;text-transform:uppercase}.annp{font-family:monospace;font-size:8.5px;letter-spacing:.06em;fill:#D91662;font-weight:700}</style>`;
for (const n of names) { if (want.length && !want.includes(n)) continue;
  const svg = RDS.renderToStaticMarkup(React.createElement(m.exports[n])).replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="440" style="background:#f2f0eb" `).replace(">", ">" + css);
  const out = path.join(outDir, n + ".svg"); fs.writeFileSync(out, svg); console.log("WROTE", out); }
