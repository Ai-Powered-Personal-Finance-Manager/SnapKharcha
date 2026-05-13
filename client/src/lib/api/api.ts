"use client";

import { CONFIG } from "@/src/core/config";
import { localStorageUtil } from "@/src/core/utils";
import axios from "axios";
import { refreshAPIService } from "./refreshApi";

export const clientAPI = axios.create({
  baseURL: CONFIG.API.BASEURL,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
clientAPI.interceptors.request.use(
  (config) => {
    const token = localStorageUtil.get<string>(
      CONFIG.LOCALSTORAGE.ACCESS_TOKEN,
    );

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
// clientAPI.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // Network error
//     if (error.code === "ERR_NETWORK") {
//       console.error("Network error. Check your connection.");
//       return Promise.reject(error);
//     }

//     const status = error?.response?.status;

//     // Unauthorized → logout
//     if (status === 401) {
//       localStorageUtil.remove(CONFIG.LOCALSTORAGE.ACCESS_TOKEN);
//       window.location.href = "/login";
//     }

//     // Forbidden
//     if (status === 403) {
//       console.error("You don’t have permission.");
//     }

//     // Bad request
//     if (status === 400) {
//       console.error(error?.response?.data?.message || "Bad request");
//     }

//     // Conflict
//     if (status === 409) {
//       return Promise.reject(error?.response?.data);
//     }

//     return Promise.reject(error);
//   },
// );

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

clientAPI.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.code === "ERR_NETWORK") {
      return Promise.reject(error);
    }

    const status = error?.response?.status;

    // ========================
    // 401 → TRY REFRESH
    // ========================
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: async (token: string) => {
              try {
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(clientAPI(originalRequest));
              } catch (err) {
                reject(err);
              }
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAPIService.refresh();

        localStorageUtil.set(CONFIG.LOCALSTORAGE.ACCESS_TOKEN, newToken);

        clientAPI.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return clientAPI(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorageUtil.remove(CONFIG.LOCALSTORAGE.ACCESS_TOKEN);
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // ========================
    // OTHER ERRORS
    // ========================
    if (status === 403) {
      console.error("Forbidden");
    }

    if (status === 400) {
      console?.error(error?.response?.data?.message);
    }

    if (status === 409) {
      return Promise.reject(error?.response?.data);
    }

    return Promise.reject(error);
  },
);
