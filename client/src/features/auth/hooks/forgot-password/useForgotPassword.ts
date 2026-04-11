"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ForgotEmailResponse,
  SetNewPassowrdResponse,
  Step,
  VerifyOTPResponse,
} from "../../interface/forgotPasswordInterface";
import {
  ForgotEmailDefault,
  forgotEmailSchema,
  ForgotEmailValues,
  setNewPasswordSchema,
  SetNewPasswordValues,
  verifyEmailSchema,
  VerifyEmailValues,
} from "../../schemas/forgotPasswordSchema";
import {
  useForgotPasswordAction,
  useSetPassword,
  useVerifyOTP,
} from "./useForgotPasswordAction";

const RESET_TIMER = 30;

export const useForgotPassword = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState<string>("");
  const [resetToken, setResetToken] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // forgot-email
  const { mutate: forgotEmail, isPending: isForgotEmailLoading } =
    useForgotPasswordAction();
  const forgotEmailForm = useForm<ForgotEmailValues>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: ForgotEmailDefault,
  });

  // verify-otp
  const [resendTimer, setResendTimer] = useState(RESET_TIMER);
  const { mutate: verifyOtp, isPending: isVerifyOtpLoading } = useVerifyOTP();
  const otpForm = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  //set new-password
  const { mutate: setNewPassword, isPending: isSetNewPasswordLoading } =
    useSetPassword();
  const setNewPasswordForm = useForm<SetNewPasswordValues>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
    },
  });

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // otp-timer
  useEffect(() => {
    if (step !== "otp") return;
    setResendTimer(RESET_TIMER);

    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // step 1 - forgot-email
  const handleEmailSubmit = (data: ForgotEmailValues) => {
    setEmail(data.email);

    forgotEmail(data, {
      onSuccess: (res: ForgotEmailResponse) => {
        toast.success(res?.message);
        setStep("otp");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Email submission failed");
      },
    });
  };

  // step 2 - verify-otp
  const handleOtpSubmit = (data: VerifyEmailValues) => {
    const reqData = {
      email: email,
      otp: data.otp.trim(),
    };
    verifyOtp(reqData, {
      onSuccess: (res: VerifyOTPResponse) => {
        toast.success(res.message);
        setResetToken(res.resetToken);
        setStep("reset");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "OTP verification failed");
      },
    });
  };

  //need to have a dedicated route to handle resend-otp
  const handleResetOtp = () => {
    const email = forgotEmailForm.getValues("email");
    otpForm.setValue("otp", "");
    setResendTimer(RESET_TIMER);
    handleEmailSubmit({ email });
  };

  // step 3 - set-new-password
  const handleSetNewPassword = (data: SetNewPasswordValues) => {
    const password = data.confirmPassword;

    setNewPassword(
      { password },
      {
        onSuccess: (res: SetNewPassowrdResponse) => {
          toast.success(res?.message);
          setStep("success");
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to change password",
          );
        },
      },
    );
  };

  const steps: Step[] = ["email", "otp", "reset"];
  const stepMeta = {
    email: {
      num: 1,
      label: "Enter Email",
      sub: "We'll send a 6-digit code",
    },
    otp: { num: 2, label: "Verify OTP", sub: "Check your inbox or spam" },
    reset: {
      num: 3,
      label: "New Password",
      sub: "Choose a strong password",
    },
    success: { num: 4, label: "Done", sub: "" },
  };

  return {
    stepMeta,
    step,
    setStep,
    steps,
    forgotEmailForm,
    otpForm,
    email,
    isForgotEmailLoading,
    isVerifyOtpLoading,
    isSetNewPasswordLoading,
    handleEmailSubmit,
    handleOtpSubmit,
    handleResetOtp,
    handleSetNewPassword,
    setNewPasswordForm,
    showNewPassword,
    showConfirmPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    resendTimer,
  };
};
