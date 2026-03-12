"use client";

const stats = [
  {
    value: "2,000+",
    label: "Beta Users",
    color: "#00C950",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    value: "98%",
    label: "Categorization Accuracy",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    value: "₹4.2Cr+",
    label: "Expenses Tracked",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
  },
  {
    value: "3 sec",
    label: "Avg Bill Scan Time",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "College Student, Delhi",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b630?w=80&h=80&q=80&fit=crop&crop=face",
    text: "I had no idea I was spending ₹8,000/month on food delivery alone. SnapKharcha showed me in a pie chart and I actually changed my habits. Game changer.",
  },
  {
    name: "Rahul Mehta",
    role: "Freelance Developer, Pune",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&fit=crop&crop=face",
    text: "The bill snap feature is honestly magic. I just photograph my receipts and it figures out the category automatically. Saved me 20 mins of manual entry daily.",
  },
  {
    name: "Sunita Rao",
    role: "Restaurant Owner, Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=80&fit=crop&crop=face",
    text: "As a small restaurant owner, tracking daily revenue and expenses used to be a nightmare. The business dashboard gives me a clean daily summary every morning.",
  },
];

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group text-center p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
            >
              <p
                className="text-4xl font-extrabold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: stat.color, fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </p>
              <p
                className="text-gray-500 text-sm font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#00C950] bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-2 rounded-full mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C950]" />
            Testimonials
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-gray-900"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            People Love <span className="text-[#00C950]">SnapKharcha</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#00C950]/30 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <span
                className="absolute top-4 right-5 text-7xl font-bold leading-none pointer-events-none select-none text-gray-50 group-hover:text-[#00C950]/10 transition-colors duration-300"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                "
              </span>
              <p
                className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <p
                    className="text-gray-900 text-sm font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-gray-400 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t.role}
                  </p>
                </div>
                <div className="ml-auto text-[#fbbf24] text-xs">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
