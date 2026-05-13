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
  page: { fontFamily: "Helvetica", fontSize: 10, color: C.dark, backgroundColor: C.white, paddingHorizontal: 40, paddingVertical: 36 },
  header: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: C.primary, paddingBottom: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { width: 80, height: 80, objectFit: "contain" },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 4 },
  headline: { fontSize: 12, color: C.primary, marginBottom: 6, fontFamily: "Helvetica-Bold" },
  tagline: { fontSize: 10, color: C.muted, marginBottom: 12 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 8 },
  contactItem: { fontSize: 9, marginTop: 1, color: C.muted },
  statsRow: { flexDirection: "row", justifyContent: "space-between", backgroundColor: C.lightBg, borderRadius: 6, padding: 12, marginBottom: 18 },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.primary },
  statLabel: { fontSize: 8, color: C.muted, marginTop: 2, textAlign: "center" },
  statDivider: { width: 1, backgroundColor: C.border, marginHorizontal: 4 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: C.border },
  bodyText: { fontSize: 10, color: C.dark, lineHeight: 1.5 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  tag: { backgroundColor: C.lightBg, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, fontSize: 9, color: C.accent, fontFamily: "Helvetica-Bold" },
  twoCol: { flexDirection: "row", gap: 16 },
  col: { flex: 1 },
  entryRow: { marginBottom: 12 },
  entryTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark, flex: 1 },
  entryDate: { fontSize: 9, color: C.muted, textAlign: "right" },
  entryOrg: { fontSize: 9, color: C.primary, marginTop: 1, marginBottom: 3 },
  entryDesc: { fontSize: 9, color: C.muted, lineHeight: 1.4 },
  milestoneRow: { flexDirection: "row", marginTop: 4 },
  milestoneItem: { flex: 1, alignItems: "center", paddingHorizontal: 4 },
  milestoneDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.primary, marginBottom: 4 },
  milestoneTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.dark, textAlign: "center" },
  milestoneOrg: { fontSize: 7, color: C.muted, textAlign: "center", marginTop: 1 },
  milestoneYear: { fontSize: 8, color: C.primary, fontFamily: "Helvetica-Bold", textAlign: "center", marginTop: 2 },
  milestoneLine: { position: "absolute", top: 3, left: "10%", right: "10%", height: 2, backgroundColor: C.border },
  twoColBox: { flex: 1, backgroundColor: C.lightBg, borderRadius: 6, padding: 10, borderLeftWidth: 3, borderLeftColor: C.primary },
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
});

const trainerData = {
  name: "Karan Malhotra",
  headline: "Leadership & Agile Coach | Elevate Learning Solutions Pvt. Ltd.",
  tagline: "Helping leaders and teams unlock their true potential through experiential learning and practical strategies.",
  phone: "+91 9876543210",
  location: "Bengaluru, Karnataka",
  email: "karan.malhotra@elevatelearning.com",
  stats: [
    { value: "12+", label: "Years in Training" },
    { value: "250+", label: "Workshops Done" },
    { value: "15+", label: "Industries Served" },
    { value: "4.8/5", label: "Trainer Rating" },
  ],
  skills: ["Leadership", "Agile", "Change Management", "Team Building"],
  about: "I help leaders and teams unlock their true potential through experiential learning and practical strategies. With over a decade of experience, I specialize in driving agile mindset, leadership excellence and organizational transformation.",
  details: [
    { title: "Industry", value: "IT & Software, BFSI, Manufacturing, Healthcare, Education, Startups" },
    { title: "Competency", value: "Leadership Development, Agile Transformation, Team Effectiveness, Change Management" },
    { title: "Domain", value: "Agile & Scrum, Emotional Intelligence, Design Thinking, Communication, OKRs" },
    { title: "Trainer Type", value: "Corporate Trainer | Leadership Coach | Facilitator" },
    { title: "Commercials", value: "Rs. 75,000 - 1,50,000 / Workshop" },
  ],
  experience: [
    { title: "Leadership & Agile Coach", org: "Elevate Learning Solutions Pvt. Ltd.", date: "2020 - Present", desc: "Designing and delivering leadership and agile transformation programs across IT, BFSI and manufacturing sectors." },
    { title: "Senior Agile Coach", org: "Infosys Limited", date: "2016 - 2020", desc: "Led enterprise agile transformation; coached 30+ cross-functional teams." },
    { title: "HR Business Partner & Trainer", org: "Wipro Technologies", date: "2012 - 2016", desc: "Facilitated leadership development workshops and change management initiatives." },
  ],
  milestones: [
    { title: "MBA - HR", org: "Symbiosis Institute of Management", year: "2008" },
    { title: "Professional Scrum Trainer", org: "Scrum.org", year: "2016" },
    { title: "Certified Agile Leadership Coach", org: "ICAgle", year: "2018" },
    { title: "Leadership Excellence Award", org: "Elevate Learning", year: "2021" },
    { title: "Top Trainer of the Year", org: "ABP Awards", year: "2022" },
  ],
  testimonials: [
    { text: "Karan's session on Agile Leadership was transformative. Very engaging and practical!", author: "Priya Sharma", role: "Delivery Head, Infosys", rating: 5 },
    { text: "One of the best trainers I have attended. Real-world examples made it so impactful.", author: "Rahul Mehta", role: "Project Manager, TCS", rating: 5 },
  ],
  social: [
    { label: "LinkedIn", url: "linkedin.com/in/karanmalhotra" },
    { label: "Twitter", url: "twitter.com/karanmalhotra" },
    { label: "YouTube", url: "youtube.com/@karanmalhotra" },
    { label: "Website", url: "www.elevatelearning.com" },
  ],
};

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Entry({ title, org, date, desc }) {
  return (
    <View style={styles.entryRow}>
      <View style={styles.entryTop}>
        <Text style={styles.entryTitle}>{title}</Text>
        {date && <Text style={styles.entryDate}>{date}</Text>}
      </View>
      {org && <Text style={styles.entryOrg}>{org}</Text>}
      {desc && <Text style={styles.entryDesc}>{desc}</Text>}
    </View>
  );
}

