/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { cartItemProps } from "@/@types";
import { NextPage } from "next";
import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { useUser } from "@/context/user";
import { useEffect, useState } from "react";
import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { Trash } from "iconsax-react";

const CartItemPopUp: NextPage<cartItemProps> = (props) => {
  const {
    user_id,
    $id,
    quantity,
    weight,
    price,
    product_name,
    image,
    onDelete,
  } = props;

  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <div className="w-[476px] h-[200px] flex gap-8 items-center shrink-0 rounded bg-cod-gray-cg-50 p-[30px] relative">
      <img
        src={imageUrl}
        alt={product_name}
        // width={150}
        // height={150}
        className="h-[150px] w-[150px] object-cover"
      />

      <div className="inline-flex flex-col h-[122.5px] items-start shrink-0">
        <h4 className="text-H4-03 text-cod-gray-cg-600 font-normal">
          {weight}kg {product_name.split(" ").pop()}
        </h4>
        <h5 className="text-H5-03 font-semibold text-cod-gray-cg-600">
          {quantity} Crate(s)
        </h5>
        <h4>#{Number(price).toLocaleString()}</h4>
      </div>
      <Trash size={32} color="#292D32" onClick={() => onDelete($id)} />
    </div>
  );
};

export default CartItemPopUp;
