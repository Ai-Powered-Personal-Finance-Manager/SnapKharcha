import { Logo } from "@/src/components/home/shared";

export const LeftPanel = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12 bg-[#01271E]">
      <Particles />

      {/* Logo */}
      <Logo isFooter />
      {/* Center */}
      <LeftPanelCenter />

      {/* Testimonial */}
      <Testimonial />
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
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#00C950]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-[#00C950]/6 blur-[80px] pointer-events-none" />
    </>
  );
};

const LeftPanelCenter = () => {
  return (
    <div className="relative z-10">
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00C950]/30 bg-[#00C950]/10 text-[#00C950] text-xs font-semibold mb-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C950] animate-pulse" />
        Join 2,000+ users already tracking
      </div>
      <h2
        className="text-4xl font-extrabold text-white leading-tight mb-4"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Your finances,{" "}
        <span className="text-[#00C950]">finally understood</span>
      </h2>
      <p
        className="text-gray-400 text-base leading-relaxed mb-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Set up takes less than 2 minutes. Start tracking your first expense
        today.
      </p>

      <div className="space-y-3.5">
        {[
          {
            icon: "📸",
            label: "Snap any bill — AI reads & categorizes it instantly",
          },
          { icon: "📊", label: "Visual dashboards updated in real time" },
          { icon: "🔔", label: "Smart alerts before you overspend" },
          { icon: "🏪", label: "Business mode for shops & restaurants" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-xl leading-none mt-0.5">{item.icon}</span>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5">
      <p
        className="text-gray-400 text-sm leading-relaxed mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        "SnapKharcha showed me I was spending Rs.11,000/month on things I didn't
        even remember buying. Changed my entire approach to money."
      </p>
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&q=80&fit=crop&crop=face"
          alt="user"
          className="w-8 h-8 rounded-full object-cover border border-white/10"
        />
        <div>
          <p
            className="text-white text-xs font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Arjun Kapoor
          </p>
          <p
            className="text-gray-500 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Software Engineer, Mumbai
          </p>
        </div>
        <div className="ml-auto text-[#fbbf24] text-xs">★★★★★</div>
      </div>
    </div>
  );
};
