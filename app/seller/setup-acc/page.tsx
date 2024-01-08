import SetUpSellerAccount from "@/components/seller/SetUpSellerAccount";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Onboarding",
  description: "Set up your seller account",
};

const SellerOnboarding: NextPage = () => {
  return <SetUpSellerAccount />;
};

export default SellerOnboarding;
