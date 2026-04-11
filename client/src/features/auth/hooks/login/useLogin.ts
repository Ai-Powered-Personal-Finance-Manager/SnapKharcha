"use client";

import { CONFIG } from "@/src/core/config";

import { localStorageUtil } from "@/src/core/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { recentActivity } from "../../data/login";
import { LoginFormValues, loginFormSchema } from "../../schemas";
import { useLoginAction } from "./useLoginAction";

export const useLogin = () => {
  const router = useRouter();
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

    login(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        localStorageUtil.set(
          CONFIG.LOCALSTORAGE.ACCESS_TOKEN,
          res?.accessToken,
        );
        router.replace(CONFIG.ROUTES.DASHBOARD);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Problem during login.");
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
