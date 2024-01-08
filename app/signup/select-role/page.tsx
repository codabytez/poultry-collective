/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { NextPage } from "next";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import React, { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";
import { notify } from "@/components/UI/Toast";
import nProgress from "nprogress";

const SelectRolePage: React.FC = () => {
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
            if (userProfile?.role) {
              router.push(`/${userProfile.role}`);
            }
          }
        } catch (error) {
          console.log("error", error);
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
          ? router.replace("/seller/setup-acc")
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
        <div className="w-[683px] h-[592px] shrink-0 bg-white shadow-xl m-auto flex flex-col justify-center items-center gap-8">
          <h3 className="text-center text-cod-gray-cg text-H3-03 font-normal w-[511px]">
            Now that you’re here, do you want to buy or sell?
          </h3>

          <div className="flex flex-col w-[304px] items-center gap-16 justify-center">
            <Button
              size="lg"
              onClick={() => handleRoleSelect("buyer")}
              fullWidth
              disabled={btnDisabled}
              isLoading={btnDisabled}
            >
              Buy
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleRoleSelect("seller")}
              fullWidth
              disabled={btnDisabled}
              isLoading={btnDisabled}
            >
              Sell
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRolePage;
