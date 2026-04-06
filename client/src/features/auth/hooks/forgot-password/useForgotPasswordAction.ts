import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../services/api/authApiService";

type ForgotEmailResponse = {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
};

export function useForgotPasswordAction() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ForgotEmailResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: (data: { email: string; password: string }) =>
      authService.login(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast.success(data.success);
    },

    onError: (error: any) => {
      console.log(error?.response?.data?.message);
      toast.success(error?.response?.data?.message);
    },
  });

  return mutation;
}
