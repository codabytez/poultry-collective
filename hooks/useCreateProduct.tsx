import { database, storage, ID } from "@/libs/AppwriteClient";

const useCreateProduct = async (
  userId: string,
  productName: string,
  farmName: string,
  productDetails: string,
  price: string,
  QuantityAvailable: string,
  productWeight: string,
  sellerId: string,
  files: File[]
) => {
  const imageIds = files.map(
    () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  ); // Generate random image ids

  if (productWeight.length > 3) {
    throw new Error("Product weight must be less than 1000");
  }

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
    console.log("Image results:", imageResults);

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
        product_weight: productWeight,
        created_at: new Date().toISOString(),
        farm_name: farmName,
        seller_id: sellerId,
        product_image: imageResults,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default useCreateProduct;
