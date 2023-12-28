"use client";
import { NextPage } from "next";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./UI/Button";
import CountryDropdown from "./CountryDropdown";
import { countries } from "./countries";
import { Location, Shop } from "iconsax-react";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";

export const Navbar: NextPage = () => {
  return (
    <nav className="select-none sticky top-0 z-50 bg-white m-auto">
      <div className="bg-light-green-shade w-full">
        <div className="h-[80px] max-w-[1440px] m-auto flex justify-end items-end gap-36 px-8 pb-3.5">
          <Link
            className="inline-flex py-3 p-6 justify-center items-center gap-2 rounded-lg"
            href="/"
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

  return (
    <div className="flex items-center justify-between gap-10 px-16 py-4 m-auto max-w-[1436px] bg-white">
      <Logo />
      <div className="flex items-center justify-between gap-10 px-16 py-4 m-auto h-10 border border-red-900 max-w-[1436px] bg-white">
        {contextUser?.user?.name}
      </div>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M4.08187 9.84488L10.6019 16.3649C11.3719 17.1349 12.6319 17.1349 13.4019 16.3649L19.9219 9.84488"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <Button
        color="white"
        size="small"
        onClick={
          contextUser?.user
            ? () => contextUser.logout()
            : () => router.push("/login")
        }
      >
        {contextUser?.user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};
