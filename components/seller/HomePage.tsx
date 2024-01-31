/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { NextPage } from "next";
import { ChangeEvent, useState, useEffect } from "react";
import { useFormContext } from "@/context/seller";
import { Camera, Image as Icon } from "iconsax-react";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import StarRating from "../UI/StarRating";
import { Input } from "../UI/Input";
import Button from "../UI/Button";
import withRoleCheck from "@/helpers/withRoleCheck";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import { useUser } from "@/context/user";
import useChangeSellerBanner from "@/hooks/useChangeSellerBanner";
import useUpdateSellerBanner from "@/hooks/useUpdateSellerBanner";
import useUpdateSellerBio from "@/hooks/useUpdateSellerBio";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import useUpdateSellerBankDetails from "@/hooks/useUpdateSellerBankDetails";
import { useSellerProfileStore } from "@/stores/sellerProfile";
import useUpdateSellerProfile from "@/hooks/useUpdateSellerProfile";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import SellerBanner from "./SellerBanner";

const SellerHomePage: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const { currentSellerProfile, setCurrentSellerProfile } =
    useSellerProfileStore();
  const { businessInfo, setBusinessInfo } = useFormContext();
  const { bioAndBanner, setBioAndBanner } = useFormContext();
  const { bankDetails, setBankDetails } = useFormContext();
  const [userBanner, setUserBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      if (!contextUser?.user?.id) throw new Error("User not found");
      await setCurrentSellerProfile(contextUser?.user?.id);
      const url = await useCreateBucketUrl(currentSellerProfile?.banner);
      setUserBanner(url);
      setBusinessInfo({
        name: currentSellerProfile?.business_name,
        address: currentSellerProfile?.address,
        phoneNumber: currentSellerProfile?.phone_number,
        city: currentSellerProfile?.city,
      });
      setBioAndBanner({
        bio: currentSellerProfile?.bio,
      });
      setBankDetails({
        bankName: currentSellerProfile?.bank_name,
        accountNumber: currentSellerProfile?.account_number,
      });
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProceedToProductListing = async () => {
    try {
      setIsLoading(true);
      nProgress.start();
      if (!contextUser?.user?.id) throw new Error("User not found");
      const sellerProfile = await useGetSellerProfileByUserId(
        contextUser?.user?.id
      );

      if (!sellerProfile) throw new Error("Seller profile not found");

      await setCurrentSellerProfile(contextUser?.user?.id);

      bioAndBanner.bio &&
        (await useUpdateSellerBio(sellerProfile?.id, bioAndBanner.bio));
      bankDetails.bankName &&
        (await useUpdateSellerBankDetails(
          sellerProfile?.id,
          bankDetails.bankName,
          bankDetails.accountNumber
        ));
      businessInfo &&
        (await useUpdateSellerProfile(
          sellerProfile?.id,
          businessInfo.name,
          businessInfo.address,
          businessInfo.phoneNumber,
          businessInfo.city
        ));
      router.push(`/seller/profile/${sellerProfile?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        nProgress.done();
      }, 2000);
    }
  };

  return (
    <MainLayout>
      <div>
        <SellerBanner seller={currentSellerProfile} isCurrentUser />

        <div className="rounded bg-white shadow-xl shadow-cod-gray-cg/5 w-full md:w-11/12 mt-[60px] mx-auto flex flex-col md:flex-row justify-between gap-10 p-6 md:p-16 pb-24">
          <div className="flex flex-col gap-10 items-start justify-start md:w-[400px]">
            <Input
              fullWidth
              disabled={isLoading}
              label="Business Name"
              type="text"
              placeholder="Business Name"
              value={businessInfo.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBusinessInfo({ ...businessInfo, name: e.target.value })
              }
            />

            <Input
              fullWidth
              disabled={isLoading}
              label="Address"
              type="text"
              inputType="textarea"
              placeholder="Address"
              value={businessInfo.address}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBusinessInfo({ ...businessInfo, address: e.target.value })
              }
            />

            <Input
              fullWidth
              disabled={isLoading}
              label="Phone Number"
              type="text"
              placeholder="Phone Number"
              value={businessInfo.phoneNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBusinessInfo({
                  ...businessInfo,
                  phoneNumber: e.target.value,
                })
              }
            />

            <Input
              fullWidth
              label="City/Town"
              type="text"
              placeholder="City/Town"
              value={businessInfo.city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBusinessInfo({
                  ...businessInfo,
                  city: e.target.value,
                })
              }
            />

            <Input
              fullWidth
              disabled={isLoading}
              label="Bio"
              type="text"
              inputType="textarea"
              placeholder="Bio"
              value={bioAndBanner.bio}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBioAndBanner({ ...bioAndBanner, bio: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-10 items-start justify-start">
            <div className="flex w-full flex-col gap-2">
              <p className="text-SC-03 text-cod-gray-cg-400 capitalize">
                ID Card
              </p>
              <label
                htmlFor="validIdImage"
                className="flex items-start gap-9 p-3 lg:w-[400px] h-[97px] bg-light-green-shade"
              >
                <>
                  <Icon size="32" color="#CED4DA" />

                  <p className="text-SP-03 md:text-SC-03 lg:text-SP-03 text-cod-gray-cg-600 font-normal">
                    {bankDetails?.validIdImage?.raw ? (
                      bankDetails?.validIdImage?.raw?.name
                    ) : (
                      <>
                        Upload a valid ID
                        <span className="text-cod-gray-cg-400 ">
                          {" "}
                          Max size 2MB
                        </span>
                      </>
                    )}
                  </p>
                </>
              </label>
              <input
                className="hidden"
                type="file"
                placeholder="Valid ID Image"
                name="validIdImage"
                id="validIdImage"
                accept="image/*"
                disabled
              />
            </div>

            <Input
              fullWidth
              disabled={isLoading}
              label="Bank Name"
              type="text"
              placeholder="Bank Name"
              value={bankDetails.bankName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBankDetails({
                  ...bankDetails,
                  bankName: e.target.value,
                })
              }
            />

            <Input
              fullWidth
              disabled={isLoading}
              label="Account Number"
              type="text"
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBankDetails({
                  ...bankDetails,
                  accountNumber: e.target.value,
                })
              }
            />

            <div className="w-[300px] lg:w-[400px]">
              <Button
                size="lg"
                fullWidth
                isLoading={isLoading}
                onClick={handleProceedToProductListing}
                disabled={isLoading}
              >
                Proceed to Product Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withRoleCheck(SellerHomePage, ["seller"]);
