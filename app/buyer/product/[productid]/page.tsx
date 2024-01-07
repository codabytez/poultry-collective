import { productDetailTypes } from "@/@types";
import ProductDescription from "@/components/buyer/ProductDescription";
import useGetProductById from "@/hooks/useGetProductById";
import { NextPage, Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { productid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const productid = params.productid;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const product = await useGetProductById(productid);

  return {
    title: product.product_name,
    description: product.product_details,
  };
}

const ProductPage: NextPage<productDetailTypes> = ({ params }) => {
  return <ProductDescription params={params} />;
};

export default ProductPage;
