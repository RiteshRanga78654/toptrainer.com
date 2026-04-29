//  "use client";

// import { Star, CheckCircle } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";
// import {  ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Navbar from "./components/Navbar";



// import { Brain, Mic, Monitor, BarChart3, Leaf } from "lucide-react";
// import YoutubeSection from "./components/youtube";

// import PopularCourses from "./components/course";


// const Page = () => {
//   const [open, setOpen] = useState(false);
//   const scrollRef = useRef(null);
//   const categoryRef = useRef(null);
//   const [pause, setPause] = useState(false);
//   const [catIndex, setCatIndex] = useState(0);

//   const navItems = [
//     "Find Trainers",
//     "Workshops",
//     "Corporate Solutions",
//     "Join as Trainer",
//   ];
// const courseData = [
//   {
//     id: 1,
//     title: "Advanced B2B Sales Mastery",
//     provider: "Masterclass",
//     type: "Course",
//     rating: "4.9",
//     image: "/Images/courses.png",
//   },
//   {
//     id: 2,
//     title: "Closing Techniques 101",
//     provider: "Bootcamp",
//     type: "Course",
//     rating: "4.6",
//     image: "/Images/courses.png",
//   },
//   {
//     id: 3,
//     title: "Negotiation Tactics for Enterprise",
//     provider: "Specialization",
//     type: "Course",
//     rating: "5.0",
//     image: "/Images/courses.png",
//   },
//   {
//     id: 4,
//     title: "Cold Calling Strategies",
//     provider: "Workshop",
//     type: "Course",
//     rating: "4.7",
//     image: "/Images/courses.png",
//   },
// ];

//   const categories = [
//     { name: "AI Goal-Based", icon: Brain, color: "bg-orange-100 text-orange-600" },
//     { name: "Soft Skills", icon: Mic, color: "bg-red-100 text-red-600" },
//     { name: "Technical", icon: Monitor, color: "bg-blue-100 text-blue-600" },
//     { name: "Leadership", icon: BarChart3, color: "bg-yellow-100 text-yellow-600" },
//     { name: "Wellness", icon: Leaf, color: "bg-green-100 text-green-600" },
//     { name: "Data Science", icon: Brain, color: "bg-purple-100 text-purple-600" },
//     { name: "Communication", icon: Mic, color: "bg-pink-100 text-pink-600" },
//     { name: "Management", icon: BarChart3, color: "bg-indigo-100 text-indigo-600" },
//   ];

//   const totalDots = 5;

//   const scrollCatLeft = () => {
//     if (categoryRef.current) {
//       categoryRef.current.scrollBy({ left: -220, behavior: "smooth" });
//       setCatIndex((prev) => Math.max(prev - 1, 0));
//     }
//   };

//   const scrollCatRight = () => {
//     if (categoryRef.current) {
//       categoryRef.current.scrollBy({ left: 220, behavior: "smooth" });
//       setCatIndex((prev) => Math.min(prev + 1, totalDots - 1));
//     }
//   };

//   const scrollAmount = 300;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!pause && scrollRef.current) {
//         scrollRef.current.scrollLeft += 1;
//         if (
//           scrollRef.current.scrollLeft >=
//           scrollRef.current.scrollWidth - scrollRef.current.clientWidth
//         ) {
//           scrollRef.current.scrollLeft = 0;
//         }
//       }
//     }, 10);
//     return () => clearInterval(interval);
//   }, [pause]);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   };

//   return (
//     <div className="font-sans bg-white min-h-screen">
//       <Navbar open={open} setOpen={setOpen} navItems={navItems} />

//       {/* ━━━ HERO SECTION ━━━ */}
//       <section className="w-full bg-gradient-to-br from-blue-50  to-purple-50 px-4 sm:px-8 md:px-16 py-8 md:py-14">

//         {/* HERO GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto">

//           {/* LEFT TEXT */}
//           <div className="text-center md:text-left order-2 md:order-1">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
//               Connect with{" "}
//               <span className="text-blue-600">Expert Trainers</span>{" "}
//               to Achieve Your Goals
//             </h1>

