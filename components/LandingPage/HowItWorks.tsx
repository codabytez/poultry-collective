import { NextPage } from "next";
import Button from "@/components/UI/Button";
import Link from "next/link";
import { Moneys, ShoppingCart, UserEdit } from "iconsax-react";

const HowItWorks: NextPage = () => {
  return (
    <section
      id="howItWorks"
      className="px-6 lg:px-16 w-full max-w-[1312px] m-auto"
    >
      <div className=" m-auto bg-light-green-shade p-5 sm:p-16 flex flex-col items-center justify-center gap-8">
        <h2 className="text-H3-03 md:text-H2-03 text-center">How it works</h2>
        <div className="flex flex-col lg:flex-row flex-1 gap-6 m-auto justify-center">
          <div className="flex-1 max-w-[700px] lg:max-w-[378px] flex flex-col gap-4 items-center rounded bg-offwhite p-6 pb-11">
            <UserEdit size="32" color="#1A1A1A" />
            <p className="text-center text-cod-gray-cg-500 text-LP-03">
              Register
            </p>
            <p className="text-cod-gray-cg-500 text-MP-03 text-center">
              Sign up with your email and create your personalized account.
            </p>
          </div>

          <div className="flex-1 max-w-[700px] lg:max-w-[378px] flex flex-col gap-4 items-center rounded bg-offwhite p-6 pb-11">
            <ShoppingCart size="32" color="#1A1A1A" />
            <p className="text-center text-cod-gray-cg-500 text-LP-03">Shop</p>
            <p className="text-cod-gray-cg-500 text-MP-03 text-center">
              Engage with our broadly curated list of storefronts in our
              marketplace and start shopping.
            </p>
          </div>

          <div className="flex-1 max-w-[700px] lg:max-w-[378px] flex flex-col gap-4 items-center rounded bg-offwhite p-6 pb-11">
            <Moneys size="32" color="#1A1A1A" />
            <p className="text-center text-cod-gray-cg-500 text-LP-03">
              Payment
            </p>
            <p className="text-cod-gray-cg-500 text-MP-03 text-center">
              Place your orders with your preferred farms and make payment with
              our many options.
            </p>
          </div>
        </div>
        <Button href="/signup" size="lg">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
