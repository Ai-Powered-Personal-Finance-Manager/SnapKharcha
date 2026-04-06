"use client";

import { CONFIG } from "@/src/core/config";
import TokenService from "@/src/core/service/tokenService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { recentActivity } from "../../data/login";
import { LoginFormValues, loginFormSchema } from "../../schemas";
import { useLoginAction } from "./useLoginAction";

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
  // const [isLoading, setIsLoading] = useState(false);

  const { mutate: login, isPending } = useLoginAction();

  // handle remember me
  const handleRememeberMe = (data: LoginFormValues) => {
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
    return rest;
  };

  // form submit handler
  const handleSubmit = (data: LoginFormValues) => {
    const payload = handleRememeberMe(data);

    console.log("login payload", payload);

    login(payload, {
      onSuccess: (res) => {
        console.log("Login success", res);
      },
    });
  };

  return {
    recentActivity,
    showPassword,
    form,
    setShowPassword,
    handleSubmit,
    isLoading: isPending,
    loginSchema: loginFormSchema,
    handleRememeberMe,
  };
};
