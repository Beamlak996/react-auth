import { useAxiosInstance } from "@/api/axiosInstance";
import { LoginRequest } from "../types/user";

export const useAuthService = () => {
  const axiosInstance = useAxiosInstance();

  const loginUser = async (data: LoginRequest) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  };

  const refreshUserToken = async () => {
    const response = await axiosInstance.post("/auth/refresh");
    return response.data.accessToken;
  };

  return { loginUser, refreshUserToken };
};
