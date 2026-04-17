// import Image from "next/image";

// export default function PopularCourses() {
//     const data = [
//         {
//             title: "Popular in Sales",
//             items: [
//                 {
//                     name: "Rahul Sharma",
//                     skill: "Digital Marketing & Sales",
//                     rating: "4.9",
//                     image: "/Images/trainee1.png",
//                 },
//                 {
//                     name: "Anjali Verma",
//                     skill: "B2B Sales Masterclass",
//                     rating: "4.8",
//                     image: "/Images/trainee2.png",
//                 },
//                 {
//                     name: "Aman Gupta",
//                     skill: "Cold Calling & Lead Generation",
//                     rating: "4.7",
//                     image: "/Images/trainee3.png",
//                 },
//                 {
//                     name: "Arjun Malhotra",
//                     skill: "Sales Strategist & Negotiation Expert",
//                     rating: "4.8",
//                     image: "/Images/trainee3.png",
//                 },
//                 {
//                     name: "Simran Kaur",
//                     skill: "Inside Sales Specialist",
//                     rating: "4.7",
//                     image: "/Images/trainee2.png",
//                 },
//                 {
//                     name: "Rajat Khanna",
//                     skill: "Lead Generation & CRM Expert",
//                     rating: "4.6",
//                     image: "/Images/trainee3.png",
//                 }
//             ],
//         },
//         {
//             title: "Popular in Tech",
//             items: [
//                 {
//                     name: "Rohit Mehta",
//                     skill: "Full Stack Developer",
//                     rating: "4.8",
//                     image: "/Images/trainee3.png",
//                 },
//                 {
//                     name: "Sneha Kapoor",
//                     skill: "Data Scientist",
//                     rating: "4.9",
//                     image: "/Images/trainee2.png",
//                 },
//                 {
//                     name: "Karan Singh",
//                     skill: "AI/ML Trainer",
//                     rating: "4.7",
//                     image: "/Images/trainee1.png",
//                 },
//                 {
//                     name: "Aditya Verma",
//                     skill: "Frontend Developer (React.js)",
//                     rating: "4.8",
//                     image: "/Images/trainee3.png",
//                 },
//                 {
//                     name: "Priya Nair",
//                     skill: "Cloud Computing Engineer (AWS)",
//                     rating: "4.7",
//                     image: "/Images/trainee2.png",
//                 },
//                 {
//                     name: "Nikhil Joshi",
//                     skill: "Cybersecurity Specialist",
//                     rating: "4.6",
//                     image: "/Images/trainee3.png",
//                 }
//             ],
//         },
//         {
//             title: "Popular in Business",
//             items: [
//                 {
//                     name: "Neha Arora",
//                     skill: "Business Coach",
//                     rating: "4.8",
//                     image: "/Images/trainee2.png",
//                 },
//                 {
//                     name: "Vikas Jain",
//                     skill: "Marketing Expert",
//                     rating: "4.7",
//                     image: "/Images/trainee1.png",
//                 },
//                 {
//                     name: "Pooja Bansal",
//                     skill: "Communication Trainer",
//                     rating: "4.9",
//                     image: "/Images/trainee3.png",
//                 },
//                 {
//                     name: "Ritika Sinha",
//                     skill: "Startup & Growth Consultant",
//                     rating: "4.9",
//                     image: "/Images/trainee2.png",
//                 },
//                 {
//                     name: "Manish Agarwal",
//                     skill: "Financial Planning Expert",
//                     rating: "4.7",
//                     image: "/Images/trainee3.png",
//                 },
//                 {
//                     name: "Kavita Mehra",
//                     skill: "HR & Leadership Coach",
//                     rating: "4.8",
//                     image: "/Images/trainee2.png",
//                 }
//             ],
//         },
        
//     ];

//     return (
//         <section className="bg-gray-100 py-10 px-20">
//             <h2 className="text-3xl font-semibold mb-6">
//                 Explore <span className="text-blue-600">Trainers <span className="text-black">by Expertise</span></span> 
//             </h2>

//             <div className="grid md:grid-cols-3 gap-6">
//                 {data.map((category, idx) => (
//                     <div
//                         key={idx}
//                         className="bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
//                     >
//                         <h3 className="font-semibold text-xl mb-4 flex justify-between">
//                             {category.title} 
//                         </h3>

//                         <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2 no-scrollbar">
//                             {category.items.map((item, i) => (
//                                 <div
//                                     key={i}
//                                     className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
//                                 >
//                                     <div className="relative w-12 h-12">
//                                         <Image
//                                             src={item.image}
//                                             alt={item.name}
//                                             fill
//                                             className="rounded-full object-cover"
//                                         />
//                                     </div>


