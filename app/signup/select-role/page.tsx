import { NextPage, Metadata } from "next";
import SelectRole from "@/components/SelectRole";

export const metadata: Metadata = {
  title: "Select Role",
  description: "Select Role page",
};

const SelectRolePage: NextPage = () => {
  return <SelectRole />;
};

export default SelectRolePage;
