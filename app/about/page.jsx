"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Users,
  User,
  ClipboardList,
  Briefcase,
  Award,
  Star,
  Target,
  Eye,
  MapPin,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const B = "#2563eb";
const BD = "#1d4ed8";
const BL = "#eff6ff";
const BM = "#bfdbfe";
const DARK = "#0b1a3a";

const DEFAULT_STATS = [
  { icon: "User", num: "5,000+", lbl: "Trainers" },
  { icon: "Users", num: "15,000+", lbl: "Learners" },
  { icon: "Briefcase", num: "100+", lbl: "Workshops" },
  { icon: "ClipboardList", num: "300+", lbl: "Articles" },
  { icon: "Star", num: "4.8/5", lbl: "Learner Rating" },
  { icon: "Award", num: "25+", lbl: "Expertise" },
];

const DEFAULT_LEADERSHIP = [
  {
    name: "Harsh Jasrotia",
    role: "Founder & CEO",
    desc: "25+ Years in Business Growth Learning & Corporate Training",
    initials: "HJ",
    image: "/about-us/leadership/harsh.jpg",
    gradient: ["#1e3a8a", "#2563eb"],
    linkedin: "#",
    email: "mailto:harsh@toptrainer.com",
  },
  {
    name: "Sonali Sharma",
    role: "COO",
    desc: "Operations Strategy & Learning Excellence",
    initials: "SS",
    image: "/about-us/leadership/sonali.jpg",
    gradient: ["#7c3aed", "#a78bfa"],
    linkedin: "#",
    email: "mailto:sonali@toptrainer.com",
  },
  {
    name: "Vikram Nair",
    role: "CTO",
    desc: "Technology Leader with Product Innovation Focus",
    initials: "VN",
    image: "/about-us/leadership/vikram.jpg",
    gradient: ["#0891b2", "#22d3ee"],
    linkedin: "#",
    email: "mailto:vikram@toptrainer.com",
  },
];

const DEFAULT_TEAM = [
  {
    name: "Ayesha Khan",
    role: "Marketing Manager",
    category: "Marketing",
    joined: "Joined May 2023",
    initials: "AK",
    image: "/about-us/team/ayesha.jpg",
    gradient: ["#1e3a8a", "#3b82f6"],
    linkedin: "#",
    email: "mailto:ayesha@toptrainer.com",
  },
  {
    name: "Rohit Verma",
    role: "Product Manager",
    category: "Technology",
    joined: "Joined Aug 2023",
    initials: "RV",
    image: "/about-us/team/rohit.jpg",
    gradient: ["#4f46e5", "#818cf8"],
    linkedin: "#",
    email: "mailto:rohit@toptrainer.com",
  },
  {
    name: "Neha Iyer",
    role: "Content Lead",
    category: "Content",
    joined: "Joined Jan 2024",
    initials: "NI",
    image: "/about-us/team/neha.jpg",
    gradient: ["#334155", "#64748b"],
    linkedin: "#",
    email: "mailto:neha@toptrainer.com",
  },
  {
    name: "Arjun Mehta",
    role: "Business Development",
    category: "Business Development",
    joined: "Joined Feb 2024",
    initials: "AM",
    image: "/about-us/team/arjun.jpg",
    gradient: ["#0e7490", "#22d3ee"],
    linkedin: "#",
    email: "mailto:arjun@toptrainer.com",
  },
  {
    name: "Pooja Singh",
    role: "Customer Success",
    category: "Customer Success",
    joined: "Joined Mar 2024",
    initials: "PS",
    image: "/about-us/team/pooja.jpg",
    gradient: ["#15803d", "#4ade80"],
    linkedin: "#",
    email: "mailto:pooja@toptrainer.com",
  },
  {
    name: "Karan Malhotra",
    role: "Growth Manager",
    category: "Marketing",
    joined: "Joined Apr 2024",
    initials: "KM",
    image: "/about-us/team/karan.jpg",
    gradient: ["#1d4ed8", "#60a5fa"],
    linkedin: "#",
    email: "mailto:karan@toptrainer.com",
  },
];

