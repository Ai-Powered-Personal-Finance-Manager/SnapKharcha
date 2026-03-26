export const PricingHeader = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00C950]/5 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </>
  );
};
