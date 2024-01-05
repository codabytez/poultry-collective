import { database, ID } from  "@/libs/AppwriteClient";

const useCreateProfile = async (
  userId: string,
  name: string,
  email: string,
  image: string
) => {
  try {
    const res = await database.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE),
      ID.unique(),
      {
        user_id: userId,
        email: email,
        name: name,
        image: image,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default useCreateProfile;