const DEFAULT_CULTURE = [
  { label: "Team Meetups", image: "/about-us/culture/team-meetup.jpg", gradient: ["#2563eb", "#60a5fa"] },
  { label: "Workshops", image: "/about-us/culture/workshops.jpg", gradient: ["#7c3aed", "#a78bfa"] },
  { label: "Learning Sessions", image: "/about-us/culture/learning.jpg", gradient: ["#0891b2", "#22d3ee"] },
  { label: "Team Building", image: "/about-us/culture/team-building.jpg", gradient: ["#16a34a", "#4ade80"] },
  { label: "Celebrations", image: "/about-us/culture/celebration.jpg", gradient: ["#ea580c", "#fb923c"] },
  { label: "Events", image: "/about-us/culture/events.jpg", gradient: ["#dc2626", "#f87171"] },
];

const TEAM_FILTERS = [
  "All",
  "Leadership",
  "Operations",
  "Technology",
  "Marketing",
  "Content",
  "Business Development",
  "Customer Success",
];

const DEPT_COLOR = {
  Marketing: { bg: "#eff6ff", fg: "#2563eb" },
  Technology: { bg: "#f5f3ff", fg: "#7c3aed" },
  Content: { bg: "#f1f5f9", fg: "#475569" },
  "Business Development": { bg: "#ecfeff", fg: "#0891b2" },
  "Customer Success": { bg: "#f0fdf4", fg: "#16a34a" },
  Operations: { bg: "#fdf2f8", fg: "#db2777" },
  Leadership: { bg: "#fffbeb", fg: "#d97706" },
};

const ICONS = {
  Users,
  User,
  ClipboardList,
  Briefcase,
  Award,
  Star,
};

