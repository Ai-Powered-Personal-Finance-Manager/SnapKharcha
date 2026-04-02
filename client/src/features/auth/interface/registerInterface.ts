import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../schemas/registerSchema";

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
