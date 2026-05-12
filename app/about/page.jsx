"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  GraduationCap, ClipboardList, Briefcase, MessageSquare,
  CheckCircle, Linkedin, X, ArrowUpRight, ChevronLeft, ChevronRight,
  Star, Users, BookOpen, Award
} from "lucide-react";

/* ─── COLOUR TOKENS ─── */
const B   = "#4f46e5";
const BD  = "#4338ca";
const BL  = "#eef2ff";
const BM  = "#c7d2fe";
const PUR = "#7c3aed";

/* ─── TEAM DATA ─── */
const TEAM = [
  {
    name: "Ritesh Ranga",
    role: "Frontend Developer | React.js & Next.js | JavaScript | UI Engineering | MERN Enthusiast",
    bio: "Frontend Developer specializing in building fast, responsive, and scalable web applications using React.js and Next.js. Focused on UI engineering, performance optimization, and delivering clean, accessible user experiences with modern JavaScript ecosystems.",
    initials: "RR",
    image: "/about-us/ritesh-ranga.jpg",
    linkedin: "https://www.linkedin.com/in/ritesh-x/",
    gradient: ["#1e3a8a", "#3b82f6"],
    color: "#3b82f6",
  },
  {
    name: "Neelam Yadav",
    role: "Full Stack Developer | MERN Stack | System Design | UI/UX Thinking",
    bio: "Full Stack Developer responsible for designing and building end-to-end scalable web applications. Skilled in MERN stack development, API integration, and system architecture with a strong focus on usability, performance, and product vision.",
    initials: "NY",
    image: "/about-us/neelam-yadav.jpg",
    linkedin: "https://www.linkedin.com/in/neelam-yadav-322245257/",
    gradient: ["#4f46e5", "#818cf8"],
    color: "#6366f1",
  },
  {
    name: "Lakhan Pal",
    role: "Software Engineer | Full Stack Developer | React.js | Node.js | MongoDB",
    bio: "Software Engineer with expertise in full stack development using React.js, Node.js, and MongoDB. Passionate about building scalable applications, writing clean maintainable code, and solving real-world problems through technology.",
    initials: "LP",
    image: "/about-us/lakhan.jpg",
    linkedin: "https://www.linkedin.com/in/lakhan-pal-3282b5265/",
    gradient: ["#7c3aed", "#a78bfa"],
    color: "#7c3aed",
  },
  {
    name: "Tarun Rawat",
    role: "Backend Developer | Node.js | Express.js | REST APIs | Database Design",
    bio: "Backend Developer focused on building secure, scalable, and high-performance server-side applications. Experienced in Node.js, Express.js, REST API development, and database architecture to support robust production systems.",
    initials: "TR",
    image: "/about-us/tarun.jpg",
    linkedin: "https://www.linkedin.com/in/mern-novize-tarun/",
    gradient: ["#1e40af", "#2563eb"],
    color: "#2563eb",
  },
];

const FEATURES = [
  { icon: GraduationCap, title: "Find Expert Trainers", desc: "Browse thousands of verified trainers across every subject, skill, and exam.", color: "#4f46e5", bg: "#eef2ff" },
  { icon: ClipboardList, title: "Exams & Admissions",   desc: "Stay on top of entrance exams, cut-offs, eligibility, and important dates.",   color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Briefcase,     title: "Courses & Careers",    desc: "Explore curated courses, specialisations, and career paths aligned with your goals.", color: "#2563eb", bg: "#eff6ff" },
  { icon: MessageSquare, title: "Expert Guidance",       desc: "Get personalised advice and career tips from experienced mentors.",                color: "#0891b2", bg: "#ecfeff" },
];

const CHECKLIST = [
  "Verified & Experienced Trainers",
  "Wide Range of Courses & Exams",
  "Personalised Guidance",
  "Trusted by Thousands of Students",
];