function CountUp({ target, suffix = "", decimals = 0, duration = 1800 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setVal(target * eased);
              if (progress < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

function StatNumber({ num }) {
  const str = String(num ?? "");
  const match = str.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return <span>{str}</span>;

  const raw = match[1];
  const suffix = match[2];
  const target = parseFloat(raw.replace(/,/g, ""));
  const decimals = raw.includes(".") ? (raw.split(".")[1] || "").length : 0;

  return <CountUp target={target} suffix={suffix} decimals={decimals} />;
}

function getImgSrc(img) {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img?.url || "";
}

function Avatar({ src, initials, gradient = ["#1e3a8a", "#2563eb"], size = 96, radius = "50%" }) {
  const [err, setErr] = useState(false);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        background: `linear-gradient(145deg, ${gradient[0]}, ${gradient[1]})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontSize: size * 0.32,
          zIndex: 1,
        }}
      >
        {initials}
      </div>

      {!err && src && (
        <Image
          src={src}
          alt={initials || "avatar"}
          fill
          onError={() => setErr(true)}
          style={{ objectFit: "cover", objectPosition: "top center", zIndex: 2 }}
        />
      )}
    </div>
  );
}

function IconLink({ href, children }) {
  return (
    <a
      href={href}
      aria-label="social link"
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: BL,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: B,
        transition: "0.25s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.background = "#dbeafe";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = BL;
      }}
    >
      {children}
    </a>
  );
}

function LeadershipCard({ person }) {
  return (
    <div className="card">
      <Avatar src={getImgSrc(person.image)} initials={person.initials} gradient={person.gradient} size={72} />
      <div style={{ flex: 1 }}>
        <h3 className="card-title">{person.name}</h3>
        <div className="card-role">{person.role}</div>
        <p className="card-desc">{person.desc}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <IconLink href={person.linkedin || "#"}>
            <Linkedin size={15} />
          </IconLink>
          <IconLink href={person.email || "#"}>
            <Mail size={15} />
          </IconLink>
        </div>
      </div>
    </div>
  );
}

function TeamMemberCard({ member }) {
  const dept = DEPT_COLOR[member.category] || { bg: BL, fg: B };

  return (
    <div className="team-card">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <Avatar src={getImgSrc(member.image)} initials={member.initials} gradient={member.gradient} size={86} />
      </div>

      <h3 className="team-name">{member.name}</h3>
      <div className="team-role">{member.role}</div>

      <span
        style={{
          display: "inline-block",
          padding: "5px 12px",
          borderRadius: 999,
          background: dept.bg,
          color: dept.fg,
          fontSize: 11,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {member.category}
      </span>

      <div className="team-joined">{member.joined}</div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <IconLink href={member.linkedin || "#"}>
          <Linkedin size={15} />
        </IconLink>
        <IconLink href={member.email || "#"}>
          <Mail size={15} />
        </IconLink>
      </div>
    </div>
  );
}

function CultureCard({ item }) {
  const [err, setErr] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 160,
        borderRadius: 18,
        overflow: "hidden",
        flexShrink: 0,
        background: `linear-gradient(135deg, ${item.gradient?.[0] || "#2563eb"}, ${item.gradient?.[1] || "#60a5fa"})`,
      }}
    >
      {!err && getImgSrc(item.image) && (
        <Image
          src={getImgSrc(item.image)}
          alt={item.label}
          fill
          onError={() => setErr(true)}
          style={{ objectFit: "cover" }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,.72), transparent 65%)",
        }}
      />
      <span className="culture-label">{item.label}</span>
    </div>
  );
}

function normalizeAbout(a) {
  return {
    heroTitle: a?.heroTitle || "Building India's Largest Community of Professional Trainers",
    heroSubtitle:
      a?.heroSubtitle ||
      "Connecting organizations, learners and experienced trainers through one trusted platform.",
    heroBadgeLine1: a?.heroBadgeLine1 || "Empowering Trainers.",
    heroBadgeLine2: a?.heroBadgeLine2 || "Transforming Learning.",
    heroImage: getImgSrc(a?.heroImage) || "/about-us/hero-team.jpg",
    stats: a?.stats?.length ? a.stats : DEFAULT_STATS,
    mission:
      a?.mission ||
      "Enable professionals and organizations to discover the right trainers, upskill continuously and build a culture of continuous learning.",
    vision:
      a?.vision ||
      "Become the world's most trusted trainer discovery platform and the largest learning community globally.",
    leadership: a?.leadership?.length ? a.leadership : DEFAULT_LEADERSHIP,
    team: a?.team?.length ? a.team : DEFAULT_TEAM,
    culture: a?.culture?.length ? a.culture : DEFAULT_CULTURE,
  };
}

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [liveStats, setLiveStats] = useState(null);
  const [teamFilter, setTeamFilter] = useState("All");
  const [cultureIndex, setCultureIndex] = useState(0);
  const cultureScrollRef = useRef(null);
  const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "toptrainer-backend-production.up.railway.app0";



  useEffect(() => {
    (async () => {
      try {
      const res = await fetch(`${API_BASE}/api/admin/about`, {
  credentials: "include",
});
        const data = await res.json();
        setAbout(normalizeAbout(data.about));
      } catch {
        setAbout(normalizeAbout(null));
      }
    })();
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/about/stats`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.stats) setLiveStats(data.stats);
      })
      .catch(() => {});
  }, []);

  const normalized = about || normalizeAbout(null);

  const stats = liveStats
    ? [
        { icon: "User", num: Number(liveStats.trainers || 0).toLocaleString("en-US"), lbl: "Trainers" },
        { icon: "Users", num: Number(liveStats.users || 0).toLocaleString("en-US"), lbl: "Learners" },
        { icon: "Briefcase", num: Number(liveStats.workshops || 0).toLocaleString("en-US"), lbl: "Workshops" },
        { icon: "ClipboardList", num: Number(liveStats.articles || 0).toLocaleString("en-US"), lbl: "Articles" },
        { icon: "Star", num: `${(Number(liveStats.rating) || 0).toFixed(1)}/5`, lbl: "Learner Rating" },
        { icon: "Award", num: Number(liveStats.expertise || 0).toLocaleString("en-US"), lbl: "Expertise" },
      ]
    : normalized.stats;

  const filteredTeam =
    teamFilter === "All" ? normalized.team : normalized.team.filter((m) => m.category === teamFilter);

  const scrollCulture = (dir) => {
    const el = cultureScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <div className="tt-about">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        html{ scroll-behavior:smooth; }
        .tt-about{
          font-family:'Poppins',sans-serif;
          background:linear-gradient(180deg,#ffffff 0%,#f8fbff 100%);
          color:#0f172a;
        }
        .container{
          max-width:1240px;
          margin:auto;
          padding:0 24px;
        }
        .section-label{
          font-size:12px;
          font-weight:800;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:#1d4ed8;
          margin-bottom:18px;
        }
        .hero-grid{
          max-width:1240px;
          margin:auto;
          padding:64px 24px 40px;
          display:grid;
          grid-template-columns:1.05fr .95fr;
          gap:44px;
          align-items:center;
        }
        .hero-photo{
          position:relative;
          overflow:hidden;
          border-radius:24px;
          height:390px;
          background:linear-gradient(135deg,#1e3a8a,#2563eb,#1d4ed8);
          box-shadow:0 24px 60px rgba(37,99,235,.18);
        }
        .hero-badge{
          position:absolute;
          right:0;
          bottom:0;
          background:${B};
          color:white;
          padding:22px 30px;
          font-weight:800;
          font-size:18px;
          line-height:1.4;
          text-align:right;
          clip-path:polygon(25% 0,100% 0,100% 100%,0 100%);
        }
        .stats-strip{
          max-width:1240px;
          margin:-24px auto 0;
          position:relative;
          z-index:2;
          display:grid;
          grid-template-columns:repeat(6,1fr);
          background:white;
          border-radius:20px;
          border:1px solid #e8ecf4;
          box-shadow:0 16px 44px rgba(15,23,42,.08);
          padding:24px 8px;
        }
        .stat-item{
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 14px;
        }
        .stat-icon{
          width:44px;
          height:44px;
          border-radius:50%;
          background:${BL};
          color:${B};
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }
        .mv-section{
          max-width:1240px;
          margin:auto;
          padding:84px 24px 0;
        }
        .mv-grid{
          display:grid;
          grid-template-columns:1fr 1fr 1.2fr;
          gap:22px;
          margin-top:22px;
        }
        .mv-card, .card, .team-card{
          background:white;
          border:1px solid #e8ecf4;
          border-radius:20px;
        }
        .mv-card{
          padding:30px;
        }
        .mv-icon{
          width:52px;
          height:52px;
          border-radius:14px;
          background:${BL};
          color:${B};
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom:16px;
        }
        .impact-card{
          background:${BL};
          border:1px solid ${BM};
          border-radius:18px;
          padding:22px;
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:14px;
          margin-top:16px;
        }
        .impact-row{
          display:flex;
          gap:10px;
          margin-bottom:12px;
                  }
        .world-map{
          position:relative;
          border-radius:14px;
          overflow:hidden;
          background:#dbe7fb;
          height:170px;
          margin-top:10px;
        }
        .world-map::before{
          content:"";
          position:absolute;
          inset:0;
          background-image:radial-gradient(rgba(37,99,235,.38) 1.2px, transparent 1.2px);
          background-size:10px 10px;
        }
        .card{
          padding:28px;
          display:flex;
          gap:18px;
          align-items:flex-start;
          transition:.25s ease;
        }
        .card:hover,.team-card:hover{
          transform:translateY(-5px);
          box-shadow:0 20px 48px rgba(37,99,235,.12);
        }
        .card-title{
          font-weight:800;
          color:#0f172a;
          font-size:16px;
          margin-bottom:4px;
        }
        .card-role{
          color:${B};
          font-size:12px;
          font-weight:700;
          margin-bottom:10px;
        }
        .card-desc{
          color:#64748b;
          font-size:13px;
          line-height:1.7;
          margin-bottom:14px;
        }
        .team-filter-wrap{
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
          margin-top:25px;
          margin-bottom:35px;
        }
        .team-filter{
          border:1px solid #dbe4f0;
          background:#fff;
          color:#334155;
          padding:10px 16px;
          border-radius:999px;
          font-size:13px;
          font-weight:600;
          cursor:pointer;
          transition:.2s ease;
        }
        .team-filter:hover{
          border-color:${B};
          color:${B};
          transform:translateY(-1px);
        }
        .team-filter.active{
          background:${B};
          color:#fff;
          border-color:${B};
          box-shadow:0 10px 20px rgba(37,99,235,.18);
        }
        .team-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
        }
        .team-card{
          padding:26px 20px;
          text-align:center;
          transition:.25s ease;
        }
        .team-name{
          font-weight:800;
          color:#0f172a;
          font-size:15px;
          margin-bottom:4px;
        }
        .team-role{
          color:#64748b;
          font-size:13px;
          margin-bottom:10px;
        }
        .team-joined{
          font-size:11px;
          color:#94a3b8;
          margin-bottom:14px;
        }
        .culture-section{
          background:#f8fafc;
          margin-top:80px;
          padding:80px 0;
        }
        .culture-head{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:25px;
        }
        .culture-nav{
          display:flex;
          gap:10px;
        }
        .nav-btn{
          width:38px;
          height:38px;
          border-radius:50%;
          border:1px solid #dbe4f0;
          background:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          transition:.2s ease;
        }
        .nav-btn:hover{
          border-color:${B};
          color:${B};
        }
        .culture-scroll{
          display:flex;
          gap:16px;
          overflow-x:auto;
          scroll-behavior:smooth;
          padding-bottom:4px;
        }
        .culture-label{
          position:absolute;
          left:10px;
          bottom:10px;
          background:${B};
          color:#fff;
          font-size:11px;
          font-weight:700;
          padding:5px 10px;
          border-radius:6px;
          z-index:3;
        }
        .dots{
          display:flex;
          justify-content:center;
          gap:8px;
          margin-top:20px;
        }
        .dot{
          height:8px;
          border-radius:20px;
          background:#cbd5e1;
          transition:.2s ease;
        }
        .dot.active{
          width:22px;
          background:${B};
        }
        .cta{
          max-width:1240px;
          margin:70px auto 0;
          padding:0 24px;
        }
        .cta-box{
          background:${BL};
          border:1px solid ${BM};
          border-radius:20px;
          padding:30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          flex-wrap:wrap;
          gap:20px;
        }
        .cta-left{
          display:flex;
          gap:18px;
          align-items:center;
        }
        .cta-icon{
          width:54px;
          height:54px;
          border-radius:14px;
          background:${B};
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .cta-title{
          font-size:18px;
          font-weight:800;
          color:#0f172a;
          margin-bottom:6px;
        }
        .cta-text{
          color:#64748b;
        }
        .cta-links{
          display:flex;
          gap:12px;
          flex-wrap:wrap;
        }
        .cta-link{
          text-decoration:none;
          background:#fff;
          color:${B};
          border:1px solid ${BM};
          padding:12px 18px;
          border-radius:10px;
          font-weight:700;
          transition:.2s ease;
        }
        .cta-link.primary{
          background:${B};
          color:#fff;
          border-color:${B};
        }
        .cta-link:hover{
          transform:translateY(-2px);
        }
        .footer{
          background:${DARK};
          margin-top:80px;
          color:#cbd5e1;
          padding:60px 24px 0;
        }
        .footer-grid{
          max-width:1240px;
          margin:0 auto;
          display:grid;
          grid-template-columns:1.4fr 1fr 1fr 1fr 1.2fr;
          gap:30px;
          padding-bottom:40px;
        }
        .footer h4{
          color:#fff;
          margin-bottom:14px;
        }
        .footer p{
          color:#94a3b8;
          line-height:1.7;
          margin-bottom:8px;
        }
        .newsletter{
          display:flex;
          gap:8px;
        }
        .newsletter input{
          flex:1;
          padding:12px;
          border-radius:8px;
          border:none;
          outline:none;
        }
        .newsletter button{
          width:44px;
          border-radius:8px;
          border:none;
          background:${B};
          color:#fff;
          cursor:pointer;
        }
        .footer-bottom{
          border-top:1px solid rgba(255,255,255,.08);
          text-align:center;
          padding:20px 0;
          color:#64748b;
          font-size:13px;
        }
        @media(max-width:1024px){
          .hero-grid,.mv-grid,.footer-grid{
            grid-template-columns:1fr;
          }
          .stats-strip{
            grid-template-columns:repeat(3,1fr);
          }
          .team-grid{
            grid-template-columns:repeat(2,1fr);
          }
        }
        @media(max-width:640px){
          .stats-strip,.team-grid{
            grid-template-columns:1fr 1fr;
          }
          .hero-photo{
            height:300px;
          }
          .mv-card{
            padding:24px;
          }
          .card{
            padding:24px;
          }
          .cta-box{
            padding:24px;
          }
          .hero-badge{
            font-size:16px;
            padding:18px 22px;
          }
          .culture-head{
            flex-direction:column;
            align-items:flex-start;
            gap:14px;
          }
          .footer-grid{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <section className="hero-grid">
        <div>
          <span
            style={{
              display: "inline-block",
              background: BL,
              color: BD,
              padding: "6px 14px",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 18,
            }}
          >
            ABOUT TOPTRAINER
          </span>

          <h1
            style={{
              fontSize: "clamp(32px,4vw,46px)",
              lineHeight: 1.2,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 18,
            }}
          >
            {normalized.heroTitle}
          </h1>

          <p
            style={{
              color: "#64748b",
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: 28,
            }}
          >
            {normalized.heroSubtitle}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#team"
              style={{
                background: B,
                color: "#fff",
                padding: "13px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Meet Our Team
            </a>
            <a
              href="#story"
              style={{
                background: "#fff",
                color: B,
                border: `1px solid ${BM}`,
                padding: "13px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="hero-photo">
          <Image
            src={normalized.heroImage || "/about-us/hero-team.jpg"}
            alt="TopTrainer Team"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="hero-badge">
            {normalized.heroBadgeLine1}
            <br />
            {normalized.heroBadgeLine2}
          </div>
        </div>
      </section>

      <div className="stats-strip">
        {stats.map((s) => {
          const Icon = ICONS[s.icon] || Users;
          return (
            <div key={s.lbl} className="stat-item">
              <div className="stat-icon">
                <Icon size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>
                  <StatNumber num={s.num} />
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{s.lbl}</div>
              </div>
            </div>
          );
        })}
      </div>

      <section id="story" className="mv-section">
        <div className="section-label">OUR MISSION & VISION</div>

        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-icon">
              <Target size={22} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 12 }}>
              Our Mission
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 14 }}>{normalized.mission}</p>
          </div>

          <div className="mv-card">
            <div className="mv-icon">
              <Eye size={22} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 12 }}>
              Our Vision
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 14 }}>{normalized.vision}</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e8ecf4", borderRadius: 18, padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: "#0f172a" }}>
              OUR IMPACT
            </h3>

            <div className="impact-card">
              <div>
                {stats.slice(0, 5).map((item) => {
                  const Icon = ICONS[item.icon] || Users;
                  return (
                    <div key={item.lbl} className="impact-row">
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: "#fff",
                          color: B,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: "#0f172a" }}>
                          <StatNumber num={item.num} />
                        </div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{item.lbl}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="world-map">
                <MapPin size={18} color={B} style={{ position: "absolute", top: "20%", left: "20%" }} />
                <MapPin size={18} color={B} style={{ position: "absolute", top: "30%", left: "55%" }} />
                <MapPin size={18} color={B} style={{ position: "absolute", top: "60%", left: "75%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <div className="section-label" style={{ textAlign: "center" }}>
          OUR LEADERSHIP
        </div>
        <div className="team-grid" style={{ marginTop: 30 }}>
          {normalized.leadership.map((person) => (
            <LeadershipCard key={person.name} person={person} />
          ))}
        </div>
      </section>

      <section
        id="team"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "80px 24px 0",
          textAlign: "center",
        }}
      >
        <div className="section-label">OUR TEAM</div>

        <div className="team-filter-wrap">
          {TEAM_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setTeamFilter(filter)}
              className={`team-filter ${teamFilter === filter ? "active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="team-grid">
          {filteredTeam.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="culture-section">
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="culture-head">
            <div className="section-label">OUR CULTURE</div>
            <div className="culture-nav">
              <button className="nav-btn" onClick={() => scrollCulture(-1)}>
                <ChevronLeft size={16} />
              </button>
              <button className="nav-btn" onClick={() => scrollCulture(1)}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={cultureScrollRef}
            className="culture-scroll"
            onScroll={(e) => {
              const idx = Math.round(e.currentTarget.scrollLeft / 236);
              setCultureIndex(idx);
            }}
          >
            {normalized.culture.map((item) => (
              <CultureCard key={item.label} item={item} />
            ))}
          </div>

          <div className="dots">
            {normalized.culture.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === cultureIndex ? "active" : ""}`}
                style={{ width: i === cultureIndex ? 22 : 8 }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-box">
          <div className="cta-left">
            <div className="cta-icon">
              <Users size={24} />
            </div>

            <div>
              <h3 className="cta-title">WANT TO BUILD THE FUTURE OF LEARNING WITH US?</h3>
              <p className="cta-text">Join thousands of trainers and learners building the future together.</p>
            </div>
          </div>

          <div className="cta-links">
            <Link href="/careers" className="cta-link primary">
              Explore Careers
            </Link>
            <Link href="/internships" className="cta-link">
              Become an Intern
            </Link>
            <Link href="/partner" className="cta-link">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}