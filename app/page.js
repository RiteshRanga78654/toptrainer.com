"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight , Star } from "lucide-react";
import Image from "next/image";

import Navbar from "./components/Navbar"; // 👈 import navbar
import hr from "./image/5-img.png";
import trainer from "./image/book-demo-girl.png";



import softskillsImg from "./image/soft skill.jpg";
import technicalImg from "./image/tech logo.jpg";
import leadershipImg from "./image/leadership logo.webp";
import salesImg from "./image/sales logo.png";
import wellnessImg from "./image/wellness logo.webp";

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
    {
      name: "Soft Skills",
      image: softskillsImg,
    },
    {
      name: "Technical",
      image: technicalImg,
    },
    {
      name: "Leadership",
      image: leadershipImg,
    },
    {
      name: "Sales",
      image: salesImg,
    },
    {
      name: "Wellness",
      image: wellnessImg,
    },
  ];

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
        hr={hr}
      />

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

     <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white px-6 py-4 rounded-xl shadow hover:shadow-md cursor-pointer transition flex flex-col items-center gap-3 w-32"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={50}
                height={50}
                className="object-contain h-12 w-12"
              />
              <p className="font-medium text-sm md:text-base text-center">
                {cat.name}
              </p>
            </div>
          ))}
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
                <div className="relative">
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
                </div>

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