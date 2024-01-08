import { database, ID } from "@/libs/AppwriteClient";

const useCreateSellerProfile = async (
  userId: string,
  name: string,
  address: string,
  city: string,
  phone_number: string,
  banner: string
) => {
  try {
    const res = await database.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      ID.unique(),
      {
        user_id: userId,
        business_name: name,
        address,
        city,
        phone_number,
        banner,
      }
    );
    return res;
  } catch (e) {
    throw e;
    return null;
  }
};

export default useCreateSellerProfile;
