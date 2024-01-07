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
import { Input } from "./UI/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/context/user";
import { notify } from "./UI/Toast";
import Loader from "./UI/Loader";
import nProgress from "nprogress";

const LoginForm: NextPage = () => {
  const router = useRouter();
  const contextUser = useUser();
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const {
    register: formRegister,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    if (email === "" || password === "") {
      setError("email", {
        message: "Please enter your email and password",
      });
      setError("password", {
        message: "Please enter your email and password",
      });
      return;
    }
    nProgress.start();
    setIsLoading(true);
    try {
      await contextUser.login(email, password);
    } catch (error) {
      // Check the error message to set the appropriate form error
      const errorMessage = (error as Error).message;
      if (errorMessage.includes("email")) {
        setError("email", {
          message: "Invalid credentials. Please check the email and password.",
        });
        notify({
          message: "Invalid credentials. Please check the email and password.",
          type: "error",
          theme: "colored",
          pauseOnHover: false,
        });
      } else if (errorMessage.includes("password")) {
        setError("password", {
          message:
            "P! Invalid credentials. Please check the email and password.",
        });
        notify({
          message: "Invalid credentials. Please check the email and password.",
          type: "error",
          theme: "colored",
          pauseOnHover: false,
        });
      }
    } finally {
      setEmail("");
      setPassword("");
      reset();
      setTimeout(() => {
        setIsLoading(false);
        nProgress.done();
      }, 2000);
    }
  };

  useEffect(() => {
    if (contextUser.user) {
      setUserLoading(true);
      router.push("/");
    }
  }, [contextUser, router]);

  return (
    <>
      <section className="flex justify-center items-center min-h-screen my-10">
        {userLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex gap-16 justify-center items-start h-max">
            <Image src={loginImg} alt="login" />

            <div className="inline-flex flex-col items-start gap-2">
              <h3 className="text-H3-03 text-cod-gray-cg-500 w-[543px]">
                Hi, Welcome to Poultry Collective
              </h3>

              <p className="text-H5-03 font-normal text-cod-gray-cg-400 w-[453px]">
                Sign in with Poultry Collective and start buying and selling
                fresh poultry produce.
              </p>

              <form
                className="w-[400px] flex flex-col items-start gap-6 pt-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Input
                  label="Your Email Address"
                  type="email"
                  placeholder="e.g jackbauer24@ctu.email.com"
                  register={formRegister}
                  name="email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    clearErrors("email");
                  }}
                  error={errors.email}
                  disabled={isLoading}
                  fullWidth
                />
                <div className="flex flex-col w-full gap-2">
                  <Input
                    label="Your Password"
                    type="password"
                    placeholder="e.g REnee24*****"
                    register={formRegister}
                    name="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                      clearErrors("password");
                    }}
                    error={errors.password}
                    disabled={isLoading}
                    fullWidth
                  />
                  <Link
                    className="text-SC-03 font-normal text-cod-gray-cg-400"
                    href="/"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </form>

              <div className="w-[400px] flex flex-col items-center justify-start gap-8 mt-6">
                <p className="text-SP-03 font-normal text-cod-gray-cg-400">
                  or
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  //   onClick={signInWithGoogle}
                  disabled={isLoading}
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
        )}
      </section>
    </>
  );
};

export default LoginForm;
