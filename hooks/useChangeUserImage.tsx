import { storage } from "@/libs/AppwriteClient";
import Image from "image-js";

const useChangeUserImage = async (
  file: File,
  cropper: any,
  currentImage: string,
  userId: string
) => {
  let imageId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const x = cropper.left;
  const y = cropper.top;
  const width = cropper.width;
  const height = cropper.height;

  try {
    const response = await fetch(URL.createObjectURL(file));
    const imageBuffer = await response.arrayBuffer();

    const image = await Image.load(imageBuffer);
    const croppedImage = image.crop({ x, y, width, height });
    const resizedImage = croppedImage.resize({ width: 200, height: 200 });
    const blob = await resizedImage.toBlob();
    const arrayBuffer = await blob.arrayBuffer();
    const finalImage = new File([arrayBuffer], "image.png", {
      type: blob.type,
    });
    const result = await storage.createFile(
      String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
      imageId,
      finalImage
    );

    if (currentImage !== String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)) {
      await storage.deleteFile(
        String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
        currentImage
      );
    }
    return result.$id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useChangeUserImage;
