 "use client";

import { Star, CheckCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar";



import { Brain, Mic, Monitor, BarChart3, Leaf } from "lucide-react";
import YoutubeSection from "./components/youtube";

import PopularCourses from "./components/course";


const Page = () => {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const categoryRef = useRef(null);
  const [pause, setPause] = useState(false);
  const [catIndex, setCatIndex] = useState(0);

  const navItems = [
    "Find Trainers",
    "Workshops",
    "Corporate Solutions",
    "Join as Trainer",
  ];
const courseData = [
  {
    id: 1,
    title: "Advanced B2B Sales Mastery",
    provider: "Masterclass",
    type: "Course",
    rating: "4.9",
    image: "/Images/courses.png",
  },
  {
    id: 2,
    title: "Closing Techniques 101",
    provider: "Bootcamp",
    type: "Course",
    rating: "4.6",
    image: "/Images/courses.png",
  },
  {
    id: 3,
    title: "Negotiation Tactics for Enterprise",
    provider: "Specialization",
    type: "Course",
    rating: "5.0",
    image: "/Images/courses.png",
  },
  {
    id: 4,
    title: "Cold Calling Strategies",
    provider: "Workshop",
    type: "Course",
    rating: "4.7",
    image: "/Images/courses.png",
  },
];

  const categories = [
    { name: "AI Goal-Based", icon: Brain, color: "bg-orange-100 text-orange-600" },
    { name: "Soft Skills", icon: Mic, color: "bg-red-100 text-red-600" },
    { name: "Technical", icon: Monitor, color: "bg-blue-100 text-blue-600" },
    { name: "Leadership", icon: BarChart3, color: "bg-yellow-100 text-yellow-600" },
    { name: "Wellness", icon: Leaf, color: "bg-green-100 text-green-600" },
    { name: "Data Science", icon: Brain, color: "bg-purple-100 text-purple-600" },
    { name: "Communication", icon: Mic, color: "bg-pink-100 text-pink-600" },
    { name: "Management", icon: BarChart3, color: "bg-indigo-100 text-indigo-600" },
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
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [pause]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      <Navbar open={open} setOpen={setOpen} navItems={navItems} />

      {/* ━━━ HERO SECTION ━━━ */}
      <section className="w-full bg-gradient-to-br from-blue-50  to-purple-50 px-4 sm:px-8 md:px-16 py-8 md:py-14">

        {/* HERO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto">

          {/* LEFT TEXT */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Connect with{" "}
              <span className="text-blue-600">Expert Trainers</span>{" "}
              to Achieve Your Goals
            </h1>

            <p className="text-gray-500 mt-3 md:mt-4 text-sm md:text-lg">
              Personalized learning, live 1-on-1 sessions, and guidance from
              top-rated professionals.
            </p>

            {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5 md:mt-6">
  <input
    type="text"
    placeholder="What do you want to learn?"
    className="flex-1 min-w-0 px-4 sm:px-5 py-3 rounded-xl border border-gray-200 shadow-sm 
    text-sm md:text-base transition-all duration-200
    hover:border-blue-400 hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
  />

  <button className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-md 
    text-sm md:text-base whitespace-nowrap transition-all duration-200
    hover:bg-blue-700 hover:shadow-lg cursor-pointer active:scale-95">
    Find a Trainer →
  </button>
</div>

            {/* STATS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-5 md:mt-8">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 flex-shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">4.9/5 Rating</p>
                  <p className="text-xs text-gray-500">2,500+ reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">1,200+</p>
                  <p className="text-xs text-gray-500">Verified Experts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">50,000+</p>
                  <p className="text-xs text-gray-500">1-on-1 Sessions</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center md:justify-end order-1 md:order-2">
            <div className="absolute bg-blue-200 rounded-full blur-3xl opacity-30 w-40 h-40 md:w-72 md:h-72" />
            <Image
              src="/Images/hero.png"
              alt="Trainer"
              width={700}
              height={400}
              className="relative z-10 w-full max-w-[260px] sm:max-w-sm md:max-w-full h-auto"
            />
          </div>
        </div>

        {/* ━━━ CATEGORY SLIDER ━━━ */}
       <div className="mt-8 md:mt-14 max-w-7xl mx-auto">

  <div className="flex items-center gap-2 md:gap-3">

    {/* LEFT BUTTON (VISIBLE ON MOBILE ALSO) */}
    <button
      onClick={scrollCatLeft}
      className="flex-shrink-0 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 border border-gray-200"
    >
      <ChevronLeft size={18} />
    </button>

    {/* CATEGORY CONTAINER */}
    <div
      ref={categoryRef}
      className="flex gap-2 md:gap-3 overflow-hidden flex-1"
    >
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <div
            key={cat.name}
            className="
              flex items-center gap-2 md:gap-3 
              px-2 md:px-4 py-2 md:py-3 
              rounded-xl border bg-white shadow-sm 
              hover:shadow-md hover:border-blue-400 transition 
              flex-shrink-0 cursor-pointer

              /* 👇 IMPORTANT WIDTH CONTROL */
              w-[30%] sm:w-[30%] md:w-auto
            "
          >
            <div className={`p-1.5 md:p-2 rounded-lg ${cat.color}`}>
              <Icon size={14} />
            </div>
            <p className="font-medium text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
              {cat.name}
            </p>
          </div>
        );
      })}
    </div>

    {/* RIGHT BUTTON */}
    <button
      onClick={scrollCatRight}
      className="flex-shrink-0 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 border border-gray-200"
    >
      <ChevronRight size={18} />
    </button>

  </div>

  {/* DOTS */}
  <div className="flex justify-center mt-4 md:mt-5 gap-2">
    {[...Array(totalDots)].map((_, i) => (
      <div
        key={i}
        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
          i === catIndex ? "w-4 md:w-5 bg-blue-600" : "w-1.5 md:w-2 bg-gray-300"
        }`}
      />
    ))}
  </div>

</div>
      </section>
    
      <PopularCourses/>
      <YoutubeSection/>

    </div>
  );
};

export default Page;