"use client";
import Footer from "@/components/Footer";
import GetStarted from "@/components/LandingPage/GetStarted";
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Testimonial from "@/components/LandingPage/Testimonial";
import Whyus from "@/components/LandingPage/Whyus";
import { Navbar } from "@/components/Navbar";
import withAuth from "@/utils/withAuth";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Whyus />
      <HowItWorks />
      <Testimonial />
      <GetStarted />
      <Footer />
    </main>
  );
};

export default withAuth(Home);

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
