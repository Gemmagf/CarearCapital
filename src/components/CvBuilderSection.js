import React, { useState, useEffect, useMemo } from "react";
import {
  serializeCvAsMarkdown,
  generateTailoredCv,
  renderMarkdown,
} from "../lib/cvBuilder";

const ACCESS_CODE = "8004";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all bg-white";

const CvBuilderSection = ({ translations, currentLanguage }) => {
  // ---- Auth gate ------------------------------------------------------------
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

  // ---- Form state -----------------------------------------------------------
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("anthropic_api_key") || ""
  );
  const [showKey, setShowKey] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generated, setGenerated] = useState("");

  // Persist API key
  useEffect(() => {
    if (apiKey) localStorage.setItem("anthropic_api_key", apiKey);
  }, [apiKey]);

  const sourceCvMarkdown = useMemo(
    () =>
      serializeCvAsMarkdown(
        translations?.cv,
        translations?.name || "Gemma Garcia de la Fuente"
      ),
    [translations]
  );

  // ---- Generate -------------------------------------------------------------
  const handleGenerate = async (e) => {
    e.preventDefault();
    setError(null);
    setGenerated("");
    if (!apiKey) {
      setError("Falta la teva API key d'Anthropic.");
      return;
    }
    if (!jobDescription.trim() && !positionTitle.trim()) {
      setError("Enganxa la descripció de la posició o almenys el títol.");
      return;
    }
    setLoading(true);
    try {
      const { text } = await generateTailoredCv({
        apiKey,
        cvMarkdown: sourceCvMarkdown,
        jobDescription,
        companyName,
        positionTitle,
        outputLanguage,
      });
      setGenerated(text);
    } catch (err) {
      setError(err.message || "Error desconegut");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generated);
    } catch {}
  };

  const handleDownloadMd = () => {
    const slug = (positionTitle || "tailored")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const blob = new Blob([generated], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV_Gemma_Garcia_${slug || "tailored"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- Render ---------------------------------------------------------------
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

  return (
    <section className="bg-white rounded-2xl border border-gray-100 mx-4 my-6 px-6 md:px-12 py-12 max-w-5xl md:mx-auto">
      {/* Header (hidden on print) */}
      <div className="print:hidden mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Generador de CV personalitzat
          </h2>
          <button
            onClick={() => {
              sessionStorage.removeItem("cv_builder_unlocked");
              setAuthed(false);
            }}
            className="text-sm text-gray-500 hover:text-rose-600"
          >
            Bloquejar
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Enganxa la descripció de la posició i genera un CV adaptat. La teva API key d'Anthropic queda guardada al teu navegador (localStorage), no se n'envia a cap altre lloc que a Anthropic.
        </p>
      </div>

      {!generated && (
        <form onSubmit={handleGenerate} className="space-y-5 print:hidden">
          {/* API key */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Anthropic API key
            </label>
            <div className="flex gap-2">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className={inputClass + " font-mono text-sm"}
                placeholder="sk-ant-..."
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="px-3 text-sm text-gray-600 hover:text-rose-600"
              >
                {showKey ? "amaga" : "mostra"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {apiKey
                ? "Guardada al navegador (localStorage)."
                : "Crea-la a console.anthropic.com → API Keys."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Empresa
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={inputClass}
                placeholder="On AG"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Posició
              </label>
              <input
                type="text"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                className={inputClass}
                placeholder="Senior Data Scientist — Marketing Science"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Descripció de la posició (enganxa-la sencera)
            </label>
            <textarea
              rows="10"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className={inputClass + " resize-y"}
              placeholder="About the role…  Responsibilities…  Requirements…"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Idioma de sortida del CV
            </label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
              className={inputClass}
            >
              <option value="english">English</option>
              <option value="catalan">Català</option>
              <option value="spanish">Castellà</option>
              <option value="french">Français</option>
              <option value="german">Deutsch</option>
              <option value="italian">Italiano</option>
            </select>
          </div>

          {error && (
            <p className="text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Generant…" : "Generar CV"}
          </button>
        </form>
      )}

      {generated && (
        <>
          <div className="flex flex-wrap gap-3 mb-6 print:hidden">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-all"
            >
              Imprimir / Desar com PDF
            </button>
            <button
              onClick={handleDownloadMd}
              className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-medium border border-gray-300 hover:bg-rose-50 hover:border-rose-300 transition-all"
            >
              Descarregar .md
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-medium border border-gray-300 hover:bg-rose-50 hover:border-rose-300 transition-all"
            >
              Copiar
            </button>
            <button
              onClick={() => {
                setGenerated("");
                setError(null);
              }}
              className="px-5 py-2.5 text-gray-500 hover:text-rose-600 transition-all"
            >
              Començar de nou
            </button>
          </div>

          <div
            className="cv-print prose prose-rose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(generated) }}
          />
        </>
      )}
    </section>
  );
};

export default CvBuilderSection;
