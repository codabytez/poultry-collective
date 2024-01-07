import { database, Query } from "@/libs/AppwriteClient";

const useDeleteAllCartByUserId = async (userId: string) => {
    try {
        const { documents } = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART),
            [Query.equal("user_id", userId), Query.orderDesc("$id")]
        );

        const deletePromises = documents.map((doc) => {
            database.deleteDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART),
                doc.$id
            )
            console.log('deleted', doc.$id)
        }
        );

        await Promise.all(deletePromises);
    } catch (error) {
        throw error;
    }
};

export default useDeleteAllCartByUserId;
