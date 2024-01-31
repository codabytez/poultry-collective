"use client";
import { SellerProductProps } from "@/@types";
import { Trash } from "iconsax-react";
import { NextPage } from "next";
import { useRouter } from "nextjs13-progress";

const SellerProduct: NextPage<SellerProductProps> = ({
  product,
  handleDelete,
  isCurrentUser,
}) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col justify-center items-start gap-4 relative max-w-[427px] transition-all flex-1 ${
        isCurrentUser && "cursor-pointer"
      }`}
      onClick={() => {
        if (isCurrentUser) {
          router.push(
            `/seller/profile/${product.user_id}/productpreview/${product.$id}`
          );
        }
      }}
    >
      <div className="flex h-[300px] w-full justify-center items-start bg-no-repeat object-cover relative">
        <img
          src={product.imageUrl}
          alt={product.product_name}
          className="w-full h-full object-cover object-center"
        />

        <p className="inline-flex py-1 px-2 items-start gap-2 bg-[#CAF0C2] text-black text-SC-03 font-normal absolute right-0 bottom-0">
          In stock: {product.quantity_available}
        </p>

        <p className="inline-flex py-1 px-2 items-start gap-2 bg-[#CAF0C2] text-black text-SC-03 font-normal absolute left-0 bottom-0">
          Weight: {product.product_weight}kg
        </p>
      </div>

      <div className="flex justify-between items-center w-full max-w-[427px]">
        <p className="text-H5-03 text-cod-gray-cg font-normal">
          {product.product_name}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-H5-03 text-cod-gray-cg font-normal">
            ₦ {Number(product.product_price).toLocaleString()}
          </p>
        </div>
      </div>
      {isCurrentUser && (
        <Trash
          size={40}
          className="absolute top-4 right-4 p-2 rounded-full bg-white hover:text-red-700 transition-all cursor-pointer hover:scale-105 z-10"
          onClick={() => {
            if (handleDelete) {
              handleDelete(product.$id, product.product_image);
            }
          }}
        />
      )}
    </div>
  );
};

export default SellerProduct;
