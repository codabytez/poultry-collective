"use client";
import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { useState } from "react";
import { Image as Icon } from "iconsax-react";
import Image from "next/image";
import { Input, SelectInput } from "../UI/Input";
import withRoleCheck from "@/helpers/withRoleCheck";

const Step3: NextPage = () => {
  const { bankDetails, setBankDetails } = useFormContext();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      let file = target.files[0];

      //   Change file name
      const fileName = file.name.toUpperCase().split(".");
      fileName.shift();
      fileName.unshift("VALID ID");
      file = new File([file], fileName.join("."), { type: file.type });

      //   if (file.size > 2mb)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size should be less than 2MB");
        return;
      } else {
        setErrorMessage("");
        const objectUrl = URL.createObjectURL(file);
        setBankDetails((prev: string[]) => ({
          ...prev,
          validIdImage: {
            preview: objectUrl,
            raw: file,
          },
        }));
        URL.revokeObjectURL(objectUrl); // Revoke the URL after it's used
      }
    } else {
      setBankDetails((prev: string[]) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <Input
        fullWidth
        type="text"
        placeholder="Bank Name"
        value={bankDetails.bankName}
        onChange={handleChange}
        name="bankName"
      />

      <Input
        fullWidth
        type="text"
        placeholder="Account Number"
        value={bankDetails.accountNumber}
        onChange={handleChange}
        name="accountNumber"
      />

      <SelectInput
        fullWidth
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
            ) : bankDetails.validIdImage.raw ? (
              bankDetails.validIdImage.raw.name
            ) : (
              <>
                Upload a valid ID
                <span className="text-cod-gray-cg-400 "> Max size 2MB</span>
              </>
            )}
          </p>
        </>
      </label>
      <input
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
