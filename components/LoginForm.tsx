"use client";
import Image from "next/image";
import { Google } from "iconsax-react";
import loginImg from "@/public/assets/login_eggs.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "./UI/Button";
import { NextPage } from "next";
import Input from "./UI/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/context/user";
import { useGeneralStore } from "@/stores/general";

const LoginForm: NextPage = () => {
  const router = useRouter();
  const contextUser = useUser();
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string>("");
  //   const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGeneralStore();

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  const {
    register: formRegister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    if (!contextUser) return console.log("No user context");

    try {
      setIsLoading(true);
      await contextUser.login(email, password);
      //   router.push("/");
    } catch (error) {
      // Check the error message to set the appropriate form error
      const errorMessage = (error as Error).message;
      console.log("error", errorMessage);
      if (errorMessage.includes("email")) {
        setError("email", {
          message:
            "E! Invalid credentials. Please check the email and password.",
        });
      } else if (errorMessage.includes("password")) {
        console.log("error1", errorMessage);
        setError("password", {
          message:
            "P! Invalid credentials. Please check the email and password.",
        });
      }
    }
  };

  useEffect(() => {
    if (contextUser.user) {
      router.push("/");
    }
  }, [contextUser, router]);

  return (
    <section className="flex justify-center items-center min-h-screen my-10">
      <div className="flex gap-16 justify-center items-start h-max">
        <Image src={loginImg} alt="login" />

        <div className="inline-flex flex-col items-start gap-2">
          <h3 className="text-H3-03 text-cod-gray-cg-500 w-[543px]">
            Hi, Welcome to Poultry Collective
          </h3>

          <p className="text-H5-03 font-normal text-cod-gray-cg-400 w-[453px]">
            Sign in with Poultry Collective and start buying and selling fresh
            poultry produce.
          </p>

          <form
            className="w-[426px] flex flex-col items-start gap-6"
            onClick={handleSubmit(onSubmit)}
          >
            <Input
              label="Your Email Address"
              type="email"
              placeholder="e.g jackbauer24@ctu.email.com"
              register={formRegister}
              name="email"
              error={errors.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <div className="flex flex-col w-full gap-2">
              <Input
                label="Your Password"
                type="password"
                placeholder="e.g REnee24*****"
                register={formRegister}
                name="password"
                error={errors.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <Link
                className="text-SC-03 font-normal text-cod-gray-cg-400"
                href="/"
              >
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" color="green" size="large" fullWidth>
              Login
            </Button>
          </form>

          <div className="w-[426px] flex flex-col items-center justify-start gap-8 mt-6">
            <p className="text-SP-03 font-normal text-cod-gray-cg-400">or</p>
            <Button
              color="white"
              size="small"
              fullWidth
              //   onClick={signInWithGoogle}
            >
              <Google color="#0d5c3d" />
              <span>Use your Google Account</span>
            </Button>

            <p className="text-SP-03 font-normal text-cod-gray-cg-400">
              Do you already have an account?{" "}
              <Link className="underline" href="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
