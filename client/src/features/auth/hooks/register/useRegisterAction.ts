import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../../services/api/authApiService";

type RegisterResponse = {
  success: string;
  email: string;
};

export function useRegisterAction() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    RegisterResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: (data) => authService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      toast.success(data.success);
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    },
  });

  return mutation;
}
