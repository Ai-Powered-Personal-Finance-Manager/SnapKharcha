import { useDashboardAction } from "./useDashboardAction";

export const useDashboard = () => {
  const { data: dashbaord, isPending: isLoading } = useDashboardAction();

  return {
    dashbaord,
    isLoading,
  };
};
