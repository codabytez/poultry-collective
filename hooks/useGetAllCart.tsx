import { database, Query } from "@/libs/AppwriteClient";

const useGetAllCart = async (userId: string) => {
  try {
    const { documents } = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART),
      [Query.equal("user_id", userId), Query.orderDesc("$id")]
    );
    return documents;
  } catch (error) {
    throw error;
  }
};

export default useGetAllCart;
