# CLAUDE.md — CarearCapital (portfoli de la Gemma)

**Llegeix primer `docs/PROJECT_LOG.md`** (context, arquitectura, decisions, com verificar/desplegar, trampes, pendents)
i **actualitza'l a cada canvi** (secció "Diari de canvis" + el que calgui de §2–§7). La Gemma continua la feina en
sessions diferents i el log és l'únic fil.

Regles curtes:
- La web pública és el redisseny (`src/redesign/`); `#secret` = CV builder; `#legacy` = web antiga (també a la branca `legacy-site`).
- Text editorial → `src/redesign/copy.js` (6 idiomes). Dades (CV, projectes, briefs) → `src/translations/translations.js`.
- El PDF ha de cabre en **1 pàgina**: verificar amb `node scripts/render_cv.cjs /tmp/cv.pdf fde cvHunter` + pypdf. Etapes curtes → `siteOnly: true`.
- **Mai** afegir `projects/` a git (està a `.gitignore`). `git add` sempre amb rutes explícites (ignorar `.claude/worktrees/*`).
- Desplegar: `npm run deploy` (gh-pages). Després, `git branch -f portfolio-redesign main && git push origin main portfolio-redesign`.
- Verificació sense navegador: `scripts/render_cv.cjs` (PDF) i `scripts/render_map.cjs` (mapa de carrera → SVG).
- To amb la Gemma: dada + següent pas, sense sermons; respondre en català.
