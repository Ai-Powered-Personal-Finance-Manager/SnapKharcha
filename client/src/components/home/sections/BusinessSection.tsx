"use client";

const businessFeatures = [
  {
    icon: "🧾",
    title: "AI Bill Generation",
    desc: "Generate professional customer bills and invoices with your business branding in seconds.",
  },
  {
    icon: "📊",
    title: "Sales Analytics",
    desc: "Track daily, weekly, and monthly revenue. See top-selling items at a glance.",
  },
  {
    icon: "👥",
    title: "Customer Records",
    desc: "Maintain customer purchase histories and identify loyal customers.",
  },
  {
    icon: "📦",
    title: "Inventory Insights",
    desc: "Connect your stock to your sales data. Get alerts when items run low.",
  },
  {
    icon: "💹",
    title: "Profit & Loss Overview",
    desc: "Auto-generated P&L summaries monthly — no accountant needed for basic overviews.",
  },
  {
    icon: "🔔",
    title: "Smart Business Alerts",
    desc: "Get notified about unusual sales drops, high-expense days, or tax deadline reminders.",
  },
];

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
          <div className="flex-1 max-w-xl lg:sticky top-28">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#d97706] bg-[#d97706]/10 border border-[#d97706]/30 px-4 py-2 rounded-full mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
              For Business
            </span>

            <h2
              className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Not Just for <span className="text-[#00C950]">Individuals</span>
            </h2>

            <p
              className="text-gray-400 text-lg leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Restaurants, grocery shops, and retail stores can use SnapKharcha
              to generate customer bills, track revenue, and get AI-driven
              business insights — all from one clean dashboard.
            </p>

            {/* Business type cards */}
            <div className="space-y-3 mb-10">
              {[
                {
                  emoji: "🍽️",
                  label: "Restaurants & Cafés",
                  desc: "Bill customers, track food costs",
                },
                {
                  emoji: "🛒",
                  label: "Grocery & Retail Shops",
                  desc: "Inventory + sales in one place",
                },
                {
                  emoji: "🏪",
                  label: "Small Marts & Stores",
                  desc: "Daily revenue & expense tracking",
                },
              ].map((type, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#00C950]/40 hover:bg-[#00C950]/8 transition-all duration-200"
                >
                  <span className="text-2xl">{type.emoji}</span>
                  <div>
                    <p
                      className="text-white text-sm font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {type.label}
                    </p>
                    <p
                      className="text-gray-500 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {type.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/register?type=business"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#00C950] hover:bg-[#00b347] transition-all duration-200 hover:scale-105 shadow-lg shadow-[#00C950]/25"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Start as Business
                <svg
                  className="w-4 h-4"
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
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-gray-300 border border-white/10 hover:border-[#00C950]/50 hover:text-[#00C950] transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Compare Plans
              </a>
            </div>
          </div>

          {/* ── Right feature grid ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {businessFeatures.map((f, i) => (
              <div
                key={i}
                className="group p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-[#00C950]/40 hover:bg-[#00C950]/8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl block mb-3">{f.icon}</span>
                <h4
                  className="text-white font-bold text-sm mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {f.title}
                </h4>
                <p
                  className="text-gray-400 text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}

            {/* Image */}
            <div className="sm:col-span-2 rounded-2xl overflow-hidden border border-white/8 shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop"
                alt="Business dashboard"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01271E]/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-[#01271E]/80 backdrop-blur-sm text-[#00C950] border border-[#00C950]/30 shadow-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C950] animate-pulse" />
                  Business Dashboard Preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
