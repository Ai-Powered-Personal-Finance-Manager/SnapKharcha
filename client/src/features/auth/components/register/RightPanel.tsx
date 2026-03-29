import { Logo } from "@/src/components/home/shared";
import { RightPanelInterface } from "../../interface/register";
import { RegisterFirstStep } from "./RegisterFirstStep";
import { RegisterSecondStep } from "./RegisterSecondStep";

export const RightPanel = ({
  form,
  setStep,
  setUserType,
  showConfirm,
  showPassword,
  step,
  userType,
  handleSubmit,
  setShowPassword,
}: RightPanelInterface) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C950]/5 blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mobile Logo */}
      <Logo showIcon className="mb-6 lg:hidden flex" />

      <div className="w-full max-w-md relative z-10">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? "bg-[#00C950] text-white shadow-md shadow-[#00C950]/30" : "bg-gray-100 border border-gray-200 text-gray-400"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 2 && (
                <div
                  className={`w-16 h-px transition-all duration-300 ${step > s ? "bg-[#00C950]" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
          <p
            className="ml-2 text-gray-400 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Step {step} of 2
          </p>
        </div>

        {/* ── STEP 1: Account type ── */}
        <RegisterFirstStep
          step={step}
          setStep={setStep}
          setUserType={setUserType}
        />

        {/* ── STEP 2: Fill details ── */}
        <RegisterSecondStep
          form={form}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          handleSubmit={handleSubmit}
          setStep={setStep}
          setUserType={setUserType}
          step={step}
          userType={userType}
        />
      </div>
    </div>
  );
};
