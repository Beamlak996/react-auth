import axios, { AxiosInstance } from "axios";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { refreshToken } from "@/modules/auth/services/auth-queries";

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
  });

  return instance;
};

export const useAxiosInstance = () => {
  const { accessToken, setAccessToken } = useStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      setAccessToken: state.setAccessToken,
    }))
  );

  const axiosInstance = createAxiosInstance();

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
