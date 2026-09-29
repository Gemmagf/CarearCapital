const path=require("path"), fs=require("fs"); const REPO=require("path").resolve(__dirname,"..");
const babel=require(path.join(REPO,"node_modules/@babel/core")); const Module=require("module"); const orig=Module._extensions[".js"];
const hook=function(m,f){ if(f.includes(path.join(REPO,"src")+path.sep)){ const {code}=babel.transformFileSync(f,{cwd:REPO,presets:[[path.join(REPO,"node_modules/@babel/preset-env"),{targets:{node:"current"}}],[path.join(REPO,"node_modules/@babel/preset-react"),{runtime:"classic"}]],babelrc:false,configFile:false}); return m._compile(code,f);} return orig(m,f); };
Module._extensions[".js"]=hook; Module._extensions[".jsx"]=hook; Module._extensions[".css"]=function(m){m.exports={}};
// stub browser-only deps
Module._extensions[".js"]=function(m,f){ if(/node_modules\/gsap/.test(f)){ m.exports={gsap:{registerPlugin(){},context(){return{revert(){}}}}, ScrollTrigger:{}}; return;} return hook(m,f); };
const React=require(path.join(REPO,"node_modules/react")); const RDS=require(path.join(REPO,"node_modules/react-dom/server"));
const src=fs.readFileSync(path.join(REPO,"src/redesign/RedesignApp.jsx"),"utf8");
// extract CareerMap function source and evaluate it standalone
const start=src.indexOf("function CareerMap("); const end=src.indexOf("\n}\n",start)+3; const fn=src.slice(start,end);
const {code}=babel.transformSync(fn+"\nmodule.exports=CareerMap;",{presets:[[path.join(REPO,"node_modules/@babel/preset-env"),{targets:{node:"current"}}],[path.join(REPO,"node_modules/@babel/preset-react"),{runtime:"classic"}]],babelrc:false,configFile:false,filename:"map.jsx"});
const m={exports:{}}; new Function("module","exports","require","React",code)(m,m.exports,require,React); const CareerMap=m.exports;
const tr=require(path.join(REPO,"src/translations/translations.js")); const T=(tr.default||tr).english; const RD=require(path.join(REPO,"src/redesign/copy.js")).default;
const cv=tr.applyCvVariant(T.cv,"fde");
const svg=RDS.renderToStaticMarkup(React.createElement(CareerMap,{exp:cv.experiences,edu:cv.education,legend:RD.english.s4.legend,events:RD.english.s4.events}));
const out=path.join(process.argv[2]||".","careermap.svg");
fs.writeFileSync(out, svg.replace("<svg ","<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0d0d0f\" width=\"1400\" height=\"420\" "));
console.log("WROTE",out, svg.length,"chars; branches:",(svg.match(/data-draw/g)||[]).length);
