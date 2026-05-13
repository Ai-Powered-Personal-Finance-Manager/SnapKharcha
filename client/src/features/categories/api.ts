"use client";

import { clientAPI } from "@/src/lib/api/api";
import type { AxiosError } from "axios";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const categoryQueryKey = ["categories"] as const;

export const categoryDetailQueryKey = (id: string) => ["categories", id] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export type CategoryItem = {
    id: string;
    name: string;
    userId: string;
    icon: string | null;
    tags: string[];
    color: string;
    deletedAt: string | null;
};

export type CategoryApiResponse = {
    success: boolean;
    message: string;
    data: CategoryItem[];
};

export type CreateCategoryPayload = {
    name: string;
    icon?: string | null;
    tags: string[];
    color: string;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export type CategoryMutationResponse = {
    success: boolean;
    message: string;
    data?: CategoryItem;
};

export type DeleteCategoryResponse = {
    success: boolean;
    message: string;
};

// ─── API Calls ────────────────────────────────────────────────────────────────

export const fetchAllCategories = async (): Promise<CategoryApiResponse> => {
    const response = await clientAPI.get<CategoryApiResponse>("/category");
    return response.data;
};

export const fetchCategoryById = async (id: string): Promise<CategoryItem> => {
    const response = await clientAPI.get<CategoryMutationResponse>(`/category/${id}`);
    return response.data.data as CategoryItem;
};

export const createCategory = async (
    payload: CreateCategoryPayload,
): Promise<CategoryMutationResponse> => {
    const response = await clientAPI.post<CategoryMutationResponse>("/category", payload);
    return response.data;
};

export const updateCategory = async ({
    id,
    payload,
}: {
    id: string;
    payload: UpdateCategoryPayload;
}): Promise<CategoryMutationResponse> => {
    const response = await clientAPI.patch<CategoryMutationResponse>(`/category/${id}`, payload);
    return response.data;
};

export const deleteCategory = async (id: string): Promise<DeleteCategoryResponse> => {
    const response = await clientAPI.delete<DeleteCategoryResponse>(`/category/${id}`);
    return response.data;
};

// ─── Error Handler ────────────────────────────────────────────────────────────

const getCategoryErrorMessage = (error: AxiosError<{ message?: string }>) => {
    return error.response?.data?.message || "Something went wrong.";
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const useGetCategories = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: categoryQueryKey,
        queryFn: fetchAllCategories,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useGetCategoryById = (id?: string) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: id ? categoryDetailQueryKey(id) : ["categories", "detail", "missing"],
        queryFn: () => fetchCategoryById(id as string),
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

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<
        CategoryMutationResponse,
        AxiosError<{ message?: string }>,
        CreateCategoryPayload
    >({
        mutationFn: createCategory,
        onSuccess: async (response) => {
            toast.success(response.message || "Category created successfully.");
            await queryClient.invalidateQueries({ queryKey: categoryQueryKey });
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getCategoryErrorMessage(error) || "Failed to create category.");
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<
        CategoryMutationResponse,
        AxiosError<{ message?: string }>,
        { id: string; payload: UpdateCategoryPayload }
    >({
        mutationFn: updateCategory,
        onSuccess: async (response, variables) => {
            toast.success(response.message || "Category updated successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: categoryQueryKey }),
                queryClient.invalidateQueries({ queryKey: categoryDetailQueryKey(variables.id) }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getCategoryErrorMessage(error) || "Failed to update category.");
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteCategoryResponse, AxiosError<{ message?: string }>, string>({
        mutationFn: deleteCategory,
        onSuccess: async (response, categoryId) => {
            toast.success(response.message || "Category deleted successfully.");
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: categoryQueryKey }),
                queryClient.removeQueries({ queryKey: categoryDetailQueryKey(categoryId) }),
            ]);
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(getCategoryErrorMessage(error) || "Failed to delete category.");
        },
    });
};
