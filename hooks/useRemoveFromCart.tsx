import { database } from "@/libs/AppwriteClient";

const useRemoveFromCart = async (productId: string) => {
  try {
    const result = await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART),
      productId
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useRemoveFromCart;
