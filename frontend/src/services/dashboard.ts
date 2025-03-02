import { DashboardStats } from "@/types/dashboard";
import { axiosInstance } from "@/lib/axios";

const ENDPOINTS = {
  DASHBOARD_STATS: "/api/dashboard/stats",
} as const;

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axiosInstance.get<DashboardStats>(
    ENDPOINTS.DASHBOARD_STATS
  );
  return response.data;
};
