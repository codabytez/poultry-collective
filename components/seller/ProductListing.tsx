/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Add, Camera, Trash } from "iconsax-react";
import { NextPage } from "next";
import StarRating from "../UI/StarRating";
import { useFormContext } from "@/context/seller";
import Modal from "../UI/Modal";
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import AddProduct from "./AddProduct";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/stores/product";
import { useGeneralStore } from "@/stores/general";
import Loader from "../UI/Loader";
import { productDetailTypes } from "@/@types";

const ProductListing: NextPage<productDetailTypes> = ({ params }) => {
  const contextUser = useUser();
  const { productsBySeller, setProductsBySeller, deleteProduct } =
    useProductStore();
  const { bioAndBanner, setBioAndBanner } = useFormContext();
  const { businessInfo } = useFormContext();
  const { setIsModalOpen } = useGeneralStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, imageIds: string[]) => {
    if (contextUser?.user) {
      try {
        setIsLoading(true);
        await deleteProduct(id, imageIds);
        setProductsBySeller(contextUser.user?.id);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (contextUser?.user) {
      setIsLoading(true);
      try {
        setProductsBySeller(contextUser.user.id);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <div className=" w-11/12 mx-auto mt-10 relative">
              <div
                className="w-full h-[300px]"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${
                    bioAndBanner.bannerImage.preview ||
                    "https://picsum.photos/id/28/1300/300.jpg"
                  }'), lightgray 50% / cover no-repeat`,
                }}
              />

              <div className="inline-flex flex-col justify-center items-start gap-8 absolute top-20 left-6">
                <h2 className="text-H2-03 font-medium text-cod-gray-cg-100">
                  {businessInfo.name || "Business Name"}
                </h2>

                <StarRating />
              </div>

              <div className="inline-flex p-4 items-start gap-2 bg-offwhite absolute right-6 top-6">
                <Camera size={24} color="#292D32" />
                <p className="text-SP-03 font-normal text-cod-gray-cg-600">
                  Change Banner
                </p>
              </div>
            </div>
            {productsBySeller.length > 0 && (
              <div className="my-20 w-11/12 m-auto">
                <h2 className="text-start text-cod-gray-cg text-H2-03 pb-8">
                  Listed Products
                </h2>
                <div className="flex justify-start items-start gap-4 gap-y-10 flex-wrap">
                  {productsBySeller.map((product) => (
                    <div
                      key={product.$id}
                      className="flex flex-col justify-center items-start gap-4 w-[427px]  relative"
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

                      <div className="flex  justify-between items-center w-[427px]">
                        <p className="text-H5-03 text-cod-gray-cg font-normal">
                          {product.product_name}
                        </p>

                        <div className="flex items-center gap-2">
                          <p className="text-H5-03 text-cod-gray-cg font-normal">
                            N {Number(product.product_price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Trash
                        onClick={() =>
                          handleDelete(product.$id, product.product_image)
                        }
                        className="absolute top-4 right-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex w-10/12 h-[400px] items-center justify-center border-4 border-dashed border-main-green-mg mx-auto">
              <button
                onClick={handleOpenModal}
                className="flex justify-center items-center gap-2"
              >
                <p className="text-H4-03 text-main-green-mg font-normal">
                  Add a product
                </p>
                <Add size={24} color="#0D5C3D" />
              </button>
            </div>
          </div>
          <Modal>
            <AddProduct
              farmName={businessInfo.name || "Green Farm"}
              onCloseModal={handleCloseModal}
            />
          </Modal>
        </>
      )}
    </MainLayout>
  );
};

export default ProductListing;
