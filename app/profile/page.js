"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download, MapPin, Briefcase, GraduationCap,
  Globe, Phone, Mail, Award,
} from "lucide-react";
import { Linkedin, Instagram, Youtube, Facebook } from "lucide-react";

/* ===== STYLES ===== */
const styles = `
  @keyframes fadeSlideUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseBlue {
    0%,100% { box-shadow:0 0 0 0   rgba(37,99,235,0.45); }
    50%      { box-shadow:0 0 0 9px rgba(37,99,235,0);    }
  }
  @keyframes borderGlow {
    0%,100% { border-color:#2563eb; }
    50%      { border-color:#1e3a8a; }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-16px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes badgePop {
    0%   { transform:scale(0.85); opacity:0; }
    70%  { transform:scale(1.05); }
    100% { transform:scale(1);    opacity:1; }
  }
  @keyframes floatA {
    0%,100% { transform:translateY(0px)   rotate(0deg);   }
    33%      { transform:translateY(-28px) rotate(120deg); }
    66%      { transform:translateY(14px)  rotate(240deg); }
  }
  @keyframes floatB {
    0%,100% { transform:translateY(0px)   rotate(0deg);    }
    40%      { transform:translateY(22px)  rotate(-90deg);  }
    80%      { transform:translateY(-16px) rotate(-200deg); }
  }
  @keyframes floatC {
    0%,100% { transform:translateX(0)  translateY(0);   }
    50%      { transform:translateX(20px) translateY(-24px); }
  }
  @keyframes orbitRing {
    from { transform:rotate(0deg); } to { transform:rotate(360deg); }
  }
  @keyframes pulseDot {
    0%,100% { opacity:0.25; transform:scale(1);    }
    50%      { opacity:0.6;  transform:scale(1.35); }
  }
  @keyframes driftLine {
    0%   { transform:scaleX(0.6) translateX(-10%); opacity:0.15; }
    50%  { transform:scaleX(1.1) translateX(5%);   opacity:0.35; }
    100% { transform:scaleX(0.6) translateX(-10%); opacity:0.15; }
  }

  .animate-fade-slide-up { animation:fadeSlideUp 0.55s ease both; }
  .animate-fade-in       { animation:fadeIn      0.4s  ease both; }
  .animate-slide-in-left { animation:slideInLeft 0.45s ease both; }
  .animate-badge-pop     { animation:badgePop    0.4s  ease both; }

  .shimmer-text {
    background:linear-gradient(90deg,#1e40af 0%,#60a5fa 40%,#1e3a8a 60%,#1e40af 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 3s linear infinite;
  }

  /* ── Background canvas ── */
  .bg-canvas { position:fixed; inset:0; z-index:0; overflow:hidden; pointer-events:none; }

  .bg-hex {
    position:absolute; inset:0; opacity:0.028;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32z' fill='none' stroke='%232563eb' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V52l28-16 28 16v32z' fill='none' stroke='%232563eb' stroke-width='1'/%3E%3C/svg%3E");
    background-size:56px 100px;
  }
  .bg-shape {
    position:absolute; border-radius:50%; opacity:0.07;
    background:radial-gradient(circle,#2563eb,#1e3a8a);
  }
  .bg-shape.s1 { width:420px;height:420px;top:-80px;left:-100px;   animation:floatA 14s ease-in-out infinite; }
  .bg-shape.s2 { width:280px;height:280px;top:30%;right:-60px;     animation:floatB 18s ease-in-out infinite; }
  .bg-shape.s3 { width:180px;height:180px;bottom:15%;left:10%;     animation:floatC 12s ease-in-out infinite; }
  .bg-shape.s4 { width:340px;height:340px;bottom:-60px;right:15%;  animation:floatA 20s ease-in-out infinite 3s; }
  .bg-shape.s5 { width:120px;height:120px;top:50%;left:40%;        animation:floatB 10s ease-in-out infinite 1s; }

  .bg-ring { position:absolute; border-radius:50%; border:1.5px solid rgba(37,99,235,0.13); }
  .bg-ring.r1 { width:600px;height:600px;top:-200px;left:-200px;  animation:orbitRing 30s linear infinite; }
  .bg-ring.r2 { width:400px;height:400px;bottom:0;right:-150px;   animation:orbitRing 22s linear infinite reverse; }

  .bg-dot { position:absolute; width:6px;height:6px; border-radius:50%; background:#2563eb; }
  .bg-dot.d1 { top:18%;left:12%; animation:pulseDot 4s   ease-in-out infinite;      }
  .bg-dot.d2 { top:42%;left:88%; animation:pulseDot 5s   ease-in-out infinite 0.8s; }
  .bg-dot.d3 { top:72%;left:25%; animation:pulseDot 3.5s ease-in-out infinite 1.4s; }
  .bg-dot.d4 { top:88%;left:70%; animation:pulseDot 6s   ease-in-out infinite 2s;   }
  .bg-dot.d5 { top:55%;left:55%; animation:pulseDot 4.5s ease-in-out infinite 0.4s; }
  .bg-dot.d6 { top:8%; left:65%; animation:pulseDot 5.5s ease-in-out infinite 1.8s; }

  .bg-line { position:absolute;height:1.5px;border-radius:4px;transform-origin:center;
    background:linear-gradient(90deg,transparent,rgba(37,99,235,0.25),transparent); }
  .bg-line.l1 { width:260px;top:22%;left:5%;   animation:driftLine  8s ease-in-out infinite; }
  .bg-line.l2 { width:180px;top:65%;right:8%;  animation:driftLine 11s ease-in-out infinite 2s; }
  .bg-line.l3 { width:220px;top:80%;left:35%;  animation:driftLine  9s ease-in-out infinite 1s; }

  /* ── Section / card interactions ── */
  .section-card { transition:box-shadow 0.25s ease; }
  .section-card:hover { box-shadow:0 4px 24px rgba(37,99,235,0.10); }

  .btn-download {
    background:linear-gradient(135deg,#2563eb,#1e40af);
    transition:all 0.25s ease; position:relative; overflow:hidden;
  }
  .btn-download::after {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,#1e40af,#1e3a8a);
    opacity:0;transition:opacity 0.25s;
  }
  .btn-download:hover::after  { opacity:1; }
  .btn-download:hover         { transform:scale(1.04); box-shadow:0 4px 18px rgba(37,99,235,0.45); }
  .btn-download > span        { position:relative; z-index:1; }

  .profile-ring { animation:borderGlow 2.5s ease-in-out infinite; }

  .exp-card:hover .exp-icon { animation:pulseBlue 1.2s ease infinite; }

  .cert-card {
    border:1.5px solid #e5e7eb;
    transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;
  }
  .cert-card:hover {
    transform:translateY(-4px) scale(1.02);
    box-shadow:0 12px 32px rgba(37,99,235,0.18);
    border-color:#2563eb;
  }

  .lang-badge { transition:background 0.2s,color 0.2s,transform 0.2s; cursor:default; }
  .lang-badge:hover { background:#2563eb;color:#fff;transform:scale(1.08); }

  .link-item { transition:color 0.2s,transform 0.2s; display:flex;align-items:center;gap:6px; }
  .link-item:hover { color:#1e40af;transform:translateX(3px); }

  .show-more-btn {
    position:relative; color:#2563eb; font-size:0.875rem; margin-top:0.75rem; transition:color 0.2s;
  }
  .show-more-btn::after {
    content:'';position:absolute;bottom:-2px;left:0;
    width:0;height:2px;
    background:linear-gradient(90deg,#2563eb,#1e3a8a);
    transition:width 0.25s ease;border-radius:2px;
  }
  .show-more-btn:hover { color:#1e3a8a; }
  .show-more-btn:hover::after { width:100%; }

  /* ── Responsive ── */
  @media (max-width:1024px){
    .main-grid  { display:flex!important; flex-direction:column; }
    .cert-grid  { grid-template-columns:repeat(2,1fr)!important; }
  }
  @media (max-width:640px){
    .header-row { flex-direction:column; align-items:flex-start!important; gap:12px; }
    .cert-grid  { grid-template-columns:1fr!important; }
    .bg-shape.s1 { width:220px;height:220px; }
    .bg-shape.s4 { display:none; }
  }
`;

