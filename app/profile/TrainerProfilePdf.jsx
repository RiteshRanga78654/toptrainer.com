"use client";

import {
  Document, Page, Text, View, StyleSheet, Link, Image,
} from "@react-pdf/renderer";

const C = {
  primary: "#1a56db",
  dark: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  lightBg: "#f3f4f6",
  white: "#ffffff",
  accent: "#1e40af",
  star: "#f59e0b",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: C.dark,
    backgroundColor: C.white,
    paddingHorizontal: 40,
    paddingVertical: 36,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: C.primary,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logo: { width: 90, height: 90, objectFit: "contain" },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 4 },
  headline: { fontSize: 12, color: C.primary, marginBottom: 6, fontFamily: "Helvetica-Bold" },
  tagline: { fontSize: 10, color: C.muted, marginBottom: 12 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 8 },
  contactItem: { fontSize: 9, marginTop: 1, color: C.muted },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: C.lightBg,
    borderRadius: 6,
    padding: 12,
    marginBottom: 18,
  },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.primary },
  statLabel: { fontSize: 8, color: C.muted, marginTop: 2, textAlign: "center" },
  statDivider: { width: 1, backgroundColor: C.border, marginHorizontal: 4 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  bodyText: { fontSize: 10, color: C.dark, lineHeight: 1.5 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  tag: {
    backgroundColor: C.lightBg,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 9,
    color: C.accent,
    fontFamily: "Helvetica-Bold",
  },
  twoCol: { flexDirection: "row", gap: 16 },
  col: { flex: 1 },
  entryRow: { marginBottom: 12 },
  entryTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark, flex: 1 },
  entryDate: { fontSize: 9, color: C.muted, textAlign: "right" },
  entryOrg: { fontSize: 9, color: C.primary, marginTop: 1, marginBottom: 3 },
  entryDesc: { fontSize: 9, color: C.muted, lineHeight: 1.4 },
  milestoneRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  milestoneItem: { flex: 1, minWidth: "22%", alignItems: "center", paddingHorizontal: 4, marginBottom: 10 },
  milestoneDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.primary, marginBottom: 4 },
  milestoneTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.dark, textAlign: "center" },
  milestoneOrg: { fontSize: 7, color: C.muted, textAlign: "center", marginTop: 1 },
  milestoneYear: { fontSize: 8, color: C.primary, fontFamily: "Helvetica-Bold", textAlign: "center", marginTop: 2 },
  twoColBox: {
    flex: 1,
    backgroundColor: C.lightBg,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.primary,
  },
  testimonialText: { fontSize: 9, color: C.dark, lineHeight: 1.4, marginBottom: 6 },
  testimonialAuthor: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.dark },
  testimonialRole: { fontSize: 8, color: C.muted },
  stars: { fontSize: 10, color: C.star, marginBottom: 4 },
  detailRow: { marginBottom: 10 },
  detailTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.accent, textTransform: "uppercase", marginBottom: 2 },
  detailValue: { fontSize: 9, color: C.dark, lineHeight: 1.4 },
  socialRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 4 },
  socialLink: { fontSize: 9, color: C.primary, textDecoration: "none" },
  ctaBox: { backgroundColor: C.primary, borderRadius: 6, padding: 12, marginTop: 8, alignItems: "center" },
  ctaText: { color: C.white, fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  ctaSubText: { color: "#bfdbfe", fontSize: 9 },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 6,
  },
  footerText: { fontSize: 8, color: C.muted },
});

