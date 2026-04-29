import { CONFIG } from "@/src/core/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function createSSRClient() {
  const cookieStore = await cookies();

  const allCookies = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const accessToken = cookieStore.get("access_token")?.value;

  return axios.create({
    baseURL: CONFIG.API.BASEURL,
    headers: {
      Cookie: allCookies,
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    withCredentials: true,
  });
}
