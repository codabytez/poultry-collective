import { database, storage } from "@/libs/AppwriteClient";

const useDeleteProduct = async (productId: string, currentImage: string) => {
  try {
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
      productId
    );

    await storage.deleteFile(
      String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
      currentImage
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useDeleteProduct;
