/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { cartItemProps } from "@/@types";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItem: NextPage<cartItemProps> = (props) => {
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
    <div className="w-[648px] h-[326px] rounded bg-light-green-shade py-14 px-8 flex gap-[74px] items-center relative">
      <img
        src={imageUrl}
        alt={product_name}
        width={261}
        height={210}
        className="h-[210px] w-[261px] object-cover shrink-0"
      />
      <div className="inline-flex flex-col h-[122.5px] items-start justify-end shrink-0 text-H4-03 text-cod-gray-cg-600">
        <h4>
          {weight} {product_name.split(" ").pop()}
        </h4>
        <h5 className=" text-H5-03 font-semibold">{quantity} Crate(s)</h5>
        <h4>#{price}</h4>
      </div>

      <svg
        className="absolute top-8 right-8"
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        onClick={() => onDelete($id)}
      >
        <path
          d="M28.5 8.47331C24.06 8.03331 19.5933 7.80664 15.14 7.80664C12.5 7.80664 9.86 7.93997 7.22 8.20664L4.5 8.47331"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.832 7.12602L12.1254 5.37935C12.3387 4.11268 12.4987 3.16602 14.752 3.16602H18.2454C20.4987 3.16602 20.672 4.16602 20.872 5.39268L21.1654 7.12602"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25.6339 12.6875L24.7672 26.1142C24.6205 28.2075 24.5005 29.8342 20.7805 29.8342H12.2205C8.50052 29.8342 8.38052 28.2075 8.23385 26.1142L7.36719 12.6875"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.2734 22.5H18.7134"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.168 17.166H19.8346"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default CartItem;
