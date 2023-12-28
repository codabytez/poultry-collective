/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { Image as Icon } from "iconsax-react";
import Image from "next/image";
import { useState } from "react";
import Input from "../UI/Input";

const Step2: NextPage = () => {
  const { bioAndBanner, setBioAndBanner } = useFormContext();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      let file = target.files[0];

      //   Change file name
      const fileName = file.name.toUpperCase().split(".");
      fileName.shift();
      fileName.unshift("BANNER");

      file = new File([file], fileName.join("."), { type: file.type });

      //   if (file.size > 2mb)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size should be less than 2MB");
        return;
      } else {
        setErrorMessage("");
        const objectUrl = URL.createObjectURL(file);
        setBioAndBanner((prev: string[]) => ({
          ...prev,
          bannerImage: {
            preview: objectUrl,
            raw: file,
          },
        }));
        URL.revokeObjectURL(objectUrl); // Revoke the URL after it's used
      }
      console.log(bioAndBanner);
    } else {
      setBioAndBanner((prev: string[]) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      console.log(bioAndBanner);
    }
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <Input
        type="text"
        placeholder="Bio"
        value={bioAndBanner.bio}
        onChange={handleChange}
        name="bio"
        inputType="textarea"
      />

      <label
        htmlFor="bannerImage"
        className="flex items-start gap-9 p-3 w-[400px] h-[97px] bg-light-green-shade"
      >
        <>
          <Icon size="32" color="#CED4DA" />

          <p
            className={`text-SP-03 ${
              errorMessage ? " text-red-600" : "text-cod-gray-cg-600"
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
