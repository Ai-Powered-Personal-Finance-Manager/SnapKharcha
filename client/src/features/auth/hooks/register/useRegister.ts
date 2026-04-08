"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  RegisterFormDefault,
  RegisterFormValues,
  registerSchema,
} from "../../schemas/registerSchema";
import { useRegisterAction } from "./useRegisterAction";

export const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: RegisterFormDefault,
  });

  const { mutate: register, isPending } = useRegisterAction();

  const handleFormSubmit = (data: RegisterFormValues) => {
    const { isTermsAgreed } = data;
    if (!isTermsAgreed) return;

    register(data, {
      onSuccess: (res) => {
        toast.success(res.success);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Registration failed");
      },
    });
  };

  return {
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    form,
    isLoading: isPending,
    handleFormSubmit,
  };
};
