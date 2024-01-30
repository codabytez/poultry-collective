"use client";
import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { useEffect, useState } from "react";
import { Image as Icon } from "iconsax-react";
import Image from "next/image";
import { Input, SelectInput } from "../UI/Input";

const Step3: NextPage<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}> = ({ setIsComplete, isLoading }) => {
  const { bankDetails, setBankDetails } = useFormContext();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    let newBankDetails = { ...bankDetails };
    if (target.name === "validIdImage") {
      if (target.files && target && target.files.length > 0) {
        let file = target.files[0];
        //   Change file name
        const fileName = file.name.toUpperCase().split(".");
        fileName.shift();
        fileName.unshift("VALID_ID");

        file = new File([file], fileName.join("."), { type: file.type });

        //   if (file.size > 2mb)
        if (file.size > 2000000) {
          setErrorMessage("File size is too large");
          return;
        }
        setErrorMessage("");
        newBankDetails = {
          ...bankDetails,
          validIdImage: {
            raw: file,
            preview: URL.createObjectURL(file),
          },
        };
      }
    } else {
      newBankDetails = {
        ...bankDetails,
        [e.target.name]: e.target.value,
      };
    }
    setBankDetails(newBankDetails);
    setIsComplete(
      newBankDetails.accountNumber !== "" &&
        newBankDetails.bankName !== "" &&
        newBankDetails.validIdImage &&
        newBankDetails.validIdImage.raw !== null
    );
  };

  useEffect(() => {
    // Revoke the old preview URL when a new file is selected
    if (bankDetails.validIdImage && bankDetails.validIdImage.preview) {
      URL.revokeObjectURL(bankDetails.validIdImage.preview);
    }

    // Revoke the preview URL when component unmounts
    return () => {
      if (bankDetails.validIdImage && bankDetails.validIdImage.preview) {
        URL.revokeObjectURL(bankDetails.validIdImage.preview);
      }
    };
  }, [bankDetails.validIdImage]);

  return (
    <div className="flex flex-col items-start gap-8 w-[80%] sm:w-auto">
      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="Bank Name"
        value={bankDetails.bankName}
        onChange={handleChange}
        name="bankName"
      />

      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="Account Number"
        value={bankDetails.accountNumber}
        onChange={handleChange}
        name="accountNumber"
      />

      <SelectInput
        fullWidth
        disabled={isLoading}
        name="validId"
        value={bankDetails.validId}
        onChange={handleChange}
        optionPlaceholder="Valid ID"
        options={[
          { value: "Drivers License", label: "Driver's License" },
          { value: "Voters ID", label: "Voter's ID" },
          { value: "National ID", label: "National ID" },
          { value: "Passport", label: "Passport" },
        ]}
      />

      <label
        htmlFor="validIdImage"
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
            ) : bankDetails.validIdImage.raw ? (
              bankDetails.validIdImage.raw.name
            ) : (
              <>
                Upload a valid ID
                <span className="text-cod-gray-cg-400"> Max size 2MB</span>
              </>
            )}
          </p>
        </>
      </label>
      <input
        disabled={isLoading}
        className="hidden"
        type="file"
        placeholder="Valid ID Image"
        onChange={handleChange}
        name="validIdImage"
        id="validIdImage"
        accept="image/*"
      />
    </div>
  );
};

export default Step3;
