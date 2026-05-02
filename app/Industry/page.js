"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import YoutubeSection from "../components/youtube";

const industries = ["IT & Software", "Healthcare", "Finance", "Manufacturing", "Retail", "Education"];

const trainersData = {
  "IT & Software": [
  { name: "Karan Malhotra", role: "Leadership & Agile Coach", tags: ["Agile", "Scrum", "Leadership"], rating: 4.8, reviews: 128, workshops: 85, price: 15000, topRated: true, initials: "KM", color: "from-blue-600 to-blue-800", experience: "6+ years exp." },

  { name: "Priya Menon", role: "Technical Trainer & Mentor", tags: ["Cloud Computing", "DevOps", "AWS"], rating: 4.7, reviews: 96, workshops: 60, price: 12000, topRated: false, initials: "PM", color: "from-indigo-500 to-indigo-700", experience: "4+ years exp." },

  { name: "Arjun Rao", role: "Data Science & AI Trainer", tags: ["Python", "Machine Learning", "AI"], rating: 4.9, reviews: 142, workshops: 70, price: 18000, topRated: false, initials: "AR", color: "from-violet-600 to-violet-800", experience: "8+ years exp." },

  { name: "Rohit Verma", role: "Full Stack Developer Trainer", tags: ["JavaScript", "React", "Node.js"], rating: 4.8, reviews: 88, workshops: 55, price: 14000, topRated: true, initials: "RV", color: "from-sky-500 to-sky-700", experience: "5+ years exp." },

  { name: "Sneha Iyer", role: "Cybersecurity Expert", tags: ["Ethical Hacking", "Security", "Network"], rating: 4.8, reviews: 112, workshops: 65, price: 16000, topRated: false, initials: "SI", color: "from-teal-500 to-teal-700", experience: "7+ years exp." },

  { name: "Vikram Singh", role: "DevOps & Infrastructure Coach", tags: ["DevOps", "Docker", "Kubernetes"], rating: 4.7, reviews: 79, workshops: 50, price: 13000, topRated: false, initials: "VS", color: "from-cyan-600 to-cyan-800", experience: "6+ years exp." },

  { name: "Ankit Sharma", role: "Frontend Architecture Coach", tags: ["React", "Next.js", "UI/UX"], rating: 4.9, reviews: 154, price: 17000, topRated: true, initials: "AS", color: "from-blue-500 to-indigo-700", experience: "9+ years exp." },

  { name: "Neha Kapoor", role: "Backend Systems Trainer", tags: ["Node.js", "Express", "MongoDB"], rating: 4.8, reviews: 121, price: 14500, topRated: false, initials: "NK", color: "from-cyan-500 to-blue-700", experience: "5+ years exp." },

  { name: "Siddharth Jain", role: "Cloud Infrastructure Expert", tags: ["AWS", "Docker", "CI/CD"], rating: 4.7, reviews: 98, price: 16000, topRated: false, initials: "SJ", color: "from-sky-600 to-indigo-800", experience: "7+ years exp." },

  { name: "Riya Khanna", role: "Data Engineering Mentor", tags: ["Python", "Spark", "ETL"], rating: 4.9, reviews: 176, price: 19000, topRated: true, initials: "RK", color: "from-indigo-500 to-purple-700", experience: "8+ years exp." },

  { name: "Varun Mehta", role: "DevOps Automation Coach", tags: ["Kubernetes", "Terraform", "Linux"], rating: 4.8, reviews: 110, price: 15500, topRated: false, initials: "VM", color: "from-blue-600 to-cyan-800", experience: "6+ years exp." },

  { name: "Ishita Rao", role: "AI Product Trainer", tags: ["LLMs", "Prompting", "GenAI"], rating: 4.9, reviews: 143, price: 21000, topRated: true, initials: "IR", color: "from-violet-600 to-blue-800", experience: "10+ years exp." }
],
  "Healthcare": [
    { name: "Dr. Meera Nair", role: "Clinical Skills Trainer", tags: ["Patient Care", "Diagnostics", "EMR"], rating: 4.9, reviews: 156, workshops: 90, price: 20000, topRated: true, initials: "MN", color: "from-emerald-600 to-emerald-800" },
    { name: "Suresh Patel", role: "Hospital Management Coach", tags: ["Operations", "Leadership", "Quality"], rating: 4.7, reviews: 84, workshops: 48, price: 17000, topRated: false, initials: "SP", color: "from-green-600 to-green-800" },
    { name: "Dr. Anjali Shah", role: "Nursing Education Specialist", tags: ["Nursing", "Critical Care", "BLS"], rating: 4.8, reviews: 103, workshops: 62, price: 15000, topRated: false, initials: "AS", color: "from-teal-500 to-teal-700" },
  ],
  "Finance": [
    { name: "Rajesh Kumar", role: "CFA & Investment Coach", tags: ["CFA", "Equity", "Portfolio"], rating: 4.9, reviews: 201, workshops: 110, price: 25000, topRated: true, initials: "RK", color: "from-amber-600 to-amber-800" },
    { name: "Neha Sharma", role: "Financial Planning Expert", tags: ["CFP", "Tax", "Retirement"], rating: 4.7, reviews: 88, workshops: 55, price: 18000, topRated: false, initials: "NS", color: "from-yellow-600 to-yellow-800" },
    { name: "Vivek Joshi", role: "Risk & Compliance Trainer", tags: ["Risk Management", "Basel III", "AML"], rating: 4.8, reviews: 74, workshops: 42, price: 22000, topRated: false, initials: "VJ", color: "from-orange-500 to-orange-700" },
  ],
  "Manufacturing": [
    { name: "Harinder Singh", role: "Lean Manufacturing Coach", tags: ["Lean", "Six Sigma", "Kaizen"], rating: 4.8, reviews: 119, workshops: 72, price: 16000, topRated: true, initials: "HS", color: "from-red-600 to-red-800" },
    { name: "Deepa Krishnan", role: "Quality Systems Trainer", tags: ["ISO 9001", "QA", "Auditing"], rating: 4.6, reviews: 65, workshops: 38, price: 14000, topRated: false, initials: "DK", color: "from-rose-500 to-rose-700" },
    { name: "Manish Gupta", role: "Industrial Safety Expert", tags: ["EHS", "OSHA", "Risk"], rating: 4.7, reviews: 92, workshops: 58, price: 15000, topRated: false, initials: "MG", color: "from-pink-500 to-pink-700" },
  ],
  "Retail": [
    { name: "Kavita Nanda", role: "Retail Sales Trainer", tags: ["Sales", "Customer Experience", "VM"], rating: 4.8, reviews: 138, workshops: 80, price: 12000, topRated: true, initials: "KN", color: "from-purple-600 to-purple-800" },
    { name: "Amit Bose", role: "E-Commerce Growth Coach", tags: ["Shopify", "D2C", "Analytics"], rating: 4.7, reviews: 77, workshops: 44, price: 14000, topRated: false, initials: "AB", color: "from-violet-500 to-violet-700" },
    { name: "Ritu Malhotra", role: "Merchandising Specialist", tags: ["Category Mgmt", "Pricing", "Planogram"], rating: 4.6, reviews: 59, workshops: 35, price: 11000, topRated: false, initials: "RM", color: "from-fuchsia-500 to-fuchsia-700" },
  ],
  "Education": [
    { name: "Prof. Sunil Mehta", role: "Curriculum Design Expert", tags: ["EdTech", "Bloom's", "UDL"], rating: 4.9, reviews: 177, workshops: 95, price: 13000, topRated: true, initials: "SM", color: "from-blue-500 to-blue-700" },
    { name: "Pooja Verma", role: "Corporate L&D Trainer", tags: ["L&D", "ILT", "LMS"], rating: 4.8, reviews: 94, workshops: 60, price: 11000, topRated: false, initials: "PV", color: "from-indigo-400 to-indigo-600" },
    { name: "Dr. Ashok Rao", role: "K-12 Pedagogy Coach", tags: ["Pedagogy", "NEP 2020", "STEM"], rating: 4.7, reviews: 81, workshops: 50, price: 10000, topRated: false, initials: "DR", color: "from-sky-500 to-sky-700" },
  ],
};

