"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { trainersAPI, userDashboardAPI } from "../lib/api";

const allSkills = ["Sales", "Marketing", "Finance", "Tech", "Leadership", "Python", "Data Science", "Machine Learning"];
const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 4;

/* ── Animated Background ── */
function AnimatedBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const rand = (min, max) => Math.random() * (max - min) + min;
    const dots = Array.from({ length: 50 }, () => ({ x: rand(0, window.innerWidth), y: rand(0, window.innerHeight), r: rand(1.5, 3.5), vx: rand(-0.15, 0.15), vy: rand(-0.2, -0.05), alpha: rand(0.35, 0.7), pulse: rand(0, Math.PI * 2) }));
    const blobs = Array.from({ length: 4 }, () => ({ x: rand(0, window.innerWidth), y: rand(0, window.innerHeight), r: rand(120, 220), vx: rand(-0.08, 0.08), vy: rand(-0.07, 0.07), hue: rand(250, 280) }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b) => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue}, 70%, 85%, 0.18)`);
        g.addColorStop(1, `hsla(${b.hue}, 70%, 85%, 0)`);
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      });
      dots.forEach((d) => {
        d.pulse += 0.02; d.x += d.vx; d.y += d.vy;
        if (d.y < -4) { d.y = canvas.height + 4; d.x = rand(0, canvas.width); }
        if (d.x < -4) d.x = canvas.width + 4;
        if (d.x > canvas.width + 4) d.x = -4;
        const alphaNow = d.alpha * (0.7 + 0.3 * Math.sin(d.pulse));
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alphaNow})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1 }} />;
}

/* ── Trainer Card ──
   NOTE: `trainer` here is the SIMPLIFIED shape built in fetchTrainers()
   below (id, name, image, title, company, rating, reviews, skills[],
   location, experience, price, verified, topRated) — not the raw backend
   TrainerProfile document. Keep this in sync with fetchTrainers(). */
const TrainerCard = ({ trainer, index, isShortlisted, onToggleShortlist }) => {
  const [busy, setBusy] = useState(false);

  const handleHeartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    await onToggleShortlist(trainer.id);
    setBusy(false);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
      style={{ animation: `cardEntrance 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both`, boxShadow: "0 2px 12px rgba(30,58,138,0.07)" }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
        <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <button
          onClick={handleHeartClick}
          disabled={busy}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform disabled:opacity-60"
          title={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
        >
          <svg className={`w-4 h-4 ${isShortlisted ? "text-red-500" : "text-blue-300"}`} fill={isShortlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {trainer.topRated && (
          <div className="absolute top-3 left-3 text-white font-bold px-2.5 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)", fontSize: "10px", letterSpacing: "0.03em" }}>
            ★ Top Rated
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name + Rating row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-bold text-base truncate" style={{ color: "#0f172a" }}>{trainer.name}</h3>
            {trainer.verified && (
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#1d4ed8" }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold" style={{ color: "#1e3a8a" }}>  {trainer.rating || 0}</span>
            <span className="text-xs" style={{ color: "#94a3b8" }}>( {trainer.reviews || 0})</span>
          </div>
        </div>

        <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
          {trainer.title}{" "}
          {trainer.company && <span className="font-semibold" style={{ color: "#1d4ed8" }}>@ {trainer.company}</span>}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {(trainer.skills || []).slice(0, 3).map((skill, i) => (
            <span key={`${trainer.id}-${skill}-${i}`} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#dbeafe", color: "#1e3a8a" }}>
              {skill}
            </span>
          ))}
          {(trainer.skills || []).length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#eff6ff", color: "#60a5fa" }}>
              +{(trainer.skills || []).length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#dbeafe" }}>
          <Link href={`/trainer-profile/${trainer.id}`}>
            <button
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-200"
              style={{ border: "1.5px solid #bfdbfe", color: "#1d4ed8", background: "white" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
            >
              View Profile
            </button>
          </Link>
          <div className="text-xs text-right" style={{ color: "#64748b" }}>
            <div className="flex items-center gap-1 justify-end">
              <svg className="w-3 h-3 flex-shrink-0" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate max-w-[100px]">{trainer.location || "—"}</span>
            </div>
            <div>{trainer.experience || "0 years"} exp.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Sidebar Filter Panel ── */
const FilterSidebar = ({ ratingFilter, setRatingFilter, priceRange, setPriceRange, experienceFilter,
   toggleExperience, selectedSkills, toggleSkill, verifiedOnly, setVerifiedOnly, availableThisWeek,
    setAvailableThisWeek, offersTrial, setOffersTrial, resetFilters, skillSearch, setSkillSearch }) => {
  const experienceOptions = ["0 – 1 years", "1 – 3 years", "3 – 5 years", "5+ years"];
  const filteredSkillOptions = allSkills.filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase()));
  const inputStyle = { border: "1.5px solid #bfdbfe", borderRadius: "8px", background: "white", color: "#0f172a" };

  return (
    <div className="rounded-2xl p-5" style={{ background: "white", border: "1.5px solid #dbeafe", boxShadow: "0 4px 24px rgba(30,58,138,0.07)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg" style={{ color: "#1e3a8a" }}>Filters</h2>
        <button onClick={resetFilters} className="text-xs font-semibold flex items-center gap-1" style={{ color: "#2563eb" }}>
          Reset
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Rating</h3>
        {[4.5, 4.0, 3.5, 3.0].map((r) => (
          <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              name="rating"
              checked={ratingFilter === r}
              onChange={() => setRatingFilter((prev) => (prev === r ? null : r))}
              className="w-3.5 h-3.5 cursor-pointer rounded-full appearance-none border border-black-400 checked:bg-blue-900 checked:border-blue-900"
              style={{ accentColor: "#1e3a8a" }}
            />
            <span className="text-xs" style={{ color: "#475569" }}>{r} & above</span>
            <div className="flex gap-0.5 ml-auto">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} className={`w-3 h-3 ${s <= r ? "text-amber-400" : "text-blue-100"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </label>
        ))}
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Price / Hour</h3>
        <div className="flex justify-between text-xs mb-2" style={{ color: "#64748b" }}>
          <span>${priceRange[0]}</span><span>${priceRange[1]}+</span>
        </div>
        <input type="range" min={10} max={200} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full" style={{ accentColor: "#5376d4" }} />
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Experience</h3>
        {experienceOptions.map((exp) => (
          <label key={exp} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={experienceFilter.includes(exp)} onChange={() => toggleExperience(exp)} className="w-3.5 h-3.5 rounded" style={{ accentColor: "#1e3a8a" }} />
            <span className="text-xs" style={{ color: "#475569" }}>{exp}</span>
          </label>
        ))}
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Skills</h3>
        <div className="relative mb-2">
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search skills" value={skillSearch} onChange={(e) => setSkillSearch(e.target.value)} className="w-full pl-6 pr-2 py-1.5 text-xs" style={inputStyle} />
        </div>
        {filteredSkillOptions.map((skill) => (
          <label key={skill} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={selectedSkills.includes(skill)} onChange={() => toggleSkill(skill)} className="w-3.5 h-3.5 rounded" style={{ accentColor: "#1e3a8a" }} />
            <span className="text-xs" style={{ color: "#475569" }}>{skill}</span>
          </label>
        ))}
      </div>

      <div className="space-y-3 mb-5">
        {[
          { label: "Verified Trainers", value: verifiedOnly, setter: setVerifiedOnly },
          { label: "Available this week", value: availableThisWeek, setter: setAvailableThisWeek },
          { label: "Offers Trial Sessions", value: offersTrial, setter: setOffersTrial },
        ].map(({ label, value, setter }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#475569" }}>{label}</span>
            <button onClick={() => setter(!value)} className="relative w-8 h-4 rounded-full transition-colors flex-shrink-0" style={{ background: value ? "#1e3a8a" : "#dbeafe" }}>
              <span className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform" style={{ transform: value ? "translateX(16px)" : "translateX(2px)" }} />
            </button>
          </div>
        ))}
      </div>

      <button
        className="w-full text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-200"
        style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8, #3b82f6)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,58,138,0.35)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1e3a8a, #2563eb)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
      >
        Apply Filters
      </button>
    </div>
  );
};

