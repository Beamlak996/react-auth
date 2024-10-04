import React, { createContext, useContext, useEffect } from "react";
import { useStore } from "@/store/store";
import { refreshToken } from "@/modules/auth/services/auth-queries";
import { useAxiosInstance } from "@/api/axiosInstance";

interface AuthContextType {
  accessToken: string | null;
  handleRefreshToken: () => Promise<string | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, setAccessToken, logout } = useStore.getState();
  const axiosInstance = useAxiosInstance();

  const handleRefreshToken = async () => {
    try {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        setAccessToken(newAccessToken);
        return newAccessToken;
      }
      throw new Error("Failed to refresh token");
    } catch (error) {
      logout();
      // Optionally notify the user
    //   throw error;
    }
  };

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await handleRefreshToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, axiosInstance, logout]);

  return (
    <AuthContext.Provider value={{ accessToken, handleRefreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
