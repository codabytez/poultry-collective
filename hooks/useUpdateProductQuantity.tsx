import { database } from "@/libs/AppwriteClient";

const useUpdateProductQuantity = () => {
  const removeProductQuantity = async (productId: string, qty: string) => {
    try {
      await database.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
        productId,
        {
          quantity_available: String(qty),
        }
      );
    } catch (error) {
      throw error;
    }
  };

  const addProductQuantity = async (productId: string, qty: string) => {
    try {
      await database.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
        productId,
        {
          quantity_available: String(qty),
        }
      );
    } catch (error) {
      throw error;
    }
  };
  return { removeProductQuantity, addProductQuantity };
};

export default useUpdateProductQuantity;
