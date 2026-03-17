import { FeatureDataInterface } from "../interface/featureInterface";

export const FeatureGrid = ({
  featuresData,
}: {
  featuresData: FeatureDataInterface[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {featuresData.map((feature, i) => (
        <div
          key={i}
          className="group relative bg-white/5 border border-white/8 rounded-2xl p-7 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Hover color wash */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top left, ${feature.iconBg}, transparent 70%)`,
            }}
          />

          {/* Icon */}
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: feature.iconBg,
              border: `1px solid ${feature.iconBorder}`,
              color: feature.color,
            }}
          >
            {feature.icon}
          </div>

          {/* Badge */}
          <span
            className="relative inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
            style={{
              backgroundColor: feature.badgeBg,
              color: feature.color,
              border: `1px solid ${feature.badgeBorder}`,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {feature.badge}
          </span>

          {/* Title */}
          <h3
            className="relative text-white text-lg font-bold mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className="relative text-gray-400 text-sm leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {feature.description}
          </p>

          {/* Bottom accent line on hover */}
          <div
            className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to right, transparent, ${feature.color}60, transparent)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
