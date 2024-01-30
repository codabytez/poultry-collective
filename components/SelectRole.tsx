/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { NextPage } from "next";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";
import { notify } from "@/components/UI/Toast";
import nProgress from "nprogress";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import useDeleteAllCartByUserId from "@/hooks/useDeleteAllCartByUserId";

const SelectRole: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  useEffect(() => {
    nProgress.start();
    if (contextUser?.user) {
      (async () => {
        try {
          if (contextUser?.user?.id) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const userProfile = await useGetProfileByUserId(
              contextUser?.user?.id
            );
            if (userProfile?.role === "buyer") router.replace("/buyer");
            if (userProfile?.role === "seller") {
              const sellerProfile = await useGetSellerProfileByUserId(
                contextUser?.user?.id
              );
              if (sellerProfile?.id)
                router.replace(`/seller/${sellerProfile?.id}`);
              if (!sellerProfile?.id) router.replace("/seller/setup-acc");
            }
          }
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
          nProgress.done();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextUser?.user]);

  const handleRoleSelect = async (role: string) => {
    nProgress.start();
    setBtnDisabled(true);
    if (!contextUser?.user) router.push("/signup");
    if (contextUser?.user) {
      try {
        const documentId = await useGetProfileByUserId(contextUser.user.id);
        if (documentId?.id) await useUpdateProfile(documentId?.id, { role });
      } catch (error) {
        console.log("error", error);
      } finally {
        role === "buyer"
          ? router.replace("/buyer")
          : role === "seller"
          ? (await useDeleteAllCartByUserId(contextUser?.user?.id),
            router.replace("/seller/setup-acc"))
          : notify({
              message: "Something went wrong",
              type: "error",
            });
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F6F6F6] flex justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full md:w-[683px] h-[592px] shrink-0 bg-white shadow-xl m-auto flex flex-col justify-center items-center gap-8 px-4">
          <h3 className="text-center text-cod-gray-cg text-H5-03 sm:text-H3-03 font-normal sm:w-[511px]">
            Now that you’re here, do you want to buy or sell?
          </h3>

          <div className="flex flex-col w-[304px] items-center gap-6 sm:gap-16 justify-center">
            <Button
              size="lg"
              onClick={() => handleRoleSelect("buyer")}
              fullWidth
              disabled={btnDisabled}
            >
              Buy
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleRoleSelect("seller")}
              fullWidth
              disabled={btnDisabled}
            >
              Sell
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRole;
