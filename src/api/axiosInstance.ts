import axios, { AxiosInstance, AxiosError } from "axios";
import { useStore } from "@/store/store";
import { refreshToken } from "@/modules/auth/services/auth-queries";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
  });

  // Set up request interceptor
  instance.interceptors.request.use((config) => {
    const accessToken = useStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Set up response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Check if it's a login attempt and credentials are wrong
      if (
        originalRequest.url === "/auth/login" &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        return Promise.reject(error); // Login failed, do not retry
      }

      // Retry the request for non-login requests if it failed due to token expiration (401 Unauthorized)
      if (error.response?.status === 401 && !originalRequest._retry) {
        // Check if it's already retrying
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        // Set the request retry flag and initiate token refresh
        originalRequest._retry = true;

        isRefreshing = true;

        try {
          const newAccessToken = await refreshToken();
          useStore.getState().setAccessToken(newAccessToken);

          // Update the original request with the new token and retry
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);
          useStore.getState().logout(); // Logout the user if refresh fails
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error); // Other errors, do not retry
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export const useAxiosInstance = () => axiosInstance;
