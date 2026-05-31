import axios from "axios";
import { clientAPI } from "@/src/lib/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
    ProfileResponse,
    UpdateProfilePayload,
} from "./types";

export const getProfile = async (): Promise<ProfileResponse> => {
    const response = await clientAPI.get<ProfileResponse>("/profile");
    return response.data;
};

export const updateProfile = async (
    profileData: UpdateProfilePayload,
): Promise<ProfileResponse> => {
    const response = await clientAPI.patch<ProfileResponse>("/profile", profileData);
    return response.data;
};

export const useGetProfile = () => {
    const query = useQuery<ProfileResponse, Error>({
        queryKey: ["profile"],
        queryFn: getProfile,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return {
        ...query,
        profile: query.data?.data,
    };
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation<ProfileResponse, unknown, UpdateProfilePayload>({
        mutationFn: updateProfile,
        onSuccess: (response) => {
            toast.success(response.message || "Profile updated successfully");
            queryClient.setQueryData(["profile"], response);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: unknown) => {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error
                  ? error.message
                  : "Failed to update profile";

            toast.error(message);
        },
    });
};