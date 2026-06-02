import { useAnalytics } from "./api";

type Period = "today" | "yesterday" | "lastweek" | "lastmonth";

export const useAnalyticsData = (period: Period = "lastmonth") => {
  const { data, isLoading, error, refetch } = useAnalytics(period);

  return {
    analyticsData: data?.data,
    isLoading,
    error,
    refetch,
  };
};
