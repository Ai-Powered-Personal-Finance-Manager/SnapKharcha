"use client";

import { LeftPanel, RightPanel } from "../components/register";
import { useRegister } from "../hooks/register";

export const RegisterView = () => {
  const register = useRegister();

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── Left Panel ── */}
      <LeftPanel />

      {/* ── Right Panel ── */}
      <RightPanel
        setShowPassword={register.setShowConfirm}
        handleSubmit={register.handleFormSubmit}
        form={register.form}
        setStep={register.setStep}
        setUserType={register.setUserType}
        showConfirm={register.showConfirm}
        showPassword={register.showPassword}
        step={register.step}
        userType={register.userType}
      />
    </div>
  );
};
