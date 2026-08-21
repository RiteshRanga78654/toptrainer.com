"use client";

import { Eye, Share2, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";


/* ━━━ ARTICLE CARD ━━━ */
function ArticleCard({ article, index }) {

  const handleReadArticle = ()=>{
    
  }

  return (
    <div
      className="h-full flex flex-col group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={article.coverImage.url}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm bg-white/85`}>
          {article.category}
        </span>
        {article.featured && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-amber-900 tracking-wide uppercase shadow-sm">
            ⭐ Featured
          </span>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
          <Clock size={11} />
          {article.views}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-grow">
          {article.shortDescription}
        </p>
        <div className="flex items-center gap-3 mb-4 mt-auto">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0`}>
            {/*article.initials*/}DK
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800">{article.author}</p>
            <p className="text-[11px] text-gray-400">{article.createdAt}</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-4 text-[12px] text-gray-400">
            <span className="flex items-center gap-1.5"><Eye size={13} />{article.views}</span>
            <span className="flex items-center gap-1.5"><Share2 size={13} />{/*article.shares*/}shares</span>
          </div>
          <button 
          onClick={handleReadArticle}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 text-blue-600 text-[12px] font-semibold hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-transparent transition-all duration-200 hover:shadow-md hover:shadow-blue-200">
            Read →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ━━━ MOBILE SCROLLABLE CAROUSEL ━━━ */
function MobileCarousel({ articles }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const MAX_DOTS = 8;

  // ─── Calculate visible dots ───
  const getDotIndices = () => {
    const total = articles.length;

    if (total <= MAX_DOTS) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const half = Math.floor(MAX_DOTS / 2);

    let start = Math.max(0, currentIndex - half);
    let end = start + MAX_DOTS;

    if (end > total) {
      end = total;
      start = end - MAX_DOTS;
    }

    return Array.from(
      { length: MAX_DOTS },
      (_, i) => start + i
    );
  };

  const dotIndices = getDotIndices();

  const showLeftEllipsis = dotIndices[0] > 0;
  const showRightEllipsis =
    dotIndices[dotIndices.length - 1] < articles.length - 1;

  // ─── Scroll Sync ───
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const slide = el.firstElementChild;
    if (!slide) return;

    const cardWidth = slide.offsetWidth + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setCurrentIndex(index);
    
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      el.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [handleScroll]);

  // Reset when articles change
  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollTo({
      left: 0,
      behavior: "instant",
    });

    setCurrentIndex(0);
    setIsAtEnd(false);
  }, [articles]);

  // ─── Scroll To ───
  const scrollTo = useCallback(
    (index) => {
      const el = scrollRef.current;

      if (!el) return;

      const clamped = Math.max(
        0,
        Math.min(index, articles.length - 1)
      );

      const slide = el.firstElementChild;
      const cardWidth = slide ? slide.offsetWidth + 16 : el.offsetWidth;

      el.scrollTo({
        left: clamped * cardWidth,
        behavior: "smooth",
      });

      setCurrentIndex(clamped);
    },
    [articles.length]
  );

  const prev = () => scrollTo(currentIndex - 1);

  const next = () => scrollTo(currentIndex + 1);

  return (
    <div className="w-full">

      {/* Scroll Track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {articles.map((article, i) => (
          <div
            key={article._id}
            className="flex-none snap-start snap-always pt-1 px-0.5 pb-2 w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
          >
            <ArticleCard
              article={article}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center mt-5 gap-3">

        {/* Prev */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="
            w-10
            h-10
            flex-shrink-0
            flex
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-600
            hover:border-blue-300
            hover:text-blue-600
            hover:bg-blue-50
            active:scale-95
            transition-all
            duration-200
            shadow-sm
          "
        >
          <ChevronLeft size={18} />
          
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5 flex-shrink-0">

          {/* Left Ellipsis */}
          {showLeftEllipsis && (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-50" />
          )}

          {dotIndices.map((i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`
                rounded-full
                transition-all
                duration-300
                ${
                  i === currentIndex
                    ? "w-5 h-2 bg-blue-600"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }
              `}
            />
          ))}

          {/* Right Ellipsis */}
          {showRightEllipsis && (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-50" />
          )}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={
            isAtEnd || currentIndex === articles?.length - 1
          }
          className="
            w-10
            h-10
            flex-shrink-0
            flex
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-blue-700
            text-white
            disabled:opacity-40
            disabled:cursor-not-allowed
            active:scale-95
            transition-all
            duration-200
            shadow-md
            shadow-blue-200
            hover:shadow-blue-300
          "
        >
          
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-gray-400 mt-3 font-medium">
        {currentIndex + 1} / {articles?.length} articles
      </p>
    </div>
  );
}


/* ━━━ MAIN COMPONENT ━━━ */
export default function Articles() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
 

// Fetching Featured articles

const fetchFeaturedArticles = async()=>{
  
  try{
    const res = await axios.get(`https://toptrainer-backend-production.up.railway.app/apifeatured-lists?itemType=Article`)
    if(res.data.success){
      const articlesFeatured = res.data.data.map(item => item.itemRef)
      setFeaturedArticles(articlesFeatured)
    }

  }catch(error){
    console.error("an error occured while fetching articles: ", error)
  }
}

useEffect(()=>{
  fetchFeaturedArticles()
},[])


  return (
    <>
      <style jsx global>{`
        /* ── Scroll track ── */
        .mobile-scroll-track {
          display: flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;          /* Firefox */
          -ms-overflow-style: none;       /* IE/Edge */
          gap: 0;
        }
        .mobile-scroll-track::-webkit-scrollbar {
          display: none;                  /* Chrome/Safari */
        }
        .mobile-scroll-slide {
          flex: 0 0 100%;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          padding: 4px 2px 8px;           /* breathing room so card shadows show */
        }

        /* ── Animations ── */
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
          0%   { transform: translateY(0) translateX(0);      opacity: 0.5; }
          33%  { transform: translateY(-28px) translateX(12px); opacity: 0.9; }
          66%  { transform: translateY(-12px) translateX(-8px); opacity: 0.4; }
          100% { transform: translateY(0) translateX(0);      opacity: 0.5; }
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
          width: 8px; height: 8px; border-radius: 50%;
          background: #10b981;
          animation: dotPulseArt 1.5s ease-in-out infinite;
        }
        .art-load-btn {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .art-load-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .art-load-btn:hover::before { opacity: 1; }
        .art-load-btn:hover { box-shadow: 0 8px 30px rgba(37,99,235,0.4); transform: translateY(-2px) scale(1.02); }
        .art-load-btn:active { transform: scale(0.97); }
        .art-load-btn span { position: relative; z-index: 1; }
        .art-particle {
          position: absolute; border-radius: 50%;
          pointer-events: none;
          animation: particleDriftArt ease-in-out infinite;
        }
        .art-fade-up { animation: fadeUpArt 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="font-sans bg-white">
        <section className="art-hero-bg w-full px-4 sm:px-8 md:px-16 pt-6 pb-14 md:pb-20">
          <div className="art-blob-blue"   style={{ width: 440, height: 440, top: "-80px",   right: "-60px", opacity: 0.6 }} />
          <div className="art-blob-purple" style={{ width: 360, height: 360, bottom: "-60px", left: "-60px", opacity: 0.5 }} />

          {[
            { size: 6, color: "#2563eb", top: "15%", left: "6%",   dur: "6s",  delay: "0s"   },
            { size: 4, color: "#8b5cf6", top: "30%", left: "16%",  dur: "8s",  delay: "1s"   },
            { size: 7, color: "#06b6d4", top: "65%", left: "4%",   dur: "7s",  delay: "2s"   },
            { size: 5, color: "#10b981", top: "80%", left: "20%",  dur: "9s",  delay: "0.5s" },
            { size: 6, color: "#f59e0b", top: "20%", right: "10%", dur: "5s",  delay: "1.5s" },
            { size: 4, color: "#ef4444", top: "50%", right: "6%",  dur: "10s", delay: "3s"   },
          ].map((p, i) => (
            <div key={i} className="art-particle" style={{ width: p.size, height: p.size, background: p.color, top: p.top, left: p.left, right: p.right, animationDuration: p.dur, animationDelay: p.delay }} />
          ))}

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Badge */}
            <div className="art-fade-up inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <span className="art-pill-dot" />
              <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">Expert Knowledge Hub</span>
            </div>

            <h1 className="art-fade-up text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-4" style={{ animationDelay: "0.1s" }}>
              Most Searched <span className="art-text-shimmer">Articles</span>
            </h1>

            <p className="art-fade-up text-gray-500 text-base md:text-lg max-w-xl mb-8" style={{ animationDelay: "0.2s" }}>
              Expert-curated guides on health, finance, and wellbeing — handpicked by our top-rated trainers.
            </p>

            {/* Cards Section */}
            <section>
              <div className="max-w-7xl mx-auto">

                {/* Header row — desktop only */}
                <div className="hidden sm:flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-1">
                      All Articles
                    </p>
                    <p className="text-gray-500 text-sm">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">{featuredArticles?.length}</span> articles
                    </p>
                  </div>
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `100%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">100%</span>
                  </div>
                </div>

                {/* ── RESPONSIVE CAROUSEL ── */}
                <div className="w-full">
                  {featuredArticles?.length > 0 ? (
                    <MobileCarousel articles={featuredArticles} />
                  ) : (
                    <div className="text-center py-20 text-gray-400">
                      <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
                      <p className="text-lg font-medium">No articles found</p>
                      <p className="text-sm mt-1">Try selecting a different category.</p>
                    </div>
                  )}
                </div>

              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}