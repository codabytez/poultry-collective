import { database } from "@/libs/AppwriteClient";

const useUpdateSellerBankDetails = async (
  id: string,
  bankName: string,
  accountNumber: string
) => {
  try {
    await database.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_SELLER_PROFILE),
      id,
      {
        bank_name: bankName,
        account_number: accountNumber,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default useUpdateSellerBankDetails;