const STATS = [
  { icon: Users,    num: "50K+",   lbl: "Active Learners",  color: "#4f46e5" },
  { icon: BookOpen, num: "1,200+", lbl: "Verified Trainers", color: "#7c3aed" },
  { icon: Star,     num: "4.9 ★",  lbl: "Average Rating",   color: "#f59e0b" },
  { icon: Award,    num: "200+",   lbl: "Skill Categories",  color: "#2563eb" },
];

/* ─── TEAM CARD ─── */
function TeamCard({ member, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);

 return (
  <div
    onClick={onClick}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    style={{
      background: "#fff",
      border: `1px solid ${hovered ? BM : "#e9edf4"}`,
      borderRadius: 22,
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: hovered
        ? "0 24px 60px rgba(79,70,229,0.22)"
        : "0 4px 20px rgba(15,23,42,0.06)",
      transform: hovered ? "translateY(-8px) scale(1.01)" : "none",
      transition: "all .38s cubic-bezier(.22,1,.36,1)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* IMAGE SECTION */}
    <div
      style={{
        width: "100%",
        height: 250,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        background: `linear-gradient(145deg,${member.gradient[0]},${member.gradient[1]})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 58,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'Poppins',sans-serif",
          letterSpacing: "-2px",
        }}
      >
        {member.initials}
      </div>

      {!imgErr && (
        <img
          src={member.image}
          alt={member.name}
          onError={() => setImgErr(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            zIndex: 2,
            transition: "transform .55s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.22) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          zIndex: 4,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(10px)",
          borderRadius: 20,
          padding: "5px 12px",
          fontSize: 10,
          fontWeight: 700,
          color: "rgba(255,255,255,0.94)",
          letterSpacing: ".07em",
          textTransform: "uppercase",
          border: "1px solid rgba(255,255,255,0.25)",
          fontFamily: "'Poppins',sans-serif",
          opacity: hovered ? 1 : 0.65,
          transition: "opacity .3s",
        }}
      >
        View Profile
      </div>
    </div>

    {/* CONTENT SECTION */}
    <div style={{ padding: "20px 22px 24px", borderTop: "1px solid #f1f5f9" }}>
      <h3
        style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: 17,
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: 8,
          letterSpacing: "-0.3px",
        }}
      >
        {member.name}
      </h3>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: BL,
          borderRadius: 30,
          padding: "5px 13px",
          border: `1px solid ${BM}`,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: B,
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: BD,
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          {member.role}
        </span>
      </div>

      {/* LINKEDIN BUTTON */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: B,
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 700,
          padding: "9px 15px",
          borderRadius: 50,
          background: BL,
          border: `1px solid ${BM}`,
          transition: "all .22s ease",
          fontFamily: "'Poppins',sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = B;
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = B;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = BL;
          e.currentTarget.style.color = B;
          e.currentTarget.style.borderColor = BM;
        }}
      >
        <Linkedin size={13} />
        Connect on LinkedIn
        <ArrowUpRight size={11} style={{ marginLeft: "auto" }} />
      </a>
    </div>
  </div>
);
}

/* ─── TEAM MODAL ─── */
function TeamModal({ member, onClose }) {
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    if (!member) return;
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [member, onClose]);

  useEffect(() => { setImgErr(false); }, [member]);

  if (!member) return null;
  const [from, to] = member.gradient;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,8,28,0.85)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "tt-fadeIn .22s ease both" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="tt-modal-box"
        style={{ background: "#fff", borderRadius: 28, width: "min(92vw,860px)", maxHeight: "88vh", overflow: "hidden", boxShadow: "0 60px 140px rgba(0,0,0,0.45)", animation: "tt-modalUp .4s cubic-bezier(.22,1,.36,1) both", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}
      >
        <div style={{ position: "relative", overflow: "hidden", minHeight: 480, background: `linear-gradient(160deg,${from},${to})` }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 72, color: "rgba(255,255,255,0.3)", fontFamily: "'Poppins',sans-serif" }}>{member.initials}</div>
          {!imgErr && (
            <img src={member.image} alt={member.name} onError={() => setImgErr(true)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", zIndex: 2 }}
            />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 38%, rgba(6,12,48,0.85) 100%)", zIndex: 3 }} />
          <div style={{ position: "absolute", bottom: 28, left: 28, right: 28, zIndex: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(199,210,254,0.85)", marginBottom: 6, fontFamily: "'Poppins',sans-serif" }}>TOPTRAINER TEAM</div>
            <h3 style={{ fontSize: "clamp(20px,2.6vw,28px)", fontWeight: 800, color: "#fff", fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.4px", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>{member.name}</h3>
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: 16, left: 16, zIndex: 5, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.16)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.28)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", transition: "all .2s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.30)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
          ><X size={15} /></button>
        </div>
        <div style={{ padding: "44px 38px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: BL, borderRadius: 30, padding: "6px 15px", border: `1px solid ${BM}`, marginBottom: 18 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: B }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: BD, fontFamily: "'Poppins',sans-serif" }}>{member.role}</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px,2.8vw,36px)", fontWeight: 900, color: "#0f172a", marginBottom: 8, fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.8px", lineHeight: 1.08 }}>{member.name}</h2>
            <div style={{ width: 44, height: 3, background: `linear-gradient(90deg,${B},${PUR})`, borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.9, fontFamily: "'Poppins',sans-serif", marginBottom: 28 }}>{member.bio}</p>
            {[["PLATFORM","TopTrainer"],["STATUS","Active Member"],["CONNECT","LinkedIn"]].map(([k,v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94a3b8", fontFamily: "'Poppins',sans-serif" }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", fontFamily: "'Poppins',sans-serif" }}>{v}</span>
              </div>
            ))}
          </div>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: `linear-gradient(135deg,${B},${PUR})`, color: "#fff", padding: "14px 24px", borderRadius: 50, fontWeight: 700, fontSize: 13, textDecoration: "none", letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "'Poppins',sans-serif", marginTop: 28, boxShadow: "0 8px 28px rgba(79,70,229,0.35)", transition: "all .25s cubic-bezier(.22,1,.36,1)" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(79,70,229,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(79,70,229,0.35)"; }}
          >
            <Linkedin size={15} /> Connect on LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO VISUAL ─── */
function HeroVisual() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 500 }}>
      <div style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 100px rgba(79,70,229,0.22), 0 16px 40px rgba(99,102,241,0.14)", border: "1px solid rgba(255,255,255,0.9)", background: "#fff", animation: "tt-float 7s ease-in-out infinite" }}>
        <div style={{ width: "100%", height: 260, background: "linear-gradient(135deg,#1e3a8a 0%,#4f46e5 50%,#7c3aed 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "9px 9px" }} />
          <div style={{ position: "absolute", top: 22, left: 22, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(14px)", borderRadius: 16, padding: "12px 18px", border: "1px solid rgba(255,255,255,0.28)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "'Poppins',sans-serif", lineHeight: 1 }}>50K+</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.72)", fontFamily: "'Poppins',sans-serif", letterSpacing: ".07em", textTransform: "uppercase", marginTop: 3 }}>Active Learners</div>
          </div>
          <div style={{ position: "absolute", bottom: 22, right: 22, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(14px)", borderRadius: 16, padding: "12px 18px", border: "1px solid rgba(255,255,255,0.28)", textAlign: "right" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "'Poppins',sans-serif", lineHeight: 1 }}>4.9★</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.72)", fontFamily: "'Poppins',sans-serif", letterSpacing: ".07em", textTransform: "uppercase", marginTop: 3 }}>Avg Rating</div>
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 88, height: 88, borderRadius: 22, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>🎓</div>
        </div>
        <div style={{ padding: "22px 26px 26px" }}>
          {[["1,200+","Verified Trainers","#eef2ff","#4f46e5"],["200+","Skill Categories","#f5f3ff","#7c3aed"],["98%","Student Satisfaction","#f0fdf4","#16a34a"]].map(([val,lbl,bg,col]) => (
            <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 15px", borderRadius: 12, background: bg, marginBottom: 9, border: `1px solid ${col}22` }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#475569", fontFamily: "'Poppins',sans-serif" }}>{lbl}</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: col, fontFamily: "'Poppins',sans-serif" }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: -20, right: -20, background: "#fff", borderRadius: 18, padding: "12px 16px", boxShadow: "0 16px 44px rgba(79,70,229,0.2)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins',sans-serif", animation: "tt-float 5.5s ease-in-out infinite 1s" }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: BL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💡</div>
        <div><div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Expert Guidance</div><div style={{ fontSize: 10, color: "#94a3b8" }}>From real mentors</div></div>
      </div>
      <div style={{ position: "absolute", bottom: -18, left: -18, background: "#fff", borderRadius: 18, padding: "12px 16px", boxShadow: "0 16px 44px rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.14)", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins',sans-serif", animation: "tt-float 6.5s ease-in-out infinite 2s" }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🚀</div>
        <div><div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Trusted Platform</div><div style={{ fontSize: 10, color: "#94a3b8" }}>India's #1 choice</div></div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN PAGE
══════════════════════════════════ */
export default function AboutPage() {
  const [modalMember,   setModalMember]   = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isDragging,    setIsDragging]    = useState(false);
  const [dragStart,     setDragStart]     = useState(0);
  const [dragDelta,     setDragDelta]     = useState(0);
  const autoRef = useRef(null);
  const n = TEAM.length;

  const goTo   = useCallback((idx) => { setCarouselIndex(((idx % n) + n) % n); setDragDelta(0); }, [n]);
  const goNext = useCallback(() => goTo(carouselIndex + 1), [carouselIndex, goTo]);
  const goPrev = useCallback(() => goTo(carouselIndex - 1), [carouselIndex, goTo]);
  const startAuto = useCallback(() => { clearInterval(autoRef.current); autoRef.current = setInterval(() => setCarouselIndex((p) => (p + 1) % n), 3600); }, [n]);
  const stopAuto  = useCallback(() => clearInterval(autoRef.current), []);
  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  const onDragStart = (x) => { stopAuto(); setIsDragging(true); setDragStart(x); setDragDelta(0); };
  const onDragMove  = (x) => { if (isDragging) setDragDelta(x - dragStart); };
  const onDragEnd   = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDelta < -50) goNext(); else if (dragDelta > 50) goPrev(); else setDragDelta(0);
    startAuto();
  };

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes tt-fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes tt-modalUp { from{opacity:0;transform:translateY(28px) scale(.95)} to{opacity:1;transform:none} }
@keyframes tt-fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
@keyframes tt-slideL  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:none} }
@keyframes tt-slideR  { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:none} }
@keyframes tt-scaleIn { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
@keyframes tt-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
@keyframes tt-carIn   { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:none} }
@keyframes tt-shimmer { 0%{background-position:-250% center} 100%{background-position:250% center} }
@keyframes tt-gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes tt-livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.82)} }

.tt-fadeup  { animation:tt-fadeUp  .75s cubic-bezier(.22,1,.36,1) both; }
.tt-slideL  { animation:tt-slideL  .75s cubic-bezier(.22,1,.36,1) both; }
.tt-slideR  { animation:tt-slideR  .75s cubic-bezier(.22,1,.36,1) both; }
.tt-scaleIn { animation:tt-scaleIn .70s cubic-bezier(.22,1,.36,1) both; }
.tt-d1{animation-delay:.08s} .tt-d2{animation-delay:.18s} .tt-d3{animation-delay:.30s}
.tt-d4{animation-delay:.42s} .tt-d5{animation-delay:.55s} .tt-d6{animation-delay:.68s}
.tt-d7{animation-delay:.80s}

.tt-shimmer {
  background:linear-gradient(90deg,#312e81 0%,#4f46e5 30%,#7c3aed 55%,#4f46e5 75%,#312e81 100%);
  background-size:260% auto;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text; animation:tt-shimmer 5s linear infinite;
}

.tt-live {
  animation:tt-livePulse 1.6s ease-in-out infinite;
  display:inline-block; width:8px; height:8px;
  border-radius:50%; background:#4f46e5;
}

/* ─── HERO ───
   ✅ No padding-top here — LayoutWrapper's <main> already adds navbar-height offset.
   min-height uses calc so the hero fills the visible viewport below the navbar.       */
.tt-hero {
  position:relative;
  min-height:calc(100vh - var(--navbar-height, 64px));
  display:flex; align-items:center;
  padding:0 24px;
  overflow:hidden;
  background:#f8f7ff;
  background-size:320% 320%;
  animation:tt-gradShift 16s ease infinite;
}

.tt-hero::before {
  content:''; position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(99,102,241,0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.10) 1px, transparent 1px);
  background-size:48px 48px;
  pointer-events:none; z-index:0;
}
.tt-hero::after {
  content:''; position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px);
  background-size:12px 12px;
  pointer-events:none; z-index:0;
}

.tt-hero-grid-fade {
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background:radial-gradient(ellipse 70% 70% at 50% 50%,
    transparent 30%, rgba(248,247,255,0.6) 60%, rgba(248,247,255,0.95) 100%);
}

.tt-blob { position:absolute; pointer-events:none; filter:blur(70px); }
.tt-blob-1 { width:420px;height:420px;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);top:-100px;right:-60px; }
.tt-blob-2 { width:320px;height:320px;background:radial-gradient(circle,rgba(167,139,250,0.14) 0%,transparent 70%);bottom:-60px;left:-50px; }
.tt-blob-3 { width:220px;height:220px;background:radial-gradient(circle,rgba(37,99,235,0.10) 0%,transparent 70%);top:44%;left:38%; }

/* ✅ Simple vertical padding — no navbar offset needed here anymore */
.tt-hero-inner {
  max-width:1200px; margin:0 auto; width:100%;
  display:grid; grid-template-columns:1fr 1fr; align-items:center;
  gap:68px; position:relative; z-index:1;
  padding:48px 0 80px;
}

.tt-feat-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:22px;max-width:1200px;margin:0 auto;padding:54px 24px; }
.tt-feat-card { background:#fff;border:1px solid #e8ecf4;border-radius:20px;padding:28px 22px;text-align:center;transition:all .38s cubic-bezier(.22,1,.36,1);box-shadow:0 2px 14px rgba(0,0,0,.04); }
.tt-feat-card:hover { transform:translateY(-6px);box-shadow:0 20px 48px rgba(79,70,229,.14);border-color:#c7d2fe; }
.tt-feat-icon { width:60px;height:60px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;transition:transform .38s cubic-bezier(.22,1,.36,1); }
.tt-feat-card:hover .tt-feat-icon { transform:rotate(9deg) scale(1.12); }

.tt-about-grid { display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;max-width:1200px;margin:0 auto;padding:0 24px 72px; }
.tt-check-row { display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14.5px;font-weight:600;color:#1e293b;font-family:'Poppins',sans-serif; }

.tt-team-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1200px;margin:0 auto;padding:0 24px; }
.tt-carousel-wrap { display:none; }
.tt-nav-btn { width:50px;height:50px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s ease;flex-shrink:0; }
.tt-dot-ind { height:8px;border-radius:20px;border:none;cursor:pointer;transition:all .32s ease;padding:0; }

@media(max-width:640px){
  .tt-modal-box{grid-template-columns:1fr !important;}
  .tt-modal-box>div:first-child{min-height:260px !important;}
  .tt-modal-box>div:last-child{padding:28px 22px !important;}
}
@media(max-width:1023px){
  .tt-feat-grid{grid-template-columns:repeat(2,1fr) !important;}
  .tt-team-grid{grid-template-columns:repeat(2,1fr) !important;}
}
@media(max-width:640px){
  /* ✅ Simple padding — no navbar compensation needed */
  .tt-hero-inner{grid-template-columns:1fr !important;padding:32px 0 56px !important;}
  .tt-hero-right{display:none !important;}
  .tt-about-grid{grid-template-columns:1fr !important;gap:32px !important;padding:0 16px 48px !important;}
  .tt-feat-grid{grid-template-columns:1fr 1fr !important;padding:36px 16px !important;}
  .tt-team-grid{display:none !important;}
  .tt-carousel-wrap{display:block !important;}
}
@media(max-width:420px){ .tt-feat-grid{grid-template-columns:1fr !important;} }
      `}</style>

      <TeamModal member={modalMember} onClose={() => setModalMember(null)} />

      {/* ════════ 1. HERO ════════ */}
      <section className="tt-hero">
        <div className="tt-hero-grid-fade" />
        <div className="tt-blob tt-blob-1" />
        <div className="tt-blob tt-blob-2" />
        <div className="tt-blob tt-blob-3" />

        <div className="tt-hero-inner">
          <div>
            <div className="tt-fadeup" style={{ marginBottom: 20 }}>
              <span style={{ display:"inline-flex",alignItems:"center",gap:9,background:"rgba(255,255,255,0.82)",backdropFilter:"blur(10px)",border:"1px solid rgba(99,102,241,0.22)",borderRadius:99,padding:"8px 18px",fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:10,letterSpacing:".1em",color:"#1e293b",textTransform:"uppercase",boxShadow:"0 4px 18px rgba(99,102,241,0.1)" }}>
                <span className="tt-live" />
                India's Trusted Trainer Platform
              </span>
            </div>
            <h1 className="tt-slideL tt-d1" style={{ fontFamily:"'Poppins',sans-serif",fontSize:"clamp(32px,4.8vw,66px)",fontWeight:900,lineHeight:1.05,color:"#0f172a",marginBottom:22,letterSpacing:"-2px" }}>
              Connect with{" "}
              <span style={{ background:"linear-gradient(90deg,#4f46e5,#7c3aed,#4f46e5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
                expert trainers.
              </span>
              <br />
              Unlock your{" "}
              <span style={{ background:"linear-gradient(90deg,#7c3aed,#2563eb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
                potential.
              </span>
            </h1>
            <p className="tt-fadeup tt-d2" style={{ color:"#4b5563",fontSize:16,lineHeight:1.85,maxWidth:490,fontFamily:"'Poppins',sans-serif",marginBottom:36,fontWeight:400 }}>
              TopTrainer is India's trusted platform where students discover verified, experienced trainers across every subject, skill, and competitive exam — and where trainers showcase their expertise to thousands of eager learners.
            </p>
         
            <div className="tt-fadeup tt-d4" style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
              <a href="/trainers"
                style={{ display:"inline-flex",alignItems:"center",gap:9,background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"#fff",padding:"14px 28px",borderRadius:50,fontWeight:700,fontSize:14,textDecoration:"none",fontFamily:"'Poppins',sans-serif",boxShadow:"0 10px 32px rgba(79,70,229,0.38)",transition:"all .28s cubic-bezier(.22,1,.36,1)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(79,70,229,0.52)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(79,70,229,0.38)"; }}
              >Find a Trainer <ArrowUpRight size={16} /></a>
              <a href="/courses"
                style={{ display:"inline-flex",alignItems:"center",gap:9,background:"rgba(255,255,255,0.78)",backdropFilter:"blur(12px)",color:"#4f46e5",padding:"14px 28px",borderRadius:50,fontWeight:700,fontSize:14,textDecoration:"none",fontFamily:"'Poppins',sans-serif",border:"1.5px solid rgba(99,102,241,0.3)",transition:"all .28s cubic-bezier(.22,1,.36,1)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(99,102,241,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.78)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >Explore Courses</a>
            </div>
          </div>

          <div className="tt-hero-right tt-scaleIn tt-d3" style={{ display:"flex",justifyContent:"flex-end" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ════════ 2. FEATURES ════════ */}
      <section style={{ background:"#f8fafc" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"62px 24px 14px",textAlign:"center" }}>
          <span style={{ fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:B,display:"block",marginBottom:12,fontFamily:"'Poppins',sans-serif" }}>What We Offer</span>
          <h2 className="tt-fadeup" style={{ fontFamily:"'Poppins',sans-serif",fontSize:"clamp(22px,2.8vw,40px)",fontWeight:900,color:"#0f172a",letterSpacing:"-0.5px" }}>
            Everything you need to <span className="tt-shimmer">succeed</span>
          </h2>
        </div>
        <div className="tt-feat-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className={`tt-feat-card tt-fadeup tt-d${i + 2}`}>
                <div className="tt-feat-icon" style={{ background:f.bg }}>
                  <Icon size={28} strokeWidth={1.5} color={f.color} />
                </div>
                <h3 style={{ fontWeight:800,fontSize:15,color:"#1e293b",marginBottom:9,fontFamily:"'Poppins',sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize:13.5,color:"#64748b",lineHeight:1.75,fontFamily:"'Poppins',sans-serif" }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════ 3. ABOUT SPLIT ════════ */}
      <section style={{ background:"#fff",padding:"72px 0 0" }}>
        <div className="tt-about-grid">
          <div>
            <span style={{ fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:B,display:"block",marginBottom:12,fontFamily:"'Poppins',sans-serif" }}>About TopTrainer</span>
            <h2 className="tt-fadeup" style={{ fontFamily:"'Poppins',sans-serif",fontSize:"clamp(22px,2.8vw,40px)",fontWeight:900,color:"#0f172a",marginBottom:18,lineHeight:1.15,letterSpacing:"-0.5px" }}>
              Why students choose <span className="tt-shimmer">TopTrainer</span>
            </h2>
            <div style={{ width:48,height:3,background:`linear-gradient(90deg,${B},${PUR})`,borderRadius:2,marginBottom:24 }} />
            <p style={{ fontSize:15,color:"#475569",lineHeight:1.85,marginBottom:14,fontFamily:"'Poppins',sans-serif" }}>TopTrainer is India's leading platform for finding verified trainers. Whether you're preparing for a competitive exam, learning a new skill, or planning your career — we have the right mentor for you.</p>
            <p style={{ fontSize:15,color:"#475569",lineHeight:1.85,marginBottom:30,fontFamily:"'Poppins',sans-serif" }}>Trainers showcase their expertise, students find the perfect match, and learning happens seamlessly in one trusted space.</p>
            <div>{CHECKLIST.map((item) => (<div key={item} className="tt-check-row"><CheckCircle size={18} color={B} fill={BL} strokeWidth={2} style={{ flexShrink:0 }} />{item}</div>))}</div>
          </div>
          <div>
            <div style={{ background:`linear-gradient(135deg,${BL},#dbeafe)`,border:`1px solid ${BM}`,borderRadius:26,padding:"42px 38px",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-44,right:-44,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,70,229,.12),transparent 70%)" }} />
              {[["50K+","Active Learners"],["1,200+","Verified Trainers"],["4.9 / 5","Average Rating"],["200+","Skill Categories"]].map(([stat,label]) => (
                <div key={label} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid rgba(79,70,229,.1)",fontFamily:"'Poppins',sans-serif" }}>
                  <span style={{ fontSize:14,color:"#475569",fontWeight:500 }}>{label}</span>
                  <span style={{ fontSize:22,fontWeight:900,color:B }}>{stat}</span>
                </div>
              ))}
              <div style={{ marginTop:26,background:`linear-gradient(135deg,${B},${PUR})`,borderRadius:14,padding:"18px 22px",color:"#fff",fontFamily:"'Poppins',sans-serif",fontSize:14,fontStyle:"italic",lineHeight:1.75 }}>"Our mission is to empower every student with the right trainer and guidance to build a successful future."</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 4. TEAM ════════ */}
      <section style={{ background:"#f8fafc",padding:"82px 0 92px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px 52px" }}>
          <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,flexWrap:"wrap" }}>
            <div>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:B,display:"block",marginBottom:12,fontFamily:"'Poppins',sans-serif" }}>Our Team</span>
              <h2 className="tt-fadeup" style={{ fontFamily:"'Poppins',sans-serif",fontSize:"clamp(24px,3vw,44px)",fontWeight:900,color:"#0f172a",marginBottom:10,letterSpacing:"-0.6px",lineHeight:1.08 }}>The people behind <span className="tt-shimmer">TopTrainer</span></h2>
              <p style={{ fontSize:15,color:"#64748b",lineHeight:1.8,maxWidth:520,fontFamily:"'Poppins',sans-serif" }}>Meet the creators, developers, and visionaries building the future of trainer discovery and online learning.</p>
            </div>
            <div style={{ display:"flex",gap:12,alignItems:"center",flexShrink:0 }}>
              <button className="tt-nav-btn"
                style={{ background:"#fff",color:B,border:`1.5px solid ${BM}`,boxShadow:"0 4px 16px rgba(79,70,229,.1)" }}
                onClick={() => { goPrev(); stopAuto(); startAuto(); }}
                onMouseEnter={(e) => e.currentTarget.style.background = BL}
                onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
              ><ChevronLeft size={20} /></button>
              <button className="tt-nav-btn"
                style={{ background:`linear-gradient(135deg,${B},${PUR})`,color:"#fff",border:"none",boxShadow:"0 8px 24px rgba(79,70,229,.38)" }}
                onClick={() => { goNext(); stopAuto(); startAuto(); }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = ".86"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              ><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        <div className="tt-team-grid">
          {TEAM.map((m, i) => (
            <div key={m.name} className={`tt-fadeup tt-d${i + 1}`}>
              <TeamCard member={m} onClick={() => setModalMember(m)} />
            </div>
          ))}
        </div>

        <div className="tt-carousel-wrap" style={{ padding:"0 24px" }}>
          <div
            style={{ position:"relative",width:"100%",maxWidth:360,margin:"0 auto" }}
            onMouseDown={(e) => onDragStart(e.clientX)} onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)} onTouchEnd={onDragEnd}
          >
            <div style={{ position:"absolute",top:14,left:"50%",transform:"translateX(-50%)",width:"82%",height:"96%",borderRadius:22,background:"#c7d2fe",zIndex:0 }} />
            <div style={{ position:"absolute",top:7,left:"50%",transform:"translateX(-50%)",width:"91%",height:"98%",borderRadius:22,background:"#e0e7ff",zIndex:0 }} />
            <div key={carouselIndex} style={{ position:"relative",zIndex:1,transform:`translateX(${isDragging ? dragDelta * 0.09 : 0}px)`,transition:isDragging?"none":"transform .32s ease",animation:"tt-carIn .4s cubic-bezier(.22,1,.36,1) both" }}>
              <TeamCard member={TEAM[carouselIndex]} onClick={() => !isDragging && Math.abs(dragDelta) < 8 && setModalMember(TEAM[carouselIndex])} />
            </div>
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:8,marginTop:26 }}>
            {TEAM.map((_,i) => (
              <button key={i} className="tt-dot-ind"
                onClick={() => { goTo(i); stopAuto(); startAuto(); }}
                style={{ width:i===carouselIndex?28:8,background:i===carouselIndex?B:BM }}
              />
            ))}
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:8,marginTop:18,flexWrap:"wrap" }}>
            {TEAM.map((m,i) => (
              <button key={m.name} onClick={() => { goTo(i); stopAuto(); startAuto(); }}
                style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 14px 6px 8px",borderRadius:40,border:`1.5px solid ${i===carouselIndex?B:"#e2e8f0"}`,background:i===carouselIndex?BL:"#fff",cursor:"pointer",transition:"all .28s",fontFamily:"'Poppins',sans-serif" }}
              >
                <div style={{ width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${m.gradient[0]},${m.gradient[1]})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:9,color:"#fff",flexShrink:0 }}>{m.initials}</div>
                <span style={{ fontSize:12,fontWeight:600,color:i===carouselIndex?B:"#64748b",whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}