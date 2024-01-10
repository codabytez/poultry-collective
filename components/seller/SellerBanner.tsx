import { NextPage } from "next";
import { useSellerProfileStore } from "@/stores/sellerProfile";
import { Camera } from "iconsax-react";
import StarRating from "../UI/StarRating";
import { useState, useEffect } from "react";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";

type sellerBannerProps = {
  isCurrentUser?: boolean;
  seller?: any;
};

const SellerBanner: NextPage<sellerBannerProps> = ({
  isCurrentUser,
  seller,
}) => {
  // const { currentSellerProfile } = useSellerProfileStore();
  const [img, setImg] = useState("");

  useEffect(() => {
    const getBanner = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const url = await useCreateBucketUrl(seller?.banner);
      setImg(url);
    };

    getBanner();
  }, [seller]);

  return (
    <div className=" w-11/12 mx-auto mt-10 relative">
      <div className="w-full h-[300px] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)",
          }}
        />
      </div>

      <div className="inline-flex flex-col justify-center items-start gap-8 absolute top-20 left-6">
        <h2 className="text-H2-03 font-medium text-cod-gray-cg-100">
          {seller.business_name}
        </h2>
        <StarRating seller={seller} isCurrentUser={isCurrentUser} />
      </div>

      {isCurrentUser && (
        <div className="inline-flex p-4 items-start gap-2 bg-offwhite absolute right-6 top-6">
          <Camera size={24} color="#292D32" />
          <p className="text-SP-03 font-normal text-cod-gray-cg-600">
            Change Banner
          </p>
        </div>
      )}
    </div>
  );
};

export default SellerBanner;
