"use client";

import { clientAPI } from "@/src/lib/api/api";
import type {
    CreateIncomeSourcePayload,
    DeleteIncomeResponse,
    IncomeApiListResponse,
    IncomeSourceMutationResponse,
    UpdateIncomeSourcePayload,
} from "@/src/features/incomes/types";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const incomeQueryKey = ["income"] as const;

// ─── Error Handler ────────────────────────────────────────────────────────────

const getErrorMessage = (error: AxiosError<{ message?: string }>) =>
    error.response?.data?.message || "Something went wrong.";

// ─── API Calls ────────────────────────────────────────────────────────────────

const fetchIncomes = async (): Promise<IncomeApiListResponse> => {
    const response = await clientAPI.get<IncomeApiListResponse>("/income");
    return response.data;
};

const createIncome = async (payload: CreateIncomeSourcePayload): Promise<IncomeSourceMutationResponse> => {
    const response = await clientAPI.post<IncomeSourceMutationResponse>("/income", payload);
    return response.data;
};

const updateIncome = async ({ id, payload }: { id: string; payload: UpdateIncomeSourcePayload }): Promise<IncomeSourceMutationResponse> => {
    const response = await clientAPI.patch<IncomeSourceMutationResponse>(`/income/${id}`, payload);
    return response.data;
};

const deleteIncome = async (id: string): Promise<DeleteIncomeResponse> => {
    const response = await clientAPI.delete<DeleteIncomeResponse>(`/income/${id}`);
    return response.data;
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const useGetIncomes = () =>
    useQuery({
        queryKey: incomeQueryKey,
        queryFn: fetchIncomes,
    });

export const useCreateIncome = () => {
    const queryClient = useQueryClient();

    return useMutation<IncomeSourceMutationResponse, AxiosError<{ message?: string }>, CreateIncomeSourcePayload>({
        mutationFn: createIncome,
        onSuccess: async (response) => {
            toast.success(response.message || "Income created successfully.");
            await queryClient.invalidateQueries({ queryKey: incomeQueryKey });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useUpdateIncome = () => {
    const queryClient = useQueryClient();

    return useMutation<IncomeSourceMutationResponse, AxiosError<{ message?: string }>, { id: string; payload: UpdateIncomeSourcePayload }>({
        mutationFn: updateIncome,
        onSuccess: async (response) => {
            toast.success(response.message || "Income updated successfully.");
            await queryClient.invalidateQueries({ queryKey: incomeQueryKey });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useDeleteIncome = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteIncomeResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteIncome,
        onSuccess: async (response) => {
            toast.success(response.message || "Income deleted successfully.");
            await queryClient.invalidateQueries({ queryKey: incomeQueryKey });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
};
