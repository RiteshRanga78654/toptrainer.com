"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── Orbs ─── */
const ORBS = [
  { x: 8,  y: 18, size: 300, color: "167,139,250", depth: 0.28 },
  { x: 72, y: 62, size: 240, color: "99,102,241",  depth: 0.48 },
  { x: 48, y: 5,  size: 200, color: "139,92,246",  depth: 0.2  },
  { x: 82, y: 25, size: 180, color: "196,181,253", depth: 0.58 },
  { x: 5,  y: 72, size: 160, color: "129,140,248", depth: 0.38 },
];

/* ─── Feature items ─── */
const FEATURES = [
  {
    iconPath: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </>
    ),
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
    stat: "5,000+",
    label: "Expert Articles",
  },
  {
    iconPath: (
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    ),
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    stat: "All in One Place",
    label: "Topics across multiple domains.",
  },
  {
    iconPath: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </>
    ),
    iconBg: "#d1fae5",
    iconColor: "#059669",
    stat: "Expert Voices",
    label: "Insights from verified professionals.",
  },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse]     = useState({ x: 0.5, y: 0.5 });

  const sectionRef   = useRef(null);
  const rafRef       = useRef(null);
  const targetMouse  = useRef({ x: 0.5, y: 0.5 });
  const currentMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      targetMouse.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.16);
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.16);
      setMouse({ ...currentMouse.current });
      rafRef.current = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const px = (d) => (mouse.x - 0.5) * d * 120;
  const py = (d) => (mouse.y - 0.5) * d * 120;

  const fadeUp = (delay = 0) => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <div className="w-full max-w-8xl mx-auto" style={{ fontFamily: "var(--font-geist-sans)" }}>
      <section
        ref={sectionRef}
        style={{
          background: "linear-gradient(135deg,#eef2ff 0%,#f5f3ff 55%,#eef2ff 100%)",
          padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          alignItems: "center",
          gap: "clamp(40px,5vw,72px)",
          position: "relative",
          overflow: "hidden",
          minHeight: 600,
        }}
      >
        {/* ── Spotlight ── */}
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)",
            left: `calc(${mouse.x * 100}% - 280px)`,
            top:  `calc(${mouse.y * 100}% - 280px)`,
            pointerEvents: "none",
          }}
        />

        {/* ── Orbs ── */}
        {ORBS.map((o, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width:    `clamp(80px,10vw,${o.size}px)`,
              height:   `clamp(80px,10vw,${o.size}px)`,
              borderRadius: "50%",
              background: `radial-gradient(circle,rgba(${o.color},0.2),transparent 70%)`,
              left: `calc(${o.x}% + ${px(o.depth)}px)`,
              top:  `calc(${o.y}% + ${py(o.depth)}px)`,
              pointerEvents: "none",
              transition: "left 0.08s ease-out, top 0.08s ease-out",
            }}
          />
        ))}

        {/* ════════════════ LEFT ════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Expert badge pill */}
          <div style={fadeUp(0)}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "white",
                border: "1px solid #e0e7ff",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "#374151",
                boxShadow: "0 2px 8px rgba(99,102,241,0.1)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
                }}
              />
              1,200+ EXPERTS ONLINE NOW
            </span>
          </div>

          {/* Main heading */}
          <div style={fadeUp(0.08)}>
            <h1
              style={{
                fontSize: "clamp(36px,5.5vw,62px)",
                fontWeight: 900,
                lineHeight: 1.06,
                margin: 0,
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              Learn. Explore.
              <br />
              Grow with
              <br />
              <span
                style={{
                  background: "linear-gradient(100deg,#3B82F6 20%,#7C3AED 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Expert Articles.
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(14px,1.6vw,16px)",
              color: "#6b7280",
              lineHeight: 1.75,
              maxWidth: 460,
              margin: 0,
              ...fadeUp(0.16),
            }}
          >
            Discover insightful, well-researched articles from industry experts to help you make smarter
            decisions and stay ahead.
          </p>

          {/* ── Feature row ── */}
          <div
            style={{
              display: "flex",
              gap: 0,
              ...fadeUp(0.24),
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
                  flex: 1,
                  paddingRight: i < FEATURES.length - 1 ? 24 : 0,
                  paddingLeft:  i > 0 ? 24 : 0,
                  borderLeft: i > 0 ? "1px solid #e2e8f0" : "none",
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: f.iconBg,
                    color: f.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {f.iconPath}
                  </svg>
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.3,
                    }}
                  >
                    {f.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#9ca3af",
                      lineHeight: 1.5,
                      marginTop: 3,
                    }}
                  >
                    {f.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Stay Ahead banner ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "white",
              border: "1px solid #e0e7ff",
              borderRadius: 16,
              padding: "14px 20px",
              boxShadow: "0 2px 12px rgba(99,102,241,0.08)",
              maxWidth: 460,
              ...fadeUp(0.32),
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#ede9fe",
                color: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                Stay Ahead. Always.
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
                Fresh perspectives. Trusted sources. Smarter every day.
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ RIGHT ════════════════ */}
        <div style={{ position: "relative", zIndex: 1, ...fadeUp(0.1) }}>
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              boxShadow:
                "0 28px 70px rgba(99,102,241,0.18), 0 8px 24px rgba(0,0,0,0.1)",
              position: "relative",
              height: "clamp(280px,42vw,480px)",
              background: "#f1f5f9",
            }}
          >
            <Image
              src="/articleSection/image1.jpg"
              alt="Latest articles preview on laptop"
              fill
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Live badge — inside overflow:hidden, no corner gap */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "white",
                padding: "9px 16px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 13,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                whiteSpace: "nowrap",
                color: "#111827",
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Live Session Active
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}