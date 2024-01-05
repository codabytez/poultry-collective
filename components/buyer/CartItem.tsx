/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { cartItemProps } from "@/@types";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { Trash } from "iconsax-react";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItem: NextPage<cartItemProps> = (props) => {
  const { $id, quantity, weight, price, product_name, image, onDelete } = props;
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

      <Trash color="#292D32" onClick={() => onDelete($id)} />
    </div>
  );
};

export default CartItem;
