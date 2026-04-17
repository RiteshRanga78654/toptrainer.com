"use client";

import { Eye, Share2, Clock, TrendingUp, BookOpen, Users } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

/* ━━━ ARTICLE DATA ━━━ */
const articles = [
  {
    id: 1,
    category: "Health",
    title: "How to Control Diabetes Naturally: A Complete Guide",
    desc: "Managing diabetes doesn't just mean taking medication — lifestyle, diet and mindset all play powerful roles in long-term control.",
    author: "Dr. Priya Sharma",
    date: "Apr 10, 2026",
    views: "9,113",
    shares: "48",
    image: "/Images/2026-02-14T05-30-01.539Z-001.png",
    initials: "DP",
    featured: true,
    read: "8 min",
  },
  {
    id: 2,
    category: "Finance",
    title: "The Road to Financial Independence",
    desc: "Financial independence means having enough passive income to cover your expenses — here's how to get there faster.",
    author: "Rahul Mehta",
    date: "Apr 08, 2026",
    views: "7,240",
    shares: "63",
    image: "/Images/trainee1.png",
    initials: "RM",
    featured: false,
    read: "6 min",
  },
  {
    id: 3,
    category: "Wellness",
    title: "Benefits of Yoga: Transform Your Mind and Body",
    desc: "Yoga is far more than just flexibility training — it rewires your nervous system and builds lasting inner calm.",
    author: "Meera Nair",
    date: "Apr 06, 2026",
    views: "5,830",
    shares: "37",
    image: "/Images/trainee1.png",
    initials: "MN",
    featured: false,
    read: "5 min",
  },
  {
    id: 4,
    category: "Health",
    title: "Best Morning Routine for a Healthy Life",
    desc: "Start your day with science-backed habits that sharpen your mental clarity and boost energy levels all day long.",
    author: "Anita Verma",
    date: "Apr 05, 2026",
    views: "4,120",
    shares: "25",
    image: "/Images/trainee1.png",
    initials: "AV",
    featured: false,
    read: "4 min",
  },
  {
    id: 5,
    category: "Finance",
    title: "Investing Basics Every Beginner Should Know",
    desc: "Learn the fundamentals of investing and start growing your wealth with confidence — even on a very small budget.",
    author: "Amit Jain",
    date: "Apr 04, 2026",
    views: "6,540",
    shares: "41",
    image: "/Images/2026-02-14T05-30-01.539Z-001.png",
    initials: "AJ",
    featured: false,
    read: "7 min",
  },
  {
    id: 6,
    category: "Wellness",
    title: "Meditation Techniques for Stress Relief",
    desc: "Simple, proven meditation techniques that reduce stress and improve focus in just 10 minutes a day.",
    author: "Sanya Mehta",
    date: "Apr 03, 2026",
    views: "3,890",
    shares: "29",
    image: "/articleImages/photo6.jfif",
    initials: "SM",
    featured: false,
    read: "5 min",
  },
  
];

/* ━━━ CATEGORY CONFIG ━━━ */
const CATEGORIES = ["All Topics", "Health", "Finance", "Wellness"];

const categoryStyles = {
  Health: {
    tag: "bg-blue-50 text-blue-600 border border-blue-100",
    avatar: "bg-blue-100 text-blue-600",
    gradient: "from-blue-100 to-blue-200",
  },
  Finance: {
    tag: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    avatar: "bg-emerald-100 text-emerald-600",
    gradient: "from-emerald-100 to-emerald-200",
  },
  Wellness: {
    tag: "bg-violet-50 text-violet-600 border border-violet-100",
    avatar: "bg-violet-100 text-violet-600",
    gradient: "from-violet-100 to-violet-200",
  },
};

