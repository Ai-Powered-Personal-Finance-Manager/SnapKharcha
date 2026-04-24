"use client";
import { PillBadge } from "../../../shared";
import { useHeroSection } from "../hooks";
import { FinanceTicker } from "./FinanceTicker";
import { HeroCTA } from "./HeroCTA";
import { HeroDashboardPreview } from "./HeroDashboardPreview";
import { HeroFinanceBackground } from "./HeroFinanceBackground";
import { HeroHeadline } from "./HeroHeadline";
import { HeroParticalEffects } from "./HeroParticleEffects";
import { HeroSocials } from "./HeroSocials";

// Mini sparkline SVG helper
const Sparkline = ({ color = "#22c55e", points }: { color?: string; points: string }) => (
  <svg width="120" height="36" viewBox="0 0 120 36" className="mt-2">
    <polyline
      points={points}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeroSection = () => {
  const herosection = useHeroSection();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Particle Canvas */}
      {/* <HeroParticalEffects canvasRef={herosection.canvasRef} /> */}
      {/* Finance Chart Background — replaces particle canvas */}
      <HeroFinanceBackground />

      {/* ── Layer 1: Floating stat cards — positioned at section level ── */}
      {/* Card: Monthly Spend — left side, vertically centered */}
      {/* <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block
                      bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-md
                      animate-[float_6s_ease-in-out_infinite] min-w-[160px]">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Monthly Spend</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">₹24,850</p>
        <p className="text-xs font-semibold text-green-500 mt-0.5">↑ 12.4% vs last month</p>
        <Sparkline points="0,28 20,22 40,24 60,14 80,16 100,8 120,6" />
      </div> */}

      {/* Card: Savings Rate — right side, upper */}
      <div className="absolute right-6 top-[30%] z-10 hidden lg:block
                      bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-md
                      animate-[float_6s_ease-in-out_2s_infinite] min-w-[160px]">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Savings Rate</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">38.2%</p>
        <p className="text-xs font-semibold text-green-500 mt-0.5">↑ 5.1% this quarter</p>
        <Sparkline points="0,32 20,28 40,30 60,22 80,18 100,12 120,8" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <PillBadge text="AI-Powered Personal Finance · Final Year Project 2025" />

        {/* Main Headline */}
        <HeroHeadline />

        {/* CTA Buttons */}
        <HeroCTA />

        {/* Dashboard Preview */}
        <HeroDashboardPreview />

        {/* Social Proof */}
        <HeroSocials />
      </div>
      {/* Ticker — pinned to bottom of hero section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <FinanceTicker />
      </div>

      {/* Float keyframe */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};
