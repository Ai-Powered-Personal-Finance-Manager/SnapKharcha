"use client";

import { CONFIG } from "@/src/core/config";

import { localStorageUtil } from "@/src/core/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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

  const { mutate: login, isPending } = useLoginAction();

  // Sync browser autofill to RHF
  useEffect(() => {
    const timeout = setTimeout(() => {
      const values = form.getValues();

      if (!values.email) {
        const rememberedEmail = localStorageUtil.get<string>(
          CONFIG.LOCALSTORAGE.REMEMBERED_EMAIL,
        );

        if (rememberedEmail) {
          form.setValue("email", rememberedEmail);
          form.setValue("rememberMe", true);
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // handle remember me
  const handleRememeberMe = (data: LoginFormValues) => {
    const { rememberMe, ...rest } = data;
    if (!rememberMe) {
      return rest;
    }
    localStorageUtil.set(CONFIG.LOCALSTORAGE.REMEMBERED_EMAIL, rest.email);
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
