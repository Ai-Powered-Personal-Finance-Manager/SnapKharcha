import { ENV, LOCALSTORAGE, REVALIDATE, ROUTES } from "../constant";

export const CONFIG = {
  API: {
    BASEURL: process.env.NEXT_PUBLIC_API_URL,
  },
  AUTH: {
    HOME: "/",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    REGISTER: "/register",
  },
  REVALIDATE: REVALIDATE,
  ROUTES: ROUTES,
  ENV: ENV,
  LOCALSTORAGE: LOCALSTORAGE,
};
