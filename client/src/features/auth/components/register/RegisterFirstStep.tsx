import { CONFIG } from "@/src/core/config";
import Link from "next/link";
import { RegisterFirstStepInterface } from "../../interface/register";

export const RegisterFirstStep = ({
  step,
  setStep,
  setUserType,
}: RegisterFirstStepInterface) => {
  return (
    <>
      {step === 1 && (
        <div>
          <h1
            className="text-3xl font-extrabold text-gray-900 mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Create your account
          </h1>
          <p
            className="text-gray-500 text-sm mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            First, tell us how you'll use SnapKharcha.
          </p>

          <div className="space-y-4">
            {/* Personal */}
            <button
              onClick={() => {
                setUserType("personal");
                setStep(2);
              }}
              className="group w-full p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#00C950] hover:shadow-lg hover:shadow-[#00C950]/10 transition-all duration-300 text-left shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  👤
                </div>
                <div className="flex-1">
                  <h3
                    className="text-gray-900 font-bold text-base mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Personal User
                  </h3>
                  <p
                    className="text-gray-500 text-sm mb-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Track your own expenses, set budgets, and get AI financial
                    insights.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Bill Snap", "AI Insights", "Budget Alerts"].map((p) => (
                      <span
                        key={p}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#00C950] font-semibold border border-[#bbf7d0]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-[#00C950] transition-colors flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            {/* Business */}
            <button
              onClick={() => {
                setUserType("business");
                setStep(2);
              }}
              className="group w-full p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/10 transition-all duration-300 text-left shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#fffbeb] border border-[#fde68a] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  🏪
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="text-gray-900 font-bold text-base"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Business User
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full bg-[#fffbeb] text-[#d97706] font-bold border border-[#fde68a]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Pro
                    </span>
                  </div>
                  <p
                    className="text-gray-500 text-sm mb-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    For restaurants, shops, and small businesses. Generate bills
                    & track sales.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Invoicing", "Sales Analytics", "Inventory"].map((p) => (
                      <span
                        key={p}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#fffbeb] text-[#d97706] font-semibold border border-[#fde68a]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-[#d97706] transition-colors flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>

          <p
            className="text-center text-gray-500 text-sm mt-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Already have an account?{" "}
            <Link
              href={CONFIG.AUTH.LOGIN}
              className="text-[#00C950] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      )}
    </>
  );
};