/* ── Background Canvas ── */
function BackgroundCanvas() {
  return (
    <div className="bg-canvas">
      <div className="bg-hex" />
      <div className="bg-shape s1" /><div className="bg-shape s2" />
      <div className="bg-shape s3" /><div className="bg-shape s4" /><div className="bg-shape s5" />
      <div className="bg-ring r1"  /><div className="bg-ring r2" />
      <div className="bg-dot d1"   /><div className="bg-dot d2"  /><div className="bg-dot d3" />
      <div className="bg-dot d4"   /><div className="bg-dot d5"  /><div className="bg-dot d6" />
      <div className="bg-line l1"  /><div className="bg-line l2" /><div className="bg-line l3" />
    </div>
  );
}

/* ── Shared Section wrapper ── */
function Section({ title, children, delay = 0 }) {
  return (
    <div
      className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm section-card animate-fade-slide-up"
      style={{ animationDelay:`${delay}s` }}
    >
      <h2 className="text-lg font-semibold mb-4 shimmer-text">{title}</h2>
      {children}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <span className="font-medium text-gray-900">{label}:</span> {value}
    </p>
  );
}

function ExperienceCard({ exp, index }) {
  return (
    <div className="flex gap-4 group exp-card animate-slide-in-left" style={{ animationDelay:`${0.08*index}s` }}>
      <Briefcase className="text-blue-600 mt-1 flex-shrink-0 exp-icon transition-colors group-hover:text-blue-900" size={18} />
      <div>
        <h3 className="font-semibold group-hover:text-blue-700 transition-colors duration-200">{exp.role}</h3>
        <p className="text-sm text-gray-600">{exp.company}</p>
        <p className="text-xs text-gray-400">{exp.date}</p>
        <ul className="text-sm text-gray-700 mt-2 list-disc ml-4 space-y-1">
          {exp.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    </div>
  );
}

function EducationCard({ edu, index }) {
  return (
    <div className="flex gap-4 animate-slide-in-left" style={{ animationDelay:`${0.08*index}s` }}>
      <GraduationCap className="text-blue-700 mt-1 flex-shrink-0" size={18} />
      <div>
        <h3 className="font-semibold">{edu.title}</h3>
        <p className="text-sm text-gray-600">{edu.place}</p>
        <p className="text-xs text-gray-400">{edu.date}</p>
      </div>
    </div>
  );
}

function CertificateCard({ cert, index }) {
  return (
    <div className="cert-card rounded-2xl overflow-hidden animate-badge-pop bg-white" style={{ animationDelay:`${0.07*index}s` }}>
      <div className="relative w-full" style={{ paddingBottom:"62%" }}>
        <Image src={cert.image} alt={cert.title} fill className="object-cover" />
      </div>
      <div className="p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Award className="text-blue-700" size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{cert.title}</p>
          <span className="inline-flex items-center gap-1 text-xs text-blue-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />Verified
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function ProfilePage() {
  const [showAllExp,  setShowAllExp]  = useState(false);
  const [showAllEdu,  setShowAllEdu]  = useState(false);
  const [showAllCert, setShowAllCert] = useState(false);

  const trainer = {
    name:"Abhay Sharma",
    title:"Corporate Sales Trainer | Leadership Coach | B2B Growth Strategist",
    location:"Mumbai, Maharashtra",
    about:"Results-driven Sales Professional with 7+ years of experience in B2B sales, business development, and revenue growth across diverse industries. Proven track record of exceeding sales targets, building long-term client relationships, and driving strategic partnerships. Skilled in lead generation, pipeline management, and closing high-value deals, I specialize in understanding client needs and delivering customized solutions that create measurable business impact. Experienced in working with cross-functional teams, CRM tools, and data-driven strategies to optimize sales performance. Passionate about scaling businesses, improving customer experience, and consistently delivering value.",
    contact:{ email:"abhay.sharma@email.com", phone:"+91 987656710", website:"https://abhaysharma.com" },
    links:  { linkedin:"linkedin.com/in/abhay", instagram:"instagram.com/abhay", youtube:"youtube.com/@abhay", facebook:"facebook.com/abhay" },
    details:{ Industry:"IT, SaaS & Corporate Training", Domain:"Sales & Leadership", Experience:"8+ Years", Travel:"Available Worldwide", Fees:"₹60,000/day" },
    languages:["English","Hindi"],
    experience:[
      { role:"Senior Corporate Trainer",    company:"GrowthEdge Consulting", date:"2021 – Present", points:["Trained 15,000+ professionals","Improved sales conversion by 35%"] },
      { role:"Sales Training Lead",          company:"NextGen Solutions",     date:"2019 – 2021",   points:["Led 100+ workshops"] },
      { role:"Business Development Manager", company:"ABC Pvt Ltd",           date:"2017 – 2019",   points:["Generated ₹1Cr+ revenue"] },
    ],
    education:[
      { title:"MBA in Marketing", place:"NMIMS Mumbai",    date:"2015 – 2017" },
      { title:"BBA",              place:"Delhi University", date:"2012 – 2015" },
    ],
    certifications:[
      { title:"Certified Corporate Trainer",       image:"/Images/cert1.png" },
      { title:"NLP Practitioner",                  image:"/Images/cert2.png" },
      { title:"Leadership Coaching Certification", image:"/Images/cert3.png" },
      { title:"Advanced Sales Strategy",           image:"/Images/cert4.png" },
    ],
  };

  return (
    <>
      <style>{styles}</style>
      <BackgroundCanvas />

      <div className="relative z-10 min-h-screen pb-10" style={{ background:"rgba(243,242,239,0.82)" }}>

        {/* HEADER */}
        <div className="bg-white shadow max-w-6xl mx-3 sm:mx-4 lg:mx-auto mt-4 rounded-2xl overflow-hidden animate-fade-in">
          <div className="h-36 sm:h-52 relative">
            <Image src="/Images/banner.png" alt="banner" fill className="object-cover" />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(30,58,138,.35) 0%,rgba(37,99,235,.15) 100%)" }} />
          </div>

          <div className="px-4 sm:px-6 py-4 sm:py-6 header-row flex justify-between items-end flex-wrap gap-3">
            <div className="flex gap-3 sm:gap-5 -mt-10 sm:-mt-16 items-end">
              <div className="profile-ring w-20 h-20 sm:w-32 sm:h-32 relative border-4 rounded-full overflow-hidden flex-shrink-0" style={{ borderColor:"#2563eb" }}>
                <Image src="/Images/trainee3.png" alt="profile" fill className="object-cover" />
              </div>
              <div className="pb-1 animate-fade-slide-up" style={{ animationDelay:"0.05s" }}>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">{trainer.name}</h1>
                <p className="text-gray-600 text-xs sm:text-sm leading-snug max-w-xs sm:max-w-lg">{trainer.title}</p>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mt-1">
                  <MapPin size={13} className="text-blue-600" /> {trainer.location}
                </div>
              </div>
            </div>
            <button className="btn-download flex items-center gap-2 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium text-sm shadow-md">
              <span className="flex items-center gap-2"><Download size={15} /> Download Profile</span>
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="main-grid max-w-6xl mx-auto mt-6 px-3 sm:px-4 grid gap-6" style={{ gridTemplateColumns:"2fr 1fr" }}>

          {/* LEFT */}
          <div className="space-y-6">
            <Section title="About" delay={0.1}>
              <p className="text-sm text-gray-700 leading-relaxed">{trainer.about}</p>
            </Section>

            <Section title="Experience" delay={0.18}>
              <div className="space-y-5">
                {(showAllExp ? trainer.experience : trainer.experience.slice(0,2)).map((exp,i) =>
                  <ExperienceCard key={i} exp={exp} index={i} />)}
              </div>
              <button className="show-more-btn block" onClick={() => setShowAllExp(!showAllExp)}>
                {showAllExp ? "Show less" : "Show more"}
              </button>
            </Section>

            <Section title="Education" delay={0.26}>
              <div className="space-y-4">
                {(showAllEdu ? trainer.education : trainer.education.slice(0,2)).map((edu,i) =>
                  <EducationCard key={i} edu={edu} index={i} />)}
              </div>
              <button className="show-more-btn block" onClick={() => setShowAllEdu(!showAllEdu)}>
                {showAllEdu ? "Show less" : "Show more"}
              </button>
            </Section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Section title="Contact" delay={0.12}>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-gray-700 flex-wrap">
                  <Mail size={14} className="text-blue-600 flex-shrink-0" />
                  <span className="break-all">{trainer.contact.email}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone size={14} className="text-blue-600 flex-shrink-0" /> {trainer.contact.phone}
                </p>
              </div>
            </Section>

            <Section title="Links" delay={0.18}>
              <div className="space-y-2">
                <a href={trainer.contact.website} target="_blank" className="link-item text-sm text-blue-500"><Globe size={14}/> Personal Website</a>
                <a href={trainer.links.linkedin}   target="_blank" className="link-item text-sm text-blue-500"><Linkedin  size={15}/> LinkedIn</a>
                <a href={trainer.links.instagram}  target="_blank" className="link-item text-sm text-blue-500"><Instagram size={15}/> Instagram</a>
                <a href={trainer.links.youtube}    target="_blank" className="link-item text-sm text-blue-500"><Youtube   size={15}/> YouTube</a>
                <a href={trainer.links.facebook}   target="_blank" className="link-item text-sm text-blue-500"><Facebook  size={15}/> Facebook</a>
              </div>
            </Section>

            <Section title="Location" delay={0.22}>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" /> {trainer.location}
              </p>
            </Section>

            <Section title="Additional Details" delay={0.26}>
              <div className="space-y-1.5">
                {Object.entries(trainer.details).map(([k,v]) => <InfoItem key={k} label={k} value={v} />)}
              </div>
            </Section>

            <Section title="Languages" delay={0.3}>
              <div className="flex flex-wrap gap-2">
                {trainer.languages.map((lang,i) => (
                  <span key={i} className="lang-badge bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="max-w-6xl mx-auto mt-6 px-3 sm:px-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm section-card animate-fade-slide-up" style={{ animationDelay:"0.35s" }}>
            <h2 className="text-lg font-semibold mb-5 shimmer-text">Certifications</h2>
            <div className="cert-grid grid gap-4" style={{ gridTemplateColumns:"repeat(2,1fr)" }}>
              {(showAllCert ? trainer.certifications : trainer.certifications.slice(0,2)).map((cert,i) =>
                <CertificateCard key={i} cert={cert} index={i} />)}
            </div>
            <button className="show-more-btn block" onClick={() => setShowAllCert(!showAllCert)}>
              {showAllCert ? "Show less" : `Show all ${trainer.certifications.length}`}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}