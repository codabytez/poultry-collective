import { database } from "@/libs/AppwriteClient";

const useUpdateSellerBanner = async (id: string, banner: string) => {
  try {
    await database.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      id,
      {
        banner: banner,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default useUpdateSellerBanner;
