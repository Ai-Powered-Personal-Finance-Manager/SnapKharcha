import { CONFIG } from "@/src/core/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../services/api/authApiService";

type ForgotEmailResponse = {
  message: string;
};

type VerifyOTPResponse = {
  message: string;
  resetToken: string;
};

export function useForgotPasswordAction() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ForgotEmailResponse, Error, { email: string }>({
    mutationFn: (data: { email: string }) => authService.forgotEmail(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.REVALIDATE.FORGOT_EMAIL],
      });
      toast.success(data.message);
    },

    onError: (error: any) => {
      console.log(error?.response?.data?.message);
      toast.success(error?.response?.data?.message);
    },
  });

  return mutation;
}

export function useVerifyOTP() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    VerifyOTPResponse,
    Error,
    { email: string; otp: string }
  >({
    mutationFn: (data) => authService.verifyOTP(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CONFIG.REVALIDATE.FORGOT_EMAIL],
      });

      toast.success(data.message);
      console.log("Reset Token:", data.resetToken);
    },

    onError: (error: any) => {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    },
  });

  return mutation;
}
