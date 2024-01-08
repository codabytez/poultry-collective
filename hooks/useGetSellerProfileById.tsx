import { database } from "@/libs/AppwriteClient";

const useGetSellerProfileById = async (sellerId: string) => {
  try {
    const result = await database.getDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      sellerId
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export default useGetSellerProfileById;
