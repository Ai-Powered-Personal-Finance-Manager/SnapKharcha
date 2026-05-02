export const HeroHeadline = () => {
  return (
    <>
      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black leading-tight mb-6 max-w-5xl"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Your Money,{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-green-500">Understood</span>
          <span className="absolute inset-0 blur-2xl text-transparent bg-clip-text bg-green-500 opacity-40 select-none z-0">
            Understood
          </span>
        </span>{" "}
        by AI
      </h1>

      {/* Subheadline */}
      <p
        className="text-[#8888aa] text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Snap a bill, log an expense, or import your transactions. SnapKharcha
        categorizes, analyzes, and gives you{" "}
        <strong className="text-green-500 font-semibold">
          personalized financial insights
        </strong>{" "}
        in real time. Built for individuals and businesses alike.
      </p>
    </>
  );
};
