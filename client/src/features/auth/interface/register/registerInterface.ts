import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../../schemas/registerSchema";

export type UserType = "personal" | "business" | null;

export type Step = 1 | 2;

export interface RightPanelInterface {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<RegisterFormValues>;
  handleSubmit: (data: RegisterFormValues) => void;
}

export interface RegisterFormInterface extends Pick<
  RightPanelInterface,
  "form" | "handleSubmit" | "showPassword" | "setShowPassword"
> {}
