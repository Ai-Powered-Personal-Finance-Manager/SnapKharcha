import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Step } from "../interface/forgotPasswordInterface";
import {
  ForgotEmailDefault,
  forgotEmailSchema,
  ForgotEmailValues,
  setNewPasswordSchema,
  SetNewPasswordValues,
  verifyEmailSchema,
  VerifyEmailValues,
} from "../schemas/forgotPasswordSchema";

const RESET_TIMER = 30;

export const useForgotPassword = () => {
  const [step, setStep] = useState<Step>("email");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //loading will come later from tanstack
  const [isLoading, setIsLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(RESET_TIMER);

  const forgotEmailForm = useForm<ForgotEmailValues>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: ForgotEmailDefault,
  });

  const otpForm = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

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

  // step 1
  const handleEmailSubmit = (data: ForgotEmailValues) => {
    console.log("email", data);
    simulate(() => setStep("otp"));
  };

  // step 2
  const handleOtpSubmit = (data: VerifyEmailValues) => {
    console.log("new password", data);
    simulate(() => setStep("reset"));
  };

  const handleResetOtp = () => {
    otpForm.setValue("otp", "");
    setResendTimer(RESET_TIMER);
    //handle api call later
  };

  // step 3
  const handleSetNewPassword = (data: SetNewPasswordValues) => {
    console.log("new password", data);
    simulate(() => setStep("success"));
    //handle api call later
  };

  const simulate = (next: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      next();
    }, 1500);
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
    simulate,
    forgotEmailForm,
    otpForm,
    isLoading,
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
