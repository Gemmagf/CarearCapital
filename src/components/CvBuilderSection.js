import React, { useState, useMemo } from "react";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import allTranslations, {
  CV_VARIANTS,
  applyCvVariant,
} from "../translations/translations";
import CvDocument from "./CvDocument";

const ACCESS_CODE = "8004";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all bg-white";

// Photo options shown in the CV Builder dropdown.
// Excluded: gemma_2 (only Everest, no Gemma) and gemma_portrait (same shoot as gemma_1).
const photoOptions = [
  // STUDIO HEADSHOTS — best for professional CV
  { value: "8", label: "📷 Studio — pink striped shirt" },
  { value: "9", label: "📷 Studio — navy shirt" },
  // SWISS ICONIC SCENERY
  { value: "4", label: "🏔️ Matterhorn — snow & red jacket" },
  { value: "7", label: "⛰️ Brienz Ridge — Alps & lake" },
  { value: "hero", label: "🏞️ Lake Lucerne — white sweater" },
  // CHARACTER / STORY
  { value: "1", label: "🌅 Zurich rooftops with Everest — sunset" },
  { value: "10", label: "⛸️ Ice skating — winter forest" },
  { value: "12", label: "🎈 Cappadocia — hot air balloons" },
  { value: "6", label: "🍄 Autumn forest — mushroom" },
  { value: "11", label: "☕ Café — cozy moment" },
  // LESS USABLE (face partly hidden)
  { value: "3", label: "🚶 Alpine hike — flower meadow (back view)" },
  { value: "5", label: "🪟 Mountain hut window — silhouette" },
  { value: "", label: "— Sense foto —" },
];

const photoSrc = (choice) =>
  choice
    ? `${process.env.PUBLIC_URL}/images/gemma_${choice}.jpg`
    : null;

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const CvBuilderSection = () => {
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

  // ---- Form state (the 5 inputs) -------------------------------------------
  const [companyName, setCompanyName] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [featuredProjectId, setFeaturedProjectId] = useState("");
  const [photoChoice, setPhotoChoice] = useState("portrait");
  const [motivation, setMotivation] = useState("");
  const [cvVariant, setCvVariant] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("english");
  const [accentColor, setAccentColor] = useState("#E11D48");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // CV data in the chosen output language
  const langPack = useMemo(
    () => allTranslations[outputLanguage] || allTranslations.english,
    [outputLanguage]
  );
  const projectsForLang = useMemo(
    () => langPack?.personalProjects?.projects || [],
    [langPack]
  );
  const featuredProject = useMemo(
    () => projectsForLang.find((p) => p.id === featuredProjectId) || null,
    [projectsForLang, featuredProjectId]
  );

  // ---- Generate PDF ---------------------------------------------------------
  // Build the props for the CvDocument from current form state.
  const docProps = useMemo(() => {
    const relative = photoSrc(photoChoice);
    return {
      name: langPack?.name || "Gemma Garcia de la Fuente",
      cvData: applyCvVariant(langPack?.cv, cvVariant),
      positionTitle,
      companyName,
      featuredProject,
      motivation,
      photoUrl: relative ? `${window.location.origin}${relative}` : null,
      accentColor,
    };
  }, [
    langPack,
    cvVariant,
    positionTitle,
    companyName,
    featuredProject,
    motivation,
    photoChoice,
    accentColor,
  ]);

  const handleShowPreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<CvDocument {...docProps} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = [slugify(companyName), slugify(positionTitle)]
        .filter(Boolean)
        .join("_") || "tailored";
      a.href = url;
      a.download = `CV_Gemma_Garcia_${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("No s'ha pogut generar el PDF. Mira la consola.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Keep handleGenerate as the legacy name in case it's referenced elsewhere
  const handleGenerate = handleShowPreview;

  // ---- Render ---------------------------------------------------------------
  if (!authed) {
    return (
      <section className="bg-white rounded-2xl border border-gray-100 mx-4 my-6 px-6 md:px-12 py-16 max-w-md md:mx-auto">
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
    <section className="bg-white rounded-2xl border border-gray-100 mx-4 my-6 px-6 md:px-12 py-12 max-w-3xl md:mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            CV personalitzat
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
          Genera un PDF DIN A4 d'una sola pàgina. Tot es processa al teu navegador, res s'envia enlloc.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-5">
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
              placeholder="Sika"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Titol del rol
            </label>
            <input
              type="text"
              value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)}
              className={inputClass}
              placeholder="Senior Data Scientist — R&D Analytics"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Variant del CV
          </label>
          <select
            value={cvVariant}
            onChange={(e) => setCvVariant(e.target.value)}
            className={inputClass}
          >
            {CV_VARIANTS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Reenfoca el summary, l'ordre de la formació i les metodologies. Els
            fets no canvien. Escrit per a sortida en anglès.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Projecte destacat
            </label>
            <select
              value={featuredProjectId}
              onChange={(e) => setFeaturedProjectId(e.target.value)}
              className={inputClass}
            >
              <option value="">— Cap —</option>
              {projectsForLang.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Foto
            </label>
            <div className="flex gap-3 items-start">
              <select
                value={photoChoice}
                onChange={(e) => setPhotoChoice(e.target.value)}
                className={inputClass + " flex-1"}
              >
                {photoOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {photoChoice && (
                <img
                  src={photoSrc(photoChoice)}
                  alt="preview"
                  className="w-16 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Frase de motivació (opcional)
          </label>
          <textarea
            rows="3"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            className={inputClass + " resize-y"}
            placeholder="Una frase específica per a la posició — s'afegeix sota el Summary en italic."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Idioma del CV
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Color d'accent
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-12 w-16 rounded-xl border border-gray-300 cursor-pointer"
              />
              <div className="flex flex-wrap gap-2">
                {[
                  { c: "#E11D48", name: "Rose" },
                  { c: "#0F766E", name: "Teal" },
                  { c: "#1E40AF", name: "Navy" },
                  { c: "#7C3AED", name: "Purple" },
                  { c: "#374151", name: "Slate" },
                ].map((p) => (
                  <button
                    key={p.c}
                    type="button"
                    onClick={() => setAccentColor(p.c)}
                    title={p.name}
                    className={`w-7 h-7 rounded-full border-2 ${
                      accentColor.toLowerCase() === p.c.toLowerCase()
                        ? "border-gray-900 scale-110"
                        : "border-gray-200"
                    } transition-transform`}
                    style={{ backgroundColor: p.c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3.5 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 shadow-md transition-all"
          >
            {showPreview ? "Actualitzar previsualització" : "Veure previsualització"}
          </button>
          {showPreview && (
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? "Generant…" : "Descarregar PDF"}
            </button>
          )}
        </div>
      </form>

      {showPreview && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Previsualització</h3>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="text-xs text-gray-500 hover:text-rose-600"
            >
              Amagar
            </button>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <PDFViewer
              key={JSON.stringify(docProps)}
              width="100%"
              height={900}
              showToolbar={false}
            >
              <CvDocument {...docProps} />
            </PDFViewer>
          </div>
        </div>
      )}
    </section>
  );
};

export default CvBuilderSection;
