"use client";

import { useState, useEffect } from "react";
import { Play, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const styles = `
  .yt-section {
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%);
    background-size: 300% 300%;
    animation: ytGradShift 12s ease infinite;
    position: relative;
    overflow: hidden;
  }
  @keyframes ytGradShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .yt-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%);
    pointer-events: none;
  }
  .yt-blob-1 {
    position: absolute; width: 320px; height: 320px; top: -8%; right: -4%;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
    filter: blur(40px);
    animation: ytBlob 12s ease-in-out infinite, ytFloat 8s ease-in-out infinite;
    pointer-events: none;
  }
  .yt-blob-2 {
    position: absolute; width: 260px; height: 260px; bottom: 0%; left: -4%;
    border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
    background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%);
    filter: blur(40px);
    animation: ytBlob 15s ease-in-out infinite reverse, ytFloat 10s ease-in-out infinite 2s;
    pointer-events: none;
  }
  @keyframes ytBlob {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }
  @keyframes ytFloat {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-14px); }
  }
  .yt-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ytShimmer 4s linear infinite;
  }
  @keyframes ytShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .yt-underline { position: relative; display: inline-block; }
  .yt-underline::after {
    content: '';
    position: absolute; bottom: -4px; left: 0;
    height: 3px; width: 0;
    background: linear-gradient(90deg, #2563eb, #7c3aed);
    border-radius: 2px;
    animation: ytUnderline 1s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
  }
  @keyframes ytUnderline { to { width: 100%; } }

  .yt-stat {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.9); border-radius: 12px;
    padding: 6px 14px; font-size: 12px; font-weight: 500; color: #475569;
    box-shadow: 0 2px 10px rgba(37,99,235,0.06); transition: all 0.3s ease;
  }
  .yt-stat:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,0.1); }
  @keyframes ytFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .yt-fade-up { animation: ytFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes ytDotPulse {
    0%,100% { opacity: 0.4; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.4); }
  }

  /* Coverflow specific styles */
  .coverflow-item {
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    position: absolute;
    left: 0; right: 0; margin: 0 auto;
    width: 90%;
    max-width: 640px;
    border-radius: 16px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 8px 32px rgba(37,99,235,0.1);
    overflow: hidden;
  }
  .coverflow-center {
    z-index: 20;
    transform: translateX(0) scale(1);
    opacity: 1;
    box-shadow: 0 16px 48px rgba(37,99,235,0.15);
  }
  .coverflow-left {
    z-index: 10;
    transform: translateX(-40%) scale(0.8);
    opacity: 0.6;
    cursor: pointer;
  }
  .coverflow-left:hover, .coverflow-right:hover {
    opacity: 1;
  }
  .coverflow-right {
    z-index: 10;
    transform: translateX(40%) scale(0.8);
    opacity: 0.6;
    cursor: pointer;
  }
  .coverflow-hidden {
    z-index: 0;
    transform: translateX(0) scale(0.6);
    opacity: 0;
    pointer-events: none;
  }

  /* Overlay so side items can be clicked without triggering iframe */
  .coverflow-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0);
    z-index: 5;
    cursor: pointer;
  }
  
  .yt-nav-btn {
    width: 44px; height: 44px; border-radius: 50%;
    background: white; border: 1px solid #e2e8f0;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #64748b;
    transition: all 0.3s ease;
    z-index: 30;
  }
  .yt-nav-btn:hover {
    background: #2563eb; color: white; border-color: #2563eb;
    box-shadow: 0 8px 24px rgba(37,99,235,0.3); transform: scale(1.1);
  }
`;

const fallbackVideos = [
  { videoId: "bAulddz4q94", title: "How I leveled up as a Full Stack Developer | Paras Kumar | IREED India", views: "9.8K views" },
  { videoId: "xA7AWhLQXKQ", title: "From Beginner to Developer | Web Development Journey | IREED India",    views: "7.6K views" },
  { videoId: "SHmN2dyX7u4", title: "How to Stay Motivated While Learning New Skills",                       views: "6.4K views" },
  { videoId: "-l7OA49TzDQ", title: "Top Productivity Tips to Boost Your Daily Performance",                 views: "12K views"  },
  { videoId: "M7FIvfx5J10", title: "The Power of Consistency in Coding",                                    views: "5.2K views" },
  { videoId: "t_ispmW01lY", title: "Understanding React Hooks Deep Dive",                                   views: "14K views"  },
  { videoId: "8pDqJVdNa44", title: "System Design for Beginners",                                           views: "8.1K views" },
  { videoId: "PkZNo7MFNFg", title: "Mastering JavaScript ES6+ Features",                                    views: "11K views"  },
];

export default function YoutubeSection({ scope = "home", entityType, entityId }) {
  const [videos, setVideos] = useState(fallbackVideos);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams();
    if (scope) params.set("scope", scope);
    if (entityType) params.set("entityType", entityType);
    if (entityId) params.set("entityId", entityId);

    const base =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    fetch(`${base}/youtube-videos?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          // Add default views string to fetched data for UI consistency
          const formatted = data.data.map(v => ({ ...v, views: "New" }));
          setVideos(formatted);
        } else {
          setVideos([]);
        }
      })
      .catch((err) => console.error("Failed to fetch YouTube videos:", err));
  }, [scope, entityType, entityId]);

  useEffect(() => {
    if (videos.length === 0) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % videos.length);
    }, 20000); // Auto slide every 20 seconds
    return () => clearInterval(timer);
  }, [videos.length]);

  const handlePrev = () => {
    if (videos.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    if (videos.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % videos.length);
  };

  const getCardClass = (index) => {
    if (videos.length === 0) return "coverflow-hidden";
    const prevIdx = (activeIdx - 1 + videos.length) % videos.length;
    const nextIdx = (activeIdx + 1) % videos.length;

    if (index === activeIdx) return "coverflow-center";
    if (index === prevIdx) return "coverflow-left";
    if (index === nextIdx) return "coverflow-right";
    return "coverflow-hidden";
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <style>{styles}</style>

      <section className="yt-section w-full px-4 sm:px-8 md:px-16 py-12 md:py-20">
        <div className="yt-blob-1" />
        <div className="yt-blob-2" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Header ── */}
          <div className="yt-fade-up flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8" style={{ animationDelay: "0.1s" }}>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 mb-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500" style={{ animation: "ytDotPulse 1.5s ease-in-out infinite" }} />
                <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Live Learning Content</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Learn from Real{" "}
                <span className="yt-shimmer yt-underline">YouTube</span>
                {" "}Content
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-2">
                Watch expert-led sessions — curated from IREED India's channel.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="yt-stat"><span className="w-2 h-2 rounded-full bg-red-500" />{videos.length} Videos</div>
              <div className="yt-stat"><Eye size={12} />36K+ Views</div>
            </div>
          </div>

          {/* ── Center Coverflow Layout ── */}
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center mt-10">
            
            {/* Nav Left */}
            <button 
              className="yt-nav-btn absolute left-0 md:left-4" 
              onClick={handlePrev} 
              aria-label="Previous Video"
            >
              <ChevronLeft size={24} />
            </button>

            {videos.map((video, idx) => {
              const statusClass = getCardClass(idx);
              const isActive = statusClass === "coverflow-center";

              return (
                <div 
                  key={video._id || video.videoId} 
                  className={`coverflow-item ${statusClass}`}
                  onClick={() => {
                    if (!isActive) setActiveIdx(idx);
                  }}
                >
                  <div className="relative w-full bg-slate-900" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0`}
                      title={video.title}
                      allowFullScreen
                      tabIndex={isActive ? 0 : -1}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                    />
                    {/* Overlay to catch clicks on non-active videos */}
                    {!isActive && <div className="coverflow-overlay" />}
                  </div>
                  
                  <div className="p-3 md:p-4 bg-white/95">
                    <p className="font-semibold text-gray-800 text-sm md:text-base leading-snug line-clamp-1 sm:line-clamp-2">
                      {video.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold">
                        <Eye size={12} />{video.views}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">IREED India</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Nav Right */}
            <button 
              className="yt-nav-btn absolute right-0 md:right-4" 
              onClick={handleNext} 
              aria-label="Next Video"
            >
              <ChevronRight size={24} />
            </button>

          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8 md:mt-12">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to video ${i + 1}`}
                style={{
                  height: 6,
                  width: activeIdx === i ? 24 : 6,
                  borderRadius: 100,
                  background: activeIdx === i ? "#2563eb" : "#cbd5e1",
                  border: "none", padding: 0, cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}