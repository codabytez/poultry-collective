"use client";
import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { Input } from "../UI/Input";

const Step1: NextPage<{
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}> = ({ setIsComplete, isLoading }) => {
  const { businessInfo, setBusinessInfo } = useFormContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newBusinessInfo = {
      ...businessInfo,
      [e.target.name]: e.target.value,
    };
    setBusinessInfo(newBusinessInfo);
    setIsComplete(Object.values(newBusinessInfo).every((item) => item !== ""));
  };
  return (
    <div className="flex flex-col items-start gap-6 w-[80%] sm:w-[400px]">
      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="Business Name"
        value={businessInfo.name}
        onChange={handleChange}
        name="name"
      />

      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="Phone Number"
        value={businessInfo.phoneNumber}
        onChange={handleChange}
        name="phoneNumber"
      />

      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="Address"
        value={businessInfo.address}
        onChange={handleChange}
        name="address"
        inputType="textarea"
        maxLength={50}
        showMaxLength={true}
      />

      <Input
        disabled={isLoading}
        fullWidth
        type="text"
        placeholder="City/Town"
        value={businessInfo.city}
        onChange={handleChange}
        name="city"
        maxLength={20}
        showMaxLength={true}
      />
    </div>
  );
};

export default Step1;
