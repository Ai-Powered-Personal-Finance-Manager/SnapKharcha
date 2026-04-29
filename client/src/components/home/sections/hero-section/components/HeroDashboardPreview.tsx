"use client";

import Image from "next/image";

export const HeroDashboardPreview = () => {
  return (
    <div className="relative w-full max-w-5xl">
      {/* Glow under image */}
      <div className="absolute -inset-4 bg-gradient-to-b from-[#00e5a0]/10 to-transparent blur-2xl rounded-3xl pointer-events-none" />

      <div className="relative rounded-2xl overflow-hidden border border-[#1e1e2e] shadow-2xl shadow-black/60">
        {/* Fake browser chrome */}
        <div className="bg-[#111118] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e2e]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div
            className="flex-1 mx-4 bg-[#1e1e2e] rounded-md px-3 py-1 text-xs text-[#44445a]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            snapkharcha.com/dashboard
          </div>
        </div>
        <Image
          src="/dashboard.png"
          alt="Finova AI Dashboard Preview"
          height={1000}
          width={1000}
          loading="eager"
          className="w-full object-cover object-top"
          style={{ maxHeight: "480px" }}
        />
        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
      </div>

      {/* Floating stat cards */}
      <div className="absolute -left-4 top-1/3 bg-[#111118] border border-[#1e1e2e] rounded-2xl p-4 shadow-xl hidden lg:block">
        <p
          className="text-[#8888aa] text-xs mb-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Monthly Savings
        </p>
        <p
          className="text-[#00C950] text-2xl font-bold"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          ₹12,400
        </p>
        <p
          className="text-[#00C950] text-xs flex items-center gap-1 mt-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          +18% from last month
        </p>
      </div>

      <div className="absolute -right-4 top-1/4 bg-[#111118] border border-[#1e1e2e] rounded-2xl p-4 shadow-xl hidden lg:block">
        <p
          className="text-[#8888aa] text-xs mb-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          AI Insights
        </p>
        <p
          className="text-white text-sm font-semibold max-w-[160px]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          🍔 Food spending up 23% — consider meal planning
        </p>
      </div>
    </div>
  );
};
