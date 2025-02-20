import axios from "axios";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next/server";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getCookie("token", { cookies });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { axiosInstance };
