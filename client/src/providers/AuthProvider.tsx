"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { CONFIG } from "../core/config";
import { localStorageUtil } from "../core/utils";
import { authService } from "../features/auth/services/api/authApiService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorageUtil.get<string>(
        CONFIG.LOCALSTORAGE.ACCESS_TOKEN,
      );

      if (!token) {
        router.replace("/login");
        setIsChecking(false);
        return;
      }

      try {
        await authService.authMe();
      } catch {
        localStorageUtil.remove(CONFIG.LOCALSTORAGE.ACCESS_TOKEN);
        router.replace("/login");
      } finally {
        setIsChecking(false);
      }
    };

    verifyUser();
  }, [router]);

  if (isChecking) return <Loading />;

  return <>{children}</>;
};
