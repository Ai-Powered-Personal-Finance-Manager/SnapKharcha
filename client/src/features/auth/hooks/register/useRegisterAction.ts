import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/api/authApiService";

type RegisterResponse = {
  success: string;
  email: string;
};

export function useRegisterAction() {
  return useMutation<
    RegisterResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: (data) => authService.create(data),
  });
}
