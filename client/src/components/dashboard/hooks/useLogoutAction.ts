import { LogoutResponse } from "@/src/features/auth/interface/loginInterface";
import { authService } from "@/src/features/auth/services/api/authApiService";
import { useMutation } from "@tanstack/react-query";

export const useLogoutAction = () => {
  return useMutation<LogoutResponse, Error>({
    mutationFn: () => authService.logout(),
    // mutationKey: [CONFIG.REVALIDATE.LOGOUT],
  });
};
