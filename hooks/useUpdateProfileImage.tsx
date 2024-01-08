import { database } from "@/libs/AppwriteClient";

const useUpdateProfileImage = async (userId: string, data: any) => {
  try {
    const result = await database.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE),
      userId,
      data
    );

    return result;
  } catch (error) {
    throw error;
  }
};
