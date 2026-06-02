"use client";

import { clientAPI } from "@/src/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { InsightInterface } from "../interface/financialHealthInterface";

export const financialHealthQueryKey = (userId: string) =>
  ["financial-health", userId] as const;

const fetchFinancialHealth = async (): Promise<InsightInterface[]> => {
  const response = await clientAPI.get("/insights");
  return response.data.insights;
};

export const useFinancialHealth = (userId?: string) => {
  const query = useQuery({
    queryKey: financialHealthQueryKey(userId ?? ""),
    queryFn: fetchFinancialHealth,
    enabled: Boolean(userId),
  });

  return {
    insights: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
