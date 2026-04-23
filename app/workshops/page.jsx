// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import {
//   Brain, BarChart3, Monitor, Mic, Leaf, Users,
//   TrendingUp, Shield, Palette, Globe,
//   Clock, Star, ArrowRight, Search, ChevronRight, X,
//   BadgeCheck, Zap, Award, IndianRupee, Tag, CheckCircle2,
//   Wifi, MapPin, Play, Camera, Calendar, GraduationCap,
//   Eye, CheckCircle, ChevronDown, ChevronUp, ArrowLeft,
//   Bookmark
// } from "lucide-react";

// /* ─────────────────────────────────────────────
//    CATEGORIES & COLORS
// ───────────────────────────────────────────── */
// const CATEGORIES = [
//   { id: "all",        label: "All",         icon: Globe },
//   { id: "sales",      label: "Sales",       icon: BarChart3 },
//   { id: "tech",       label: "Tech",        icon: Monitor },
//   { id: "leadership", label: "Leadership",  icon: Users },
//   { id: "softskills", label: "Soft Skills", icon: Mic },
//   { id: "wellness",   label: "Wellness",    icon: Leaf },
//   { id: "ai",         label: "AI & ML",     icon: Brain },
// ];

// const CAT_COLORS = {
//   sales:      { bg: "bg-amber-100",   text: "text-amber-700",   border: "border-amber-200",   accent: "from-amber-500 to-orange-500",  gradient: "from-amber-600 to-orange-600",  pill: "#F59E0B"  },
//   tech:       { bg: "bg-cyan-100",    text: "text-cyan-700",    border: "border-cyan-200",    accent: "from-cyan-500 to-blue-600",     gradient: "from-cyan-600 to-blue-700",     pill: "#0891B2"  },
//   leadership: { bg: "bg-violet-100",  text: "text-violet-700",  border: "border-violet-200",  accent: "from-violet-500 to-purple-700", gradient: "from-violet-600 to-purple-700", pill: "#7C3AED"  },
//   softskills: { bg: "bg-pink-100",    text: "text-pink-700",    border: "border-pink-200",    accent: "from-pink-500 to-rose-600",     gradient: "from-pink-600 to-rose-600",     pill: "#EC4899"  },
//   wellness:   { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", accent: "from-emerald-500 to-teal-600",  gradient: "from-emerald-600 to-teal-700",  pill: "#10B981"  },
//   ai:         { bg: "bg-orange-100",  text: "text-orange-700",  border: "border-orange-200",  accent: "from-orange-500 to-red-500",    gradient: "from-orange-600 to-red-600",    pill: "#F97316"  },
// };

// /* ─────────────────────────────────────────────
//    WORKSHOPS DATA
// ───────────────────────────────────────────── */
// const WORKSHOPS = [
//   {
//     id: 1, category: "sales", isLive: true, featured: true,
//     title: "Advanced B2B Sales Mastery",
//     shortDesc: "Master enterprise deal-closing, negotiation tactics, and consultative selling frameworks.",
//     fullDesc: "This intensive workshop takes you deep into the world of enterprise B2B selling. You will learn how to map complex stakeholder landscapes, build champions inside client organisations, and close high-value deals using proven consultative frameworks. Topics include multi-threaded pipeline management, SPIN selling, MEDDIC qualification, pricing negotiations, and post-sale expansion strategies. Every module is backed by real Fortune 500 case studies and live role-play exercises.",
//     price: { original: 24999, discounted: 14999, emi: "1,250", includes: ["Certificate", "Workbook", "Lifetime Access", "1-on-1 Mentoring"] },
//     duration: "3 Days", seats: 42, rating: "4.9", reviews: "1.2k",
//     dateRange: "25 - 27 May 2025", timeSlot: "10:00 AM - 01:00 PM", enrolled: 85,
//     tags: ["B2B", "Negotiation", "Pipeline"],
//     coverImg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=260&fit=crop", label: "Live webinar" },
//       { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=260&fit=crop", label: "Offline session" },
//       { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=260&fit=crop", label: "Team workshop" },
//       { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=260&fit=crop", label: "Mentoring" },
//     ],
//     trainer: {
//       name: "Amit Kumar", role: "Sales Director, Fortune 500", exp: "12+ Yrs",
//       students: "8,400+", initials: "AK",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["Sandler Certified", "HubSpot Certified"],
//       classTypes: [
//         { type: "Live Online", count: "48 sessions", icon: Wifi,     colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "24 sessions", icon: MapPin,   colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "120+ hrs",    icon: Play,     colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Workshop",    count: "12 batches",  icon: Calendar, colorClass: "text-amber-600",   bgClass: "bg-amber-50",   borderClass: "border-amber-200"   },
//       ],
//     },
//   },
//   {
//     id: 2, category: "tech", isLive: false, featured: false,
//     title: "Full-Stack Web Dev Bootcamp",
//     shortDesc: "Hands-on intensive covering React, Node.js, cloud deployment and real capstone projects.",
//     fullDesc: "A comprehensive deep-dive into modern full-stack engineering. You will build three production-grade capstone apps from scratch, covering React 18, Next.js, Node.js, PostgreSQL, REST & GraphQL APIs, Docker, and AWS deployment pipelines. The bootcamp follows a learn-by-doing philosophy — every concept is immediately applied in code. You will finish with a portfolio-ready GitHub profile and personalised job-readiness coaching from a senior Google engineer.",
//     price: { original: 39999, discounted: 24999, emi: "2,083", includes: ["Certificate", "Source Code", "Cloud Credits", "Job Assist"] },
//     duration: "5 Days", seats: 18, rating: "4.8", reviews: "980",
//     dateRange: "01 - 05 Jun 2025", timeSlot: "09:00 AM - 12:00 PM", enrolled: 60,
//     tags: ["React", "Node.js", "AWS"],
//     coverImg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=260&fit=crop", label: "Coding live" },
//       { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=260&fit=crop", label: "Group lab" },
//       { src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=260&fit=crop", label: "Code review" },
//       { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=260&fit=crop", label: "Demo day" },
//     ],
//     trainer: {
//       name: "Sara Reddy", role: "Senior Engineer, Google", exp: "9+ Yrs",
//       students: "6,200+", initials: "SR",
//       avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["Google Cloud Certified", "AWS Associate"],
//       classTypes: [
//         { type: "Live Online", count: "60 sessions", icon: Wifi,          colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "18 sessions", icon: MapPin,        colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "200+ hrs",    icon: Play,          colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Bootcamp",    count: "8 batches",   icon: GraduationCap, colorClass: "text-cyan-600",    bgClass: "bg-cyan-50",    borderClass: "border-cyan-200"    },
//       ],
//     },
//   },
//   {
//     id: 3, category: "leadership", isLive: false, featured: true,
//     title: "Executive Leadership & Team Building",
//     shortDesc: "Transform your leadership style with frameworks used by top CEOs worldwide.",
//     fullDesc: "Designed for mid-to-senior leaders who want to elevate their impact, this workshop blends adaptive leadership theory with hands-on practice. You will work through real-world case studies from McKinsey, IIM research, and global CEO playbooks. Core modules cover psychological safety, OKR goal-setting, navigating conflict, giving high-quality feedback, building high-performance culture, and executive presence. Includes a 360-degree feedback assessment and a 30-day implementation plan you will leave with on day two.",
//     price: { original: 19999, discounted: 11999, emi: "1,000", includes: ["Certificate", "Toolkit", "Peer Network", "Coaching"] },
//     duration: "2 Days", seats: 30, rating: "5.0", reviews: "650",
//     dateRange: "08 - 09 Jun 2025", timeSlot: "11:00 AM - 02:00 PM", enrolled: 45,
//     tags: ["Leadership", "OKRs", "Culture"],
//     coverImg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=260&fit=crop", label: "Live session" },
//       { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=260&fit=crop", label: "Offline class" },
//       { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=260&fit=crop", label: "Team exercise" },
//       { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=260&fit=crop", label: "Group coaching" },
//     ],
//     trainer: {
//       name: "Maya Joshi", role: "Executive Coach, IIM Faculty", exp: "15+ Yrs",
//       students: "11,000+", initials: "MJ",
//       avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["ICF PCC Certified", "Marshall Goldsmith"],
//       classTypes: [
//         { type: "Live Online", count: "36 sessions", icon: Wifi,   colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "20 sessions", icon: MapPin, colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "80+ hrs",     icon: Play,   colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Coaching",    count: "15 batches",  icon: Award,  colorClass: "text-amber-600",   bgClass: "bg-amber-50",   borderClass: "border-amber-200"   },
//       ],
//     },
//   },
//   {
//     id: 4, category: "ai", isLive: true, featured: true,
//     title: "AI & Machine Learning for Business",
//     shortDesc: "Implement AI tools in your business — automate, predict, optimise with no-code platforms.",
//     fullDesc: "No PhD required. This workshop is purpose-built for business leaders, product managers, and entrepreneurs who want to harness AI without writing complex code. You will explore prompt engineering, GPT-powered automations, no-code ML platforms (DataRobot, Obviously.AI), computer vision use cases, and AI-driven analytics dashboards. By the end you will have deployed at least two working AI automations for your own business context — not toy demos, but real tools.",
//     price: { original: 29999, discounted: 17999, emi: "1,500", includes: ["Certificate", "AI Tool Suite", "Templates", "Community"] },
//     duration: "2 Days", seats: 25, rating: "4.9", reviews: "870",
//     dateRange: "15 - 16 Jun 2025", timeSlot: "10:00 AM - 01:00 PM", enrolled: 72,
//     tags: ["Prompt Eng.", "No-Code ML", "Automation"],
//     coverImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=260&fit=crop", label: "AI webinar" },
//       { src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=260&fit=crop", label: "Offline lab" },
//       { src: "https://images.unsplash.com/photo-1655720406002-3b1c6e6c24fc?w=400&h=260&fit=crop", label: "Model training" },
//       { src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=260&fit=crop", label: "Demo session" },
//     ],
//     trainer: {
//       name: "Ravi Nair", role: "AI Researcher, IIT Bombay", exp: "10+ Yrs",
//       students: "5,800+", initials: "RN",
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["TensorFlow Developer", "DeepLearning.AI"],
//       classTypes: [
//         { type: "Live Online", count: "52 sessions", icon: Wifi,  colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "16 sessions", icon: MapPin,colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "150+ hrs",    icon: Play,  colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "AI Lab",      count: "10 batches",  icon: Brain, colorClass: "text-orange-600",  bgClass: "bg-orange-50",  borderClass: "border-orange-200"  },
//       ],
//     },
//   },
//   {
//     id: 5, category: "softskills", isLive: false, featured: false,
//     title: "Public Speaking & Communication",
//     shortDesc: "Build vocal presence and storytelling ability to command any stage or boardroom.",
//     fullDesc: "This is the most practically intense communication workshop available in India. You will be on your feet speaking from day one. Modules cover voice modulation, eliminating filler words, crafting a compelling narrative arc, handling tough Q&A sessions, presenting data visually, and owning the room with confident body language. Every participant receives a personal video recording of their before-and-after presentations, plus a private one-on-one feedback call with Priya post-workshop.",
//     price: { original: 12999, discounted: 7499, emi: "625", includes: ["Certificate", "Recordings", "Feedback", "Resources"] },
//     duration: "1 Day", seats: 50, rating: "4.7", reviews: "540",
//     dateRange: "22 Jun 2025", timeSlot: "09:00 AM - 05:00 PM", enrolled: 38,
//     tags: ["Public Speaking", "Storytelling", "Presence"],
//     coverImg: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=260&fit=crop", label: "Online talk" },
//       { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=260&fit=crop", label: "Stage session" },
//       { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=260&fit=crop", label: "Conference" },
//       { src: "https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=400&h=260&fit=crop", label: "Live coaching" },
//     ],
//     trainer: {
//       name: "Priya Das", role: "TED Speaker & Coach", exp: "8+ Yrs",
//       students: "14,500+", initials: "PD",
//       avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["Toastmasters DTM", "NLP Practitioner"],
//       classTypes: [
//         { type: "Live Online",    count: "40 sessions", icon: Wifi,  colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",        count: "22 sessions", icon: MapPin,colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",       count: "60+ hrs",     icon: Play,  colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Stage Practice", count: "20 batches",  icon: Mic,   colorClass: "text-pink-600",    bgClass: "bg-pink-50",    borderClass: "border-pink-200"    },
//       ],
//     },
//   },
//   {
//     id: 6, category: "wellness", isLive: false, featured: false,
//     title: "Workplace Mindfulness & Stress Management",
//     shortDesc: "Evidence-based mindfulness to sharpen focus and build emotional resilience at work.",
//     fullDesc: "Burnout is an epidemic. This workshop gives you a science-backed toolkit to reclaim your mental bandwidth and sustain peak performance without sacrificing wellbeing. Drawing from MBSR (Mindfulness-Based Stress Reduction), cognitive behavioural therapy principles, and ancient breathwork practices, Ananya guides you through techniques you can embed into your working day in under 10 minutes. Corporate teams report a 40% drop in reported stress levels within 4 weeks of applying these methods.",
//     price: { original: 9999, discounted: 5999, emi: "500", includes: ["Certificate", "App Access", "Check-ins", "Journal"] },
//     duration: "1 Day", seats: 60, rating: "4.8", reviews: "430",
//     dateRange: "29 Jun 2025", timeSlot: "10:00 AM - 04:00 PM", enrolled: 55,
//     tags: ["MBSR", "Breathwork", "Resilience"],
//     coverImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=260&fit=crop", label: "Online session" },
//       { src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=260&fit=crop", label: "Yoga class" },
//       { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=260&fit=crop", label: "Breathwork" },
//       { src: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&h=260&fit=crop", label: "Group retreat" },
//     ],
//     trainer: {
//       name: "Ananya Shah", role: "Certified Mindfulness Coach", exp: "11+ Yrs",
//       students: "9,300+", initials: "AS",
//       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["MBSR Certified", "Yoga Alliance 500H"],
//       classTypes: [
//         { type: "Live Online", count: "30 sessions", icon: Wifi,   colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "15 sessions", icon: MapPin, colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "45+ hrs",     icon: Play,   colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Retreat",     count: "6 batches",   icon: Leaf,   colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//       ],
//     },
//   },
//   {
//     id: 7, category: "tech", isLive: false, featured: false,
//     title: "Data Science & Python Analytics",
//     shortDesc: "From raw data to actionable insights — master pandas, visualisation and predictive models.",
//     fullDesc: "A practical, project-led data science workshop. You will work with real datasets, applying Python (pandas, NumPy, matplotlib, seaborn), build regression and classification models with scikit-learn, and create interactive dashboards with Plotly and Streamlit. Ideal for analysts, product managers, and engineers wanting to become data-fluent. You leave with 3 complete data projects on GitHub and a Kaggle-ready skillset.",
//     price: { original: 18999, discounted: 10999, emi: "916", includes: ["Certificate", "Datasets", "Notebooks", "Career Guide"] },
//     duration: "3 Days", seats: 35, rating: "4.8", reviews: "320",
//     dateRange: "05 - 07 Jul 2025", timeSlot: "10:00 AM - 01:00 PM", enrolled: 48,
//     tags: ["Python", "Pandas", "ML Models"],
//     coverImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=260&fit=crop", label: "Data lab" },
//       { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=260&fit=crop", label: "Workshop" },
//       { src: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=260&fit=crop", label: "Dashboard" },
//       { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=260&fit=crop", label: "Analytics" },
//     ],
//     trainer: {
//       name: "Karan Malhotra", role: "Data Lead, Microsoft India", exp: "8+ Yrs",
//       students: "4,100+", initials: "KM",
//       avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["Azure Data Scientist", "Kaggle Expert"],
//       classTypes: [
//         { type: "Live Online", count: "40 sessions", icon: Wifi,     colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "12 sessions", icon: MapPin,   colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "100+ hrs",    icon: Play,     colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Data Lab",    count: "8 batches",   icon: BarChart3,colorClass: "text-cyan-600",    bgClass: "bg-cyan-50",    borderClass: "border-cyan-200"    },
//       ],
//     },
//   },
//   {
//     id: 8, category: "leadership", isLive: false, featured: false,
//     title: "Strategic Thinking & Decision Making",
//     shortDesc: "Sharpen your strategic mind with mental models, frameworks and case-study simulations.",
//     fullDesc: "This workshop equips you with the cognitive toolkit to think clearly under pressure and make decisions that hold. You will study and apply 20+ mental models — first principles, inversion, second-order thinking, Bayesian updating — through structured case simulations drawn from global companies and Indian startups. Ideal for founders, senior managers, and consultants who need to level up their strategic acuity quickly.",
//     price: { original: 16999, discounted: 9999, emi: "833", includes: ["Certificate", "Mental Models Deck", "Cases", "Peer Forum"] },
//     duration: "2 Days", seats: 28, rating: "4.9", reviews: "280",
//     dateRange: "12 - 13 Jul 2025", timeSlot: "09:00 AM - 05:00 PM", enrolled: 32,
//     tags: ["Strategy", "Mental Models", "Decision Making"],
//     coverImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&h=420&fit=crop",
//     photos: [
//       { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=260&fit=crop", label: "Strategy session" },
//       { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=260&fit=crop", label: "Whiteboard" },
//       { src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=260&fit=crop", label: "Case study" },
//       { src: "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=260&fit=crop", label: "Group work" },
//     ],
//     trainer: {
//       name: "Vikram Bose", role: "Strategy Consultant, Ex-BCG", exp: "13+ Yrs",
//       students: "3,700+", initials: "VB",
//       avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=faces",
//       certifications: ["Wharton Strategy", "HBS Online"],
//       classTypes: [
//         { type: "Live Online", count: "24 sessions", icon: Wifi,   colorClass: "text-blue-600",    bgClass: "bg-blue-50",    borderClass: "border-blue-200"    },
//         { type: "Offline",     count: "10 sessions", icon: MapPin, colorClass: "text-emerald-600", bgClass: "bg-emerald-50", borderClass: "border-emerald-200" },
//         { type: "Recorded",    count: "55+ hrs",     icon: Play,   colorClass: "text-violet-600",  bgClass: "bg-violet-50",  borderClass: "border-violet-200"  },
//         { type: "Masterclass", count: "5 batches",   icon: Award,  colorClass: "text-amber-600",   bgClass: "bg-amber-50",   borderClass: "border-amber-200"   },
//       ],
//     },
//   },
// ];

