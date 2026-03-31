"use client";

import { CONFIG } from "@/src/core/config";
import TokenService from "@/src/core/service/tokenService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { recentActivity } from "../data/login";
import { loginFormSchema, LoginFormValues } from "../schemas";

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

  // handle remember me
  const handleRememeberMe = () => {
    const { rememberMe, ...rest } = form.getValues();
    if (!rememberMe) {
      return rest;
    }
    TokenService.setLocalStorage(
      CONFIG.LOCALSTORAGE.REMEMBERED_EMAIL,
      rest.email,
    );
    TokenService.setLocalStorage(
      CONFIG.LOCALSTORAGE.REMEMBERED_PASSWORD,
      rest.password,
    );
  };

  // form submit handler
  const handleSubmit = (data: LoginFormValues) => {
    handleRememeberMe();
    //api call here
    setIsLoading(true);
    console.log("Login data", data);
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
    handleRememeberMe,
  };
};
