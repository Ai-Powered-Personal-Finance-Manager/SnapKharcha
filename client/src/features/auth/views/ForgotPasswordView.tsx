"use client";

import { LeftPanel, RightPanel } from "../components/forgot-password";
import { useForgotPassword } from "../hooks";

export const ForgotPasswordView = () => {
  const forgotPassword = useForgotPassword();

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── Left Panel ── */}
      <LeftPanel
        step={forgotPassword.step}
        stepMeta={forgotPassword.stepMeta}
        steps={forgotPassword.steps}
      />

      {/* ── Right Panel ── */}
      <RightPanel
        resendTimer={forgotPassword.resendTimer}
        isLoading={forgotPassword.isLoading}
        handleResetOtp={forgotPassword.handleResetOtp}
        setStep={forgotPassword.setStep}
        handleOtpSubmit={forgotPassword.handleOtpSubmit}
        handleEmailSubmit={forgotPassword.handleEmailSubmit}
        emailForm={forgotPassword.forgotEmailForm}
        otpForm={forgotPassword.otpForm}
        setNewPasswordForm={forgotPassword.setNewPasswordForm}
        // isEmailSubmitLoading={forgotPassword.isLoading}
        // isVerifyOTPLoading={forgotPassword.isLoading}
        handleSetNewPassword={forgotPassword.handleSetNewPassword}
        step={forgotPassword.step}
        toggleShowConfirmPassword={forgotPassword.toggleShowConfirmPassword}
        toggleShowNewPassword={forgotPassword.toggleShowNewPassword}
        showConfirmPassword={forgotPassword.showConfirmPassword}
        showNewPassword={forgotPassword.showNewPassword}
      />
    </div>
  );
};
