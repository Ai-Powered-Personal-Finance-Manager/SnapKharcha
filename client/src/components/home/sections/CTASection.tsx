"use client";

export const CTASection = () => {
  return (
    <section className="relative bg-[#01271E] py-28 px-6 overflow-hidden">
      {/* Dot grid on green */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#00b347]/40 blur-[80px] pointer-events-none" />
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-xs font-semibold mb-8 backdrop-blur-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Start Your Financial Journey Today
        </div>

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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="/register"
            className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-gray-900 text-white font-bold text-base hover:bg-gray-800 transition-all duration-200 shadow-2xl shadow-black/20 hover:scale-105"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Create Free Account
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="/register?type=business"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border-2 border-white/50 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            🏪 Start as Business
          </a>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-6 text-green-50 text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {[
            { icon: "🔒", label: "Bank-grade security" },
            { icon: "🚫", label: "No credit card required" },
            { icon: "⚡", label: "Setup in under 2 minutes" },
            { icon: "🇮🇳", label: "Built for India" },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
