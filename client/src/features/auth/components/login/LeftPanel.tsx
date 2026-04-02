"use client";
import { Logo } from "@/src/components/home/shared";
import { LeftPanelInterface } from "../../interface/login";

export const LeftPanel = ({ data }: LeftPanelInterface) => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12 bg-[#01271E]">
      {/* Dot grid */}
      <Particles />

      <Logo isFooter />
      {/* Center content */}
      <div className="relative z-10">
        <h2
          className="text-4xl font-extrabold text-white leading-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Welcome back.{" "}
          <span className="text-[#00C950]">Your finances missed you.</span>
        </h2>
        <p
          className="text-gray-400 text-base leading-relaxed mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Sign in to check your spending insights, review budgets, and stay on
          track with your goals.
        </p>

        {/* Mini Dashboard */}
        <MiniDashboard />

        {/* Recent Activity */}
        <RecentActivity data={data} />
      </div>

      {/* Bottom note */}
      <BottomNote />
    </div>
  );
};

const Particles = () => {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#00C950]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 rounded-full bg-[#00C950]/6 blur-[80px] pointer-events-none" />
    </>
  );
};

const MiniDashboard = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p
            className="text-gray-400 text-xs mb-0.5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            This Month's Spending
          </p>
          <p
            className="text-white text-3xl font-extrabold"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ₹14,230
          </p>
        </div>
        <div className="text-right">
          <p
            className="text-gray-400 text-xs mb-0.5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Budget Left
          </p>
          <p
            className="text-[#00C950] text-xl font-bold"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ₹5,770
          </p>
        </div>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
        <div className="h-full rounded-full bg-[#00C950] w-[71%] transition-all duration-700" />
      </div>
      <p
        className="text-gray-500 text-xs"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        71% of ₹20,000 budget used
      </p>
    </div>
  );
};

const RecentActivity = ({ data }: LeftPanelInterface) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p
        className="text-white text-xs font-bold mb-3 uppercase tracking-wider"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Recent Activity
      </p>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{ backgroundColor: `${item.color}15` }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-white text-xs font-semibold truncate"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.label}
              </p>
              <p
                className="text-gray-500 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.time}
              </p>
            </div>
            <span
              className="text-xs font-bold"
              style={{
                color: item.color,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BottomNote = () => {
  return (
    <div className="relative z-10 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-[#00C950] animate-pulse" />
      <p
        className="text-gray-500 text-xs"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        All data encrypted with AES-256 · Bank-grade security
      </p>
    </div>
  );
};
