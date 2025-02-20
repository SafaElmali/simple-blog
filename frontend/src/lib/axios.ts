import axios from "axios";
import { getCookie } from "cookies-next/client";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
