import { database, Query } from "@/libs/AppwriteClient";

const useGetRatings = async (sellerId: string, reviewerId: string) => {
  try {
    const result = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_RATING),
      [
        Query.equal("seller_id", sellerId),
        Query.equal("reviewer_id", reviewerId),
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default useGetRatings;
