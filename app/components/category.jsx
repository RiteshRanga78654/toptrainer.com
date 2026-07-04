"use client";

import {
  Star, Eye, Clock, User, CheckCircle, TrendingUp,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Zap, Shield,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Filters ─── */
const filters = [
  { id: "All",                  label: "All Workshops" },
  { id: "Tech",                 label: "Tech" },
  { id: "Business",             label: "Business" },
  { id: "Health",               label: "Health" },
  { id: "Finance",              label: "Finance" },
  { id: "Marketing",            label: "Marketing" },
  { id: "Creative",             label: "Creative" },
  { id: "Personal Development", label: "Growth" },
];

/* ─── Trainers Data ─── */
import { workshops as allWorkshops } from "../admin/data/mockData";

/* ─── Helpers ─── */
const formatINR = (n) => "₹" + n.toLocaleString("en-IN");
const calcDiscount = (price, oldPrice) =>
  Math.round(((oldPrice - price) / oldPrice) * 100);

/* ─── Hero Stat ─── */
const HeroStat = ({ value, label }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-2xl font-bold text-white">{value}</span>
    <span className="text-sm text-blue-200">{label}</span>
  </div>
);

/* ─── Trainer Card ─── */
const TrainerCard = ({ trainer }) => {
  const discount = calcDiscount(trainer.price, trainer.oldPrice);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={trainer.img}
          alt={trainer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.classList.add("bg-gray-100");
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {trainer.category}
          </span>
          {trainer.featured && (
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> Top Trainer
            </span>
          )}
        </div>
        <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {trainer.initials}
          </div>
          <span className="text-xs text-gray-500 font-medium">{trainer.author}</span>
          <span className="flex items-center gap-0.5 text-xs text-green-600 ml-auto">
            <CheckCircle size={11} /> Verified
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2">
          {trainer.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{trainer.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trainer.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50 font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400 pb-4 border-b border-gray-100 mb-4">
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star size={11} fill="currentColor" /> {trainer.rating}
          </span>
          <span className="flex items-center gap-1"><Eye size={11} /> {trainer.views}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {trainer.duration}</span>
          <span className="flex items-center gap-1"><User size={11} /> {trainer.students}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">{formatINR(trainer.price)}</span>
            <span className="text-xs text-gray-400 line-through">{formatINR(trainer.oldPrice)}</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-blue-200">
            Enroll Now →
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Mobile Carousel ─── */
/* ─── Mobile Carousel ─── */
function MobileCarousel({ trainers }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const MAX_DOTS = 8;

  // Calculate which dots to show (sliding window of MAX_DOTS)
  const getDotIndices = () => {
    const total = trainers.length;
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
    return Array.from({ length: MAX_DOTS }, (_, i) => start + i);
  };

  const dotIndices = getDotIndices();
  const showLeftEllipsis = dotIndices[0] > 0;
  const showRightEllipsis = dotIndices[dotIndices.length - 1] < trainers.length - 1;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "instant" });
    setCurrentIndex(0);
  }, [trainers]);

  const scrollTo = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, trainers.length - 1));
    el.scrollTo({ left: clamped * el.offsetWidth, behavior: "smooth" });
    setCurrentIndex(clamped);
  }, [trainers.length]);

  const prev = () => scrollTo(currentIndex - 1);
  const next = () => scrollTo(currentIndex + 1);

  return (
    <div className="w-full">
      {/* Scrollable track */}
      <div ref={scrollRef} className="cat-mobile-track">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="cat-mobile-slide">
            <TrainerCard trainer={trainer} />
          </div>
        ))}
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-between mt-5 gap-3">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-sm"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {/* Dots — max 8 with ellipsis hints */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Left ellipsis */}
          {showLeftEllipsis && (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-50" />
          )}

          {dotIndices.map((i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-5 h-2 bg-blue-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}

          {/* Right ellipsis */}
          {showRightEllipsis && (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-50" />
          )}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={currentIndex === trainers.length - 1}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 shadow-md shadow-blue-200"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-gray-400 mt-3 font-medium">
        {currentIndex + 1} / {trainers.length} trainers
      </p>
    </div>
  );
}

