"use client";

import { LeftStickySection } from "./LeftStickySection";
import { RightFeatureGrid } from "./RightFeatureGrid";

export const BusinessSection = () => {
  return (
    <section
      id="business"
      className="relative bg-[#01271E] py-28 px-6 lg:px-18 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#00C950]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00C950]/5 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* ── Left sticky content ── */}
          <LeftStickySection />

          {/* ── Right feature grid ── */}
          <RightFeatureGrid />
        </div>
      </div>
    </section>
  );
};
