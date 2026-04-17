// "use client";

// import { Star, Eye, Clock, User, CheckCircle, TrendingUp, ChevronDown, ChevronUp, Zap } from "lucide-react";
// import { useState, useEffect } from "react";

// /* ─── Filters ─── */
// const filters = [
//   { id: "All", label: "All Trainers", emoji: "🏆" },
//   { id: "Tech", label: "Tech", emoji: "💻" },
//   { id: "Business", label: "Business", emoji: "🚀" },
//   { id: "Health", label: "Health", emoji: "💪" },
//   { id: "Finance", label: "Finance", emoji: "📈" },
//   { id: "Marketing", label: "Marketing", emoji: "📣" },
//   { id: "Creative", label: "Creative", emoji: "🎨" },
//   { id: "Personal Development", label: "Growth", emoji: "🌱" },
// ];

// /* ─── Category theme colors ─── */
// const categoryTheme = {
//   Tech:                  { bg: "from-blue-600 to-indigo-700",   badge: "bg-blue-100 text-blue-700",   icon: "💻" },
//   Finance:               { bg: "from-emerald-600 to-teal-700",  badge: "bg-emerald-100 text-emerald-700", icon: "📈" },
//   Health:                { bg: "from-rose-500 to-pink-700",     badge: "bg-rose-100 text-rose-700",   icon: "💪" },
//   Marketing:             { bg: "from-orange-500 to-amber-600",  badge: "bg-orange-100 text-orange-700", icon: "📣" },
//   Creative:              { bg: "from-purple-600 to-violet-700", badge: "bg-purple-100 text-purple-700", icon: "🎨" },
//   Business:              { bg: "from-cyan-600 to-sky-700",      badge: "bg-cyan-10OTH text-cyan-700",   icon: "🚀" },
//   "Personal Development":{ bg: "from-yellow-500 to-amber-600",  badge: "bg-yellow-100 text-yellow-700", icon: "🌱" },
// };

