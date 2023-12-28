'use client'
import { NextPage } from "next";
import SignUpForm from "@/components/SignUpForm";
import { BottomNavbar } from "@/components/Navbar";

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
