"use client";

import { stats, testimonials } from "../data";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";

export const SocialProofSection = () => {
  return (
    <section className="relative bg-gray-50 py-28 px-6 lg:px-18 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#00C950]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats */}
        <Stats stats={stats} />

        {/* Testimonials */}
        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
};
