import z from "zod";

export const forgotEmailSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
});

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .min(6, "Enter the 6-digit OTP")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const setNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Enter password")
      .superRefine((val, ctx) => {
        const missing: string[] = [];

        if (val.length < 8) {
          missing.push("at least 8 characters");
        }

        if (!/[A-Z]/.test(val)) {
          missing.push("1 uppercase letter");
        }

        if (!/[a-z]/.test(val)) {
          missing.push("1 lowercase letter");
        }

        if (!/\d/.test(val)) {
          missing.push("1 number");
        }

        if (!/[^a-zA-Z0-9]/.test(val)) {
          missing.push("1 special character");
        }

        if (missing.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Must contain ${missing.join(", ")}`,
          });
        }
      }),

    confirmPassword: z.string().min(1, "Enter confirm password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords didn't match",
    path: ["confirmPassword"],
  });

export type ForgotEmailValues = z.infer<typeof forgotEmailSchema>;

export type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;

export type SetNewPasswordValues = z.infer<typeof setNewPasswordSchema>;

export const ForgotEmailDefault: ForgotEmailValues = {
  email: "",
};

export const VerifyEmailDefault: VerifyEmailValues = {
  otp: "",
};

export const SetNewPasswordDefault: SetNewPasswordValues = {
  newPassword: "",
  confirmPassword: "",
};
