import { LinkButton } from "../../../shared";

export const CTAButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <LinkButton
        href="/register"
        label="Create Free Account"
        className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-[#00C950] text-white hover:text-white font-bold text-base hover:bg-[#00C950]/80 transition-all duration-200 shadow-2xl shadow-black/20 hover:scale-105"
        children={
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
        label="Start as Business"
        href="/register?type=business"
        className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border-2 border-white/50 text-white font-semibold text-base hover:bg-white/10 hover:text-white hover:border-white transition-all duration-200"
      />
    </div>
  );
};