/* ── Main Page ── */
export default function FindTrainersPage() {
  const router = useRouter();
  const user = useSelector((s) => s.auth?.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [mode, setMode] = useState("Online");
  const [ratingFilter, setRatingFilter] = useState(null);
  const [priceRange, setPriceRange] = useState([10, 200]);
  const [experienceFilter, setExperienceFilter] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableThisWeek, setAvailableThisWeek] = useState(false);
  const [offersTrial, setOffersTrial] = useState(false);
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [skillSearch, setSkillSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Shortlist state — Set of trainer ids the logged-in user has shortlisted ──
  const [shortlistedIds, setShortlistedIds] = useState(new Set());

  const popularTags = ["Sales", "Marketing", "Finance", "Tech", "Leadership", "Machine Learning"];

  const toggleExperience = (exp) => setExperienceFilter((prev) => prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]);
  const toggleSkill = (skill) => { setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]); setVisibleCount(INITIAL_COUNT); };
  const resetFilters = () => {
    setRatingFilter(null); setPriceRange([10, 200]); setExperienceFilter([]);
    setSelectedSkills([]); setVerifiedOnly(false); setAvailableThisWeek(false);
    setOffersTrial(false); setSearchQuery(""); setSelectedLocation("");
    setMode("Online"); setVisibleCount(INITIAL_COUNT); setSidebarOpen(false);
  };

  const expToYears = (expStr) => {
    if (expStr === "0 – 1 years") return [0, 1];
    if (expStr === "1 – 3 years") return [1, 3];
    if (expStr === "3 – 5 years") return [3, 5];
    return [5, 100];
  };

  const filteredTrainers = useMemo(() => {
    let result = [...trainers];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) =>
        (t.name || "").toLowerCase().includes(q) ||
        (t.title || "").toLowerCase().includes(q) ||
        (t.skills || []).some((s) => s.toLowerCase().includes(q))
      );
    }
    if (ratingFilter !== null) result = result.filter((t) => (t.rating || 0) >= ratingFilter);
    if (priceRange[1] < 200) {
      result = result.filter((t) => Number(t.price) >= Number(priceRange[0]) && Number(t.price) <= Number(priceRange[1]));
    }
    if (experienceFilter.length > 0) {
      result = result.filter((t) => {
        const yrs = parseInt(t.experience) || 0;
        return experienceFilter.some((ef) => { const [min, max] = expToYears(ef); return yrs >= min && yrs <= max; });
      });
    }
    if (selectedSkills.length > 0) result = result.filter((t) => selectedSkills.some((sk) => (t.skills || []).includes(sk)));
    if (verifiedOnly) result = result.filter((t) => t.verified);
    if (availableThisWeek) result = result.filter((t) => t.availableThisWeek);
    if (offersTrial) result = result.filter((t) => t.offersTrial);
    if (mode === "Online") result = result.filter((t) => t.online);
    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "Rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Most Reviews") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [trainers, searchQuery, ratingFilter, priceRange, experienceFilter, selectedSkills, verifiedOnly, availableThisWeek, offersTrial, mode, sortBy]);

  const visibleTrainers = filteredTrainers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTrainers.length;

  const inputStyle = { border: "1.5px solid #bfdbfe", borderRadius: "12px", background: "white", color: "#0f172a" };

  const sidebarProps = {
    ratingFilter, setRatingFilter, priceRange, setPriceRange, experienceFilter, toggleExperience,
    selectedSkills, toggleSkill, verifiedOnly, setVerifiedOnly, availableThisWeek, setAvailableThisWeek,
    offersTrial, setOffersTrial, resetFilters, skillSearch, setSkillSearch,
  };

  // GET /api/trainers -> { success, count, trainers: [...raw TrainerProfile docs] }
  // Raw docs use fullName / profilePhoto.url / subjectLine / companyName /
  // expertiseDomain.competencies / contactInfo.location.{city,state} /
  // additionalDetails.{trainingExperience,feesPerDay} / status / isFeatured.
  // We map them here into the simplified shape TrainerCard + filters use.
  const fetchTrainers = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await trainersAPI.getAll();
      const raw = data.trainers || data.data || [];

      const trainerList = raw.map((trainer) => ({
        id: trainer.trainerId, // FIX: was trainer.trainerId (didn't exist on the doc)
        name: trainer.fullName,
        image: trainer.profilePhoto?.url || "/Images/default-trainer.png",
        title: trainer.subjectLine,
        company: trainer.companyName,
        rating: trainer.rating || 0,
        reviews: trainer.reviewCount || 0,
        skills: trainer.expertiseDomain?.competencies || trainer.tagsLine || [],
        location: trainer.contactInfo?.location?.city || trainer.contactInfo?.location?.state || "",
        experience: trainer.additionalDetails?.trainingExperience || "0 years",
        price: Number(trainer.additionalDetails?.feesPerDay) || 0,
        verified: trainer.status === "approved",
        topRated: !!trainer.isFeatured,
        online: true,
        availableThisWeek: true,
        offersTrial: false,
      }));

      setTrainers(trainerList);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  // ── Load the logged-in user's shortlist so hearts render red on page load ──
  const fetchShortlist = async () => {
    if (!user) { setShortlistedIds(new Set()); return; }
    try {
      const { data } = await userDashboardAPI.getShortlisted();
      const list = data?.trainers || [];
      setShortlistedIds(new Set(list.map((t) => t._id)));
    } catch (err) {
      // Silently ignore — shortlist just won't be pre-marked
      console.error("Failed to load shortlist", err);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  useEffect(() => {
    fetchShortlist();
  }, [user]);

  // ── Toggle shortlist — redirect to login if not authenticated ──
  const handleToggleShortlist = async (trainerId) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Optimistic UI update
    setShortlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(trainerId)) next.delete(trainerId);
      else next.add(trainerId);
      return next;
    });

    try {
      const { data } = await userDashboardAPI.toggleShortlist(trainerId);
      // Sync with backend's authoritative isShortlisted value
      setShortlistedIds((prev) => {
        const next = new Set(prev);
        if (data.isShortlisted) next.add(trainerId);
        else next.delete(trainerId);
        return next;
      });
    } catch (err) {
      // Revert optimistic update on failure
      setShortlistedIds((prev) => {
        const next = new Set(prev);
        if (next.has(trainerId)) next.delete(trainerId);
        else next.add(trainerId);
        return next;
      });
      if (err?.response?.status === 401) {
        router.push("/auth/login");
      }
      console.error("Failed to toggle shortlist", err);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen font-sans" style={{ background: "transparent" }}>
        <style>{`
          body { background: #f8faff; min-height: 100vh; }
          @keyframes cardEntrance { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .trainer-input:focus { outline: none; border-color: #1d4ed8 !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
          .trainer-input:hover { border-color: #93c5fd !important; }
          .tag-pill { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
          .tag-pill:hover { transform: translateY(-1px); }
          .filter-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; }
          .filter-drawer { position: fixed; left: 0; top: 0; bottom: 0; width: min(320px, 85vw); background: white; z-index: 50; overflow-y: auto; padding: 20px; box-shadow: 4px 0 24px rgba(0,0,0,0.15); transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .filter-drawer.open { transform: translateX(0); }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .spinner { width: 32px; height: 32px; border: 3px solid #dbeafe; border-top-color: #1e3a8a; border-radius: 50%; animation: spin 0.8s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>

        {sidebarOpen && <div className="filter-overlay lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <div className={`filter-drawer lg:hidden ${sidebarOpen ? "open" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg" style={{ color: "#1e3a8a" }}>Filters</h2>
            <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: "#f1f5f9" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FilterSidebar {...sidebarProps} />
        </div>

        <div className="mx-auto max-w-screen-7xl px-3 sm:px-4 md:px-6  pb-12">
          <div className="flex gap-6 items-start">
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-6 mt-8" style={{ animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
              <FilterSidebar {...sidebarProps} />
            </aside>

            <main className="flex-1 min-w-0 w-full">
              <div className="text-center pt-8 sm:pt-10 pb-5" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl py-2 font-extrabold" style={{ fontFamily: "'Clash Display', sans-serif", color: "#0f172a" }}>
                  Find the{" "}
                  <span style={{ background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 40%, #1d4ed8 70%, #4f46e5 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 4s linear infinite" }}>
                    Right Trainer
                  </span>{" "}
                  for Your Goal
                </h1>
                <p className="text-sm sm:text-base mt-1" style={{ color: "#64748b" }}>
                  Learn from verified industry experts and grow your skills
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0"
                  style={{ border: "1.5px solid #bfdbfe", background: "white", color: "#1d4ed8" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  Filters
                  {(ratingFilter || experienceFilter.length > 0 || selectedSkills.length > 0 || verifiedOnly || availableThisWeek || offersTrial) && (
                    <span className="w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ background: "#1e3a8a" }}>
                      {[ratingFilter ? 1 : 0, experienceFilter.length, selectedSkills.length, verifiedOnly ? 1 : 0, availableThisWeek ? 1 : 0, offersTrial ? 1 : 0].reduce((a,b) => a+b, 0)}
                    </span>
                  )}
                </button>

                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Search trainers, skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="trainer-input w-full pl-9 pr-4 py-2.5 text-sm" style={inputStyle} />
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <input type="text" placeholder="Location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="trainer-input pl-9 pr-3 py-2.5 text-sm w-full sm:w-32" style={inputStyle} />
                  </div>
                  <select value={mode} onChange={(e) => setMode(e.target.value)} className="trainer-input px-3 py-2.5 text-sm" style={{ ...inputStyle, cursor: "pointer" }}>
                    <option>Online</option>
                    <option>In-Person</option>
                    <option>Both</option>
                  </select>
                  <button
                    className="text-white text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8, #3b82f6)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,58,138,0.35)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1e3a8a, #2563eb)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5 flex-wrap" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}>
                <span className="text-xs font-semibold" style={{ color: "#64748b" }}>Popular:</span>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleSkill(tag)}
                    className="tag-pill text-xs px-3 py-1 rounded-full font-semibold"
                    style={selectedSkills.includes(tag)
                      ? { background: "linear-gradient(135deg, #1e3a8a, #2563eb)", color: "white", border: "1.5px solid transparent" }
                      : { background: "white", color: "#1e40af", border: "1.5px solid #bfdbfe" }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <div className="spinner" />
                  <p className="text-sm" style={{ color: "#64748b" }}>Loading trainers…</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">⚠️</div>
                  <h3 className="font-bold text-lg" style={{ color: "#1e3a8a" }}>Couldn't load trainers</h3>
                  <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>{error}</p>
                  <button onClick={fetchTrainers} className="mt-4 text-sm font-semibold hover:underline" style={{ color: "#2563eb" }}>Try again</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm" style={{ color: "#64748b" }}>
                      <span className="font-bold" style={{ color: "#1e3a8a" }}>{filteredTrainers.length}</span> Trainers found
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs hidden sm:inline" style={{ color: "#64748b" }}>Sort by:</span>
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="trainer-input text-xs px-2 py-1.5 rounded-lg" style={{ ...inputStyle, borderRadius: "8px", cursor: "pointer" }}>
                        <option>Most Relevant</option>
                        <option>Rating</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Most Reviews</option>
                      </select>
                    </div>
                  </div>

                  {filteredTrainers.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                        {visibleTrainers.map((trainer, i) => (
                          <TrainerCard
                            key={trainer.id}
                            trainer={trainer}
                            index={i}
                            isShortlisted={shortlistedIds.has(trainer.id)}
                            onToggleShortlist={handleToggleShortlist}
                          />
                        ))}
                      </div>

                      {hasMore && (
                        <div className="mt-10 flex flex-col items-center gap-3">
                          <p className="text-xs" style={{ color: "#94a3b8" }}>
                            Showing <span className="font-semibold" style={{ color: "#1e3a8a" }}>{visibleTrainers.length}</span> of{" "}
                            <span className="font-semibold" style={{ color: "#1e3a8a" }}>{filteredTrainers.length}</span> trainers
                          </p>
                          <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: "#dbeafe" }}>
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(visibleTrainers.length / filteredTrainers.length) * 100}%`, background: "linear-gradient(90deg, #1e3a8a, #2563eb)" }} />
                          </div>
                          <button
                            onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                            className="flex items-center gap-2 text-sm font-semibold px-8 py-2.5 rounded-xl transition-all"
                            style={{ background: "white", border: "1.5px solid #bfdbfe", color: "#1e40af", boxShadow: "0 2px 8px rgba(30,58,138,0.07)" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#60a5fa"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,58,138,0.14)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(30,58,138,0.07)"; e.currentTarget.style.transform = "none"; }}
                          >
                            Load More
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {!hasMore && filteredTrainers.length > INITIAL_COUNT && (
                        <div className="mt-10 flex flex-col items-center gap-2">
                          <p className="text-sm" style={{ color: "#94a3b8" }}>You've seen all {filteredTrainers.length} trainers</p>
                          <button onClick={resetFilters} className="text-xs font-semibold hover:underline" style={{ color: "#2563eb" }}>Reset filters to explore more</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <div className="text-5xl mb-4">🔍</div>
                      <h3 className="font-bold text-lg" style={{ color: "#1e3a8a" }}>No trainers found</h3>
                      <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>Try adjusting your filters or search terms</p>
                      <button onClick={resetFilters} className="mt-4 text-sm font-semibold hover:underline" style={{ color: "#2563eb" }}>Reset all filters</button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}