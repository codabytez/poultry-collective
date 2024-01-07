import React from "react";
import { NextPage } from "next";
import Button from "@/components/UI/Button";
import Image from "next/image";
import brandPattern from "@/public/assets/BrandPattern-Green.svg";
import dashboardMac from "@/public/assets/dashboard_iMac.svg";
import cartMac from "@/public/assets/cart_iMac.svg";

const Hero: NextPage = () => {
  return (
    <section>
      <div className="flex h-[calc(100vh-200px)] justify-center items-center gap-[75px] overflow-hidden px-5">
        <div className="w-[565px]">
          <h1 className="text-H2-03 text-cod-gray-cg-600 pb-4">
            Buy and Sell Poultry Eggs with Ease, Anywhere, Anytime.
          </h1>
          <p className="w-[480px] pb-[60px] text-2xl leading-[36px] text-cod-gray-cg-500">
            Our platform caters to all businesses and individuals interested in
            large-scale buying and selling of poultry eggs
          </p>
          <Button href="/signup" size="lg">
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-[73px] w-[672px] h-[515px] relative">
          <Image
            src={brandPattern}
            alt="brand-pattern"
            className="absolute top-0 left-0 flex pt-0.5 justify-center items-center"
          />

          <Image
            src={dashboardMac}
            alt="dashboard-mac"
            className="absolute -top-[21.5px] -left-[94px] z-10"
          />

          <Image
            src={cartMac}
            alt="cart-mac"
            className="absolute bottom-[17.47px] -right-[33.5px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
