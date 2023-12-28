import { database, storage, ID } from "@/libs/AppwriteClient";

const useCreateProduct = async (
  files: File[],
  userId: string,
  productName: string,
  farmName: string,
  productDetails: string,
  price: string,
  QuantityAvailable: string,
  productWeight: string
) => {
  const imageIds = files.map(
    () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );

  try {
    const imageResults = await Promise.all(
      files.map(async (file, index) => {
        const response = await fetch(URL.createObjectURL(file));
        const blob = await response.blob();
        const finalImage = new File([blob], `${imageIds[index]}.png`, {
          type: "image/png",
        });

        const result = await storage.createFile(
          String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
          imageIds[index],
          finalImage
        );

        return result.$id;
      })
    );

    await database.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCTS),
      ID.unique(),
      {
        user_id: userId,
        product_name: productName,
        quantity_available: QuantityAvailable,
        product_price: price,
        product_details: productDetails,
        product_image: imageResults,
        product_weight: productWeight,
        created_at: new Date().toISOString(),
        farm_name: farmName,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useCreateProduct;
