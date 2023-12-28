import { NextPage } from "next";
import { database, Query } from "@/config/appwriteConfig";

const useGetProfileByUserId = async (userId: string) => {
  try {
    const res = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE),
      [Query.equal("user_id", userId)]
    );

    const documents = res.documents;
    if (documents.length === 0) return null;

    return {
      id: documents[0]?.$id,
      user_id: documents[0]?.user_id,
      name: documents[0]?.name,
      email: documents[0]?.email,
      image: documents[0]?.image,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default useGetProfileByUserId;
