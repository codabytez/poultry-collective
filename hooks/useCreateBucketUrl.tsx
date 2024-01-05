
const useCreateBucketUrl = async (fileId: string) => {
  const url = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const id = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  if (!url || !id || !endpoint) return "";

  return `${url}/storage/buckets/${id}/files/${fileId}/view?project=${endpoint}`;
};

export default useCreateBucketUrl;

