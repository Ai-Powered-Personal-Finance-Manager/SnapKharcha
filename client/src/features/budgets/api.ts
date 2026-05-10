"use client";

import { clientAPI } from "@/src/lib/api/api";
import type { BudgetApiItem, BudgetApiResponse } from "@/src/features/budgets/types";
import type { AxiosError } from "axios";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const budgetQueryKey = ["budgets"] as const;

export const budgetDetailQueryKey = (id: string) => ["budget", id] as const;

export type CreateBudgetPayload = {
    name: string;
    amount: number;
    startingDate: string;
    expireDate: string;
    categoryId: string;
    note?: string;
    alert?: boolean;
    alertLimit?: number | null;
};

export type UpdateBudgetPayload = Partial<CreateBudgetPayload> & {
    spendAmount?: number;
};

export type BudgetMutationResponse = {
    success: boolean;
    message: string;
    data?: BudgetApiItem;
};

export type DeleteBudgetResponse = {
    success: boolean;
    message: string;
};

// ─── API Calls ────────────────────────────────────────────────────────────────

export const fetchAllBudgets = async (): Promise<BudgetApiResponse> => {
    const response = await clientAPI.get<BudgetApiResponse>("/budget");
    return response.data;
};

export const fetchBudgetById = async (id: string): Promise<BudgetApiItem> => {
    const response = await clientAPI.get<BudgetMutationResponse>(`/budget/${id}`);
    return response.data.data as BudgetApiItem;
};

export const createBudget = async (
    payload: CreateBudgetPayload,
): Promise<BudgetMutationResponse> => {
    const response = await clientAPI.post<BudgetMutationResponse>("/budget", payload);
    return response.data;
};

export const updateBudget = async ({
    id,
    payload,
}: {
    id: string;
    payload: UpdateBudgetPayload;
}): Promise<BudgetMutationResponse> => {
    const response = await clientAPI.patch<BudgetMutationResponse>(`/budget/${id}`, payload);
    return response.data;
};

export const deleteBudget = async (id: string): Promise<DeleteBudgetResponse> => {
    const response = await clientAPI.delete<DeleteBudgetResponse>(`/budget/${id}`);
    return response.data;
};

// ─── Error Handler ────────────────────────────────────────────────────────────

const getBudgetErrorMessage = (error: AxiosError<{ message?: string }>) => {
    return error.response?.data?.message || "Something went wrong.";
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const useGetBudgets = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: budgetQueryKey,
        queryFn: fetchAllBudgets,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useGetBudgetById = (id?: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: id ? budgetDetailQueryKey(id) : ["budget", "detail", "missing"],
        queryFn: () => fetchBudgetById(id as string),
        enabled: Boolean(id),
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useCreateBudget = () => {
    const queryClient = useQueryClient();

    return useMutation<
        BudgetMutationResponse,
        AxiosError<{ message?: string }>,
        CreateBudgetPayload
    >({
        mutationFn: createBudget,
        onSuccess: async (response) => {
            toast.success(response.message || "Budget created successfully.");
            await queryClient.invalidateQueries({ queryKey: budgetQueryKey });
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getBudgetErrorMessage(error) || "Failed to create budget.");
        },
    });
};

export const useUpdateBudget = () => {
    const queryClient = useQueryClient();

    return useMutation<
        BudgetMutationResponse,
        AxiosError<{ message?: string }>,
        { id: string; payload: UpdateBudgetPayload }
    >({
        mutationFn: updateBudget,
        onSuccess: async (response, variables) => {
            toast.success(response.message || "Budget updated successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: budgetQueryKey }),
                queryClient.invalidateQueries({ queryKey: budgetDetailQueryKey(variables.id) }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getBudgetErrorMessage(error) || "Failed to update budget.");
        },
    });
};

export const useDeleteBudget = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteBudgetResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteBudget,
        onSuccess: async (response, budgetId) => {
            toast.success(response.message || "Budget deleted successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: budgetQueryKey }),
                queryClient.removeQueries({ queryKey: budgetDetailQueryKey(budgetId) }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getBudgetErrorMessage(error) || "Failed to delete budget.");
        },
    });
};
