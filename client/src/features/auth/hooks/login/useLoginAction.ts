import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../../interface/loginInterface";
import { authService } from "../../services/api/authApiService";

export function useLoginAction() {
  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: (data) => authService.login(data),
    },
  );
}
