import { clientAPI } from "@/src/lib/api/client";

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
}

export const authService = new AuthAPIService();
