"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Step, UserType } from "../../interface/register";
import { RegisterFormValues } from "../../schemas/registerSchema";

export const useRegister = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      isTermsAgreed: false,
    },
  });

  console.log("hook show password", showPassword);

  const handleFormSubmit = (data: RegisterFormValues) => {
    console.log("register form", data);
  };

  return {
    userType,
    setUserType,
    step,
    setStep,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    form,
    handleFormSubmit,
  };
};
