"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import YoutubeSection from "../components/youtube";
import {
    Bot,
    Brain,
    MessageSquare,
    Users,
    Lightbulb,
    Clock,
    ChevronDown
} from "lucide-react";
const industries = [
    "Logistics",
    "Soft Skills",
    "Sales Excellence",
    "Leadership",
    "Global Expansion",
    "Customer Service"
];

const extraIndustries = [
    "Branding & Marketing"
];
const industryIcons = {
    "Logistics": <Clock className="w-5 h-5" />,
    "Soft Skills": <Users className="w-5 h-5" />,
    "Sales Excellence": <Lightbulb className="w-5 h-5" />,
    "Leadership": <Users className="w-5 h-5" />,
    "Global Expansion": <Brain className="w-5 h-5" />,
    "Customer Service": <MessageSquare className="w-5 h-5" />,
    "Branding & Marketing": <Bot className="w-5 h-5" />
};

   const trainersData = {
  "Logistics": [
    {
      name: "Rajiv Malhotra",
      role: "Supply Chain Optimization Expert",
      tags: ["Lean Ops", "Warehouse", "Efficiency"],
      rating: 4.9,
      reviews: 142,
      topRated: true,
      experience: "12+ years exp."
    },
    {
      name: "Neha Bansal",
      role: "Operational Excellence Consultant",
      tags: ["Automation", "Logistics", "Planning"],
      rating: 4.8,
      reviews: 121,
      topRated: false,
      experience: "10+ years exp."
    },
    {
      name: "Amit Suri",
      role: "Logistics Process Strategist",
      tags: ["Supply Chain", "Optimization", "Delivery"],
      rating: 4.9,
      reviews: 166,
      topRated: true,
      experience: "11+ years exp."
    },
    {
      name: "Priyansh Mehta",
      role: "Fleet Operations Coach",
      tags: ["Transport", "Efficiency", "Routing"],
      rating: 4.7,
      reviews: 104,
      topRated: false,
      experience: "8+ years exp."
    },
    {
      name: "Kunal Arora",
      role: "Distribution Systems Expert",
      tags: ["Distribution", "Operations", "Execution"],
      rating: 4.8,
      reviews: 137,
      topRated: true,
      experience: "9+ years exp."
    },
    {
      name: "Meera Kapoor",
      role: "Warehouse Management Trainer",
      tags: ["Inventory", "Storage", "Systems"],
      rating: 4.9,
      reviews: 181,
      topRated: true,
      experience: "13+ years exp."
    },
    {
      name: "Rohit Nanda",
      role: "Operational Efficiency Mentor",
      tags: ["Lean", "Execution", "Scaling"],
      rating: 4.8,
      reviews: 115,
      topRated: false,
      experience: "9+ years exp."
    },
    {
      name: "Anjali Verma",
      role: "Process Automation Specialist",
      tags: ["Automation", "Workflow", "Optimization"],
      rating: 4.9,
      reviews: 152,
      topRated: true,
      experience: "10+ years exp."
    }
  ],

  "Soft Skills": [
    {
      name: "Priya Kapoor",
      role: "Corporate Soft Skills Coach",
      tags: ["Communication", "Confidence", "Etiquette"],
      rating: 4.9,
      reviews: 178,
      topRated: true,
      experience: "11+ years exp."
    },
    {
      name: "Amit Verma",
      role: "Personality Development Trainer",
      tags: ["Public Speaking", "Growth", "Leadership"],
      rating: 4.8,
      reviews: 132,
      topRated: false,
      experience: "9+ years exp."
    },
    {
      name: "Sneha Arora",
      role: "Professional Development Mentor",
      tags: ["Presence", "Communication", "Confidence"],
      rating: 4.8,
      reviews: 118,
      topRated: true,
      experience: "8+ years exp."
    }
  ],

  "Sales Excellence": [
    {
      name: "Rohan Sethi",
      role: "Sales Performance Strategist",
      tags: ["B2B Sales", "Negotiation", "Growth"],
      rating: 4.9,
      reviews: 164,
      topRated: true,
      experience: "14+ years exp."
    },
    {
      name: "Simran Arora",
      role: "Business Expansion Coach",
      tags: ["Revenue", "Clients", "Strategy"],
      rating: 4.8,
      reviews: 140,
      topRated: false,
      experience: "10+ years exp."
    },
    {
      name: "Karan Malhotra",
      role: "Sales Leadership Consultant",
      tags: ["Closing", "Strategy", "Pipeline"],
      rating: 4.9,
      reviews: 156,
      topRated: true,
      experience: "12+ years exp."
    }
  ],

  "Leadership": [
    {
      name: "Karan Mehta",
      role: "Leadership Transformation Consultant",
      tags: ["Executive Coaching", "Culture", "Teams"],
      rating: 4.9,
      reviews: 188,
      topRated: true,
      experience: "15+ years exp."
    },
    {
      name: "Vikas Sharma",
      role: "Leadership Development Coach",
      tags: ["Management", "Growth", "Transformation"],
      rating: 4.8,
      reviews: 142,
      topRated: false,
      experience: "11+ years exp."
    }
  ],

  "Global Expansion": [
    {
      name: "Vikram Nair",
      role: "Global Market Expansion Advisor",
      tags: ["Exports", "Growth", "International"],
      rating: 4.8,
      reviews: 109,
      topRated: true,
      experience: "13+ years exp."
    },
    {
      name: "Ritika Menon",
      role: "International Strategy Consultant",
      tags: ["Markets", "Entry", "Scaling"],
      rating: 4.9,
      reviews: 136,
      topRated: true,
      experience: "12+ years exp."
    }
  ],

  "Customer Service": [
    {
      name: "Sneha Iyer",
      role: "Customer Experience Coach",
      tags: ["CX", "Retention", "Quality"],
      rating: 4.9,
      reviews: 151,
      topRated: true,
      experience: "12+ years exp."
    },
    {
      name: "Ankit Rao",
      role: "Service Excellence Consultant",
      tags: ["Support", "Relations", "Trust"],
      rating: 4.8,
      reviews: 122,
      topRated: false,
      experience: "9+ years exp."
    }
  ],

  "Branding & Marketing": [
    {
      name: "Ananya Sharma",
      role: "Brand Strategy Consultant",
      tags: ["Branding", "Digital", "Communication"],
      rating: 4.8,
      reviews: 143,
      topRated: true,
      experience: "11+ years exp."
    },
    {
      name: "Rahul Bhatia",
      role: "Marketing Communication Expert",
      tags: ["Campaigns", "Positioning", "Media"],
      rating: 4.9,
      reviews: 162,
      topRated: true,
      experience: "10+ years exp."
    }
  ]
};


