import { Logo } from "@/src/components/home/shared";
import { LeftPanelInterface } from "../../interface/forgotPasswordInterface";

export const LeftPanel = ({ stepMeta, steps, step }: LeftPanelInterface) => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-12 bg-[#01271E]">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#00C950]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-[#00C950]/6 blur-[80px] pointer-events-none" />

      {/* Logo */}
      <Logo isFooter />

      {/* Step Progress */}
      <div className="relative z-10">
        <p
          className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Password Reset Flow
        </p>
        <div className="space-y-5 mb-10">
          {steps.map((s) => {
            const meta = stepMeta[s];
            const isActive = step === s;
            const isDone = stepMeta[step].num > meta.num;
            return (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-500 ${isDone ? "bg-[#00C950] text-white" : isActive ? "bg-[#00C950] text-white shadow-lg shadow-[#00C950]/30" : "bg-white/5 border border-white/10 text-gray-500"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {isDone ? (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    meta.num
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold transition-colors duration-300 ${isActive || isDone ? "text-white" : "text-gray-600"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {meta.label}
                  </p>
                  <p
                    className="text-gray-500 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {meta.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Password tips */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p
              className="text-white text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Password Tips
            </p>
          </div>
          <ul className="space-y-2.5">
            {[
              "Use at least 8 characters",
              "Mix uppercase & lowercase letters",
              "Include numbers and special characters",
              "Avoid your name or birthday",
            ].map((tip, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C950]/60 flex-shrink-0" />
                <p
                  className="text-gray-400 text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tip}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00C950] animate-pulse" />
        <p
          className="text-gray-500 text-xs"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Reset links expire after 15 minutes · OTP valid for 5 minutes
        </p>
      </div>
    </div>
  );
};
