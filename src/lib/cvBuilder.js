// Helpers for the secret CV-builder section.
// Calls the Anthropic API directly from the browser with the user's own API key.

const DEFAULT_MODEL = "claude-sonnet-4-5-20250929";

// Convert the static CV data into a markdown ground-truth that Claude can re-shape
// without inventing anything new.
export function serializeCvAsMarkdown(cvData, name) {
  if (!cvData) return "";
  const parts = [];
  parts.push(`# ${name}`);
  if (cvData.headline) parts.push(`**${cvData.headline}**`);

  if (cvData.summary) {
    parts.push("\n## Summary\n" + cvData.summary);
  }

  if (cvData.contact) {
    parts.push("\n## Contact");
    if (cvData.contact.phone) parts.push(`- Phone: ${cvData.contact.phone}${cvData.contact.phoneAlt ? ` / ${cvData.contact.phoneAlt}` : ""}`);
    if (cvData.contact.email) parts.push(`- Email: ${cvData.contact.email}`);
    if (cvData.contact.linkedin) parts.push(`- LinkedIn: ${cvData.contact.linkedin}`);
    if (cvData.contact.github) parts.push(`- GitHub: ${cvData.contact.github}`);
    if (cvData.contact.location) parts.push(`- Location: ${cvData.contact.location}`);
  }

  if (cvData.experiences && cvData.experiences.length) {
    parts.push("\n## Experience");
    cvData.experiences.forEach((exp) => {
      parts.push(`\n### ${exp.role} — ${exp.company}, ${exp.location}`);
      parts.push(`*${exp.period}*`);
      (exp.description || []).forEach((b) => parts.push(`- ${b}`));
    });
  }

  if (cvData.education && cvData.education.length) {
    parts.push("\n## Education");
    cvData.education.forEach((e) => parts.push(`- ${e}`));
  }

  if (cvData.techStack && cvData.techStack.length) {
    parts.push("\n## Tech stack");
    parts.push(cvData.techStack.join(" · "));
  }

  if (cvData.methodologies && cvData.methodologies.length) {
    parts.push("\n## Methodologies");
    parts.push(cvData.methodologies.join(" · "));
  }

  if (cvData.languages && cvData.languages.length) {
    parts.push("\n## Languages");
    cvData.languages.forEach((l) => parts.push(`- ${l}`));
  }

  return parts.join("\n");
}

const SYSTEM_PROMPT = `You are an expert CV writer specialised in matching candidates to specific job descriptions.

Hard rules — never break:
1. NEVER invent skills, tools, technologies, employers, dates, projects or achievements that are not present in the candidate's source CV.
2. You may REORDER bullets, REWORD them with synonyms or industry vocabulary from the JD, and EMPHASISE the most relevant ones.
3. You may DROP bullets that are irrelevant to the role.
4. You may REWRITE the summary so it speaks directly to the role's core needs, but only using facts from the source CV.
5. Keep the candidate's voice: confident, concrete, no fluff.
6. Use the JD's vocabulary naturally where the candidate has done the underlying work (e.g., if JD says "marketing measurement" and candidate did "ROI/ROAS analysis", the bridge is fair).
7. Keep dates, titles and employer names exactly as in the source CV.

Output format:
- Pure markdown.
- Sections in this order: Header (name + targeted role headline), Summary (2-3 sentences), Experience (bullets), Education, Tech stack, Methodologies, Languages.
- Concise. The reader is a hiring manager who will spend 30 seconds on this page.
- Output language: as requested below.`;

export async function generateTailoredCv({
  apiKey,
  cvMarkdown,
  jobDescription,
  companyName,
  positionTitle,
  outputLanguage = "english",
  model = DEFAULT_MODEL,
  maxTokens = 4096,
}) {
  if (!apiKey) throw new Error("Missing API key");
  if (!cvMarkdown) throw new Error("Missing CV data");

  const userMessage = [
    `## Candidate's source CV (ground truth — do not invent beyond this)`,
    cvMarkdown,
    "",
    `## Target role`,
    `Company: ${companyName || "(not specified)"}`,
    `Position: ${positionTitle || "(not specified)"}`,
    "",
    `## Job description`,
    jobDescription || "(not provided — produce a generic strong version of the CV in case)",
    "",
    `## Instructions`,
    `Produce the tailored CV in **${outputLanguage}**. Pure markdown. No preamble, no closing remarks.`,
  ].join("\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      errMsg = j.error?.message || JSON.stringify(j).slice(0, 300);
    } catch {}
    throw new Error(errMsg);
  }
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || "").join("\n").trim();
  return { text, raw: data };
}

// Very small markdown renderer: enough for our CV output.
// Handles: # / ## / ### headings, **bold**, *italic*, - bullets, blank lines.
export function renderMarkdown(md) {
  if (!md) return "";
  const lines = md.split("\n");
  const out = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  const inline = (s) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      closeList();
      out.push("");
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (/^\s*-\s+/.test(line)) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^\s*-\s+/, ""))}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return out.join("\n");
}
