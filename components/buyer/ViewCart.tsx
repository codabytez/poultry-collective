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
import { useRouter } from "next/navigation";

const ViewCart: NextPage = () => {
  const contextUser = useUser();
  const Router = useRouter();
  const { setIsModalOpen } = useGeneralStore();
  const [isLoading, setIsLoading] = useState(false);
  const { cart, loadUserCart, removeFromCart } = useCartStore();
  const { allProducts } = useProductStore();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };

  const handleProceedToCheckout = () => {
    setIsLoading(true);
    return Router.push("/buyer/checkout");
  };

  return (
    <MainLayout>
      <h2 className="text-H2-03 text-cod-gray-cg-600 m-10">My Cart</h2>

      <div className="flex flex-wrap gap-4 px-4">
        {cart.map((product: cartItemProps) => (
          <CartItem key={product.$id} {...product} onDelete={handleDelete} />
        ))}
      </div>
      <div className="max-w-[1312px]">
        <div className="w-[460px] mt-20 mb-36 mx-auto">
          <Button
            size="lg"
            fullWidth
            onClick={handleProceedToCheckout}
            isLoading={isLoading}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 px-4 w-max mb-28">
        {viewOthers.slice(0, 3).map((product: ProductProps) => (
          <Product key={product.$id} {...product} />
        ))}
      </div>
    </MainLayout>
  );
};

export default ViewCart;
