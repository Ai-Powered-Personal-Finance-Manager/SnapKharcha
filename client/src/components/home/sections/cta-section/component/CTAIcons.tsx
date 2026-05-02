import { Ban, Flag, Lock, Zap } from "lucide-react";

export const CTAIcons = () => {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-6 text-green-50 text-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {[
        { icon: Lock, label: "Bank-grade security" },
        { icon: Ban, label: "No credit card required" },
        { icon: Zap, label: "Setup in under 2 minutes" },
        { icon: Flag, label: "Built for Nepal" },
      ].map((badge, i) => (
        <div key={i} className="flex items-center gap-2">
          {typeof badge.icon === "string" ? (
            <span className="text-xs font-bold">{badge.icon}</span>
          ) : (
            <badge.icon size={16} className="text-green-500" />
          )}
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};
