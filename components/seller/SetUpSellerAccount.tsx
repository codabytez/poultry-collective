/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Button from "@/components/UI/Button";
import Step3 from "@/components/seller/Step3";
import Step1 from "@/components/seller/Step1";
import Step2 from "@/components/seller/Step2";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import withRoleCheck from "@/helpers/withRoleCheck";
import nProgress from "nprogress";
import useCreateSellerProfile from "@/hooks/useCreateSellerProfile";
import useUpdateSellerProfile from "@/hooks/useUpdateSellerProfile";
import { useFormContext } from "@/context/seller";
import { useUser } from "@/context/user";
import useChangeSellerBanner from "@/hooks/useChangeSellerBanner";
import useUpdateSellerBanner from "@/hooks/useUpdateSellerBanner";
import useUpdateSellerBio from "@/hooks/useUpdateSellerBio";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import useUpdateSellerBankDetails from "@/hooks/useUpdateSellerBankDetails";
import { useSellerProfileStore } from "@/stores/sellerProfile";

const SetupAccPage: NextPage = () => {
  const { bioAndBanner, setBioAndBanner } = useFormContext();
  const { businessInfo, setBusinessInfo } = useFormContext();
  const { bankDetails, setBankDetails } = useFormContext();
  const contextUser = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const { currentSellerProfile, setCurrentSellerProfile } =
    useSellerProfileStore();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (step === 1) {
      setLoading(true);
      nProgress.start();
      console.log("step 1");
      try {
        if (!contextUser?.user?.id) throw new Error("User not found");
        const res = await useCreateSellerProfile(
          contextUser?.user?.id,
          businessInfo.name,
          businessInfo.address,
          businessInfo.city,
          businessInfo.phoneNumber,
          String(process.env.NEXT_PUBLIC_DEFAULT_SELLER_AVATAR)
        );
        console.log(res);
        setStep((prev) => prev + 1);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
          nProgress.done();
        }, 2000);
      }
      return;
    }

    if (step === 2) {
      setLoading(true);
      nProgress.start();
      console.log("step 2");
      try {
        if (!contextUser?.user?.id) throw new Error("User not found");
        const sellerProfile = await useGetSellerProfileByUserId(
          contextUser?.user?.id
        );

        if (sellerProfile) {
          await useUpdateSellerBio(sellerProfile?.id, bioAndBanner?.bio);

          if (bioAndBanner.bannerImage.raw) {
            const res = await useChangeSellerBanner(
              bioAndBanner.bannerImage.raw,
              String(process.env.NEXT_PUBLIC_DEFAULT_SELLER_AVATAR)
            );
            await useUpdateSellerBanner(sellerProfile?.id, res);
          }

          await setCurrentSellerProfile(contextUser?.user?.id);

          console.log(currentSellerProfile);
        }

        setStep((prev) => prev + 1);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
          nProgress.done();
        }, 2000);
      }
      return;
    }

    if (step === 3) {
      setLoading(true);
      nProgress.start();
      console.log("step 3");
      try {
        if (!contextUser?.user?.id) throw new Error("User not found");
        if (!bankDetails.accountNumber)
          throw new Error("Account number not found");
        if (!bankDetails.bankName) throw new Error("Bank name not found");

        const sellerProfile = await useGetSellerProfileByUserId(
          contextUser?.user?.id
        );

        if (!sellerProfile) throw new Error("Seller profile not found");

        await useUpdateSellerBankDetails(
          sellerProfile?.id,
          bankDetails.bankName,
          bankDetails.accountNumber
        );

        await setCurrentSellerProfile(contextUser?.user?.id);

        console.log(currentSellerProfile);

        router.push("/seller");
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
          nProgress.done();
        }, 2000);
      }
      return;
    }
  };

  const handleBack = () => {
    setLoading(true);
    nProgress.start();
    setTimeout(() => {
      setStep((prev) => prev - 1);
      setLoading(false);
      nProgress.done();
    }, 2000);
  };

  const handleSkip = () => {
    setLoading(true);
    nProgress.start();
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setLoading(false);
      nProgress.done();
    }, 2000);
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-[819px] min-h-[740px] bg-white shadow-xl shadow-cod-gray-cg/5 text-center py-12">
        <h5 className="text-H5-03 text-cod-gray-cg-600 mb-11">
          STEP {step} OF 3
        </h5>
        <div className="flex flex-col gap-2 items-center w-[437px] mx-auto mb-6">
          <h3 className="text-center text-H3-03 font-normal text-cod-gray-cg-600">
            Set up your seller profile...
          </h3>
          <p className="text-H5-03 font-normal text-cod-gray-cg-400">
            Before you start selling, you need to set up your profile.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </div>

        <div className="w-[400px] mx-auto flex flex-col gap-6">
          <Button
            size="lg"
            fullWidth
            onClick={handleNext}
            isLoading={loading}
            disabled={loading}
          >
            {step === 3
              ? "Finish Setup"
              : step === 2
              ? "Continue"
              : "Save & Continue"}
          </Button>
          {step !== 1 && (
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleBack}
              isLoading={loading}
              disabled={loading}
            >
              Back
            </Button>
          )}
          {step !== 1 && (
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleSkip}
              isLoading={loading}
              disabled={loading}
            >
              Skip
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default withRoleCheck(SetupAccPage, ["seller"]);
