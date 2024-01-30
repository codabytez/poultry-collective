import { NextPage } from "next";
import { Camera } from "iconsax-react";
import StarRating from "../UI/StarRating";
import { useState, useEffect, useRef } from "react";
import useCreateBucketUrl from "@/hooks/useCreateBucketUrl";
import useChangeSellerBanner from "@/hooks/useChangeSellerBanner";
import useUpdateSellerBanner from "@/hooks/useUpdateSellerBanner";
import { notify } from "../UI/Toast";

type sellerBannerProps = {
  isCurrentUser?: boolean;
  seller: any;
};

const SellerBanner: NextPage<sellerBannerProps> = ({
  isCurrentUser,
  seller,
}) => {
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let url: string;
    const getBanner = async () => {
      url = await useCreateBucketUrl(seller?.banner);
      setImg(url);
    };

    getBanner();

    return () => {
      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    };
  }, [seller]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setIsLoading(true);
      let file = target.files[0];
      //   Change file name
      const fileName = file.name.toUpperCase().split(".");
      fileName.shift();
      fileName.unshift(seller?.business_name);

      file = new File([file], fileName.join("."), { type: file.type });

      //   if (file.size > 2mb)
      if (file.size > 2000000) {
        notify({
          message: "File size is too large",
          type: "error",
        });
        return;
      }
      await handleChangeBanner(file);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleChangeBanner = async (file: File) => {
    const newBannerId = await useChangeSellerBanner(file, seller.banner);
    await useUpdateSellerBanner(seller.id, newBannerId);
    const url = await useCreateBucketUrl(newBannerId);
    setImg(url);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="w-full h-[300px] relative p-6 space-y-4 backdrop-blur-lg">
            <div className="h-full bg-gray-200 animate-loading-pulse bg-gradient-animation bg-200"></div>
            <div className="space-y-4 absolute bottom-10 pl-6 w-full">
              <div className="w-1/2 h-14 rounded-lg bg-gray-300 animate-loading-pulse bg-gradient-animation bg-200"></div>
              <div className="w-[45%] h-12 bg-gray-300 animate-loading-pulse bg-gradient-animation bg-200"></div>
            </div>
          </div>
        </>
      ) : (
        <div className=" w-11/12 mx-auto mt-10 relative">
          <div className="w-full h-[300px] relative">
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

          <div className="inline-flex flex-col justify-center items-start gap-4 md:gap-8 absolute bottom-10 md:bottom-0 md:top-20 left-6">
            <h2 className="text-H3-03 md:text-H2-03 font-medium text-cod-gray-cg-100">
              {seller.business_name}
            </h2>
            <StarRating seller={seller} isCurrentUser={isCurrentUser} />
          </div>

          {isCurrentUser && (
            <div
              className="inline-flex p-2 sm:p-4 items-start gap-2 bg-offwhite cursor-pointer select-none absolute right-6 top-6 rounded-lg sm:rounded-none"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Camera size={24} color="#292D32" />
              <p className="hidden sm:inline-block text-SP-03 font-normal text-cod-gray-cg-600">
                Change Banner
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SellerBanner;
