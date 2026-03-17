"use client";

import { PillBadge } from "../../../shared";
import { CTAButtons } from "./CTAButtons";
import { CTAIcons } from "./CTAIcons";
import { CTAParticles } from "./CTAParticles";

export const CTASection = () => {
  return (
    <section className="relative bg-[#01271E] py-28 px-6 overflow-hidden">
      {/* Dot grid on green */}
      <CTAParticles />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <PillBadge
          text=" Start Your Financial Journey Today"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-xs font-semibold mb-8 backdrop-blur-sm"
          spanClassName="w-2 h-2 rounded-full bg-white animate-pulse"
        />

        <h2
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Take Control of Your <span className="text-green-500">Finances</span>{" "}
          Today
        </h2>

        <p
          className="text-green-50 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Join thousands of users who've already transformed how they manage
          money. Free to start. Upgrade when you're ready.
        </p>

        <CTAButtons />

        <CTAIcons />
      </div>
    </section>
  );
};
