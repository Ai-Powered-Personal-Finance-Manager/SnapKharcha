import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/src/components/ui/input";

import { CONFIG } from "@/src/core/config";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { LoginFormInterface } from "../../interface/loginInterface";

export const LoginForm = ({
  handleSubmit,
  isLoading,
  setShowPassword,
  showPassword,
  form,
  handleRememberMe,
}: LoginFormInterface) => {
  return (
    <div className="space-y-4">
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* Email */}
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
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    {...field}
                    maxLength={32}
                    value={field.value}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      field.onChange(value);
                      field.onBlur();
                    }}
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
                </div>
                <div className="relative">
                  <LockKeyhole className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                  <Input
                    {...field}
                    id="password"
                    maxLength={32}
                    value={field.value}
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

        <div className="flex justify-between items-center">
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
                        onClick={handleRememberMe}
                        id="rememberMe"
                        className="data-[state=checked]:text-green-500 cursor-pointer"
                        checked={field.value ? true : false}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                    <FieldLabel
                      className="text-sm text-gray-500 tracking-wider cursor-pointer"
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
          <Link
            href={CONFIG.AUTH.FORGOT_PASSWORD}
            className="text-xs text-[#00C950] hover:underline font-medium -mb-2 w-full  text-end"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Forgot password?
          </Link>
        </div>

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
