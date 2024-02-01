"use client";
import { useEffect, useState } from "react";
import { productDetailTypes } from "@/@types";
import { useUser } from "@/context/user";
import { useProductStore } from "@/stores/product";
import { NextPage } from "next";
import { useRouter } from "nextjs13-progress";
import SellerBanner from "./SellerBanner";
import { Export } from "iconsax-react";
import { notify } from "../UI/Toast";
import { useSellerProfileStore } from "@/stores/sellerProfile";
import MainLayout from "@/layouts/MainLayout";
import Loader from "../UI/Loader";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import Image from "next/image";
import Button from "../UI/Button";

const ProductOverview: NextPage<productDetailTypes> = ({ params }) => {
  const contextUser = useUser();
  const Router = useRouter();
  const { productsById, setProductsById } = useProductStore();
  const { currentSellerProfile, setSellerIdBySellerId } =
    useSellerProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (contextUser.user) {
        setIsLoading(true);
        try {
          await setProductsById(params.productid);
          await setSellerIdBySellerId(productsById?.seller_id);
        } catch (error) {
          throw new Error("Failed to load product.");
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShareProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/seller/profile/${productsById?.seller_id}`
    );
    notify({
      message: "Link copied to clipboard",
      type: "success",
      pauseOnHover: false,
      autoClose: 2000,
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-end w-11/12 mx-auto mt-10 relative">
        <button
          onClick={handleShareProfile}
          className="flex justify-center items-center gap-2"
        >
          <span className="text-H6-03 text-main-green-mg font-normal">
            Share Store Link
          </span>
          <Export color="#0D5C3D" />
        </button>
      </div>

      <div>
        <SellerBanner isCurrentUser seller={currentSellerProfile} />
        <div className="my-20 w-11/12 m-auto flex-col gap-10">
          <div className="inline-flex gap-9 overflow-x-scroll hide-scrollbar">
            {productsById.imageUrls.map((url: string, index: number) => (
              <Image
                key={index}
                src={url}
                alt={productsById.product_name + index + 1}
                width={500}
                height={500}
                className="object-cover"
              />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-cod-gray-cg-500 text-H4-03 sm:text-H3-03">
              {productsById?.product_weight}kg{" "}
              {productsById?.product_name.split(" ").slice(-1)[0]}s: ₦
              {Number(productsById?.product_price).toLocaleString()}
            </h3>
            <p className="w-[80%] pb-10 sm:w-[640px] text-H5-03 sm:text-H4-03 font-normal text-cod-gray-cg-500">
              {productsById?.product_details}
            </p>
            <div className="w-[250px] sm:w-[400px]">
              <Button size="lg" fullWidth onClick={() => Router.back()}>
                Return to listed products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductOverview;
