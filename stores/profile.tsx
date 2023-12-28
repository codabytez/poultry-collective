/* eslint-disable react-hooks/rules-of-hooks */
import { profileProps } from "@/@types";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type ProfileStore = {
  currentProfile: profileProps | null;
  setCurrentProfile: (userId: string) => void;
};

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (set) => ({
        currentProfile: null,

        setCurrentProfile: async (userId: string) => {
          const result = await useGetProfileByUserId(userId);
          set({ currentProfile: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
