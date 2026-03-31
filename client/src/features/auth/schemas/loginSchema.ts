import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().nullable(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