//                                     {/* Content */}
//                                     <div className="flex-1">
//                                         <p className="font-medium text-sm">
//                                             {item.name}
//                                         </p>
//                                         <p className="text-xs text-gray-500">
//                                             {item.skill}
//                                         </p>
//                                         <p className="text-xs text-blue-600">
//                                             ⭐ {item.rating}
//                                         </p>
//                                     </div>

//                                     {/* Button */}
//                                     <button className="text-xs text-blue-600 font-semibold hover:underline">
//                                         View
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }


"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Star, ArrowRight, TrendingUp, Code2, Briefcase } from "lucide-react";

/* ── Inject styles ── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap');

  .pc-section {
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%);
    background-size: 300% 300%;
    animation: pcGradientShift 12s ease infinite;
    position: relative;
    overflow: hidden;
  }

  @keyframes pcGradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* mesh grid overlay */
  .pc-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Category card ── */
  .pc-cat-card {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 4px 24px rgba(37, 99, 235, 0.07), inset 0 1px 0 rgba(255,255,255,0.9);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
    overflow: hidden;
  }

  .pc-cat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(139,92,246,0.04) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .pc-cat-card:hover::before { opacity: 1; }

  .pc-cat-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(37, 99, 235, 0.14), inset 0 1px 0 rgba(255,255,255,0.9);
    border-color: rgba(37, 99, 235, 0.2);
  }

  /* ── Category icon pill ── */
  .pc-cat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    margin-bottom: 0.75rem;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .pc-cat-card:hover .pc-cat-icon {
    transform: rotate(8deg) scale(1.12);
  }

  /* ── Trainer row ── */
  .pc-trainer-row {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 14px;
    padding: 10px 14px;
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .pc-trainer-row::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #2563eb, #7c3aed);
    border-radius: 3px 0 0 3px;
    transform: scaleY(0);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .pc-trainer-row:hover::after {
    transform: scaleY(1);
  }

  .pc-trainer-row:hover {
    background: white;
    border-color: rgba(37, 99, 235, 0.2);
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.1);
    transform: translateX(4px);
  }

  /* ── Avatar ring animation ── */
  .pc-avatar-ring {
    position: relative;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .pc-avatar-ring::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .pc-trainer-row:hover .pc-avatar-ring::before {
    opacity: 1;
  }

  .pc-avatar-inner {
    position: absolute;
    inset: 1px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1;
    background: #e2e8f0;
  }

  /* ── View button ── */
  .pc-view-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #2563eb;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
    padding: 5px 10px;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .pc-view-btn:hover {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transform: scale(1.05);
  }

  /* ── Scrollbar ── */
  .pc-scroll::-webkit-scrollbar { width: 4px; }
  .pc-scroll::-webkit-scrollbar-track { background: transparent; }
  .pc-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(#2563eb, #7c3aed);
    border-radius: 10px;
  }

  /* ── Section title shimmer ── */
  .pc-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: pcShimmer 4s linear infinite;
  }

  @keyframes pcShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* ── Tab button ── */
  .pc-tab {
    position: relative;
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 100px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    color: #64748b;
    background: rgba(255,255,255,0.6);
  }

  .pc-tab:hover {
    color: #2563eb;
    background: white;
    border-color: #bfdbfe;
    box-shadow: 0 2px 12px rgba(37,99,235,0.08);
  }

  .pc-tab.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
    box-shadow: 0 4px 16px rgba(37,99,235,0.3);
  }

  /* ── Stagger fade-up ── */
  @keyframes pcFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pc-fade-up {
    opacity: 0;
    animation: pcFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* ── Rating star pulse ── */
  .pc-star {
    display: inline-block;
    animation: pcStarPulse 2s ease-in-out infinite;
  }

  @keyframes pcStarPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  /* ── "See All" button ── */
  .pc-see-all {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 24px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    font-weight: 600;
    font-size: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    overflow: hidden;
  }

  .pc-see-all::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .pc-see-all:hover::before { opacity: 1; }

  .pc-see-all:hover {
    box-shadow: 0 8px 28px rgba(37,99,235,0.4);
    transform: translateY(-2px) scale(1.02);
  }

  .pc-see-all span { position: relative; z-index: 1; }

  /* ── Floating blob decorators ── */
  .pc-blob-1 {
    position: absolute;
    width: 350px;
    height: 350px;
    top: -10%;
    right: -5%;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
    filter: blur(40px);
    animation: pcBlobMorph 12s ease-in-out infinite, pcFloat 8s ease-in-out infinite;
    pointer-events: none;
  }

  .pc-blob-2 {
    position: absolute;
    width: 280px;
    height: 280px;
    bottom: 5%;
    left: -5%;
    border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
    background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%);
    filter: blur(40px);
    animation: pcBlobMorph 15s ease-in-out infinite reverse, pcFloat 10s ease-in-out infinite 2s;
    pointer-events: none;
  }

  @keyframes pcBlobMorph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }

  @keyframes pcFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-16px); }
  }

  /* ── Card entrance ── */
  @keyframes pcCardIn {
    from { opacity: 0; transform: translateY(32px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .pc-card-anim {
    opacity: 0;
    animation: pcCardIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* ── Row entrance ── */
  @keyframes pcRowIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .pc-row-anim {
    opacity: 0;
    animation: pcRowIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* ── Heading underline ── */
  .pc-underline {
    position: relative;
    display: inline-block;
  }

  .pc-underline::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 3px;
    width: 0;
    background: linear-gradient(90deg, #2563eb, #7c3aed);
    border-radius: 2px;
    animation: pcUnderlineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.6s forwards;
  }

  @keyframes pcUnderlineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }

  /* ── Count badge ── */
  .pc-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    background: rgba(37,99,235,0.08);
    color: #2563eb;
    border: 1px solid rgba(37,99,235,0.15);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .pc-grid { grid-template-columns: 1fr !important; }
    .pc-tabs { flex-wrap: wrap; }
  }
`;

const categoryMeta = [
  {
    key: "sales",
    icon: TrendingUp,
    iconBg: "bg-orange-100",
    iconColor: "#ea580c",
    accentFrom: "#f97316",
    accentTo:   "#ef4444",
    badge: "Hot",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    key: "tech",
    icon: Code2,
    iconBg: "bg-blue-100",
    iconColor: "#2563eb",
    accentFrom: "#2563eb",
    accentTo:   "#7c3aed",
    badge: "Trending",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    key: "business",
    icon: Briefcase,
    iconBg: "bg-emerald-100",
    iconColor: "#059669",
    accentFrom: "#10b981",
    accentTo:   "#0891b2",
    badge: "New",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
];

const data = [
  {
    title: "Popular in Sales",
    items: [
      { name: "Rahul Sharma",    skill: "Digital Marketing & Sales",         rating: "4.9", image: "/Images/trainee1.png" },
      { name: "Anjali Verma",    skill: "B2B Sales Masterclass",             rating: "4.8", image: "/Images/trainee2.png" },
      { name: "Aman Gupta",      skill: "Cold Calling & Lead Generation",    rating: "4.7", image: "/Images/trainee3.png" },
      { name: "Arjun Malhotra",  skill: "Sales Strategist & Negotiation",    rating: "4.8", image: "/Images/trainee3.png" },
      { name: "Simran Kaur",     skill: "Inside Sales Specialist",           rating: "4.7", image: "/Images/trainee2.png" },
      { name: "Rajat Khanna",    skill: "Lead Generation & CRM Expert",      rating: "4.6", image: "/Images/trainee3.png" },
    ],
  },
  {
    title: "Popular in Tech",
    items: [
      { name: "Rohit Mehta",     skill: "Full Stack Developer",              rating: "4.8", image: "/Images/trainee3.png" },
      { name: "Sneha Kapoor",    skill: "Data Scientist",                    rating: "4.9", image: "/Images/trainee2.png" },
      { name: "Karan Singh",     skill: "AI/ML Trainer",                     rating: "4.7", image: "/Images/trainee1.png" },
      { name: "Aditya Verma",    skill: "Frontend Developer (React.js)",     rating: "4.8", image: "/Images/trainee3.png" },
      { name: "Priya Nair",      skill: "Cloud Computing Engineer (AWS)",    rating: "4.7", image: "/Images/trainee2.png" },
      { name: "Nikhil Joshi",    skill: "Cybersecurity Specialist",          rating: "4.6", image: "/Images/trainee3.png" },
    ],
  },
  {
    title: "Popular in Business",
    items: [
      { name: "Neha Arora",      skill: "Business Coach",                    rating: "4.8", image: "/Images/trainee2.png" },
      { name: "Vikas Jain",      skill: "Marketing Expert",                  rating: "4.7", image: "/Images/trainee1.png" },
      { name: "Pooja Bansal",    skill: "Communication Trainer",             rating: "4.9", image: "/Images/trainee3.png" },
      { name: "Ritika Sinha",    skill: "Startup & Growth Consultant",       rating: "4.9", image: "/Images/trainee2.png" },
      { name: "Manish Agarwal",  skill: "Financial Planning Expert",         rating: "4.7", image: "/Images/trainee3.png" },
      { name: "Kavita Mehra",    skill: "HR & Leadership Coach",             rating: "4.8", image: "/Images/trainee2.png" },
    ],
  },
];

export default function PopularCourses() {
  const [activeTab, setActiveTab] = useState(null); // null = show all
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayData = activeTab !== null ? [data[activeTab]] : data;

  const tabLabels = ["Sales", "Tech", "Business"];

  return (
    <>
      <style>{styles}</style>

      <section ref={sectionRef} className="pc-section w-full px-4 sm:px-8 md:px-16 py-12 md:py-20 relative">

        {/* blobs */}
        <div className="pc-blob-1" />
        <div className="pc-blob-2" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Header ── */}
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 ${visible ? "pc-fade-up" : "opacity-0"}`}
               style={{ animationDelay: "0.1s" }}>

            <div>
              {/* pill */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 mb-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500" style={{ animation: "pcStarPulse 1.5s ease-in-out infinite" }} />
                <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">3,600+ Expert Trainers</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Explore{" "}
                <span className="pc-shimmer pc-underline">Trainers</span>
                {" "}
                <span className="text-gray-800">by Expertise</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-2">
                Handpicked experts across every domain — find your perfect match.
              </p>
            </div>

            <button className="pc-see-all self-start sm:self-auto">
              <span>See All Trainers</span>
              <ArrowRight size={14} style={{ position: "relative", zIndex: 1 }} />
            </button>
          </div>

          {/* ── Tabs ── */}
          <div className={`pc-tabs flex flex-wrap gap-2 mb-8 ${visible ? "pc-fade-up" : "opacity-0"}`}
               style={{ animationDelay: "0.2s" }}>
            <button
              className={`pc-tab ${activeTab === null ? "active" : ""}`}
              onClick={() => setActiveTab(null)}
            >
              All Categories
            </button>
            {tabLabels.map((label, idx) => (
              <button
                key={label}
                className={`pc-tab ${activeTab === idx ? "active" : ""}`}
                onClick={() => setActiveTab(activeTab === idx ? null : idx)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Grid ── */}
          <div
            className="pc-grid grid gap-6"
            style={{
              gridTemplateColumns: activeTab !== null
                ? "minmax(0,480px)"
                : "repeat(auto-fit, minmax(280px, 1fr))",
              justifyContent: activeTab !== null ? "center" : "initial",
            }}
          >
            {displayData.map((category, idx) => {
              const realIdx = activeTab !== null ? activeTab : idx;
              const meta = categoryMeta[realIdx];
              const Icon = meta.icon;

              return (
                <div
                  key={category.title}
                  className={`pc-cat-card ${visible ? "pc-card-anim" : "opacity-0"}`}
                  style={{ animationDelay: `${0.25 + idx * 0.12}s` }}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div
                        className={`pc-cat-icon ${meta.iconBg}`}
                        style={{ color: meta.iconColor }}
                      >
                        <Icon size={18} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">{category.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{category.items.length} Trainers available</p>
                    </div>
                    <span className={`pc-count-badge text-xs border ${meta.badgeColor}`}>
                      {meta.badge}
                    </span>
                  </div>

                  {/* Trainer list */}
                  <div
                    className="pc-scroll space-y-2 overflow-y-auto pr-1"
                    style={{ maxHeight: 300 }}
                  >
                    {category.items.map((item, i) => (
                      <div
                        key={i}
                        className={`pc-trainer-row ${visible ? "pc-row-anim" : "opacity-0"}`}
                        style={{ animationDelay: `${0.3 + idx * 0.12 + i * 0.06}s` }}
                      >
                        {/* Avatar */}
                        <div className="pc-avatar-ring">
                          <div className="pc-avatar-inner">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-400 truncate">{item.skill}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="pc-star text-yellow-400" style={{ fontSize: 10 }}>★</span>
                            <span className="text-xs font-semibold text-blue-600">{item.rating}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <button className="pc-view-btn">
                          View
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Updated today</span>
                    <button
                      className="text-xs font-semibold text-blue-600 hover:text-purple-600 transition-colors flex items-center gap-1"
                    >
                      See all <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}