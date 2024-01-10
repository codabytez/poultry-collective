import { database, ID } from "@/libs/AppwriteClient";

const useAddRating = async (
  rating: string,
  review: string,
  reviewerId: string,
  sellerId: string
) => {
  try {
    const result = await database.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_RATING),
      ID.unique(),
      {
        rating: rating,
        review: review,
        reviewer_id: reviewerId,
        seller_id: sellerId,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default useAddRating;
