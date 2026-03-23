import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { CONFIG } from "@/src/core/config";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { LoginFormInterface } from "../../interface/login";

export const LoginForm = ({
  handleSubmit,
  isLoading,
  setShowPassword,
  showPassword,
  form,
}: LoginFormInterface) => {
  return (
    <div className="space-y-4">
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* Email */}ft
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wider -mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Email Address
                </FieldLabel>
                <div className="relative">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <Input
                    {...field}
                    maxLength={32}
                    id="email"
                    className="w-full px-4 py-5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                  />
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

        {/* Password */}
        <FieldGroup className="mt-2">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider -mb-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    htmlFor="password"
                  >
                    Password
                  </FieldLabel>

                  <Link
                    href={CONFIG.AUTH.FORGOT_PASSWORD}
                    className="text-xs text-[#00C950] hover:underline font-medium -mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
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
                  <Input
                    {...field}
                    id="password"
                    maxLength={32}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
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

        {/* Remember me */}
        <FieldGroup className="mt-2">
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <div>
                    <Checkbox
                      checked={field.value ? true : false}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  <FieldLabel
                    className="text-sm text-gray-500 tracking-wider"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </FieldLabel>
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
              Signing in...
            </>
          ) : (
            "Sign In to Dashboard →"
          )}
        </button>
      </form>
    </div>
  );
};
