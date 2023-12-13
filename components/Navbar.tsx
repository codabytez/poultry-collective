import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo_green.svg";
import location from "@/public/assets/location.svg";
import shop from "@/public/assets/shop.svg";
import Button from "./UI/Button";

export const Navbar: NextPage = () => {
  return (
    <nav className="select-none sticky top-0 z-50 bg-white m-auto">
      <div className="bg-light-green-shade w-full">
        <div className="h-[80px] max-w-[1440px] m-auto flex justify-end items-end gap-36 px-8 pb-3.5">
          <Link
            className="inline-flex py-3 p-6 justify-center items-center gap-2 rounded-lg"
            href="/"
          >
            <Image src={shop} alt="shop" />
            <h5 className="text-H6-03 text-base text-main-green-mg">
              Start Shopping
            </h5>
          </Link>
          <div className="inline-flex py-2 px-4 justify-center items-center gap-3 border-main-green-mg">
            <Image src={location} alt="location" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.9181 8.9502L13.3981 15.4702C12.6281 16.2402 11.3681 16.2402 10.5981 15.4702L4.07812 8.9502"
                stroke="#0D5C3D"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </nav>
  );
};

export const BottomNavbar: NextPage = () => {
  return (
    <div className="flex items-center justify-between gap-10 px-16 py-4 m-auto max-w-[1436px] bg-white">
      <Image src={logo} alt="logo" />
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

      <Button color="white" size="small">
        Login
      </Button>
    </div>
  );
};
