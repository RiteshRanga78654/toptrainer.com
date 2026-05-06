// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Clock, Monitor, Briefcase, Heart, PieChart, Target, Pencil, TrendingUp, LayoutGrid, ArrowRight } from "lucide-react";
// import HeroSection from "../components/articleHeroSection";


// /* ─────────────── TABS ─────────────── */
// const TABS = [
//   { label: "All Articles", icon: <LayoutGrid size={15} /> },
//   { label: "Tech",         icon: <Monitor size={15} /> },
//   { label: "Business",     icon: <Briefcase size={15} /> },
//   { label: "Health",       icon: <Heart size={15} /> },
//   { label: "Finance",      icon: <PieChart size={15} /> },
//   { label: "Marketing",    icon: <Target size={15} /> },
//   { label: "Creative",     icon: <Pencil size={15} /> },
//   { label: "Growth",       icon: <TrendingUp size={15} /> },
// ];

// /* ─────────────── CATEGORY COLORS ─────────────── */
// const CAT_STYLE = {
//   FINANCE:   { bg: "#dbeafe", color: "#1d4ed8" },
//   WELLNESS:  { bg: "#ede9fe", color: "#6d28d9" },
//   HEALTH:    { bg: "#d1fae5", color: "#065f46" },
//   MARKETING: { bg: "#fee2e2", color: "#b91c1c" },
//   TECH:      { bg: "#cffafe", color: "#0e7490" },
//   GROWTH:    { bg: "#fef3c7", color: "#92400e" },
//   BUSINESS:  { bg: "#e0e7ff", color: "#3730a3" },
//   CREATIVE:  { bg: "#fce7f3", color: "#9d174d" },
// };

// /* ─────────────── HELPER ─────────────── */
// const getInitials = (name = "") =>
//   name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// const formatDate = (d) =>
//   new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// /* ═══════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════ */
// export default function ArticlesSection() {
//   const [activeTab,    setActiveTab]    = useState("All Articles");
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [data,         setData]         = useState(null);
//   const [loading,      setLoading]      = useState(true);

//   useEffect(() => {
//     fetch("https://service.ireedindia.com/v1/blog?published=true&size=1000")
//       .then((r) => r.json())
//       .then((d) => { setData(d); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   /* Reset pagination on tab change */
//   useEffect(() => { setVisibleCount(6); }, [activeTab]);

//   const filtered =
//     data?.blogs?.filter((a) =>
//       activeTab === "All Articles"
//         ? true
//         : a.category?.toLowerCase() === activeTab.toLowerCase()
//     ) ?? [];

//   const visible = filtered.slice(0, visibleCount);

//   return (
//     <div
//       style={{
//         fontFamily: "var(--font-geist-sans)",
//         background: "linear-gradient(135deg,#eef2ff 0%,#f5f3ff 55%,#eef2ff 100%)",
//         minHeight: "100vh",

//       }}
//       className="w-full max-w-7xl mx-auto"
//     >
//       {/* HERO */}
//       <HeroSection />
//       {/* ══════════ STICKY TAB BAR ══════════ */}
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 20,
//           backdropFilter: "blur(16px)",
//           WebkitBackdropFilter: "blur(16px)",
//           background: "rgba(238,237,248,0.85)",
//           borderBottom: "1px solid rgba(99,102,241,0.1)",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: 1280,
//             margin: "0 auto",
//             padding: "10px 24px",
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               borderRadius: 14,
//               padding: "6px 8px",
//               gap: 4,
//               overflowX: "auto",
//               scrollbarWidth: "none",
//               boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
//                display: "flex",
//     justifyContent: "center",   // 🔥 centers horizontally
//     alignItems: "center",
//     gap: 10,
//     flexWrap: "wrap",
//             }}
//           >
//             {TABS.map((tab) => {
//               const active = activeTab === tab.label;
//               return (
//                 <button
//                   key={tab.label}
//                   onClick={() => setActiveTab(tab.label)}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 7,
//                     padding: "8px 16px",
//                     borderRadius: 10,
//                     border: "none",
//                     background: active
//                       ? "linear-gradient(135deg,#6366f1,#4f46e5)"
//                       : "transparent",
//                     color: active ? "#fff" : "#4b5563",
//                     fontSize: 13,
//                     fontWeight: active ? 700 : 500,
//                     cursor: "pointer",
//                     whiteSpace: "nowrap",
//                     flexShrink: 0,
//                     fontFamily: "var(--font-geist-sans)",
//                     transition: "all 0.18s ease",
//                     boxShadow: active ? "0 3px 12px rgba(99,102,241,0.35)" : "none",
//                   }}
//                 >
//                   <span style={{ opacity: active ? 1 : 0.6, display: "flex" }}>
//                     {tab.icon}
//                   </span>
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ══════════ ARTICLES SECTION ══════════ */}
//       <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 60px" }}>

