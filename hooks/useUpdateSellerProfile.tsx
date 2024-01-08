import { database } from "@/libs/AppwriteClient";

const useUpdateSellerProfile = async (
  userId: string,
  name: string,
  address: string,
  phoneNumber: string,
  city: string
) => {
  try {
    const res = await database.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      userId,
      {
        business_name: name,
        address: address,
        phone_number: phoneNumber,
        city: city,
      }
    );
    return res;
  } catch (e) {
    throw e;
    return null;
  }
};

export default useUpdateSellerProfile;
