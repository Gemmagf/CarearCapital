# CarearCapital — Project log

Portfoli de la Gemma Garcia de la Fuente. Web pública: https://gemmagf.github.io/CarearCapital/
Repo: https://github.com/Gemmagf/CarearCapital (**públic**) · branca de treball `main` (= `portfolio-redesign`) · web antiga a `legacy-site`.

Aquest document és la **font de veritat** per continuar la feina en qualsevol sessió: context, arquitectura,
decisions, com treballar-hi, evolució, trampes, pendents i diari de canvis. Mantenir-lo al dia a cada canvi.

> **Privacitat (llegir primer).** El repo és públic. Aquí hi va l'evolució del *projecte* (web, CV builder, eines).
> El detall de candidatures (empreses, estat, sou, cartes) **no** va a git: viu a la memòria privada de Claude
> (`~/.claude/projects/-Users-gemmagardela-Documents-git-projects-CarearCapital/memory/job_pipeline.md`).
> Versions anteriors d'aquest fitxer i alguns missatges de commit (29–30 de setembre de 2026) sí que esmenten
> empreses i l'objectiu salarial; són a l'historial. Purgar-ho demana reescriure l'historial: decisió de la Gemma.

Última actualització: **2 d'octubre de 2026** · últim commit funcional `5ef16cf` · web viva verificada.

---

## 1. Què és

Un portfoli editorial (off-white · negre · rosa `#FF3B7D`) en sis idiomes (EN · CA · ES · FR · DE · IT), amb:

- la **web pública** (redisseny editorial, pàgina única);
- un **CV builder privat** (`#secret`, codi 8004) que genera un PDF DIN-A4 d'una pàgina amb les mateixes dades;
- una **nota de mercat amagada** (`#secret2`, en català) per compartir per URL;
- un joc d'**scripts headless** per generar CVs, cartes i gràfics sense navegador;
- dos **CVs descarregables** (editorial i ATS) servits des de la web.

**Posicionament.** El copy de la web encara diu *Forward Deployed / Solutions* (variant de CV `fde`). Des del
30-09-2026 l'objectiu real de la Gemma és un rol **in-house**: ajudar una empresa a automatitzar i integrar IA des de
dins, no des d'un proveïdor ni una consultora. Reformular el copy de la web és un **pendent de decisió** (§7).

Estructura de la pàgina (`src/redesign/RedesignApp.jsx`):

| Secció | Contingut | Font de les dades |
|---|---|---|
| Barra | Marca de nodes (torna a dalt), Work / Path / About, selector de 6 idiomes | `copy.js` `nav`, `LANGS` |
| Hero | Nom (GEMMA en rosa) + retrat amb **cicle de partícules** (foto → punts → ona → xarxa → globus → foto) | `HeroFigure.jsx`, `FlowField.jsx`, `public/images/gemma_hero_cut.png` |
| 00 Intro | Frase + summary + epígraf | `copy.js` (`intro`, `summary`), `QUOTES` |
| 01 Complexity | Wave de dades (SVG) + llista *Expertise* (sense el «+» decoratiu) | `copy.js` `s1` |
| 02 Connect | Xarxa orbital + *Cross-functional impact* | `copy.js` `s2` |
| 03 Work | **9 targetes en 3 columnes** amb gràfic propi; **modal** amb descripció + brief (*question → did → result → next*) + crèdit + accions fixes | `translations.js` (`PROJECT_META`, `PROJECT_TEXTS`, `PROJECT_BRIEFS`), `SELECTED`, `VIZ_BY_ID` |
| 04 Path | **Graf temporal amb bifurcacions** (estudis amunt, feina avall, estades com a llaços, fites) | `cv.experiences`, `cv.education`, `copy.js` `s4.events` |
| 05 Full experience | Descàrrega dels 2 CVs · totes les etapes (acordió) · Methodologies · Tech stack · Languages · Books · Publication · Education | `cv.*`, `copy.js` (`dl`, `methods`, `tools`, `books`, `pub`) |
| Footer | Contacte, LinkedIn, GitHub, els 2 CVs, epígraf, colofó (Cala Marquesa 🐾) | `copy.js` `footer`, `colophon` |

