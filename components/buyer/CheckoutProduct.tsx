/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import { cartItemProps } from "@/@types";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { useEffect, useState } from "react";

const CheckoutProduct: NextPage<cartItemProps> = (props) => {
  const { image, product_name, weight, quantity, price } = props;
  const [imageUrl, setImageUrl] = useState<string>("");

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
    <div className="flex py-14 pr-28 pl-8 items-center gap-10 rounded bg-light-green-shade">
      <img src={imageUrl} alt={product_name} className="w-[261px] h-[210px]" />

      <div className="flex flex-col items-start gap-4">
        <h3 className=" text-cod-gray-cg-600 text-H4-03 font-normal">
          {`${weight} ${product_name.split(" ").pop()}`}

          <span className="text-cod-gray-cg-600 text-SP-03 font-normal inline-block pl-2">
            {quantity} creates
          </span>
        </h3>

        <p className="text-cod-gray-cg-600 text-SP-03 leading-9">
          {(Number(price) * Number(quantity)).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CheckoutProduct;
