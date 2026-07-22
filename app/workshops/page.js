"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Brain, BarChart3, Monitor, Mic, Leaf, Users,
  Globe, Star, ArrowRight, X,
  Calendar, Clock,
  Bookmark, ChevronLeft, ChevronRight,
  MapPin, Target, Building2
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CATEGORIES = [
  { id: "all", label: "All", icon: "Globe" },
  { id: "sales", label: "Sales", icon: "BarChart3" },
  { id: "tech", label: "Tech", icon: "Monitor" },
  { id: "leadership", label: "Leadership", icon: "Users" },
  { id: "softskills", label: "Soft Skills", icon: "Mic" },
  { id: "wellness", label: "Wellness", icon: "Leaf" },
  { id: "ai", label: "AI & ML", icon: "Brain" },
];

const CAT_COLORS = {
  sales: { pill: "#F59E0B" },
  tech: { pill: "#0891B2" },
  leadership: { pill: "#7C3AED" },
  softskills: { pill: "#EC4899" },
  wellness: { pill: "#10B981" },
  ai: { pill: "#F97316" },
};

const ICON_MAP = { Globe, BarChart3, Monitor, Users, Mic, Leaf, Brain };

function normalizeCategory(category) {
  const value = String(category || "").toLowerCase().trim();

  if (["sales", "sale"].includes(value)) return "sales";
  if (["tech", "technology", "it", "software"].includes(value)) return "tech";
  if (["leadership", "management"].includes(value)) return "leadership";
  if (["softskills", "soft skills", "communication"].includes(value)) return "softskills";
  if (["wellness", "health", "mindfulness"].includes(value)) return "wellness";
  if (["ai", "ai & ml", "artificial intelligence", "machine learning", "ml"].includes(value)) return "ai";

  return "all";
}