Targetes (ordre de `SELECTED`): `cvHunter`, `sensorlab`, `swissGov`, `retail`, `pedretes`, `logistic`, `rovello`,
`puppyTracker`, `whosWho`. A `translations.js` hi ha més projectes definits que no surten a la web (`labm`, `farma`,
`elMeuEspai`, `dietaripa`, `xina`, `receptes`, `zuriKreislauf`, `trackerLab`) però es poden usar al CV.

Rutes (`src/App.js`, per hash):

| Hash | Què mostra |
|---|---|
| *(cap)* | Redisseny editorial (web pública) |
| `#secret` | CV builder privat |
| `#secret2` | Nota de mercat «AI Engineer a Suïssa» (`SwissAiMarket.jsx`), no enllaçada enlloc |
| `#legacy` | Web antiga (components Tailwind de `src/components/`) |

## 2. Arquitectura i fitxers clau

```
src/App.js                          routing per hash
src/redesign/RedesignApp.jsx        tota la pàgina + visuals SVG (DataSurface, ChordOrbital, Viz<Projecte>, CareerMap), modal, CvDownloads
src/redesign/HeroFigure.jsx         cicle de partícules del hero (canvas; halftone de la foto; formes animades)
src/redesign/FlowField.jsx          camp de partícules de fons del hero
src/redesign/SwissAiMarket.jsx      nota de mercat (#secret2): article en català amb taules, estils inline
src/redesign/copy.js                copy editorial en 6 idiomes (RD[lang]) — TOT el text de seccions viu aquí
src/redesign/redesign.css           estils (scoped a .rd): grid 12 col, targetes, modal, epígrafs, responsive
src/translations/translations.js    dades: CV (6 idiomes), projectes (META + TEXTS + BRIEFS), CV_VARIANTS, applyCvVariant
src/components/CvDocument.js        PDF del CV (@react-pdf/renderer); filtra `siteOnly`; 1 o 2 projectes destacats
src/components/CvBuilderSection.js  builder privat (#secret)
public/index.html                   meta OG/Twitter (og-image.png), favicons (favicon.svg + PNG)
public/cv/*.pdf                     els 2 CVs descarregables (generats, no editar a mà)
public/puppy-tracker.html           demo pública de Puppy Tracker (HTML sol, amb esquelet i viewport)
public/elmeuespai.html              demo pública d'El meu espai
scripts/render_cv.cjs               CV → PDF sense navegador
scripts/render_letter.cjs           carta de presentació → PDF, mateix estil que el CV
scripts/build_public_cvs.cjs        regenera public/cv/ (editorial + ATS)
scripts/render_viz.cjs              gràfics de les targetes → SVG
scripts/render_map.cjs              mapa de carrera → SVG
docs/PROJECT_LOG.md, CLAUDE.md      aquest log i les regles curtes
```

Conceptes:

- **`siteOnly: true`** en una experiència → surt a la web (secció 05) però **no** al PDF (ha de cabre en 1 pàgina) ni
  com a branca al mapa (ja hi és com a llaç via `s4.events`).
- **`PROJECT_BRIEFS[lang][id]`**: `{question, did, result, next, credit?}`; els idiomes sense brief cauen a l'anglès.
- **`s4.events`** (copy.js): esdeveniments del mapa que no són al CV: `trip` (llaç), `work` curt (< 0,5 anys → llaç),
  `study`, `life` (fita amb línia guia), `pub` (rombe enllaçat), `pet` (petjada). Temps en anys decimals (2013.45 = juny 2013).
- **Targetes**: `SELECTED` decideix quines i en quin ordre; `VIZ_BY_ID` assigna el gràfic SVG propi (fallback genèric).
  Un projecte amb `link: null` i `repo: null` no mostra barra d'accions al modal.
- **Modal de projecte**: `.box` = flex en columna amb `max-height` en `dvh`; `.mbody` fa scroll; `.acts` queda fixa a baix.
  En obrir-se bloqueja l'scroll del `body` i mou el focus al botó de tancar.

### CV_VARIANTS (`translations.js`)

Cada variant reenfoca summary, mètodes i ordre d'estudis; l'experiència no canvia. La web aplica `fde`.

