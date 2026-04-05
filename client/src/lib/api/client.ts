import { CONFIG } from "@/src/core/config";
import axios from "axios";

export const clientAPI = axios.create({
  baseURL: CONFIG.API.BASEURL,
  withCredentials: true,
});