//             <p className="text-gray-500 mt-3 md:mt-4 text-sm md:text-lg">
//               Personalized learning, live 1-on-1 sessions, and guidance from
//               top-rated professionals.
//             </p>

//             {/* SEARCH */}
//       <div className="flex flex-col sm:flex-row gap-3 mt-5 md:mt-6">
//   <input
//     type="text"
//     placeholder="What do you want to learn?"
//     className="flex-1 min-w-0 px-4 sm:px-5 py-3 rounded-xl border border-gray-200 shadow-sm 
//     text-sm md:text-base transition-all duration-200
//     hover:border-blue-400 hover:shadow-md
//     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
//   />

//   <button className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-md 
//     text-sm md:text-base whitespace-nowrap transition-all duration-200
//     hover:bg-blue-700 hover:shadow-lg cursor-pointer active:scale-95">
//     Find a Trainer →
//   </button>
// </div>

//             {/* STATS */}
//             <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-5 md:mt-8">
//               <div className="flex items-center gap-2">
//                 <Star className="text-yellow-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">4.9/5 Rating</p>
//                   <p className="text-xs text-gray-500">2,500+ reviews</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">1,200+</p>
//                   <p className="text-xs text-gray-500">Verified Experts</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">50,000+</p>
//                   <p className="text-xs text-gray-500">1-on-1 Sessions</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative flex justify-center md:justify-end order-1 md:order-2">
//             <div className="absolute bg-blue-200 rounded-full blur-3xl opacity-30 w-40 h-40 md:w-72 md:h-72" />
//             <Image
//               src="/Images/hero.png"
//               alt="Trainer"
//               width={700}
//               height={400}
//               className="relative z-10 w-full max-w-[260px] sm:max-w-sm md:max-w-full h-auto"
//             />
//           </div>
//         </div>

//         {/* ━━━ CATEGORY SLIDER ━━━ */}
//        <div className="mt-8 md:mt-14 max-w-7xl mx-auto">

//   <div className="flex items-center gap-2 md:gap-3">

//     {/* LEFT BUTTON (VISIBLE ON MOBILE ALSO) */}
//     <button
//       onClick={scrollCatLeft}
//       className="flex-shrink-0 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 border border-gray-200"
//     >
//       <ChevronLeft size={18} />
//     </button>

//     {/* CATEGORY CONTAINER */}
//     <div
//       ref={categoryRef}
//       className="flex gap-2 md:gap-3 overflow-hidden flex-1"
//     >
//       {categories.map((cat) => {
//         const Icon = cat.icon;
//         return (
//           <div
//             key={cat.name}
//             className="
//               flex items-center gap-2 md:gap-3 
//               px-2 md:px-4 py-2 md:py-3 
//               rounded-xl border bg-white shadow-sm 
//               hover:shadow-md hover:border-blue-400 transition 
//               flex-shrink-0 cursor-pointer

//               /* 👇 IMPORTANT WIDTH CONTROL */
//               w-[30%] sm:w-[30%] md:w-auto
//             "
//           >
//             <div className={`p-1.5 md:p-2 rounded-lg ${cat.color}`}>
//               <Icon size={14} />
//             </div>
//             <p className="font-medium text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
//               {cat.name}
//             </p>
//           </div>
//         );
//       })}
//     </div>

//     {/* RIGHT BUTTON */}
//     <button
//       onClick={scrollCatRight}
//       className="flex-shrink-0 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 border border-gray-200"
//     >
//       <ChevronRight size={18} />
//     </button>

//   </div>

//   {/* DOTS */}
//   <div className="flex justify-center mt-4 md:mt-5 gap-2">
//     {[...Array(totalDots)].map((_, i) => (
//       <div
//         key={i}
//         className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
//           i === catIndex ? "w-4 md:w-5 bg-blue-600" : "w-1.5 md:w-2 bg-gray-300"
//         }`}
//       />
//     ))}
//   </div>

// </div>
//       </section>
    
//       <PopularCourses/>
//       <YoutubeSection/>

