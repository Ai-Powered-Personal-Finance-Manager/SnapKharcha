"use client";

import { clientAPI } from "@/src/lib/api/api";
import type {
    CreateLoanPayload,
    DeleteLoanResponse,
    LoanApiItem,
    LoanApiListResponse,
    LoanMutationResponse,
    UpdateLoanPayload,
} from "@/src/features/loans-and-emis/types";
import { normalizeLoanStatus, toLoanApiStatus } from "@/src/utils/loan";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const loanQueryKey = ["loans"] as const;

export const loanDetailQueryKey = (id: string) => ["loan", id] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type LoanServerItem = Omit<LoanApiItem, "status"> & {
    status?: string | null;
};

type LoanListResponseData =
    | LoanServerItem[]
    | {
          loans?: LoanServerItem[];
      };

type LoanListApiResponse = {
    success: boolean;
    message?: string;
    data: LoanListResponseData;
};

// ─── Error Handler ────────────────────────────────────────────────────────────

const getLoanErrorMessage = (error: AxiosError<{ message?: string }>) => {
    return error.response?.data?.message || "Something went wrong.";
};

// ─── Data Normalization ───────────────────────────────────────────────────────

const normalizeLoanItem = (loan: LoanServerItem): LoanApiItem => {
    return {
        ...loan,
        status: normalizeLoanStatus(loan.status),
        note: loan.note ?? null,
    };
};

const normalizeLoanMutationResponse = (response: LoanMutationResponse): LoanMutationResponse => {
    if (!response.data) {
        return response;
    }

    return {
        ...response,
        data: normalizeLoanItem(response.data as LoanServerItem),
    };
};

const extractLoanItems = (data: LoanListResponseData): LoanServerItem[] => {
    if (Array.isArray(data)) {
        return data;
    }

    return data.loans ?? [];
};

// ─── API Calls ────────────────────────────────────────────────────────────────

export const fetchAllLoans = async (): Promise<LoanApiListResponse> => {
    const response = await clientAPI.get<LoanListApiResponse>("/loan");

    return {
        success: response.data.success,
        message: response.data.message,
        data: extractLoanItems(response.data.data).map(normalizeLoanItem),
    };
};

export const fetchLoanById = async (id: string): Promise<LoanApiItem> => {
    const response = await clientAPI.get<LoanMutationResponse>(`/loan/${id}`);
    return normalizeLoanMutationResponse(response.data).data as LoanApiItem;
};

export const createLoan = async (payload: CreateLoanPayload): Promise<LoanMutationResponse> => {
    const response = await clientAPI.post<LoanMutationResponse>("/loan", {
        ...payload,
        status: toLoanApiStatus(payload.status),
    });

    return normalizeLoanMutationResponse(response.data);
};

export const updateLoan = async ({
    id,
    payload,
}: {
    id: string;
    payload: UpdateLoanPayload;
}): Promise<LoanMutationResponse> => {
    const response = await clientAPI.patch<LoanMutationResponse>(
        `/loan/${id}`,
        payload.status ? { ...payload, status: toLoanApiStatus(payload.status) } : payload,
    );

    return normalizeLoanMutationResponse(response.data);
};

export const deleteLoan = async (id: string): Promise<DeleteLoanResponse> => {
    const response = await clientAPI.delete<DeleteLoanResponse>(`/loan/${id}`);
    return response.data;
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const useGetLoans = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: loanQueryKey,
        queryFn: fetchAllLoans,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useGetLoanById = (id?: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: id ? loanDetailQueryKey(id) : ["loan", "detail", "missing"],
        queryFn: () => fetchLoanById(id as string),
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

export const useCreateLoan = () => {
    const queryClient = useQueryClient();

    return useMutation<LoanMutationResponse, AxiosError<{ message?: string }>, CreateLoanPayload>({
        mutationFn: createLoan,
        onSuccess: async (response) => {
            toast.success(response.message || "Loan created successfully.");
            await queryClient.invalidateQueries({ queryKey: loanQueryKey });
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getLoanErrorMessage(error) || "Failed to create loan.");
        },
    });
};

export const useUpdateLoan = () => {
    const queryClient = useQueryClient();

    return useMutation<LoanMutationResponse, AxiosError<{ message?: string }>, { id: string; payload: UpdateLoanPayload }>({
        mutationFn: updateLoan,
        onSuccess: async (response, variables) => {
            toast.success(response.message || "Loan updated successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: loanQueryKey }),
                queryClient.invalidateQueries({ queryKey: loanDetailQueryKey(variables.id) }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getLoanErrorMessage(error) || "Failed to update loan.");
        },
    });
};

export const useDeleteLoan = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteLoanResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteLoan,
        onSuccess: async (response, loanId) => {
            toast.success(response.message || "Loan deleted successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: loanQueryKey }),
                queryClient.removeQueries({ queryKey: loanDetailQueryKey(loanId) }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getLoanErrorMessage(error) || "Failed to delete loan.");
        },
    });
};
