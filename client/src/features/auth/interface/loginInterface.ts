import { Dispatch, ElementType, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { LoginFormValues } from "../schemas";

export interface RecentActivityInterface {
  icon: string | ElementType;
  label: string;
  amount: string;
  time: string;
  color: string;
}

export interface LeftPanelInterface {
  data: RecentActivityInterface[];
}

export interface RightPanelInterface {
  form: UseFormReturn<LoginFormValues>;
  handleSubmit: (data: LoginFormValues) => void;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface LoginFormInterface extends RightPanelInterface {}

export type LoginResponse = {
  success: boolean;
  accessToken: string;
  message: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};
