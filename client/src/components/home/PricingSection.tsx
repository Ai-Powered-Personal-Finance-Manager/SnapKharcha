"use client";
import { useState } from "react";

const plans = [
  {
    name: "Personal Free",
    price: { monthly: "₹0", yearly: "₹0" },
    desc: "Perfect for getting started with personal expense tracking.",
    color: "#00C950",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    features: ["Up to 50 expense entries/month", "Bill snap (5 scans/month)", "Basic category breakdown", "Monthly summary report", "Mobile app access"],
    cta: "Get Started Free",
    href: "/register?plan=free",
    highlight: false,
  },
  {
    name: "Personal Pro",
    price: { monthly: "₹299", yearly: "₹199" },
    desc: "Unlimited tracking + AI insights for power users.",
    color: "#00C950",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    features: ["Unlimited expense entries", "Unlimited bill snaps", "AI-powered insights & forecasts", "Custom budget alerts", "Savings goals tracker", "Export to CSV/PDF", "Priority support"],
    cta: "Start Pro Trial",
    href: "/register?plan=pro",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: { monthly: "₹799", yearly: "₹599" },
    desc: "Full suite for shops, restaurants, and small businesses.",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    features: ["All Personal Pro features", "Customer invoice generation", "Sales & revenue analytics", "Inventory alerts", "Profit & Loss summaries", "Multi-staff access", "Dedicated onboarding"],
    cta: "Start Business Trial",
    href: "/register?plan=business",
    highlight: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative bg-white py-28 px-6 lg:px-18 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00C950]/5 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#0284c7] bg-[#f0f9ff] border border-[#bae6fd] px-4 py-2 rounded-full mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
            Simple,{" "}
            <span className="text-[#00C950]">Transparent</span>{" "}
            Pricing
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-gray-100 border border-gray-200">
            <button onClick={() => setYearly(false)} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${!yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Monthly
            </button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Yearly
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#f0fdf4] text-[#00C950] border border-[#bbf7d0]">-33%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.highlight ? "bg-[#01271E] shadow-2xl shadow-[#00C950]/25" : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100"}`}>
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <span className={`text-xs font-bold tracking-wider uppercase mb-3 block ${plan.highlight ? "text-green-100" : "text-gray-400"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {plan.name}
                </span>
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                    {yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly !== "₹0" && (
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-green-100" : "text-gray-400"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>/month</span>
                  )}
                </div>
                <p className={`text-sm ${plan.highlight ? "text-green-100" : "text-gray-500"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.desc}</p>
              </div>

              <div className={`h-px mb-6 ${plan.highlight ? "bg-green-400/40" : "bg-gray-100"}`} />

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className={`flex items-start gap-3 text-sm ${plan.highlight ? "text-green-50" : "text-gray-600"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-[#00C950]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <a href={plan.href} className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 ${plan.highlight ? "bg-white text-[#01271E] hover:bg-green-50 shadow-lg" : "bg-[#01271E] text-white hover:bg-[#023529] shadow-md shadow-[#00C950]/20"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          All plans include a <strong className="text-gray-700">14-day free trial</strong>. No credit card required.
        </p>
      </div>
    </section>
  );
}