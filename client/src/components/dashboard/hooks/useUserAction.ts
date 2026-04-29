import { CONFIG } from "@/src/core/config";
import { authService } from "@/src/features/auth/services/api/authApiService";
import { useQuery } from "@tanstack/react-query";

export const useUserAction = () => {
  return useQuery({
    queryKey: [CONFIG.REVALIDATE.AUTH_ME],
    queryFn: authService.authMe,
  });
};
