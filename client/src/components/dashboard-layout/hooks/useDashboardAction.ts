import { CONFIG } from "@/src/core/config";
import { authService } from "@/src/features/auth/services/api/authApiService";
import { DashboardData } from "@/src/features/dashboard/interface/dashboardInterface";
import { useQuery } from "@tanstack/react-query";

export const useDashboardAction = () => {
  return useQuery<DashboardData>({
    queryKey: [CONFIG.REVALIDATE.DASHBOARD],
    queryFn: authService.dashbaord,
  });
};
