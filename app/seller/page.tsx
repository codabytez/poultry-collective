import SellerHomePage from "@/components/seller/HomePage";
import React from "react";
import withRoleCheck from "@/helpers/withRoleCheck";
import {Metadata} from 'next'


export const metadata: Metadata = {
  title: "Seller Home",
  description: "Seller Home",
};


const SellerPage = () => {
  return <SellerHomePage />;
};

export default SellerPage;
