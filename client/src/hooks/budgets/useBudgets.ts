"use client";

import { clientAPI } from "@/src/lib/api/api";
import type { BudgetApiData, BudgetApiResponse } from "@/src/types/budget";
import { useQuery } from "@tanstack/react-query";

const budgetQueryKey = ["budgets"] as const;

export const fetchAllBudgets = async (): Promise<BudgetApiData> => {
    const response = await clientAPI.get<BudgetApiData>("/budgets");
    return response.data;
};

export const useBudgets = () => {
    
    const { data, isLoading, isError, error , refetch} = useQuery({
        queryKey: budgetQueryKey,
        queryFn: fetchAllBudgets,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    }
};