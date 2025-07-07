// src/lib/axios.ts
import axios from "axios";
import { apiBaseURL } from "../common/constants/env";

const axiosInstance = axios.create({
  baseURL: apiBaseURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token si existe
axiosInstance.interceptors.request.use(
  (req) => {
    if (typeof window !== "undefined") {
      // const accessToken = localStorage.getItem("accessToken");
      const accessToken = "TU_TOKEN_AQUI";
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return req;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