const str = (v) => (typeof v === "string" ? v.trim() : "");
const arr = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// Build a clean, prop-driven data model from the raw trainer document. Every
// field below maps 1:1 to the trainer's profile page / backend record, with
// graceful fallbacks so missing fields simply render nothing (no dummy data).
function buildProfileData(trainer = {}, reviews = [], articles = []) {
  const contact = trainer.contactInfo || {};
  const online = trainer.onlinePresence || {};
  const expertise = trainer.expertiseDomain || {};
  const summary = trainer.profileSummary || {};
  const additional = trainer.additionalDetails || {};
  const loc = [
    contact.location?.city,
    contact.location?.state,
    contact.location?.country,
  ].filter(Boolean).join(", ");

  const testimonialList = arr(reviews).map((r) => {
    const reviewerName =
      `${r?.user?.firstName || ""} ${r?.user?.lastName || ""}`.trim() ||
      r?.sessionInfo?.reviewerName ||
      "Anonymous User";
    const role = r?.workshop?.basicInformation?.title
      ? `Attended: ${r.workshop.basicInformation.title}`
      : r?.sessionInfo?.city || "";
    const quote =
      r?.ratings?.overAllComment ||
      r?.ratings?.deliveryComment ||
      r?.ratings?.contentQualityComment ||
      r?.ratings?.engagmentComment ||
      "";
    return {
      id: r?._id,
      quote,
      name: reviewerName,
      role,
      rating: num(r?.averageRating) || num(r?.ratings?.overAll) || 5,
    };
  }).filter((r) => r.quote);

  const ratedReviews = arr(reviews)
    .map((r) => num(r?.averageRating) || num(r?.ratings?.overAll))
    .filter(Boolean);
  const avgRating = ratedReviews.length
    ? (ratedReviews.reduce((a, b) => a + b, 0) / ratedReviews.length).toFixed(1)
    : "0";

  const articleList = arr(articles).map((a) => ({
    title: str(a?.title),
    date: a?.publishedAt || a?.createdAt || "",
    desc: str(a?.shortDescription),
  }));

  return {
    name: str(trainer.fullName) || "Trainer Profile",
    headline: [str(trainer.subjectLine), str(trainer.companyName)]
      .filter(Boolean)
      .join(" | "),
    tagline: str(summary.profileSummary),
    phone: str(contact.phone) || str(contact.whatsapp),
    location: loc,
    email: str(trainer.email) || str(contact.email),
    website: str(online.website),
    linkedin: str(online.linkedin),
    twitter: str(online.twitter),
    youtube: str(online.youtube),
    instagram: str(online.instagram),
    facebook: str(online.facebook),
    photo: trainer.profilePhoto?.url || "",
    stats: [
      { value: str(additional.trainingExperience) || "-", label: "Years in Training" },
      { value: String(arr(trainer.workshops).length), label: "Workshops Done" },
      { value: String(arr(trainer.awards).length), label: "Awards" },
      {
        value: `${avgRating}/5`,
        label: `${ratedReviews.length} Review${ratedReviews.length === 1 ? "" : "s"}`,
      },
    ],
    skills: [...arr(trainer.tagsLine), ...arr(expertise.competencies)],
    details: [
      { title: "Industry", value: arr(expertise.industry).join(", ") },
      { title: "Competency", value: arr(expertise.competencies).join(", ") },
      { title: "Domain", value: arr(expertise.domain).join(", ") },
      { title: "Trainer Type", value: str(expertise.TrainerType) || str(trainer.entityType) },
      { title: "Commercials", value: str(additional.feesPerDay) ? `Rs. ${additional.feesPerDay} / Day` : "" },
    ].filter((d) => d.value),
    education: arr(trainer.education).map((e) => ({
      title: str(e.highestQualification) || str(e.degree) || str(e.title),
      org: str(e.institution) || str(e.organization),
      year: str(e.completionYear) || str(e.year),
    })),
    certifications: arr(trainer.certifications).map((c) => ({
      title: str(c.name) || str(c.title),
      org: str(c.organisation) || str(c.organization),
      year: str(c.year),
    })),
    awards: arr(trainer.awards).map((a) => ({
      title: str(a.title) || str(a.name),
      org: str(a.organisation) || str(a.organization),
      year: str(a.year),
    })),
    experience: arr(trainer.workshops).map((w) => ({
      title: str(w.title),
      org: str(w.companyName),
      date: str(w.duration),
      desc: str(w.summary) || [str(w.domain), str(w.industry)].filter(Boolean).join(" · "),
    })),
    workshops: arr(trainer.workshops).map((w) => ({
      title: str(w.title),
      company: str(w.companyName),
      duration: str(w.duration),
      location: str(w.location),
      industry: str(w.industry),
      participants: num(w.totalParticipants),
      desc: str(w.summary),
    })),
    testimonials: testimonialList,
    articles: articleList,
    languages: arr(additional.languagesFluent),
    companies: [...new Set(arr(trainer.workshops).map((w) => str(w.companyName)).filter(Boolean))],
    totalReviews: arr(reviews).length,
    avgRating,
  };
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Entry({ title, org, date, desc }) {
  if (!title && !org) return null;
  return (
    <View style={styles.entryRow} wrap={false}>
      <View style={styles.entryTop}>
        <Text style={styles.entryTitle}>{title}</Text>
        {date && <Text style={styles.entryDate}>{date}</Text>}
      </View>
      {org && <Text style={styles.entryOrg}>{org}</Text>}
      {desc && <Text style={styles.entryDesc}>{desc}</Text>}
    </View>
  );
}

function Milestones({ items }) {
  const list = items.filter((m) => m.title);
  if (!list.length) return null;
  return (
    <View style={styles.milestoneRow}>
      {list.map((m, i) => (
        <View key={i} style={styles.milestoneItem}>
          <View style={styles.milestoneDot} />
          <Text style={styles.milestoneTitle}>{m.title}</Text>
          <Text style={styles.milestoneOrg}>{m.org}</Text>
          <Text style={styles.milestoneYear}>{m.year}</Text>
        </View>
      ))}
    </View>
  );
}

function Footer({ name }) {
  return (
    <View fixed style={styles.footer}>
      <Text style={styles.footerText}>TopTrainer · {name}</Text>
      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  );
}

export function TrainerPDFDocument({ trainer, reviews = [], articles = [] }) {
  const t = buildProfileData(trainer, reviews, articles);
  const firstName = t.name.split(" ")[0];

  const socialLinks = [
    { label: "Website", url: t.website },
    { label: "LinkedIn", url: t.linkedin },
    { label: "Twitter", url: t.twitter },
    { label: "YouTube", url: t.youtube },
    { label: "Instagram", url: t.instagram },
    { label: "Facebook", url: t.facebook },
  ].filter((s) => s.url);

  const milestones = [
    ...t.education.map((m) => ({ ...m, kind: "Education" })),
    ...t.certifications.map((m) => ({ ...m, kind: "Certification" })),
    ...t.awards.map((m) => ({ ...m, kind: "Award" })),
  ];

  const logoSrc =
    typeof window !== "undefined" ? `${window.location.origin}/logo.png` : "/logo.png";

  return (
    <Document title={`${t.name} - Trainer Profile`} author={t.name}>
      <Page size="A4" style={styles.page} wrap>
        <Footer name={t.name} />

        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{t.name}</Text>
            {t.headline && <Text style={styles.headline}>{t.headline}</Text>}
            {t.tagline && <Text style={styles.tagline}>{t.tagline}</Text>}
            <View style={styles.contactRow}>
              {t.phone && <Text style={styles.contactItem}>Phone: {t.phone}</Text>}
              {t.location && <Text style={styles.contactItem}>Location: {t.location}</Text>}
              {t.email && <Text style={styles.contactItem}>Email: {t.email}</Text>}
            </View>
          </View>
          {t.photo ? (
            <Image style={{ width: 100, height: 100, borderRadius: 50, objectFit: "cover" }} src={t.photo} />
          ) : (
            <Image style={styles.logo} src={logoSrc} />
          )}
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {t.stats.map((s, i) => (
            <View key={i} style={{ flexDirection: "row", flex: 1 }}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < t.stats.length - 1 && <View style={styles.statDivider} />}
            </View>
          ))}
        </View>

        {/* EXPERTISE */}
        {t.skills.length > 0 && (
          <Section title="Areas of Expertise">
            <View style={styles.tagsRow}>
              {t.skills.map((s, i) => (
                <Text key={i} style={styles.tag}>{s}</Text>
              ))}
            </View>
          </Section>
        )}

        {/* ABOUT */}
        {t.tagline && (
          <Section title="About">
            <Text style={styles.bodyText}>{t.tagline}</Text>
          </Section>
        )}

        {/* DETAILS */}
        {t.details.length > 0 && (
          <Section title="Profile Details">
            <View style={styles.twoCol}>
              <View style={styles.col}>
                {t.details.slice(0, Math.ceil(t.details.length / 2)).map((d, i) => (
                  <View key={i} style={styles.detailRow}>
                    <Text style={styles.detailTitle}>{d.title}</Text>
                    <Text style={styles.detailValue}>{d.value}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.col}>
                {t.details.slice(Math.ceil(t.details.length / 2)).map((d, i) => (
                  <View key={i} style={styles.detailRow}>
                    <Text style={styles.detailTitle}>{d.title}</Text>
                    <Text style={styles.detailValue}>{d.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Section>
        )}

        {/* EXPERIENCE */}
        {t.experience.length > 0 && (
          <Section title="Experience">
            {t.experience.map((e, i) => (
              <Entry key={i} {...e} />
            ))}
          </Section>
        )}

        {/* EDUCATION */}
        {t.education.length > 0 && (
          <Section title="Education">
            {t.education.map((e, i) => (
              <Entry key={i} title={e.title} org={e.org} date={e.year} />
            ))}
          </Section>
        )}

        {/* MILESTONES: Certifications, Awards */}
        {milestones.length > 0 && (
          <Section title="Certifications & Awards">
            {t.certifications.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Milestones items={t.certifications} />
              </View>
            )}
            {t.awards.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Milestones items={t.awards} />
              </View>
            )}
          </Section>
        )}

        {/* TESTIMONIALS */}
        {t.testimonials.length > 0 && (
          <Section title="What People Say">
            <View style={[styles.twoCol, { gap: 8, flexWrap: "wrap" }]}>
              {t.testimonials.slice(0, 6).map((test, i) => (
                <View key={test.id || i} style={[styles.twoColBox, { minWidth: "46%" }]}>
                  <Text style={styles.stars}>{"★".repeat(Math.min(5, Math.max(1, Math.round(test.rating))))}</Text>
                  <Text style={styles.testimonialText}>"{test.quote}"</Text>
                  <Text style={styles.testimonialAuthor}>{test.name}</Text>
                  {test.role && <Text style={styles.testimonialRole}>{test.role}</Text>}
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* LANGUAGES */}
        {t.languages.length > 0 && (
          <Section title="Languages Known">
            <View style={styles.tagsRow}>
              {t.languages.map((l, i) => (
                <Text key={i} style={styles.tag}>{l}</Text>
              ))}
            </View>
          </Section>
        )}

        {/* COMPANIES */}
        {t.companies.length > 0 && (
          <Section title="Companies Worked With">
            <View style={styles.tagsRow}>
              {t.companies.map((c, i) => (
                <Text key={i} style={styles.tag}>{c}</Text>
              ))}
            </View>
          </Section>
        )}

        {/* SOCIAL */}
        {socialLinks.length > 0 && (
          <Section title="Connect With Me">
            <View style={styles.socialRow}>
              {socialLinks.map((s, i) => (
                <Link key={i} src={s.url} style={styles.socialLink}>
                  {s.label}: {s.url}
                </Link>
              ))}
            </View>
          </Section>
        )}

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>Interested in Hiring {firstName}?</Text>
          {t.email && <Text style={styles.ctaSubText}>Get in touch · {t.email}</Text>}
        </View>
      </Page>
    </Document>
  );
}
