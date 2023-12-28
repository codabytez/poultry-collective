import { database } from "@/libs/AppwriteClient";

const useGetProductById = async (productId: string) => {
  try {
    const result = await database.getDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
      productId
    );

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useGetProductById;
