import { useUserAction } from "./useUserAction";

export const useUser = () => {
  const { data: user, isPending: isLoading } = useUserAction();

  return {
    user,
    isLoading,
  };
};
