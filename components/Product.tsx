/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ProductProps } from "@/@types";
import { NextPage } from "next";
import Button from "./UI/Button";
import { useEffect, useState } from "react";
import Modal from "./UI/Modal";
import { useCartStore } from "@/stores/cart";
import { useGeneralStore } from "@/stores/general";
import { useUser } from "@/context/user";

import CartModal from "./buyer/CartModal";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "./UI/LoadingSkeleton";

const Product: NextPage<ProductProps> = (props) => {
  const contextUser = useUser();
  const Router = useRouter();
  const { isModalOpen, setIsModalOpen } = useGeneralStore();
  const { cart, addToCart, removeFromCart, removeTempItem, loadUserCart } =
    useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    user_id,
    product_image,
    imageUrl,
    product_name,
    farm_name,
    quantity_available,
    product_weight,
    product_price,
    $id,
  } = props;

  const onAddToCart = async () => {
    setIsLoading(true);
    if (!contextUser.user) return Router.push("/login");
    try {
      addToCart({
        user_id,
        $id,
        quantity_available,
        product_weight,
        product_price,
        product_name,
        product_image: product_image[0],
      });
      setIsModalOpen(true);
      if (contextUser.user) return loadUserCart(contextUser.user.id);
    } catch (error) {
      console.error("Error adding to cart:", error);

      throw new Error("Failed to add the item to the cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setIsLoading(true);
    try {
      removeTempItem(id);
      removeFromCart(id);
    } catch (error) {
      console.error("Error adding to cart:", error);

      throw new Error("Failed to add the item to the cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen && contextUser?.user) {
      loadUserCart(contextUser?.user?.id);
    }
  }, [isModalOpen, loadUserCart, contextUser?.user]);

  return (
    <>
      <div className="flex flex-col justify-center items-start gap-4 relative w-[427px] transition-all">
        <div
          className="relative w-[427px] h-[300px] transition-all hover:scale-105 cursor-pointer duration-300"
          onClick={() => Router.push(`/buyer/product/${$id}`)}
        >
          <img
            src={imageUrl}
            alt={product_name}
            className="h-full w-full object-cover "
          />
          <p className="inline-flex p-2 items-start gap-2 bg-cod-gray-cg-200 text-black text-SC-03 font-normal absolute top-0 left-0">
            {farm_name}
          </p>
          <p className="inline-flex py-1 px-2 items-start gap-2 bg-[#CAF0C2] text-black text-SC-03 font-normal absolute right-0 bottom-0">
            In stock: {quantity_available}
          </p>
          <p className="inline-flex py-1 px-2 items-start gap-2 bg-[#CAF0C2] text-black text-SC-03 font-normal absolute left-0 bottom-0">
            Weight: {product_weight} kg
          </p>
        </div>
        <div className="flex w-full justify-between items-center text-cod-gray-cg-600 text-xl leading-9">
          <h3>{product_name}</h3>
          <p>Price: ${Number(product_price).toLocaleString()}</p>
        </div>
        <Button size="lg" onClick={onAddToCart}>
          Add to Cart
        </Button>
        <Modal>
          <CartModal items={cart} onDelete={handleDelete} />
        </Modal>
      </div>
    </>
  );
};

export default Product;
