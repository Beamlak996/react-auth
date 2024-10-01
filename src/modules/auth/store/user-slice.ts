import { StateCreator } from "zustand";
import { UserSlice } from "../types/user-slice-types";

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]], 
  [], 
  UserSlice
> = (set) => ({
  user: null, 
  accessToken: null, 
  loading: false, 
  error: null, 

  setUser: (user) =>
    set((state) => {
      state.user = user;
      state.error = null;
    }),

  setAccessToken: (token) =>
    set((state) => {
      state.accessToken = token;
    }),

  logout: (callback) =>
    set((state) => {
      state.user = null;
      state.accessToken = null;
      if (callback) callback();
    }),

  setLoginError: (error) =>
    set((state) => {
      state.error = error;
      state.loading = false;
    }),

  resetError: () =>
    set((state) => {
      state.error = null;
    }),

  loginInStart: () =>
    set((state) => {
      state.loading = true;
      state.error = null;
    }),

  loginInSuccess: () =>
    set((state) => {
      state.loading = false;
    }),
});
