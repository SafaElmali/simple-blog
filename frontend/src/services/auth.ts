import { axiosInstance } from "@/lib/axios";
import { Login, Register } from "@/types/auth";

const ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
};

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
