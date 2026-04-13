"use client";

import { Star, CheckCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import hr from "./image/5-img.png";
import trainer from "./image/book-demo-girl.png";



import { Brain, Mic, Monitor, BarChart3, Leaf } from "lucide-react";

const Page = () => {
  const [open, setOpen] = useState(false);

  const scrollRef = useRef(null);
  const [pause, setPause] = useState(false);

  const navItems = [
    "Find Trainers",
    "Workshops",
    "Corporate Solutions",
    "Join as Trainer",
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
   const [index, setIndex] = useState(0);

  const itemsPerView = 4;
  const totalSlides = Math.ceil(categories.length / itemsPerView);

  const nextSlide = () => {
    if (index < totalSlides - 1) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
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
    scrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-sans bg-white min-h-screen">

      {/* ✅ Navbar Component */}
      <Navbar
        open={open}
        setOpen={setOpen}
        navItems={navItems}
        
      />
      
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50  md:px-16 py-10">
      
      {/* TOP HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-4">
        
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Connect with{" "}
            <span className="text-blue-600">Expert Trainers</span>{" "}
            to Achieve Your Goals
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Personalized learning, live 1-on-1 sessions, and guidance from
            top-rated professionals.
          </p>

          {/* SEARCH */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="flex-1 px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 transition">
              Find a Trainer →
            </button>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              <div>
                <p className="font-semibold text-gray-800">4.9/5 Rating</p>
                <p className="text-sm text-gray-500">2,500+ reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <div>
                <p className="font-semibold text-gray-800">1,200+</p>
                <p className="text-sm text-gray-500">Verified Experts</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <div>
                <p className="font-semibold text-gray-800">50,000+</p>
                <p className="text-sm text-gray-500">1-on-1 Sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-end ">
          <div className="absolute w-[320px] h-[320px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

          <Image
            src="/Images/hero.png"
            alt="Trainer"
            width={700}
            height={400}
            className="relative z-10 "
          />
        </div>
      </div>

      {/* 🔥 SCROLLABLE CATEGORIES (FULL WIDTH BELOW) */}
      <div className="mt-14 max-w-7xl mx-auto text-center">

      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Popular Categories
      </h3>

      {/* SLIDER ROW */}
      <div className="relative flex items-center justify-center">

        {/* LEFT BUTTON */}
        <button className="mr-3 bg-white shadow-md p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft />
        </button>

        {/* CARDS */}
        <div className="flex gap-4 px-10">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.name}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-white shadow-sm hover:shadow-md hover:border-blue-400 transition"
              >
                <div className={`p-2 rounded-lg ${cat.color}`}>
                  <Icon size={18} />
                </div>

                <p className="font-medium text-sm whitespace-nowrap">
                  {cat.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT BUTTON */}
        <button className="mr-3 bg-white shadow-md p-2 rounded-full hover:bg-gray-100">
          <ChevronRight />
        </button>
      </div>

      {/* 🔴 5 BLACK DOTS */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-black"
          />
        ))}
      </div>

    </div>

    </section>
      {/* HERO */}
      <div className="bg-linear-to-r from-blue-50 to-orange-50 py-12 px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
          I need a{" "}
          <span className="text-blue-600 font-bold">Data Science</span>{" "}
          trainer for <span className="font-bold">2 days</span> in{" "}
          <span className="font-bold">Hyderabad</span>
        </h2>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center bg-white border rounded-xl shadow-md w-full md:w-[600px] overflow-hidden">
            <input
              type="text"
              placeholder="I need a natural language search..."
              className="flex-1 px-4 py-3 outline-none text-sm md:text-base"
            />
            <button className="bg-blue-600 text-white px-4 py-4">
              <Search size={20} />
            </button>
          </div>
        </div>

       
      </div>

      {/* TRAINER CARDS */}
      <div className="px-4 md:px-8 py-10">
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Discovery Spotlight: Verified Top Performers
        </h3>

        <div
          className="relative group"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0.5 top-1/2 -translate-y-1/2 z-10 
            bg-white/90 backdrop-blur-md border border-gray-200 
            shadow-md px-3 py-2 rounded-lg 
            opacity-0 group-hover:opacity-100 
            pointer-events-none group-hover:pointer-events-auto
            hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0.5 top-1/2 -translate-y-1/2 z-10 
            bg-white/90 backdrop-blur-md border border-gray-200 
            shadow-md px-3 py-2 rounded-lg 
            opacity-0 group-hover:opacity-100 
            pointer-events-none group-hover:pointer-events-auto
            hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-hidden scroll-smooth"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="min-w-64 bg-white rounded-xl border border-gray-300 shadow-sm flex-shrink-0"
              >
                {/* <div className="relative">
                  <Image
                    src={trainer}
                    alt="trainer"
                    width={400}
                    height={300}
                    className="w-full h-56 md:h-64 object-cover object-top rounded-t-xl"
                  />
                  <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Star size={14} className="fill-current" />
                    Top Rated
                  </span>
                </div> */}

                <div className="p-4 space-y-2">
                  <h4 className="font-semibold">Dr. Arvinder Singh</h4>

                  <p className="text-xs text-gray-500">
                    15+ Yrs Leadership Experience | Ex-Google | EQ Certified
                  </p>

                  <div className="flex justify-between text-sm pt-2">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="fill-current  " />
                      4.9/5
                    </span>                    <span>500+ hrs</span>
                    <span>20+ Clients</span>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">
                      Check Availability
                    </button>
                    <button className="flex-1 border text-sm py-2 rounded-lg hover:bg-gray-100">
                      Brochure
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="px-4 md:px-8 py-10 bg-gray-50">
        <h3 className="text-xl md:text-2xl font-semibold mb-8">
          Corporate Edge Features
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Bulk Inquiry Tool</h4>
            <p className="text-sm text-gray-500">
              Raise and manage bulk training requests easily across domains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Vetted Profiles</h4>
            <p className="text-sm text-gray-500">
              Access verified trainers with proven experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="font-semibold mb-2">LMS Preview</h4>
            <p className="text-sm text-gray-500">
              Preview training modules and assessments.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page;