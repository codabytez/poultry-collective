import { NextPage, Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";
import { BottomNavbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create New Account",
};

const SignUp: NextPage = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white w-full">
        <BottomNavbar />
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
