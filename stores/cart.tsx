/* eslint-disable react-hooks/rules-of-hooks */
import useAddToCart from "@/hooks/useAddToCart";
import useGetAllCart from "@/hooks/useGetAllCart";
import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type CartStore = {
  cart: any[];
  addToCart: (product: any) => void;
  removeTempItem: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  loadUserCart: (userId: string) => void;
};

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        cart: [],

        addToCart: async ({
          user_id,
          $id,
          quantity_available,
          product_weight,
          product_price,
          product_name,
          product_image,
        }) => {
          const result = await useAddToCart(
            user_id,
            $id,
            quantity_available,
            product_weight,
            product_price,
            product_name,
            product_image
          );
          set((state) => ({ cart: [...state.cart, result] }));
        },
        removeTempItem: (productId: string) => {
          set((state) => ({
            cart: state.cart.filter((item) => item.$id !== productId),
          }));
        },
        removeFromCart: async (productId: string) => {
          const result = await useRemoveFromCart(productId);
          // set((state) => ({ cart: [...state.cart, result] }));
        },
        clearCart: () => {
          set(() => ({ cart: [] }));
        },
        loadUserCart: async (userId: string) => {
          const userCartItems = await useGetAllCart(userId);
          set({ cart: userCartItems });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
