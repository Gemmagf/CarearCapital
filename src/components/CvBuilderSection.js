import React, { useState, useMemo } from "react";
import translations from "../translations/translations";

const ACCESS_CODE = "8004";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all bg-white";

// Default: include every section. The user toggles things OFF rather than on.
const buildDefaultSelection = (cv) => {
  const sel = {
    summaryIncluded: true,
    contactIncluded: true,
    educationIncluded: true,
    techStackIncluded: true,
    methodologiesIncluded: true,
    languagesIncluded: true,
    bullets: {},        // { "exp{i}_b{j}": true }
    experiences: {},    // { "exp{i}": true }
    techStack: {},      // { "0": true, ... }
    methodologies: {},  // { "0": true, ... }
    education: {},      // { "0": true, ... }
    languages: {},      // { "0": true, ... }
  };
  (cv.experiences || []).forEach((exp, i) => {
    sel.experiences[i] = true;
    (exp.description || []).forEach((_, j) => {
      sel.bullets[`exp${i}_b${j}`] = true;
    });
  });
  (cv.techStack || []).forEach((_, i) => { sel.techStack[i] = true; });
  (cv.methodologies || []).forEach((_, i) => { sel.methodologies[i] = true; });
  (cv.education || []).forEach((_, i) => { sel.education[i] = true; });
  (cv.languages || []).forEach((_, i) => { sel.languages[i] = true; });
  return sel;
};

const Toggle = ({ checked, onChange, children }) => (
  <label className="flex items-start gap-2 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 w-4 h-4 accent-rose-500 cursor-pointer flex-shrink-0"
    />
    <span className={`text-sm leading-snug ${checked ? "text-gray-800" : "text-gray-400 line-through"}`}>
      {children}
    </span>
  </label>
);

const SectionLabel = ({ children }) => (
  <h3 className="font-display text-lg font-bold text-rose-600 mb-3 mt-6 first:mt-0 uppercase tracking-wider">
    {children}
  </h3>
);

