import { CONFIG } from "@/src/core/config";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { ForgotEmailInterface } from "../../interface/forgotPasswordInterface";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

export const ForgotEmail = ({
  form,
  handleEmailSubmit,
  isLoading,
}: ForgotEmailInterface) => {
  return (
    <div>
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h1
        className="text-3xl font-extrabold text-gray-900 mb-4"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Forgot your password?
      </h1>
      <p
        className="text-gray-500 text-sm mb-8 leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        No worries! Enter your registered email and we'll send you a 6-digit
        verification code.
      </p>

      <form onSubmit={form.handleSubmit(handleEmailSubmit)}>
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
                  Email
                </FieldLabel>

                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    {...field}
                    maxLength={32}
                    id="email"
                    value={field.value}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      field.onChange(value);
                      field.onBlur();
                    }}
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-4"
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
              Sending code...
            </>
          ) : (
            <>
              Send Verification Code{" "}
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

      <p
        className="text-center text-gray-500 text-sm mt-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Remember your password?{" "}
        <Link
          href={CONFIG.AUTH.LOGIN}
          className="text-[#00C950] font-semibold hover:underline"
        >
          Back to Sign In
        </Link>
      </p>
    </div>
  );
};
