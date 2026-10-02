# CLAUDE.md — CarearCapital (portfoli de la Gemma)

**Llegeix primer `docs/PROJECT_LOG.md`** (context, arquitectura, decisions, receptes, evolució, trampes, pendents)
i **actualitza'l a cada canvi** (secció "Diari de canvis" + el que calgui de §1–§7). La Gemma continua la feina en
sessions diferents i el log és l'únic fil.

Regles curtes:
- **El repo és públic.** Res de candidatures, empreses, sous ni dades personals als fitxers ni als missatges de commit.
  Aquest detall va a la memòria privada (`job_pipeline.md`), no a git.
- Rutes: arrel = redisseny (`src/redesign/`) · `#secret` = CV builder · `#secret2` = nota de mercat · `#legacy` = web antiga (també a la branca `legacy-site`).
- Text editorial → `src/redesign/copy.js` (6 idiomes). Dades (CV, projectes, briefs, variants) → `src/translations/translations.js`.
- El PDF ha de cabre en **1 pàgina**: `node scripts/render_cv.cjs OUT.pdf <variant> <id1,id2> "Empresa" "Títol"` + comptar pàgines. Etapes curtes → `siteOnly: true`. Cap fletxa ni glif fora de WinAnsi.
- Si canvia el CV: `node scripts/build_public_cvs.cjs` (regenera `public/cv/`, 1 pàgina cadascun).
- **Mai** afegir `projects/` a git (és a `.gitignore`). `git add` sempre amb rutes explícites (ignorar `.claude/worktrees/*` i `.claude/launch.json`).
- Desplegar: `npm run deploy` (gh-pages). Després, `git branch -f portfolio-redesign main && git push origin main portfolio-redesign`, i confirmar el bundle nou a la web viva.
- Verificació sense navegador: `scripts/render_cv.cjs`, `render_letter.cjs`, `render_viz.cjs`, `render_map.cjs`. En mòbil: viewport 375×812 i mesures DOM.
- **No construir res sobre una resposta curta i ambigua**: explicar primer en senzill i esperar un sí clar. Si la Gemma diu que no, desfer-ho tot.
- To amb la Gemma: dada + següent pas, sense sermons; respondre en català; respostes curtes.
