"use client";

import { localStorageUtil } from "@/src/core/utils";
import { authService } from "@/src/features/auth/services/api/authApiService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorageUtil.get<string>("accessToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    const verifyUser = async () => {
      try {
        await authService.verifyUser();
        setIsChecking(false);
      } catch {
        localStorageUtil.remove("accessToken");
        router.replace("/login");
      }
    };

    verifyUser();
  }, [router]);

  if (isChecking)
    return (
      <>
        <Loading />
      </>
    );

  return <>{children}</>;
};
