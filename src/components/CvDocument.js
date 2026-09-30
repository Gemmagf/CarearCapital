// Deterministic 1-page A4 CV PDF.
// Uses @react-pdf/renderer — same output regardless of browser/OS.

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const DEFAULT_ACCENT = "#E11D48";
const DARK = "#1F2937";
const GRAY = "#6B7280";

const PORTFOLIO_URL = "https://gemmagf.github.io/CarearCapital";

// first n sentences of a description (used when two projects share the section)
const firstSentences = (t = "", n = 2) => t.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý0-9])/).slice(0, n).join(" ");

const stripProto = (u = "") => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

const makeStyles = (accent) =>
  StyleSheet.create({
    page: {
      paddingTop: 24,
      paddingBottom: 20,
      paddingHorizontal: 32,
      fontSize: 8.8,
      color: DARK,
      fontFamily: "Helvetica",
      lineHeight: 1.3,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    headerLeft: { flex: 1, paddingRight: 12 },
    name: {
      fontSize: 22,
      fontFamily: "Helvetica-Bold",
      color: DARK,
      lineHeight: 1.1,
    },
    tagline: {
      fontSize: 11.5,
      fontFamily: "Helvetica-Oblique",
      color: accent,
      lineHeight: 1.2,
    },
    contactGrid: {
      flexDirection: "row",
      gap: 16,
    },
    contactCol: { flex: 1 },
    contactLabel: {
      fontSize: 8.2,
      fontFamily: "Helvetica-Bold",
      color: DARK,
    },
    contactValue: { fontSize: 8.2, color: GRAY, lineHeight: 1.3 },
    contactLink: { color: accent, textDecoration: "none" },
    photo: {
      width: 62,
      height: 78,
      objectFit: "cover",
      borderRadius: 4,
    },
    section: { marginTop: 4.5 },
    sectionTitle: {
      fontSize: 8.6,
      fontFamily: "Helvetica-Bold",
      color: accent,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      borderBottom: `0.5pt solid ${accent}`,
      paddingBottom: 1,
      marginBottom: 2.5,
    },
    body: { fontSize: 8.5, lineHeight: 1.32, color: DARK, marginBottom: 1.5 },
    motivation: {
      fontSize: 8.5,
      lineHeight: 1.32,
      color: DARK,
      marginTop: 1.5,
      fontFamily: "Helvetica-Oblique",
    },
    projectTitle: {
      fontSize: 9.2,
      fontFamily: "Helvetica-Bold",
      color: DARK,
      marginBottom: 0.5,
    },
    projectMeta: {
      fontSize: 8,
      fontFamily: "Helvetica-Oblique",
      color: GRAY,
      marginBottom: 1.5,
    },
    metaLink: { color: accent, textDecoration: "none" },
    expEntry: { marginBottom: 2.5 },
    expHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 0,
    },
    expRole: {
      fontSize: 9.2,
      fontFamily: "Helvetica-Bold",
      color: DARK,
      flex: 1,
      paddingRight: 6,
    },
    expDates: {
      fontSize: 8,
      color: GRAY,
      fontFamily: "Helvetica-Oblique",
    },
    expCompany: {
      fontSize: 8,
      color: GRAY,
      fontFamily: "Helvetica-Oblique",
      marginBottom: 1,
    },
    bulletRow: {
      flexDirection: "row",
      marginBottom: 0.5,
    },
    bulletMark: { width: 7, color: accent, fontSize: 8.5 },
    bulletText: { flex: 1, fontSize: 8.3, lineHeight: 1.26, color: DARK },
    inlineLabel: { fontFamily: "Helvetica-Bold", color: DARK },
  });

