import { database, Query } from "@/libs/AppwriteClient";

const useGetProductBySeller = async (userId: string) => {
  try {
    const result = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
      [Query.equal("user_id", userId), Query.orderDesc("$id")]
    );
    console.log("userID:", userId);
    return result.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useGetProductBySeller;
