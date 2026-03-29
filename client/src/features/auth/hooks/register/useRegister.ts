"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterFormValues,
  registerSchema,
} from "../../schemas/registerSchema";

export const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isTermsAgreed: false,
    },
  });

  const handleFormSubmit = (data: RegisterFormValues) => {
    const { isTermsAgreed } = data;
    if (!isTermsAgreed) return;
    console.log(data);
  };

  return {
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    form,
    handleFormSubmit,
  };
};
