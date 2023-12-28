"use client";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "@/context/seller";
import { Camera, Image as Icon } from "iconsax-react";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import StarRating from "../UI/StarRating";
import Input from "../UI/Input";
import Button from "../UI/Button";

const Profile: NextPage = () => {
  const { businessInfo, setBusinessInfo } = useFormContext();
  const { bioAndBanner, setBioAndBanner } = useFormContext();
  const { bankDetails, setBankDetails } = useFormContext();

  const handleChangeBanner = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
  };

  return (
    <MainLayout>
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

        <div className="rounded bg-white shadow-xl shadow-cod-gray-cg/5 w-11/12 mt-[60px] mx-auto flex justify-between gap-10 p-16 pb-24">
          <div className="flex flex-col gap-10 items-start justify-start">
            <Input
              label="Business Name"
              type="text"
              placeholder="Business Name"
              value={businessInfo.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBusinessInfo({ ...businessInfo, name: e.target.value })
              }
            />

            <Input
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
                className="flex items-start gap-9 p-3 w-[400px] h-[97px] bg-light-green-shade"
              >
                <>
                  <Icon size="32" color="#CED4DA" />

                  <p className="text-SP-03 text-cod-gray-cg-600 font-normal">
                    {bankDetails.validIdImage.raw ? (
                      bankDetails.validIdImage.raw?.name
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

            <div className="w-[400px]">
              <Button color="green" size="large" fullWidth>
                Proceed to Product Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