const articles = [
    {
        title: "How Generative AI is Reshaping Professional Workflows",
        badge: "Featured",
        image: "/Images/workshop2.png"
    },
    {
        title: "Mastering Strategic Thinking in the AI Era",
        badge: null,
        image: "/Images/workshop2.png"
    },
    {
        title: "Time Management Techniques for High-Performance Teams",
        badge: null,
        image: "/Images/workshop2.png"
    }
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
    const [activeIndustry, setActiveIndustry] = useState("Logistics & Operational Efficiency");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [experience, setExperience] = useState("");
    const [trainingType, setTrainingType] = useState("");
    const [sortBy, setSortBy] = useState("Most Popular");
    const [showAll, setShowAll] = useState(false);
    const [showExtra, setShowExtra] = useState(false);
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
            <div className="relative h-[330px] overflow-hidden">
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
                    <p className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-8">By Competency</p>

                    {/* Industry Tabs */}
                    <div className="flex flex-wrap mb-5 gap-4 sm:gap-6">
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
                        <div className="relative">
                            <button
                                onClick={() => setShowExtra(!showExtra)}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white/10 border-white/30 text-white/70 hover:bg-white/20 hover:border-white/60 transition-all">
                                    <ChevronDown className={`w-5 h-5 transition-transform ${showExtra ? "rotate-180" : ""}`} />
                                </div>
                                <span className="text-xs font-medium text-white/60 group-hover:text-white/90">
                                    View All
                                </span>
                            </button>

                            {showExtra && (
                                <div className="absolute top-20 right-0 bg-white rounded-2xl shadow-xl p-3 w-56 z-50">
                                    {extraIndustries.map((ind) => (
                                        <button
                                            key={ind}
                                            onClick={() => {
                                                setActiveIndustry(ind);
                                                setShowExtra(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-left text-gray-700"
                                        >
                                            {industryIcons[ind]}
                                            <span className="text-sm font-medium">{ind}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
            {/* Search Bar */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 -mt-16">
                <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-wrap gap-3 items-end">

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
                        Search Experts
                    </button>

                </div>
            </div>

            {/* Trainer Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 ">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Top Experts in {activeIndustry}</h2>
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



            <YoutubeSection />

        </div>
    );
}