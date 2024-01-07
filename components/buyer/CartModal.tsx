"use client";
import { NextPage } from "next";
import { CartModalProps, ProductProps, cartItemProps } from "@/@types";
import Button from "../UI/Button";
import CartItemPopUp from "./CartItemPopUp";
import { useCartStore } from "@/stores/cart";
import { useEffect, useState } from "react";
import { useGeneralStore } from "@/stores/general";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user";
import nProgress from "nprogress";

const CartModal: NextPage<CartModalProps> = ({
  items,
  fetchProductQuantity,
}) => {
  const { setIsModalOpen } = useGeneralStore();
  const { cart, loadUserCart } = useCartStore();
  const router = useRouter();
  const contextUser = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewCart = async () => {
    setIsLoading(true);
    nProgress.start();

    try {
      router.push("/buyer/viewcart");
      if (contextUser?.user) await loadUserCart(contextUser.user.id);
    } catch (error) {
      throw new Error("Error loading cart");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    nProgress.start();

    try {
      router.push("/buyer/checkout");
      if (contextUser?.user) loadUserCart(contextUser.user.id);
    } catch (error) {
      throw new Error("Error loading cart");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      nProgress.done();
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] w-[476px] ">
        <h4 className="text-H4-03 font-normal text-cod-gray-cg-600 mb-3.5 ml-2.5">
          Your Cart is Empty
        </h4>
        <Button
          size="lg"
          onClick={() => setIsModalOpen(false)}
          isLoading={isLoading}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-H4-03 font-normal text-cod-gray-cg-600 mb-3.5 ml-2.5">
        My Cart,
        <span className=" text-cod-gray-cg-400">
          {items.length} {items.length > 1 ? "Items" : "Item"}
        </span>
      </h4>
      <div className="flex flex-col gap-8 items-start justify-start h-[50vh] overflow-y-scroll">
        {items.map((item: CartModalProps) => (
          <CartItemPopUp
            key={item.$id}
            items={item}
            fetchProductQuantity={fetchProductQuantity}
          />
        ))}
      </div>
      <div className="flex justify-evenly gap-10 flex-1 mt-7">
        <Button size="lg" onClick={handleViewCart}>
          View Cart
        </Button>

        <Button size="lg" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