//         {/* Section header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             marginBottom: 28,
//             flexWrap: "wrap",
//             gap: 12,
//           }}
//         >
//           <div>
//             <h2
//               style={{
//                 fontSize: "clamp(22px,3vw,30px)",
//                 fontWeight: 800,
//                 color: "#0f172a",
//                 margin: 0,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Latest Articles
//             </h2>
//             <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0", lineHeight: 1.5 }}>
//               Fresh insights from industry experts to help you learn, grow and stay ahead.
//             </p>
//           </div>

//           <Link
//             href="#"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 6,
//               color: "#4f46e5",
//               fontSize: 14,
//               fontWeight: 600,
//               textDecoration: "none",
//               whiteSpace: "nowrap",
//             }}
//           >
//             View all articles <ArrowRight size={15} />
//           </Link>
//         </div>

//         {/* ── Loading ── */}
//         {loading && (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 style={{
//                   borderRadius: 16,
//                   background: "white",
//                   overflow: "hidden",
//                   border: "1px solid #f1f5f9",
//                 }}
//               >
//                 <div style={{ height: 180, background: "#f1f5f9", animation: "pulse 1.5s ease-in-out infinite" }} />
//                 <div style={{ padding: "16px 18px" }}>
//                   <div style={{ height: 14, borderRadius: 6, background: "#f1f5f9", marginBottom: 8 }} />
//                   <div style={{ height: 14, borderRadius: 6, background: "#f1f5f9", width: "70%" }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── Cards Grid ── */}
//         {!loading && (
//           <>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
//                 gap: 20,
//               }}
//             >
//               {visible.map((a) => {
//                 const cat    = CAT_STYLE[(a.category || "TECH").toUpperCase()] ?? CAT_STYLE.TECH;
//                 const initials = getInitials(a.researchAssociate);

//                 return (
//                   <article
//                     key={a._id}
//                     style={{
//                       background: "white",
//                       borderRadius: 16,
//                       border: "1px solid #f1f5f9",
//                       overflow: "hidden",
//                       display: "flex",
//                       flexDirection: "column",
//                       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-4px)";
//                       e.currentTarget.style.boxShadow = "0 12px 36px rgba(99,102,241,0.12)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow = "none";
//                     }}
//                   >
//                     {/* Image */}
//                     <div style={{ position: "relative", height: 188, background: "#f1f5f9", flexShrink: 0 }}>
//                       <Image
//                         src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
//                         alt={a.title}
//                         fill
//                         style={{ objectFit: "cover" }}
//                       />
//                       {/* Read time badge */}
//                       <span
//                         style={{
//                           position: "absolute",
//                           top: 12,
//                           left: 12,
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 5,
//                           background: "rgba(0,0,0,0.55)",
//                           backdropFilter: "blur(6px)",
//                           color: "white",
//                           fontSize: 11,
//                           fontWeight: 600,
//                           padding: "4px 10px",
//                           borderRadius: 999,
//                         }}
//                       >
//                         <Clock size={11} /> 5 min read
//                       </span>
//                     </div>

