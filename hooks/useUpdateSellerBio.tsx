import { database } from "@/libs/AppwriteClient";

const useUpdateSellerBio = async (id: string, bio: string) => {
  try {
    await database.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      id,
      {
        bio,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default useUpdateSellerBio;
