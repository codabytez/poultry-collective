import SellerHomePage from "@/components/seller/HomePage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Home",
  description: "Seller Home",
};

const SellerPage = () => {
  return <SellerHomePage />;
};

export default SellerPage;
