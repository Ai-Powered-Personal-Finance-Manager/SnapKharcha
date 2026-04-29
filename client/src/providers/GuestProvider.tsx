"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { CONFIG } from "../core/config";
import { localStorageUtil } from "../core/utils";
import { authService } from "../features/auth/services/api/authApiService";

export const GuestProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorageUtil.get<string>(
        CONFIG.LOCALSTORAGE.ACCESS_TOKEN,
      );

      if (!token) {
        setIsChecking(false);
        return;
      }

      try {
        await authService.authMe();
        router.replace(CONFIG.ROUTES.DASHBOARD);
      } catch {
        localStorageUtil.remove(CONFIG.LOCALSTORAGE.ACCESS_TOKEN);
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, [router]);

  if (isChecking) return <Loading />;

  return <>{children}</>;
};
