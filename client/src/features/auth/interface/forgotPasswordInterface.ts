import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  ForgotEmailValues,
  SetNewPasswordValues,
  VerifyEmailValues,
} from "../schemas/forgotPasswordSchema";

export type Step = "email" | "otp" | "reset" | "success";
interface stepMetaInterface {
  num: number;
  label: string;
  sub: string;
}

export interface LeftPanelInterface {
  steps: Step[];
  step: Step;
  stepMeta: {
    email: stepMetaInterface;
    otp: stepMetaInterface;
    reset: stepMetaInterface;
    success: stepMetaInterface;
  };
}

export interface RightPanelInterface {
  step: Step;
  isLoading: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  resendTimer: number;
  // isEmailSubmitLoading: boolean;
  // isVerifyOTPLoading: boolean;
  setStep: Dispatch<SetStateAction<Step>>;
  emailForm: UseFormReturn<ForgotEmailValues>;
  otpForm: UseFormReturn<VerifyEmailValues>;
  setNewPasswordForm: UseFormReturn<SetNewPasswordValues>;
  handleEmailSubmit: (data: ForgotEmailValues) => void;
  handleOtpSubmit: (data: VerifyEmailValues) => void;
  handleSetNewPassword: (data: SetNewPasswordValues) => void;
  handleResetOtp: () => void;
  toggleShowNewPassword: () => void;
  toggleShowConfirmPassword: () => void;
}

export interface ForgotEmailInterface {
  handleEmailSubmit: (data: ForgotEmailValues) => void;
  form: UseFormReturn<ForgotEmailValues>;
  isLoading: boolean;
}

export interface VerifyForgotEmailInterface {
  setStep: Dispatch<SetStateAction<Step>>;
  email: string;
  resendTimer: number;
  canResend: boolean;
  handleOtpSubmit: (data: VerifyEmailValues) => void;
  handleResetOtp: () => void;
  form: UseFormReturn<VerifyEmailValues>;
  isLoading: boolean;
}

export interface SetNewPasswordInterface {
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  setStep: Dispatch<SetStateAction<Step>>;
  isLoading: boolean;
  handleSetNewPassword: (data: SetNewPasswordValues) => void;
  form: UseFormReturn<SetNewPasswordValues>;
  toggleShowNewPassword: () => void;
  toggleShowConfirmPassword: () => void;
}
