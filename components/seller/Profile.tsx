/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Add, Camera, Export, Trash } from "iconsax-react";
import { NextPage } from "next";
import StarRating from "../UI/StarRating";
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
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { useSellerProfileStore } from "@/stores/sellerProfile";
import SellerBanner from "./SellerBanner";
import { notify } from "../UI/Toast";
import useGetProductBySeller from "@/hooks/useGetProductBySeller";

type Props = {
  params: { id: string };
};

const SellerProfile: NextPage<Props> = ({ params }) => {
  const contextUser = useUser();
  const router = useRouter();
  const { productsBySeller, setProductsBySeller, deleteProduct } =
    useProductStore();
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [userBanner, setUserBanner] = useState("");
  const {
    currentSellerProfile,
    setCurrentSellerProfile,
    setSellerIdBySellerId,
  } = useSellerProfileStore();
  const { setIsModalOpen } = useGeneralStore();
  const [isLoading, setIsLoading] = useState(true);

  const isCurrentUser = contextUser?.user?.id === currentSellerProfile?.user_id;

  const handleShareProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/seller/profile/${currentSellerProfile?.$id}`
    );
    notify({
      message: "Link copied to clipboard",
      type: "success",
      pauseOnHover: false,
      autoClose: 2000,
    });
  };

  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (contextUser.user) {
        try {
          setIsLoading(true);
          await setSellerIdBySellerId(params?.id);

          // Fetch the updated currentSellerProfile from your state
          const updatedSellerProfile = currentSellerProfile;

          if (updatedSellerProfile) {
            const products = await useGetProductBySeller(
              updatedSellerProfile.$id
            );
            const productsWithUrls = await Promise.all(
              products.map(async (product) => {
                const url = await useCreateBucketUrl(product.product_image[0]);
                return { ...product, imageUrl: url };
              })
            );
            setSellerProducts(productsWithUrls);
          }
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSellerProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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
        setProductsBySeller(currentSellerProfile?.$id);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {isCurrentUser && (
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
          )}
          <div>
            <SellerBanner
              isCurrentUser={isCurrentUser}
              seller={currentSellerProfile}
            />
            {!isCurrentUser && sellerProducts.length === 0 && (
              <div className="flex justify-center items-center h-[400px]">
                <p className="text-H4-03 text-cod-gray-cg font-normal">
                  No products listed yet
                </p>
              </div>
            )}
            {sellerProducts && sellerProducts.length > 0 && (
              <div className="my-20 w-11/12 m-auto">
                <h2 className="text-start text-cod-gray-cg text-H2-03 pb-8">
                  Listed Products
                </h2>
                <div className="flex justify-start items-start gap-4 gap-y-10 flex-wrap">
                  {sellerProducts.map((product) => (
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
                      {isCurrentUser && (
                        <Trash
                          onClick={() =>
                            handleDelete(product.$id, product.product_image)
                          }
                          className="absolute top-4 right-4"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isCurrentUser && (
              <div className="flex w-10/12 h-[400px] mt-20 items-center justify-center border-4 border-dashed border-main-green-mg mx-auto">
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
            )}
          </div>
          {isCurrentUser && (
            <Modal>
              <AddProduct
                farmName={currentSellerProfile.business_name}
                sellerId={currentSellerProfile.$id}
                onCloseModal={handleCloseModal}
              />
            </Modal>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default SellerProfile;
