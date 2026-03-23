"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { recentActivity } from "../../data/login";
import { loginFormSchema, LoginFormValues } from "../../schemas";

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginFormSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return {
    recentActivity,
    showPassword,
    form,
    setShowPassword,
    handleSubmit,
    isLoading,
    loginSchema: loginFormSchema,
  };
};
