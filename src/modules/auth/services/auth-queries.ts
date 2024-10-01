import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import { LoginRequest } from "../types/user";
import { useAuthService } from "./auth-api";

export const useLoginMutation = () => {
    const setUser = useStore((state) => state.setUser)
    const setAccessToken = useStore((state) => state.setAccessToken)

     const { loginUser } = useAuthService();

    return useMutation({
      mutationFn: (data: LoginRequest) => loginUser(data),
      onSuccess: (data) => {
        console.log(data)
        setUser(data.user);
        setAccessToken(data.accessToken);
      },
    });
} 

// Token Refresh
export const refreshToken = async (): Promise<string | null> => {
  const { refreshUserToken } = useAuthService();

  try {
    const newAccessToken = await refreshUserToken();
    return newAccessToken;
  } catch {
    return null;
  }
};