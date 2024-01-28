/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { CartModalProps, cartItemProps } from "@/@types";
import { NextPage } from "next";
import { useCartStore } from "@/stores/cart";
import { useEffect, useState } from "react";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { Trash } from "iconsax-react";
import useGetProductById from "@/hooks/useGetProductById";
import useUpdateProductQuantity from "@/hooks/useUpdateProductQuantity";
import nProgress from "nprogress";
import withRoleCheck from "@/helpers/withRoleCheck";

const CartItemPopUp: NextPage<CartModalProps> = ({
  items,
  fetchProductQuantity,
}) => {
  const {
    user_id,
    $id,
    quantity,
    weight,
    price,
    product_name,
    image,
    product_id,
  } = items;
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addProductQuantity, removeProductQuantity } =
    useUpdateProductQuantity();
  const { removeFromCart, removeTempItem } = useCartStore();

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

  const handleDelete = async () => {
    setIsLoading(true);
    nProgress.start();

    try {
      if (!product_id) {
        throw new Error("Product not found");
      }
      const product = await useGetProductById(product_id);
      if (!product) {
        throw new Error("Product not found in the cart.");
      }

      const quantity_available = product.quantity_available;
      if (!product_id || !quantity) {
        throw new Error("Product not found in the cart.");
      }

      await addProductQuantity(
        product_id,
        String(Number(quantity_available) + Number(quantity))
      );

      if (fetchProductQuantity) {
        await fetchProductQuantity();
      }

      removeTempItem($id);
      await removeFromCart($id);
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
        <div className="w-full sm:w-[476px] sm:h-[200px] flex flex-col sm:flex-row gap-8 sm:items-center shrink-0 rounded bg-cod-gray-cg-50 sm:p-[30px] relative">
          <div className="h-[150px] w-full sm:w-[150px] bg-gray-300 animate-pulse" />

          <div className="inline-flex flex-col sm:h-[122.5px] items-start shrink-0 px-2 pb-2 sm:px-0 sm:pb-0">
            <div className="h-6 w-32 bg-gray-300 animate-pulse" />
            <div className="h-6 w-24 bg-gray-300 animate-pulse mt-2" />
            <div className="h-6 w-20 bg-gray-300 animate-pulse mt-2" />
          </div>
          <div className="h-8 w-8 bg-gray-300 animate-pulse absolute right-4 top-[60%] sm:top-10" />
        </div>
      ) : (
        <div className="w-full sm:w-[476px] sm:h-[200px] flex flex-col sm:flex-row gap-8 sm:items-center shrink-0 rounded bg-cod-gray-cg-50 sm:p-[30px] relative">
          <img
            src={imageUrl}
            alt={product_name}
            className="h-[150px] w-full sm:w-[150px] object-cover"
          />

          <div className="inline-flex flex-col sm:h-[122.5px] items-start shrink-0 px-2 pb-2 sm:px-0 sm:pb-0">
            <h4 className="text-H4-03 text-cod-gray-cg-600 font-normal">
              {weight}kg {product_name && product_name.split(" ").pop()}
            </h4>
            <h5 className="text-H5-03 font-semibold text-cod-gray-cg-600">
              {quantity} {Number(quantity) > 1 ? "crates" : "crate"}
            </h5>

            <h4>₦ {Number(price).toLocaleString()}</h4>
          </div>
          <Trash
            size={32}
            className="text-[#292D32] hover:scale-105 cursor-pointer hover:text-red-r-600 absolute right-4 top-[60%] sm:top-10"
            onClick={handleDelete}
          />
        </div>
      )}
    </>
  );
};

export default CartItemPopUp;