export function TrainerPDFDocument() {
  const t = trainerData;
  return (
    <Document title={`${t.name} - Trainer Profile`} author={t.name}>
      <Page size="A4" style={styles.page}>

        {/* HEADER with logo */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{t.name}</Text>
            <Text style={styles.headline}>{t.headline}</Text>
            <Text style={styles.tagline}>{t.tagline}</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>Phone: {t.phone}</Text>
              <Text style={styles.contactItem}>  |  Location: {t.location}</Text>
              <Text style={styles.contactItem}>  |  Email: {t.email}</Text>
            </View>
          </View>
          <Image style={styles.logo} src="/icon.png" />
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
        <Section title="Areas of Expertise">
          <View style={styles.tagsRow}>
            {t.skills.map((s, i) => <Text key={i} style={styles.tag}>{s}</Text>)}
          </View>
        </Section>

        {/* ABOUT */}
        <Section title="About">
          <Text style={styles.bodyText}>{t.about}</Text>
        </Section>

        {/* DETAILS */}
        <Section title="Profile Details">
          <View style={styles.twoCol}>
            <View style={styles.col}>
              {t.details.slice(0, 3).map((d, i) => (
                <View key={i} style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{d.title}</Text>
                  <Text style={styles.detailValue}>{d.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.col}>
              {t.details.slice(3).map((d, i) => (
                <View key={i} style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{d.title}</Text>
                  <Text style={styles.detailValue}>{d.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </Section>

        {/* EXPERIENCE */}
        <Section title="Experience">
          {t.experience.map((e, i) => <Entry key={i} {...e} />)}
        </Section>

        {/* MILESTONES */}
        <Section title="Educational & Professional Milestones">
          <View style={{ position: "relative" }}>
            <View style={styles.milestoneLine} />
            <View style={styles.milestoneRow}>
              {t.milestones.map((m, i) => (
                <View key={i} style={styles.milestoneItem}>
                  <View style={styles.milestoneDot} />
                  <Text style={styles.milestoneTitle}>{m.title}</Text>
                  <Text style={styles.milestoneOrg}>{m.org}</Text>
                  <Text style={styles.milestoneYear}>{m.year}</Text>
                </View>
              ))}
            </View>
          </View>
        </Section>

        {/* TESTIMONIALS */}
        <Section title="What People Say">
          <View style={[styles.twoCol, { gap: 8 }]}>
            {t.testimonials.map((test, i) => (
              <View key={i} style={styles.twoColBox}>
                <Text style={styles.stars}>{"★".repeat(test.rating)}</Text>
                <Text style={styles.testimonialText}>"{test.text}"</Text>
                <Text style={styles.testimonialAuthor}>{test.author}</Text>
                <Text style={styles.testimonialRole}>{test.role}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* SOCIAL */}
        <Section title="Connect With Me">
          <View style={styles.socialRow}>
            {t.social.map((s, i) => (
              <Link key={i} src={`https://${s.url}`} style={styles.socialLink}>
                {s.label}: {s.url}
              </Link>
            ))}
          </View>
        </Section>

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>Interested in Hiring {t.name.split(" ")[0]}?</Text>
          <Text style={styles.ctaSubText}>Get in touch · {t.email}</Text>
        </View>

      </Page>
    </Document>
  );
}