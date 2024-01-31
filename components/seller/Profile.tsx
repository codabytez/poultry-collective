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
import Loader from "../UI/Loader";
import { productDetailTypes } from "@/@types";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { useSellerProfileStore } from "@/stores/sellerProfile";
import SellerBanner from "./SellerBanner";
import { notify } from "../UI/Toast";
import useGetProductBySeller from "@/hooks/useGetProductBySeller";
import useUpdateTotalProducts from "@/hooks/useUpdateTotalProducts";
import useGetTotalProducts from "@/hooks/useGetTotalProducts";
import SellerProduct from "./SellerProduct";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isCurrentUser =
    params.id === currentSellerProfile?.$id &&
    contextUser?.user?.id === currentSellerProfile?.user_id;

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
      if (!contextUser.user) {
        router.push("/login");
        return;
      }
      try {
        setIsLoading(true);
        await setProductsBySeller(params?.id);
        await setSellerIdBySellerId(params?.id);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
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
        const totalProducts = await useGetTotalProducts(
          currentSellerProfile?.$id
        );
        await useUpdateTotalProducts(
          currentSellerProfile?.$id,
          Number(totalProducts.total) - 1
        );
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
            {!isCurrentUser && productsBySeller.length === 0 && (
              <div className="flex justify-center items-center h-[200px] md:h-[400px]">
                <p className="text-H4-03 text-cod-gray-cg font-normal">
                  No products listed yet
                </p>
              </div>
            )}
            {productsBySeller && productsBySeller.length > 0 && (
              <div className="my-20 w-11/12 m-auto">
                <h2 className="text-start text-cod-gray-cg text-H4-03 sm:text-H2-03 pb-8">
                  Listed Products
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px]">
                  {productsBySeller.map((product) => (
                    <SellerProduct
                      key={product.$id}
                      product={product}
                      isCurrentUser={isCurrentUser}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {isCurrentUser && (
              <div className="flex w-10/12 h-[200px] md:h-[400px] mt-20 items-center justify-center border-4 border-dashed border-main-green-mg mx-auto">
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
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
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
