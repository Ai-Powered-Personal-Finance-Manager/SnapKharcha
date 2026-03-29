import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../../schemas/registerSchema";

export type UserType = "personal" | "business" | null;

export type Step = 1 | 2;

export interface RightPanelInterface {
  step: number;
  setUserType: Dispatch<SetStateAction<UserType>>;
  setStep: Dispatch<SetStateAction<Step>>;
  userType: UserType;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showConfirm: boolean;
  form: UseFormReturn<RegisterFormValues>;
  handleSubmit: (data: RegisterFormValues) => void;
}

export interface RegisterFirstStepInterface extends Pick<
  RightPanelInterface,
  "step" | "setStep" | "setUserType"
> {}

export interface RegisterSecondStepInterface extends Pick<
  RightPanelInterface,
  | "step"
  | "setStep"
  | "userType"
  | "setUserType"
  | "form"
  | "handleSubmit"
  | "showPassword"
  | "setShowPassword"
> {}
