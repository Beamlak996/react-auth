import { Store } from "@/types/store-type";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { subscribeWithSelector, persist } from "zustand/middleware";
import { createUserSlice } from "@/modules/auth/store/user-slice";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createUserSlice(...a),
        }))
      ),
      {
        name: "react-auth",
      }
    )
  )
);
