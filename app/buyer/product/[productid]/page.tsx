import { productDetailTypes } from "@/@types";
import ProductDescription from "@/components/buyer/ProductDescription";
import { NextPage } from "next";

const ProductPage: NextPage<productDetailTypes> = ({ params }) => {
  return <ProductDescription params={params} />;
};

export default ProductPage;