const industryIcons = {
  "IT & Software": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "Healthcare": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "Finance": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "Manufacturing": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  "Retail": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  "Education": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
};

const articles = [
  {
    title: "The Future of Work in IT & Software Industry",
   
    badge: "Featured",
    image: "/Images/workshop2.png"
  },
  {
    title: "Upskilling Teams for Digital Transformation",
   
    badge: null,
    image: "/Images/workshop2.png"
  },
  {
    title: "Top 10 Skills Every IT Professional Should Learn",
    
    badge: null,
    image: "/Images/workshop2.png"
  },
];

const videos = [
  { title: "Introduction to Cloud Computing", duration: "12 min" },
  { title: "Agile Methodology Explained", duration: "15 min" },
  { title: "Data Science Career Roadmap", duration: "18 min" },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-sm font-semibold text-gray-800">{rating}</span>
    </div>
  );
}

function TrainerCard({ trainer }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="relative h-44 w-full overflow-hidden">
  <Image
    src="/Images/trainee2.png"
    alt={trainer.name}
    fill
    className="object-cover"
  />

  <div className={`absolute inset-0 `} />
</div>
        {trainer.topRated && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Top Rated
          </span>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
  <div className="flex items-center justify-between mb-1">
    <div className="flex items-center gap-1.5">
      <h3 className="font-bold text-gray-900 text-base">{trainer.name}</h3>
      <svg className="w-4 h-4 text-blue-500 fill-blue-500" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>

    <div className="flex items-center gap-1">
      <StarRating rating={trainer.rating} />
      <span className="text-xs text-gray-500">
        ({trainer.reviews})
      </span>
    </div>
  </div>

  <p className="text-sm text-gray-500 mb-3">{trainer.role}</p>

  <div className="flex flex-wrap gap-1.5 mb-4">
    {trainer.tags.map((tag) => (
      <span
        key={tag}
        className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium border border-blue-100"
      >
        {tag}
      </span>
    ))}
  </div>
<div className="flex items-end justify-between mt-4">
  <button className="border border-blue-600 text-blue-600 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 group-hover:shadow-sm">
    View Profile
  </button>

  <div className="text-right">
   

    <p className="text-sm text-gray-500 mt-1">
      {trainer.experience}
    </p>
  </div>
</div>
</div>
    </div>
  );
}

