import { database, Query } from "@/libs/AppwriteClient";

const useGetProductBySeller = async (SellerId: string) => {
  try {
    const result = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
      [Query.equal("seller_id", SellerId), Query.orderDesc("seller_id")]
    );
    return result.documents;
  } catch (error) {
    throw error;
  }
};

export default useGetProductBySeller;
