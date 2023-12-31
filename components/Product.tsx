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
import { useProductStore } from "@/stores/product";
import { useUser } from "@/context/user";
import { notify } from "./UI/Toast";
import CartModal from "./buyer/CartModal";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "./UI/LoadingSkeleton";
import useUpdateProductQuantity from "@/hooks/useUpdateProductQuantity";
import useGetProductById from "@/hooks/useGetProductById";
import { Link } from "nextjs13-progress";

const Product: NextPage<ProductProps> = (props) => {
  const contextUser = useUser();
  const Router = useRouter();
  const { setProductsById, allProducts } = useProductStore();
  const { addProductQuantity, removeProductQuantity } =
    useUpdateProductQuantity();
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
    product_id,
    $id,
  } = props;
  const [localQuantityAvailable, setLocalQuantityAvailable] =
    useState<any>(quantity_available);
  const addQty = 1;

  const fetchProductQuantity = async () => {
    try {
      if ($id === undefined) return console.log("$id is undefined");
      const product = await useGetProductById($id);
      if (!product) {
        throw new Error("Product not found in the cart.");
      }
      if (product) {
        setLocalQuantityAvailable(product.quantity_available);
        console.log("product", product);
        console.log("all products", allProducts);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const onAddToCart = async () => {
    setIsLoading(true);
    if (!contextUser.user) return Router.push("/login");

    const existingItem = cart.find((item) => item.product_id === props.$id);
    if (existingItem) {
      notify({
        message: "Item already in cart.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    console.log(
      props.product_name,
      "before quantity",
      quantity_available,
      addQty
    );

    try {
      await removeProductQuantity(
        props.$id,
        String(Number(quantity_available) - Number(addQty))
      );
      console.log(
        props.product_name,
        "after quantity",
        quantity_available,
        addQty
      );
      await fetchProductQuantity();

      await addToCart({
        user_id,
        $id,
        quantity: String(addQty),
        product_weight,
        product_price,
        product_name,
        product_image: product_image[0],
      });
      if (contextUser.user) return loadUserCart(contextUser.user.id);
    } catch (error) {
      console.error("Error adding to cart:", error);

      throw new Error("Failed to add the item to the cart. Please try again.");
    } finally {
      setTimeout(() => {
        setIsModalOpen(true);
        setIsLoading(false);
      }, 2000);
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
        {/* @ts-ignore */}
        <Link
          className="relative w-[427px] h-[300px] transition-all hover:opacity-80 cursor-pointer duration-300"
          href={`/buyer/product/${props.$id}`}
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
            In stock: {localQuantityAvailable}
          </p>
          <p className="inline-flex py-1 px-2 items-start gap-2 bg-[#CAF0C2] text-black text-SC-03 font-normal absolute left-0 bottom-0">
            Weight: {product_weight} kg
          </p>
        </Link>
        <div className="flex w-full justify-between items-center text-cod-gray-cg-600 text-xl leading-9">
          <h3>{product_name}</h3>
          <p>Price: ${Number(product_price).toLocaleString()}</p>
        </div>
        <Button size="lg" onClick={onAddToCart} isLoading={isLoading}>
          Add to Cart
        </Button>
        <Modal>
          <CartModal items={cart} fetchProductQuantity={fetchProductQuantity} />
        </Modal>
      </div>
    </>
  );
};

export default Product;
