import { storage } from "@/libs/AppwriteClient";

const useCreateBucketUrl = async (fileId: string) => {
  const url = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const id = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  if (!url || !id || !endpoint) return "";

  return `${url}/storage/buckets/${id}/files/${fileId}/view?project=${endpoint}`;
};

export default useCreateBucketUrl;

// https://cloud.appwrite.io/v1/storage/buckets/657dc2d1c018301db553/files/avf4hj1pj8a93gir75ijj/view?project=657d7d40ecfc0df965cc

// https://cloud.appwrite.io/v1/storage/buckets/657dc2d1c018301db553/files/avf4hj1pj8a93gir75ijj/view?project=657d7d40ecfc0df965cc

// https://cloud.appwrite.io/v1/storage/buckets/657dc2d1c018301db553/files/avf4hj1pj8a93gir75ijj/view?project=657d7d40ecfc0df965cc

// https://cloud.appwrite.io/v1/storage/buckets/657dc2d1c018301db553/files/undefined/view?project=657d7d40ecfc0df965cc
