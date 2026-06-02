"use client";

import { clientAPI } from "@/src/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { InsightInterface } from "../interface/financialHealthInterface";

export const financialHealthQueryKey = (userId: string) =>
  ["financial-health", userId] as const;

export const fetchFinancialHealth = async (
  userId: string,
): Promise<InsightInterface[]> => {
  const response = await clientAPI.get("/insights");

  return response.data.insights;
};

export const useFinancialHealth = (userId?: string) => {
  const query = useQuery({
    queryKey: ["financial-health", userId],
    queryFn: () => fetchFinancialHealth(userId!),
    enabled: !!userId,

    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,

    // Prevent showing previous query data while switching users
    placeholderData: undefined,
  });

  return {
    insights: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
