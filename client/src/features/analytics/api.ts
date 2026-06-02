import { useQuery } from "@tanstack/react-query";
import { clientAPI } from "@/src/lib/api/api";
import type { AnalyticsData } from "./types";

type Period = "today" | "yesterday" | "lastweek" | "lastmonth";

export const analyticsQueryKey = ["analytics"] as const;

export const analyticsPeriodQueryKey = (period: Period) => ["analytics", period] as const;

// ─── API Calls ────────────────────────────────────────────────────────────────

/**
 * Fetch analytics data with optional period filter
 * @param period - 'today' | 'yesterday' | 'lastweek' | 'lastmonth'
 */
export const fetchAnalytics = async (period: Period = "lastmonth"): Promise<AnalyticsData> => {
  try {
    const response = await clientAPI.get<AnalyticsData>(`/analytics?period=${period}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const useAnalytics = (period: Period = "lastmonth") => {
  return useQuery<AnalyticsData>({
    queryKey: analyticsPeriodQueryKey(period),
    queryFn: () => fetchAnalytics(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};