| id | Enfocament |
|---|---|
| `""` | Base general |
| `consumer` | Consumer insights i marketing science |
| `industrial` | Analítica industrial i de procés (anomalies, validació, pipelines en producció) |
| `dataeng` | Data / analytics engineering, product ownership de productes de dades |
| `fde` | Forward deployed / solutions (el que mostra la web) |
| `aiplatform` | GenAI i RAG en producció, backend, guardrails |
| `dataai` | Plataforma de dades + Power BI + forecasting + GenAI + governança |
| `automation` | **IA i automatització de processos in-house** (el relat actual) |
| `aisolutions` | IA in-house en una entitat financera: del cas d'ús a producció |
| `enablement` | Adopció d'IA: formació, casos d'ús, canvi (esmenta la docència a la UOC) |
| `datagov` | Governança i qualitat de dades, gestió del coneixement amb IA (extracció, cerca, adopció) |
| `riskaudit` | Risc, controls i analítica d'auditoria amb dades i IA |
| `mktauto` | CRM, automatització de màrqueting i IA |

### Generació de CV i cartes

- `CvDocument` accepta `featuredProject` (un, descripció sencera + stack) o `featuredProjects` (dos o més: entrades
  compactes amb les **dues primeres frases** i l'stack a la línia de meta).
- `MOTIVATION="…"` (variable d'entorn de `render_cv.cjs`) afegeix un paràgraf en cursiva sota el summary. **Amb dos
  projectes no hi cap** si es vol una pàgina.
- Cartes: `render_letter.cjs` llegeix un JSON `{signature, subtitle, contactLine, date, recipient[], subject, salutation,
  paragraphs[], portfolioLine, closing, accent}` i en fa un A4 d'una pàgina. Els JSON es guarden fora del repo.
- CVs públics: `build_public_cvs.cjs` genera l'editorial (columna fosca, marca de nodes, cita del peu) i l'ATS (una
  columna, sense foto ni gràfics, guions i barres verticals, URLs en text pla), tots dos des de `english` + `fde`.
- Tots els PDFs fan servir fonts estàndard (Helvetica/Courier, codificació WinAnsi): **cap fletxa `→` ni glif exòtic**.

## 3. Decisions (i per què)

- **Redisseny = home pública des del 29-09-2026**; l'antiga es conserva (`legacy-site`, `#legacy`) per historial.
- **Copy en fitxer propi (`copy.js`)** i no a `translations.js`: separa dades (CV/projectes) de text editorial.
- **Tot el gràfic és SVG/canvas determinista** (sense `Math.random` als SVG) per evitar diferències entre renders.
- **PDF sempre 1 pàgina**: es verifica amb pypdf; per això les etapes curtes són `siteOnly` i els dos projectes van compactes.
- **Hero**: després de moltes iteracions (foto lateral → halftone → capçalera → centrat), el cicle de partícules *in situ*
  sobre el retrat és la versió aprovada. Es pausa quan la pestanya no és visible: és normal.
- **Mapa de carrera** amb eix de temps real i vies per solapament. Dates: nascuda 1997 → França 2013 (abans del grau),
  Itàlia estius 2014/2015, Xina 2016, UOC tardor 2021, Zürich 2022, Caleta agost 2026. En mòbil té amplada fixa (960 px) i scroll lateral.
- **Methodologies en clau de negoci**; l'*Expertise* de la secció 01 és el vessant tècnic.
- **Tech stack de la web** és juganer ("Anything — with a little help from Claudia" + 5 eines); el del PDF és el tècnic.
- **9 targetes → 3 columnes** (3×3). Cafgic sense enllaç perquè el codi és privat.
- **Dos CVs descarregables** (consell extern): un amb el disseny de la web i un per a sistemes de selecció automàtica.
- **Dos projectes al CV** quan la Gemma ho demana; **LabM no s'usa** com a projecte destacat (decisió seva).
- **Cartes honestes**: cada carta diu obertament el que no té (anys, eina concreta, nivell d'alemany B2). És criteri de la Gemma.
- **Analítica de visites: no instal·lada.** Es va proposar (comptador sense galetes + etiqueta `?ref=` als enllaços dels
  CVs) i es va començar a muntar per error; la Gemma va dir que no i es va desfer tot. No tornar-hi sense que ho demani.
- **Nota de mercat a `#secret2`** en lloc d'un HTML solt: hereta fonts i colors, i no surt al menú.
- **`projects/` (1,1 GB de material local, Keynote inclòs) mai a git** — vegeu §6.

## 4. Com treballar-hi

```bash
npm start                              # dev server (CRA) a /CarearCapital/ ; #secret, #secret2, #legacy
CI=true npx react-scripts build        # build de producció (ha de dir "Compiled successfully.")
npm run deploy                         # build + publica build/ a gh-pages → web viva (1–3 min; CDN cacheja 10 min)
git branch -f portfolio-redesign main && git push origin main portfolio-redesign

# CV → PDF (variant, projecte o "id1,id2", empresa, títol, idioma). MOTIVATION="…" només amb 1 projecte.
node scripts/render_cv.cjs OUT.pdf automation cvHunter,pedretes "Empresa" "Títol del rol" english
# carta → PDF (JSON amb els camps de §2)
node scripts/render_letter.cjs carta.json OUT.pdf
# CVs públics de la web (després de qualsevol canvi al CV); comprovar 1 pàgina cadascun
node scripts/build_public_cvs.cjs
# gràfic d'una targeta o el mapa → SVG ; rasteritzar amb: qlmanage -t -s 1400 -o DIR fitxer
node scripts/render_viz.cjs DIR VizPedretes
node scripts/render_map.cjs DIR
```

Comptar pàgines: `python -c "from pypdf import PdfReader; print(len(PdfReader('OUT.pdf').pages))"` (cal un venv amb
`pypdf`; a la sessió del 29–30/09 era a `…/scratchpad/v3/bin/python`). Alternativa sense Python: `mdls -name kMDItemNumberOfPages OUT.pdf`.

**Verificació després d'un canvi a la web**: build OK → (si toca el CV) render headless + 1 pàgina → `npm run deploy` →
confirmar que la web viva serveix el bundle nou:

```bash
curl -s https://gemmagf.github.io/CarearCapital/ | grep -o 'static/js/main\.[a-z0-9]*\.js'
```

**Verificació en mòbil** (navegador de l'app): `resize_window` preset `mobile` (375×812) i mesurar amb JavaScript
(`getBoundingClientRect`, `scrollWidth`): modal dins del viewport, accions visibles, cap desbordament horitzontal.
Les captures només funcionen si el panell del navegador és visible.

**Recepta per a un CV a mida** (segons s'ha fet servir): llegir l'anunci sencer → triar variant i dos projectes →
`render_cv.cjs` → comprovar 1 pàgina (si en surten 2, canviar el segon projecte per un de descripció curta, p. ex.
`cvHunter`, o treure `MOTIVATION`) → mirar el PDF rasteritzat → carta amb `render_letter.cjs` en l'idioma de l'anunci.
Els fitxers surten a `~/Downloads` amb el patró `CV_Gemma_Garcia_<Empresa>_<Rol>.pdf` i
`Cover_Letter_…` / `Motivationsschreiben_…` / `Lettre_Motivation_…`.

**Recollir ofertes per a la nota de mercat**: cerca pública de LinkedIn
(`linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=…&location=…&f_TPR=r2592000&start=N`, detall a
`…/jobPosting/<id>`) amb `fetch` des de la mateixa pàgina i **≥ 5 s entre crides** (més ràpid → 429 durant minuts).
Classificació per regex de títol i d'empresa. Les empreses que paguen més publiquen a la seva pròpia web.

## 5. Evolució (fases)

| Data | Fase | Commits clau |
|---|---|---|
| 2025-08 → 2026-05 | Web original (React + Tailwind): home, CV, projectes, contacte; builder secret | `1f65b07`, `7b26e47` (= `legacy-site`) |
| 2026-07-20 | Recuperació del codi font des del sourcemap de gh-pages; CV variants; etiquetes d'idiomes en paraules | `4e111c0` |
| 2026-08-07 | CV d'una pàgina, títols del PDF localitzats, Swiss Governance com a projecte líder | `cac65cc`…`002dd1d` |
| 2026-08-30 | Projectes El meu espai i Puppy Tracker; fora l'app d'alemany | `eeadcbc`, `58e9e5b` |
| 2026-08-31 → 09-17 | **Redisseny editorial** (branca `portfolio-redesign`): sistema, flow-field, viz, GSAP; iteracions del hero i compactació | `c8bde95`, `9998cb4`, `ef48d09`, `77587e0` |
| 2026-09-27/28 | Reposicionament **FDE**: variant `fde`, stack real, copy nou; gràfics propis per projecte; mapa enriquit | `d2c6527`, `616cc48` |
| 2026-09-29 matí | Hero final (cicle de partícules in situ); modal amb briefs; Swiss Governance a la targeta | `e62c824`, `a54229c`, `2624e7e` |
| 2026-09-29 | **El redisseny passa a ser la web pública**; i18n complet; favicon i og-image; `legacy-site`; historial reescrit per treure `projects/` | `c6d874b`, `4e0afc7` |
| 2026-09-29 | Rovelló, Puppy Tracker (demo), Who's Who; graf de carrera amb bifurcacions; epígrafs, llibres, publicació; totes les etapes a la 05; methodologies de negoci | `b9236e6`…`b57dee2` |
| 2026-09-29 16:07 | **Aquest log + `CLAUDE.md`**; scripts headless al repo | `86dff1e` |
| 2026-09-29 16:38 | Variants `aiplatform` i `dataai`; **`render_letter.cjs`** (cartes d'una pàgina) | `83b9cb8` |
| 2026-09-29 17:31 | **Pedretes** i **Coffee Logistics** (9 targetes, 3 columnes, gràfics propis, 6 idiomes); **2 CVs descarregables** (`build_public_cvs.cjs`); `render_viz.cjs` | `75bbf81` |
| 2026-09-30 11:26 | **Revisió mòbil completa**: modal amb scroll i accions fixes, acordió, barra superior, mapa amb scroll lateral, focus i mides tàctils; demo Puppy Tracker amb esquelet HTML i viewport | `df7a340` |
| 2026-09-30 13:06 | **CV amb dos projectes destacats** (`featuredProjects`, ids separats per coma) | `8ff8bbc` |
| 2026-09-30 13:18 → 16:26 | **Canvi d'objectiu a rol in-house**; variants `automation`, `mktauto`, `riskaudit`, `aisolutions`, `enablement` | `15dc56d`, `7d1634b`, `1ed1885`, `1323df5` |
| 2026-09-30 21:43 | Ruta **`#secret2`**: nota de mercat «AI Engineer a Suïssa» | `9e46428` |
| 2026-09-30 22:39 | Nota reescrita amb **mostra real** (405 ofertes de LinkedIn) | `5ef16cf` |
| 2026-10-02 | Log exhaustiu, regles de privacitat, data de la nota corregida | *(aquest commit)* |

## 6. Trampes conegudes (llegir abans de tocar res)

Git i fitxers
- **`projects/` és a `.gitignore` i no s'ha de commitejar mai.** Un commit el va afegir per error (Keynote de 304 MB) i GitHub
  rebutja fitxers > 100 MB; es va reescriure l'historial (tag local `backup/pre-projects-strip` = tip antic). En reescriure,
  git va esborrar els fitxers del disc i es van restaurar amb `git archive` — no repetir.
- **`.claude/worktrees/*` i `.claude/launch.json` apareixen com a modificats**: ignorar-los; `git add` sempre amb rutes explícites.
- **El repo és públic**: res de candidatures, sous ni dades personals als fitxers ni als missatges de commit.
- Commits: `Co-Authored-By: Claude …` al final segons la convenció de la sessió.

Codi
- **Scripts que editen `translations.js` per idioma**: hi ha **dos** blocs per idioma (`PROJECT_TEXTS` i l'objecte
  `translations`) i un tercer a `PROJECT_BRIEFS`; ancorar la cerca al bloc correcte. Ja va passar que tres etapes noves anessin totes al bloc català.
- **`sed` de macOS** no entén `\b`; usar patrons amb espais o Python.
- **Cometes tipogràfiques dins de JSX**: escriure els caràcters reals o `{"“"}`.
- **CSS responsive**: l'últim bloc `@media (max-width: 820px)` de `redesign.css` ha de quedar al final del fitxer
  (sobreescriu regles declarades després del bloc responsive principal). Qualsevol popup nou ha de seguir el patró del modal.
- **Pàgines HTML soltes a `public/`**: han de portar `<!doctype html>`, `<meta charset>` i `<meta name="viewport">`. Dins de
  grids/flex, una fila amb `overflow-x:auto` necessita `min-width:0` als pares o eixampla el contenidor.

PDF
- **Glifs fora de WinAnsi** (fletxes, alguns símbols) surten com un apòstrof: revisar sempre el PDF rasteritzat.
- **2 pàgines**: passa amb dos projectes de descripció llarga (`sensorlab`, `swissGov`) o amb `MOTIVATION`. Canviar el segon projecte o treure el paràgraf.
- **Regenerar `public/cv/`** quan canviï el CV; els PDFs públics no s'actualitzen sols.

Eines i xarxa
- **GitHub Pages**: `cache-control: max-age=600` → després de desplegar, recarregar fort o esperar 10 minuts.
- **Panell del navegador de l'app**: si està amagat, les captures fallen, les transicions CSS no avancen i alguns scripts es
  pengen (fins a 300 s). Fer servir pestanyes en segon pla per no trepitjar la de la Gemma.
- **Lector ràpid d'URLs (WebFetch)**: dona 403 a molts portals d'ocupació, i a les webs de carreres amb Phenom
  (Roche, Sunrise) retorna «plaça tancada» encara que no ho estigui. Confirmar al navegador abans d'afirmar-ho.
- **LinkedIn públic**: 429 si es fan crides seguides; un cop bloquejat, dura minuts.
- **Streamlit** (Sensorlab, LabM, Farma, Tracker Lab): dormen si ningú els obre.

Manera de treballar
- **No començar a construir sobre una resposta curta i ambigua.** Si la Gemma respon amb dues paraules a una proposta,
  explicar-ho primer en senzill i esperar un sí clar.
- **Dates**: fiar-se del rellotge de la màquina (`date`) i de les dates de git, no de suposicions. Una carta i la nota de
  mercat van sortir datades un dia endavant per això.

## 7. Pendents

1. **Decidir el relat de la web**: avui diu *Forward Deployed*; l'objectiu real és IA i automatització in-house. Si es
   canvia: `copy.js` (labels, intro, summary, s1–s3 en 6 idiomes), variant aplicada a `RedesignApp.jsx` (`fde` → `automation`)
   i `build_public_cvs.cjs` (títol de l'editorial i de l'ATS).
2. **Historial públic**: decidir si es purguen les mencions d'empreses i sou de versions antigues d'aquest log i de
   missatges de commit (cal reescriure l'historial i forçar el push; destructiu).
3. Vídeos o captures reals dels projectes ⭐ (`CASE_IMAGES` a `RedesignApp.jsx` → `public/images/projects/proj_<id>.jpg`).
4. Gràfics de les seccions 01 i 02 en mòbil: s'encongeixen a l'amplada i les etiquetes queden petites. Opció: scroll lateral com el mapa.
5. Cafgic: si s'obre el repo o es publica la demo, posar l'URL a `PROJECT_META.logistic` (ara `link: null`).
6. Keep-alive dels Streamlit (GitHub Action cron) o vídeo a les targetes.
7. Swiss Governance: quan la branca `asset-drilldown` del cockpit arribi a `main` i es desplegui, actualitzar descripció i enllaç.
8. Analítica de visites: en espera; només si la Gemma ho demana (§3).
9. Detalls: *Expertise* (01) en clau de negoci; etiquetes de Google/KH prop de l'eix del mapa (`H` de `CareerMap`);
   favicon i dades Open Graph de `puppy-tracker.html`.

## 8. Diari de canvis

- **2026-10-02 (tarda)** — Variant de CV `datagov` (governança i qualitat de dades + gestió del coneixement amb IA); ja en són 13.
  Verificada amb `render_cv.cjs … datagov cvHunter,pedretes`: 1 pàgina (amb `cvHunter,swissGov` no hi cap).
- **2026-10-02** — Log reescrit de dalt a baix (rutes, variants, scripts, receptes, evolució amb commits, trampes, pendents).
  Regla de privacitat: el repo és públic, les candidatures van a la memòria privada. `CLAUDE.md` actualitzat. Data de la
  nota de mercat corregida (es va escriure el 30-09 i deia 1-10).
- **2026-09-30 (22:39)** — `#secret2` reescrita amb mostra real: 405 ofertes de LinkedIn dels trenta dies anteriors, vuit
  ciutats, sis cerques; 199 rellevants, 156 llegides. Resultats: 41 % AI/LLM application engineer, 18 % ML, 11 % in-house
  enablement/automation, 10 % forward-deployed; 59 % publicades per empreses, 26 % per consultores; mediana de 81 candidats
  per oferta (Espanya, 67), 43 % amb més de 100; sou publicat al 2 %; cal alemany al 45 % a la Suïssa alemanya i al 73 %
  dels rols in-house d'automatització; anys demanats, mediana 5 (empreses 4, consultores 7).
- **2026-09-30 (21:43)** — Ruta amagada `#secret2` (`SwissAiMarket.jsx`): nota de mercat en català amb format d'article i taules.
- **2026-09-30 (tarda)** — Variants de CV `automation`, `mktauto`, `riskaudit`, `aisolutions`, `enablement`. Canvi d'objectiu
  professional cap a un rol in-house. LabM fora dels CVs.
- **2026-09-30 (13:06)** — CV amb dos projectes destacats: `CvDocument` accepta `featuredProjects`; `render_cv.cjs` accepta `id1,id2`.
- **2026-09-30 (11:26)** — **Revisió mòbil completa.** Modal de projecte amb `max-height` en `dvh`, cos amb scroll i accions
  fixes, full inferior a ≤ 820 px, bloqueig de l'scroll del `body`, `role="dialog"`, focus al botó de tancar. Acordió
  d'experiència: `max-height` 400 → 1600 px. Barra superior en mòbil: `position:absolute`, enllaços de secció visibles, botons
  d'idioma de 40 px. Mapa de carrera: 960 px amb scroll lateral i pista `← →`. Targetes: 2 columnes fins a 560 px, 1 per sota.
  Epígrafs que ja no es tallen, anell de focus, enllaços de mida de dit. Tret el «+» de la llista d'Expertise.
  `public/puppy-tracker.html`: esquelet HTML complet i viewport (abans el mòbil la mostrava encongida); la fila de
  sub-pestanyes ja no eixampla el telèfon (`min-width:0`, `minmax(0,1fr)`); demo primer en mòbil, botó «Try the demo ↓»,
  sub-pestanyes en dues files, alçada en `dvh`, àrees tàctils ampliades. Verificat a 375×812 i 1440×900 amb mesures DOM
  (9/9 modals amb accions visibles, 0 desbordaments).
- **2026-09-29 (17:31)** — Projectes **Pedretes** (gestor d'obrador de joieria: preu de l'or en viu, ofertes PDF suïsses,
  Supabase, demo pública per oficis) i **Coffee Logistics / Cafgic** (operativa multi-local de cafeteries; codi privat →
  `link: null`). 9 targetes en 3 columnes; `VizPedretes`, `VizCafgic`; textos i briefs en 6 idiomes. **Dos CVs
  descarregables** a `public/cv/` (editorial + ATS) amb enllaços a la secció 05 i al peu (`CvDownloads`, copy `dl`).
  `scripts/build_public_cvs.cjs`, `scripts/render_viz.cjs`.
- **2026-09-29 (16:38)** — Variants `aiplatform` i `dataai`; `scripts/render_letter.cjs`.
- **2026-09-29 (16:07)** — Primer `PROJECT_LOG.md` i `CLAUDE.md`; `scripts/render_cv.cjs` i `render_map.cjs` al repo.
- **2026-09-29** — Redisseny publicat com a home; i18n complet; favicon i og-image; `legacy-site`; historial net de `projects/`.
  Targetes Rovelló, Puppy Tracker (demo), Who's Who. Modal amb briefs (6 idiomes) i crèdits. Graf de carrera amb
  bifurcacions, estades (2013–2016), UOC/ForceManager/Additius com a llaços, article Elsevier (DOI), trasllat a Zürich,
  Caleta. Secció 05: 7 etapes (3 `siteOnly`), methodologies de negoci, tools juganer, llibres enllaçats, publicació.
  Epígrafs per secció; peu "Being kind is harder than being smart. Let's try hard things together." + colofó de Cala Marquesa.
- **2026-09-28** — Reposicionament FDE (variant `fde`, stack real, copy, impact amb proves); gràfics propis per projecte;
  wave, xarxa i mapa enriquits; brief per a la sessió del cockpit de Swiss Governance.
- **2026-09-07 → 17** — Iteracions del hero i compactació de seccions segons el mock.
- **2026-08-31** — Inici del redisseny (branca `portfolio-redesign`).
- **2026-07/08** — Recuperació del codi, CV variants, PDF d'una pàgina, projectes nous.
