"use client";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up as a Personal User or Business User. Personal users track individual finances. Business users get invoice generation, customer billing, and sales analytics on top.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&auto=format&fit=crop",
    color: "#00C950",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    step: "02",
    title: "Log or Snap Your Expenses",
    description:
      "Add expenses manually with categories, or simply snap a photo of your bill. Our AI model reads the receipt and auto-fills category, amount, date, and merchant name.",
    image:
      "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?w=600&q=80&auto=format&fit=crop",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    step: "03",
    title: "Set Budgets & Goals",
    description:
      "Define monthly budget limits per category. Set savings goals — vacation, gadget, emergency fund. SnapKharcha tracks your progress and nudges you when you drift off track.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
  },
  {
    step: "04",
    title: "Get AI-Powered Insights",
    description:
      "SnapKharcha's AI engine analyzes your patterns and surfaces actionable insights — spending trends, anomalies, predictive forecasts, and personalized saving recommendations.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
];

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
        <div className="text-center mb-20">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#7c3aed] bg-[#faf5ff] border border-[#ddd6fe] px-4 py-2 rounded-full mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
            User Flow
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            From Sign Up to{" "}
            <span className="text-[#00C950]">Financial Clarity</span>
          </h2>
          <p
            className="text-gray-500 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            A clean, intuitive journey — start in minutes, gain meaningful
            insights within days.
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 max-w-lg">
                <div className="flex items-start gap-5">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-sm"
                    style={{
                      backgroundColor: step.bg,
                      color: step.color,
                      border: `1px solid ${step.border}`,
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <h3
                      className="text-gray-900 text-2xl font-bold mb-3"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-gray-500 text-base leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 w-full max-w-xl">
                <div className="relative group">
                  <div
                    className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ backgroundColor: step.color, opacity: 0 }}
                  />
                  <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
                    <div
                      className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm shadow-sm"
                      style={{
                        color: step.color,
                        border: `1px solid ${step.border}`,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: step.color }}
                      />
                      Step {step.step}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
