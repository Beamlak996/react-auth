import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import { LoginRequest, User } from "../types/user";
import { useAuthService } from "./auth-api";
import { TestCreateUserSchema } from "@/types/test-create-user-schema";

export const useLoginMutation = () => {
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const { loginUser } = useAuthService();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (data) => {
      console.log(data);
      setUser(data.user);
      setAccessToken(data.accessToken);
    },
    onError: (error) => {
      console.error("Login failed: ", error);
    },
  });
};

export const useGetAllUsersQuery = () => {
  const { getAllUsers } = useAuthService();

  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
    
  });
};

// Logout Mutation
export const useLogoutMutation = () => {
  const { logoutUser } = useAuthService();

  return useMutation({
    mutationFn: logoutUser,
    
  });
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { createUser } = useAuthService();

  return useMutation({
    mutationFn: (data: TestCreateUserSchema) => createUser(data),
    onSuccess: async () => {
      console.log("User created successfully");
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("User creation failed: ", error);
    },
  });
};

// Token Refresh
export const refreshToken = async (): Promise<string | null> => {
  const { refreshUserToken } = useAuthService();

  try {
    const newAccessToken = await refreshUserToken();
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed: ", error);
    return null;
  }
};
