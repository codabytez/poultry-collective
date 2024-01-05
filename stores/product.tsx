/* eslint-disable react-hooks/rules-of-hooks */
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetProductById from "@/hooks/useGetProductById";
import useGetProductBySeller from "@/hooks/useGetProductBySeller";
import useDeleteProduct from "@/hooks/useDeleteProduct"; // Import the hook
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type ProductStore = {
  allProducts: any[];
  productsBySeller: any[];
  productsById: any | null;
  setAllProducts: () => void;
  setProductsBySeller: (userId: string) => void;
  setProductsById: (productId: string) => void;
  deleteProduct: (productId: string, currentImages: string[]) => void;
};

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set) => ({
        allProducts: [],
        productsBySeller: [],
        productsById: null,

        setAllProducts: async () => {
          const produts = await useGetAllProducts();
          const result = await Promise.all(
            produts.map(async (product) => {
              const url = await useCreateBucketUrl(product.product_image[0]);
              return { ...product, imageUrl: url };
            })
          );
          set({ allProducts: result });
        },

        setProductsBySeller: async (userId: string) => {
          const products = await useGetProductBySeller(userId);
          const productsWithUrls = await Promise.all(
            products.map(async (product) => {
              const url = await useCreateBucketUrl(product.product_image[0]);
              return { ...product, imageUrl: url };
            })
          );
          set({ productsBySeller: productsWithUrls });
        },

        setProductsById: async (productId: string) => {
          const product = await useGetProductById(productId);
          const url = await useCreateBucketUrl(product.product_image[0]);
          const result = { ...product, imageUrl: url };
          set({ productsById: result });
        },

        deleteProduct: async (productId: string, currentImages: string[]) => {
          await useDeleteProduct(productId, currentImages);
          // remove the product from allProducts and productsBySeller
          set((state) => ({
            allProducts: state.allProducts.filter(
              (product) => product.id !== productId
            ),
            productsBySeller: state.productsBySeller.filter(
              (product) => product.id !== productId
            ),
          }));
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
