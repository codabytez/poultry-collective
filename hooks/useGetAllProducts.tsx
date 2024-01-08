import { database } from "@/libs/AppwriteClient";

const useGetAllProducts = async () => {
  try {
    const result = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS)
    );

    return result.documents;
  } catch (error) {
    throw error;
  }
};

export default useGetAllProducts;
