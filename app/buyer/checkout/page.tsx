import { NextPage, Metadata } from "next";
import Checkout from "@/components/buyer/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

const CheckoutPage: NextPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
