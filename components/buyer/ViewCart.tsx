"use client";
import MainLayout from "@/layouts/MainLayout";
import { NextPage } from "next";
import CartItem from "./CartItem";
import Button from "../UI/Button";
import Product from "../Product";
import { ProductProps, cartItemProps } from "@/@types";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { useUser } from "@/context/user";
import withRoleCheck from "@/helpers/withRoleCheck";

const ViewCart: NextPage = () => {
  const contextUser = useUser();
  const { cart, loadUserCart } = useCartStore();
  const { allProducts } = useProductStore();
  const [viewOthers, setViewOthers] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (contextUser.user) {
      loadUserCart(contextUser.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setViewOthers(
      allProducts.filter(
        (product) =>
          !cart.some((cartItem) => cartItem.product_id === product.$id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <MainLayout>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-172px)]">
          <h2 className="text-H2-03 text-cod-gray-cg-600 m-10">
            Your cart is empty
          </h2>
          <Button size="lg" href="/buyer">
            Shop Now
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-H3-03 sm:text-H2-03 text-cod-gray-cg-600 m-10">
            My Cart
          </h2>

          <div className="flex flex-wrap gap-6 px-4 justify-center sm:justify-start">
            {cart.map((product: cartItemProps) => (
              <CartItem key={product.$id} {...product} />
            ))}
          </div>
          <div className="max-w-[1312px]">
            <div className="w-max sm:w-[460px] mt-20 mb-36 mx-auto">
              <Button size="lg" fullWidth href="/buyer/checkout">
                Proceed to Checkout
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px] px-6">
            {viewOthers.slice(0, 3).map((product: ProductProps) => (
              <Product key={product.$id} {...product} />
            ))}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default withRoleCheck(ViewCart, ["buyer"]);
