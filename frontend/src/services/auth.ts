import { Login, Register } from "@/types/auth";
import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
} as const;

export const authApi = {
  register: async (data: Register) => {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, data);
    return response.data;
  },

  login: async (data: Login) => {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, data);
    return response.data;
  },
};
