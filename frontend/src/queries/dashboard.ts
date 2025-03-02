import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/dashboard";

const QUERY_KEYS = {
  stats: ["dashboard-stats"],
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stats,
    queryFn: () => getDashboardStats(),
  });
};
