/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";

type SellerProfileStore = {
  currentSellerProfile: any;
  setCurrentSellerProfile: (userId: string) => Promise<void>;
};

export const useSellerProfileStore = create<SellerProfileStore>()(
  devtools(
    persist(
      (set) => ({
        currentSellerProfile: null,

        setCurrentSellerProfile: async (userId: string) => {
          const result = await useGetSellerProfileByUserId(userId);
          set({ currentSellerProfile: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
