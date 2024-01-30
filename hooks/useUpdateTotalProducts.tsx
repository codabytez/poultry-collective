import { database } from "@/libs/AppwriteClient";

const useUpdateTotalProducts = async (id: string, totalProducts: number) => {
  try {
    const result = await database.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      id,
      {
        total_products: totalProducts,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default useUpdateTotalProducts;