const CvBuilderSection = () => {
  // Auth gate
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("cv_builder_unlocked") === "1"
  );
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  const handleUnlock = (e) => {
    e.preventDefault();
    if (codeInput.trim() === ACCESS_CODE) {
      sessionStorage.setItem("cv_builder_unlocked", "1");
      setAuthed(true);
      setCodeError("");
    } else {
      setCodeError("Codi incorrecte");
    }
  };

  // Output language drives both the source data and the rendered language
  const [outputLang, setOutputLang] = useState("english");
  const cv = translations[outputLang].cv;
  const name = translations[outputLang].name;

  const [sel, setSel] = useState(() => buildDefaultSelection(cv));
  const [companyName, setCompanyName] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [customSummary, setCustomSummary] = useState("");

  // When language changes, reset selection to defaults of that language's CV
  React.useEffect(() => {
    setSel(buildDefaultSelection(cv));
    setCustomSummary("");
  }, [outputLang, cv]);

  const setBullet = (i, j, v) =>
    setSel((s) => ({ ...s, bullets: { ...s.bullets, [`exp${i}_b${j}`]: v } }));
  const setExp = (i, v) =>
    setSel((s) => ({ ...s, experiences: { ...s.experiences, [i]: v } }));
  const setTech = (i, v) =>
    setSel((s) => ({ ...s, techStack: { ...s.techStack, [i]: v } }));
  const setMeth = (i, v) =>
    setSel((s) => ({ ...s, methodologies: { ...s.methodologies, [i]: v } }));
  const setEdu = (i, v) =>
    setSel((s) => ({ ...s, education: { ...s.education, [i]: v } }));
  const setLang = (i, v) =>
    setSel((s) => ({ ...s, languages: { ...s.languages, [i]: v } }));

  const allOn = () => setSel(buildDefaultSelection(cv));
  const allOff = () => {
    const next = buildDefaultSelection(cv);
    Object.keys(next.bullets).forEach((k) => (next.bullets[k] = false));
    Object.keys(next.techStack).forEach((k) => (next.techStack[k] = false));
    Object.keys(next.methodologies).forEach((k) => (next.methodologies[k] = false));
    Object.keys(next.education).forEach((k) => (next.education[k] = false));
    Object.keys(next.languages).forEach((k) => (next.languages[k] = false));
    Object.keys(next.experiences).forEach((k) => (next.experiences[k] = false));
    next.summaryIncluded = false;
    next.educationIncluded = false;
    next.techStackIncluded = false;
    next.methodologiesIncluded = false;
    next.languagesIncluded = false;
    next.contactIncluded = false;
    setSel(next);
  };

  const reset = () => {
    setSel(buildDefaultSelection(cv));
    setCustomSummary("");
    setCompanyName("");
    setPositionTitle("");
  };

  // Build the rendered preview content
  const filteredExperiences = useMemo(() => {
    return (cv.experiences || [])
      .map((exp, i) => ({
        ...exp,
        _i: i,
        description: (exp.description || []).filter(
          (_, j) => sel.bullets[`exp${i}_b${j}`]
        ),
      }))
      .filter((exp) => sel.experiences[exp._i] && exp.description.length > 0);
  }, [cv, sel]);

  const filteredEducation = (cv.education || []).filter((_, i) => sel.education[i]);
  const filteredTech = (cv.techStack || []).filter((_, i) => sel.techStack[i]);
  const filteredMeth = (cv.methodologies || []).filter((_, i) => sel.methodologies[i]);
  const filteredLangs = (cv.languages || []).filter((_, i) => sel.languages[i]);

  const handlePrint = () => window.print();
  const handleLogout = () => {
    sessionStorage.removeItem("cv_builder_unlocked");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <section className="bg-white rounded-2xl border border-gray-100 mx-4 my-6 px-6 md:px-12 py-16 max-w-md md:mx-auto print:hidden">
        <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-6">
          Accés restringit
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Aquesta secció és privada. Introdueix el codi d'accés.
        </p>
        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            className={inputClass + " text-center tracking-[0.4em] font-mono"}
            placeholder="••••"
            autoFocus
          />
          {codeError && (
            <p className="text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2 text-center text-sm">
              {codeError}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 transition-all"
          >
            Desbloquejar
          </button>
        </form>
      </section>
    );
  }

  const summaryText = customSummary.trim() || cv.summary;

  return (
    <section className="mx-4 my-6 max-w-7xl md:mx-auto">
      {/* Top bar (hidden on print) */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 md:px-8 py-5 mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900">
            CV Builder · Master CV personalitzable
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Activa o desactiva qualsevol bullet, skill o secció. Tot el que vegis és real (del teu CV original).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
            className="px-3 py-2 rounded-full text-sm font-medium bg-white text-gray-900 border border-gray-300 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="english">English</option>
            <option value="catalan">Català</option>
            <option value="spanish">Castellà</option>
            <option value="french">Français</option>
            <option value="german">Deutsch</option>
            <option value="italian">Italiano</option>
          </select>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-rose-600 px-2">
            Bloquejar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 print:block">

        {/* CONTROLS */}
        <aside className="bg-white rounded-2xl border border-gray-100 p-6 print:hidden lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:sticky lg:top-4">
          <div className="flex flex-wrap gap-2 mb-5">
            <button onClick={allOn} className="px-3 py-1.5 text-xs font-medium bg-rose-50 text-rose-700 rounded-full border border-rose-200 hover:bg-rose-100">
              Activar tot
            </button>
            <button onClick={allOff} className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50">
              Desactivar tot
            </button>
            <button onClick={reset} className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50">
              Reset
            </button>
          </div>

          {/* Target role */}
          <SectionLabel>Posició objectiu</SectionLabel>
          <div className="space-y-3 mb-2">
            <input type="text" placeholder="Empresa (ex. On AG)" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} />
            <input type="text" placeholder="Posició (ex. Senior DS — Marketing Science)" value={positionTitle} onChange={(e) => setPositionTitle(e.target.value)} className={inputClass} />
          </div>

          {/* Summary */}
          <SectionLabel>Resum</SectionLabel>
          <Toggle checked={sel.summaryIncluded} onChange={(v) => setSel((s) => ({ ...s, summaryIncluded: v }))}>
            Incloure resum
          </Toggle>
          <textarea
            rows="5"
            placeholder={`Personalitza el resum (deixa buit per usar el del CV)...\n\nOriginal:\n${cv.summary?.slice(0, 120) || ""}…`}
            value={customSummary}
            onChange={(e) => setCustomSummary(e.target.value)}
            className={inputClass + " text-sm mt-2 resize-y"}
          />

          {/* Contact toggle */}
          <SectionLabel>Contacte</SectionLabel>
          <Toggle checked={sel.contactIncluded} onChange={(v) => setSel((s) => ({ ...s, contactIncluded: v }))}>
            Incloure dades de contacte
          </Toggle>

          {/* Experience */}
          <SectionLabel>Experiència</SectionLabel>
          {(cv.experiences || []).map((exp, i) => (
            <div key={i} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0">
              <Toggle checked={sel.experiences[i]} onChange={(v) => setExp(i, v)}>
                <strong>{exp.role}</strong> — {exp.company}
                <span className="block text-xs text-gray-500 font-normal">{exp.period}</span>
              </Toggle>
              {sel.experiences[i] && (
                <div className="ml-6 mt-2 space-y-1.5">
                  {(exp.description || []).map((bullet, j) => (
                    <Toggle key={j} checked={sel.bullets[`exp${i}_b${j}`]} onChange={(v) => setBullet(i, j, v)}>
                      {bullet}
                    </Toggle>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Education */}
          <SectionLabel>Formació</SectionLabel>
          <Toggle checked={sel.educationIncluded} onChange={(v) => setSel((s) => ({ ...s, educationIncluded: v }))}>
            Mostrar secció
          </Toggle>
          <div className="ml-6 mt-2 space-y-1.5">
            {(cv.education || []).map((e, i) => (
              <Toggle key={i} checked={sel.education[i]} onChange={(v) => setEdu(i, v)}>
                {e}
              </Toggle>
            ))}
          </div>

          {/* Tech stack */}
          <SectionLabel>Tech Stack</SectionLabel>
          <Toggle checked={sel.techStackIncluded} onChange={(v) => setSel((s) => ({ ...s, techStackIncluded: v }))}>
            Mostrar secció
          </Toggle>
          <div className="ml-6 mt-2 space-y-1.5">
            {(cv.techStack || []).map((t, i) => (
              <Toggle key={i} checked={sel.techStack[i]} onChange={(v) => setTech(i, v)}>
                {t}
              </Toggle>
            ))}
          </div>

          {/* Methodologies */}
          <SectionLabel>Metodologies</SectionLabel>
          <Toggle checked={sel.methodologiesIncluded} onChange={(v) => setSel((s) => ({ ...s, methodologiesIncluded: v }))}>
            Mostrar secció
          </Toggle>
          <div className="ml-6 mt-2 space-y-1.5">
            {(cv.methodologies || []).map((m, i) => (
              <Toggle key={i} checked={sel.methodologies[i]} onChange={(v) => setMeth(i, v)}>
                {m}
              </Toggle>
            ))}
          </div>

          {/* Languages */}
          <SectionLabel>Idiomes</SectionLabel>
          <Toggle checked={sel.languagesIncluded} onChange={(v) => setSel((s) => ({ ...s, languagesIncluded: v }))}>
            Mostrar secció
          </Toggle>
          <div className="ml-6 mt-2 space-y-1.5">
            {(cv.languages || []).map((l, i) => (
              <Toggle key={i} checked={sel.languages[i]} onChange={(v) => setLang(i, v)}>
                {l}
              </Toggle>
            ))}
          </div>
        </aside>

        {/* PREVIEW + actions */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 print:hidden">
            <button onClick={handlePrint} className="px-5 py-2.5 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 shadow-md">
              Imprimir / Desar com PDF
            </button>
          </div>

          <article className="cv-print cv-md bg-white rounded-2xl border border-gray-100 px-8 md:px-12 py-10 md:py-12 print:border-0 print:rounded-none print:px-0 print:py-0">
            <h1>{name}</h1>
            {(positionTitle || cv.headline) && (
              <p className="text-rose-600 font-semibold text-lg mb-1">
                {positionTitle || cv.headline}
              </p>
            )}
            {companyName && (
              <p className="text-gray-500 text-sm italic mb-2">
                Adapted for {companyName}
              </p>
            )}

            {sel.summaryIncluded && summaryText && (
              <>
                <h2>{cv.summary ? "Summary" : "Summary"}</h2>
                <p>{summaryText}</p>
              </>
            )}

            {sel.contactIncluded && cv.contact && (
              <>
                <h2>{cv.contactTitle}</h2>
                <p>
                  {cv.labels?.email}: {cv.contact.email} · {cv.labels?.phone}: {cv.contact.phone}
                  {cv.contact.location && ` · ${cv.contact.location}`}
                </p>
                <p>
                  {cv.contact.linkedin} · {cv.contact.github}
                </p>
              </>
            )}

            {filteredExperiences.length > 0 && (
              <>
                <h2>{cv.experienceTitle}</h2>
                {filteredExperiences.map((exp) => (
                  <div key={exp._i}>
                    <h3>{exp.role} — {exp.company}, {exp.location}</h3>
                    <p><em>{exp.period}</em></p>
                    <ul>
                      {exp.description.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </>
            )}

            {sel.educationIncluded && filteredEducation.length > 0 && (
              <>
                <h2>{cv.educationTitle}</h2>
                <ul>
                  {filteredEducation.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </>
            )}

            {sel.techStackIncluded && filteredTech.length > 0 && (
              <>
                <h2>{cv.techStackTitle}</h2>
                <p>{filteredTech.join(" · ")}</p>
              </>
            )}

            {sel.methodologiesIncluded && filteredMeth.length > 0 && (
              <>
                <h2>{cv.methodologiesTitle}</h2>
                <p>{filteredMeth.join(" · ")}</p>
              </>
            )}

            {sel.languagesIncluded && filteredLangs.length > 0 && (
              <>
                <h2>{cv.languagesTitle}</h2>
                <ul>
                  {filteredLangs.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default CvBuilderSection;
