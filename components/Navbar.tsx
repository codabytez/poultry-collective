/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { NextPage } from "next";
import Logo from "./Logo";
import Button from "./UI/Button";
import { ArrowDown2, Menu, Shop, ShoppingCart } from "iconsax-react";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import nProgress from "nprogress";
import { useCartStore } from "@/stores/cart";
import { Link } from "nextjs13-progress";

export const Navbar: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const { cart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartSelling = async () => {
    setIsLoading(true);
    nProgress.start();
    if (!contextUser?.user) return router.push("/signup");
    try {
      const profile = await useGetProfileByUserId(contextUser.user.id);
      if (profile?.role === "buyer") router.push("/signup/select-role");
      if (profile?.role === "seller") {
        const sellerProfile = await useGetSellerProfileByUserId(
          contextUser.user.id
        );
        if (sellerProfile?.id)
          router.push(`/seller/profile/${sellerProfile?.id}`);
        else router.push("/seller");
      } else {
        router.push("/signup/select-role");
      }
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        nProgress.done();
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <nav className="select-none sticky top-0 z-50 bg-white m-auto">
      <div className="bg-light-green-shade w-full">
        <div className="lg:h-[80px] max-w-[1440px] m-auto flex justify-between lg:justify-end items-center gap-4 lg:gap-36 px-4 lg:px-8 pb-3.5">
          <Button
            variant="link-primary"
            disabled={isLoading}
            isLoading={isLoading}
            onClick={handleStartSelling}
          >
            <Shop color="#0d5c3d" />
            <h5 className="text-H6-03 text-base text-main-green-mg">
              Start Selling
            </h5>
          </Button>
          {/* @ts-ignore */}
          <Link
            href="/buyer/viewcart"
            className="border-main-green-mg relative"
          >
            {contextUser?.user && contextUser?.user?.role !== "seller" && (
              <Button className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-main-green-mg text-white text-xs flex justify-center items-center">
                {cart?.length}
              </Button>
            )}
            <ShoppingCart color="#0D5C3D" />
          </Link>
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
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex items-center justify-between gap-10 lg:px-16 py-4 m-auto max-w-[1436px] bg-white relative px-4">
      {/* @ts-ignore */}
      <Link href="/">
        <Logo />
      </Link>
      <button
        className="lg:hidden absolute right-6 top-[30%] z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div
        className={`flex gap-4 bg-white h-[calc(100%-140px)] overflow-hidden w-full lg:w-[70%] justify-center lg:justify-between items-center fixed top-[140px] lg:relative lg:top-0 transition-all duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-[150%] lg:translate-x-0"
        } flex-col lg:flex-row`}
      >
        <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-4 lg:gap-16 text-H6-01 text-base text-cod-gray-cg-500">
          <Button
            variant="link-primary"
            href="/buyer"
            onClick={() => setIsOpen(false)}
          >
            Product
          </Button>

          <Button
            variant="link-primary"
            href="/#howItWorks"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Button>
          <div className="flex justify-center items-center gap-1 hover:text-main-green-mg transition-all cursor-pointer">
            <Button
              variant="link-primary"
              href="/#help"
              onClick={() => setIsOpen(false)}
            >
              Help
            </Button>
          </div>
        </div>

        <Button
          variant={contextUser?.user ? "destructiveSecondary" : "secondary"}
          size="sm"
          isLoading={isLoading}
          onClick={() => {
            handleButtonClick();
            setIsOpen(false);
          }}
          spinnerColor={contextUser?.user ? "DC2626" : "#009E60"}
        >
          {contextUser?.user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
