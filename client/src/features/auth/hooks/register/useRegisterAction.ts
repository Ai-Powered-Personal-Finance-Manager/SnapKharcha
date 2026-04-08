import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/api/authApiService";
import { RegisterResponse } from "../../interface/registerInterface";

export function useRegisterAction() {
  return useMutation<
    RegisterResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: (data) => authService.create(data),
  });
}
