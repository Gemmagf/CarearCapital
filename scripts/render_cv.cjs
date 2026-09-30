/* Headless render of CvDocument → PDF, replicating CvBuilderSection's assembly.
   Usage: node render_cv.cjs OUT.pdf [variant] [projectId|id1,id2] [company] [title] [lang] */
const path = require("path");
const fs = require("fs");
const REPO = require("path").resolve(__dirname, "..");

const babel = require(path.join(REPO, "node_modules/@babel/core"));
const Module = require("module");
const origJs = Module._extensions[".js"];
Module._extensions[".js"] = function (module, filename) {
  if (filename.includes(path.join(REPO, "src") + path.sep)) {
    const { code } = babel.transformFileSync(filename, {
      cwd: REPO,
      presets: [
        [path.join(REPO, "node_modules/@babel/preset-env"), { targets: { node: "current" } }],
        [path.join(REPO, "node_modules/@babel/preset-react"), { runtime: "classic" }],
      ],
      babelrc: false, configFile: false,
    });
    return module._compile(code, filename);
  }
  return origJs(module, filename);
};
Module._extensions[".jsx"] = Module._extensions[".js"];

const React = require(path.join(REPO, "node_modules/react"));
const { renderToFile } = require(path.join(REPO, "node_modules/@react-pdf/renderer"));
const tr = require(path.join(REPO, "src/translations/translations.js"));
const allTranslations = tr.default || tr;
const { applyCvVariant } = tr;
const CvDocument = require(path.join(REPO, "src/components/CvDocument.js")).default;

const [OUT = "/tmp/cv.pdf", cvVariant = "fde", featuredProjectId = "cvHunter",
  companyName = "", positionTitle = "Forward Deployed Engineer", outputLanguage = "english"] = process.argv.slice(2);
const motivation = process.env.MOTIVATION || "";
const photoChoice = "cv";

const langPack = allTranslations[outputLanguage] || allTranslations.english;
const projects = (langPack.personalProjects && langPack.personalProjects.projects) || [];
// projectId may be a comma-separated list ("labm,retail") → two compact featured projects
const featuredList = featuredProjectId.split(",").map((id) => projects.find((p) => p.id === id.trim())).filter(Boolean);
const featuredProject = featuredList[0] || null;
const imgPath = path.join(REPO, `public/images/gemma_${photoChoice}.jpg`);
const photoUrl = "data:image/jpeg;base64," + fs.readFileSync(imgPath).toString("base64");

const props = {
  name: langPack.name || "Gemma Garcia de la Fuente",
  cvData: applyCvVariant(langPack.cv, cvVariant),
  positionTitle, companyName, featuredProject, featuredProjects: featuredList.length > 1 ? featuredList : undefined, motivation, photoUrl, accentColor: "#E11D48",
};

(async () => {
  await renderToFile(React.createElement(CvDocument, props), OUT);
  console.log("WROTE", OUT, "| variant:", cvVariant, "| featured:", featuredProject && featuredProject.title);
})().catch((e) => { console.error(e); process.exit(1); });
