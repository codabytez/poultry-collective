"use client";
import { NextPage } from "next";
import { Link } from "nextjs13-progress";
import Logo from "./Logo";
import Button from "./UI/Button";
import CountryDropdown from "./CountryDropdown";
import { countries } from "./countries";
import { ArrowDown2, Location, Shop } from "iconsax-react";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import nProgress from "nprogress";

export const Navbar: NextPage = () => {
  return (
    <nav className="select-none sticky top-0 z-50 bg-white m-auto">
      <div className="bg-light-green-shade w-full">
        <div className="h-[80px] max-w-[1440px] m-auto flex justify-end items-end gap-36 px-8 pb-3.5">
          <Button variant="link-primary" href="/buyer">
            <Shop color="#0d5c3d" />
            <h5 className="text-H6-03 text-base text-main-green-mg">
              Start Shopping
            </h5>
          </Button>
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
    nProgress.start();
    if (contextUser?.user) {
      await contextUser.logout();
    } else {
      router.push("/login");
      setIsLoading(false);
      nProgress.done();
    }
  };

  return (
    <div className="flex items-center justify-between gap-10 px-16 py-4 m-auto max-w-[1436px] bg-white">
      <Logo />
      <div className="flex gap-16 text-H6-01 text-base text-cod-gray-cg-500">
        <Button variant="link-primary" href="/">
          Product
        </Button>

        <Button variant="link-primary" href="/">
          How It Works
        </Button>
        <div className="flex justify-center items-center gap-1 hover:text-main-green-mg transition-all cursor-pointer">
          <Button variant="link-primary" href="/">
            Help
            <ArrowDown2 color="#292D32" />
          </Button>
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        isLoading={isLoading}
        onClick={handleButtonClick}
        spinnerColor="#009E60"
      >
        {contextUser?.user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};
