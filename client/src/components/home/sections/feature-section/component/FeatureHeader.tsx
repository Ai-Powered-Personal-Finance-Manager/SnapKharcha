export const FeatureHeader = () => {
  return (
    <div className="text-center mb-16">
      <span
        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#00C950] bg-[#00C950]/10 border border-[#00C950]/25 px-4 py-2 rounded-full mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C950]" />
        Core Features
      </span>
      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Everything You Need to{" "}
        <span className="text-[#00C950]">Master Your Money</span>
      </h2>
      <p
        className="text-gray-400 text-lg max-w-2xl mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        From snapping bills to deep financial forecasting — SnapKharcha brings
        together the tools that actually make a difference in your financial
        life.
      </p>
    </div>
  );
};
