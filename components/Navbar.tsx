"use client";
import { NextPage } from "next";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./UI/Button";
import CountryDropdown from "./CountryDropdown";
import { countries } from "./countries";
import { ArrowDown2, Location, Shop } from "iconsax-react";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar: NextPage = () => {
  return (
    <nav className="select-none sticky top-0 z-50 bg-white m-auto">
      <div className="bg-light-green-shade w-full">
        <div className="h-[80px] max-w-[1440px] m-auto flex justify-end items-end gap-36 px-8 pb-3.5">
          <Link
            className="inline-flex py-3 p-6 justify-center items-center gap-2 rounded-lg"
            href="/buyer"
            passHref
          >
            <Shop color="#0d5c3d" />
            <h5 className="text-H6-03 text-base text-main-green-mg">
              Start Shopping
            </h5>
          </Link>
          <div className="flex py-2 px-4 justify-center items-center gap-3 border-main-green-mg">
            <Location color="#0D5C3D" />
            <CountryDropdown countries={countries} fullWidth={false} />
          </div>
        </div>
      </div>

      <BottomNavbar />
    </nav>
  );
};

export const BottomNavbar: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    if (contextUser?.user) {
      await contextUser.logout();
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-between gap-10 px-16 py-4 m-auto max-w-[1436px] bg-white">
      <Logo />
      <div className="flex gap-16 text-H6-01 text-base text-cod-gray-cg-500">
        <Link
          className="text-cod-gray text-base leading-5 font-normal hover:text-main-green-mg transition-all"
          href="/"
        >
          Product
        </Link>

        <Link
          className="text-cod-gray text-base leading-5 font-normal hover:text-main-green-mg transition-all"
          href="/"
        >
          How It Works
        </Link>
        <div className="flex justify-center items-center gap-1 hover:text-main-green-mg transition-all cursor-pointer">
          <Link
            className="text-cod-gray text-base leading-5 font-normal hover:text-main-green-mg transition-all"
            href="/"
          >
            Help
          </Link>
          <ArrowDown2 color="#292D32" />
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        isLoading={isLoading}
        onClick={handleButtonClick}
      >
        {contextUser?.user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};
