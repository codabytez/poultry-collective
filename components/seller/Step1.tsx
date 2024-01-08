"use client";
import { NextPage } from "next";
import { useFormContext } from "@/context/seller";
import { Input } from "../UI/Input";

const Step1: NextPage = () => {
  const { businessInfo, setBusinessInfo } = useFormContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBusinessInfo((prev: string[]) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col items-start gap-6 w-[400px]">
      <Input
        fullWidth
        type="text"
        placeholder="Business Name"
        value={businessInfo.name}
        onChange={handleChange}
        name="name"
      />

      <Input
        fullWidth
        type="text"
        placeholder="Phone Number"
        value={businessInfo.phoneNumber}
        onChange={handleChange}
        name="phoneNumber"
      />

      <Input
        fullWidth
        type="text"
        placeholder="Address"
        value={businessInfo.address}
        onChange={handleChange}
        name="address"
        inputType="textarea"
      />

      <Input
        fullWidth
        type="text"
        placeholder="City/Town"
        value={businessInfo.city}
        onChange={handleChange}
        name="city"
      />
    </div>
  );
};

export default Step1;
