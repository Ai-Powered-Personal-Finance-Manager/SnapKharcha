import { LinkButton } from "../../../shared";

export const HeroCTA = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-16">
      <LinkButton
        href="/auth/register"
        label="Start Tracking Free"
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-xl shadow-[#00C950]/25 hover:shadow-[#00C950]/40 hover:scale-105"
        children={
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        }
      />

      <LinkButton
        href="#demo"
        dir="rtl"
        label="Watch Demo"
        children={
          <svg
            className="w-4 h-4 text-[#00C950]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#1e1e2e] text-black font-semibold text-sm hover:border-[#00C950]/40 hover:bg-[#00C950]/5 transition-all duration-300"
      />
    </div>
  );
};
