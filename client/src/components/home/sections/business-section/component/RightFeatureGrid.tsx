import { businessFeaturesData } from "../data";

export const RightFeatureGrid = () => {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {businessFeaturesData.map((f, i) => (
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
  );
};
