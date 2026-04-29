import { clientAPI } from "@/src/lib/api/api";

export class AuthAPIService {
  async login(data: { email: string; password: string }) {
    const res = await clientAPI.post("/auth/login", data);
    return res?.data;
  }

  async logout() {
    const res = await clientAPI.post("/auth/logout");
    return res?.data;
  }

  async getMe() {
    const res = await clientAPI.get("/auth/me");
    return res?.data;
  }

  async create(data: { name: string; email: string; password: string }) {
    const res = await clientAPI.post("/auth/register", data);
    return res?.data;
  }

  async forgotEmail(data: { email: string }) {
    const res = await clientAPI.post("/auth/forgot-password", data);
    return res?.data;
  }

  async verifyOTP(data: { email: string; otp: string }) {
    const res = await clientAPI.post("/auth/verify-otp", data);
    return res?.data;
  }

  async setNewPassword(data: { newPassword: string }) {
    const res = await clientAPI.post("/auth/reset-forgot-password", data);
    return res?.data;
  }

  async authMe() {
    const res = await clientAPI.get("/auth/me");
    return res?.data;
  }
}

export const authService = new AuthAPIService();
