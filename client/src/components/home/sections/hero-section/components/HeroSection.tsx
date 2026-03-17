"use client";
import { PillBadge } from "../../../shared";
import { useHeroSection } from "../hooks";
import { HeroCTA } from "./HeroCTA";
import { HeroDashboardPreview } from "./HeroDashboardPreview";
import { HeroHeadline } from "./HeroHeadline";
import { HeroParticalEffects } from "./HeroParticleEffects";
import { HeroSocials } from "./HeroSocials";

export const HeroSection = () => {
  const herosection = useHeroSection();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Particle Canvas */}
      <HeroParticalEffects canvasRef={herosection.canvasRef} />

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
    </section>
  );
};