// const TRUST_BADGES = [
//   { icon: Users,     num: "1,200+",  label: "Expert Trainers"  },
//   { icon: BarChart3, num: "320+",    label: "Live Workshops"   },
//   { icon: Star,      num: "4.9/5",   label: "Avg. Rating"      },
//   { icon: Globe,     num: "50K+",    label: "Learners Trained" },
// ];

// const fmt = (n) => n.toLocaleString("en-IN");
// const calcPct = (o, d) => Math.round(((o - d) / o) * 100);

// /* ─────────────────────────────────────────────
//    WORKSHOP CARD  (TopTrainer-style)
// ───────────────────────────────────────────── */
// const WorkshopCard = ({ w, onClick }) => {
//   const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
//   const CatLabel = CATEGORIES.find((c) => c.id === w.category)?.label || w.category;

//   return (
//     <div
//       onClick={onClick}
//       className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
//       style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
//     >
//       {/* Thumbnail */}
//       <div className="relative overflow-hidden" style={{ height: "200px" }}>
//         <img
//           src={w.coverImg}
//           alt={w.title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         {/* Category pill */}
//         <div
//           className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold"
//           style={{ backgroundColor: col.pill }}
//         >
//           {CatLabel}
//         </div>
//         {/* Bookmark */}
//         <button
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-3 right-3 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
//         >
//           <Bookmark size={14} className="text-gray-400" />
//         </button>
//         {/* Live badge */}
//         {w.isLive && (
//           <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
//             <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
//             LIVE NOW
//           </div>
//         )}
//       </div>

//       {/* Body */}
//       <div className="p-5 flex flex-col flex-1">
//         {/* Trainer row */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
//             <img src={w.trainer.avatar} alt={w.trainer.name} className="w-full h-full object-cover" />
//           </div>
//           <span className="text-xs font-semibold text-gray-700">{w.trainer.name}</span>
//           <div className="flex items-center gap-0.5 ml-auto">
//             <Star size={11} className="text-amber-400 fill-amber-400" />
//             <span className="text-xs font-bold text-gray-800">{w.rating}</span>
//             <span className="text-xs text-gray-400 ml-0.5">({w.reviews})</span>
//           </div>
//         </div>

//         {/* Title */}
//         <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2" style={{ fontFamily: "'Sora', sans-serif" }}>
//           {w.title}
//         </h3>

//         {/* Desc */}
//         <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">{w.shortDesc}</p>

//         {/* Date / Time / Enrolled */}
//         <div className="space-y-1.5 mb-4">
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <Calendar size={12} className="text-blue-400 flex-shrink-0" />
//             <span>{w.dateRange}</span>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <Clock size={12} className="text-blue-400 flex-shrink-0" />
//             <span>{w.timeSlot}</span>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <Users size={12} className="text-blue-400 flex-shrink-0" />
//             <span>+{w.enrolled} Enrolled</span>
//           </div>
//         </div>