export default function Industry() {
    const router = useRouter();
  const [activeIndustry, setActiveIndustry] = useState("IT & Software");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [showAll, setShowAll] = useState(false);

  const trainers = trainersData[activeIndustry] || [];
  const displayed = showAll ? trainers : trainers.slice(0, 8);

  return (
    <div
  className="min-h-screen font-sans"
  style={{
    background:
      "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%)",
  }}
>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
  <Image
    src="/Images/industry-hero.png"
    alt="Hero Background"
    fill
    className="object-cover opacity-90"
    priority
  />
  <div className="absolute inset-0 bg-blue-900/70" />
</div>
        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">Explore Top Trainers</h1>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-8">By Industry</p>

          {/* Industry Tabs */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => { setActiveIndustry(ind); setShowAll(false); }}
                className={`flex flex-col items-center gap-2 group transition-all duration-200`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${activeIndustry === ind ? "bg-white border-white text-blue-700 shadow-lg shadow-blue-900/40" : "bg-white/10 border-white/30 text-white/70 hover:bg-white/20 hover:border-white/60"}`}>
                  {industryIcons[ind]}
                </div>
                <span className={`text-xs font-medium transition-colors ${activeIndustry === ind ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>{ind}</span>
              </button>
            ))}
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white/10 border-white/30 text-white/70 hover:bg-white/20 hover:border-white/60 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/60 group-hover:text-white/90">View All</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-0">
          <div className="bg-white rounded-t-2xl shadow-xl p-4 flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">City</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select value={city} onChange={e => setCity(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                  <option value="">Select City</option>
                  <option>Delhi</option><option>Mumbai</option><option>Bengaluru</option><option>Hyderabad</option><option>Chennai</option>
                </select>
              </div>
            </div>
           
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Experience Level</label>
              <select value={experience} onChange={e => setExperience(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                <option value="">Any Experience</option>
                <option>Beginner</option><option>Intermediate</option><option>Expert</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Training Type</label>
              <select value={trainingType} onChange={e => setTrainingType(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                <option value="">Any Type</option>
                <option>Online</option><option>Offline</option><option>Hybrid</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-sm shadow-blue-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Trainers
            </button>
          </div>
        </div>
      </div>

      {/* Trainer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Trainers in {activeIndustry}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded-lg text-sm text-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
              <option>Most Popular</option><option>Highest Rated</option><option>Price: Low to High</option><option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map(trainer => (
            <TrainerCard key={trainer.name} trainer={trainer} />
          ))}
        </div>

        {trainers.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-blue-200 text-blue-600 font-semibold text-sm px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center gap-2"
            >
              {showAll ? "Show Less" : "View More Trainers"}
              <svg className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Industry Insights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
          <button
  onClick={() => router.push("/articles")}
  className="text-blue-600 text-sm font-semibold hover:underline"
>
  View All
</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {articles.map((a) => (
    <div
      key={a.title}
      className="relative rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 h-68"
    >
      <Image
        src={a.image}
        alt={a.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {a.badge && (
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          {a.badge}
        </span>
      )}

      <div className="absolute bottom-2 left-5 right-5 z-10">
        <p className="text-white font-bold text-lg leading-snug ">
          {a.title}
        </p>
        
      </div>
    </div>
  ))}
</div>
      </div>

      {/* Videos */}
     

        
  <YoutubeSection/>
      
    </div>
  );
}