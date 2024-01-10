import ViewCart from "@/components/buyer/ViewCart";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "View Cart",
  description: "View Cart page",
};

const ViewCartPage: NextPage = () => {
  return <ViewCart />;
};

export default ViewCartPage;
