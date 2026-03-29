import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { RegisterSecondStepInterface } from "../../interface/register";

export const RegisterSecondStep = ({
  setStep,
  setUserType,
  step,
  userType,
  form,
  handleSubmit,
  setShowPassword,
  showPassword,
}: RegisterSecondStepInterface) => {
  console.log("showpassword", showPassword);
  return (
    <>
      {step === 2 && (
        <div>
          <button
            onClick={() => setStep(1)}
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

          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${userType === "business" ? "bg-[#fffbeb] border border-[#fde68a]" : "bg-[#f0fdf4] border border-[#bbf7d0]"}`}
            >
              {userType === "business" ? "🏪" : "👤"}
            </div>
            <div>
              <h1
                className="text-2xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {userType === "business"
                  ? "Business Account"
                  : "Personal Account"}
              </h1>
              <p
                className="text-gray-400 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Fill in your details to get started
              </p>
            </div>
          </div>

          <div>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col space-y-4"
            >
              {/* full name */}
              <FieldGroup>
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider -mb-1"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Full Name
                      </FieldLabel>
                      <Input
                        {...field}
                        maxLength={32}
                        id="fullName"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                        aria-invalid={fieldState.invalid}
                        placeholder="John Doe"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-red-500 -mt-2"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                ></Controller>
              </FieldGroup>

              {/* email */}
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
                      <Input
                        {...field}
                        maxLength={32}
                        id="email"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                        aria-invalid={fieldState.invalid}
                        placeholder="example@gmail.com"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-red-500 -mt-2"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                ></Controller>
              </FieldGroup>

              {/* fix the eye button */}
              {/* password */}
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
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-5 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your password"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("clicked");
                            setShowPassword((prev) => !prev);
                          }}
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

              {/* phone number - need to work on validation */}
              <FieldGroup>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="phone"
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider -mb-1"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Phone Number
                      </FieldLabel>
                      <Input
                        {...field}
                        maxLength={10}
                        type="number"
                        max={10}
                        id="phone"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/15 focus:bg-white transition-all duration-200"
                        aria-invalid={fieldState.invalid}
                        placeholder="9874561230"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-red-500 -mt-2"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                ></Controller>
              </FieldGroup>

              <FieldGroup className="mt-2">
                <Controller
                  name="isTermsAgreed"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2">
                        <div>
                          <Checkbox
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
                          <span
                            className="text-xs text-gray-500 leading-relaxed"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-[#00C950] hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-[#00C950] hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </span>
                        </FieldLabel>
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00C950] text-white hover:bg-[#00b347] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#00C950]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Create {userType === "business" ? "Business" : "Personal"}{" "}
                Account →
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span
                className="text-gray-400 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                or continue with
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm"
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
          </div>

          <p
            className="text-center text-gray-500 text-sm mt-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#00C950] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      )}
    </>
  );
};
