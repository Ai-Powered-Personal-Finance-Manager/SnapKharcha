"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NotFoundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }[] = [];
    const colors = ["#00C950", "#00b347", "#34d399", "#00C950", "#bbf7d0"];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,201,80,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const quickLinks = [
    {
      label: "Go Home",
      href: "/",
      icon: "🏠",
      color: "#00C950",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      label: "Sign In",
      href: "/login",
      icon: "🔑",
      color: "#0284c7",
      bg: "#f0f9ff",
      border: "#bae6fd",
    },
    {
      label: "Sign Up",
      href: "/register",
      icon: "✨",
      color: "#7c3aed",
      bg: "#faf5ff",
      border: "#ddd6fe",
    },
    {
      label: "Features",
      href: "/#features",
      icon: "⚡",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden px-6 py-10">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Light dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Green glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-[#00C950]/6 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#00C950]/4 blur-[80px]" />
        <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#00C950]/3 blur-[70px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-14 group">
          <div className="w-9 h-9 rounded-xl bg-[#00C950] flex items-center justify-center shadow-lg shadow-[#00C950]/25 group-hover:shadow-[#00C950]/40 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-gray-900 font-bold text-xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Snap<span className="text-[#00C950]">Kharcha</span>
          </span>
        </Link>

        {/* Big 404 with glitch */}
        <div className="relative mb-6 select-none">
          {/* Shadow/echo layer */}
          <p
            className="absolute inset-0 text-[9rem] sm:text-[12rem] font-extrabold leading-none pointer-events-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,201,80,0.08)",
              filter: "blur(6px)",
              transform: "translate(3px, 3px)",
            }}
          >
            404
          </p>

          {/* Main 404 */}
          <p
            className="relative text-[9rem] sm:text-[12rem] font-extrabold leading-none transition-all duration-75"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "transparent",
              WebkitTextStroke: "2px rgba(0,201,80,0.25)",
              backgroundImage:
                "linear-gradient(135deg, #01271E 0%, #00C950 50%, #01271E 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: glitching
                ? "drop-shadow(3px 0 0 #00C950) drop-shadow(-3px 0 0 #01271E)"
                : "none",
              transform: glitching
                ? `translate(${Math.random() * 4 - 2}px, 0)`
                : "none",
            }}
          >
            404
          </p>

          {/* Glitch slice overlays */}
          {glitching && (
            <>
              <p
                className="absolute inset-0 text-[9rem] sm:text-[12rem] font-extrabold leading-none pointer-events-none overflow-hidden"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#00C950",
                  opacity: 0.25,
                  clipPath: "polygon(0 28%, 100% 28%, 100% 42%, 0 42%)",
                  transform: "translate(-5px, 0)",
                }}
              >
                404
              </p>
              <p
                className="absolute inset-0 text-[9rem] sm:text-[12rem] font-extrabold leading-none pointer-events-none overflow-hidden"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#01271E",
                  opacity: 0.2,
                  clipPath: "polygon(0 58%, 100% 58%, 100% 70%, 0 70%)",
                  transform: "translate(5px, 0)",
                }}
              >
                404
              </p>
            </>
          )}
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] text-[#00C950] text-xs font-semibold mb-5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00C950] animate-pulse" />
          Page Not Found
        </div>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Looks like this page{" "}
          <span className="text-[#00C950]">went off-budget</span>
        </h1>

        <p
          className="text-gray-500 text-base leading-relaxed mb-10 max-w-md"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          The page you're looking for doesn't exist, was moved, or maybe you
          mistyped the URL. Either way — we've got plenty of other places to be.
        </p>

        {/* Quick links */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              Hover tint
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{ backgroundColor: link.bg }}
              />
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: link.bg, border: `1px solid ${link.border}` }}
              >
                {link.icon}
              </div>
              <span
                className="relative text-xs font-semibold text-gray-500 group-hover:text-gray-800 transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </span>
              Bottom accent
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300 rounded-full"
                style={{ backgroundColor: link.color }}
              />
            </Link>
          ))}
        </div> */}

        {/* Primary CTA */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#00C950] text-white font-bold text-sm hover:bg-[#00b347] transition-all duration-200 hover:scale-105 shadow-xl shadow-[#00C950]/25 hover:shadow-[#00C950]/35"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Goto Home
        </Link>

        {/* Footer note */}
        <p
          className="text-gray-400 text-xs mt-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Still lost?{" "}
          <a
            href="mailto:support@snapkharcha.com"
            className="text-[#00C950] hover:underline font-medium"
          >
            Contact support
          </a>{" "}
          · Error code: 404
        </p>
      </div>
    </div>
  );
}