// /* ─── Trainers Data ─── */
// const trainers = [
//   {
//     id: 1, title: "Full Stack Web Development",
//     category: "Tech", rating: "4.9", views: "2.5k", duration: "12 weeks",
//     author: "Alex Johnson", initials: "AJ",
//     desc: "Master React, Node.js, and cloud deployment with real-world industry projects.",
//     price: "₹1,999", oldPrice: "₹4,999", students: "3.2k", featured: true,
//     tags: ["React", "Node.js", "AWS"],
//   },
//   {
//     id: 2, title: "Stock Market for Beginners",
//     category: "Finance", rating: "4.7", views: "1.8k", duration: "8 weeks",
//     author: "Rakesh Sharma", initials: "RS",
//     desc: "Build wealth with proven investment strategies and deep market insights.",
//     price: "₹1,499", oldPrice: "₹3,499", students: "2.1k", featured: false,
//     tags: ["Investing", "Trading", "Wealth"],
//   },
//   {
//     id: 3, title: "Personal Fitness & Workout",
//     category: "Health", rating: "4.8", views: "2.1k", duration: "6 weeks",
//     author: "Chris Evans", initials: "CE",
//     desc: "Transform your body with science-backed training plans and nutrition guides.",
//     price: "₹999", oldPrice: "₹2,499", students: "4.7k", featured: true,
//     tags: ["Fitness", "Nutrition", "Strength"],
//   },
//   {
//     id: 4, title: "Digital Marketing Mastery",
//     category: "Marketing", rating: "4.6", views: "1.3k", duration: "10 weeks",
//     author: "Neha Verma", initials: "NV",
//     desc: "Drive traffic, leads and sales through modern digital channels and strategies.",
//     price: "₹1,799", oldPrice: "₹3,999", students: "1.9k", featured: false,
//     tags: ["SEO", "Social Media", "Ads"],
//   },
//   {
//     id: 5, title: "Photography Fundamentals",
//     category: "Creative", rating: "4.9", views: "1.9k", duration: "5 weeks",
//     author: "Rahul Kapoor", initials: "RK",
//     desc: "Capture stunning images with composition, lighting and professional editing.",
//     price: "₹1,299", oldPrice: "₹2,999", students: "2.8k", featured: false,
//     tags: ["DSLR", "Lightroom", "Composition"],
//   },
//   {
//     id: 6, title: "Public Speaking & Confidence",
//     category: "Personal Development", rating: "4.8", views: "1.6k", duration: "4 weeks",
//     author: "Anita Singh", initials: "AS",
//     desc: "Command any room with powerful communication skills and unshakeable presence.",
//     price: "₹1,199", oldPrice: "₹2,799", students: "3.4k", featured: true,
//     tags: ["Speaking", "Leadership", "Presence"],
//   },
//   {
//     id: 7, title: "Yoga & Mental Wellness",
//     category: "Health", rating: "4.7", views: "1.4k", duration: "8 weeks",
//     author: "Sanya Mehta", initials: "SM",
//     desc: "Reduce stress, improve flexibility and find balance with daily mindfulness.",
//     price: "₹899", oldPrice: "₹1,999", students: "5.1k", featured: false,
//     tags: ["Yoga", "Meditation", "Mindfulness"],
//   },
//   {
//     id: 8, title: "Startup & Entrepreneurship",
//     category: "Business", rating: "4.6", views: "1.2k", duration: "12 weeks",
//     author: "Vikram Malhotra", initials: "VM",
//     desc: "Go from idea to funded startup with proven frameworks and real founder stories.",
//     price: "₹2,199", oldPrice: "₹4,999", students: "1.5k", featured: true,
//     tags: ["Startup", "Funding", "Growth"],
//   },
//   {
//     id: 9, title: "Advanced Video Editing",
//     category: "Creative", rating: "4.8", views: "1.7k", duration: "7 weeks",
//     author: "Priya Nair", initials: "PN",
//     desc: "Edit cinematic videos using Premiere Pro, After Effects and DaVinci Resolve.",
//     price: "₹1,599", oldPrice: "₹3,499", students: "2.2k", featured: false,
//     tags: ["Premiere", "After Effects", "Color"],
//   },
//   {
//     id: 10, title: "Leadership & Team Building",
//     category: "Personal Development", rating: "4.9", views: "2k", duration: "6 weeks",
//     author: "Amit Joshi", initials: "AJ",
//     desc: "Lead high-performing teams with empathy, vision and clear strategic thinking.",
//     price: "₹1,899", oldPrice: "₹4,299", students: "2.9k", featured: true,
//     tags: ["Leadership", "Culture", "Strategy"],
//   },
//   {
//     id: 11, title: "Nutrition & Healthy Living",
//     category: "Health", rating: "4.7", views: "1.3k", duration: "6 weeks",
//     author: "Dr. Ritu Sharma", initials: "RS",
//     desc: "Science-based nutrition plans for lasting energy, immunity and longevity.",
//     price: "₹999", oldPrice: "₹2,199", students: "3.6k", featured: false,
//     tags: ["Diet", "Immunity", "Wellness"],
//   },
//   {
//     id: 12, title: "Business Finance & Accounting",
//     category: "Business", rating: "4.6", views: "1.1k", duration: "10 weeks",
//     author: "Suresh Kapoor", initials: "SK",
//     desc: "Read balance sheets, manage cash flow and make sharper financial decisions.",
//     price: "₹1,699", oldPrice: "₹3,799", students: "1.4k", featured: false,
//     tags: ["Finance", "Accounting", "Cash Flow"],
//   },
// ];

// /* ─── Stat Card ─── */
// const StatCard = ({ value, label, icon }) => (
//   <div className="flex flex-col items-center gap-1">
//     <span className="text-2xl font-bold text-white">{value}</span>
//     <span className="text-xs text-blue-200">{label}</span>
//   </div>
// );

