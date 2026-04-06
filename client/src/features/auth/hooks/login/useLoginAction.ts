import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/api/authApiService";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export function useLoginAction() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: (data: { email: string; password: string }) =>
        authService.login(data),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },

      onError: (error: any) => {
        console.log(error?.response?.data?.message);
      },
    },
  );
}
