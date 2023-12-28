// context.tsx
"use client";
import { FormContextProps } from "@/@types";
import { NextPage } from "next";
import { createContext, useContext, useState, ReactNode } from "react";

const initialBusinessInfo = {
  name: "",
  phoneNumber: "",
  address: "",
  city: "",
};

const initialBioAndBanner = {
  bio: "",
  bannerImage: {
    preview: "",
    raw: null,
  },
};

const initialBankDetails = {
  bankName: "",
  accountNumber: "",
  validId: "",
  validIdImage: {
    preview: "",
    raw: null,
  },
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: NextPage<{ children: ReactNode }> = ({
  children,
}) => {
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
  const [bioAndBanner, setBioAndBanner] = useState(initialBioAndBanner);
  const [bankDetails, setBankDetails] = useState(initialBankDetails);

  return (
    <FormContext.Provider
      value={{
        businessInfo,
        bioAndBanner,
        bankDetails,
        setBusinessInfo,
        setBioAndBanner,
        setBankDetails,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