// /* ─── Trainer Card ─── */
// const TrainerCard = ({ trainer, index }) => {
//   const theme = categoryTheme[trainer.category] || categoryTheme["Tech"];
//   const discount = Math.round(
//     ((parseInt(trainer.oldPrice.replace(/[^\d]/g, "")) -
//       parseInt(trainer.price.replace(/[^\d]/g, ""))) /
//       parseInt(trainer.oldPrice.replace(/[^\d]/g, ""))) *
//       100
//   );

//   return (
//     <div
//       className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//       style={{ animationDelay: `${index * 60}ms` }}
//     >
//       {/* Card Top Banner */}
//       <div className={`relative bg-gradient-to-br ${theme.bg} p-6 h-44 flex items-end`}>
//         {/* Big Emoji */}
//         <div className="absolute top-5 right-5 text-5xl opacity-90 group-hover:scale-110 transition-transform duration-300">
//           {theme.icon}
//         </div>

//         {/* Category Badge */}
//         <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
//           {trainer.category}
//         </span>

//         {/* Featured Badge */}
//         {trainer.featured && (
//           <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
//             <Zap size={10} fill="currentColor" /> Top Trainer
//           </span>
//         )}

//         {/* Discount Badge */}
//         <span className="absolute bottom-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//           -{discount}%
//         </span>

//         {/* Author Row */}
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-xs font-bold">
//             {trainer.initials}
//           </div>
//           <div>
//             <p className="text-white text-xs font-semibold leading-tight">{trainer.author}</p>
//             <p className="text-blue-100 text-xs flex items-center gap-1">
//               <CheckCircle size={10} className="text-green-300" /> Verified Trainer
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Card Body */}
//       <div className="p-5">
//         <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug group-hover:text-blue-700 transition-colors">
//           {trainer.title}
//         </h3>
//         <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{trainer.desc}</p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-1 mb-4">
//           {trainer.tags.map((tag) => (
//             <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme.badge}`}>
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Stats Row */}
//         <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
//           <span className="flex items-center gap-1 text-amber-500 font-semibold">
//             <Star size={12} fill="currentColor" /> {trainer.rating}
//           </span>
//           <span className="flex items-center gap-1">
//             <Eye size={11} /> {trainer.views}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock size={11} /> {trainer.duration}
//           </span>
//           <span className="flex items-center gap-1">
//             <User size={11} /> {trainer.students}
//           </span>
//         </div>

//         {/* Price + CTA */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-baseline gap-1.5">
//             <span className="text-lg font-bold text-gray-900">{trainer.price}</span>
//             <span className="text-xs text-gray-400 line-through">{trainer.oldPrice}</span>
//           </div>
//           <button className={`bg-gradient-to-r ${theme.bg} text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md`}>
//             Enroll Now →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── Main Component ─── */
// const Category = () => {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [visibleCount, setVisibleCount] = useState(8);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   const filteredTrainers =
//     activeFilter === "All"
//       ? trainers
//       : trainers.filter((t) => t.category === activeFilter);

//   const visibleTrainers = filteredTrainers.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredTrainers.length;

//   const handleFilterChange = (id) => {
//     setActiveFilter(id);
//     setVisibleCount(8);
//   };

//   const handleLoadMore = () => {
//     if (hasMore) setVisibleCount((prev) => prev + 4);
//     else setVisibleCount(8);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Hero Banner ── */}
//       <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 py-16 px-6 relative overflow-hidden">
//         {/* Decorative circles */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
//             <TrendingUp size={12} className="text-amber-400" />
//             India's #1 Trainer Marketplace
//           </div>

//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
//             Learn from the{" "}
//             <span className="text-amber-400">Top Trainers</span>
//           </h1>
//           <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
//             Certified experts. Real skills. Lifetime access. Start your journey today.
//           </p>

//           {/* Stats */}
//           <div className="flex justify-center gap-10 flex-wrap">
//             <StatCard value="480+" label="Expert Trainers" />
//             <div className="w-px bg-white/20 hidden md:block" />
//             <StatCard value="12k+" label="Students Enrolled" />
//             <div className="w-px bg-white/20 hidden md:block" />
//             <StatCard value="4.8★" label="Avg. Rating" />
//             <div className="w-px bg-white/20 hidden md:block" />
//             <StatCard value="95%" label="Satisfaction Rate" />
//           </div>
//         </div>
//       </div>

