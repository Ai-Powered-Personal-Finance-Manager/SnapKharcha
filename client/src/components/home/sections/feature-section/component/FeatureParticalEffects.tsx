export const FeatureParticalEffects = () => {
  return (
    <>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00C950]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00C950]/5 blur-[100px] pointer-events-none" />
      {/* Dot grid — white dots, low opacity for dark bg */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </>
  );
};
