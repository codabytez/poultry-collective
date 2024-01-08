import { ID, database } from "@/libs/AppwriteClient";

const useAddToCart = async (
  userId: string,
  productId: string,
  quantity: string,
  weight: string,
  price: string,
  name: string,
  image: string
) => {
  try {
    const res = await database.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART),
      ID.unique(),
      {
        user_id: userId,
        product_id: productId,
        quantity: quantity,
        weight: weight,
        price: price,
        time_stamp: new Date().toISOString(),
        product_name: name,
        image: image,
      }
    );
    return res;
  } catch (error) {
    throw new Error("Failed to add the item to the cart. Please try again.");
  }
};

export default useAddToCart;
