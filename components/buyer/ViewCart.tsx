"use client";
import MainLayout from "@/layouts/MainLayout";
import { NextPage } from "next";
import { dummyProducts } from "../LandingPage/dummyProducts";
import CartItem from "./CartItem";
import Button from "../UI/Button";
import Product from "../Product";
import { ProductProps, cartItemProps } from "@/@types";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { useGeneralStore } from "@/stores/general";
import { useUser } from "@/context/user";

const ViewCart: NextPage = () => {
  const contextUser = useUser();
  const { setIsModalOpen } = useGeneralStore();

  const { cart, addToCart, loadUserCart, removeFromCart, removeTempItem } =
    useCartStore();
  const { allProducts, setAllProducts } = useProductStore();
  const [viewOthers, setViewOthers] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (contextUser.user) {
      loadUserCart(contextUser.user.id);
    }
    setIsModalOpen(false);
  }, [contextUser, loadUserCart, setIsModalOpen, cart, allProducts]);

  useEffect(() => {
    setViewOthers(
      allProducts.filter(
        (product) =>
          !cart.some((cartItem) => cartItem.product_id === product.$id)
      )
    );
  }, [allProducts, cart]);

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };

  return (
    <MainLayout>
      <h2 className="text-H2-03 text-cod-gray-cg-600 m-10">My Cart</h2>

      <div className="grid grid-cols-2 gap-4 w-max max-w-[1312px]">
        {cart.map((product: cartItemProps) => (
          <CartItem key={product.$id} {...product} onDelete={handleDelete} />
        ))}
      </div>
      <div className="max-w-[1312px]">
        <div className="w-[460px] mt-20 mb-36 mx-auto">
          <Button color="green" size="large" fullWidth>
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-3 w-max mb-28">
        {viewOthers.slice(0, 3).map((product: ProductProps) => (
          <Product key={product.$id} {...product} />
        ))}
      </div>
    </MainLayout>
  );
};

export default ViewCart;
