/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import { cartItemProps } from "@/@types";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { useEffect, useState } from "react";
import withRoleCheck from "@/helpers/withRoleCheck";

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
    <div className="flex flex-col sm:flex-row sm:py-14 sm:pr-28 sm:pl-8 lg:p-6 sm:items-center gap-10 rounded bg-light-green-shade">
      <img
        src={imageUrl}
        alt={product_name}
        className="w-full sm:w-[261px] h-[300px] sm:h-[210px] object-cover"
      />

      <div className="flex flex-col items-start gap-4 px-6 sm:px-0">
        <h3 className=" text-cod-gray-cg-600 text-H4-03 font-normal">
          {`${weight}kg ${product_name && product_name.slice(-1)[0]}`}

          <span className="text-cod-gray-cg-600 text-SP-03 font-normal inline-block pl-2">
            ({quantity} {Number(quantity) > 1 ? "crates" : "crate"})
          </span>
        </h3>

        <p className="text-cod-gray-cg-600 text-SP-03 leading-9">
          ₦ {(Number(price) * Number(quantity)).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CheckoutProduct;
