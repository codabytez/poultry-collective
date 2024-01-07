/* eslint-disable react-hooks/rules-of-hooks */
import useAddToCart from "@/hooks/useAddToCart";
import useDeleteAllCartByUserId from "@/hooks/useDeleteAllCartByUserId";
import useGetAllCart from "@/hooks/useGetAllCart";
import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type CartStore = {
  cart: any[];
  addToCart: (product: any) => Promise<void>;
  removeTempItem: (productId: string) => void;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => void;
  loadUserCart: (userId: string) => Promise<void>;
  deleteAllCart: (userId: string) => Promise<void>;
};

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        cart: [],

        addToCart: async ({
          user_id,
          $id,
          quantity,
          product_weight,
          product_price,
          product_name,
          product_image,
        }) => {
          const result = await useAddToCart(
            user_id,
            $id,
            quantity,
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
        },
        clearCart: () => {
          set(() => ({ cart: [] }));
        },
        loadUserCart: async (userId: string) => {
          const userCartItems = await useGetAllCart(userId);
          set({ cart: userCartItems });
        },
        deleteAllCart: async (userId: string) => {
          await useDeleteAllCartByUserId(userId);
          set({ cart: [] });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
