# CarearCapital — Project log

Portfolio de la Gemma Garcia de la Fuente. Web pública: https://gemmagf.github.io/CarearCapital/
Repo: https://github.com/Gemmagf/CarearCapital · branca de treball `main` (= `portfolio-redesign`) · web antiga a `legacy-site`.

Aquest document és la **font de veritat** per continuar la feina en qualsevol sessió: context, arquitectura,
decisions, com verificar i desplegar, trampes conegudes, pendents i diari de canvis. Mantenir-lo al dia a cada canvi.

---

## 1. Què és

Un portfoli editorial (off-white · negre · rosa `#FF3B7D`) posicionat per a rols de **Forward Deployed Engineer /
Solutions**: algú que s'incorpora a un equip, entén el negoci i porta tecnologia nova (dades, IA) a producció.
Sis idiomes (EN · CA · ES · FR · DE · IT). Inclou un **CV builder privat** (`#secret`, codi 8004) que genera un
PDF DIN-A4 d'una pàgina a partir de les mateixes dades.

Estructura de la pàgina (`src/redesign/RedesignApp.jsx`):

| Secció | Contingut | Font de les dades |
|---|---|---|
| Hero | Nom (GEMMA en rosa) + retrat amb **cicle de partícules** (foto → punts → superfície d'ona → graf de xarxa → globus → foto) | `HeroFigure.jsx`, `public/images/gemma_hero_cut.png` |
| 00 Intro | Frase + summary FDE + epígraf | `copy.js` (`intro`, `summary`), `QUOTES` |
| 01 Complexity | Wave de dades (SVG dens) + llista *Expertise* (tècnica) | `copy.js` `s1` |
| 02 Connect | Xarxa orbital + *Cross-functional impact* amb proves | `copy.js` `s2` |
| 03 Work | 7 cards (4 columnes) amb gràfic propi; **modal** amb descripció + brief (*question → did → result → next*) + crèdit | `translations.js` (`PROJECT_META`, `PROJECT_TEXTS`, `PROJECT_BRIEFS`), `SELECTED`, `VIZ_BY_ID` |
| 04 Path | **Graf temporal amb bifurcacions** (estudis amunt, feina avall, estades com a llaços, fites: Zürich, article, Caleta) | `cv.experiences`, `cv.education`, `copy.js` `s4.events` |
| 05 Full experience | Totes les etapes (acordió) + Methodologies · Tech stack · Languages · Books · Publication · Education | `cv.*`, `copy.js` (`methods`, `tools`, `books`, `pub`) |
| Footer | Contacte, epígraf, colofó (Cala Marquesa 🐾) | `copy.js` `footer`, `colophon` |

Routing (`src/App.js`): arrel → redisseny · `#secret` → CV builder · `#legacy` → web antiga (components Tailwind de `src/components/`).

## 2. Arquitectura i fitxers clau

```
src/App.js                       routing per hash
src/redesign/RedesignApp.jsx     tota la pàgina + visuals SVG (DataSurface, ChordOrbital, CaseViz per projecte, CareerMap)
src/redesign/HeroFigure.jsx      cicle de partícules del hero (canvas; halftone de la foto; formes animades)
src/redesign/FlowField.jsx       camp de partícules de fons del hero
src/redesign/copy.js             copy editorial en 6 idiomes (RD[lang]) — TOT el text de seccions viu aquí
src/redesign/redesign.css        estils del redisseny (scoped a .rd), grid 12 col, cards, modal, epígrafs
src/translations/translations.js dades: CV (6 idiomes), projectes (META + TEXTS + BRIEFS), CV_VARIANTS, applyCvVariant
src/components/CvDocument.js     PDF (@react-pdf/renderer) — filtra experiències `siteOnly`
src/components/CvBuilderSection.js  builder privat (#secret)
public/index.html                meta OG/Twitter (og-image.png), favicons (favicon.svg + PNG)
public/puppy-tracker.html, elmeuespai.html   demos públiques servides amb la web
scripts/render_cv.cjs            render headless del PDF: node scripts/render_cv.cjs OUT.pdf [variant] [projectId] [empresa] [títol] [lang]
scripts/render_map.cjs           render headless del mapa de carrera a SVG (per revisar-lo sense navegador)
```

Conceptes:
- **`CV_VARIANTS`** (`""`, `consumer`, `industrial`, `dataeng`, `fde`, `aiplatform`, `dataai`, `automation`, `mktauto`): reenfoquen summary / mètodes / ordre d'estudis. El redisseny aplica `fde` i el builder deixa triar. `aiplatform` = GenAI/RAG en producció (Siemens); `dataai` = plataforma de dades + Power BI + forecasting + GenAI (Victorinox). Cap glif fora de WinAnsi als textos del PDF (la fletxa `→` es renderitza com `'`).
- **`siteOnly: true`** en una experiència → surt a la web (secció 05) però **no** al PDF (que ha de cabre en 1 pàgina) ni com a branca al mapa (ja hi és com a llaç via `s4.events`).
- **`PROJECT_BRIEFS[lang][id]`**: `{question, did, result, next, credit?}`; els idiomes sense brief cauen a l'anglès.
- **`s4.events`** (copy.js): esdeveniments del mapa que no són al CV: `trip` (llaç), `work` curt (< 0,5 anys → "stint"/llaç), `study`, `life` (fita amb línia guia), `pub` (rombe enllaçat), `pet` (petjada). Temps en anys decimals (2013.45 = juny 2013).
- **Cards**: `SELECTED` decideix quins i en quin ordre; `VIZ_BY_ID` assigna el gràfic SVG propi (fallback genèric).

## 3. Decisions (i per què)

- **Redisseny = home pública des del 29-09-2026**; l'antiga es conserva (`legacy-site`, `#legacy`) per historial.
- **Copy en fitxer propi (`copy.js`)** i no a `translations.js`: separa dades (CV/projectes) de text editorial.
- **Tot el gràfic és SVG/canvas determinista** (sense `Math.random` als SVG) per evitar diferències entre renders.
- **PDF sempre 1 pàgina**: es verifica amb `scripts/render_cv.cjs` + pypdf; per això les etapes curtes són `siteOnly`.
- **Hero**: després de moltes iteracions (foto lateral → halftone → capçalera → centrat), el cicle de partícules *in situ*
  sobre el retrat és la versió aprovada. Es pausa quan la pestanya no és visible (IntersectionObserver): és normal.
- **Mapa de carrera** amb eix de temps real i vies (lanes) per solapament; les etiquetes es reparteixen en files.
  Dates: nascuda 1997 → França 2013 (abans del grau), Itàlia estius 2014/2015, Xina 2016, UOC tardor 2021, Zürich 2022, Caleta ago 2026.
- **Methodologies en clau de negoci** (problem framing, prototype→production, stakeholders…); l'*Expertise* de la secció 01 és el vessant tècnic.
- **Tech stack de la web** és juganer ("Anything — with a little help from Claudia" + 5 eines); el del PDF és el tècnic (`techStack` a translations.js).
- **`projects/` (1,1 GB de material local, Keynote inclòs) mai a git** — vegeu §6.

## 4. Com treballar-hi

```bash
npm start                      # dev server (CRA); obrir http://localhost:3000/  (#secret per al builder, #legacy per l'antiga)
CI=false npx react-scripts build   # build de producció (CI=false perquè els warnings no trenquin)
npm run deploy                 # build + publica build/ a la branca gh-pages → web viva (triga 1–3 min; el navegador cacheja 10 min → ⌘⇧R)
node scripts/render_cv.cjs /tmp/cv.pdf fde cvHunter "Empresa" "Títol"   # PDF headless (variant, projecte o "id1,id2" per a dos, empresa, títol, idioma); MOTIVATION="…" afegeix un paràgraf "Why X"
node scripts/render_letter.cjs carta.json /tmp/carta.pdf                # carta de presentació 1 pàgina, mateix estil (camps al capçal del script)
node scripts/build_public_cvs.cjs                                       # regenera els 2 CVs descarregables de la web (public/cv/), 1 pàgina cadascun
node scripts/render_viz.cjs /tmp VizPedretes                            # gràfic d'una targeta de projecte → SVG (qlmanage -t per veure'l)
node scripts/render_map.cjs /tmp                                          # mapa de carrera → /tmp/careermap.svg (qlmanage -t per rasteritzar)
```

Verificació habitual després d'un canvi: build OK → (si cal) render headless del PDF i comprovar `len(pages)==1` amb pypdf →
`npm run deploy` → confirmar que `https://gemmagf.github.io/CarearCapital/` referencia el bundle nou (`static/js/main.<hash>.js` igual que `build/static/js/`).

Git: treballar a `main`; després de cada commit, `git branch -f portfolio-redesign main` i `git push origin main portfolio-redesign`.

## 5. Evolució (fases)

| Data | Fase | Commits clau |
|---|---|---|
| 2025-08 → 2026-05 | Web original (React + Tailwind): home, CV, projectes, contacte; builder secret | `1f65b07`, `7b26e47` (= `legacy-site`) |
| 2026-07-20 | Recuperació del codi font des del sourcemap de gh-pages; CV variants; etiquetes d'idiomes en paraules | `4e111c0` |
| 2026-08-07 | CV d'una pàgina (bullets ajustats), títols del PDF localitzats, Swiss Governance com a projecte líder | `cac65cc`…`002dd1d` |
| 2026-08-30 | Projectes El meu espai i Puppy Tracker; fora l'app d'alemany | `eeadcbc`, `58e9e5b` |
| 2026-08-31 → 09-17 | **Redisseny editorial** (branca `portfolio-redesign`): sistema, flow-field, viz, GSAP; iteracions del hero i de la compactació segons el mock | `c8bde95`, `9998cb4`, `ef48d09`, `77587e0` |
| 2026-09-27/28 | Reposicionament **FDE**: variant CV `fde`, stack real, copy nou; gràfics propis per projecte; mapa enriquit | `d2c6527`, `616cc48` |
| 2026-09-29 | Hero final (halftone → cicle de partícules in situ amb ona/xarxa/globus); modal amb briefs; Swiss Governance al card | `e62c824`, `a54229c`, `2624e7e` |
| 2026-09-29 | **El redisseny passa a ser la web pública**; i18n complet (`copy.js`); favicon i og-image; `legacy-site`; historial reescrit per treure `projects/` | `c6d874b`, `4e0afc7` |
| 2026-09-29 | Rovelló, Puppy Tracker (demo) i Who's Who com a cards; graf de carrera amb bifurcacions + estades + article + Caleta; epígrafs, llibres, publicació; totes les etapes a la 05; methodologies en clau de negoci | `b9236e6`…`b57dee2` |

## 6. Trampes conegudes (llegir abans de tocar res)

- **`projects/` és a `.gitignore` i no s'ha de commitejar mai.** Un commit el va afegir per error (Keynote de 304 MB) i GitHub rebutja fitxers > 100 MB; es va reescriure l'historial (tag local `backup/pre-projects-strip` = tip antic). En reescriure, git va esborrar els fitxers del disc i es van restaurar amb `git archive` — no repetir.
- **`.claude/worktrees/*` apareixen com a modificats**: ignorar-los, no afegir-los als commits (`git add` sempre amb rutes explícites).
- **Scripts que editen `translations.js` per idioma**: hi ha **dos** blocs per idioma (`PROJECT_TEXTS` i l'objecte `translations`); ancorar la cerca al bloc correcte (el que conté `experiences: [`). Ja va passar que les tres etapes noves anessin totes al bloc català.
- **`sed` de macOS** no entén `\b`; usar patrons amb espais o Python.
- **Cometes tipogràfiques dins de JSX**: escriure els caràcters reals o `{"“"}`; `“` dins de text JSX surt literal.
- **GitHub Pages**: `cache-control: max-age=600` → després de desplegar, ⌘⇧R o finestra privada.
- **Panell del navegador de l'app**: si està ocult, els scripts es pengen i les animacions es pausen; verificar amb els renders headless de `scripts/`.
- **Streamlit** (Sensorlab, LabM, Farma, Tracker Lab): dormen si ningú els obre.
- Commits: `Co-Authored-By: Claude …` al final segons la convenció de la sessió.

- **Mòbil**: el bloc `@media (max-width: 820px)` del **final** de `redesign.css` ha de quedar l'últim (sobreescriu regles declarades després del bloc responsive principal). Qualsevol popup nou ha de seguir el patró del modal: caixa flex en columna, `max-height` en `dvh`, cos amb scroll, accions fora del scroll.
- **Pàgines HTML soltes a `public/`** (com `puppy-tracker.html`): han de portar `<!doctype html>`, `<meta charset>` i `<meta name="viewport">`; sense viewport el mòbil les renderitza a 980 px. Dins de grids/flex, una fila amb `overflow-x:auto` necessita `min-width:0` als pares o eixampla el contenidor.
- **Verificar en mòbil sense veure el panell**: `resize_window` preset `mobile` + `javascript_tool` mesurant `getBoundingClientRect()` (les captures fallen si el panell del navegador està amagat, i les transicions CSS no avancen).

## 7. Pendents

1. Vídeos/captures reals dels projectes ⭐ (`CASE_IMAGES` a `RedesignApp.jsx` → `public/images/projects/proj_<id>.jpg`).
2. ~~Logistics (`coffe_logic`) té el link a un repo privat (404)~~ — resolt 29-09-2026: `link: null` + brief "demo on request". Si s'obre el repo o es publica la demo (mode demo sense backend a GitHub Pages), posar-hi l'URL.
3. Keep-alive dels Streamlit (GitHub Action cron) o vídeo als cards.
4. Swiss Governance: quan la branca `asset-drilldown` del cockpit (fusió de Züri-Kreislauf) arribi a `main` i es desplegui, actualitzar descripció + deep link.
5. Opcional: *Expertise* (01) en clau de negoci com les methodologies; "Cala Marquesa" també al mapa/Puppy Tracker si es vol.
6. Detall del mapa: les etiquetes de Google/KH queden prop de l'eix; si molesta, donar més alçada (`H`) a `CareerMap`.

## 8. Diari de canvis

- **2026-09-30 (vespre)** — **Canvi d'objectiu professional**: la Gemma vol un rol *in-house* (automatitzar i integrar IA dins d'una empresa), no proveïdors d'IA ni consultoria; "forward deployed" ja no és el relat (pendent de decidir si es reformula el portfoli). Variants de CV noves: `automation` (automatització de processos + IA in-house) i `mktauto` (CRM / automatització de màrqueting). Sis CVs de dos projectes a `~/Downloads`: VZ, SwissComply, Fairway (`automation`), mobilezone (`mktauto`), Kanadevia Inova (`industrial`), Julius Bär (`dataeng`). LabM no es fa servir als CVs.
- **2026-09-30 (tarda)** — CV amb **dos projectes destacats**: `CvDocument` accepta `featuredProjects` (2+ → entrades compactes: 2 primeres frases + stack a la línia de meta) i `scripts/render_cv.cjs` accepta ids separats per coma (`labm,retail`). Amb dos projectes no hi cap el paràgraf `MOTIVATION` si es vol 1 pàgina. Usat per a Digitec Galaxus (LabM + Supply Chain Lab). Noves candidatures a la memòria `job_pipeline.md` (Unique AI FDDS; Siemens i Victorinox enviades).
- **2026-09-30** — **Revisió mòbil completa** (la Gemma no podia obrir projectes des del telèfon). Portfoli: el modal de projecte no tenia alçada màxima ni scroll → ara és capçalera + cos amb scroll (`.mbody`) + barra d'accions fixa (`.acts`), `max-height` en `dvh`, full inferior a ≤820 px, bloqueig de l'scroll del `body`, `role="dialog"`, focus al botó de tancar (44 px). Acordió d'experiència: `max-height` 400 → 1600 px (tallava vinyetes en pantalles estretes). Barra superior en mòbil: `position:absolute` (ja no tapa títols), enllaços de secció visibles, botons d'idioma de 40 px. Mapa de carrera: amplada fixa de 960 px amb scroll horitzontal dins `.rd-map` + pista `← →`. Targetes: 2 columnes fins a 560 px, 1 per sota. Epígrafs que ja no es tallen, anell de focus visible, enllaços de mida de dit. Tret el «+» decoratiu de la llista d'Expertise (no era clicable). **Demo Puppy Tracker** (`public/puppy-tracker.html`): no tenia `<!doctype>`, `<head>` ni `<meta viewport>` (el mòbil la mostrava com una web d'escriptori encongida) → esquelet complet + metadades; la fila de sub-pestanyes eixamplava el telèfon fins a 416 px i tallava la pestanya Training → `min-width:0` + `minmax(0,1fr)`; en mòbil la demo va primer (`order:-1`), botó «Try the demo ↓», sub-pestanyes en dues files, alçada en `dvh`, àrees tàctils ampliades, glifs SF substituïts. Verificat a 375×812 i 1440×900 amb mesures DOM (9/9 modals amb accions visibles, 0 desbordaments).
- **2026-09-29 (vespre)** — Web: dos projectes nous a la secció 03, **Pedretes** (gestor d'obrador de joieria de Zúric: Alliance/Fassung/Pavé, preu de l'or en viu, ofertes PDF suïsses, Supabase, demo pública per sectors; `pedretes-one.vercel.app`) i **Coffee Logistics / Cafgic** (operativa multi-local de cafeteries: torns amb generador de propostes, comandes, caixa; Node+Prisma+React; codi privat → `link: null`, tanca el pendent del 404). 9 targetes → graella de 3 columnes. Gràfics `VizPedretes` i `VizCafgic`; textos + briefs en 6 idiomes. **Dos CVs descarregables d'una pàgina** (consell extern): editorial (`public/cv/Gemma_Garcia_de_la_Fuente_CV.pdf`, disseny de la web: columna fosca + marca de nodes) i ATS (`..._CV_ATS.pdf`, una columna, sense gràfics ni foto), generats amb `scripts/build_public_cvs.cjs` des de `translations.js` (english, `fde`) — **regenerar-los quan canviï el CV** i comprovar 1 pàgina. Enllaços a la capçalera de la secció 05 (`CvDownloads`, copy `dl` en 6 idiomes) i al peu. `scripts/render_viz.cjs` renderitza els gràfics de les targetes a SVG per verificar sense navegador.
- **2026-09-29 (tarda)** — Candidatures: variants CV `aiplatform` (Siemens Zug, AI Platform Engineer, projecte CV Hunter) i `dataai` (Victorinox Ibach, Data & AI Engineer, projecte Supply Chain Lab); nou `scripts/render_letter.cjs` (Anschreiben Siemens en alemany). PDFs a `~/Downloads/CV_Gemma_Garcia_Siemens_*.pdf`, `CV_Gemma_Garcia_Victorinox_*.pdf`, `Anschreiben_Gemma_Garcia_Siemens.pdf`. Scan de posicions ZH/ZG/SZ a la memòria `job_pipeline.md`. Sense desplegament (no toca la web).

