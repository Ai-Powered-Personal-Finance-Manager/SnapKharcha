import axios from "axios";
import { CONFIG } from "../core/config";

export const api = axios.create({
    baseURL: CONFIG.API.BASEURL,
    withCredentials: true,
});
