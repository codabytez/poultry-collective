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
const Homepage: NextPage = () => {
  const contextUser = useUser();

  return (
    <MainLayout>
      <Hero />
      <Whyus />
      <HowItWorks />
      <Testimonial />
      <GetStarted />
      {!contextUser?.user && <ShopasGuest />}
    </MainLayout>
  );
};

export default Homepage;
