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


  setUser: (user) =>
    set((state) => {
      state.user = user;
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
});
