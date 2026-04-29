"use client";

import { LeftPanel, RightPanel } from "../components/login";
import { useLogin } from "../hooks";

export const LoginView = () => {
  const login = useLogin();

  return (
    <div className="min-h-screen bg-white flex">
      {/* ── Left Panel ── */}
      <LeftPanel data={login.recentActivity} />

      {/* ── Right Panel (form) ── */}
      <RightPanel
        form={login.form}
        handleSubmit={login.handleSubmit}
        isLoading={login.isLoading}
        setShowPassword={login.setShowPassword}
        showPassword={login.showPassword}
      />
    </div>
  );
};
