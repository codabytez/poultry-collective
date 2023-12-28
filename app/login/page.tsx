import { NextPage } from "next";
import LoginForm from "@/components/LoginForm";
import { BottomNavbar } from "@/components/Navbar";

const Login: NextPage = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white w-full">
        <BottomNavbar />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