- **2026-09-29** — Redisseny publicat com a home; i18n complet; favicon/og-image; `legacy-site`; historial net de `projects/`. Cards: Rovelló, Puppy Tracker (demo), Who's Who (4 columnes). Modal amb briefs (6 idiomes) i crèdits. Graf de carrera amb bifurcacions, estades (2013–2016), UOC/ForceManager/Additius com a llaços, article Elsevier (DOI), trasllat a Zürich, Caleta. Secció 05: 7 etapes (3 `siteOnly`), methodologies de negoci, tools juganer, llibres enllaçats (títols originals), publicació. Epígrafs per secció; footer "Being kind is harder than being smart. Let's try hard things together." + colofó de Cala Marquesa. `scripts/` amb els renders headless. Aquest log i `CLAUDE.md`.
- **2026-09-28** — Reposicionament FDE (variant `fde`, stack real, copy, impact amb proves); gràfics propis per projecte; wave/xarxa/mapa enriquits; brief per a la sessió del cockpit (`~/Documents/git_projects/swiss-governance-dashboard-ASSET-DRILLDOWN-BRIEF.md`).
- **2026-09-07 → 17** — Iteracions del hero i compactació de seccions segons el mock.
- **2026-08-31** — Inici del redisseny (branca `portfolio-redesign`).
- **2026-07/08** — Recuperació del codi, CV variants, PDF d'una pàgina, projectes nous.
