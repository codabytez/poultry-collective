/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { Image as Icon } from "iconsax-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "../UI/Input";

const Step2: NextPage<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}> = ({ setIsComplete, isLoading }) => {
  const { bioAndBanner, setBioAndBanner } = useFormContext();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    let newBioAndBanner = { ...bioAndBanner };
    if (target.name === "bannerImage") {
      if (target.files && target && target.files.length > 0) {
        let file = target.files[0];
        //   Change file name
        const fileName = file.name.toUpperCase().split(".");
        fileName.shift();
        fileName.unshift("BANNER");

        file = new File([file], fileName.join("."), { type: file.type });

        //   if (file.size > 2mb)
        if (file.size > 2000000) {
          setErrorMessage("File size is too large");
          return;
        }
        setErrorMessage("");
        newBioAndBanner = {
          ...bioAndBanner,
          bannerImage: {
            raw: file,
            preview: URL.createObjectURL(file),
          },
        };
      }
    } else {
      newBioAndBanner = {
        ...bioAndBanner,
        [e.target.name]: e.target.value,
      };
    }
    setBioAndBanner(newBioAndBanner);
    setIsComplete(Object.values(newBioAndBanner).every((item) => item !== ""));
  };

  useEffect(() => {
    // Revoke the old preview URL when a new file is selected
    if (bioAndBanner.bannerImage && bioAndBanner.bannerImage.preview) {
      URL.revokeObjectURL(bioAndBanner.bannerImage.preview);
    }

    // Revoke the preview URL when the component unmounts
    return () => {
      if (bioAndBanner.bannerImage && bioAndBanner.bannerImage.preview) {
        URL.revokeObjectURL(bioAndBanner.bannerImage.preview);
      }
    };
  }, [bioAndBanner.bannerImage]);

  return (
    <div className="flex flex-col items-start gap-8 w-[80%] sm:w-auto">
      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="Bios"
        value={bioAndBanner.bio}
        onChange={handleChange}
        name="bio"
        inputType="textarea"
        maxLength={50}
        showMaxLength={true}
      />

      <label
        htmlFor="bannerImage"
        className="flex items-start gap-9 p-3 w-full sm:w-[400px] h-[97px] bg-light-green-shade"
      >
        <>
          <Icon size="32" color="#CED4DA" />

          <p
            className={`text-BC-03 sm:text-SP-03 ${
              errorMessage ? "text-red-600" : "text-cod-gray-cg-600"
            } font-normal`}
          >
            {errorMessage ? (
              errorMessage
            ) : bioAndBanner.bannerImage.raw ? (
              bioAndBanner.bannerImage.raw.name
            ) : (
              <>
                Upload a banner
                <span className="text-cod-gray-cg-400 "> Max size 2MB</span>
              </>
            )}
          </p>
        </>
      </label>
      <input
        disabled={isLoading}
        className="hidden"
        type="file"
        placeholder="Banner Image"
        onChange={handleChange}
        name="bannerImage"
        id="bannerImage"
        accept="image/*"
      />
    </div>
  );
};

export default Step2;
