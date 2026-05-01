"use client";

import { useState, useMemo , useRef , useEffect } from "react";
import Footer from "../components/footer";


const trainersData = [
  {
    id: 1,
    name: "Rahul Sharma",
    title: "Sales Strategist",
    company: "HubSpot",
    rating: 4.9,
    reviews: 140,
    experience: "6+ years",
    price: 40,
    location: "Mumbai, India",
    skills: ["B2B Sales", "Lead Generation", "CRM", "Negotiation"],
    category: "Sales",
    online: true,
    topRated: true,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 2,
    name: "Ankit Verma",
    title: "Business Development Manager",
    company: "Zoho",
    rating: 4.7,
    reviews: 90,
    experience: "5+ years",
    price: 35,
    location: "Delhi, India",
    skills: ["Client Acquisition", "Cold Calling", "Sales Funnel"],
    category: "Sales",
    online: true,
    topRated: false,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    title: "Digital Marketing Expert",
    company: "Google",
    rating: 4.8,
    reviews: 120,
    experience: "5+ years",
    price: 45,
    location: "Bangalore, India",
    skills: ["SEO", "Google Ads", "Content Marketing", "Analytics"],
    category: "Marketing",
    online: true,
    topRated: true,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 4,
    name: "Priya Nair",
    title: "Brand Strategist",
    company: "Unilever",
    rating: 4.9,
    reviews: 110,
    experience: "7+ years",
    price: 50,
    location: "Chennai, India",
    skills: ["Branding", "Campaign Strategy", "Social Media"],
    category: "Marketing",
    online: true,
    topRated: true,
    verified: true,
    availableThisWeek: false,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 5,
    name: "Rohit Mehta",
    title: "Financial Analyst",
    company: "Deloitte",
    rating: 4.7,
    reviews: 75,
    experience: "4+ years",
    price: 55,
    location: "Pune, India",
    skills: ["Financial Modeling", "Excel", "Valuation", "Forecasting"],
    category: "Finance",
    online: true,
    topRated: false,
    verified: true,
    availableThisWeek: true,
    offersTrial: false,
    image: "/Images/trainee2.png",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    title: "Investment Banker",
    company: "Goldman Sachs",
    rating: 4.8,
    reviews: 95,
    experience: "6+ years",
    price: 65,
    location: "Mumbai, India",
    skills: ["Equity Research", "M&A", "Portfolio Management"],
    category: "Finance",
    online: false,
    topRated: true,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 7,
    name: "Aman Gupta",
    title: "Full Stack Developer",
    company: "Amazon",
    rating: 4.9,
    reviews: 130,
    experience: "5+ years",
    price: 50,
    location: "Hyderabad, India",
    skills: ["React", "Node.js", "MongoDB", "Next.js"],
    category: "Tech",
    online: true,
    topRated: true,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 8,
    name: "Karan Singh",
    title: "Data Scientist",
    company: "Microsoft",
    rating: 4.8,
    reviews: 85,
    experience: "4+ years",
    price: 60,
    location: "Noida, India",
    skills: ["Python", "Machine Learning", "SQL", "Power BI"],
    category: "Tech",
    online: true,
    topRated: false,
    verified: true,
    availableThisWeek: false,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 9,
    name: "Sneha Iyer",
    title: "DevOps Engineer",
    company: "Netflix",
    rating: 4.6,
    reviews: 60,
    experience: "5+ years",
    price: 55,
    location: "Bangalore, India",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    category: "Tech",
    online: false,
    topRated: false,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 10,
    name: "Vikram Joshi",
    title: "Leadership Coach",
    company: "McKinsey",
    rating: 4.9,
    reviews: 200,
    experience: "10+ years",
    price: 80,
    location: "Mumbai, India",
    skills: ["Leadership", "Executive Coaching", "Team Building", "Strategy"],
    category: "Leadership",
    online: true,
    topRated: true,
    verified: true,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
  {
    id: 11,
    name: "Divya Rajan",
    title: "ML Engineer",
    company: "Meta",
    rating: 4.7,
    reviews: 68,
    experience: "4+ years",
    price: 58,
    location: "Hyderabad, India",
    skills: ["Python", "TensorFlow", "Deep Learning", "NLP"],
    category: "Tech",
    online: true,
    topRated: false,
    verified: true,
    availableThisWeek: true,
    offersTrial: false,
    image: "/Images/trainee2.png",
  },
  {
    id: 12,
    name: "Arjun Malhotra",
    title: "Growth Hacker",
    company: "Razorpay",
    rating: 4.8,
    reviews: 105,
    experience: "5+ years",
    price: 42,
    location: "Bangalore, India",
    skills: ["Growth Strategy", "A/B Testing", "Analytics", "Marketing"],
    category: "Marketing",
    online: true,
    topRated: true,
    verified: false,
    availableThisWeek: true,
    offersTrial: true,
    image: "/Images/trainee2.png",
  },
];

const allSkills = ["Sales", "Marketing", "Finance", "Tech", "Leadership", "Python", "Data Science", "Machine Learning"];
const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 4;

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1].map((star) => (
      <svg key={star} className={`w-5 h-5 ${star <= Math.round(rating) ? "text-amber-400" : "text-blue-100"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TrainerCard = ({ trainer, index }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl border border-blue-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group"
      style={{
        animation: `cardEntrance 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both`,
        boxShadow: "0 2px 12px rgba(30,58,138,0.07)",
      }}
    >
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          style={{ boxShadow: "0 2px 8px rgba(30,58,138,0.15)" }}
        >
          <svg className={`w-4 h-4 ${liked ? "text-red-500" : "text-blue-300"}`} fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {trainer.topRated && (
          <div
            className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
              color: "white",
              fontSize: "10px",
              letterSpacing: "0.03em",
            }}
          >
            ★ Top Rated
          </div>
        )}
      </div>

      <div className="p-5 pt-4">
        <div className="flex gap-1.5 items-center">
          <h3 className="font-bold text-xl" style={{ color: "#0f172a" }}>{trainer.name}</h3>
          {trainer.verified && (
            <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#1d4ed8" }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          {trainer.title}{" "}
          <span className="font-semibold" style={{ color: "#1d4ed8" }}>@ {trainer.company}</span>
        </p>

        <div className="flex flex-wrap gap-1.5 justify-center mt-3">
          {trainer.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 rounded-full font-medium transition-colors"
              style={{
                background: "#dbeafe",
                color: "#1e3a8a",
              }}
            >
              {skill}
            </span>
          ))}
          {trainer.skills.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#eff6ff", color: "#60a5fa" }}></span>
          )}
        </div>

        <div className="flex justify-left gap-2 mt-2">
          <StarRating rating={trainer.rating} />
          <span className="text-sm font-semibold" style={{ color: "#1e3a8a" }}>{trainer.rating}</span>
          <span className="text-xs" style={{ color: "#94a3b8" }}>({trainer.reviews} reviews)</span>
        </div>

        <div className="items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#dbeafe" }}>
          <div className="flex gap-2">
            <button
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: "1.5px solid #bfdbfe",
                color: "#1d4ed8",
                background: "white",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#93c5fd"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
            >
              View Profile
            </button>
            <div className="grid justify-right ml-35 mt-2 text-xs" style={{ color: "#64748b" }}>
              <span className="flex gap-1 items-center">
                <svg className="w-3.5 h-3.5" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {trainer.location}
              </span>
              <span>{trainer.experience} exp.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (min, max) => Math.random() * (max - min) + min;

    // Sparse small dots
    const dots = Array.from({ length: 50 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(1.5, 3.5),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.2, -0.05),
      alpha: rand(0.35, 0.7),
      pulse: rand(0, Math.PI * 2),
    }));

    // Soft large blobs in light purple
    const blobs = Array.from({ length: 4 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(120, 220),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.07, 0.07),
      hue: rand(250, 280), // purple range
    }));

    let tick = 0;

    const draw = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft purple blobs
      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue}, 70%, 85%, 0.18)`);
        g.addColorStop(1, `hsla(${b.hue}, 70%, 85%, 0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Floating dots
      dots.forEach((d) => {
        d.pulse += 0.02;
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -4) { d.y = canvas.height + 4; d.x = rand(0, canvas.width); }
        if (d.x < -4) d.x = canvas.width + 4;
        if (d.x > canvas.width + 4) d.x = -4;

        // Gently pulse alpha
        const alphaNow = d.alpha * (0.7 + 0.3 * Math.sin(d.pulse));

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alphaNow})`; // violet-500
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
/* ──────────────────────────────────────────── */
/*  Main page                                   */
/* ──────────────────────────────────────────── */
export default function FindTrainersPage() {
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

  const popularTags = ["Sales", "Marketing", "Finance", "Tech", "Leadership", "Machine Learning"];
  const experienceOptions = ["0 – 1 years", "1 – 3 years", "3 – 5 years", "5+ years"];
  // ── TOP RATED TRAINERS SECTION ──
// Add this component definition before your FindTrainersPage export:

const TopRatedTrainersSection = ({ trainers }) => {
  const scrollRef = useRef(null);
  const topRated = trainers.filter((t) => t.topRated).slice(0, 9);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
    }
  };

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{
        background: "white",
        border: "1.5px solid #dbeafe",
        boxShadow: "0 4px 24px rgba(30,58,138,0.07)",
        animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
           
            <h2 className="font-bold text-lg" style={{ color: "#0f172a", fontFamily: "'Clash Display', sans-serif" }}>
              Top Rated Trainers
            </h2>
          </div>
         
        </div>
       
      </div>

      {/* Scrollable row */}
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {topRated.map((trainer) => (
            <div
              key={trainer.id}
              className="flex-shrink-0 flex flex-col items-center p-3 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                width: "160px",
                border: "1.5px solid #dbeafe",
                background: "#f8faff",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(30,58,138,0.12)"; e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.background = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dbeafe"; e.currentTarget.style.background = "#f8faff"; }}
            >
              {/* Avatar */}
              <div className="relative mb-2">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-12 h-12 rounded-full object-cover object-top"
                  style={{ border: "2px solid #bfdbfe" }}
                />
                {/* Online dot */}
                {trainer.online && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                    style={{ background: "#22c55e", border: "2px solid white" }}
                  />
                )}
                {/* Verified badge */}
                {trainer.verified && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "#1d4ed8" }}
                  >
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>

              {/* Name */}
              <p className="text-xs font-bold text-center leading-tight" style={{ color: "#0f172a" }}>
                {trainer.name.split(" ")[0]}{" "}
                <span style={{ color: "#475569", fontWeight: 500 }}>{trainer.name.split(" ")[1]}</span>
              </p>

             <div className="flex justify-between items-center w-full mt-2">
  {/* Company Left */}
  <p className="text-xs" style={{ color: "#64748b" }}>
    {trainer.company}
  </p>

  {/* Rating Right */}
  <div className="flex items-center gap-1">
    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span className="text-xs font-semibold" style={{ color: "#1e3a8a" }}>
      {trainer.rating}
    </span>
  </div>
</div>

            
            </div>
          ))}
        </div>

        {/* Scroll arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute -right-3 flex items-center justify-center w-7 h-7 rounded-full transition-all"
          style={{
            background: "white",
            border: "1.5px solid #bfdbfe",
            boxShadow: "0 2px 8px rgba(30,58,138,0.12)",
            zIndex: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#60a5fa"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(30,58,138,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(30,58,138,0.12)"; }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: "#1d4ed8" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
  const toggleExperience = (exp) =>
    setExperienceFilter((prev) => prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
    setVisibleCount(INITIAL_COUNT);
  };

  const resetFilters = () => {
    setRatingFilter(null); setPriceRange([10, 200]); setExperienceFilter([]);
    setSelectedSkills([]); setVerifiedOnly(false); setAvailableThisWeek(false);
    setOffersTrial(false); setSearchQuery(""); setSelectedLocation("");
    setMode("Online"); setVisibleCount(INITIAL_COUNT);
  };

  const expToYears = (expStr) => {
    if (expStr === "0 – 1 years") return [0, 1];
    if (expStr === "1 – 3 years") return [1, 3];
    if (expStr === "3 – 5 years") return [3, 5];
    return [5, 100];
  };

  const filteredTrainers = useMemo(() => {
    let result = [...trainersData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (ratingFilter !== null) result = result.filter((t) => t.rating >= ratingFilter);
    result = result.filter((t) => t.price >= priceRange[0] && t.price <= priceRange[1]);
    if (experienceFilter.length > 0) {
      result = result.filter((t) => {
        const yrs = parseInt(t.experience) || 0;
        return experienceFilter.some((ef) => { const [min, max] = expToYears(ef); return yrs >= min && yrs <= max; });
      });
    }
    if (selectedSkills.length > 0)
      result = result.filter((t) => selectedSkills.some((sk) => t.skills.includes(sk) || t.category === sk));
    if (verifiedOnly) result = result.filter((t) => t.verified);
    if (availableThisWeek) result = result.filter((t) => t.availableThisWeek);
    if (offersTrial) result = result.filter((t) => t.offersTrial);
    if (mode === "Online") result = result.filter((t) => t.online);
    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "Rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Most Reviews") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [searchQuery, ratingFilter, priceRange, experienceFilter, selectedSkills, verifiedOnly, availableThisWeek, offersTrial, mode, sortBy]);

  const visibleTrainers = filteredTrainers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTrainers.length;
  const filteredSkillOptions = allSkills.filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase()));

  /* ── shared input style ── */
  const inputStyle = {
    border: "1.5px solid #bfdbfe",
    borderRadius: "12px",
    background: "white",
    transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
    fontFamily: "'Satoshi', sans-serif",
    
    color: "#0f172a",
  };

  return (
    <>
    <AnimatedBackground />
    <div className="min-h-screen font-sans" style={{ background: "transparent" }}>

      {/* keyframe injection */}
      <style>{`
      
  body {
    background: #f8faff;
    min-height: 100vh;
  }
  @keyframes cardEntrance { ... }

        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes underlineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        .trainer-input:focus {
          outline: none;
          border-color: #1d4ed8 !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .trainer-input:hover {
          border-color: #93c5fd !important;
        }
        .tag-pill { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
        .tag-pill:hover { transform: translateY(-1px); }
      `}</style>

      <div className="mx-auto px-6 pb-12 flex gap-6 items-start">

        {/* ── SIDEBAR ── */}
        <aside className="w-[20%] flex-shrink-0 sticky top-6" style={{ animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
          <div
            className="rounded-2xl mt-8 p-5"
            style={{
              background: "white",
              border: "1.5px solid #dbeafe",
              boxShadow: "0 4px 24px rgba(30,58,138,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl" style={{ color: "#1e3a8a", fontFamily: "'Clash Display', sans-serif", letterSpacing: "0.01em" }}>
                Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text- sfont-semibold flex items-center gap-1 transition-colors"
                style={{ color: "#2563eb" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1e3a8a"}
                onMouseLeave={e => e.currentTarget.style.color = "#2563eb"}
              >
                Reset
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Rating */}
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Rating</h3>
              {[4.5, 4.0, 3.5, 3.0].map((r) => (
                <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer group">
                  <input type="radio" name="rating" checked={ratingFilter === r} onChange={() => setRatingFilter(ratingFilter === r ? null : r)} className="w-3.5 h-3.5" style={{ accentColor: "#1e3a8a" }} />
                  <span className="text-s transition-colors" style={{ color: "#475569" }}>{r} & above</span>
                  <div className="flex gap-0.5 ml-auto">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-3.5 ${s <= r ? "text-amber-400" : "text-blue-100"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Price / Hour</h3>
              <div className="flex justify-between text-xs mb-2" style={{ color: "#64748b" }}>
                <span>${priceRange[0]}</span><span>${priceRange[1]}+</span>
              </div>
              <input type="range" min={10} max={200} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full" style={{ accentColor: "#5376d4" }} />
            </div>

            {/* Experience */}
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Experience</h3>
              {experienceOptions.map((exp) => (
                <label key={exp} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" checked={experienceFilter.includes(exp)} onChange={() => toggleExperience(exp)} className="w-3.5 h-3.5 rounded" style={{ accentColor: "#1e3a8a" }} />
                  <span className="text-s" style={{ color: "#475569" }}>{exp}</span>
                </label>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2.5" style={{ color: "#264bb0" }}>Skills</h3>
              <div className="relative mb-2">
                <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search skills"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="trainer-input w-full pl-6 pr-2 py-1.5 text-s rounded-lg"
                  style={{ ...inputStyle, borderRadius: "8px" }}
                />
              </div>
              {filteredSkillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" checked={selectedSkills.includes(skill)} onChange={() => toggleSkill(skill)} className="w-3.5 h-3.5 rounded" style={{ accentColor: "#1e3a8a" }} />
                  <span className="text-lg" style={{ color: "#475569" }}>{skill}</span>
                </label>
              ))}
            </div>

            {/* Toggles */}
            <div className="space-y-3 mb-5">
              {[
                { label: "Verified Trainers",    value: verifiedOnly,      setter: setVerifiedOnly },
                { label: "Available this week",  value: availableThisWeek, setter: setAvailableThisWeek },
                { label: "Offers Trial Sessions",value: offersTrial,       setter: setOffersTrial },
              ].map(({ label, value, setter }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-s" style={{ color: "#475569" }}>{label}</span>
                  <button
                    onClick={() => setter(!value)}
                    className="relative w-8 h-4 rounded-full transition-colors"
                    style={{ background: value ? "#1e3a8a" : "#dbeafe" }}
                  >
                    <span
                      className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform"
                      style={{ transform: value ? "translateX(16px)" : "translateX(2px)" }}
                    />
                  </button>
                </div>
              ))}
            </div>

            <button
              className="w-full text-white text-s font-bold py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                fontFamily: "'Satoshi', sans-serif",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8, #3b82f6)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,58,138,0.35)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1e3a8a, #2563eb)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 px-8 min-w-0">

          {/* Hero heading */}
          <div className="text-center pt-10 pb-6" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}>
            <h1
              className="text-5xl py-3 font-extrabold"
              style={{ fontFamily: "'Clash Display', sans-serif", color: "#0f172a" }}
            >
              Find the{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 40%, #1d4ed8 70%, #4f46e5 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                Right Trainer
              </span>{" "}
              for Your Goal
            </h1>
            <p className="text-base mt-1" style={{ color: "#64748b", fontFamily: "'Satoshi', sans-serif" }}>
              Learn from verified industry experts and grow your skills
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-4" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search trainers, skills (React, Data Science...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="trainer-input w-full pl-9 pr-4 py-2.5 text-sm"
                style={inputStyle}
              />
            </div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#93c5fd" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <input
                type="text"
                placeholder="Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="trainer-input pl-9 pr-4 py-2.5 text-sm w-36"
                style={inputStyle}
              />
            </div>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="trainer-input px-3 py-2.5 text-sm"
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option>Online</option>
              <option>In-Person</option>
              <option>Both</option>
            </select>
            <button
              className="text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                fontFamily: "'Satoshi', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8, #3b82f6)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(30,58,138,0.35)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #1e3a8a, #2563eb)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              Search
            </button>
          </div>

          {/* Popular tags */}
          <div className="flex items-center gap-2 mb-6 flex-wrap" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}>
            <span className="text-xs font-semibold" style={{ color: "#64748b" }}>Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleSkill(tag)}
                className="tag-pill text-xs px-3 py-1 rounded-full font-semibold"
                style={
                  selectedSkills.includes(tag)
                    ? { background: "linear-gradient(135deg, #1e3a8a, #2563eb)", color: "white", border: "1.5px solid transparent" }
                    : { background: "white", color: "#1e40af", border: "1.5px solid #bfdbfe" }
                }
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Top Rated Trainers */}
<TopRatedTrainersSection trainers={trainersData} />
          {/* Results header */}
          <div className="flex items-center justify-between mb-4" style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
            <p className="text-sm" style={{ color: "#64748b" }}>
              <span className="font-bold" style={{ color: "#1e3a8a" }}>{filteredTrainers.length}</span> Trainers found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#64748b" }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="trainer-input text-xs px-2 py-1.5 rounded-lg"
                style={{ ...inputStyle, borderRadius: "8px", cursor: "pointer" }}
              >
                <option>Most Relevant</option>
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Reviews</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredTrainers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleTrainers.map((trainer, i) => (
                  <TrainerCard key={trainer.id} trainer={trainer} index={i} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-xs" style={{ color: "#94a3b8" }}>
                    Showing <span className="font-semibold" style={{ color: "#1e3a8a" }}>{visibleTrainers.length}</span> of{" "}
                    <span className="font-semibold" style={{ color: "#1e3a8a" }}>{filteredTrainers.length}</span> trainers
                  </p>
                  <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: "#dbeafe" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(visibleTrainers.length / filteredTrainers.length) * 100}%`,
                        background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                    className="flex items-center gap-2 text-sm font-semibold px-8 py-2.5 rounded-xl transition-all"
                    style={{
                      background: "white",
                      border: "1.5px solid #bfdbfe",
                      color: "#1e40af",
                      boxShadow: "0 2px 8px rgba(30,58,138,0.07)",
                    }}
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

              {/* All loaded */}
              {!hasMore && filteredTrainers.length > INITIAL_COUNT && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <p className="text-sm" style={{ color: "#94a3b8" }}>You've seen all {filteredTrainers.length} trainers</p>
                  <button onClick={resetFilters} className="text-xs font-semibold hover:underline" style={{ color: "#2563eb" }}>
                    Reset filters to explore more
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-lg" style={{ color: "#1e3a8a" }}>No trainers found</h3>
              <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>Try adjusting your filters or search terms</p>
              <button onClick={resetFilters} className="mt-4 text-sm font-semibold hover:underline" style={{ color: "#2563eb" }}>
                Reset all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
    <Footer/>
    </>
  );
}