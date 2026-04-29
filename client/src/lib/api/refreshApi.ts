import { CONFIG } from "@/src/core/config";
import axios from "axios";

export const refreshAPI = axios.create({
  baseURL: CONFIG.API.BASEURL,
  withCredentials: true,
});

export const refreshAPIService = {
  // refresh token
  async refresh() {
    const res = await refreshAPI.post("/auth/refresh");
    return res.data.accessToken;
  },
};
