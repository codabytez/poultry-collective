import { NextPage, Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import { BottomNavbar } from "@/components/Navbar";

export const meta: Metadata = {
  title: "Login Page",
  description: "Login to your account",
};

const Login: NextPage = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <BottomNavbar />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