function mapWorkshop(item) {
  const trainer = item?.assignedTrainer || item?.createdBy || {};
  const conductedAs = item?.conductedMode?.conductedAs || [];
  const isLive = Array.isArray(conductedAs)
    ? conductedAs.includes("Live Online")
    : String(conductedAs).includes("Live Online");

  return {
    id: item?._id,
    category: normalizeCategory(item?.basicInformation?.category),
    isLive,
    featured: false,
    slug: item?.slug || item?._id,
    title: item?.basicInformation?.title || "Untitled Workshop",
    shortDesc: item?.basicInformation?.shortDescription || "",
    price: {
      original: item?.pricing?.originalPrice || 0,
      discounted: item?.pricing?.discountedPrice || 0,
    },
    duration: item?.schedule?.duration ? `${item.schedule.duration} Days` : "",
    seats: item?.schedule?.maxCapacity || 0,
    rating: item?.analytics?.rating || 0,
    reviews: item?.analytics?.views || 0,
    dateRange: item?.schedule?.dateRange || "",
    timeSlot: item?.schedule?.timeSlot || "",
    location: item?.schedule?.location || item?.schedule?.venue || "",
    competency: item?.classification?.competency || "",
    industry: item?.classification?.industry || "",
    tags: Array.isArray(item?.classification?.tags) ? item.classification.tags : [],
    coverImg:
      item?.basicInformation?.coverImage?.url ||
      item?.basicInformation?.thumbnail?.url ||
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&h=420&fit=crop",
    trainer: {
      name: trainer?.fullName || "Trainer",
      role: trainer?.companyName || trainer?.subjectLine || "Workshop Trainer",
      avatar:
        trainer?.profilePhoto?.url ||
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    },
  };
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; }
    body { font-family: 'Satoshi', sans-serif; background: #f8fafc; margin: 0; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes floatY { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
    @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
    @keyframes gradientShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
    @keyframes slideInLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
    @keyframes underlineGrow { from { width:0; } to { width:100%; } }
    @keyframes livePulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes cardFadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideEnterFromRight { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
    @keyframes slideExitToLeft { from { transform:translateX(0); opacity:1; } to { transform:translateX(-100%); opacity:0; } }
    @keyframes blobMorph {
      0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
      25% { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; }
      50% { border-radius:50% 60% 30% 60%/30% 40% 60% 50%; }
      75% { border-radius:60% 30% 60% 40%/70% 50% 40% 60%; }
    }
    @keyframes particleDrift {
      0% { transform:translateY(0) translateX(0) scale(1); opacity:0.6; }
      33% { transform:translateY(-30px) translateX(15px) scale(1.2); opacity:0.9; }
      66% { transform:translateY(-15px) translateX(-10px) scale(0.8); opacity:0.4; }
      100% { transform:translateY(0) translateX(0) scale(1); opacity:0.6; }
    }

    .anim-fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-fade-in { animation: fadeIn 0.8s ease both; }
    .anim-slide-l { animation: slideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .card-anim { animation: cardFadeUp 0.5s ease both; }
    .delay-100 { animation-delay:0.1s; } .delay-200 { animation-delay:0.2s; }
    .delay-300 { animation-delay:0.3s; } .delay-400 { animation-delay:0.4s; }

    .cta-btn {
      position:relative; overflow:hidden;
      background: linear-gradient(135deg,#2563eb,#1d4ed8);
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .cta-btn::before {
      content:''; position:absolute; inset:0;
      background: linear-gradient(135deg,#1d4ed8,#7c3aed);
      opacity:0; transition:opacity 0.4s ease;
    }
    .cta-btn:hover::before { opacity:1; }
    .cta-btn:hover { box-shadow:0 8px 30px rgba(37,99,235,0.4); transform:translateY(-2px) scale(1.02); }
    .cta-btn:active { transform:scale(0.97); }
    .cta-btn span { position:relative; z-index:1; }

    .workshop-card {
      background:white; border:1px solid #e2e8f0; border-radius:16px;
      overflow:hidden; transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
      box-shadow:0 2px 12px rgba(0,0,0,0.06);
      display:flex; flex-direction:column; cursor:pointer;
    }
    .workshop-card:hover {
      border-color:#93c5fd;
      box-shadow:0 12px 32px rgba(37,99,235,0.12);
      transform:translateY(-4px);
    }
    .workshop-card:hover .card-image img { transform:scale(1.06); }
    .card-image img { transition:transform 0.5s cubic-bezier(0.22,1,0.36,1); }

    .heading-underline { position:relative; display:inline-block; }
    .heading-underline::after {
      content:''; position:absolute; bottom:-4px; left:0; height:3px;
      background:linear-gradient(90deg,#2563eb,#7c3aed); border-radius:2px;
      animation:underlineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both;
    }

    .scroll-btn {
      flex-shrink:0; background:white; border:1px solid #e2e8f0; border-radius:50%;
      width:38px; height:38px; display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 16px rgba(0,0,0,0.08); cursor:pointer;
      transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .scroll-btn:hover { background:#2563eb; color:white; border-color:#2563eb; box-shadow:0 8px 24px rgba(37,99,235,0.3); transform:scale(1.1); }
    .scroll-btn:active { transform:scale(0.95); }

    .no-scrollbar { scrollbar-width:none; }
    .no-scrollbar::-webkit-scrollbar { display:none; }
    .pill-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
    .pill-scroll::-webkit-scrollbar { display:none; }

    .online-dot { animation:livePulse 1.4s ease-in-out infinite; }
    .spinning-ring { animation:spinSlow 18s linear infinite; }

    .view-all-btn {
      display:inline-flex; align-items:center; gap:4px;
      font-size:14px; font-weight:700; color:#2563eb; transition:gap 0.2s ease;
    }
    .view-all-btn:hover { gap:8px; }

    .hero-slide { position:absolute; inset:0; background-size:cover; background-position:center; will-change:transform,opacity; }
    .hero-slide.active { animation:slideEnterFromRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards; z-index:2; }
    .hero-slide.exiting { animation:slideExitToLeft 0.5s cubic-bezier(0.4,0,0.2,1) forwards; z-index:1; }
    .hero-slide.hidden { opacity:0; z-index:0; }
  `}</style>
);

/* ─────────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────────── */
const SLIDES = [
  { fallback: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=85", label: "Expert Mentorship" },
  { fallback: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1600&q=85", label: "Live Workshops" },
  { fallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85", label: "Team Training" },
  { fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85", label: "Career Growth" },
];
const SLIDE_DURATION = 5000;

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((nextIdx) => {
    const next = ((nextIdx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setExiting(current);
    setCurrent(next);
    setProgressKey((k) => k + 1);
  }, [current]);

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, goTo]);

  useEffect(() => {
    if (exiting === null) return;
    const t = setTimeout(() => setExiting(null), 500);
    return () => clearTimeout(t);
  }, [exiting]);

  return (
    <section style={{ position:'relative', overflow:'hidden', borderBottom:'1px solid rgba(37,99,235,0.1)', minHeight:650 }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        {SLIDES.map((slide, i) => {
          let cls = 'hero-slide hidden';
          if (i === current) cls = 'hero-slide active';
          else if (i === exiting) cls = 'hero-slide exiting';
          return <div key={i} className={cls} style={{ backgroundImage:`url(${slide.fallback})` }} />;
        })}
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(135deg,rgba(239,246,255,0.45) 0%,rgba(245,243,255,0.35) 40%,rgba(238,242,255,0.28) 70%,rgba(240,253,244,0.25) 100%)', backgroundSize:'300% 300%', animation:'gradientShift 12s ease infinite' }} />
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(90deg,rgba(255,255,255,0.58) 0%,rgba(255,255,255,0.28) 40%,rgba(255,255,255,0.08) 70%,transparent 100%)' }} />
      <div style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)', backgroundSize:'48px 48px', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)' }} />

      <div style={{ position:'absolute', top:-80, right:'-5%', width:360, height:360, borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%', background:'radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)', filter:'blur(32px)', zIndex:3, pointerEvents:'none', opacity:0.6, animation:'blobMorph 12s ease-in-out infinite,floatY 8s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'-5%', left:'-8%', width:280, height:280, borderRadius:'40% 60% 70% 30%/40% 60% 30% 70%', background:'radial-gradient(circle,rgba(139,92,246,0.14) 0%,transparent 70%)', filter:'blur(40px)', zIndex:3, pointerEvents:'none', opacity:0.5, animation:'blobMorph 15s ease-in-out infinite reverse,floatY 10s ease-in-out infinite 2s' }} />

      {[
        { s:6, bg:'#2563eb', top:'14%', left:'4%', a:'particleDrift 6s ease-in-out infinite' },
        { s:4, bg:'#8b5cf6', top:'30%', left:'12%', a:'particleDrift 8s ease-in-out infinite 1s' },
        { s:7, bg:'#06b6d4', top:'62%', left:'3%', a:'particleDrift 7s ease-in-out infinite 2s' },
        { s:5, bg:'#10b981', top:'78%', left:'16%', a:'particleDrift 9s ease-in-out infinite 0.5s' },
        { s:5, bg:'#6366f1', top:'18%', right:'6%', a:'particleDrift 5s ease-in-out infinite 1.5s' },
        { s:4, bg:'#f59e0b', top:'55%', right:'4%', a:'particleDrift 10s ease-in-out infinite 3s' },
        { s:6, bg:'#2563eb', top:'70%', right:'13%', a:'particleDrift 7s ease-in-out infinite 0.8s' },
      ].map((p, i) => (
        <div key={i} style={{ position:'absolute', borderRadius:'50%', pointerEvents:'none', zIndex:4, width:p.s, height:p.s, background:p.bg, top:p.top, left:p.left, right:p.right, animation:p.a }} />
      ))}

      <div style={{ position:'absolute', top:20, right:48, zIndex:15, display:'flex', alignItems:'center', gap:6, padding:'7px 16px', borderRadius:99, background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(37,99,235,0.15)', fontFamily:"'Clash Display',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'0.07em', color:'#0f172a', textTransform:'uppercase', boxShadow:'0 4px 16px rgba(37,99,235,0.08)' }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:'#10b981', flexShrink:0, animation:'livePulse 1.4s ease-in-out infinite' }} />
        {SLIDES[current].label}
      </div>

      <div style={{ position:'absolute', bottom:44, right:48, zIndex:15, fontFamily:"'Clash Display',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'0.06em', color:'#94a3b8' }}>
        {String(current + 1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
      </div>

      <div style={{ position:'relative', zIndex:10, maxWidth:1280, margin:'0 auto', padding:'5rem 1.5rem 4.5rem', minHeight:580, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div className="anim-fade-up" style={{ marginBottom:20 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.8)', backdropFilter:'blur(8px)', border:'1px solid rgba(37,99,235,0.15)', borderRadius:99, padding:'7px 16px', fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:11, letterSpacing:'0.08em', color:'#0f172a', textTransform:'uppercase', boxShadow:'0 4px 16px rgba(37,99,235,0.08)' }}>
            <span className="online-dot" style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:'#10b981' }} />
            1,200+ Experts Online Now
          </span>
        </div>

        <h1 className="anim-slide-l delay-100" style={{ fontFamily:"'Clash Display',sans-serif", fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:700, lineHeight:1.1, color:'#0f172a', marginBottom:16, letterSpacing:'-0.02em' }}>
          Master Skills Faster <br /> with{' '}
          <span style={{ background:'linear-gradient(90deg,#1d4ed8 0%,#7c3aed 30%,#1d4ed8 60%,#0891b2 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 4s linear infinite' }}>
            Top Mentors
          </span>
          <br />and Live Workshops
        </h1>

        <p className="anim-fade-up delay-200" style={{ fontFamily:"'Satoshi',sans-serif", color:'#475569', fontSize:'clamp(14px,2vw,16px)', lineHeight:1.75, marginBottom:32, maxWidth:480 }}>
          Experience personalized mentorship, interactive sessions, and expert-led training designed for real-world success.
        </p>

        <div className="anim-fade-up delay-400" style={{ display:'flex', flexWrap:'wrap', gap:'2rem' }}>
          {[['50K+','Students Enrolled'],['320+','Live Workshops'],['4.9★','Average Rating'],['98%','Satisfaction']].map(([num, lbl]) => (
            <div key={lbl}>
              <div style={{ fontFamily:"'Clash Display',sans-serif", fontSize:'2rem', fontWeight:700, color:'#334155', letterSpacing:'-0.01em' }}>{num}</div>
              <div style={{ fontFamily:"'Satoshi',sans-serif", fontSize:10, color:'#94a3b8', letterSpacing:'1.5px', textTransform:'uppercase', marginTop:2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', zIndex:15, display:'flex', alignItems:'center', gap:8 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearTimeout(timerRef.current); goTo(i); }}
            style={{ width:i===current?24:7, height:7, borderRadius:4, background:i===current?'#2563eb':'#bfdbfe', border:'none', cursor:'pointer', padding:0, transition:'all 0.35s ease' }}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WORKSHOP CARD
───────────────────────────────────────────── */
function WorkshopCard({ w }) {
  const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
  const CatLabel = CATEGORIES.find(c => c.id === w.category)?.label || w.category;

  return (
    <Link href={`/workshops/${w.id}`} className="workshop-card">
      <div className="card-image" style={{ height:200, overflow:'hidden', position:'relative' }}>
        <img src={w.coverImg} alt={w.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />

        <div style={{ position:'absolute', top:12, left:12, padding:'4px 12px', borderRadius:100, background:col.pill, color:'white', fontFamily:"'Clash Display',sans-serif", fontSize:11, fontWeight:600 }}>
          {CatLabel}
        </div>

        <button
          onClick={e => e.preventDefault()}
          style={{ position:'absolute', top:12, right:12, width:32, height:32, borderRadius:8, background:'white', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <Bookmark size={14} style={{ color:'#94a3b8' }} />
        </button>

        {w.isLive && (
          <div style={{ position:'absolute', bottom:12, left:12, display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:100, background:'#ef4444', color:'white', fontFamily:"'Clash Display',sans-serif", fontSize:10, fontWeight:700 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'white', animation:'livePulse 1.4s ease-in-out infinite' }} />
            LIVE NOW
          </div>
        )}
      </div>

      <div style={{ padding:'20px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', overflow:'hidden', border:'2px solid #e2e8f0', flexShrink:0 }}>
            <img src={w.trainer.avatar} alt={w.trainer.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <span style={{ fontFamily:"'Satoshi',sans-serif", fontWeight:600, fontSize:12, color:'#334155' }}>{w.trainer.name}</span>
          <div style={{ display:'flex', alignItems:'center', gap:3, marginLeft:'auto' }}>
            <Star size={11} style={{ color:'#f59e0b', fill:'#f59e0b' }} />
            <span style={{ fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:12, color:'#0f172a' }}>{w.rating}</span>
            <span style={{ fontSize:11, color:'#94a3b8', marginLeft:2 }}>({w.reviews})</span>
          </div>
        </div>

        <h3 style={{ fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:14, color:'#0f172a', lineHeight:1.4, marginBottom:6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {w.title}
        </h3>

        <p style={{ fontFamily:"'Satoshi',sans-serif", fontSize:12, color:'#64748b', lineHeight:1.6, marginBottom:16, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {w.shortDesc}
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Calendar size={12} style={{ color:'#2563eb', flexShrink:0 }} />
            <span style={{ fontFamily:"'Satoshi',sans-serif", fontSize:12, color:'#475569' }}>{w.dateRange}</span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Clock size={12} style={{ color:'#2563eb', flexShrink:0 }} />
            <span style={{ fontFamily:"'Satoshi',sans-serif", fontSize:12, color:'#475569' }}>{w.timeSlot}</span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <MapPin size={12} style={{ color:'#2563eb', flexShrink:0 }} />
            <span style={{ fontFamily:"'Satoshi',sans-serif", fontSize:12, color:'#475569' }}>{w.location}</span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Target size={12} style={{ color:'#2563eb', flexShrink:0 }} />
            <span style={{ fontFamily:"'Satoshi',sans-serif", fontSize:12, color:'#475569' }}>{w.competency}</span>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', paddingTop:16, borderTop:'1px solid #f1f5f9' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:8, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
            <Building2 size={13} style={{ color:'#64748b', flexShrink:0 }} />
            <span style={{ fontFamily:"'Satoshi',sans-serif", fontWeight:600, fontSize:12, color:'#334155' }}>{w.industry}</span>
          </div>

          <span
            style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:12, border:'2px solid #2563eb', color:'#2563eb', fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:12, transition:'all 0.2s ease', cursor:'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background='#2563eb'; e.currentTarget.style.color='white'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#2563eb'; }}
          >
            View Details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function WorkshopsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/workshops/published`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch workshops");
        }

        setWorkshops((data.workshops || []).map(mapWorkshop));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const filtered = workshops.filter(w => {
    const matchCat = activeCategory === "all" || w.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchQ =
      w.title.toLowerCase().includes(q) ||
      w.trainer.name.toLowerCase().includes(q) ||
      w.industry.toLowerCase().includes(q) ||
      w.competency.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const scrollSlider = dir => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -sliderRef.current.offsetWidth : sliderRef.current.offsetWidth,
      behavior: "smooth"
    });
  };

  if (loading) {
    return (
      <>
        <GlobalStyles />
        <div className="min-h-screen" style={{ background:"#f8fafc" }}>
          <HeroSection />
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <p style={{ color:"#64748b", fontSize:14 }}>Loading workshops...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <GlobalStyles />
        <div className="min-h-screen" style={{ background:"#f8fafc" }}>
          <HeroSection />
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <p style={{ color:"red", fontSize:14 }}>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen" style={{ background:"#f8fafc" }}>
        <HeroSection />

        <div id="workshops-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
            <div>
              <h2 className="heading-underline anim-fade-up mb-1"
                style={{ fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:"clamp(20px,3vw,28px)", color:'#0f172a' }}>
                Popular Training Workshops
              </h2>
              <p className="anim-fade-up delay-100" style={{ fontFamily:"'Satoshi',sans-serif", color:'#64748b', fontSize:14, marginTop:8 }}>
                Handpicked workshops by top trainers to help you grow faster.
              </p>
            </div>
            <button className="view-all-btn anim-fade-up delay-200">
              View All Workshops <ArrowRight size={14} />
            </button>
          </div>

          <div className="pill-scroll anim-fade-up delay-200 mt-5 flex gap-2 pb-2 mb-8 -mx-1 px-1">
            {CATEGORIES.map(cat => {
              const Icon = ICON_MAP[cat.icon] || Globe;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setVisibleCount(6); }}
                  style={{ flexShrink:0, display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:100, fontFamily:"'Satoshi',sans-serif", fontWeight:600, fontSize:12, border:'1px solid', borderColor:active?'#2563eb':'#e2e8f0', background:active?'#2563eb':'white', color:active?'white':'#64748b', cursor:'pointer', transition:'all 0.2s cubic-bezier(0.22,1,0.36,1)', boxShadow:active?'0 4px 16px rgba(37,99,235,0.25)':'none' }}
                >
                  <Icon size={11} />{cat.label}
                </button>
              );
            })}
          </div>

          {visible.length > 0 ? (
            <>
              <div className="block sm:hidden">
                <div ref={sliderRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-1">
                  {visible.map((w, i) => (
                    <div key={w.id} className="min-w-full snap-center px-1">
                      <div className="card-anim" style={{ animationDelay:`${i*60}ms` }}>
                        <WorkshopCard w={w} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:16 }}>
                  <button className="scroll-btn" onClick={() => scrollSlider("left")}><ChevronLeft size={18} style={{ color:'#2563eb' }} /></button>
                  <div style={{ display:'flex', gap:6 }}>
                    {visible.map((_,i) => <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#93c5fd' }} />)}
                  </div>
                  <button className="scroll-btn" onClick={() => scrollSlider("right")}><ChevronRight size={18} style={{ color:'#2563eb' }} /></button>
                </div>
              </div>

              <div className="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-6">
                {visible.map((w, i) => (
                  <div key={w.id} className="card-anim" style={{ animationDelay:`${i*60}ms` }}>
                    <WorkshopCard w={w} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div style={{ display:'flex', justifyContent:'center', marginTop:40 }}>
                  <button
                    onClick={() => setVisibleCount(v => v+6)}
                    className="cta-btn"
                    style={{ padding:'14px 36px', borderRadius:14, border:'none', cursor:'pointer', fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:14, color:'white' }}
                  >
                    <span>Load More Workshops</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign:'center', paddingTop:80, paddingBottom:80 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <h3 style={{ fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:18, color:'#0f172a', marginBottom:8 }}>No workshops found</h3>
              <p style={{ fontFamily:"'Satoshi',sans-serif", fontSize:14, color:'#64748b', marginBottom:20 }}>Try a different category or clear your search.</p>
              <button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); setVisibleCount(6); }}
                className="cta-btn"
                style={{ padding:'10px 24px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:13, color:'white', display:'inline-flex', alignItems:'center', gap:8 }}
              >
                <span>Clear Filters</span>
                <X size={13} style={{ position:'relative', zIndex:1 }} />
              </button>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
          <div style={{ borderRadius:20, overflow:'hidden', border:'1px solid #bfdbfe', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', background:'linear-gradient(135deg,#eff6ff 0%,#f5f3ff 100%)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:20, padding:'32px', borderBottom:'1px solid #bfdbfe' }} className="md:border-b-0 md:border-r">
              <div style={{ width:56, height:56, borderRadius:16, flexShrink:0, background:'linear-gradient(135deg,#2563eb,#1d4ed8)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(37,99,235,0.3)' }}>
                <Users size={24} style={{ color:'white' }} />
              </div>
              <div style={{ flex:1 }}>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:18, color:'#0f172a', marginBottom:4 }}>Join a Workshop</h3>
                <p style={{ fontFamily:"'Satoshi',sans-serif", fontSize:13, color:'#475569', marginBottom:16, lineHeight:1.6 }}>Choose a workshop that fits your goals and start learning from the best.</p>
                <a href="#workshops-grid" className="cta-btn"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:13, color:'white', textDecoration:'none' }}>
                  <span>Browse Workshops</span>
                  <ArrowRight size={14} style={{ position:'relative', zIndex:1 }} />
                </a>
              </div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:20, padding:'32px' }}>
              <div style={{ width:56, height:56, borderRadius:16, flexShrink:0, border:'2px solid #f97316', background:'#fff7ed', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Star size={22} style={{ color:'#f97316' }} />
              </div>
              <div style={{ flex:1 }}>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif", fontWeight:700, fontSize:18, color:'#0f172a', marginBottom:4 }}>Start Your Own Workshop</h3>
                <p style={{ fontFamily:"'Satoshi',sans-serif", fontSize:13, color:'#475569', marginBottom:16, lineHeight:1.6 }}>Share your expertise, inspire others and become a Top Trainer.</p>
                <button
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:12, border:'2px solid #f97316', background:'transparent', fontFamily:"'Clash Display',sans-serif", fontWeight:600, fontSize:13, color:'#f97316', cursor:'pointer', transition:'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#f97316'; e.currentTarget.style.color='white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#f97316'; }}
                >
                  Become a Trainer <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}