//         {/* Price + CTA */}
//         <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
//           <div>
//             <span className="text-lg font-extrabold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
//               ₹{fmt(w.price.discounted)}
//             </span>
//             <span className="text-xs text-gray-400 line-through ml-1.5">₹{fmt(w.price.original)}</span>
//           </div>
//           <button
//             className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
//             onClick={(e) => { e.stopPropagation(); onClick(); }}
//           >
//             View Details <ArrowRight size={12} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────
//    DETAIL PAGE  (unchanged logic, same as original)
// ───────────────────────────────────────────── */
// const WorkshopDetail = ({ w, onBack }) => {
//   const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
//   const disc = calcPct(w.price.original, w.price.discounted);
//   const CatLabel = CATEGORIES.find((c) => c.id === w.category)?.label || w.category;

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-8 py-3 flex items-center gap-3">
//         <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
//           <ArrowLeft size={16} /> Back to Workshops
//         </button>
//         <div className="ml-auto flex items-center gap-2">
//           <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${col.bg} ${col.text} ${col.border}`}>{CatLabel}</span>
//           {w.isLive && (
//             <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-600 border border-red-200">
//               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
//         <img src={w.coverImg} alt={w.title} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-3xl">{w.title}</h1>
//           <div className="flex items-center gap-3 mt-3 flex-wrap">
//             <span className="flex items-center gap-1 text-amber-400 font-bold text-sm"><Star size={14} fill="currentColor" /> {w.rating}<span className="text-white/70 font-normal ml-1">({w.reviews} reviews)</span></span>
//             <span className="text-white/60 text-sm flex items-center gap-1"><Clock size={12} /> {w.duration}</span>
//             <span className="text-white/60 text-sm flex items-center gap-1"><Users size={12} /> {w.trainer.students} students</span>
//             <span className="text-red-300 text-sm font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-1 animate-pulse" />Only {w.seats} seats left</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
//         <div className="space-y-10">
//           <section>
//             <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//               <span className={`w-1 h-6 rounded-full bg-gradient-to-b ${col.gradient}`} />About This Workshop
//             </h2>
//             <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{w.fullDesc}</p>
//           </section>
//           <section>
//             <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//               <span className={`w-1 h-6 rounded-full bg-gradient-to-b ${col.gradient}`} />Topics Covered
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {w.tags.map((tag) => (
//                 <span key={tag} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${col.bg} ${col.text} ${col.border}`}>{tag}</span>
//               ))}
//             </div>
//           </section>
//           <section>
//             <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Camera size={18} className="text-gray-400" />Session Snapshots</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {w.photos.map((photo, idx) => (
//                 <div key={idx} className="relative overflow-hidden rounded-xl group/photo">
//                   <img src={photo.src} alt={photo.label} className="w-full h-40 sm:h-52 object-cover group-hover/photo:scale-105 transition-transform duration-500" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                   {idx === 0 && w.isLive && (
//                     <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[9px] font-bold">
//                       <span className="w-1 h-1 rounded-full bg-white animate-pulse" />LIVE
//                     </div>
//                   )}
//                   <span className="absolute bottom-2 left-2 text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">{photo.label}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//           <section>
//             <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//               <span className={`w-1 h-6 rounded-full bg-gradient-to-b ${col.gradient}`} />How It's Conducted
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//               {w.trainer.classTypes.map((cls, i) => {
//                 const Icon = cls.icon;
//                 return (
//                   <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center ${cls.borderClass} ${cls.bgClass}`}>
//                     <Icon size={20} className={cls.colorClass} />
//                     <div className={`text-xs font-bold ${cls.colorClass}`}>{cls.type}</div>
//                     <div className="text-[10px] text-gray-400">{cls.count}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//           <section>
//             <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" />What's Included</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {w.price.includes.map((item, i) => (
//                 <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
//                   <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
//                   <span className="text-sm font-medium text-gray-700">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Your Trainer</h3>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="relative flex-shrink-0">
//                 <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md">
//                   <img src={w.trainer.avatar} alt={w.trainer.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
//                   <BadgeCheck size={10} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <div className="font-bold text-gray-900 text-sm">{w.trainer.name}</div>
//                 <div className="text-xs text-gray-500">{w.trainer.role}</div>
//                 <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-0.5"><Award size={10} /> {w.trainer.exp}</div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-4">
//               <Users size={13} className="text-blue-500" />
//               <span className="text-sm font-bold text-blue-700">{w.trainer.students}</span>
//               <span className="text-xs text-gray-400">students trained</span>
//             </div>
//             <div className="space-y-1">
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Certifications</p>
//               {w.trainer.certifications.map((cert, i) => (
//                 <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-blue-100 text-xs font-semibold text-blue-700">
//                   <BadgeCheck size={10} className="text-blue-500 flex-shrink-0" /> {cert}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg sticky top-20">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold"><Tag size={8} /> {disc}% OFF</span>
//               <span className="text-sm text-gray-400 line-through">₹{fmt(w.price.original)}</span>
//             </div>
//             <div className="flex items-baseline gap-1 mb-1">
//               <IndianRupee size={18} className="text-gray-900" strokeWidth={2.5} />
//               <span className="text-3xl font-extrabold text-gray-900">{fmt(w.price.discounted)}</span>
//               <span className="text-xs text-emerald-600 font-semibold ml-2">Save ₹{fmt(w.price.original - w.price.discounted)}</span>
//             </div>
//             <p className="text-xs text-gray-400 flex items-center gap-1 mb-5"><Zap size={10} className="text-blue-400" />₹{w.price.emi}/mo × 12 at 0% interest</p>
//             <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${col.gradient} text-white font-bold text-sm shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200 mb-3`}>
//               Enroll Now <ArrowRight size={14} />
//             </button>
//             <button className="w-full flex items-center justify-center gap-1 py-2.5 rounded-xl text-gray-500 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all duration-200">
//               View Schedule <ChevronRight size={13} />
//             </button>
//             <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
//               {w.price.includes.map((item, i) => (
//                 <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
//                   <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" /> {item}
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex items-center gap-2 text-xs text-red-500 font-semibold">
//               <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />Only {w.seats} seats remaining — filling fast!
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────── */
// export default function WorkshopsPage() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedWorkshop, setSelectedWorkshop] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(6);

//   if (selectedWorkshop) {
//     return <WorkshopDetail w={selectedWorkshop} onBack={() => setSelectedWorkshop(null)} />;
//   }

//   const filtered = WORKSHOPS.filter((w) => {
//     const matchCat = activeCategory === "all" || w.category === activeCategory;
//     const matchQ =
//       w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       w.trainer.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchCat && matchQ;
//   });

//   const visible = filtered.slice(0, visibleCount);
//   const hasMore = visibleCount < filtered.length;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         * { box-sizing: border-box; }
//         body { font-family: 'DM Sans', sans-serif; margin: 0; background: #f8fafc; }

//         /* ── Hero clip path ── */
//         .hero-image-clip {
//           clip-path: polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%);
//         }

//         /* ── Floating badges ── */
//         @keyframes floatUp {
//           0%,100% { transform: translateY(0); }
//           50%      { transform: translateY(-6px); }
//         }
//         .float-badge { animation: floatUp 3s ease-in-out infinite; }
//         .float-badge-2 { animation: floatUp 3s ease-in-out infinite; animation-delay: 1.5s; }

//         /* ── Stagger fade-in on cards ── */
//         @keyframes fadeSlideUp {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0);    }
//         }
//         .card-anim { animation: fadeSlideUp 0.5s ease both; }

//         /* ── Feature icon pulse ── */
//         @keyframes pulse-blue {
//           0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.25); }
//           50%      { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
//         }
//         .feature-icon { animation: pulse-blue 2.5s ease infinite; }

//         .pill-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
//         .pill-scroll::-webkit-scrollbar { display: none; }
//       `}</style>

//       <div className="min-h-screen" style={{ background: "#f8fafc" }}>

//         {/* ══════════════════════════════════════
//             HERO — Split layout like reference
//         ══════════════════════════════════════ */}
    
// <div className="relative bg-white overflow-hidden">
//   <div className="max-w-7xl mx-auto px-5 sm:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">

//     {/* LEFT TEXT */}
//     <div className="z-10">
//       {/* Badge */}
//       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest text-blue-600 mb-6 w-fit bg-blue-50 border-blue-200">
//         <Calendar size={11} />
//         Learn. Practice. Transform.
//       </div>

//       <h1
//         className="leading-tight mb-5 text-gray-900"
//         style={{
//           fontFamily: "'Sora', sans-serif",
//           fontWeight: 800,
//           fontSize: "clamp(28px, 4vw, 48px)",
//         }}
//       >
//         Workshops That Build{" "}
//         <span className="text-blue-700">Real Skills &</span>{" "}
//         <span className="text-blue-700">Real Results</span>
//       </h1>

//       <p className="text-gray-500 mb-8 leading-relaxed text-sm max-w-md">
//         Join live training workshops from expert trainers and level up your skills with practical learning, real-world techniques, and personalised guidance.
//       </p>

//       {/* Features */}
//       <div className="flex flex-col gap-3 mb-8">
//         {[
//           { icon: Users, label: "Learn from Expert Trainers" },
//           { icon: Monitor, label: "Hands-on Training" },
//           { icon: TrendingUp, label: "Real Skills for Real Growth" },
//         ].map(({ icon: Icon, label }) => (
//           <div key={label} className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
//               <Icon size={14} className="text-blue-600" />
//             </div>
//             <span className="text-sm font-medium text-gray-700">{label}</span>
//           </div>
//         ))}
//       </div>

//       {/* CTA */}
//       <div className="flex items-center gap-4 flex-wrap">
//         <button
//           onClick={() =>
//             document.getElementById("workshops-grid")?.scrollIntoView({ behavior: "smooth" })
//           }
//           className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm shadow-lg bg-gradient-to-r from-blue-700 to-blue-600 hover:opacity-90"
//         >
//           Explore Workshops <ArrowRight size={14} />
//         </button>

//         {/* Trusted */}
//         <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white shadow-sm">
//           <div className="flex -space-x-2">
//             {[
//               "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40",
//               "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40",
//               "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40",
//             ].map((src, i) => (
//               <img key={i} src={src} className="w-7 h-7 rounded-full border-2 border-white" />
//             ))}
//           </div>
//           <div>
//             <div className="text-xs font-bold text-gray-900">Trusted by</div>
//             <div className="text-xs text-gray-500">2,500+ Learners</div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* RIGHT IMAGE */}
//  {/* RIGHT IMAGE — FIXED */}
//  <img
//   src="/hero.png"
//   alt="Workshop"
//   className="w-full h-full object-cover"
// />
//   </div>
// </div>

        

//         {/* ══════════════════════════════════════
//             STATS STRIP
//         ══════════════════════════════════════ */}
//         <div
//           className="border-b border-gray-100"
//           style={{ background: "#fff" }}
//         >
//           <div className="max-w-5xl mx-auto px-5 py-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
//             {TRUST_BADGES.map((s, i) => {
//               const Icon = s.icon;
//               return (
//                 <div key={i} className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
//                     <Icon size={16} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="font-black text-gray-900 text-base" style={{ fontFamily: "'Sora', sans-serif" }}>{s.num}</div>
//                     <div className="text-xs text-gray-400">{s.label}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ══════════════════════════════════════
//             WORKSHOPS SECTION
//         ══════════════════════════════════════ */}
//         <div id="workshops-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">

//           {/* Section heading */}
//           <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
//             <div>
//               <h2
//                 className="font-black text-gray-900 mb-1"
//                 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(20px,3vw,28px)" }}
//               >
//                 Popular Training Workshops
//               </h2>
//               <p className="text-gray-400 text-sm">
//                 Handpicked workshops by top trainers to help you grow faster in the skills that matter.
//               </p>
//               <div className="h-1 w-12 rounded-full bg-blue-600 mt-3" />
//             </div>
//             <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:gap-2 transition-all mt-1">
//               View All Workshops <ArrowRight size={14} />
//             </button>
//           </div>

        

//           {/* Category pills */}
//           <div className="pill-scroll mt-3 flex gap-2 pb-2 mb-8 -mx-1 px-1">
//             {CATEGORIES.map((cat) => {
//               const Icon = cat.icon;
//               const active = activeCategory === cat.id;
//               return (
//                 <button
//                   key={cat.id}
//                   onClick={() => { setActiveCategory(cat.id); setVisibleCount(6); }}
//                   className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer
//                     ${active
//                       ? "bg-blue-600 text-white border-blue-600 shadow-md"
//                       : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
//                     }`}
//                 >
//                   <Icon size={11} />{cat.label}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Grid */}
//           {visible.length > 0 ? (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {visible.map((w, i) => (
//                   <div key={w.id} className="card-anim" style={{ animationDelay: `${i * 60}ms` }}>
//                     <WorkshopCard w={w} onClick={() => setSelectedWorkshop(w)} />
//                   </div>
//                 ))}
//               </div>

//               {filtered.length > 6 && (
//                 <div className="flex justify-center mt-10">
//                   <button
//                     onClick={() => { if (hasMore) setVisibleCount((v) => v + 3); else setVisibleCount(6); }}
//                     className="flex items-center gap-2 px-8 py-3 bg-white text-blue-700 border-2 border-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
//                   >
//                     {hasMore ? <><span>Load More</span><ChevronDown size={16} /></> : <><span>Show Less</span><ChevronUp size={16} /></>}
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-20 text-slate-500">
//               <div className="text-5xl mb-4">🔍</div>
//               <h3 className="text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>No workshops found</h3>
//               <p className="mb-5 text-sm">Try a different category or clear your search.</p>
//               <button
//                 onClick={() => { setActiveCategory("all"); setSearchQuery(""); setVisibleCount(6); }}
//                 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all"
//               >
//                 Clear Filters <X size={13} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* ══════════════════════════════════════
//             BOTTOM CTA — Join / Start Workshop
//         ══════════════════════════════════════ */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
//           <div
//             className="rounded-2xl overflow-hidden border border-blue-100 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100"
//             style={{ background: "#F0F7FF" }}
//           >
//             {/* Join */}
//             <div className="flex items-center gap-5 px-8 py-8">
//               <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
//                 <Users size={24} className="text-white" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-black text-gray-900 text-lg mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Join a Workshop</h3>
//                 <p className="text-gray-500 text-sm mb-4">Choose a workshop that fits your goals and start learning from the best.</p>
//                 <button
//                   onClick={() => document.getElementById("workshops-grid")?.scrollIntoView({ behavior: "smooth" })}
//                   className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 shadow-md"
//                   style={{ background: "linear-gradient(135deg, #1D4ED8, #2563EB)" }}
//                 >
//                   Browse Workshops <ArrowRight size={14} />
//                 </button>
//               </div>
//             </div>

//             {/* OR separator (mobile) */}
//             <div className="hidden md:flex absolute inset-y-0" style={{ left: "50%" }}>
//               <div className="m-auto w-8 h-8 rounded-full bg-white border border-blue-100 flex items-center justify-center text-xs font-bold text-gray-400 -ml-4 z-10" style={{ position: "relative" }}>OR</div>
//             </div>

//             {/* Start */}
//             <div className="flex items-center gap-5 px-8 py-8">
//               <div
//                 className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0"
//                 style={{ borderColor: "#F97316", background: "#FFF7ED" }}
//               >
//                 <Star size={22} className="text-orange-500" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-black text-gray-900 text-lg mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Start Your Own Workshop</h3>
//                 <p className="text-gray-500 text-sm mb-4">Share your expertise, inspire others and become a Top Trainer.</p>
//                 <button
//                   className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-orange-600 text-sm border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all"
//                 >
//                   Become a Trainer <ArrowRight size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Brain, BarChart3, Monitor, Mic, Leaf, Users,
  TrendingUp, Shield, Globe, Clock, Star, ArrowRight,
  ChevronRight, X, BadgeCheck, Zap, Award, IndianRupee,
  Tag, CheckCircle2, Wifi, MapPin, Play, Camera, Calendar,
  GraduationCap, CheckCircle, ChevronDown, ChevronUp,
  ArrowLeft, Bookmark, Search, Sparkles,
  Target, BookOpen, Trophy, Flame, Timer, Medal,
  Rocket, HeartHandshake, BrainCircuit, Layers
} from "lucide-react";

/* ─── GLOBAL STYLES ─────────────────────────────────── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background:#F7F6F2; color:#1a1a2e; overflow-x:hidden; }

:root {
  --blue: #2563EB;
  --blue-dark: #1D4ED8;
  --indigo: #4338CA;
  --purple: #7C3AED;
  --ink: #0F172A;
  --ink-mid: #334155;
  --ink-light: #64748B;
  --ink-faint: #94A3B8;
  --surface: #FFFFFF;
  --surface-2: #F1EFE9;
  --surface-3: #E8E5DD;
  --border: rgba(0,0,0,0.07);
  --border-mid: rgba(0,0,0,0.12);
  --accent-gold: #F59E0B;
  --accent-emerald: #059669;
  --radius-card: 20px;
  --radius-pill: 999px;
  --shadow-card: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  --shadow-hover: 0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
  --shadow-blue: 0 8px 32px rgba(37,99,235,0.28);
}

/* ── HERO ── */
.hero-wrap {
  background: #FFFFFF;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  position: relative;
}

/* soft grain overlay */
.hero-wrap::before {
  content:'';
  position:absolute; inset:0; pointer-events:none; z-index:0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  opacity:1;
}

.hero-grid-bg {
  position:absolute; inset:0; pointer-events:none; z-index:0;
  background-image:
    linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
  background-size: 56px 56px;
}

.hero-blob1 {
  position:absolute; top:-180px; right:-120px; width:640px; height:640px;
  border-radius:50%;
  background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%);
  pointer-events:none; z-index:0;
  animation: blobDrift1 12s ease-in-out infinite;
}
.hero-blob2 {
  position:absolute; bottom:-100px; left:-60px; width:480px; height:480px;
  border-radius:50%;
  background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%);
  pointer-events:none; z-index:0;
  animation: blobDrift2 15s ease-in-out infinite;
}
@keyframes blobDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,20px)} }
@keyframes blobDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }

.hero-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 96px 48px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  position: relative; z-index: 1;
}

.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(37,99,235,0.07);
  border: 1.5px solid rgba(37,99,235,0.18);
  color: #2563EB;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 6px 16px; border-radius: var(--radius-pill);
  margin-bottom: 28px;
  animation: fadeDown 0.5s ease both;
}
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #2563EB;
  animation: pulseGlow 2s infinite;
}
@keyframes pulseGlow { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(37,99,235,0.4)} 50%{opacity:0.7;box-shadow:0 0 0 5px rgba(37,99,235,0)} }

.hero-h1 {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(38px, 5vw, 68px);
  line-height: 1.08;
  letter-spacing: -0.5px;
  color: var(--ink);
  margin-bottom: 22px;
  animation: fadeDown 0.6s 0.1s ease both;
}
.hero-h1 em {
  font-style: italic;
  color: #2563EB;
  position: relative;
}

/* Animated underline from user's snippet */
.yt-underline {
  position: relative;
  display: inline-block;
}
.yt-underline::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  height: 3px; width: 0;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  border-radius: 2px;
  animation: ytUnderline 1s cubic-bezier(0.22,1,0.36,1) 0.8s forwards;
}
@keyframes ytUnderline { to { width: 100%; } }

.hero-sub {
  font-size: 1rem; color: var(--ink-mid);
  line-height: 1.8; max-width: 480px;
  margin-bottom: 36px;
  animation: fadeDown 0.6s 0.2s ease both;
  font-weight: 400;
}

.hero-cta-row {
  display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  margin-bottom: 44px;
  animation: fadeDown 0.6s 0.3s ease both;
}

.btn-primary {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 14px 28px; border-radius: 13px; border: none;
  background: linear-gradient(135deg, #2563EB, #4338CA);
  color: #fff; font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem; font-weight: 700; cursor: pointer;
  box-shadow: var(--shadow-blue);
  transition: all 0.25s cubic-bezier(.2,.8,.3,1);
  position: relative; overflow: hidden;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(37,99,235,0.38); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; border-radius: 13px;
  border: 1.5px solid var(--border-mid);
  background: transparent;
  color: var(--ink-mid); font-size: 0.88rem; font-weight: 600;
  cursor: pointer; transition: all .2s;
}
.btn-outline:hover { border-color: #2563EB; color: #2563EB; background: rgba(37,99,235,0.04); }

/* Hero trust strip */
.hero-trust {
  display: flex; align-items: center; gap: 20px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
  animation: fadeDown 0.6s 0.4s ease both;
  flex-wrap: wrap;
}
.trust-avatars { display: flex; }
.trust-avatars img {
  width: 34px; height: 34px; border-radius: 50%;
  border: 2px solid #fff; margin-left: -8px; object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.trust-avatars img:first-child { margin-left: 0; }
.trust-divider { width: 1px; height: 28px; background: var(--border-mid); }
.trust-num { font-family: 'Instrument Serif', serif; font-size: 1.1rem; color: var(--ink); }
.trust-label { font-size: 0.68rem; color: var(--ink-faint); letter-spacing: 0.3px; margin-top: 1px; }

/* RIGHT PANEL — featured card */
.yt-featured {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.9);
  box-shadow: 0 8px 40px rgba(37,99,235,0.1), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9);
  transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
  animation: featuredIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both;
}
.yt-featured:hover {
  box-shadow: 0 24px 64px rgba(37,99,235,0.16), 0 4px 16px rgba(0,0,0,0.06);
  transform: translateY(-6px);
}
@keyframes featuredIn { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

.featured-thumb {
  position: relative; height: 220px; overflow: hidden;
}
.featured-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s ease;
}
.yt-featured:hover .featured-thumb img { transform: scale(1.04); }
.featured-thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(255,255,255,0.6) 0%, transparent 60%);
}
.featured-live-chip {
  position: absolute; top: 14px; left: 14px;
  display: flex; align-items: center; gap: 5px;
  background: rgba(239,68,68,0.9); backdrop-filter: blur(6px);
  padding: 5px 11px; border-radius: var(--radius-pill);
  font-size: 0.62rem; font-weight: 800; color: #fff; letter-spacing: 0.5px;
}
.featured-off-chip {
  position: absolute; top: 14px; right: 14px;
  background: linear-gradient(135deg, #2563EB, #4338CA);
  padding: 5px 11px; border-radius: 8px;
  font-size: 0.65rem; font-weight: 800; color: #fff;
  box-shadow: 0 4px 12px rgba(37,99,235,0.35);
}
.featured-body { padding: 20px 22px 22px; }
.featured-cat {
  display: inline-block;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 4px 11px; border-radius: 6px; margin-bottom: 10px;
}
.featured-title {
  font-family: 'Instrument Serif', serif;
  font-size: 1.2rem; color: var(--ink); line-height: 1.3; margin-bottom: 14px;
}
.featured-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; flex-wrap: wrap; }
.featured-meta-item { display: flex; align-items: center; gap: 5px; font-size: 0.75rem; color: var(--ink-light); }
.featured-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }
.featured-price-orig { font-size: 0.72rem; color: var(--ink-faint); text-decoration: line-through; }
.featured-price { font-family: 'Instrument Serif', serif; font-size: 1.6rem; color: var(--ink); line-height: 1; }
.featured-save { font-size: 0.68rem; color: var(--accent-emerald); font-weight: 700; margin-top: 2px; }

/* small float cards below featured */
.hero-float-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
.hero-stat-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 16px; padding: 16px 18px;
  box-shadow: var(--shadow-card);
  display: flex; align-items: center; gap: 12px;
  animation: featuredIn 0.8s cubic-bezier(0.22,1,0.36,1) both;
}
.hero-stat-icon {
  width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.hero-stat-num {
  font-family: 'Instrument Serif', serif; font-size: 1.3rem; color: var(--ink); line-height: 1;
}
.hero-stat-label { font-size: 0.68rem; color: var(--ink-faint); margin-top: 2px; }

/* ── MARQUEE ── */
.marquee-section {
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  padding: 18px 0; overflow: hidden;
}
.marquee-track {
  display: flex; gap: 56px; width: max-content;
  animation: marqueeScroll 28s linear infinite;
}
@keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.marquee-item {
  display: flex; align-items: center; gap: 9px;
  white-space: nowrap; font-size: 0.76rem; font-weight: 600;
  color: var(--ink-light); letter-spacing: 0.3px;
}
.marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: #2563EB; }

/* ── STATS STRIP ── */
.stats-section { background: #fff; border-bottom: 1px solid var(--border); }
.stats-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4,1fr);
}
.stat-item {
  display: flex; flex-direction: column; align-items: center;
  padding: 36px 24px; text-align: center;
  border-right: 1px solid var(--border);
  transition: background .25s;
  cursor: default;
}
.stat-item:last-child { border-right: none; }
.stat-item:hover { background: rgba(37,99,235,0.03); }
.stat-icon-ring {
  width: 48px; height: 48px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
}
.stat-num {
  font-family: 'Instrument Serif', serif; font-size: 2rem; color: var(--ink); line-height: 1;
}
.stat-label { font-size: 0.73rem; color: var(--ink-faint); margin-top: 6px; letter-spacing: 0.3px; }