/* ━━━ ARTICLE CARD ━━━ */
function ArticleCard({ article, index }) {
  const styles = categoryStyles[article.category];

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category tag */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm bg-white/85 ${styles.tag}`}
        >
          {article.category}
        </span>

        {/* Featured badge */}
        {article.featured && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-amber-900 tracking-wide uppercase shadow-sm">
            ⭐ Featured
          </span>
        )}

        {/* Read time */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
          <Clock size={11} />
          {article.read}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {article.desc}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${styles.avatar}`}
          >
            {article.initials}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800">
              {article.author}
            </p>
            <p className="text-[11px] text-gray-400">{article.date}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-4 text-[12px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Eye size={13} />
              {article.views}
            </span>
            <span className="flex items-center gap-1.5">
              <Share2 size={13} />
              {article.shares}
            </span>
          </div>
          <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 text-blue-600 text-[12px] font-semibold hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-transparent transition-all duration-200 hover:shadow-md hover:shadow-blue-200">
            Read →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ━━━ MAIN COMPONENT ━━━ */
export default function Articles() {
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [visibleCount, setVisibleCount] = useState(4);

  const filtered =
    activeFilter === "All Topics"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  const visibleArticles = filtered.slice(0, visibleCount);
  const progress = Math.round((Math.min(visibleCount, filtered.length) / filtered.length) * 100);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setVisibleCount(3);
  };

  return (
    <>
      {/* ━━━ INLINE STYLES ━━━ */}
      <style jsx global>{`
        @keyframes gradientShiftArt {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blobMorphArt {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50%       { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
          75%       { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
        }
        @keyframes floatYArt {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes shimmerArt {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes dotPulseArt {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.35); }
        }
        @keyframes fadeUpArt {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes particleDriftArt {
          0%   { transform: translateY(0)   translateX(0);   opacity: 0.5; }
          33%  { transform: translateY(-28px) translateX(12px);  opacity: 0.9; }
          66%  { transform: translateY(-12px) translateX(-8px); opacity: 0.4; }
          100% { transform: translateY(0)   translateX(0);   opacity: 0.5; }
        }

        .art-hero-bg {
          background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%);
          background-size: 300% 300%;
          animation: gradientShiftArt 12s ease infinite;
          position: relative;
          overflow: hidden;
        }
        .art-hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        .art-blob-blue {
          position: absolute;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
          animation: blobMorphArt 12s ease-in-out infinite, floatYArt 8s ease-in-out infinite;
          filter: blur(40px);
          pointer-events: none;
        }
        .art-blob-purple {
          position: absolute;
          border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
          animation: blobMorphArt 15s ease-in-out infinite reverse, floatYArt 10s ease-in-out infinite 2s;
          filter: blur(48px);
          pointer-events: none;
        }

        .art-text-shimmer {
          background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerArt 4s linear infinite;
        }

        .art-pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: dotPulseArt 1.5s ease-in-out infinite;
        }

        .art-stat-chip {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 14px;
          padding: 10px 16px;
          box-shadow: 0 4px 20px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,0.8);
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .art-stat-chip:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 28px rgba(37,99,235,0.13);
          border-color: rgba(37,99,235,0.18);
        }

        .art-filter-btn {
          padding: 8px 20px;
          border-radius: 100px;
          border: 1.5px solid #e2e8f0;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(8px);
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .art-filter-btn:hover {
          border-color: #93c5fd;
          color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37,99,235,0.1);
        }
        .art-filter-btn.active {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(37,99,235,0.35);
        }

        .art-load-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .art-load-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .art-load-btn:hover::before { opacity: 1; }
        .art-load-btn:hover {
          box-shadow: 0 8px 30px rgba(37,99,235,0.4);
          transform: translateY(-2px) scale(1.02);
        }
        .art-load-btn:active { transform: scale(0.97); }
        .art-load-btn span { position: relative; z-index: 1; }

        .art-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: particleDriftArt ease-in-out infinite;
        }

        .art-fade-up { animation: fadeUpArt 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="font-sans bg-white">

        {/* ━━━ HERO HEADER ━━━ */}
        <section className="art-hero-bg w-full px-4 sm:px-8 md:px-16 py-14 md:py-20">

          {/* Blobs */}
          <div className="art-blob-blue"  style={{ width: 440, height: 440, top: "-80px",  right: "-60px",  opacity: 0.6 }} />
          <div className="art-blob-purple" style={{ width: 360, height: 360, bottom: "-60px", left: "-60px", opacity: 0.5 }} />

          {/* Particles */}
          {[
            { size: 6,  color: "#2563eb", top: "15%",  left: "6%",   dur: "6s",  delay: "0s"   },
            { size: 4,  color: "#8b5cf6", top: "30%",  left: "16%",  dur: "8s",  delay: "1s"   },
            { size: 7,  color: "#06b6d4", top: "65%",  left: "4%",   dur: "7s",  delay: "2s"   },
            { size: 5,  color: "#10b981", top: "80%",  left: "20%",  dur: "9s",  delay: "0.5s" },
            { size: 6,  color: "#f59e0b", top: "20%",  right: "10%", dur: "5s",  delay: "1.5s" },
            { size: 4,  color: "#ef4444", top: "50%",  right: "6%",  dur: "10s", delay: "3s"   },
          ].map((p, i) => (
            <div
              key={i}
              className="art-particle"
              style={{
                width: p.size, height: p.size, background: p.color,
                top: p.top, left: p.left, right: p.right,
                animationDuration: p.dur, animationDelay: p.delay,
              }}
            />
          ))}

          <div className="max-w-7xl mx-auto relative z-10">

            {/* Pill badge */}
            <div className="art-fade-up inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <span className="art-pill-dot" />
              <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">Expert Knowledge Hub</span>
            </div>

            <h1 className="art-fade-up text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-4" style={{ animationDelay: "0.1s" }}>
              Most Searched{" "}
              <span className="art-text-shimmer">Articles</span>
            </h1>

            <p className="art-fade-up text-gray-500 text-base md:text-lg max-w-xl mb-8" style={{ animationDelay: "0.2s" }}>
              Expert-curated guides on health, finance, and wellbeing — handpicked by our top-rated trainers.
            </p>

            {/* Filter pills */}
            {/* <div className="art-fade-up flex flex-wrap gap-2 md:gap-3 mb-10" style={{ animationDelay: "0.3s" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`art-filter-btn ${activeFilter === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div> */}

            {/* Stats */}
            {/* <div className="art-fade-up flex flex-wrap gap-3 md:gap-4" style={{ animationDelay: "0.4s" }}>
              {[
                { icon: <BookOpen size={16} className="text-blue-500" />,   bold: "240+",   sub: "Articles Published", bg: "bg-blue-50" },
                { icon: <Eye size={16} className="text-emerald-500" />,     bold: "1.2M+",  sub: "Monthly Readers",    bg: "bg-emerald-50" },
                { icon: <TrendingUp size={16} className="text-violet-500" />,bold: "80+",   sub: "Expert Authors",     bg: "bg-violet-50" },
                { icon: <Users size={16} className="text-amber-500" />,     bold: "4.8/5",  sub: "Reader Rating",      bg: "bg-amber-50" },
              ].map((s) => (
                <div key={s.bold} className="art-stat-chip flex items-center gap-3">
                  <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm leading-none">{s.bold}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div> */}

            <section className="">
          <div className="max-w-7xl mx-auto">

            {/* Section label */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-1">
                  {activeFilter === "All Topics" ? "All Articles" : activeFilter}
                </p>
                <p className="text-gray-500 text-sm">
                  Showing <span className="font-semibold text-gray-700">{Math.min(visibleCount, filtered.length)}</span> of{" "}
                  <span className="font-semibold text-gray-700">{filtered.length}</span> articles
                </p>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-3 min-w-[200px]">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{progress}%</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {visibleArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">No articles found</p>
                <p className="text-sm mt-1">Try selecting a different category.</p>
              </div>
            )}

            {/* Load more / Show less */}
            {filtered.length > 3 && (
              <div className="flex justify-center gap-4 mt-12 flex-wrap">
                {visibleCount < filtered.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 3, filtered.length))}
                    className="art-load-btn px-8 py-3.5 text-white rounded-xl font-semibold text-sm shadow-lg"
                  >
                    <span>Load More Articles</span>
                  </button>
                )}
                {visibleCount > 3 && (
                  <button
                    onClick={() => setVisibleCount(3)}
                    className="px-8 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
          </div>
        </section>

        {/* ━━━ CARDS SECTION ━━━ */}
        
      </div>
    </>
  );
}