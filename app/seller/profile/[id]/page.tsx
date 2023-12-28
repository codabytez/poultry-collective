import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { sellerProfileProps } from "@/@types";
import Profile from "@/components/seller/Profile";

const SellerProfile: NextPage = (param) => {
  return <Profile />;
};

export default SellerProfile;
