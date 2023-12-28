"use client";
import Footer from "@/components/Footer";
import GetStarted from "@/components/LandingPage/GetStarted";
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import ShopasGuest from "@/components/LandingPage/ShopasGuest";
import Testimonial from "@/components/LandingPage/Testimonial";
import Whyus from "@/components/LandingPage/Whyus";
import { Navbar } from "@/components/Navbar";
import MainLayout from "@/layouts/MainLayout";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Hero />
      <Whyus />
      <HowItWorks />
      <Testimonial />
      <GetStarted />
      <ShopasGuest />
    </MainLayout>
  );
};

export default Home;

// app/
// |-- components/
// |   |-- LoginPage.tsx
// |   |-- HomePage.tsx
// |   |-- OtherComponent.tsx
// |-- hooks/
// |   |-- useAuth.ts
// |-- _app.tsx
// |-- index.tsx
// |-- login.tsx
// public/
// |-- favicon.ico
// |-- other-static-assets...
// styles/
// |-- globals.css
// |-- other-styles...

// NOTE: tedefresh-rebrand
// const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('657d7bb31401dbefa690');
