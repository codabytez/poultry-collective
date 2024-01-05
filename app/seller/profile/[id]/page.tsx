import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { productDetailTypes, sellerProfileProps } from "@/@types";
import Profile from "@/components/seller/Profile";
import ProductListing from "@/components/seller/ProductListing";

const SellerProfile: NextPage<productDetailTypes> = ({ params }) => {
  return <ProductListing params={params} />;
};

export default SellerProfile;
