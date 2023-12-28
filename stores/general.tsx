import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type GeneralStore = {
  isLoading: boolean;
  isModalOpen: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export const useGeneralStore = create<GeneralStore>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        isModalOpen: false,
        setIsLoading: (isLoading) => {
          set({ isLoading });
        },
        setIsModalOpen: (isModalOpen) => {
          set({ isModalOpen });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
