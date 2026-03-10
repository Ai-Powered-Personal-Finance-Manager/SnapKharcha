"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
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
        ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00e5a0]/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0099ff]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#a855f7]/5 blur-[80px]" />
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 bg-green-100 text-green-500 text-xs font-semibold mb-8 animate-fade-in"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          AI-Powered Personal Finance · Final Year Project 2025
        </div>

        {/* Main Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black leading-[1.05] mb-6 max-w-5xl"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Your Money,{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-green-500">
              Understood
            </span>
            <span className="absolute inset-0 blur-2xl text-transparent bg-clip-text bg-green-500 opacity-40 select-none z-0">
              Understood
            </span>
          </span>{" "}
          by AI
        </h1>

        {/* Subheadline */}
        <p
          className="text-[#8888aa] text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Snap a bill, log an expense, or import your transactions — SnapKharcha categorizes, analyzes,
          and gives you <strong className="text-green-500 font-semibold">personalized financial insights</strong> in real time.
          Built for individuals and businesses alike.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/auth/register"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-xl shadow-[#00C950]/25 hover:shadow-[#00C950]/40 hover:scale-105"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Start Tracking Free
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#1e1e2e] text-black font-semibold text-sm hover:border-[#00C950]/40 hover:bg-[#00C950]/5 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg className="w-4 h-4 text-[#00C950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Demo
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="relative w-full max-w-5xl">
          {/* Glow under image */}
          <div className="absolute -inset-4 bg-gradient-to-b from-[#00e5a0]/10 to-transparent blur-2xl rounded-3xl pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-[#1e1e2e] shadow-2xl shadow-black/60">
            {/* Fake browser chrome */}
            <div className="bg-[#111118] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e2e]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="flex-1 mx-4 bg-[#1e1e2e] rounded-md px-3 py-1 text-xs text-[#44445a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                snapkharcha.com/dashboard
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop"
              alt="Finova AI Dashboard Preview"
              className="w-full object-cover object-top"
              style={{ maxHeight: "480px" }}
            />
            {/* Overlay gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
          </div>

          {/* Floating stat cards */}
          <div className="absolute -left-4 top-1/3 bg-[#111118] border border-[#1e1e2e] rounded-2xl p-4 shadow-xl hidden lg:block">
            <p className="text-[#8888aa] text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Monthly Savings</p>
            <p className="text-[#00C950] text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>₹12,400</p>
            <p className="text-[#00C950] text-xs flex items-center gap-1 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +18% from last month
            </p>
          </div>

          <div className="absolute -right-4 top-1/4 bg-[#111118] border border-[#1e1e2e] rounded-2xl p-4 shadow-xl hidden lg:block">
            <p className="text-[#8888aa] text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>AI Insights</p>
            <p className="text-white text-sm font-semibold max-w-[160px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              🍔 Food spending up 23% — consider meal planning
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex -space-x-3">
            {[
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1494790108755-2616b612b630?w=40&h=40&q=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&q=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80&fit=crop&crop=face",
            ].map((src, i) => (
              <img key={i} src={src} alt="user" className="w-9 h-9 rounded-full border-2 border-[#0a0a0f] object-cover" />
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1 text-[#fbbf24] text-sm mb-0.5">
              {"★★★★★"}
            </div>
            <p className="text-[#8888aa] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Loved by <strong className="text-black">2,000+</strong> beta users
            </p>
          </div>
          <div className="h-10 w-px bg-[#1e1e2e] hidden sm:block" />
          <div className="flex gap-6">
            {["Personal", "Business", "AI-Ready"].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5 text-[#8888aa] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-4 h-4 text-[#00ff15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}