import { useMutation } from "@tanstack/react-query";
import {
  ForgotEmailResponse,
  SetNewPassowrdResponse,
  VerifyOTPResponse,
} from "../../interface/forgotPasswordInterface";
import { authService } from "../../services/api/authApiService";

export function useForgotPasswordAction() {
  return useMutation<ForgotEmailResponse, Error, { email: string }>({
    mutationFn: (data) => authService.forgotEmail(data),
  });
}

export function useVerifyOTP() {
  return useMutation<VerifyOTPResponse, Error, { email: string; otp: string }>({
    mutationFn: (data) => authService.verifyOTP(data),
  });
}

export function useSetPassword() {
  return useMutation<SetNewPassowrdResponse, Error, { newPassword: string }>({
    mutationFn: (data) => authService.setNewPassword(data),
  });
}