//       {/* ── Filter & Content ── */}
//       <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">

//         {/* Filters */}
//         <div className="flex flex-wrap justify-center gap-2 mb-8">
//           {filters.map((f) => (
//             <button
//               key={f.id}
//               onClick={() => handleFilterChange(f.id)}
//               className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
//                 ${activeFilter === f.id
//                   ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
//                 }`}
//             >
//               <span className="text-base leading-none">{f.emoji}</span>
//               {f.label}
//             </button>
//           ))}
//         </div>

//         {/* Count Row */}
//         <div className="flex items-center justify-between mb-6">
//           <p className="text-sm text-gray-500">
//             Showing{" "}
//             <span className="font-bold text-gray-800">{visibleTrainers.length}</span>{" "}
//             of{" "}
//             <span className="font-bold text-gray-800">{filteredTrainers.length}</span>{" "}
//             trainers
//           </p>
//           {activeFilter !== "All" && (
//             <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full border border-blue-100">
//               {activeFilter}
//             </span>
//           )}
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {visibleTrainers.map((trainer, i) => (
//             <TrainerCard key={trainer.id} trainer={trainer} index={i} />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredTrainers.length === 0 && (
//           <div className="text-center py-20 text-gray-400">
//             <p className="text-4xl mb-4">🔍</p>
//             <p className="text-lg font-semibold">No trainers found</p>
//             <p className="text-sm">Try a different category</p>
//           </div>
//         )}

//         {/* Load More / Show Less */}
//         {filteredTrainers.length > 8 && (
//           <div className="flex justify-center mt-12">
//             <button
//               onClick={handleLoadMore}
//               className="flex items-center gap-2 px-8 py-3 bg-white text-blue-700 border-2 border-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//             >
//               {hasMore ? (
//                 <>Load More Trainers <ChevronDown size={16} /></>
//               ) : (
//                 <>Show Less <ChevronUp size={16} /></>
//               )}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ── Bottom CTA Banner ── */}
//       <div className="bg-gradient-to-r from-blue-700 to-indigo-800 mt-12 py-14 px-6 text-center">
//         <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
//           Are you an expert? Become a Trainer.
//         </h2>
//         <p className="text-blue-200 mb-6 max-w-md mx-auto text-sm">
//           Join 480+ top trainers on TopTrainer and start earning by sharing your knowledge.
//         </p>
//         <button className="bg-amber-400 text-amber-900 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
//           Apply as a Trainer →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Category;

"use client";

import { Star, Eye, Clock, User, CheckCircle, TrendingUp, ChevronDown, ChevronUp, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";

/* ─── Filters ─── */
const filters = [
  { id: "All",                  label: "All Trainers" },
  { id: "Tech",                 label: "Tech" },
  { id: "Business",             label: "Business" },
  { id: "Health",               label: "Health" },
  { id: "Finance",              label: "Finance" },
  { id: "Marketing",            label: "Marketing" },
  { id: "Creative",             label: "Creative" },
  { id: "Personal Development", label: "Growth" },
];

/* ─── Trainers Data (replace with API fetch) ─── */
const trainers = [
  {
    id: 1, title: "Full Stack Web Development",
    category: "Tech", rating: "4.9", views: "2.5k", duration: "12 weeks",
    author: "Alex Johnson", initials: "AJ",
    desc: "Master React, Node.js, and cloud deployment with real-world industry projects.",
    price: 1999, oldPrice: 4999, students: "3.2k", featured: true,
    tags: ["React", "Node.js", "AWS"],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  },
  {
    id: 2, title: "Stock Market for Beginners",
    category: "Finance", rating: "4.7", views: "1.8k", duration: "8 weeks",
    author: "Rakesh Sharma", initials: "RS",
    desc: "Build wealth with proven investment strategies and deep market insights.",
    price: 1499, oldPrice: 3499, students: "2.1k", featured: false,
    tags: ["Investing", "Trading", "Wealth"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: 3, title: "Personal Fitness & Workout",
    category: "Health", rating: "4.8", views: "2.1k", duration: "6 weeks",
    author: "Chris Evans", initials: "CE",
    desc: "Transform your body with science-backed training plans and nutrition guides.",
    price: 999, oldPrice: 2499, students: "4.7k", featured: true,
    tags: ["Fitness", "Nutrition", "Strength"],
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
  {
    id: 4, title: "Digital Marketing Mastery",
    category: "Marketing", rating: "4.6", views: "1.3k", duration: "10 weeks",
    author: "Neha Verma", initials: "NV",
    desc: "Drive traffic, leads and sales through modern digital channels and strategies.",
    price: 1799, oldPrice: 3999, students: "1.9k", featured: false,
    tags: ["SEO", "Social Media", "Ads"],
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&q=80",
  },
  {
    id: 5, title: "Photography Fundamentals",
    category: "Creative", rating: "4.9", views: "1.9k", duration: "5 weeks",
    author: "Rahul Kapoor", initials: "RK",
    desc: "Capture stunning images with composition, lighting and professional editing.",
    price: 1299, oldPrice: 2999, students: "2.8k", featured: false,
    tags: ["DSLR", "Lightroom", "Composition"],
    img: "https://images.unsplash.com/photo-1452780212461-51a80f3a1c3e?w=600&q=80",
  },
  {
    id: 6, title: "Public Speaking & Confidence",
    category: "Personal Development", rating: "4.8", views: "1.6k", duration: "4 weeks",
    author: "Anita Singh", initials: "AS",
    desc: "Command any room with powerful communication skills and unshakeable presence.",
    price: 1199, oldPrice: 2799, students: "3.4k", featured: true,
    tags: ["Speaking", "Leadership", "Presence"],
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  },
  {
    id: 7, title: "Yoga & Mental Wellness",
    category: "Health", rating: "4.7", views: "1.4k", duration: "8 weeks",
    author: "Sanya Mehta", initials: "SM",
    desc: "Reduce stress, improve flexibility and find balance with daily mindfulness.",
    price: 899, oldPrice: 1999, students: "5.1k", featured: false,
    tags: ["Yoga", "Meditation", "Mindfulness"],
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  },
  {
    id: 8, title: "Startup & Entrepreneurship",
    category: "Business", rating: "4.6", views: "1.2k", duration: "12 weeks",
    author: "Vikram Malhotra", initials: "VM",
    desc: "Go from idea to funded startup with proven frameworks and real founder stories.",
    price: 2199, oldPrice: 4999, students: "1.5k", featured: true,
    tags: ["Startup", "Funding", "Growth"],
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
  },
  {
    id: 9, title: "Advanced Video Editing",
    category: "Creative", rating: "4.8", views: "1.7k", duration: "7 weeks",
    author: "Priya Nair", initials: "PN",
    desc: "Edit cinematic videos using Premiere Pro, After Effects and DaVinci Resolve.",
    price: 1599, oldPrice: 3499, students: "2.2k", featured: false,
    tags: ["Premiere", "After Effects", "Color"],
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
  },
  {
    id: 10, title: "Leadership & Team Building",
    category: "Personal Development", rating: "4.9", views: "2k", duration: "6 weeks",
    author: "Amit Joshi", initials: "AJ",
    desc: "Lead high-performing teams with empathy, vision and clear strategic thinking.",
    price: 1899, oldPrice: 4299, students: "2.9k", featured: true,
    tags: ["Leadership", "Culture", "Strategy"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    id: 11, title: "Nutrition & Healthy Living",
    category: "Health", rating: "4.7", views: "1.3k", duration: "6 weeks",
    author: "Dr. Ritu Sharma", initials: "RS",
    desc: "Science-based nutrition plans for lasting energy, immunity and longevity.",
    price: 999, oldPrice: 2199, students: "3.6k", featured: false,
    tags: ["Diet", "Immunity", "Wellness"],
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
  },
  {
    id: 12, title: "Business Finance & Accounting",
    category: "Business", rating: "4.6", views: "1.1k", duration: "10 weeks",
    author: "Suresh Kapoor", initials: "SK",
    desc: "Read balance sheets, manage cash flow and make sharper financial decisions.",
    price: 1699, oldPrice: 3799, students: "1.4k", featured: false,
    tags: ["Finance", "Accounting", "Cash Flow"],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  },
];

/* ─── Helpers ─── */
const formatINR = (n) =>
  "₹" + n.toLocaleString("en-IN");

const calcDiscount = (price, oldPrice) =>
  Math.round(((oldPrice - price) / oldPrice) * 100);

/* ─── Stat Item ─── */
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
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col">

      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44">
        <img
          src={trainer.img}
          alt={trainer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.classList.add("bg-gray-100");
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {trainer.category}
          </span>
          {trainer.featured && (
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> Top Trainer
            </span>
          )}
        </div>

        {/* Discount badge */}
        <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {trainer.initials}
          </div>
          <span className="text-xs text-gray-500 font-medium">{trainer.author}</span>
          <span className="flex items-center gap-0.5 text-xs text-green-600 ml-auto">
            <CheckCircle size={11} /> Verified
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2">
          {trainer.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{trainer.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trainer.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-400 pb-4 border-b border-gray-100 mb-4">
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star size={11} fill="currentColor" /> {trainer.rating}
          </span>
          <span className="flex items-center gap-1"><Eye size={11} /> {trainer.views}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {trainer.duration}</span>
          <span className="flex items-center gap-1"><User size={11} /> {trainer.students}</span>
        </div>

        {/* Price + CTA */}
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

/* ─── Main Component ─── */
const Category = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredTrainers =
    activeFilter === "All"
      ? trainers
      : trainers.filter((t) => t.category === activeFilter);

  const visibleTrainers = filteredTrainers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTrainers.length;

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setVisibleCount(8);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 px-6 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/20 pointer-events-none blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-blue-100 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <TrendingUp size={12} className="text-amber-400" />
            India's #1 Trainer Marketplace
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Learn from the{" "}
            <span className="text-amber-400">Top Trainers</span>
          </h1>
          <p className="text-blue-200 text-lg mb-12 max-w-xl mx-auto">
            Certified experts. Real skills. Lifetime access. Start your journey today.
          </p>

          {/* Stats row */}
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

      {/* ── Filter Tabs + Grid ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">

        {/* Gradient Filter Bar */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-3 mb-8 flex flex-wrap gap-2 justify-center shadow-sm">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeFilter === f.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-300/40 scale-[1.03]"
                  : "text-gray-500 hover:text-blue-700 hover:bg-white hover:shadow-sm"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Count Row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-800">{visibleTrainers.length}</span>
            {" "}of{" "}
            <span className="font-bold text-gray-800">{filteredTrainers.length}</span>
            {" "}trainers
          </p>
          {activeFilter !== "All" && (
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full border border-blue-100">
              {activeFilter}
            </span>
          )}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainers.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-semibold text-gray-500">No trainers found</p>
            <p className="text-sm mt-1">Try a different category</p>
          </div>
        )}

        {/* Load More / Show Less */}
        {filteredTrainers.length > 8 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                if (hasMore) setVisibleCount((v) => v + 4);
                else setVisibleCount(8);
              }}
              className="flex items-center gap-2 px-8 py-3 bg-white text-blue-700 border-2 border-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {hasMore ? (
                <><span>Load More Trainers</span><ChevronDown size={16} /></>
              ) : (
                <><span>Show Less</span><ChevronUp size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 mt-8 py-16 px-6 text-center overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
            Are you an expert? Become a Trainer.
          </h2>
          <p className="text-blue-200 mb-8 text-sm leading-relaxed">
            Join 480+ top trainers on TopTrainer and start earning by sharing your knowledge with thousands of students.
          </p>
          <button className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-900 font-bold px-10 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-xl hover:shadow-amber-400/30 hover:scale-105">
            Apply as a Trainer →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Category;