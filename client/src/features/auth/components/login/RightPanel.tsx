"use client";
import { Logo } from "@/src/components/home/shared";
import { CONFIG } from "@/src/core/config";
import Link from "next/link";

import { RightPanelInterface } from "../../interface/loginInterface";
import { LoginForm } from "./LoginForm";

export const RightPanel = ({
  handleSubmit,
  isLoading,
  setShowPassword,
  showPassword,
  form,
}: RightPanelInterface) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-white">
      {/* Subtle green tint top-right */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00C950]/5 blur-[100px]
      pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#00C950]/4 blur-[80px] pointer-events-none" />
      {/* Light dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mobile Logo */}
      <Logo showIcon className="lg:hidden mb-4" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <h1
            className="text-3xl font-extrabold text-gray-900 mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Sign in to your account
          </h1>
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Don't have an account?{" "}
            <Link
              href={CONFIG.AUTH.REGISTER}
              className="text-[#00C950] font-semibold hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 mb-5 shadow-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-300" />
          <span
            className="text-gray-400 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            or sign in with email
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <LoginForm
          form={form}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <div className="mt-8 p-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-start gap-3">
          <svg
            className="w-4 h-4 text-[#00C950] flex-shrink-0 mt-0.5"
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
            className="text-gray-600 text-xs leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Your data is protected with AES-256 encryption. We never share your
            financial data with third parties.
          </p>
        </div>

        {/* <p
          className="text-center text-gray-500 text-sm mt-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          New to SnapKharcha?{" "}
          <Link
            href={CONFIG.AUTH.REGISTER}
            className="text-[#00C950] font-semibold hover:underline"
          >
            Create a free account
          </Link>
        </p> */}
      </div>
    </div>
  );
};
