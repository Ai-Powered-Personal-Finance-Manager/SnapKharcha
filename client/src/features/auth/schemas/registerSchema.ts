import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(1, "Enter full name"),
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(1, "Enter password")
    .superRefine((val, ctx) => {
      const missing: string[] = [];

      if (val.length < 8) missing.push("at least 8 characters");
      if (!/[A-Z]/.test(val)) missing.push("1 uppercase letter");
      if (!/[a-z]/.test(val)) missing.push("1 lowercase letter");
      if (!/\d/.test(val)) missing.push("1 number");
      if (!/[^a-zA-Z0-9]/.test(val)) missing.push("1 special character");

      if (missing.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Must contain ${missing.join(", ")}`,
        });
      }
    }),
  phone: z.string().min(1, "Enter phone number"),
  isTermsAgreed: z.boolean(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
