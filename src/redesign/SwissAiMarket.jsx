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
          El mateix exercici que nothiring.me va fer per a Espanya, repetit a mà per a Zúric, Zug i Ginebra:
          què s'amaga darrere del títol, qui publica, quant es paga i per què costa entrar-hi.
        </p>
        <p style={S.meta}>Gemma Garcia de la Fuente · 1 d'octubre de 2026 · mostra petita: ordres de magnitud, no estadística</p>

        <h2 style={S.h2}>Un títol, quatre feines</h2>
        <p style={S.p}>
          A Espanya, nothiring troba que "AI Engineer" agrupa quatre rols diferents. A Suïssa passa el mateix, amb un matís:
          la quarta categoria, la que treballa colze a colze amb el negoci, existeix en dues versions que no es paguen ni es viuen igual.
        </p>
        <Table
          head={["Tipus", "Què fa", "Qui el publica aquí", "Exemples oberts aquesta setmana"]}
          rows={[
            ["ML Engineer", "Entrena models i els posa en producció", "Industrials, pharma", "Kanadevia Inova, Holcim, Accelleron"],
            ["AI Platform Engineer", "RAG, agents, infraestructura al núvol", "Grans corporacions", "Siemens (Zug), Swiss Life, Partners Group"],
            ["LLM Application Engineer", "Productes sobre models externs, amb dades de la casa", "Bancs, asseguradores, scale-ups", "Partners Group, Unique, DeepJudge"],
            [<span style={S.strong}>Forward-deployed</span>, "Desplegat a casa del client pel proveïdor d'IA", "Proveïdors d'IA i SaaS", "Salesforce, Google Cloud, Unique, DeepJudge"],
            [<span style={S.strong}>AI enablement / automation in-house</span>, "El mateix ofici, però en nòmina de l'empresa", "Empreses mitjanes i grans que es modernitzen", "Rittmeyer, AMAG, VZ, SwissComply, Aman"],
          ]}
        />
        <div style={S.callout}>
          La cinquena fila és la novetat suïssa: empreses que no venen IA a ningú contracten algú que la implanti a dins.
          En una setmana n'he trobat sis en obert entre Zug, Zúric i Ginebra. Gairebé totes demanen alemany.
        </div>

        <h2 style={S.h2}>Sous: el que diuen les fonts i el que diuen els anuncis</h2>
        <p style={S.p}>Les medianes públiques es contradiuen segons qui respon a l'enquesta:</p>
        <Table
          head={["Font", "AI / ML Engineer, Zúric", "Comentari"]}
          rows={[
            ["Glassdoor", "112.000 CHF (99–154k)", "Molts perfils júnior"],
            ["levels.fyi", "134.000–149.000 CHF", "Pesen Google, Meta i similars"],
            ["CompVerdict", "153.000 CHF (128–183k), 3–5 anys", "Mostra petita"],
          ]}
        />
        <p style={S.p}>Més fiables són les forquilles que publiquen les mateixes empreses, tot i que són poques:</p>
        <Table
          head={["Tipus d'empresa", "Forquilla vista", "D'on surt"]}
          rows={[
            ["Pharma i grans corporacions", "126.000–173.000 CHF", "Takeda, rang publicat a l'anunci"],
            ["Proveïdor d'IA, forward-deployed", "120.000–170.000 CHF", "Glassdoor, FDE a Zúric"],
            ["Scale-up suïssa d'IA", "120.000–160.000 CHF + equity", "Estimació (Unique, DeepJudge)"],
            ["Industrial mitjana, rol intern", "100.000–130.000 CHF", "swissdevjobs; sostre 130–155k per a ML Engineer"],
            ["Consultora i body leasing", "110.000–140.000 CHF", "Estimació (ERNI, ti&m, Eraneos)"],
            ["Administració pública", "100.000–130.000 CHF", "Barems cantonals"],
          ]}
        />
        <p style={S.p}>
          La bretxa consultora–producte que nothiring mesura a Espanya (19.600 €) també hi és. Però a Suïssa la partició que mana
          no és aquesta, és el <span style={S.strong}>sector</span>: finances, pharma i multinacionals paguen 140.000 i més per un
          perfil amb quatre o cinc anys; indústria mitjana, retail i sector públic, rarament.
        </p>
        <p style={S.p}>
          Per a referència: el sostre espanyol de l'article (100.000–130.000 €, sis ofertes de 476) és aquí la part baixa de la taula.
        </p>

        <h2 style={S.h2}>Demanda i competència</h2>
        <ul style={S.ul}>
          <li><span style={S.strong}>Volum</span>: unes 400 ofertes d'IA obertes a tot Suïssa, unes 200 a l'àrea de Zúric (Glassdoor, setembre de 2026). En un rastreig de trenta dies a Zug, Schwyz i Ginebra: 127 ofertes amb dades o IA al títol.</li>
          <li><span style={S.strong}>Qui publica</span>: com a Espanya, consultores i intermediaris són majoria, prop de la meitat de les 127. Les empreses que paguen més publiquen a la seva web i sovint no surten als portals.</li>
          <li><span style={S.strong}>Competència</span>: molt menor que a Espanya. Un anunci amb 10 candidats en sis dies és normal; la mediana espanyola és 67. No tinc prou dades per donar una mediana suïssa.</li>
        </ul>

        <h2 style={S.h2}>El filtre real: idioma i anys</h2>
        <p style={S.p}>
          A Espanya el coll d'ampolla és la quantitat de candidats. A Suïssa és un altre. Dels rols interns d'automatització i IA
          en empreses suïsses mitjanes llegits sencers aquesta setmana, tots menys tres demanaven alemany fluent o natiu.
          Els que accepten només anglès són tres tipus: grans corporacions, scale-ups d'IA i Ginebra, en francès.
        </p>
        <p style={S.p}>
          El segon filtre són els anys: els rols que paguen 140.000 i més demanen entre 5 i 8 anys d'experiència.
          El títol sènior s'atorga per anys, no per abast.
        </p>
        <div style={S.callout}>
          En una frase: a Suïssa el problema no és que hi hagi poques ofertes ni massa candidats. És que la meitat de les bones
          demanen alemany i l'altra meitat demanen anys.
        </div>

        <h2 style={S.h2}>Metodologia i límits</h2>
        <ul style={S.ul}>
          <li>Rastreig manual de jobs.ch, jobup.ch, la cerca pública de LinkedIn i les webs de carreres de 25 empreses, 29 i 30 de setembre de 2026.</li>
          <li>Sous: forquilles publicades als anuncis quan n'hi ha; si no, Glassdoor, levels.fyi, CompVerdict i swissdevjobs. Les estimacions marcades com a tals són pròpies.</li>
          <li>Mostres petites: una sola oferta pot moure una forquilla. Cap xifra d'aquí és un valor de mercat contrastat.</li>
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
