import { storage } from "@/libs/AppwriteClient";

const useChangeSellerBanner = async (file: File, currentImage: string) => {
  let videoId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  try {
    const response = await fetch(URL.createObjectURL(file));
    const blob = await response.blob();
    const finalImage = new File([blob], `${videoId}.png`, {
      type: "image/png",
    });

    const result = await storage.createFile(
      String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
      videoId,
      finalImage
    );

    if (
      currentImage !== String(process.env.NEXT_PUBLIC_DEFAULT_SELLER_AVATAR)
    ) {
      await storage.deleteFile(
        String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
        currentImage
      );
    }

    return result.$id;
  } catch (error) {
    throw error;
  }
};

export default useChangeSellerBanner;
