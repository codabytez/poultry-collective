/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import { Input } from "../UI/Input";
import { useState } from "react";
import { Image as ImgIcon, CloseCircle } from "iconsax-react";
import Image from "next/image";
import Button from "../UI/Button";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import useCreateProduct from "@/hooks/useCreateProduct";
import { useProductStore } from "@/stores/product";
import nProgress from "nprogress";
import withRoleCheck from "@/helpers/withRoleCheck";

const AddProduct: NextPage<{
  farmName: string;
  sellerId: string;
  onCloseModal: () => void;
}> = ({ farmName, onCloseModal, sellerId }) => {
  const contextUser = useUser();
  const router = useRouter();
  const { setProductsBySeller } = useProductStore();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 3) {
        setError("You can only upload up to 3 images.");
      } else {
        const filesArray = Array.from(e.target.files).map((file) => {
          const objectUrl = URL.createObjectURL(file);
          return objectUrl;
        });

        // Store file objects to state
        setImages((prevImages) => prevImages.concat(filesArray));

        setError(null); // Clear any previous error
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contextUser?.user) return router.push("/login");
    setIsLoading(true);
    nProgress.start();
    const formData = new FormData(e.currentTarget);
    const productName = formData.get("productName");
    const quantityAvailable = formData.get("quantityAvailable");
    const productPrice = formData.get("productPrice");
    const productWeight = formData.get("productWeight");
    const productDetails = formData.get("productDetails");

    if (!productName || !quantityAvailable || !productPrice || !productWeight) {
      setError("Please fill in all the fields.");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    const files = Array.from(
      formData.getAll("uploadProductImage") as unknown as FileList
    );

    const product = {
      productName,
      quantityAvailable,
      productPrice,
      productWeight,
      productDetails,
      images: files,
      farmName,
      sellerId,
    };

    try {
      await useCreateProduct(
        product.images,
        contextUser.user?.id,
        product.productName as string,
        product.farmName as string,
        product.productDetails as string,
        product.productPrice as string,
        product.quantityAvailable as string,
        product.productWeight as string,
        product.sellerId as string
      );

      // await setProductsBySeller(contextUser.user?.id);
    } catch (error) {
      throw new Error("Failed to create product. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        nProgress.done();
      }, 2000);
    }

    // Revoke the URL after it's used to avoid memory leaks
    images.forEach((image) => URL.revokeObjectURL(image));

    if (sellerId) {
      setProductsBySeller(sellerId);
    }

    setImages([]);
    setError(null);
    onCloseModal();
  };

  return (
    <div className="w-[602px] max-h-[1100px] h-[70vh] m-auto flex flex-col justify-start items-center bg-white pt-14 overflow-y-auto">
      <h3 className="text-H3-03 font-normal text-cod-gray-cg-600 pb-6">
        Add your product
      </h3>

      <p className="w-[437.5px] h-16 text-cod-gray-cg-400 text-H5-03 font-normal text-center">
        Upload your product details and start selling
      </p>

      <form
        className="inline-flex flex-col items-start gap-8 mt-5"
        onSubmit={handleSubmit}
      >
        <Input
          fullWidth
          type="text"
          name="productName"
          placeholder="Product Name"
        />

        <Input
          fullWidth
          type="text"
          name="quantityAvailable"
          placeholder="Quantity Available (crates)"
        />

        <Input
          fullWidth
          type="text"
          name="productPrice"
          placeholder="Product Price (per crate)"
        />

        <Input
          fullWidth
          type="text"
          name="productWeight"
          placeholder="Product Weight (kg)"
        />

        <Input
          fullWidth
          type="text"
          name="productDetails"
          placeholder="Product Details (150 characters max)"
          inputType="textarea"
          value={productDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProductDescription(e.target.value)
          }
          maxLength={150}
          showMaxLength={true}
        />

        <div className="w-[398px] h-[179px] bg-light-green-shade flex justify-center items-center mb-3">
          <label htmlFor="uploadProductImage">
            {error ? (
              <p className="text-SP-03 text-red-r-600 text-center">{error}</p>
            ) : images.length === 0 ? (
              <div>
                <div className="flex gap-3 items-center mb-4">
                  <ImgIcon size="32" color="#CED4DA" />
                  <p className="text-SP-03 text-cod-gray-cg-400 text-center font-normal">
                    <span className="underline">Upload Product Image(s)</span>{" "}
                    <span className="no-underline">Max size 2MB</span>
                  </p>
                </div>

                <div className="inline-flex justify-center items-center gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ImgIcon key={index} size={100} color="#CED4DA" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="inline-flex justify-center items-center gap-6">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex w-[100px] h-[100px] relative p-2 justify-center items-center shrink-0"
                  >
                    <Image
                      width={81.25}
                      height={81.25}
                      src={image}
                      alt={image}
                      className="rounded-lg w-[81.25px] h-[81.25px] object-cover object-center"
                    />
                    <CloseCircle
                      variant="Bold"
                      size={24}
                      color="#292D32"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 cursor-pointer z-20"
                    />
                  </div>
                ))}
              </div>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            name="uploadProductImage"
            accept="image/*"
            id="uploadProductImage"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <Button
          size="lg"
          fullWidth
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Save Details
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
