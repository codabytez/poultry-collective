import HomePage from "@/components/buyer/HomePage";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Buyer Home",
  description: "Get all your poultry products here",
};

const BuyerHomePage: NextPage = () => {
  return <HomePage />;
};

export default BuyerHomePage;