//                     {/* Content */}
//                     <div
//                       style={{
//                         padding: "16px 18px 18px",
//                         display: "flex",
//                         flexDirection: "column",
//                         flex: 1,
//                         gap: 8,
//                       }}
//                     >
//                       {/* Category chip */}
//                       {a.category && (
//                         <span
//                           style={{
//                             display: "inline-block",
//                             alignSelf: "flex-start",
//                             background: cat.bg,
//                             color: cat.color,
//                             fontSize: 11,
//                             fontWeight: 600,
//                             padding: "3px 10px",
//                             borderRadius: 999,
//                             letterSpacing: "0.04em",
//                           }}
//                         >
//                           {a.category.toUpperCase()}
//                         </span>
//                       )}

//                       {/* Title */}
//                       <h3
//                         style={{
//                           fontSize: 15,
//                           fontWeight: 700,
//                           color: "#0f172a",
//                           lineHeight: 1.45,
//                           margin: 0,
//                         }}
//                       >
//                         {a.title}
//                       </h3>

//                       {/* Description */}
//                       <p
//                         style={{
//                           fontSize: 13,
//                           color: "#6b7280",
//                           lineHeight: 1.65,
//                           margin: 0,
//                           flex: 1,
//                           display: "-webkit-box",
//                           WebkitLineClamp: 3,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {a.description}
//                       </p>

//                       {/* Footer */}
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           marginTop: 4,
//                           paddingTop: 12,
//                           borderTop: "1px solid #f1f5f9",
//                         }}
//                       >
//                         {/* Author */}
//                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                           <div
//                             style={{
//                               width: 32,
//                               height: 32,
//                               borderRadius: "50%",
//                               background: "linear-gradient(135deg,#6366f1,#4f46e5)",
//                               color: "white",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               fontSize: 11,
//                               fontWeight: 700,
//                               flexShrink: 0,
//                             }}
//                           >
//                             {initials}
//                           </div>
//                           <div style={{ lineHeight: 1.3 }}>
//                             <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
//                               {a.researchAssociate}
//                             </div>
//                             <div style={{ fontSize: 11, color: "#9ca3af" }}>
//                               {formatDate(a.date)}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Arrow CTA */}
//                         <Link
//                           href="/soloArticlePage"
//                           style={{
//                             width: 32,
//                             height: 32,
//                             borderRadius: "50%",
//                             background: "#eef2ff",
//                             color: "#4f46e5",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             textDecoration: "none",
//                             transition: "background 0.15s, transform 0.15s",
//                             flexShrink: 0,
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = "#4f46e5";
//                             e.currentTarget.style.color = "white";
//                             e.currentTarget.style.transform = "scale(1.1)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = "#eef2ff";
//                             e.currentTarget.style.color = "#4f46e5";
//                             e.currentTarget.style.transform = "scale(1)";
//                           }}
//                         >
//                           <ArrowRight size={14} />
//                         </Link>
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>

//             {/* ── Empty state ── */}
//             {filtered.length === 0 && (
//               <div
//                 style={{
//                   textAlign: "center",
//                   padding: "80px 20px",
//                   color: "#9ca3af",
//                   fontSize: 15,
//                 }}
//               >
//                 No articles found in this category.
//               </div>
//             )}

//             {/* ── Load more / Show less ── */}
//             {filtered.length > 6 && (
//               <div style={{ textAlign: "center", marginTop: 40 }}>
//                 <button
//                   onClick={() =>
//                     setVisibleCount((prev) =>
//                       prev >= filtered.length ? 6 : prev + 3
//                     )
//                   }
//                   style={{
//                     padding: "11px 32px",
//                     borderRadius: 999,
//                     border: "1.5px solid #6366f1",
//                     background: "white",
//                     color: "#4f46e5",
//                     fontSize: 14,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     fontFamily: "var(--font-geist-sans)",
//                     transition: "all 0.18s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#4f46e5";
//                     e.currentTarget.style.color = "white";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "white";
//                     e.currentTarget.style.color = "#4f46e5";
//                   }}
//                 >
//                   {visibleCount >= filtered.length ? "Show Less" : "Load More Articles"}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Skeleton pulse keyframe */}
//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0.5; }
//         }
//         /* Hide tab scrollbar in webkit */
//         div::-webkit-scrollbar { display: none; }
//       `}</style>
//     </div>
//   );
// }