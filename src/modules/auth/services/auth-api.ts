import { useAxiosInstance } from "@/api/axiosInstance";
import { LoginRequest, User } from "../types/user";
import { TestCreateUserSchema } from "@/types/test-create-user-schema";

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

  const logoutUser = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  };

  const getAllUsers = async () => {
    const response = await axiosInstance.get<User[]>("/users");
    return response.data
  }

  const createUser = async (user: TestCreateUserSchema) => {
    const response = await axiosInstance.post<User>("/users", user);
    return response.data
  }

  return { loginUser, refreshUserToken, getAllUsers, createUser, logoutUser };
};
