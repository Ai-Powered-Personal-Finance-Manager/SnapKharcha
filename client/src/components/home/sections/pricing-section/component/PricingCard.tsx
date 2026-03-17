import { PricingCardInterface, PricingHeaderInterface } from "../interface";

export const PricingCard = ({ plan, yearly }: PricingCardInterface) => {
  return (
    <div
      key={plan.name}
      className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.highlight ? "bg-[#01271E] shadow-2xl shadow-[#00C950]/25" : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100"}`}
    >
      {plan.badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {plan.badge}
        </div>
      )}

      <PricingHeader plan={plan} yearly={yearly} />

      <div
        className={`h-px mb-6 ${plan.highlight ? "bg-green-400/40" : "bg-gray-100"}`}
      />

      {/* feature list */}
      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((feat, j) => (
          <li
            key={j}
            className={`flex items-start gap-3 text-sm ${plan.highlight ? "text-green-50" : "text-gray-600"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-[#00C950]"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      <a
        href={plan.href}
        className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 ${plan.highlight ? "bg-white text-[#01271E] hover:bg-green-50 shadow-lg" : "bg-[#01271E] text-white hover:bg-[#023529] shadow-md shadow-[#00C950]/20"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {plan.cta}
      </a>
    </div>
  );
};

const PricingHeader = ({ plan, yearly }: PricingHeaderInterface) => {
  return (
    <div className="mb-5">
      <span
        className={`text-xs font-bold tracking-wider uppercase mb-3 block ${plan.highlight ? "text-green-100" : "text-gray-400"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {plan.name}
      </span>
      <div className="flex items-end gap-2 mb-2">
        <span
          className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {yearly ? plan.price.yearly : plan.price.monthly}
        </span>
        {plan.price.monthly !== "₹0" && (
          <span
            className={`text-sm mb-1 ${plan.highlight ? "text-green-100" : "text-gray-400"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            /month
          </span>
        )}
      </div>
      <p
        className={`text-sm ${plan.highlight ? "text-green-100" : "text-gray-500"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {plan.desc}
      </p>
    </div>
  );
};
