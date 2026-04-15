"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Controller } from "react-hook-form";
import { SetNewPasswordInterface } from "../../interface/forgotPasswordInterface";
import PasswordStrength from "../../shared/PasswordStrength";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

export const SetNewPassword = ({
  isLoading,
  form,
  handleSetNewPassword,
  showConfirmPassword,
  showNewPassword,
  toggleShowConfirmPassword,
  toggleShowNewPassword,
  setStep,
}: SetNewPasswordInterface) => {
  return (
    <div>
      <button
        onClick={() => setStep("otp")}
        className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors group"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <div className="w-14 h-14 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mb-6">
        <svg
          className="w-7 h-7 text-[#00C950]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
      <h1
        className="text-3xl font-extrabold text-gray-900 mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Set new password
      </h1>
      <p
        className="text-gray-500 text-sm mb-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Create a strong password you haven't used before.
      </p>

      <div>
        <form
          onSubmit={form.handleSubmit(handleSetNewPassword)}
          className="flex flex-col space-y-4 mb-6"
        >
          <FieldGroup className="mt-2">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      htmlFor="newPassword"
                    >
                      New Password
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                    <Input
                      {...field}
                      id="newPassword"
                      maxLength={32}
                      value={field.value}
                      type={showNewPassword ? "text" : "password"}
                      className="w-full px-4 py-5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={toggleShowNewPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 -mt-2"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <PasswordStrength control={form.control} tracker="newPassword" />

          <FieldGroup className="mt-2">
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                    <Input
                      {...field}
                      id="confirmPassword"
                      maxLength={32}
                      value={field.value}
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full px-4 py-5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={toggleShowConfirmPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 -mt-2"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <button
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating password...
              </>
            ) : (
              <>
                Reset Password{" "}
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
