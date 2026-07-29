"use client";

import React, { useState, useEffect } from "react";

export default function WelcomeScreen({ onComplete }) {
  // 4-phase state machine: enter -> hold -> exit -> done
  const [phase, setPhase] = useState("enter"); 

  useEffect(() => {
    // 1. Kick off the enter animations shortly after mount
    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 50);

    // 2. Start exit animation (fade out the entire screen) after ~2.8 seconds
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2800);

    // 3. Unmount completely after ~3.8 seconds
    const doneTimer = setTimeout(() => {
      setPhase("done");
      if (onComplete) {
        onComplete();
      }
    }, 3800);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  // Phase 'done': Component unmounts
  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle film grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      ></div>

      {/* Elegant corner accents */}
      <div className="absolute top-8 left-8 w-8 h-8 md:w-12 md:h-12 border-t border-l border-white/20"></div>
      <div className="absolute top-8 right-8 w-8 h-8 md:w-12 md:h-12 border-t border-r border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 md:w-12 md:h-12 border-b border-l border-white/20"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 md:w-12 md:h-12 border-b border-r border-white/20"></div>

      {/* Centered Text Elements */}
      <div className="relative flex flex-col items-center text-center">
       
        {/* Line 1 */}
        <h1
          className={`text-white font-semibold uppercase tracking-[0.2em] text-md md:text-4xl  mb-5 transition-all duration-700 ease-out ${
            phase === "enter"
              ? "opacity-0 translate-y-6"
              : "opacity-100 translate-y-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          Stop Searching. Start Filtering#.
        </h1>

        {/* Decorative Line */}
        <div
          className={`h-[1px] bg-white/40 mb-5 transition-all duration-700 ease-out ${
            phase === "enter" ? "w-0 opacity-0" : "w-16 md:w-24 opacity-100"
          }`}
          style={{ transitionDelay: "700ms" }}
        ></div>

        {/* Tagline */}
        <p
          className={`text-white uppercase tracking-[0.4em] text-sm md:text-xl transition-all duration-700 ease-out ${
            phase === "enter"
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          Discover Experienced Trainers
        </p>
      </div>
    </div>
  );
}