/* ─── Main Component ─── */
const Category = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const INITIAL_COUNT = 4;
  
  const [featuredTrainers, setFeaturedTrainers] = useState(
    allWorkshops.filter(w => w.featured)
  );

  useEffect(() => {
    const saved = localStorage.getItem("toptrainer_featured_workshops");
    if (saved) {
      const savedIds = new Set(JSON.parse(saved));
      setFeaturedTrainers(allWorkshops.filter(w => savedIds.has(w.id)));
    }
  }, []);

  const filteredTrainers =
    activeFilter === "All"
      ? featuredTrainers
      : featuredTrainers.filter((t) => t.category === activeFilter);

  const visibleTrainers = filteredTrainers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTrainers.length;
  const progress = Math.round(
    (Math.min(visibleCount, filteredTrainers.length) / filteredTrainers.length) * 100
  );

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <>
      <style jsx global>{`
        /* ── Mobile scroll track ── */
        .cat-mobile-track {
          display: flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cat-mobile-track::-webkit-scrollbar { display: none; }
        .cat-mobile-slide {
          flex: 0 0 100%;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          padding: 4px 2px 8px;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 font-sans">

        {/* ── Hero Banner ── */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 px-6 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/20 pointer-events-none blur-3xl" />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-blue-100 text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <TrendingUp size={12} className="text-amber-400" />
              India's #1 Industry Expert
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Learn from the <span className="text-amber-400">Top Trainers</span>
            </h1>
            <p className="text-blue-200 text-lg mb-12 max-w-xl mx-auto">
              Certified experts. Real skills. Lifetime access. Start your journey today.
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <HeroStat value="480+" label="Expert Trainers" />
              <div className="w-px h-10 bg-white/20 hidden md:block" />
              <HeroStat value="12k+" label="Students Enrolled" />
              <div className="w-px h-10 bg-white/20 hidden md:block" />
              <HeroStat value="4.8★" label="Avg. Rating" />
              <div className="w-px h-10 bg-white/20 hidden md:block" />
              <HeroStat value="95%" label="Satisfaction Rate" />
            </div>
          </div>
        </section>

        {/* ── Filter + Cards ── */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">

          {/* Filter bar */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-100 rounded-2xl px-3 sm:px-5 py-3 mb-8 flex flex-wrap gap-2 justify-center shadow-sm max-w-5xl mx-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilterChange(f.id)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  ${activeFilter === f.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-300/40 scale-[1.03]"
                    : "text-gray-500 hover:text-blue-700 hover:bg-white hover:shadow-sm"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Count row + progress — desktop only */}
          <div className="hidden sm:flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-800">{Math.min(visibleCount, filteredTrainers.length)}</span>
                {" "}of{" "}
                <span className="font-bold text-gray-800">{filteredTrainers.length}</span>
                {" "}workshops
              </p>
            </div>
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{progress}%</span>
            </div>
          </div>

          {/* ── MOBILE: Carousel ── */}
          <div className="block sm:hidden">
            {filteredTrainers.length > 0 ? (
              <MobileCarousel trainers={filteredTrainers} />
            ) : (
              <div className="text-center py-20 text-gray-400">
                <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-semibold text-gray-500">No trainers found</p>
                <p className="text-sm mt-1">Try a different category</p>
              </div>
            )}
          </div>

          {/* ── DESKTOP: Grid ── */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleTrainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>

          {/* Empty state — desktop */}
          {filteredTrainers.length === 0 && (
            <div className="hidden sm:block text-center py-24 text-gray-400">
              <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-semibold text-gray-500">No trainers found</p>
              <p className="text-sm mt-1">Try a different category</p>
            </div>
          )}

          {/* Load more / Show less — desktop only */}
          {filteredTrainers.length > INITIAL_COUNT && (
            <div className="hidden sm:flex justify-center mt-12">
              <button
                onClick={() => {
                  if (hasMore) setVisibleCount((v) => v + 4);
                  else setVisibleCount(INITIAL_COUNT);
                }}
                className="flex items-center gap-2 px-8 py-3 bg-white text-blue-700 border-2 border-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {hasMore ? (
                  <><span>Load More Workshops</span><ChevronDown size={16} /></>
                ) : (
                  <><span>Show Less</span><ChevronUp size={16} /></>
                )}
              </button>
            </div>
          )}
        </div>

        {/* ── Bottom CTA ── */}
        {/* <div className="bg-gradient-to-r from-blue-700 to-indigo-800 mt-4 py-14 px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Are you an expert? Become a Trainer.
          </h2>
          <p className="text-blue-200 mb-6 max-w-md mx-auto text-sm">
            Join 480+ top trainers on TopTrainer and start earning by sharing your knowledge.
          </p>
          <button className="bg-amber-400 text-amber-900 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
            Apply as a Trainer →
          </button>
        </div> */}

      </div>
    </>
  );
};

export default Category;