"use client";
import { NextPage } from "next";
import { CartModalProps } from "@/@types";
import Button from "../UI/Button";
import CartItemPopUp from "./CartItemPopUp";
import { useCartStore } from "@/stores/cart";
import { useEffect } from "react";
import { useGeneralStore } from "@/stores/general";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user";

const CartModal: NextPage<CartModalProps> = ({ items, onDelete }) => {
  const { setIsModalOpen } = useGeneralStore();
  const { cart, loadUserCart } = useCartStore();
  const router = useRouter();
  const contextUser = useUser();

  const handleViewCart = async () => {
    if (!contextUser?.user) return router.push("/login");
    router.push("/buyer/viewcart");
    setIsModalOpen(false);
    loadUserCart(contextUser.user.id);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] w-[476px] ">
        <h4 className="text-H4-03 font-normal text-cod-gray-cg-600 mb-3.5 ml-2.5">
          Your Cart is Empty
        </h4>
        <Button
          color="green"
          size="large"
          fullWidth
          onClick={() => setIsModalOpen(false)}
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
        {items.map((item) => (
          <CartItemPopUp key={item.$id} {...item} onDelete={onDelete} />
        ))}
      </div>
      <div className="flex justify-between gap-10 w-[200px] flex-1 mt-7">
        <Button color="green" size="large" fullWidth onClick={handleViewCart}>
          View Cart
        </Button>

        <Button color="white" size="large" fullWidth>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
