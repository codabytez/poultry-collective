import { NextPage, Metadata } from "next";
import { useFormContext } from "@/context/seller";
import { productDetailTypes, sellerProfileProps } from "@/@types";
import Profile from "@/components/seller/Profile";
import SellerProfile from "@/components/seller/Profile";
import useGetSellerProfileById from "@/hooks/useGetSellerProfileById";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const id = params.id;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sellerProfile = await useGetSellerProfileById(id);

  return {
    title: sellerProfile?.business_name,
    description: sellerProfile?.bio,
  };
}

const SellerProfilePage: NextPage<productDetailTypes> = ({ params }) => {
  return <SellerProfile params={params} />;
};

export default SellerProfilePage;
