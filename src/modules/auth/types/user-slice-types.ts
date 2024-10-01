import { User } from "./user";

export type UserState = {
  user: User | null; 
  accessToken: string | null; 
  loading: boolean; 
  error: string | null; 
};

export type UserActions = {
  setUser: (user: User | null) => void; 
  setAccessToken: (token: string | null) => void; 
  logout: (callback?: () => void) => void; 
  setLoginError: (error: string | null) => void; 
  resetError: () => void; 
};

export type UserSlice = UserState & UserActions;
