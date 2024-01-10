import { database, Query } from "@/libs/AppwriteClient";

const useGetSellerRatings = async (sellerId: string) => {
  try {
    const result = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_RATING),
      [Query.equal("seller_id", sellerId)]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default useGetSellerRatings;
