"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ------------------ DATA ------------------ */
const ARTICLES = [
  {
    image: "/articleSection/image1.jpg",
  },
];

/* ------------------ ORBS ------------------ */
const ORBS = [
  { x: 15, y: 20, size: 260, color: "167,139,250", depth: 0.04 },
  { x: 75, y: 65, size: 200, color: "99,102,241", depth: 0.06 },
  { x: 50, y: 10, size: 180, color: "139,92,246", depth: 0.03 },
  { x: 85, y: 30, size: 150, color: "196,181,253", depth: 0.07 },
  { x: 10, y: 75, size: 140, color: "129,140,248", depth: 0.05 },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const currentMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();

      targetMouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.06);
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.06);

      setMouse({ ...currentMouse.current });
      rafRef.current = requestAnimationFrame(animate);
    };

    section.addEventListener("mousemove", handleMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const px = (d) => (mouse.x - 0.5) * d * 100;
  const py = (d) => (mouse.y - 0.5) * d * 100;

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.6s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg,#eef2ff 0%,#f5f3ff 50%,#eef2ff 100%)",

        /* ✅ RESPONSIVE PADDING */
        padding: "clamp(40px, 6vw, 80px) clamp(20px, 5vw, 60px)",

        display: "grid",

        /* ✅ RESPONSIVE GRID */
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",

        alignItems: "center",
        gap: "clamp(30px, 4vw, 60px)",
        position: "relative",
        overflow: "hidden",
        minHeight: 560,
      }}
    >
      {/* Spotlight */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent)",
          left: `calc(${mouse.x * 100}% - 250px)`,
          top: `calc(${mouse.y * 100}% - 250px)`,
          pointerEvents: "none",
        }}
      />

      {/* ORBS */}
      {ORBS.map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",

            /* ✅ RESPONSIVE ORB SIZE */
            width: "clamp(80px, 10vw, " + o.size + "px)",
            height: "clamp(80px, 10vw, " + o.size + "px)",

            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${o.color},0.2), transparent)`,

            left: `calc(${o.x}% + ${px(o.depth)}px)`,
            top: `calc(${o.y}% + ${py(o.depth)}px)`,
          }}
        />
      ))}

      {/* ================= LEFT ================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* BADGE */}
        <div style={{ ...fadeUp(0), fontSize: "clamp(10px, 1.2vw, 11px)" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
              marginRight: 8,
            }}
          />
          1,200+ EXPERTS ONLINE NOW
        </div>

        {/* HEADINGS */}
        <div style={fadeUp(0.1)}>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Connect with
          </h1>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg,#3B82F6,#7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Expert Articles
            </span>{" "}
            to Grow
          </h1>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Your Knowledge
          </h1>
        </div>

        {/* DESCRIPTION */}
        <p
          style={{
            fontSize: "clamp(13px, 1.5vw, 15px)",
            color: "#6b7280",
            lineHeight: 1.75,
            maxWidth: 440,
            margin: 0,
            ...fadeUp(0.2),
          }}
        >
          Personalized reading guides, expert-curated articles, and top-rated content on health,
          finance, and wellbeing.
        </p>
      </div>

      {/* ================= RIGHT ================= */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",

            /* ✅ RESPONSIVE HEIGHT */
            height: "clamp(220px, 40vw, 350px)",
          }}
        >
          <Image
            src={ARTICLES[0].image}
            alt="hero"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* FLOATING BADGE */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: "-10px",

            fontSize: "clamp(10px, 1.2vw, 14px)",

            background: "white",
            padding: "10px 16px",
            borderRadius: 20,
            fontWeight: 600,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          🟢 Live Session Active
        </div>
      </div>
    </section>
  );
}