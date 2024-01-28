/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { cartItemProps } from "@/@types";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import useGetProductById from "@/hooks/useGetProductById";
import useUpdateProductQuantity from "@/hooks/useUpdateProductQuantity";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { Trash } from "iconsax-react";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import nProgress from "nprogress";
import withRoleCheck from "@/helpers/withRoleCheck";

const CartItem: NextPage<cartItemProps> = (props) => {
  const {
    $id,
    quantity,
    weight,
    price,
    product_name,
    image,
    product_id,
    user_id,
    fetchProductQuantity,
  } = props;
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addProductQuantity } = useUpdateProductQuantity();
  const { removeFromCart, loadUserCart } = useCartStore();

  useEffect(() => {
    const fetchUrl = async () => {
      if (image) {
        const imageSrc = image;
        const url = await useCreateBucketUrl(imageSrc);
        setImageUrl(url);
      }
    };

    fetchUrl();
  }, [image]);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    nProgress.start();
    try {
      // Find the product in the cart
      const product = await useGetProductById(id);
      if (!product) {
        throw new Error("Product not found in the cart.");
      }

      // Get the quantity available
      const quantity_available = product.quantity_available;
      if (!product_id) {
        throw new Error("Product not found in the cart.");
      }
      await addProductQuantity(
        product_id,
        String(Number(quantity_available) + Number(quantity))
      );
      if (fetchProductQuantity) await fetchProductQuantity();
      if (!user_id || !$id) throw new Error("Product not found in the cart.");
      await removeFromCart($id);
      await loadUserCart(user_id);
    } catch (error) {
      throw new Error("Failed to add the item to the cart. Please try again.");
    } finally {
      setIsLoading(false);
      nProgress.done();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="min-w-[300px] w-[70%] sm:w-[648px] sm:h-[326px] rounded bg-light-green-shade sm:py-14 sm:px-8 flex flex-col sm:flex-row gap-10 sm:gap-[74px] sm:items-center relative">
          <div className="h-[210px] w-full sm:w-[261px] bg-gray-300 animate-pulse" />

          <div className="inline-flex flex-col h-[122.5px] items-start px-4 pb-4 sm:px-0 sm:pb-0 justify-end animate-pulse">
            <div className="h-6 w-32 bg-gray-300 animate-pulse" />
            <div className="h-6 w-24 bg-gray-300 animate-pulse mt-2" />
            <div className="h-6 w-20 bg-gray-300 animate-pulse mt-2" />
          </div>

          <div className="h-8 w-8 bg-gray-300 animate-pulse absolute right-6 top-[70%] sm:top-20" />
        </div>
      ) : (
        <div className="min-w-[300px] w-[70%] sm:w-[648px] sm:h-[326px] rounded bg-light-green-shade sm:py-14 sm:px-8 flex flex-col sm:flex-row gap-10 sm:gap-[74px] sm:items-center relative">
          <img
            src={imageUrl}
            alt={product_name}
            className="h-[210px] w-full sm:w-[261px] object-cover shrink-0"
          />
          <div className="inline-flex flex-col h-[122.5px] items-start px-4 pb-4 sm:px-0 sm:pb-0 justify-end shrink-0 text-H4-03 text-cod-gray-cg-600">
            <h4>
              {weight}kg {product_name && product_name.split(" ").pop()}
            </h4>
            <h5 className=" text-H5-03 font-semibold">
              {quantity} {Number(quantity) > 1 ? "crates" : "crate"}
            </h5>
            <h4>₦ {Number(price).toLocaleString()}</h4>
          </div>

          <Trash
            size={32}
            className="text-[#292D32] hover:scale-105  cursor-pointer hover:text-red-r-600 absolute right-6 top-[70%] sm:top-20"
            onClick={() => product_id && handleDelete(product_id)}
          />
        </div>
      )}
    </>
  );
};

export default CartItem;
