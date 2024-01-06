"use client";
import Button from "@/components/UI/Button";
import Step3 from "@/components/seller/Step3";
import Step1 from "@/components/seller/Step1";
import Step2 from "@/components/seller/Step2";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SetupAccPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (step === 3) {
      router.push("/seller/");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    setStep((prev) => prev + 1);
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
          <Button size="lg" fullWidth onClick={handleNext}>
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
              onClick={handleSkip}
            >
              Skip
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SetupAccPage;
