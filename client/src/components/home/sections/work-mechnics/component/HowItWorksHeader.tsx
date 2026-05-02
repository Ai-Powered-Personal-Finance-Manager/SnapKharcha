import { PillBadge } from "../../../shared";

export const HowItWorksHeader = () => {
  return (
    <div className="text-center mb-20">
      <PillBadge
        text="User Flow"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#7c3aed] bg-[#faf5ff] border border-[#ddd6fe] px-4 py-2 rounded-full mb-5"
        spanClassName="w-1.5 h-1.5 rounded-full bg-[#7c3aed]"
      />

      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-5 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        From Sign Up to{" "}
        <span className="text-[#00C950]">Financial Clarity</span>
      </h2>
      <p
        className="text-gray-500 text-lg max-w-xl mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        A clean, intuitive journey start in minutes, gain meaningful insights
        within days.
      </p>
    </div>
  );
};
