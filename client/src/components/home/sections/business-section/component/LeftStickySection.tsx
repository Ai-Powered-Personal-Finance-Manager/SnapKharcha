import { PillBadge } from "../../../shared";
import { businessTypeCardData } from "../data/businessTypeCardData";
import { businessTypeCardDataInterface } from "../interface";

export const LeftStickySection = () => {
  return (
    <div className="flex-1 lg:max-w-xl max-lg:w-full lg:sticky top-28">
      <PillBadge
        text="For Business"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#d97706] bg-[#d97706]/10 border border-[#d97706]/30 px-4 py-2 rounded-full mb-5"
        spanClassName="w-1.5 h-1.5 rounded-full bg-[#d97706]"
      />

      <LeftSectionHeader />

      {/* Business type cards */}
      <BusinessTypeCard data={businessTypeCardData} />

      <LeftCTA />
    </div>
  );
};

const LeftSectionHeader = () => {
  return (
    <>
      <h2
        className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Not Just for <span className="text-[#00C950]">Individuals</span>
      </h2>

      <p
        className="text-gray-400 text-lg leading-relaxed mb-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Restaurants, grocery shops, and retail stores can use SnapKharcha to
        generate customer bills, track revenue, and get AI-driven business
        insights — all from one clean dashboard.
      </p>
    </>
  );
};

const BusinessTypeCard = ({ data }: businessTypeCardDataInterface) => {
  return (
    <div className="space-y-3 mb-10 w-full">
      {data.map((type, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#00C950]/40 hover:bg-[#00C950]/8 transition-all duration-200  w-full"
        >
          <span className="text-2xl">{type.emoji}</span>
          <div>
            <p
              className="text-white text-sm font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {type.label}
            </p>
            <p
              className="text-gray-500 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {type.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const LeftCTA = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="/register?type=business"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#00C950] hover:bg-[#00b347] transition-all duration-200 hover:scale-105 shadow-lg shadow-[#00C950]/25"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Start as Business
        <svg
          className="w-4 h-4"
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
      </a>
      <a
        href="#pricing"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-gray-300 border border-white/10 hover:border-[#00C950]/50 hover:text-[#00C950] transition-all duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Compare Plans
      </a>
    </div>
  );
};
