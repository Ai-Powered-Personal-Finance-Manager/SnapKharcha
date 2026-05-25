import { useDashboardAction } from "./useDashboardAction";

export const useDashboard = () => {
  const { data: dashbaord, isPending: isLoading, error, refetch } = useDashboardAction();

  return {
    dashbaord,
    isLoading,
    error,
    refetch,
  };
};
