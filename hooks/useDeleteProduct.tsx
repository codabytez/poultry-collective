import { database, storage } from "@/libs/AppwriteClient";

const useDeleteProduct = async (productId: string, currentImages: string[]) => {
  try {
    // Delete the product document
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
      productId
    );

    // Delete each image associated with the product
    await Promise.all(
      currentImages.map((imageId) =>
        storage.deleteFile(
          String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
          imageId
        )
      )
    );
  } catch (error) {
    throw error;
  }
};

export default useDeleteProduct;
