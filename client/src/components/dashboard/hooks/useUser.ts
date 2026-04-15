import { useUserAction } from "./useUserAction";

export const useUser = () => {
  const userData = useUserAction();

  return {
    userData,
  };
};
