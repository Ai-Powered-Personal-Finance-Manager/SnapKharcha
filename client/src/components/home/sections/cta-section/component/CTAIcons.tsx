export const CTAIcons = () => {
  return (
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
  );
};
