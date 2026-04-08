import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/api/authApiService";

type LoginResponse = {
  success: string;
  accessToken: string;
};

export function useLoginAction() {
  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: (data) => authService.login(data),
    },
  );
}
