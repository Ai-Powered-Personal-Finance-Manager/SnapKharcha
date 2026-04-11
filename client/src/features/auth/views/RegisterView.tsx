"use client";

import { LeftPanel, RightPanel } from "../components/register";
import { useRegister } from "../hooks";

export const RegisterView = () => {
  const register = useRegister();

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── Left Panel ── */}
      <LeftPanel />

      {/* ── Right Panel ── */}
      <RightPanel
        isLoading={register.isLoading}
        setShowPassword={register.setShowPassword}
        handleSubmit={register.handleFormSubmit}
        form={register.form}
        showPassword={register.showPassword}
      />
    </div>
  );
};
