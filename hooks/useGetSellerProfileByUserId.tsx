import { database, Query } from "@/libs/AppwriteClient";

const useGetSellerProfileByUserId = async (userId: string) => {
  try {
    const res = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      [Query.equal("user_id", userId)]
    );

    const documents = res.documents;
    if (documents.length === 0) return null;

    return {
      id: documents[0]?.$id,
      business_name: documents[0]?.business_name,
      address: documents[0]?.address,
      phone_number: documents[0]?.phone_number,
      city: documents[0]?.city,
      bio: documents[0]?.bio,
      banner: documents[0]?.banner,
      bank_name: documents[0]?.bank_name,
      account_number: documents[0]?.account_number,
      user_id: documents[0]?.user_id,
    };
  } catch (e) {
    throw e;
    return null;
  }
};

export default useGetSellerProfileByUserId;