//     </div>
//   );
// };

// export default Page;


"use client";

import { Star, CheckCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";


import { Brain, Mic, Monitor, BarChart3, Leaf } from "lucide-react";
import YoutubeSection from "./components/youtube";
import PopularCourses from "./components/course";
import Category from "./components/category";
import Articles from "./components/article";


/* ━━━ INJECT GLOBAL STYLES ━━━ */
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

    :root {
      --blue-primary: #2563eb;
      --blue-light: #eff6ff;
      --blue-glow: rgba(37, 99, 235, 0.15);
      --purple-soft: #f5f3ff;
      --text-dark: #0f172a;
      --text-mid: #475569;
    }

    * { box-sizing: border-box; }

    body {
      font-family: 'Satoshi', sans-serif;
      background: #fff;
    }

    /* ── Keyframes ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    @keyframes pulseRing {
      0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
      70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(37,99,235,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes orbitSlow {
      from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
    }
    @keyframes orbitFast {
      from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
      to   { transform: rotate(-360deg) translateX(80px) rotate(360deg); }
    }
    @keyframes blobMorph {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50%       { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
      75%       { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%;   }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%;   }
    }
    @keyframes particleDrift {
      0%   { transform: translateY(0)   translateX(0)   scale(1);   opacity: 0.6; }
      33%  { transform: translateY(-30px) translateX(15px)  scale(1.2); opacity: 0.9; }
      66%  { transform: translateY(-15px) translateX(-10px) scale(0.8); opacity: 0.4; }
      100% { transform: translateY(0)   translateX(0)   scale(1);   opacity: 0.6; }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes underlineGrow {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50%       { opacity: 1;   transform: scale(1.4); }
    }

    /* ── Utility animation classes ── */
    .anim-fade-up   { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-fade-in   { animation: fadeIn 0.8s ease both; }
    .anim-slide-l   { animation: slideInLeft  0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-slide-r   { animation: slideInRight 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-scale-in  { animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-float     { animation: floatY 5s ease-in-out infinite; }
    .anim-blob      { animation: blobMorph 10s ease-in-out infinite; }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-700 { animation-delay: 0.7s; }
    .delay-800 { animation-delay: 0.8s; }

    /* ── Hero gradient background ── */
    .hero-bg {
      background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%);
      background-size: 300% 300%;
      animation: gradientShift 12s ease infinite;
      position: relative;
      overflow: hidden;
    }

    /* ── Animated mesh grid overlay ── */
    .hero-bg::before {
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

    /* ── Glow blob decorators ── */
    .blob-blue {
      position: absolute;
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
      animation: blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
      filter: blur(32px);
      pointer-events: none;
    }
    .blob-purple {
      position: absolute;
      border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
      background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%);
      animation: blobMorph 15s ease-in-out infinite reverse, floatY 10s ease-in-out infinite 2s;
      filter: blur(40px);
      pointer-events: none;
    }

    /* ── Floating particles ── */
    .particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .particle-1  { width:6px; height:6px; background:#2563eb; top:12%; left:8%;  animation: particleDrift 6s ease-in-out infinite; }
    .particle-2  { width:4px; height:4px; background:#8b5cf6; top:28%; left:18%; animation: particleDrift 8s ease-in-out infinite 1s; }
    .particle-3  { width:8px; height:8px; background:#06b6d4; top:60%; left:5%;  animation: particleDrift 7s ease-in-out infinite 2s; }
    .particle-4  { width:5px; height:5px; background:#10b981; top:80%; left:22%; animation: particleDrift 9s ease-in-out infinite 0.5s; }
    .particle-5  { width:6px; height:6px; background:#f59e0b; top:18%; right:12%;animation: particleDrift 5s ease-in-out infinite 1.5s; }
    .particle-6  { width:4px; height:4px; background:#ef4444; top:45%; right:8%; animation: particleDrift 10s ease-in-out infinite 3s; }
    .particle-7  { width:7px; height:7px; background:#2563eb; top:72%; right:18%;animation: particleDrift 7s ease-in-out infinite 0.8s; }
    .particle-8  { width:3px; height:3px; background:#8b5cf6; top:88%; right:5%; animation: particleDrift 8s ease-in-out infinite 2.2s; }

    /* ── Shimmer text ── */
    .text-shimmer {
      background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    /* ── Search input glow ── */
    .search-input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37,99,235,0.1), 0 4px 20px rgba(37,99,235,0.12);
      transform: translateY(-1px);
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .search-input {
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .search-input:hover {
      border-color: #93c5fd;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      transform: translateY(-1px);
    }

    /* ── CTA button ── */
    .cta-btn {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .cta-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #1d4ed8, #7c3aed);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .cta-btn:hover::before { opacity: 1; }
    .cta-btn:hover {
      box-shadow: 0 8px 30px rgba(37,99,235,0.4);
      transform: translateY(-2px) scale(1.02);
    }
    .cta-btn:active { transform: scale(0.97); }
    .cta-btn span { position: relative; z-index: 1; }

    /* ── Ripple on button ── */
    .cta-btn::after {
      content: '';
      position: absolute;
      width: 120%;
      height: 120%;
      top: -10%;
      left: -10%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transform: translateX(-100%);
      transition: none;
    }
    .cta-btn:hover::after {
      animation: shimmer 1.2s ease forwards;
    }

    /* ── Stat badges ── */
    .stat-badge {
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.9);
      border-radius: 14px;
      padding: 10px 16px;
      box-shadow: 0 4px 20px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .stat-badge:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 12px 32px rgba(37,99,235,0.14);
      border-color: rgba(37,99,235,0.2);
    }

    /* ── Hero image wrapper ── */
    .hero-image-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hero-image-wrapper::before {
      content: '';
      position: absolute;
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
      animation: pulseRing 3s ease-out infinite;
    }
    .hero-image-inner {
      position: relative;
      z-index: 10;
      animation: floatY 5s ease-in-out infinite;
      filter: drop-shadow(0 20px 40px rgba(37,99,235,0.2));
    }

    /* ── Glow ring behind image ── */
    .image-glow {
      position: absolute;
      width: 65%;
      height: 65%;
      border-radius: 50%;
      background: conic-gradient(from 0deg, #2563eb22, #8b5cf622, #06b6d422, #2563eb22);
      animation: orbitSlow 12s linear infinite;
      filter: blur(2px);
    }

    /* ── Orbiting badge ── */
    .orbit-badge {
      position: absolute;
      background: white;
      border-radius: 12px;
      padding: 8px 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      border: 1px solid rgba(255,255,255,0.9);
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 20;
      animation: floatY 4s ease-in-out infinite;
    }
    .orbit-badge-top {
      top: 10%;
      right: 0;
      animation-delay: 0.5s;
    }
    .orbit-badge-bottom {
      bottom: 15%;
      left: -5%;
      animation-delay: 1.5s;
    }

    /* ── Category cards ── */
    .cat-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      position: relative;
      overflow: hidden;
    }
    .cat-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(37,99,235,0.04), rgba(139,92,246,0.04));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .cat-card:hover::before { opacity: 1; }
    .cat-card:hover {
      border-color: #93c5fd;
      box-shadow: 0 8px 24px rgba(37,99,235,0.12);
      transform: translateY(-3px) scale(1.02);
    }
    .cat-card:active { transform: scale(0.97); }

    /* ── Category icon ── */
    .cat-icon {
      border-radius: 10px;
      padding: 8px;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .cat-card:hover .cat-icon {
      transform: rotate(10deg) scale(1.15);
    }

    /* ── Scroll nav buttons ── */
    .scroll-btn {
      flex-shrink: 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .scroll-btn:hover {
      background: #2563eb;
      color: white;
      border-color: #2563eb;
      box-shadow: 0 8px 24px rgba(37,99,235,0.3);
      transform: scale(1.1);
    }
    .scroll-btn:active { transform: scale(0.95); }

    /* ── Dot indicators ── */
    .dot-indicator {
      height: 6px;
      border-radius: 100px;
      transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .dot-active   { width: 22px; background: #2563eb; }
    .dot-inactive { width: 6px;  background: #cbd5e1; }

    /* ── Gradient heading underline ── */
    .heading-underline {
      position: relative;
      display: inline-block;
    }
    .heading-underline::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #2563eb, #7c3aed);
      border-radius: 2px;
      animation: underlineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both;
    }
  `}</style>
);

const Page = () => {

  const scrollRef = useRef(null);
  const categoryRef = useRef(null);
  const [pause, setPause] = useState(false);
  const [catIndex, setCatIndex] = useState(0);

 

  const courseData = [
    { id: 1, title: "Advanced B2B Sales Mastery",        provider: "Masterclass",    type: "Course", rating: "4.9", image: "/Images/courses.png" },
    { id: 2, title: "Closing Techniques 101",            provider: "Bootcamp",       type: "Course", rating: "4.6", image: "/Images/courses.png" },
    { id: 3, title: "Negotiation Tactics for Enterprise",provider: "Specialization", type: "Course", rating: "5.0", image: "/Images/courses.png" },
    { id: 4, title: "Cold Calling Strategies",           provider: "Workshop",       type: "Course", rating: "4.7", image: "/Images/courses.png" },
  ];

  const categories = [
    { name: "AI Goal-Based",  icon: Brain,   color: "bg-orange-100 text-orange-600" },
    { name: "Soft Skills",    icon: Mic,     color: "bg-red-100 text-red-600" },
    { name: "Technical",      icon: Monitor, color: "bg-blue-100 text-blue-600" },
    { name: "Leadership",     icon: BarChart3,color: "bg-yellow-100 text-yellow-600" },
    { name: "Wellness",       icon: Leaf,    color: "bg-green-100 text-green-600" },
    { name: "Data Science",   icon: Brain,   color: "bg-purple-100 text-purple-600" },
    { name: "Communication",  icon: Mic,     color: "bg-pink-100 text-pink-600" },
    { name: "Management",     icon: BarChart3,color: "bg-indigo-100 text-indigo-600" },
  ];

  const totalDots = 5;

  const scrollCatLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: -220, behavior: "smooth" });
      setCatIndex((prev) => Math.max(prev - 1, 0));
    }
  };
  const scrollCatRight = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: 220, behavior: "smooth" });
      setCatIndex((prev) => Math.min(prev + 1, totalDots - 1));
    }
  };

  const scrollAmount = 300;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause && scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [pause]);

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left:  scrollAmount, behavior: "smooth" });

  return (
    <div className="font-sans bg-white min-h-screen">
      <GlobalStyles />


      {/* ━━━ HERO SECTION ━━━ */}
      <section className="hero-bg w-full px-4 sm:px-8 md:px-16 py-8 md:py-14">

        {/* Floating particles */}
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className={`particle particle-${i}`} />
        ))}

        {/* Blob decorators */}
        <div className="blob-blue"  style={{ width: 500, height: 500, top: '-10%', right: '-5%',  opacity: 0.6 }} />
        <div className="blob-purple" style={{ width: 400, height: 400, bottom: '-5%', left: '-8%', opacity: 0.5 }} />

        {/* HERO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto relative z-10">

          {/* ── LEFT TEXT ── */}
          <div className="text-center md:text-left order-2 md:order-1">

            {/* Pill badge */}
            <div className="anim-fade-up inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'dotPulse 1.5s ease-in-out infinite' }} />
              <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">1,200+ Experts Online Now</span>
            </div>

            <h1 className="anim-slide-l delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Connect with{" "}
              <span className="text-shimmer heading-underline">Expert Trainers</span>{" "}
              to Achieve Your Goals
            </h1>

            <p className="anim-fade-up delay-300 text-gray-500 mt-3 md:mt-4 text-sm md:text-lg">
              Personalized learning, live 1-on-1 sessions, and guidance from
              top-rated professionals.
            </p>

            {/* SEARCH */}
            <div className="anim-fade-up delay-400 flex flex-col sm:flex-row gap-3 mt-5 md:mt-6">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="search-input flex-1 min-w-0 px-4 sm:px-5 py-3 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base"
              />
              <button className="cta-btn px-5 py-3 text-white rounded-xl font-medium text-sm md:text-base whitespace-nowrap">
                <span>Find a Trainer →</span>
              </button>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mt-5 md:mt-8">
              {[
                { icon: <Star className="text-yellow-500" size={16} />,        bold: "4.9/5 Rating",    sub: "2,500+ reviews",   delay: "delay-500" },
                { icon: <CheckCircle className="text-green-500" size={16} />,  bold: "1,200+",          sub: "Verified Experts", delay: "delay-600" },
                { icon: <CheckCircle className="text-green-500" size={16} />,  bold: "50,000+",         sub: "1-on-1 Sessions",  delay: "delay-700" },
              ].map((s) => (
                <div key={s.bold} className={`stat-badge anim-fade-up ${s.delay} flex items-center gap-2`}>
                  {s.icon}
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{s.bold}</p>
                    <p className="text-xs text-gray-500">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="hero-image-wrapper order-1 md:order-2 anim-scale-in delay-200">
            {/* Glow ring */}
            <div className="image-glow" />

            {/* Orbiting badge – top */}
            {/* <div className="orbit-badge orbit-badge-top">
              <span style={{ fontSize: 18 }}>🎯</span>
              <div>
                <p className="text-gray-800" style={{ fontSize: 11, fontWeight: 700 }}>Goal Achieved!</p>
                <p className="text-gray-400" style={{ fontSize: 10 }}>+34% this week</p>
              </div>
            </div> */}

            {/* Orbiting badge – bottom */}
            {/* <div className="orbit-badge orbit-badge-bottom">
              <span style={{ fontSize: 18 }}>⭐</span>
              <div>
                <p className="text-gray-800" style={{ fontSize: 11, fontWeight: 700 }}>Top Rated</p>
                <p className="text-gray-400" style={{ fontSize: 10 }}>Verified Trainer</p>
              </div>
            </div> */}

            {/* Main image */}
            <div className="hero-image-inner">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 w-40 h-40 md:w-72 md:h-72" />
              <Image
                src="/Images/hero.png"
                alt="Trainer"
                width={700}
                height={400}
                className="relative z-10 w-full max-w-[260px] sm:max-w-sm md:max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* ━━━ CATEGORY SLIDER ━━━ */}
        <div className="anim-fade-up delay-600 mt-8 md:mt-14 max-w-7xl mx-auto relative z-10">


<h2 className="text-shimmer text-center mb-6 flex flex-col items-center text-2xl md:text-3xl font-bold">
  Trending Categories
  <span className="mt-2 h-[3px] w-16 md:w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></span>
</h2>
          <div className="flex items-center gap-2 md:gap-3">
            

            {/* LEFT BUTTON */}
            <button onClick={scrollCatLeft} className="scroll-btn">
              <ChevronLeft size={18} />
            </button>

            {/* CATEGORY CONTAINER */}
            <div
              ref={categoryRef}
              className="flex gap-2 md:gap-3 overflow-hidden flex-1"
            >
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className="cat-card w-[30%] sm:w-[30%] md:w-auto"
                    style={{ animationDelay: `${0.6 + idx * 0.07}s` }}
                  >
                    <div className={`cat-icon ${cat.color}`}>
                      <Icon size={14} />
                    </div>
                    <p className="font-medium text-[11px] sm:text-xs md:text-sm whitespace-nowrap text-gray-700">
                      {cat.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT BUTTON */}
            <button onClick={scrollCatRight} className="scroll-btn">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* DOTS */}
          <div className="flex justify-center mt-4 md:mt-5 gap-2">
            {[...Array(totalDots)].map((_, i) => (
              <div
                key={i}
                className={`dot-indicator ${i === catIndex ? "dot-active" : "dot-inactive"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <PopularCourses />
      <Category />
      <YoutubeSection />
      <Articles />

 
      
      
    </div>
  );
};

export default Page;
