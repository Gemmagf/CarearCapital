import React from "react";
import "./redesign.css";

// #secret2 — a short, shareable note: the nothiring.me "AI Engineer en España" exercise redone for
// Switzerland (Zürich, Zug, Geneva). Not linked from the site; shared by URL only.
// Numbers come from a one-week hand sweep of jobs.ch, LinkedIn and company career sites
// (29–30 Sep 2026) plus public salary aggregators. Small samples: orders of magnitude, not statistics.

const S = {
  page: { fontFamily: "var(--sans)", background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" },
  wrap: { width: "min(92vw, 780px)", margin: "0 auto", padding: "56px 0 80px" },
  kicker: { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink-dark)" },
  h1: { fontFamily: "var(--display)", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(34px, 6vw, 60px)", lineHeight: 0.96, margin: "12px 0 18px" },
  lede: { fontSize: 18, lineHeight: 1.5, color: "var(--ink-soft)", maxWidth: "60ch", margin: "0 0 10px" },
  meta: { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--ink-soft)", margin: "0 0 36px" },
  h2: { fontFamily: "var(--display)", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1, margin: "44px 0 14px", paddingTop: 18, borderTop: "2px solid var(--ink)" },
  p: { fontSize: 15.5, lineHeight: 1.6, margin: "0 0 14px", maxWidth: "68ch" },
  ul: { fontSize: 15.5, lineHeight: 1.55, paddingLeft: 20, margin: "0 0 14px", maxWidth: "68ch" },
  tableWrap: { overflowX: "auto", margin: "16px 0 22px" },
  table: { borderCollapse: "collapse", width: "100%", fontSize: 14, lineHeight: 1.4 },
  th: { textAlign: "left", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pink-dark)", padding: "8px 10px 8px 0", borderBottom: "1px solid var(--ink)", verticalAlign: "bottom" },
  td: { padding: "9px 10px 9px 0", borderBottom: "1px solid var(--line)", verticalAlign: "top" },
  strong: { fontWeight: 700 },
  callout: { borderLeft: "3px solid var(--pink)", padding: "10px 16px", margin: "22px 0", background: "#fff", fontSize: 15.5, lineHeight: 1.55, maxWidth: "68ch" },
  note: { fontFamily: "var(--mono)", fontSize: 11.5, lineHeight: 1.6, color: "var(--ink-soft)", marginTop: 40, paddingTop: 16, borderTop: "1px solid var(--line)" },
  a: { color: "var(--pink-dark)" },
};

const Table = ({ head, rows }) => (
  <div style={S.tableWrap}>
    <table style={S.table}>
      <thead><tr>{head.map((h) => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={S.td}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

export default function SwissAiMarket() {
  return (
    <div className="rd" style={S.page}>
      <div style={S.wrap}>
        <div style={S.kicker}>Nota de mercat · Suïssa</div>
        <h1 style={S.h1}>AI Engineer a Suïssa:<br />sous, demanda i el filtre que no surt als estudis</h1>
        <p style={S.lede}>
          El mateix exercici que nothiring.me va fer per a Espanya, repetit per a Suïssa: 405 ofertes de LinkedIn dels últims
          trenta dies a vuit ciutats, 199 de rellevants per a IA i 156 llegides senceres. Què s'amaga darrere del títol, qui publica,
          quant es paga, quanta gent s'hi presenta i què et demanen de veritat.
        </p>
        <p style={S.meta}>Gemma Garcia de la Fuente · 30 de setembre de 2026 · ofertes publicades entre el 31 d'agost i el 30 de setembre de 2026</p>

        <h2 style={S.h2}>Un títol, quatre feines (i mitja)</h2>
        <p style={S.p}>
          A Espanya, nothiring troba que "AI Engineer" agrupa quatre rols diferents. A Suïssa passa el mateix, amb un matís:
          la quarta categoria, la que treballa colze a colze amb el negoci, existeix en dues versions que no es paguen ni es viuen igual.
        </p>
        <Table
          head={["Tipus", "Què fa", "Ofertes (n=199)", "Exemples oberts al setembre"]}
          rows={[
            ["AI / LLM application engineer", "Productes sobre models externs, RAG, agents", "81 · 41 %", "Partners Group, Swiss Life, Sonar, PostFinance"],
            ["ML Engineer / scientist", "Entrena models i els posa en producció", "36 · 18 %", "Kanadevia Inova, Holcim, Roche, Nestlé"],
            [<span style={S.strong}>In-house: enablement / automation / producte</span>, "El mateix ofici que un FDE, però en nòmina de l'empresa", "22 · 11 %", "Rittmeyer, AMAG, Swiss Post, BKW, Helvetia, PMI"],
            [<span style={S.strong}>Forward-deployed / customer-facing</span>, "Desplegat a casa del client pel proveïdor", "20 · 10 %", "Google Cloud, AWS, Salesforce, Unique, DeepJudge"],
            ["Data scientist / analyst", "Anàlisi i models per a decisions", "19 · 10 %", "Digitec Galaxus, UBP, FIA"],
            ["AI Platform / MLOps / data engineering", "Infraestructura perquè tot l'anterior funcioni", "15 · 8 %", "Siemens, Axpo, enshift"],
          ]}
        />
        <div style={S.callout}>
          Una de cada cinc ofertes és per a algú que fa d'enllaç entre la tecnologia i el negoci: la meitat des del proveïdor
          (forward-deployed), l'altra meitat des de dins de l'empresa (enablement, automation, transformation). La segona
          meitat gairebé no existia fa un any i és la que més demana alemany.
        </div>

        <h2 style={S.h2}>Qui publica</h2>
        <Table
          head={["Tipus de publicador", "Ofertes (n=199)", "Candidats per oferta (mediana)", "Anys demanats (mediana)"]}
          rows={[
            ["Empresa: in-house, producte o scale-up", "118 · 59 %", "97", "4"],
            ["Consultora o serveis IT", "51 · 26 %", "49", "7"],
            ["Big tech (Google, AWS, NVIDIA, Salesforce…)", "21 · 11 %", "119", "5"],
            ["Agència o headhunter", "8 · 4 %", "38", "5"],
          ]}
        />
        <p style={S.p}>
          A Espanya les consultores publiquen el 43 % de les ofertes; a Suïssa, el 26 %. Però demanen més anys que ningú (mediana 7)
          i són les que més exigeixen alemany. Els que més publiquen al setembre: adesso (11), Roche (9), Sonar (7), ERNI, Google i Deloitte (6).
        </p>

        <h2 style={S.h2}>Sous: el que diuen les fonts i el que diuen els anuncis</h2>
        <p style={S.p}>
          Només 3 de les 156 ofertes llegides publiquen el sou (2 %; a Espanya, 7 %): un lead d'ML a 140.000–150.000 CHF,
          i dos rols d'automatització a PostFinance i Swiss Post a 110.000 CHF. La resta cal inferir-la:
        </p>
        <Table
          head={["Font", "AI / ML Engineer, Zúric", "Comentari"]}
          rows={[
            ["Glassdoor", "112.000 CHF (99–154k)", "Molts perfils júnior"],
            ["levels.fyi", "134.000–149.000 CHF", "Pesen Google, Meta i similars"],
            ["CompVerdict", "153.000 CHF (128–183k), 3–5 anys", "Mostra petita"],
          ]}
        />
        <Table
          head={["Tipus d'empresa", "Forquilla observada", "D'on surt"]}
          rows={[
            ["Pharma i grans corporacions", "126.000–173.000 CHF", "Takeda, rang publicat a l'anunci"],
            ["Proveïdor d'IA, forward-deployed", "120.000–170.000 CHF", "Glassdoor, FDE a Zúric"],
            ["Scale-up suïssa d'IA", "120.000–160.000 CHF + equity", "Estimació (Unique, DeepJudge)"],
            ["Empresa pública o semipública", "110.000 CHF", "PostFinance, Swiss Post, rangs publicats"],
            ["Industrial mitjana, rol intern", "100.000–130.000 CHF", "swissdevjobs; sostre 130–155k per a ML Engineer"],
            ["Consultora i body leasing", "110.000–140.000 CHF", "Estimació (ERNI, ti&m, Eraneos)"],
          ]}
        />
        <p style={S.p}>
          La bretxa consultora–producte que nothiring mesura a Espanya (19.600 €) també hi és. Però a Suïssa la partició que mana
          no és aquesta, és el <span style={S.strong}>sector</span>: finances, pharma i multinacionals paguen 140.000 i més per un
          perfil amb quatre o cinc anys; indústria mitjana, sector públic i retail, rarament. El sostre espanyol de l'article
          (100.000–130.000 €) és aquí la part baixa de la taula.
        </p>

        <h2 style={S.h2}>Competència: més de la que sembla</h2>
        <p style={S.p}>
          LinkedIn mostra quants candidats ha rebut cada oferta. És la mateixa mètrica que fa servir nothiring, així que es pot comparar:
        </p>
        <Table
          head={["", "Suïssa (n=156)", "Espanya (nothiring)"]}
          rows={[
            ["Candidats per oferta, mediana", <span style={S.strong}>81</span>, "67"],
            ["Ofertes amb més de 100 candidats", "43 %", "37 %"],
            ["Ofertes que publiquen el sou", "2 %", "7 %"],
          ]}
        />
        <Table
          head={["Per tipus de rol", "Candidats (mediana)"]}
          rows={[
            ["Data scientist / analyst", "104"],
            ["ML Engineer / scientist", "103"],
            ["AI / LLM application engineer", "83"],
            ["Forward-deployed / customer-facing", "74"],
            ["In-house: enablement / automation / producte", "69"],
            ["AI Platform / MLOps", "43"],
          ]}
        />
        <p style={S.p}>
          Sorpresa: la competència a Suïssa és més alta que a Espanya, no més baixa. On menys gent es presenta és a la infraestructura
          i als rols interns d'automatització; on més, als títols clàssics de data scientist i ML engineer, i a les big tech (mediana 119).
        </p>

        <h2 style={S.h2}>El filtre real: idioma i anys</h2>
        <p style={S.p}>
          De les 156 ofertes llegides, el 67 % estan escrites en anglès, el 26 % en alemany i el 8 % en francès. Comptant com a
          "cal alemany" les que estan escrites en alemany o que l'exigeixen explícitament:
        </p>
        <Table
          head={["Alemany necessari", "Ofertes", "Percentatge"]}
          rows={[
            ["Tot Suïssa", "55 de 156", "35 %"],
            ["Suïssa alemanya", "53 de 118", "45 %"],
            ["Suïssa alemanya, rols in-house d'automatització i enablement", <span style={S.strong}>11 de 15</span>, <span style={S.strong}>73 %</span>],
            ["Suïssa alemanya, consultores", "19 de 23", "83 %"],
            ["Suïssa alemanya, ML engineer / scientist", "5 de 26", "19 %"],
            ["Suïssa alemanya, big tech", "2 de 16", "13 %"],
            ["Suïssa francesa, francès exigit", "5 de 36", "14 %"],
          ]}
        />
        <p style={S.p}>
          El patró és clar: com més a prop del negoci, més alemany. Els rols d'enginyeria pura es fan en anglès; els d'implantar
          IA dins d'una empresa suïssa mitjana, en alemany. Ginebra i Lausana són l'excepció: hi mana l'anglès, i el francès
          gairebé mai és eliminatori.
        </p>
        <p style={S.p}>
          Els anys: de les 71 ofertes que en concreten, la mediana és 5. Les empreses en demanen 4; les consultores, 7. Un 27 %
          demana 8 o més. El títol sènior s'atorga per anys, no per abast.
        </p>
        <div style={S.callout}>
          En una frase: a Suïssa hi ha ofertes i hi ha sou, però la meitat de les que t'acosten al negoci demanen alemany,
          i les que paguen més de 140.000 demanen més de cinc anys.
        </div>

        <h2 style={S.h2}>Metodologia i límits</h2>
        <ul style={S.ul}>
          <li>Cerca pública de LinkedIn feta el 30 de setembre de 2026 (ofertes dels trenta dies anteriors), a Zúric, Zug, Basilea, Berna, Ginebra, Lausana, Lucerna i St. Gallen (radi 15 km), amb sis cerques per ciutat: "AI engineer", "machine learning engineer", "data scientist", "AI automation", "LLM / generative AI" i "AI product owner / manager".</li>
          <li>405 ofertes úniques. Excloses les de pràctiques, estudiants, doctorats i aprenents, i les que no tenen IA, ML, dades o automatització al títol: en queden 199. De 156 se n'ha llegit el text sencer.</li>
          <li>Classificació per títol i per empresa amb regles fixes; "cal alemany" = anunci escrit en alemany o que l'exigeix explícitament. Candidats = el comptador que mostra LinkedIn, que satura a 200.</li>
          <li>Sous: forquilles publicades als anuncis quan n'hi ha (3); si no, Glassdoor, levels.fyi, CompVerdict i swissdevjobs. Les estimacions marcades com a tals són pròpies.</li>
          <li>Mostra d'un sol mes i d'un sol portal. Les empreses que paguen més sovint publiquen només a la seva web i hi estan infrarepresentades.</li>
        </ul>

        <p style={S.note}>
          Article de referència: <a style={S.a} href="https://nothiring.me/blog/roles/ai-engineer-espana" target="_blank" rel="noreferrer">nothiring.me, AI Engineer en España</a> i
          {" "}<a style={S.a} href="https://nothiring.me/blog/roles/ai-engineer-salario-espana" target="_blank" rel="noreferrer">el seu estudi de sous</a>.
          Fonts de sou: <a style={S.a} href="https://www.glassdoor.com/Salaries/z%C3%BCrich-ai-engineer-salary-SRCH_IL.0,6_IC3297851_KO7,18.htm" target="_blank" rel="noreferrer">Glassdoor</a>,
          {" "}<a style={S.a} href="https://www.levels.fyi/t/software-engineer/title/ai-engineer/locations/zurich-che" target="_blank" rel="noreferrer">levels.fyi</a>,
          {" "}<a style={S.a} href="https://compverdict.com/salary/machine-learning-engineer-salary-zurich/" target="_blank" rel="noreferrer">CompVerdict</a>,
          {" "}<a style={S.a} href="https://swissdevjobs.ch/jobs/Machine-Learning/all" target="_blank" rel="noreferrer">swissdevjobs</a>.
          {" "}<a style={S.a} href="https://gemmagf.github.io/CarearCapital/">gemmagf.github.io/CarearCapital</a>
        </p>
      </div>
    </div>
  );
}
