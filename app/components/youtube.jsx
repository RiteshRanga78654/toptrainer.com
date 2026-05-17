"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";

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

  /* Featured */
  .yt-featured {
    position: relative; border-radius: 20px; overflow: hidden;
    background: rgba(255,255,255,0.75); backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 8px 40px rgba(37,99,235,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
    transition: box-shadow 0.4s ease, transform 0.4s ease;
    animation: ytFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  .yt-featured:hover { box-shadow: 0 20px 60px rgba(37,99,235,0.18); transform: translateY(-4px); }
  .yt-featured-label {
    position: absolute; top: 14px; left: 14px; z-index: 10;
    display: flex; align-items: center; gap: 6px;
    background: rgba(37,99,235,0.9); backdrop-filter: blur(8px);
    color: white; font-size: 11px; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 100px;
    box-shadow: 0 4px 12px rgba(37,99,235,0.4);
  }
  @keyframes ytFadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to   { opacity: 1; transform: scale(1); }
  }
  .yt-featured-iframe { animation: ytFadeIn 0.35s ease both; }

  /* ── Carousel track ──
     3 cards fill 100% of track width exactly.
     The 4th card sits just offscreen → revealed on scroll.
  */
  .yt-track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2px;
  }
  .yt-track::-webkit-scrollbar { display: none; }
  .yt-track { scrollbar-width: none; }

  /* Each card = exactly 1/3 of the track (minus the 2 gaps between 3 cards) */
  .yt-card {
    flex: 0 0 calc((100% - 24px) / 3);
    scroll-snap-align: start;
    background: rgba(255,255,255,0.8); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.9);
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 4px 20px rgba(37,99,235,0.07);
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    position: relative;
  }
  .yt-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 40px rgba(37,99,235,0.15);
    border-color: rgba(37,99,235,0.2);
  }
  .yt-card.active {
    border: 2px solid #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.12), 0 8px 32px rgba(37,99,235,0.2);
  }
  .yt-card.active::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed);
    z-index: 10;
  }

  /* iframe wrapper inside each small card */
  .yt-iframe-wrap {
    width: 100%;
    height: 140px;       /* fixed height so all cards match */
    position: relative;
    overflow: hidden;
    background: #0f172a;
  }
  .yt-iframe-wrap iframe {
    width: 100%; height: 100%;
    border: none;
    pointer-events: none; /* clicks pass through to the card overlay */
  }

  /* Overlay so click registers on the card, not the iframe */
  .yt-card-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0);
    transition: background 0.3s ease;
    z-index: 5;
    display: flex; align-items: center; justify-content: center;
  }
  .yt-card:not(.active):hover .yt-card-overlay { background: rgba(37,99,235,0.15); }
  .yt-play-icon {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(37,99,235,0.9);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0.8);
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    backdrop-filter: blur(4px);
  }
  .yt-card:not(.active):hover .yt-play-icon { opacity: 1; transform: scale(1); }

  /* Nav buttons */
  .yt-nav-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: white; border: 1px solid #e2e8f0;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #64748b;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .yt-nav-btn:hover {
    background: #2563eb; color: white; border-color: #2563eb;
    box-shadow: 0 8px 24px rgba(37,99,235,0.3); transform: scale(1.1);
  }
  .yt-nav-btn:active { transform: scale(0.95); }

  .yt-stat {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.9); border-radius: 12px;
    padding: 6px 14px; font-size: 12px; font-weight: 500; color: #475569;
    box-shadow: 0 2px 10px rgba(37,99,235,0.06); transition: all 0.3s ease;
  }
  .yt-stat:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,0.1); }
  .yt-views {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(37,99,235,0.07); color: #2563eb;
    font-size: 10px; font-weight: 600;
    padding: 2px 8px; border-radius: 100px;
    border: 1px solid rgba(37,99,235,0.12);
  }
  @keyframes ytFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .yt-fade-up { animation: ytFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes ytDotPulse {
    0%,100% { opacity: 0.4; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.4); }
  }
`;

const videos = [
  { id: "bAulddz4q94", title: "How I leveled up as a Full Stack Developer | Paras Kumar | IREED India", views: "9.8K views" },
  { id: "xA7AWhLQXKQ", title: "From Beginner to Developer | Web Development Journey | IREED India",    views: "7.6K views" },
  { id: "SHmN2dyX7u4", title: "How to Stay Motivated While Learning New Skills",                       views: "6.4K views" },
  { id: "-l7OA49TzDQ", title: "Top Productivity Tips to Boost Your Daily Performance",                 views: "12K views"  },
];

export default function YoutubeSection() {
  const trackRef  = useRef(null);
  const cardRefs  = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // ── Detect which card is most centered while scrolling ──────────────────
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closestIdx = 0, closestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - trackCenter);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });
    setActiveIdx(closestIdx);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Click card → scroll it into view + update big video ─────────────────
  const scrollToCard = (idx) => {
    cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActiveIdx(idx);
  };

  const scrollTrack = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = (track.clientWidth - 24) / 3 + 12;
    track.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" });
  };

  const featured = videos[activeIdx];

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

          {/* ── Main Layout ── */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">

            {/* ── Big Featured Video ── */}
            <div className="yt-featured w-full lg:w-[55%]">
              <div className="yt-featured-label">
                <Play size={10} fill="white" />
                Featured
              </div>
              <div style={{ aspectRatio: "16/9" }}>
                {/* key forces iframe remount so video actually switches */}
                <iframe
                  key={featured.id}
                  className="yt-featured-iframe"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${featured.id}?autoplay=0`}
                  title={featured.title}
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-800 text-sm md:text-base leading-snug line-clamp-2">
                  {featured.title}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="yt-views"><Eye size={10} />{featured.views}</span>
                  <span className="text-xs text-gray-400">IREED India</span>
                </div>
              </div>
            </div>

            {/* ── Right: 3 equal iframe cards, 4th hidden until scroll ── */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center gap-4">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-600">
                  More Videos <span className="text-gray-400 font-normal">({videos.length})</span>
                </p>
                <div className="flex gap-2">
                  <button className="yt-nav-btn" onClick={() => scrollTrack("left")} aria-label="Scroll left">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="yt-nav-btn" onClick={() => scrollTrack("right")} aria-label="Scroll right">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Cards track */}
              <div ref={trackRef} className="yt-track">
                {videos.map((video, i) => (
                  <div
                    key={video.id}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className={`yt-card ${activeIdx === i ? "active" : ""}`}
                    onClick={() => scrollToCard(i)}
                  >
                    {/* iframe preview (pointer-events: none so clicks reach overlay) */}
                    <div className="yt-iframe-wrap">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allowFullScreen
                        tabIndex={-1}
                      />
                      {/* Click overlay */}
                      <div className="yt-card-overlay">
                        <div className="yt-play-icon">
                          <Play size={14} fill="white" color="white" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2 mb-2">
                        {video.title}
                      </p>
                      <span className="yt-views"><Eye size={9} />{video.views}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-1">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    aria-label={`Select video ${i + 1}`}
                    style={{
                      height: 6,
                      width: activeIdx === i ? 22 : 6,
                      borderRadius: 100,
                      background: activeIdx === i ? "#2563eb" : "#cbd5e1",
                      border: "none", padding: 0, cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}