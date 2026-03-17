import { PillBadge } from "../../../shared";
import { plans } from "../data";
import {
  PricingGridInterface,
  PricingMainInterface,
  ToggleInterface,
} from "../interface";

import { PricingCard } from "./PricingCard";

export const PricingMain = ({ setYearly, yearly }: PricingMainInterface) => {
  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <PillBadge
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#0284c7] bg-[#f0f9ff] border border-[#bae6fd] px-4 py-2 rounded-full mb-5"
          text="Pricing"
          spanClassName="w-1.5 h-1.5 rounded-full bg-[#0284c7]"
        />

        <h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Simple, <span className="text-[#00C950]">Transparent</span> Pricing
        </h2>
        <p
          className="text-gray-500 text-lg max-w-xl mx-auto mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Start free, upgrade when you're ready. No hidden fees, no surprises.
        </p>

        {/* Toggle */}
        <Toggle yearly={yearly} setYearly={setYearly} />
      </div>

      <PricingGrid yearly={yearly} />
      <p
        className="text-center text-gray-400 text-sm mt-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        All plans include a{" "}
        <strong className="text-gray-700">14-day free trial</strong>. No credit
        card required.
      </p>
    </div>
  );
};

const Toggle = ({ setYearly, yearly }: ToggleInterface) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-gray-100 border border-gray-200">
      <button
        onClick={() => setYearly(false)}
        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${!yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Monthly
      </button>
      <button
        onClick={() => setYearly(true)}
        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Yearly
        <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#f0fdf4] text-[#00C950] border border-[#bbf7d0]">
          -33%
        </span>
      </button>
    </div>
  );
};

const PricingGrid = ({ yearly }: PricingGridInterface) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan,idx) => (
        <PricingCard key={idx} plan={plan} yearly={yearly} />
      ))}
    </div>
  );
};