const CvDocument = ({
  name,
  cvData,
  positionTitle,
  companyName,
  featuredProject,
  featuredProjects, // optional: 2+ projects → compact entries (first two sentences each)
  motivation,
  photoUrl,
  accentColor = DEFAULT_ACCENT,
}) => {
  const styles = makeStyles(accentColor);
  const feats = Array.isArray(featuredProjects) && featuredProjects.length ? featuredProjects : featuredProject ? [featuredProject] : [];
  const c = cvData?.contact || {};
  const tagline = positionTitle?.trim() || cvData?.headline;

  // Localised UI labels — fall back to English when a translation is missing.
  const lbl = cvData?.labels || {};
  const L = {
    home: lbl.location || "Home",
    phone: lbl.phone || "Phone",
    email: lbl.email || "Email",
    portfolio: "Portfolio",
    summary: cvData?.summaryTitle || "Summary",
    featured: cvData?.featuredProjectTitle || "Featured project",
    experience: cvData?.experienceTitle || "Experience",
    education: cvData?.educationTitle || "Education",
    techMethods: cvData?.techMethodsTitle || "Tech & Methodologies",
    languages: cvData?.languagesTitle || "Languages",
    methods: cvData?.methodsLabel || "Methods",
  };

  const Bullet = ({ children }) => (
    <View style={styles.bulletRow} wrap={false}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <Document
      title={`CV — ${name}${companyName ? ` — ${companyName}` : ""}`}
      author={name}
    >
      <Page size="A4" style={styles.page}>
        {/* HEADER ----------------------------------------------------------- */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{name}</Text>
            <View style={{ height: 5 }} />
            {tagline && <Text style={styles.tagline}>{tagline}</Text>}
            <View style={{ height: 8 }} />

            {/* Two-column contact grid (4 essentials only) -------------- */}
            <View style={styles.contactGrid}>
              <View style={styles.contactCol}>
                {c.location && (
                  <Text style={styles.contactValue}>
                    <Text style={styles.contactLabel}>{L.home}: </Text>
                    {c.location}
                  </Text>
                )}
                {c.phone && (
                  <Text style={styles.contactValue}>
                    <Text style={styles.contactLabel}>{L.phone}: </Text>
                    {c.phone}
                  </Text>
                )}
              </View>
              <View style={styles.contactCol}>
                {c.email && (
                  <Text style={styles.contactValue}>
                    <Text style={styles.contactLabel}>{L.email}: </Text>
                    <Link
                      src={`mailto:${c.email}`}
                      style={styles.contactLink}
                    >
                      {c.email}
                    </Link>
                  </Text>
                )}
                <Text style={styles.contactValue}>
                  <Text style={styles.contactLabel}>{L.portfolio}: </Text>
                  <Link src={PORTFOLIO_URL} style={styles.contactLink}>
                    {stripProto(PORTFOLIO_URL)}
                  </Link>
                </Text>
              </View>
            </View>
          </View>

          {photoUrl && <Image src={photoUrl} style={styles.photo} />}
        </View>

        {/* SUMMARY ---------------------------------------------------------- */}
        {(cvData?.summary || motivation) && (
          <Section title={L.summary}>
            {cvData?.summary && (
              <Text style={styles.body}>{cvData.summary}</Text>
            )}
            {motivation && motivation.trim() && (
              <Text style={styles.motivation}>{motivation.trim()}</Text>
            )}
          </Section>
        )}

        {/* FEATURED PROJECT(S) ---------------------------------------------- */}
        {feats.length > 0 && (
          <Section title={feats.length > 1 ? `${L.featured}s` : L.featured}>
            {feats.map((fp, fi) => (
              <View key={fi} style={feats.length > 1 ? { marginBottom: 2.5 } : null} wrap={false}>
                <Text style={styles.projectTitle}>{fp.title}</Text>
                {(fp.link || fp.repo) && (
                  <Text style={styles.projectMeta}>
                    {fp.link && (<>Live:{" "}<Link src={fp.link} style={styles.metaLink}>{stripProto(fp.link)}</Link></>)}
                    {fp.link && fp.repo && "  ·  "}
                    {fp.repo && (<>Code:{" "}<Link src={fp.repo} style={styles.metaLink}>{stripProto(fp.repo)}</Link></>)}
                    {feats.length > 1 && Array.isArray(fp.stack) && fp.stack.length > 0 && `  ·  ${fp.stack.slice(0, 5).join(", ")}`}
                  </Text>
                )}
                {fp.description && (
                  <Text style={styles.body}>{feats.length > 1 ? firstSentences(fp.description, 2) : fp.description}</Text>
                )}
                {feats.length === 1 && Array.isArray(fp.stack) && fp.stack.length > 0 && (
                  <Text style={styles.body}>
                    <Text style={styles.inlineLabel}>Stack: </Text>
                    {fp.stack.join(" · ")}
                  </Text>
                )}
              </View>
            ))}
          </Section>
        )}

        {/* EXPERIENCE ------------------------------------------------------- */}
        {Array.isArray(cvData?.experiences) && cvData.experiences.length > 0 && (
          <Section title={L.experience}>
            {cvData.experiences.filter((e) => !e.siteOnly).map((exp, i) => (
              <View key={i} style={styles.expEntry} wrap={false}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  {exp.period && (
                    <Text style={styles.expDates}>{exp.period}</Text>
                  )}
                </View>
                <Text style={styles.expCompany}>
                  {[exp.company, exp.location].filter(Boolean).join(" · ")}
                </Text>
                {(exp.description || []).map((b, j) => (
                  <Bullet key={j}>{b}</Bullet>
                ))}
              </View>
            ))}
          </Section>
        )}

        {/* EDUCATION -------------------------------------------------------- */}
        {Array.isArray(cvData?.education) && cvData.education.length > 0 && (
          <Section title={L.education}>
            {cvData.education.map((e, i) => (
              <Bullet key={i}>{e}</Bullet>
            ))}
          </Section>
        )}

        {/* TECH & METHODOLOGIES -------------------------------------------- */}
        {((Array.isArray(cvData?.techStack) && cvData.techStack.length > 0) ||
          (Array.isArray(cvData?.methodologies) &&
            cvData.methodologies.length > 0)) && (
          <Section title={L.techMethods}>
            {Array.isArray(cvData?.techStack) &&
              cvData.techStack.length > 0 && (
                <Text style={styles.body}>
                  <Text style={styles.inlineLabel}>Stack: </Text>
                  {cvData.techStack.join(" · ")}
                </Text>
              )}
            {Array.isArray(cvData?.methodologies) &&
              cvData.methodologies.length > 0 && (
                <Text style={styles.body}>
                  <Text style={styles.inlineLabel}>{L.methods}: </Text>
                  {cvData.methodologies.join(" · ")}
                </Text>
              )}
          </Section>
        )}

        {/* LANGUAGES -------------------------------------------------------- */}
        {Array.isArray(cvData?.languages) && cvData.languages.length > 0 && (
          <Section title={L.languages}>
            <Text style={styles.body}>{cvData.languages.join(" · ")}</Text>
          </Section>
        )}
      </Page>
    </Document>
  );
};

export default CvDocument;
