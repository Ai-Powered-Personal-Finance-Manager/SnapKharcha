import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/src/lib/utils";
import { Controller } from "react-hook-form";
import { VerifyForgotEmailInterface } from "../../interface/forgotPasswordInterface";

export const VerifyForgotEmail = ({
  form,
  setStep,
  email,
  handleOtpSubmit,
  handleResetOtp,
  isLoading,
  resendTimer,
}: VerifyForgotEmailInterface) => {
  return (
    <div>
      <button
        onClick={() => setStep("email")}
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

      <div className="w-14 h-14 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] flex items-center justify-center mb-6">
        <svg
          className="w-7 h-7 text-[#0284c7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1
        className="text-3xl font-extrabold text-gray-900 mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Check your inbox
      </h1>
      <p
        className="text-gray-500 text-sm mb-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        We sent a 6-digit code to
      </p>
      <p
        className="text-gray-900 font-semibold text-sm mb-8 flex items-center gap-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="text-[#00C950]">{email}</span>
        <button
          onClick={() => setStep("email")}
          className="text-gray-400 hover:text-gray-600 text-xs underline"
        >
          change
        </button>
      </p>

      <form className="mb-6" onSubmit={form.handleSubmit(handleOtpSubmit)}>
        <FieldGroup>
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => {
              const handleOtpChange = (val: string) => {
                const cleaned = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
                field.onChange(cleaned);
              };
              return (
                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-wider -mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    VERIFY OTP
                  </FieldLabel>

                  <InputOTP
                    value={field.value}
                    onChange={handleOtpChange}
                    maxLength={6}
                  >
                    <InputOTPGroup className="grid w-full grid-cols-6 lg:gap-6 gap-2">
                      {Array(6)
                        .fill(null)
                        .map((_, idx) => (
                          <InputOTPSlot
                            key={idx}
                            index={idx}
                            className={cn(
                              "data-[active=true]:ring-green-500 data-[active=true]:border-green-500 lg:h-16 h-14 w-full rounded-[6px] border uppercase",
                            )}
                          />
                        ))}
                    </InputOTPGroup>
                  </InputOTP>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 -mt-2"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 mt-4 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
              Verifying...
            </>
          ) : (
            <>
              Verify Code{" "}
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

      <div className="flex items-center justify-between mb-6 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
        <p
          className="text-gray-500 text-xs"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {resendTimer === 0
            ? "Didn't receive the code?"
            : `Resend code in ${resendTimer}s`}
        </p>
        <button
          onClick={handleResetOtp}
          disabled={resendTimer !== 0}
          className={`text-xs font-semibold transition-all ${resendTimer === 0 ? "text-[#00C950] hover:underline cursor-pointer" : "text-gray-300 cursor-not-allowed"}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Resend OTP
        </button>
      </div>

      <p
        className="text-center text-gray-400 text-xs mt-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Check your spam folder if you don't see it within a minute.
      </p>
    </div>
  );
};