/* ── SECTION COMMON ── */
.page-max { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.section-pad { padding-top: 72px; padding-bottom: 64px; }

.section-eyebrow {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: #2563EB;
  margin-bottom: 12px;
}
.eyebrow-line { width: 22px; height: 1.5px; background: #2563EB; border-radius: 2px; }
.section-h2 {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(26px, 3vw, 42px);
  color: var(--ink); margin-bottom: 10px; line-height: 1.15;
}
.section-h2 .accent { color: #2563EB; }
.section-p { font-size: 0.88rem; color: var(--ink-light); line-height: 1.75; max-width: 500px; }

/* ── CATEGORY PILLS ── */
.cat-pills-wrap {
  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
  margin-bottom: 36px; scrollbar-width: none;
}
.cat-pills-wrap::-webkit-scrollbar { display: none; }
.cat-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 18px; border-radius: var(--radius-pill); cursor: pointer;
  font-size: 0.78rem; font-weight: 600; white-space: nowrap;
  border: 1.5px solid var(--border-mid);
  background: #fff; color: var(--ink-light);
  transition: all .2s; flex-shrink: 0;
  box-shadow: var(--shadow-card);
}
.cat-pill:hover { border-color: #2563EB; color: #2563EB; background: rgba(37,99,235,0.04); }
.cat-pill.active {
  background: linear-gradient(135deg, #2563EB, #4338CA);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 16px rgba(37,99,235,0.3);
}

/* ── WORKSHOP CARD ── */
.ws-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
.ws-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-card); overflow: hidden;
  cursor: pointer; display: flex; flex-direction: column;
  transition: all .3s cubic-bezier(.2,.8,.3,1);
  box-shadow: var(--shadow-card);
}
.ws-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(37,99,235,0.18);
}

.ws-thumb { position: relative; height: 210px; overflow: hidden; }
.ws-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .6s ease; filter: brightness(0.92);
}
.ws-card:hover .ws-thumb img { transform: scale(1.05); filter: brightness(1); }
.ws-thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 60%);
}
.ws-cat-badge {
  position: absolute; top: 12px; left: 12px;
  padding: 4px 11px; border-radius: 7px;
  font-size: 0.62rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
}
.ws-bm-btn {
  position: absolute; top: 12px; right: 12px;
  width: 32px; height: 32px; border-radius: 9px;
  background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.8); color: var(--ink-light);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.ws-bm-btn:hover { background: #fff; color: #2563EB; }
.ws-live-chip {
  position: absolute; bottom: 12px; left: 12px;
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(239,68,68,0.9); backdrop-filter: blur(6px);
  padding: 4px 10px; border-radius: var(--radius-pill);
  font-size: 0.6rem; font-weight: 800; color: #fff; letter-spacing: 0.5px;
}
.ws-off-chip {
  position: absolute; bottom: 12px; right: 12px;
  background: linear-gradient(135deg, #2563EB, #4338CA);
  padding: 4px 9px; border-radius: 7px;
  font-size: 0.62rem; font-weight: 800; color: #fff;
  box-shadow: 0 3px 10px rgba(37,99,235,0.3);
}

.ws-body { padding: 18px 20px 20px; display: flex; flex-direction: column; flex: 1; }
.ws-trainer-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.ws-trainer-avatar {
  width: 30px; height: 30px; border-radius: 50%; object-fit: cover;
  border: 2px solid rgba(37,99,235,0.2); box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.ws-trainer-name { flex: 1; font-size: 0.76rem; font-weight: 600; color: var(--ink-mid); }
.ws-stars { display: flex; align-items: center; gap: 3px; }
.ws-stars-num { font-size: 0.75rem; font-weight: 800; color: var(--ink); }
.ws-stars-count { font-size: 0.7rem; color: var(--ink-faint); }
.ws-title {
  font-family: 'Instrument Serif', serif;
  font-size: 1.05rem; color: var(--ink); line-height: 1.35;
  margin-bottom: 8px; transition: color .2s;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.ws-card:hover .ws-title { color: #2563EB; }
.ws-desc {
  font-size: 0.75rem; color: var(--ink-light); line-height: 1.65;
  margin-bottom: 14px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.ws-meta { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
.ws-meta-row { display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: var(--ink-light); }
.ws-meta-row svg { color: #2563EB; flex-shrink: 0; }
.ws-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 14px; }
.ws-tag {
  padding: 3px 9px; border-radius: 6px; font-size: 0.63rem; font-weight: 700;
  background: rgba(37,99,235,0.07); color: #2563EB;
  border: 1px solid rgba(37,99,235,0.15); letter-spacing: 0.3px;
}
.ws-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 14px; border-top: 1px solid var(--border); margin-top: auto;
}
.ws-price-orig { font-size: 0.7rem; color: var(--ink-faint); text-decoration: line-through; }
.ws-price-disc {
  font-family: 'Instrument Serif', serif; font-size: 1.4rem; color: var(--ink); line-height: 1;
}
.ws-price-save { font-size: 0.65rem; color: var(--accent-emerald); font-weight: 700; margin-top: 2px; display: flex; align-items: center; gap: 3px; }
.ws-enroll-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 17px; border-radius: 11px;
  background: linear-gradient(135deg, #2563EB, #4338CA);
  color: #fff; font-size: 0.75rem; font-weight: 700;
  border: none; cursor: pointer; transition: all .2s;
  box-shadow: 0 4px 14px rgba(37,99,235,0.3);
}
.ws-enroll-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(37,99,235,0.42); }

.ws-card.featured { border-color: rgba(245,158,11,0.25); box-shadow: 0 4px 16px rgba(245,158,11,0.1), var(--shadow-card); }
.ws-card.featured:hover { border-color: rgba(245,158,11,0.4); }

/* ── LOAD MORE ── */
.load-more-wrap { display: flex; justify-content: center; margin-top: 40px; }
.load-more-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 32px; border-radius: 13px;
  border: 1.5px solid var(--border-mid);
  background: #fff; color: var(--ink-mid);
  font-size: 0.86rem; font-weight: 700; cursor: pointer;
  box-shadow: var(--shadow-card); transition: all .2s;
}
.load-more-btn:hover { border-color: #2563EB; color: #2563EB; transform: translateY(-2px); box-shadow: var(--shadow-hover); }

/* ── WHY SECTION ── */
.why-section {
  background: var(--surface-2);
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.why-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 26px 24px;
  position: relative; transition: all .3s;
  box-shadow: var(--shadow-card);
}
.why-card:hover { border-color: rgba(37,99,235,0.2); transform: translateY(-3px); box-shadow: var(--shadow-hover); }
.why-card.big { grid-column: span 2; display: flex; align-items: center; gap: 28px; }
.why-icon-wrap {
  width: 50px; height: 50px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-bottom: 14px;
}
.why-card.big .why-icon-wrap { margin-bottom: 0; }
.why-card-title { font-family: 'Instrument Serif', serif; font-size: 1rem; color: var(--ink); margin-bottom: 7px; }
.why-card-desc { font-size: 0.78rem; color: var(--ink-light); line-height: 1.7; }
.why-card-num {
  position: absolute; top: 18px; right: 20px;
  font-family: 'DM Mono', monospace; font-size: 0.62rem; font-weight: 500;
  color: rgba(37,99,235,0.25); letter-spacing: 1px;
}

/* ── HOW IT WORKS ── */
.how-section { background: #fff; border-bottom: 1px solid var(--border); }
.how-steps {
  display: grid; grid-template-columns: repeat(4,1fr); gap: 2px;
  margin-top: 52px; position: relative;
}
.how-steps::before {
  content:''; position:absolute; top:38px; left:calc(12.5% + 20px); right:calc(12.5% + 20px); height:1px;
  background: repeating-linear-gradient(90deg, rgba(37,99,235,0.25) 0, rgba(37,99,235,0.25) 6px, transparent 6px, transparent 14px);
  pointer-events:none;
}
.how-step {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 0 20px;
}
.how-step-num {
  width: 76px; height: 76px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 22px;
  background: #fff; border: 2px solid rgba(37,99,235,0.18);
  box-shadow: 0 4px 16px rgba(37,99,235,0.1);
  transition: all .3s;
}
.how-step:hover .how-step-num {
  border-color: rgba(37,99,235,0.5);
  box-shadow: 0 8px 24px rgba(37,99,235,0.18);
}
.how-step-num-inner {
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #4338CA);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(37,99,235,0.3);
}
.how-step-label {
  font-family: 'Instrument Serif', serif; font-size: 1rem;
  color: var(--ink); margin-bottom: 9px;
}
.how-step-desc { font-size: 0.77rem; color: var(--ink-light); line-height: 1.7; }

/* ── TESTIMONIALS ── */
.reviews-section {
  background: var(--surface-2);
  border-bottom: 1px solid var(--border); overflow: hidden;
}
.reviews-marquee-wrap { overflow: hidden; margin-top: 44px; }
.reviews-marquee-track {
  display: flex; gap: 18px; width: max-content;
  animation: reviewsScroll 35s linear infinite;
}
@keyframes reviewsScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.review-card {
  width: 290px; flex-shrink: 0;
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 22px;
  box-shadow: var(--shadow-card);
  transition: border-color .3s;
}
.review-card:hover { border-color: rgba(37,99,235,0.2); }
.review-stars { display: flex; gap: 3px; margin-bottom: 11px; }
.review-text {
  font-size: 0.82rem; color: var(--ink-mid); line-height: 1.7;
  margin-bottom: 15px; font-style: italic;
  font-family: 'Instrument Serif', serif; font-size: 0.9rem;
}
.review-author { display: flex; align-items: center; gap: 10px; }
.review-author img {
  width: 34px; height: 34px; border-radius: 50%; object-fit: cover;
  border: 2px solid rgba(37,99,235,0.15);
}
.review-author-name { font-size: 0.8rem; font-weight: 700; color: var(--ink); }
.review-author-role { font-size: 0.7rem; color: var(--ink-faint); }

/* ── CTA SECTION ── */
.cta-section { background: #fff; border-top: 1px solid var(--border); }
.cta-dual-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.cta-card {
  background: var(--surface-2); border: 1.5px solid var(--border);
  border-radius: 20px; padding: 30px 28px;
  display: flex; align-items: flex-start; gap: 18px;
  transition: all .3s;
}
.cta-card:hover { border-color: rgba(37,99,235,0.22); transform: translateY(-3px); box-shadow: var(--shadow-hover); }
.cta-card-icon {
  width: 54px; height: 54px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cta-card-title { font-family: 'Instrument Serif', serif; font-size: 1.1rem; color: var(--ink); margin-bottom: 7px; }
.cta-card-desc { font-size: 0.8rem; color: var(--ink-light); line-height: 1.7; margin-bottom: 18px; }

/* ── DETAIL PAGE ── */
.detail-back-bar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(247,246,242,0.92); backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  padding: 14px 48px; display: flex; align-items: center; gap: 14px;
}
.detail-back-btn {
  display: flex; align-items: center; gap: 7px;
  font-size: 0.84rem; font-weight: 600; color: var(--ink-light);
  background: none; border: none; cursor: pointer; transition: color .2s;
}
.detail-back-btn:hover { color: #2563EB; }

/* ── ANIMATIONS ── */
@keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.anim-up { animation: fadeUp .5s ease both; }

/* ── EMPTY STATE ── */
.empty-state { text-align: center; padding: 90px 20px; }
.empty-emoji { font-size: 3.5rem; margin-bottom: 14px; }
.empty-title { font-family: 'Instrument Serif', serif; font-size: 1.3rem; color: var(--ink); margin-bottom: 8px; }
.empty-sub { font-size: 0.84rem; color: var(--ink-light); margin-bottom: 22px; }

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero-inner { gap: 40px; }
  .ws-grid { grid-template-columns: repeat(2,1fr); }
  .how-steps { grid-template-columns: repeat(2,1fr); }
  .stats-inner { grid-template-columns: repeat(2,1fr); }
  .cta-dual-cards { grid-template-columns: 1fr; }
}
@media(max-width:768px){
  .hero-inner { grid-template-columns: 1fr; padding: 60px 24px 52px; gap: 44px; }
  .page-max { padding: 0 24px; }
  .section-pad { padding-top: 56px; padding-bottom: 48px; }
  .ws-grid { grid-template-columns: 1fr; }
  .how-steps { grid-template-columns: 1fr 1fr; }
  .how-steps::before { display: none; }
  .stats-inner { grid-template-columns: 1fr 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .why-card.big { grid-column: span 1; flex-direction: column; gap: 14px; }
  .detail-back-bar { padding: 14px 24px; }
  .cta-dual-cards { grid-template-columns: 1fr; }
}
@media(max-width:480px){
  .how-steps { grid-template-columns: 1fr; }
  .stats-inner { grid-template-columns: 1fr 1fr; }
  .hero-float-row { grid-template-columns: 1fr 1fr; }
}
`;

/* ─── DATA ──────────────────────────────────────────── */
const CATEGORIES = [
  { id:"all",        label:"All Workshops", icon:Globe },
  { id:"sales",      label:"Sales & Growth", icon:BarChart3 },
  { id:"tech",       label:"Tech & Dev",    icon:Monitor },
  { id:"leadership", label:"Leadership",    icon:Users },
  { id:"softskills", label:"Soft Skills",   icon:Mic },
  { id:"wellness",   label:"Wellness",      icon:Leaf },
  { id:"ai",         label:"AI & ML",       icon:Brain },
];

const CAT_STYLES = {
  sales:      { badge:"#F59E0B", badgeBg:"rgba(245,158,11,0.12)", badgeBorder:"rgba(245,158,11,0.25)", bg:"linear-gradient(135deg,#F59E0B,#EF4444)", glow:"rgba(245,158,11,0.3)" },
  tech:       { badge:"#0891B2", badgeBg:"rgba(6,182,212,0.1)",   badgeBorder:"rgba(6,182,212,0.2)",   bg:"linear-gradient(135deg,#06B6D4,#2563EB)", glow:"rgba(6,182,212,0.3)" },
  leadership: { badge:"#7C3AED", badgeBg:"rgba(124,58,237,0.1)",  badgeBorder:"rgba(124,58,237,0.2)",  bg:"linear-gradient(135deg,#8B5CF6,#7C3AED)", glow:"rgba(124,58,237,0.3)" },
  softskills: { badge:"#DB2777", badgeBg:"rgba(219,39,119,0.08)", badgeBorder:"rgba(219,39,119,0.18)", bg:"linear-gradient(135deg,#EC4899,#DB2777)", glow:"rgba(219,39,119,0.3)" },
  wellness:   { badge:"#059669", badgeBg:"rgba(5,150,105,0.08)",  badgeBorder:"rgba(5,150,105,0.18)",  bg:"linear-gradient(135deg,#10B981,#059669)", glow:"rgba(16,185,129,0.3)" },
  ai:         { badge:"#EA580C", badgeBg:"rgba(234,88,12,0.08)",  badgeBorder:"rgba(234,88,12,0.18)",  bg:"linear-gradient(135deg,#F97316,#EF4444)", glow:"rgba(249,115,22,0.3)" },
};

const WORKSHOPS = [
  { id:1, category:"sales", isLive:true, featured:true, title:"Advanced B2B Sales Mastery", shortDesc:"Master enterprise deal-closing, negotiation tactics, and consultative selling frameworks used by Fortune 500 companies.", fullDesc:"This intensive workshop takes you deep into the world of enterprise B2B selling. You will learn how to map complex stakeholder landscapes, build champions inside client organisations, and close high-value deals using proven consultative frameworks. Topics include multi-threaded pipeline management, SPIN selling, MEDDIC qualification, pricing negotiations, and post-sale expansion strategies.", price:{ original:24999, discounted:14999, emi:"1,250", includes:["Certificate","Workbook","Lifetime Access","1-on-1 Mentoring"] }, duration:"3 Days", seats:42, rating:"4.9", reviews:"1.2k", dateRange:"25 – 27 May 2025", timeSlot:"10:00 AM – 01:00 PM", enrolled:85, tags:["B2B","Negotiation","Pipeline"], coverImg:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=260&fit=crop", label:"Live webinar" },{ src:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=260&fit=crop", label:"Offline session" },{ src:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=260&fit=crop", label:"Team workshop" },{ src:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=260&fit=crop", label:"Mentoring" }], trainer:{ name:"Amit Kumar", role:"Sales Director, Fortune 500", exp:"12+ Yrs", students:"8,400+", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces", certifications:["Sandler Certified","HubSpot Certified"], classTypes:[{ type:"Live Online", count:"48 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"24 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"120+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Workshop", count:"12 batches", icon:Calendar, colorClass:"#D97706", bgClass:"rgba(217,119,6,0.07)", borderClass:"rgba(217,119,6,0.15)" }] } },
  { id:2, category:"tech", isLive:false, featured:false, title:"Full-Stack Web Dev Bootcamp", shortDesc:"Hands-on intensive covering React, Node.js, cloud deployment and three real capstone projects.", fullDesc:"A comprehensive deep-dive into modern full-stack engineering. You will build three production-grade capstone apps from scratch, covering React 18, Next.js, Node.js, PostgreSQL, REST & GraphQL APIs, Docker, and AWS deployment pipelines.", price:{ original:39999, discounted:24999, emi:"2,083", includes:["Certificate","Source Code","Cloud Credits","Job Assist"] }, duration:"5 Days", seats:18, rating:"4.8", reviews:"980", dateRange:"01 – 05 Jun 2025", timeSlot:"09:00 AM – 12:00 PM", enrolled:60, tags:["React","Node.js","AWS"], coverImg:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=260&fit=crop", label:"Coding live" },{ src:"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=260&fit=crop", label:"Group lab" },{ src:"https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=260&fit=crop", label:"Code review" },{ src:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=260&fit=crop", label:"Demo day" }], trainer:{ name:"Sara Reddy", role:"Senior Engineer, Google", exp:"9+ Yrs", students:"6,200+", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces", certifications:["Google Cloud Certified","AWS Associate"], classTypes:[{ type:"Live Online", count:"60 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"18 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"200+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Bootcamp", count:"8 batches", icon:GraduationCap, colorClass:"#0891B2", bgClass:"rgba(8,145,178,0.07)", borderClass:"rgba(8,145,178,0.15)" }] } },
  { id:3, category:"leadership", isLive:false, featured:true, title:"Executive Leadership & Team Building", shortDesc:"Transform your leadership style with frameworks used by top CEOs and McKinsey consultants worldwide.", fullDesc:"Designed for mid-to-senior leaders who want to elevate their impact. Core modules cover psychological safety, OKR goal-setting, navigating conflict, giving high-quality feedback, and executive presence.", price:{ original:19999, discounted:11999, emi:"1,000", includes:["Certificate","Toolkit","Peer Network","Coaching"] }, duration:"2 Days", seats:30, rating:"5.0", reviews:"650", dateRange:"08 – 09 Jun 2025", timeSlot:"11:00 AM – 02:00 PM", enrolled:45, tags:["Leadership","OKRs","Culture"], coverImg:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=260&fit=crop", label:"Live session" },{ src:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=260&fit=crop", label:"Offline class" },{ src:"https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=260&fit=crop", label:"Team exercise" },{ src:"https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=260&fit=crop", label:"Group coaching" }], trainer:{ name:"Maya Joshi", role:"Executive Coach, IIM Faculty", exp:"15+ Yrs", students:"11,000+", avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces", certifications:["ICF PCC Certified","Marshall Goldsmith"], classTypes:[{ type:"Live Online", count:"36 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"20 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"80+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Coaching", count:"15 batches", icon:Award, colorClass:"#D97706", bgClass:"rgba(217,119,6,0.07)", borderClass:"rgba(217,119,6,0.15)" }] } },
  { id:4, category:"ai", isLive:true, featured:true, title:"AI & Machine Learning for Business", shortDesc:"Deploy real AI automations in your business — no PhD needed, just ambition and a laptop.", fullDesc:"No PhD required. Purpose-built for business leaders, product managers, and entrepreneurs who want to harness AI. Covers prompt engineering, GPT-powered automations, no-code ML platforms, and AI-driven analytics dashboards.", price:{ original:29999, discounted:17999, emi:"1,500", includes:["Certificate","AI Tool Suite","Templates","Community"] }, duration:"2 Days", seats:25, rating:"4.9", reviews:"870", dateRange:"15 – 16 Jun 2025", timeSlot:"10:00 AM – 01:00 PM", enrolled:72, tags:["Prompt Eng.","No-Code ML","Automation"], coverImg:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=260&fit=crop", label:"AI webinar" },{ src:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=260&fit=crop", label:"Offline lab" },{ src:"https://images.unsplash.com/photo-1655720406002-3b1c6e6c24fc?w=400&h=260&fit=crop", label:"Model training" },{ src:"https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=260&fit=crop", label:"Demo session" }], trainer:{ name:"Ravi Nair", role:"AI Researcher, IIT Bombay", exp:"10+ Yrs", students:"5,800+", avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces", certifications:["TensorFlow Developer","DeepLearning.AI"], classTypes:[{ type:"Live Online", count:"52 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"16 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"150+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"AI Lab", count:"10 batches", icon:Brain, colorClass:"#EA580C", bgClass:"rgba(234,88,12,0.07)", borderClass:"rgba(234,88,12,0.15)" }] } },
  { id:5, category:"softskills", isLive:false, featured:false, title:"Public Speaking & Communication", shortDesc:"Build vocal presence and storytelling ability to command any stage or boardroom with confidence.", fullDesc:"The most practically intense communication workshop in India. You will be on your feet speaking from day one. Modules cover voice modulation, eliminating filler words, crafting a compelling narrative arc, and owning the room with confident body language.", price:{ original:12999, discounted:7499, emi:"625", includes:["Certificate","Recordings","Feedback","Resources"] }, duration:"1 Day", seats:50, rating:"4.7", reviews:"540", dateRange:"22 Jun 2025", timeSlot:"09:00 AM – 05:00 PM", enrolled:38, tags:["Public Speaking","Storytelling","Presence"], coverImg:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=260&fit=crop", label:"Online talk" },{ src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=260&fit=crop", label:"Stage session" },{ src:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=260&fit=crop", label:"Conference" },{ src:"https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=400&h=260&fit=crop", label:"Live coaching" }], trainer:{ name:"Priya Das", role:"TED Speaker & Coach", exp:"8+ Yrs", students:"14,500+", avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces", certifications:["Toastmasters DTM","NLP Practitioner"], classTypes:[{ type:"Live Online", count:"40 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"22 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"60+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Stage Practice", count:"20 batches", icon:Mic, colorClass:"#DB2777", bgClass:"rgba(219,39,119,0.07)", borderClass:"rgba(219,39,119,0.15)" }] } },
  { id:6, category:"wellness", isLive:false, featured:false, title:"Workplace Mindfulness & Stress Management", shortDesc:"Evidence-based mindfulness toolkit to sharpen focus and build emotional resilience at work.", fullDesc:"Burnout is an epidemic. This workshop gives you a science-backed toolkit to reclaim your mental bandwidth. Drawing from MBSR, CBT principles, and ancient breathwork practices. Corporate teams report a 40% drop in reported stress levels.", price:{ original:9999, discounted:5999, emi:"500", includes:["Certificate","App Access","Check-ins","Journal"] }, duration:"1 Day", seats:60, rating:"4.8", reviews:"430", dateRange:"29 Jun 2025", timeSlot:"10:00 AM – 04:00 PM", enrolled:55, tags:["MBSR","Breathwork","Resilience"], coverImg:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=260&fit=crop", label:"Online session" },{ src:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=260&fit=crop", label:"Yoga class" },{ src:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=260&fit=crop", label:"Breathwork" },{ src:"https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&h=260&fit=crop", label:"Group retreat" }], trainer:{ name:"Ananya Shah", role:"Certified Mindfulness Coach", exp:"11+ Yrs", students:"9,300+", avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces", certifications:["MBSR Certified","Yoga Alliance 500H"], classTypes:[{ type:"Live Online", count:"30 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"15 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"45+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Retreat", count:"6 batches", icon:Leaf, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" }] } },
  { id:7, category:"tech", isLive:false, featured:false, title:"Data Science & Python Analytics", shortDesc:"From raw data to actionable insights — master pandas, visualisation and predictive models.", fullDesc:"A practical, project-led data science workshop. Work with real datasets, applying Python (pandas, NumPy, matplotlib), build regression and classification models with scikit-learn, and create interactive dashboards with Plotly and Streamlit.", price:{ original:18999, discounted:10999, emi:"916", includes:["Certificate","Datasets","Notebooks","Career Guide"] }, duration:"3 Days", seats:35, rating:"4.8", reviews:"320", dateRange:"05 – 07 Jul 2025", timeSlot:"10:00 AM – 01:00 PM", enrolled:48, tags:["Python","Pandas","ML Models"], coverImg:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=260&fit=crop", label:"Data lab" },{ src:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=260&fit=crop", label:"Workshop" },{ src:"https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=260&fit=crop", label:"Dashboard" },{ src:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=260&fit=crop", label:"Analytics" }], trainer:{ name:"Karan Malhotra", role:"Data Lead, Microsoft India", exp:"8+ Yrs", students:"4,100+", avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces", certifications:["Azure Data Scientist","Kaggle Expert"], classTypes:[{ type:"Live Online", count:"40 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"12 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"100+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Data Lab", count:"8 batches", icon:BarChart3, colorClass:"#0891B2", bgClass:"rgba(8,145,178,0.07)", borderClass:"rgba(8,145,178,0.15)" }] } },
  { id:8, category:"leadership", isLive:false, featured:false, title:"Strategic Thinking & Decision Making", shortDesc:"Sharpen your strategic mind with 20+ mental models, frameworks and live case simulations.", fullDesc:"Equips you with the cognitive toolkit to think clearly under pressure. Study and apply 20+ mental models — first principles, inversion, second-order thinking, Bayesian updating — through structured case simulations.", price:{ original:16999, discounted:9999, emi:"833", includes:["Certificate","Mental Models Deck","Cases","Peer Forum"] }, duration:"2 Days", seats:28, rating:"4.9", reviews:"280", dateRange:"12 – 13 Jul 2025", timeSlot:"09:00 AM – 05:00 PM", enrolled:32, tags:["Strategy","Mental Models","Decision Making"], coverImg:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&h=420&fit=crop", photos:[{ src:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=260&fit=crop", label:"Strategy session" },{ src:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=260&fit=crop", label:"Whiteboard" },{ src:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=260&fit=crop", label:"Case study" },{ src:"https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=260&fit=crop", label:"Group work" }], trainer:{ name:"Vikram Bose", role:"Strategy Consultant, Ex-BCG", exp:"13+ Yrs", students:"3,700+", avatar:"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=faces", certifications:["Wharton Strategy","HBS Online"], classTypes:[{ type:"Live Online", count:"24 sessions", icon:Wifi, colorClass:"#2563EB", bgClass:"rgba(37,99,235,0.07)", borderClass:"rgba(37,99,235,0.15)" },{ type:"Offline", count:"10 sessions", icon:MapPin, colorClass:"#059669", bgClass:"rgba(5,150,105,0.07)", borderClass:"rgba(5,150,105,0.15)" },{ type:"Recorded", count:"55+ hrs", icon:Play, colorClass:"#7C3AED", bgClass:"rgba(124,58,237,0.07)", borderClass:"rgba(124,58,237,0.15)" },{ type:"Masterclass", count:"5 batches", icon:Award, colorClass:"#D97706", bgClass:"rgba(217,119,6,0.07)", borderClass:"rgba(217,119,6,0.15)" }] } },
];

const STATS = [
  { icon:Users,     num:"1,200+", label:"Expert Trainers",  color:"#2563EB", bg:"rgba(37,99,235,0.08)"   },
  { icon:BarChart3, num:"320+",   label:"Live Workshops",   color:"#7C3AED", bg:"rgba(124,58,237,0.08)"  },
  { icon:Star,      num:"4.9/5",  label:"Avg. Rating",      color:"#D97706", bg:"rgba(217,119,6,0.08)"   },
  { icon:Globe,     num:"50K+",   label:"Learners Trained", color:"#059669", bg:"rgba(5,150,105,0.08)"   },
];

const HOW_STEPS = [
  { icon:Search,   label:"Browse Workshops",  desc:"Filter by category, date, or budget to find the perfect training for your goals." },
  { icon:BookOpen, label:"Book Your Spot",    desc:"Choose your preferred batch and secure your seat in a few clicks — fully online." },
  { icon:Target,   label:"Learn & Practice",  desc:"Attend live sessions, get workbooks, practice exercises, and peer networking." },
  { icon:Trophy,   label:"Earn Certificate",  desc:"Complete the workshop and walk away with a verified certificate and new skills." },
];

const REVIEWS = [
  { name:"Rahul Sharma", role:"Product Manager, Swiggy", rating:5, text:"The B2B Sales workshop completely changed how I approach client conversations. The frameworks are immediately usable.", avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces" },
  { name:"Sneha Patil", role:"Software Engineer, Infosys", rating:5, text:"Sara's Full-Stack Bootcamp was incredible. Shipped my first SaaS product within 3 weeks of finishing!", avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=faces" },
  { name:"Arjun Mehta", role:"Team Lead, Tata Consultancy", rating:5, text:"Maya's Leadership workshop gave me tools I use every single day. The peer coaching format is brilliant.", avatar:"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=faces" },
  { name:"Divya Nair", role:"Startup Founder, Bengaluru", rating:5, text:"The AI for Business workshop saved me months of figuring things out alone. ROI was immediate.", avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces" },
  { name:"Kunal Singh", role:"Marketing Director, Zomato", rating:5, text:"Priya's public speaking training was transformative. I gave a keynote at a 500-person conference 2 months later.", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
  { name:"Meera Iyer", role:"HR Head, Wipro", rating:5, text:"Ananya's mindfulness workshop reduced our team stress scores by 38%. We're booking a follow-up for the entire division.", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces" },
];

const MARQUEE_ITEMS = ["Sales Mastery","Full-Stack Dev","Executive Leadership","AI & ML","Public Speaking","Mindfulness","Data Science","Strategic Thinking","Team Building","Prompt Engineering","Negotiation","Growth Hacking","Design Thinking","Product Management"];

const WHY_CARDS = [
  { icon:Medal,         color:"#D97706",  bg:"rgba(217,119,6,0.08)",   border:"rgba(217,119,6,0.15)",   title:"Verified Expert Trainers",    desc:"Every trainer is vetted with live reviews, industry credentials, and min 1,000+ students trained." },
  { icon:Zap,           color:"#7C3AED",  bg:"rgba(124,58,237,0.08)",  border:"rgba(124,58,237,0.15)",  title:"Live + Recorded + Offline",   desc:"Flexible formats — join live online, attend offline in your city, or watch recorded replays anytime." },
  { icon:Shield,        color:"#059669",  bg:"rgba(5,150,105,0.08)",   border:"rgba(5,150,105,0.15)",   title:"Money-Back Guarantee",        desc:"Not satisfied within 7 days? Full refund, no questions asked. We stand behind every workshop." },
  { icon:Layers,        color:"#2563EB",  bg:"rgba(37,99,235,0.08)",   border:"rgba(37,99,235,0.15)",   title:"Real-World Curriculum",       desc:"No fluff. Every workshop is built around practical application, case studies, and live projects." },
  { icon:HeartHandshake,color:"#DB2777",  bg:"rgba(219,39,119,0.08)",  border:"rgba(219,39,119,0.15)",  title:"Community & Network",         desc:"Join a private cohort of 50K+ professionals. Peer learning, job boards, and lifelong connections.", big:true },
];

const fmt = n => n.toLocaleString("en-IN");
const disc = (o, d) => Math.round(((o - d) / o) * 100);

/* ─── FEATURED HERO CARD ─────────────────────────────── */
function HeroFeaturedCard({ w, onClick }) {
  const cs = CAT_STYLES[w.category] || CAT_STYLES.sales;
  const pct = disc(w.price.original, w.price.discounted);
  return (
    <div className="yt-featured" onClick={onClick} style={{cursor:"pointer"}}>
      <div className="featured-thumb">
        <img src={w.coverImg} alt={w.title} />
        <div className="featured-thumb-overlay"/>
        {w.isLive && (
          <div className="featured-live-chip">
            <span style={{width:5,height:5,borderRadius:"50%",background:"#fff",display:"inline-block"}}/>
            LIVE NOW
          </div>
        )}
        <div className="featured-off-chip">{pct}% OFF</div>
      </div>
      <div className="featured-body">
        <div className="featured-cat" style={{background:cs.badgeBg,color:cs.badge,border:`1px solid ${cs.badgeBorder}`}}>
          {CATEGORIES.find(c=>c.id===w.category)?.label}
        </div>
        <div className="featured-title">{w.title}</div>
        <div className="featured-meta">
          <span className="featured-meta-item"><Star size={12} fill="#F59E0B" color="#F59E0B"/>{w.rating} ({w.reviews})</span>
          <span className="featured-meta-item"><Clock size={12}/>{w.duration}</span>
          <span className="featured-meta-item"><Users size={12}/>{w.enrolled}+ enrolled</span>
        </div>
        <div className="featured-footer">
          <div>
            <div className="featured-price-orig">₹{fmt(w.price.original)}</div>
            <div className="featured-price">₹{fmt(w.price.discounted)}</div>
            <div className="featured-save">Save ₹{fmt(w.price.original-w.price.discounted)}</div>
          </div>
          <button className="btn-primary" style={{padding:"10px 18px",fontSize:"0.8rem"}} onClick={e=>{e.stopPropagation();onClick();}}>
            View Details <ArrowRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── WORKSHOP CARD ─────────────────────────────────── */
function WorkshopCard({ w, onView, delay = 0 }) {
  const cs = CAT_STYLES[w.category] || CAT_STYLES.sales;
  const catLabel = CATEGORIES.find(c => c.id === w.category)?.label || w.category;
  const pct = disc(w.price.original, w.price.discounted);

  return (
    <div className={`ws-card anim-up${w.featured ? " featured" : ""}`}
      style={{ animationDelay:`${delay}ms` }} onClick={onView}>

      <div className="ws-thumb">
        <img src={w.coverImg} alt={w.title} loading="lazy" />
        <div className="ws-thumb-overlay" />
        <span className="ws-cat-badge" style={{background:cs.badgeBg, color:cs.badge, border:`1px solid ${cs.badgeBorder}`}}>
          {catLabel}
        </span>
        <button className="ws-bm-btn" onClick={e => e.stopPropagation()}>
          <Bookmark size={12} />
        </button>
        {w.isLive && (
          <div className="ws-live-chip">
            <span style={{width:5,height:5,borderRadius:"50%",background:"#fff",display:"inline-block"}}/>
            LIVE NOW
          </div>
        )}
        <div className="ws-off-chip">{pct}% OFF</div>
      </div>

      <div className="ws-body">
        <div className="ws-trainer-row">
          <img src={w.trainer.avatar} alt={w.trainer.name} className="ws-trainer-avatar" />
          <span className="ws-trainer-name">{w.trainer.name}</span>
          <div className="ws-stars">
            <Star size={11} fill="#F59E0B" color="#F59E0B" />
            <span className="ws-stars-num"> {w.rating}</span>
            <span className="ws-stars-count"> ({w.reviews})</span>
          </div>
        </div>

        <h3 className="ws-title">{w.title}</h3>
        <p className="ws-desc">{w.shortDesc}</p>

        <div className="ws-meta">
          <div className="ws-meta-row"><Calendar size={12} />{w.dateRange}</div>
          <div className="ws-meta-row"><Clock size={12} />{w.timeSlot} · {w.duration}</div>
          <div className="ws-meta-row"><Users size={12} />+{w.enrolled} already enrolled</div>
        </div>

        <div className="ws-tags">
          {w.tags.map(t => <span key={t} className="ws-tag">{t}</span>)}
        </div>

        <div className="ws-footer">
          <div>
            <div className="ws-price-orig">₹{fmt(w.price.original)}</div>
            <div className="ws-price-disc">{w.price.discounted.toLocaleString("en-IN")}</div>
            <div className="ws-price-save"><Zap size={9} color="currentColor"/>Save ₹{fmt(w.price.original - w.price.discounted)}</div>
          </div>
          <button className="ws-enroll-btn" onClick={e => { e.stopPropagation(); onView(); }}>
            View Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL PAGE ───────────────────────────────────── */
function WorkshopDetail({ w, onBack }) {
  const cs = CAT_STYLES[w.category] || CAT_STYLES.sales;
  const catLabel = CATEGORIES.find(c => c.id === w.category)?.label || w.category;
  const pct = disc(w.price.original, w.price.discounted);

  return (
    <div style={{background:"#F7F6F2", minHeight:"100vh", color:"var(--ink)"}}>
      <div className="detail-back-bar">
        <button className="detail-back-btn" onClick={onBack}>
          <ArrowLeft size={14}/> Back to Workshops
        </button>
        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:"0.66rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",padding:"4px 12px",borderRadius:"999px",background:cs.badgeBg,color:cs.badge,border:`1px solid ${cs.badgeBorder}`}}>{catLabel}</span>
          {w.isLive && <span style={{display:"flex",alignItems:"center",gap:5,fontSize:"0.66rem",fontWeight:700,background:"rgba(239,68,68,0.1)",color:"#DC2626",padding:"4px 10px",borderRadius:"999px",border:"1px solid rgba(239,68,68,0.25)"}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:"#DC2626",display:"inline-block"}}/>LIVE
          </span>}
        </div>
      </div>

      <div style={{position:"relative",height:360,overflow:"hidden"}}>
        <img src={w.coverImg} alt={w.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.65)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(247,246,242,0.95) 0%, rgba(247,246,242,0.4) 50%, transparent 100%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"36px 56px"}}>
          <h1 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(22px,3vw,40px)",color:"#0F172A",lineHeight:1.15,maxWidth:760,marginBottom:14}}>{w.title}</h1>
          <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
            <span style={{display:"flex",alignItems:"center",gap:5,color:"#D97706",fontWeight:700,fontSize:"0.86rem"}}><Star size={13} fill="currentColor"/>{w.rating}<span style={{color:"var(--ink-light)",fontWeight:400}}>({w.reviews})</span></span>
            <span style={{color:"var(--ink-mid)",fontSize:"0.82rem",display:"flex",alignItems:"center",gap:5}}><Clock size={12}/>{w.duration}</span>
            <span style={{color:"var(--ink-mid)",fontSize:"0.82rem",display:"flex",alignItems:"center",gap:5}}><Users size={12}/>{w.trainer.students} students</span>
            <span style={{color:"#DC2626",fontSize:"0.82rem",fontWeight:600,display:"flex",alignItems:"center",gap:5}}><Flame size={12}/>Only {w.seats} seats left</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"36px 48px 80px",display:"grid",gridTemplateColumns:"1fr 340px",gap:28}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:18,padding:"24px 26px",boxShadow:"var(--shadow-card)"}}>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontWeight:400,fontSize:"1.1rem",color:"var(--ink)",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
              <span style={{width:3,height:20,background:"linear-gradient(#2563EB,#7C3AED)",borderRadius:3,display:"inline-block"}}/>About This Workshop
            </h2>
            <p style={{fontSize:"0.87rem",color:"var(--ink-mid)",lineHeight:1.8}}>{w.fullDesc}</p>
          </div>

          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:18,padding:"24px 26px",boxShadow:"var(--shadow-card)"}}>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontWeight:400,fontSize:"1.1rem",color:"var(--ink)",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
              <span style={{width:3,height:20,background:"linear-gradient(#7C3AED,#DB2777)",borderRadius:3,display:"inline-block"}}/>Topics Covered
            </h2>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {w.tags.map(t=><span key={t} style={{padding:"7px 16px",borderRadius:"999px",fontSize:"0.8rem",fontWeight:700,background:cs.badgeBg,color:cs.badge,border:`1px solid ${cs.badgeBorder}`}}>{t}</span>)}
            </div>
          </div>

          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:18,padding:"24px 26px",boxShadow:"var(--shadow-card)"}}>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontWeight:400,fontSize:"1.1rem",color:"var(--ink)",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
              <Camera size={15} color="var(--ink-light)"/>Session Snapshots
            </h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {w.photos.map((p,i)=>(
                <div key={i} style={{position:"relative",borderRadius:12,overflow:"hidden"}}>
                  <img src={p.src} alt={p.label} style={{width:"100%",height:168,objectFit:"cover"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,23,42,0.5),transparent)"}}/>
                  <span style={{position:"absolute",bottom:8,left:10,color:"#fff",fontSize:"0.7rem",fontWeight:600,background:"rgba(15,23,42,0.6)",backdropFilter:"blur(6px)",padding:"3px 9px",borderRadius:6}}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:18,padding:"24px 26px",boxShadow:"var(--shadow-card)"}}>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontWeight:400,fontSize:"1.1rem",color:"var(--ink)",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
              <span style={{width:3,height:20,background:"linear-gradient(#059669,#0891B2)",borderRadius:3,display:"inline-block"}}/>How It's Conducted
            </h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
              {w.trainer.classTypes.map((cls,i)=>{const Icon=cls.icon;return(
                <div key={i} style={{textAlign:"center",padding:"16px 10px",borderRadius:13,background:cls.bgClass,border:`1.5px solid ${cls.borderClass}`}}>
                  <Icon size={20} style={{color:cls.colorClass}}/>
                  <div style={{fontSize:"0.72rem",fontWeight:700,marginTop:8,color:cls.colorClass}}>{cls.type}</div>
                  <div style={{fontSize:"0.63rem",color:"var(--ink-faint)",marginTop:3}}>{cls.count}</div>
                </div>
              );})}
            </div>
          </div>

          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:18,padding:"24px 26px",boxShadow:"var(--shadow-card)"}}>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontWeight:400,fontSize:"1.1rem",color:"var(--ink)",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
              <CheckCircle2 size={16} color="#059669"/>What's Included
            </h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {w.price.includes.map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"11px 14px",borderRadius:11,background:"rgba(5,150,105,0.06)",border:"1px solid rgba(5,150,105,0.15)"}}>
                  <CheckCircle2 size={13} color="#059669" style={{flexShrink:0}}/>
                  <span style={{fontSize:"0.82rem",fontWeight:600,color:"#065F46"}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:18,padding:"20px",boxShadow:"var(--shadow-card)"}}>
            <div style={{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"var(--ink-faint)",marginBottom:14}}>Your Trainer</div>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
              <div style={{position:"relative",flexShrink:0}}>
                <img src={w.trainer.avatar} alt={w.trainer.name} style={{width:50,height:50,borderRadius:13,objectFit:"cover",border:"2px solid rgba(37,99,235,0.15)",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}/>
                <div style={{position:"absolute",bottom:-3,right:-3,width:17,height:17,background:"#2563EB",borderRadius:"50%",border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <BadgeCheck size={9} color="#fff"/>
                </div>
              </div>
              <div>
                <div style={{fontFamily:"'Instrument Serif',serif",fontSize:"0.95rem",color:"var(--ink)"}}>{w.trainer.name}</div>
                <div style={{fontSize:"0.73rem",color:"var(--ink-light)",marginTop:2}}>{w.trainer.role}</div>
                <div style={{fontSize:"0.7rem",color:"#2563EB",fontWeight:600,display:"flex",alignItems:"center",gap:4,marginTop:3}}><Award size={10}/>{w.trainer.exp} experience</div>
              </div>
            </div>
            <div style={{background:"rgba(37,99,235,0.05)",border:"1px solid rgba(37,99,235,0.12)",borderRadius:10,padding:"9px 13px",display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <Users size={13} color="#2563EB"/>
              <span style={{fontSize:"0.88rem",fontWeight:700,color:"#2563EB",fontFamily:"'Instrument Serif',serif"}}>{w.trainer.students}</span>
              <span style={{fontSize:"0.72rem",color:"var(--ink-light)"}}>students trained</span>
            </div>
            <div style={{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"var(--ink-faint)",marginBottom:8}}>Certifications</div>
            {w.trainer.certifications.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:9,background:"rgba(37,99,235,0.05)",border:"1px solid rgba(37,99,235,0.12)",fontSize:"0.77rem",fontWeight:600,color:"#2563EB",marginBottom:6}}>
                <BadgeCheck size={11} color="#4338CA" style={{flexShrink:0}}/>{c}
              </div>
            ))}
          </div>

          <div style={{background:"#fff",border:`2px solid ${cs.badgeBorder}`,borderRadius:18,padding:"22px",boxShadow:"var(--shadow-card)",position:"sticky",top:80}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{background:"rgba(5,150,105,0.1)",color:"#059669",border:"1px solid rgba(5,150,105,0.2)",fontSize:"0.62rem",fontWeight:800,padding:"3px 9px",borderRadius:6,letterSpacing:"0.5px"}}>{pct}% OFF</span>
              <span style={{fontSize:"0.78rem",color:"var(--ink-faint)",textDecoration:"line-through"}}>₹{fmt(w.price.original)}</span>
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:3,marginBottom:4}}>
              <span style={{fontSize:"0.9rem",color:"var(--ink-mid)",fontWeight:500}}>₹</span>
              <span style={{fontFamily:"'Instrument Serif',serif",fontSize:"2.4rem",color:"var(--ink)",letterSpacing:"-1px"}}>{fmt(w.price.discounted)}</span>
              <span style={{fontSize:"0.74rem",color:"#059669",fontWeight:700,marginLeft:6}}>Save ₹{fmt(w.price.original-w.price.discounted)}</span>
            </div>
            <div style={{fontSize:"0.72rem",color:"var(--ink-faint)",display:"flex",alignItems:"center",gap:4,marginBottom:20}}>
              <Zap size={10} color="#7C3AED"/>₹{w.price.emi}/mo × 12 at 0% interest
            </div>
            <button style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",borderRadius:13,border:"none",background:cs.bg,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"0.92rem",cursor:"pointer",marginBottom:9,boxShadow:`0 6px 24px ${cs.glow}`,transition:"all .2s"}}>
              Enroll Now <ArrowRight size={14}/>
            </button>
            <button style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"12px",borderRadius:13,border:"1.5px solid var(--border-mid)",background:"transparent",color:"var(--ink-mid)",fontSize:"0.83rem",fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
              View Schedule <ChevronRight size={12}/>
            </button>
            <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid var(--border)"}}>
              {w.price.includes.map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:"0.77rem",color:"var(--ink-light)",marginBottom:7}}>
                  <CheckCircle2 size={12} color="#059669" style={{flexShrink:0}}/>{item}
                </div>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.74rem",color:"#DC2626",fontWeight:600,marginTop:12}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#EF4444",display:"inline-block"}}/>
              Only {w.seats} seats — filling fast!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function WorkshopsPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [selected, setSelected]   = useState(null);
  const [visible, setVisible]     = useState(6);

  if (selected) return <WorkshopDetail w={selected} onBack={() => setSelected(null)} />;

  const filtered = WORKSHOPS.filter(w => activeCat === "all" || w.category === activeCat);
  const shown    = filtered.slice(0, visible);
  const hasMore  = visible < filtered.length;
  const featuredW = WORKSHOPS.find(w => w.featured && w.isLive) || WORKSHOPS[0];

  return (
    <>
      <style>{S}</style>
      <div style={{background:"#F7F6F2", minHeight:"100vh"}}>

        {/* ── HERO ── */}
        <section className="hero-wrap">
          <div className="hero-grid-bg"/>
          <div className="hero-blob1"/>
          <div className="hero-blob2"/>

          <div className="hero-inner">
            {/* LEFT */}
            <div>
              <div className="hero-eyebrow">
                <span className="eyebrow-dot"/>
                India's #1 Training Platform
              </div>

              <h1 className="hero-h1">
                Workshops That Build<br/>
                <em className="yt-underline">Real Skills</em> &<br/>
                Real Results
              </h1>

              <p className="hero-sub">
                Join live training sessions from verified expert trainers. Practical, immersive, and designed for professionals who want to grow fast.
              </p>

              <div className="hero-cta-row">
                <button className="btn-primary"
                  onClick={() => document.getElementById("ws-section")?.scrollIntoView({behavior:"smooth"})}>
                  Explore Workshops <ArrowRight size={15}/>
                </button>
                <button className="btn-outline">
                  <Play size={13}/>Watch Demo
                </button>
              </div>

              <div className="hero-trust">
                <div className="trust-avatars">
                  {["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80","https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80","https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80"].map((s,i)=><img key={i} src={s} alt=""/>)}
                </div>
                <div>
                  <div className="trust-num">50,000+</div>
                  <div className="trust-label">Professionals Trained</div>
                </div>
                <div className="trust-divider"/>
                <div>
                  <div className="trust-num" style={{color:"#D97706"}}>4.9 ★</div>
                  <div className="trust-label">Average Rating</div>
                </div>
                <div className="trust-divider"/>
                <div>
                  <div className="trust-num">320+</div>
                  <div className="trust-label">Live Workshops</div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <HeroFeaturedCard w={featuredW} onClick={() => setSelected(featuredW)}/>
              <div className="hero-float-row">
                {[
                  {icon:Users, color:"#2563EB", bg:"rgba(37,99,235,0.08)", num:"1,200+", label:"Expert Trainers", delay:"0.45s"},
                  {icon:Trophy, color:"#D97706", bg:"rgba(217,119,6,0.08)", num:"96%", label:"Completion Rate", delay:"0.5s"},
                  {icon:Zap, color:"#7C3AED", bg:"rgba(124,58,237,0.08)", num:"₹0", label:"0% EMI Available", delay:"0.55s"},
                  {icon:Medal, color:"#059669", bg:"rgba(5,150,105,0.08)", num:"18", label:"Sessions Today", delay:"0.6s"},
                ].map((s,i)=>{
                  const Icon = s.icon;
                  return (
                    <div key={i} className="hero-stat-card" style={{animationDelay:s.delay}}>
                      <div className="hero-stat-icon" style={{background:s.bg}}>
                        <Icon size={18} color={s.color}/>
                      </div>
                      <div>
                        <div className="hero-stat-num">{s.num}</div>
                        <div className="hero-stat-label">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-section">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i)=>(
              <div key={i} className="marquee-item">
                <span className="marquee-dot"/>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="stats-section">
          <div className="stats-inner">
            {STATS.map((s,i)=>{
              const Icon=s.icon;
              return (
                <div key={i} className="stat-item">
                  <div className="stat-icon-ring" style={{background:s.bg}}>
                    <Icon size={20} style={{color:s.color}}/>
                  </div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── WORKSHOPS GRID ── */}
        <div id="ws-section" className="page-max section-pad">
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:16}}>
            <div>
              <div className="section-eyebrow"><span className="eyebrow-line"/>Training Workshops</div>
              <h2 className="section-h2">Popular <span className="accent">Workshops</span></h2>
              <p className="section-p">Handpicked by experts. Built for real results. Choose your path and start growing today.</p>
            </div>
            <button style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.84rem",fontWeight:700,color:"#2563EB",background:"none",border:"none",cursor:"pointer"}}>
              View All <ArrowRight size={13}/>
            </button>
          </div>

          <div className="cat-pills-wrap" style={{marginTop:28}}>
            {CATEGORIES.map(cat=>{
              const Icon=cat.icon;
              return (
                <button key={cat.id} className={`cat-pill${activeCat===cat.id?" active":""}`}
                  onClick={()=>{setActiveCat(cat.id);setVisible(6);}}>
                  <Icon size={12}/>{cat.label}
                </button>
              );
            })}
          </div>

          {shown.length > 0 ? (
            <>
              <div className="ws-grid">
                {shown.map((w,i)=>(
                  <WorkshopCard key={w.id} w={w} onView={()=>setSelected(w)} delay={i*60}/>
                ))}
              </div>
              {filtered.length > 6 && (
                <div className="load-more-wrap">
                  <button className="load-more-btn" onClick={()=>hasMore?setVisible(v=>v+3):setVisible(6)}>
                    {hasMore?<><span>Load More Workshops</span><ChevronDown size={14}/></> : <><span>Show Less</span><ChevronUp size={14}/></>}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-emoji">🔍</div>
              <h3 className="empty-title">No workshops in this category yet</h3>
              <p className="empty-sub">Try a different category to explore more workshops.</p>
              <button onClick={()=>{setActiveCat("all");setVisible(6);}} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 24px",borderRadius:11,background:"linear-gradient(135deg,#2563EB,#4338CA)",color:"#fff",fontWeight:700,fontSize:"0.84rem",border:"none",cursor:"pointer"}}>
                View All <X size={12}/>
              </button>
            </div>
          )}
        </div>

        {/* ── WHY SECTION ── */}
        <div className="why-section">
          <div className="page-max section-pad">
            <div style={{textAlign:"center",marginBottom:44}}>
              <div className="section-eyebrow" style={{justifyContent:"center"}}><span className="eyebrow-line"/>Why TopTrainer<span className="eyebrow-line"/></div>
              <h2 className="section-h2" style={{textAlign:"center"}}>Everything You Need to <span className="accent">Level Up</span></h2>
              <p className="section-p" style={{margin:"0 auto",textAlign:"center"}}>We built TopTrainer because learners deserve more than pre-recorded videos. Real trainers. Real practice. Real results.</p>
            </div>
            <div className="why-grid">
              {WHY_CARDS.map((card,i)=>{
                const Icon=card.icon;
                return (
                  <div key={i} className={`why-card${card.big?" big":""}`}>
                    <span className="why-card-num">0{i+1}</span>
                    <div className="why-icon-wrap" style={{background:card.bg,border:`1px solid ${card.border}`}}>
                      <Icon size={22} style={{color:card.color}}/>
                    </div>
                    <div>
                      <div className="why-card-title">{card.title}</div>
                      <div className="why-card-desc">{card.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="how-section">
          <div className="page-max section-pad">
            <div style={{textAlign:"center"}}>
              <div className="section-eyebrow" style={{justifyContent:"center"}}><span className="eyebrow-line"/>How It Works<span className="eyebrow-line"/></div>
              <h2 className="section-h2" style={{textAlign:"center"}}>From <span className="accent">Discovery</span> to Certificate</h2>
              <p className="section-p" style={{margin:"0 auto",textAlign:"center"}}>Four simple steps to unlock your next skill level.</p>
            </div>
            <div className="how-steps">
              {HOW_STEPS.map((step,i)=>{
                const Icon=step.icon;
                return (
                  <div key={i} className="how-step">
                    <div className="how-step-num">
                      <div className="how-step-num-inner"><Icon size={20} color="#fff"/></div>
                    </div>
                    <div className="how-step-label">{step.label}</div>
                    <div className="how-step-desc">{step.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── REVIEWS ── */}
        <div className="reviews-section">
          <div className="page-max" style={{paddingTop:72,paddingBottom:8}}>
            <div style={{textAlign:"center"}}>
              <div className="section-eyebrow" style={{justifyContent:"center"}}><span className="eyebrow-line"/>Reviews<span className="eyebrow-line"/></div>
              <h2 className="section-h2" style={{textAlign:"center"}}>Learners <span className="accent">Love</span> TopTrainer</h2>
              <p className="section-p" style={{margin:"0 auto",textAlign:"center"}}>50,000+ professionals can't be wrong. Here's what they say.</p>
            </div>
          </div>
          <div className="reviews-marquee-wrap" style={{paddingBottom:64}}>
            <div className="reviews-marquee-track">
              {[...REVIEWS,...REVIEWS].map((r,i)=>(
                <div key={i} className="review-card">
                  <div className="review-stars">
                    {Array.from({length:r.rating}).map((_,j)=><Star key={j} size={12} fill="#F59E0B" color="#F59E0B"/>)}
                  </div>
                  <p className="review-text">"{r.text}"</p>
                  <div className="review-author">
                    <img src={r.avatar} alt={r.name}/>
                    <div>
                      <div className="review-author-name">{r.name}</div>
                      <div className="review-author-role">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="cta-section">
          <div className="page-max section-pad">
            <div style={{textAlign:"center",marginBottom:40}}>
              <div className="section-eyebrow" style={{justifyContent:"center"}}><span className="eyebrow-line"/>Get Started<span className="eyebrow-line"/></div>
              <h2 className="section-h2" style={{textAlign:"center"}}>Ready to <span className="accent">Level Up?</span></h2>
              <p className="section-p" style={{margin:"0 auto",textAlign:"center"}}>Whether you're here to learn or to teach, there's a place for you on TopTrainer.</p>
            </div>
            <div className="cta-dual-cards">
              <div className="cta-card">
                <div className="cta-card-icon" style={{background:"linear-gradient(135deg,#2563EB,#4338CA)",boxShadow:"0 6px 22px rgba(37,99,235,0.3)"}}>
                  <Rocket size={24} color="#fff"/>
                </div>
                <div>
                  <div className="cta-card-title">Find Your Workshop</div>
                  <div className="cta-card-desc">Browse 320+ live workshops from India's top trainers across sales, tech, leadership, AI and more.</div>
                  <button className="btn-primary" style={{fontSize:"0.82rem",padding:"10px 22px"}}
                    onClick={()=>document.getElementById("ws-section")?.scrollIntoView({behavior:"smooth"})}>
                    Browse Workshops <ArrowRight size={13}/>
                  </button>
                </div>
              </div>
              <div className="cta-card">
                <div className="cta-card-icon" style={{background:"linear-gradient(135deg,#F59E0B,#EF4444)",boxShadow:"0 6px 22px rgba(245,158,11,0.3)"}}>
                  <BrainCircuit size={24} color="#fff"/>
                </div>
                <div>
                  <div className="cta-card-title">Become a Top Trainer</div>
                  <div className="cta-card-desc">Share your expertise, inspire thousands, and build a sustainable income. Join 1,200+ trainers already on the platform.</div>
                  <button className="btn-outline" style={{fontSize:"0.82rem",borderColor:"#F59E0B",color:"#D97706"}}>
                    Apply as Trainer <ArrowRight size={13}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}