/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import GetStarted from "./GetStarted";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import ShopasGuest from "./ShopasGuest";
import Testimonial from "./Testimonial";
import Whyus from "./Whyus";
import MainLayout from "@/layouts/MainLayout";
import { NextPage } from "next";
import { useUser } from "@/context/user";
import { useEffect, useState } from "react";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import { useRouter } from "next/navigation";
import Loader from "../UI/Loader";
const Homepage: NextPage = () => {
  const contextUser = useUser();
  const router = useRouter();
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (contextUser.user) {
        setUserLoading(true);
        try {
          const userProfile = await useGetProfileByUserId(
            contextUser?.user?.id
          );
          if (userProfile?.role === "buyer") router.push("/buyer");
          if (userProfile?.role === "seller") {
            const sellerProfile = await useGetSellerProfileByUserId(
              contextUser?.user?.id
            );
            if (sellerProfile?.id)
              router.push(`/seller/profile/${sellerProfile.id}`);
            else router.push("/seller");
          } else router.push("/buyer");
        } catch (error) {
          throw error;
        } finally {
          setTimeout(() => {
            setUserLoading(false);
          }, 2000);
        }
      }
    };

    checkUser();
  }, [contextUser, router]);

  return (
    <>
      {userLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <MainLayout>
          <Hero />
          <Whyus />
          <HowItWorks />
          <Testimonial />
          <GetStarted />
          {!contextUser?.user && <ShopasGuest />}
        </MainLayout>
      )}
    </>
  );
};

export default Homepage;
