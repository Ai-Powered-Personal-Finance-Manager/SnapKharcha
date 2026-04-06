import { CONFIG } from "@/src/core/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../services/api/authApiService";

type LoginResponse = {
  success: string;
  accessToken: string;
};

export function useLoginAction() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: (data: { email: string; password: string }) =>
      authService.login(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CONFIG.REVALIDATE.LOGIN] });
      toast.success(data.success);
    },

    onError: (error: any) => {
      console.log(error?.response?.data?.message);
      toast.success(error?.response?.data?.message);
    },
  });

  return mutation;
}
