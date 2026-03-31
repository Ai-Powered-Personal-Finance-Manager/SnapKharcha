import { Logo } from "@/src/components/home/shared";
import { RightPanelInterface } from "../../interface/forgotPasswordInterface";
import { ForgotEmail } from "./ForgotEmail";
import { SetNewPassword } from "./SetNewPassword";
import { SuccessMessage } from "./SuccessMessage";
import { VerifyForgotEmail } from "./VerifyForgotEmail";

export const RightPanel = ({
  isLoading,
  step,
  emailForm,
  otpForm,
  handleEmailSubmit,
  handleOtpSubmit,
  handleResetOtp,
  handleSetNewPassword,
  setNewPasswordForm,
  setStep,
  showConfirmPassword,
  showNewPassword,
  toggleShowConfirmPassword,
  toggleShowNewPassword,
  resendTimer,
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
      <Logo className="lg:hidden flex mb-8" showIcon />

      <div className="w-full max-w-md relative z-10">
        {/* ── Email step ── */}
        {step === "email" && (
          <ForgotEmail
            handleEmailSubmit={handleEmailSubmit}
            isLoading={isLoading}
            form={emailForm}
          />
        )}

        {/* ── OTP step ── */}
        {step === "otp" && (
          <VerifyForgotEmail
            resendTimer={resendTimer}
            isLoading={isLoading}
            handleResetOtp={handleResetOtp}
            setStep={setStep}
            form={otpForm}
            handleOtpSubmit={handleOtpSubmit}
            canResend
            email={emailForm.getValues("email")}
          />
        )}

        {/* ── Reset step ── */}
        {step === "reset" && (
          <SetNewPassword
            showConfirmPassword={showConfirmPassword}
            showNewPassword={showNewPassword}
            toggleShowConfirmPassword={toggleShowConfirmPassword}
            toggleShowNewPassword={toggleShowNewPassword}
            form={setNewPasswordForm}
            handleSetNewPassword={handleSetNewPassword}
            isLoading={isLoading}
          />
        )}

        {/* ── Success step ── */}
        {step === "success" && <SuccessMessage />}
      </div>
    </div>
  );
};
