/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import useGetSellerProfileById from "@/hooks/useGetSellerProfileById";

type SellerProfileStore = {
  currentSellerProfile: any;
  setCurrentSellerProfile: (userId: string) => Promise<void>;
  setSellerIdBySellerId: (sellerId: string) => Promise<void>;
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

        setSellerIdBySellerId: async (sellerId: string) => {
          const result = await useGetSellerProfileById(sellerId);
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
