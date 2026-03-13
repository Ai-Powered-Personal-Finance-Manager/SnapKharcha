"use client";

import { steps } from "../data";
import { HowItWorksHeader } from "./HowItWorksHeader";
import { WorkingSteps } from "./WorkingSteps";

export const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative bg-gray-50 py-28 px-6 lg:px-18 overflow-hidden"
    >
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
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#00C950]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <HowItWorksHeader />

        <WorkingSteps steps={steps} />
      </div>
    </section>
  );
};
