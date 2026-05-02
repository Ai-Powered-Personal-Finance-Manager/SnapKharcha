"use client";

import { clientAPI } from "@/src/lib/api/api";
import type {
    CreateIncomeEntryPayload,
    CreateIncomeSourcePayload,
    DeleteIncomeResponse,
    IncomeApiListData,
    IncomeApiListResponse,
    IncomeEntryMutationResponse,
    IncomeSourceMutationResponse,
    UpdateIncomeEntryPayload,
    UpdateIncomeSourcePayload,
} from "@/src/types/income";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const incomeQueryKey = ["income"] as const;

export const incomeSourceQueryKey = (id: string) => ["income-source", id] as const;

export const incomeEntryQueryKey = (id: string) => ["income-entry", id] as const;

const getIncomeErrorMessage = (error: AxiosError<{ message?: string }>) => {
    return error.response?.data?.message || "Something went wrong.";
};

export const fetchIncomeDashboard = async (): Promise<IncomeApiListData> => {
    const response = await clientAPI.get<IncomeApiListResponse>("/income");
    return response.data.data;
};

export const createIncomeSource = async (payload: CreateIncomeSourcePayload): Promise<IncomeSourceMutationResponse> => {
    const response = await clientAPI.post<IncomeSourceMutationResponse>("/income/sources", payload);
    return response.data;
};

export const updateIncomeSource = async ({
    id,
    payload,
}: {
    id: string;
    payload: UpdateIncomeSourcePayload;
}): Promise<IncomeSourceMutationResponse> => {
    const response = await clientAPI.patch<IncomeSourceMutationResponse>(`/income/sources/${id}`, payload);
    return response.data;
};

export const deleteIncomeSource = async (id: string): Promise<DeleteIncomeResponse> => {
    const response = await clientAPI.delete<DeleteIncomeResponse>(`/income/sources/${id}`);
    return response.data;
};

export const createIncomeEntry = async (payload: CreateIncomeEntryPayload): Promise<IncomeEntryMutationResponse> => {
    const response = await clientAPI.post<IncomeEntryMutationResponse>("/income/entries", payload);
    return response.data;
};

export const updateIncomeEntry = async ({
    id,
    payload,
}: {
    id: string;
    payload: UpdateIncomeEntryPayload;
}): Promise<IncomeEntryMutationResponse> => {
    const response = await clientAPI.patch<IncomeEntryMutationResponse>(`/income/entries/${id}`, payload);
    return response.data;
};

export const deleteIncomeEntry = async (id: string): Promise<DeleteIncomeResponse> => {
    const response = await clientAPI.delete<DeleteIncomeResponse>(`/income/entries/${id}`);
    return response.data;
};

export const useGetIncomes = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: incomeQueryKey,
        queryFn: fetchIncomeDashboard,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useCreateIncomeSource = () => {
    const queryClient = useQueryClient();

    return useMutation<IncomeSourceMutationResponse, AxiosError<{ message?: string }>, CreateIncomeSourcePayload>({
        mutationFn: createIncomeSource,
        onSuccess: async (response) => {
            toast.success(response.message || "Income source created successfully.");
            await queryClient.invalidateQueries({ queryKey: incomeQueryKey });
        },
        onError: (error) => {
            toast.error(getIncomeErrorMessage(error) || "Failed to create income source.");
        },
    });
};

export const useUpdateIncomeSource = () => {
    const queryClient = useQueryClient();

    return useMutation<IncomeSourceMutationResponse, AxiosError<{ message?: string }>, { id: string; payload: UpdateIncomeSourcePayload }>({
        mutationFn: updateIncomeSource,
        onSuccess: async (response, variables) => {
            toast.success(response.message || "Income source updated successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: incomeQueryKey }),
                queryClient.invalidateQueries({ queryKey: incomeSourceQueryKey(variables.id) }),
            ]);
        },
        onError: (error) => {
            toast.error(getIncomeErrorMessage(error) || "Failed to update income source.");
        },
    });
};

export const useDeleteIncomeSource = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteIncomeResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteIncomeSource,
        onSuccess: async (response, sourceId) => {
            toast.success(response.message || "Income source deleted successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: incomeQueryKey }),
                queryClient.removeQueries({ queryKey: incomeSourceQueryKey(sourceId) }),
            ]);
        },
        onError: (error) => {
            toast.error(getIncomeErrorMessage(error) || "Failed to delete income source.");
        },
    });
};

export const useCreateIncomeEntry = () => {
    const queryClient = useQueryClient();

    return useMutation<IncomeEntryMutationResponse, AxiosError<{ message?: string }>, CreateIncomeEntryPayload>({
        mutationFn: createIncomeEntry,
        onSuccess: async (response) => {
            toast.success(response.message || "Income entry logged successfully.");
            await queryClient.invalidateQueries({ queryKey: incomeQueryKey });
        },
        onError: (error) => {
            toast.error(getIncomeErrorMessage(error) || "Failed to log income entry.");
        },
    });
};

export const useUpdateIncomeEntry = () => {
    const queryClient = useQueryClient();

    return useMutation<IncomeEntryMutationResponse, AxiosError<{ message?: string }>, { id: string; payload: UpdateIncomeEntryPayload }>({
        mutationFn: updateIncomeEntry,
        onSuccess: async (response, variables) => {
            toast.success(response.message || "Income entry updated successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: incomeQueryKey }),
                queryClient.invalidateQueries({ queryKey: incomeEntryQueryKey(variables.id) }),
            ]);
        },
        onError: (error) => {
            toast.error(getIncomeErrorMessage(error) || "Failed to update income entry.");
        },
    });
};

export const useDeleteIncomeEntry = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteIncomeResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteIncomeEntry,
        onSuccess: async (response, entryId) => {
            toast.success(response.message || "Income entry deleted successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: incomeQueryKey }),
                queryClient.removeQueries({ queryKey: incomeEntryQueryKey(entryId) }),
            ]);
        },
        onError: (error) => {
            toast.error(getIncomeErrorMessage(error) || "Failed to delete income entry.");
        },
    });
};