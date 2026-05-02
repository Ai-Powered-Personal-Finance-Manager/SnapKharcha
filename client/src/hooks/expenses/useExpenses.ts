"use client";

import { clientAPI } from "@/src/lib/api/api";
import { budgetDetailQueryKey, budgetQueryKey } from "@/src/hooks/budgets/useBudgets";
import type {
    CreateExpensePayload,
    DeleteExpenseResponse,
    ExpenseApiItem,
    ExpenseApiListResponse,
    ExpenseMutationResponse,
    UpdateExpensePayload,
} from "@/src/types/expense";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const expenseQueryKey = ["expenses"] as const;

export const expenseDetailQueryKey = (id: string) => ["expense", id] as const;

const getExpenseErrorMessage = (error: AxiosError<{ message?: string }>) => {
    return error.response?.data?.message || "Something went wrong.";
};

export const fetchAllExpenses = async (): Promise<ExpenseApiListResponse> => {
    const response = await clientAPI.get<ExpenseApiListResponse>("/expense");
    return response.data;
};

export const fetchExpenseById = async (id: string): Promise<ExpenseApiItem> => {
    const response = await clientAPI.get<ExpenseMutationResponse>(`/expense/${id}`);
    return response.data.data as ExpenseApiItem;
};

export const createExpense = async (
    payload: CreateExpensePayload,
): Promise<ExpenseMutationResponse> => {
    const response = await clientAPI.post<ExpenseMutationResponse>("/expense", payload);
    return response.data;
};

export const updateExpense = async ({
    id,
    payload,
}: {
    id: string;
    payload: UpdateExpensePayload;
}): Promise<ExpenseMutationResponse> => {
    const response = await clientAPI.patch<ExpenseMutationResponse>(`/expense/${id}`, payload);
    return response.data;
};

export const deleteExpense = async (id: string): Promise<DeleteExpenseResponse> => {
    const response = await clientAPI.delete<DeleteExpenseResponse>(`/expense/${id}`);
    return response.data;
};

export const useGetExpenses = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: expenseQueryKey,
        queryFn: fetchAllExpenses,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useGetExpenseById = (id?: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: id ? expenseDetailQueryKey(id) : ["expense", "detail", "missing"],
        queryFn: () => fetchExpenseById(id as string),
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

export const useCreateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation<ExpenseMutationResponse, AxiosError<{ message?: string }>, CreateExpensePayload>({
        mutationFn: createExpense,
        onSuccess: async (response) => {
            toast.success(response.message || "Expense created successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: expenseQueryKey }),
                queryClient.invalidateQueries({ queryKey: budgetQueryKey }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getExpenseErrorMessage(error) || "Failed to create expense.");
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();

    return useMutation<ExpenseMutationResponse, AxiosError<{ message?: string }>, { id: string; payload: UpdateExpensePayload }>({
        mutationFn: updateExpense,
        onSuccess: async (response, variables) => {
            toast.success(response.message || "Expense updated successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: expenseQueryKey }),
                queryClient.invalidateQueries({ queryKey: expenseDetailQueryKey(variables.id) }),
                queryClient.invalidateQueries({ queryKey: budgetQueryKey }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getExpenseErrorMessage(error) || "Failed to update expense.");
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteExpenseResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteExpense,
        onSuccess: async (response, expenseId) => {
            toast.success(response.message || "Expense deleted successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: expenseQueryKey }),
                queryClient.removeQueries({ queryKey: expenseDetailQueryKey(expenseId) }),
                queryClient.invalidateQueries({ queryKey: budgetQueryKey }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getExpenseErrorMessage(error) || "Failed to delete expense.");
        },
    });
};