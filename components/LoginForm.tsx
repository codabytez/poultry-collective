/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import { Google } from "iconsax-react";
import loginImg from "@/public/assets/login_eggs.png";
import { Link } from "nextjs13-progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "./UI/Button";
import { NextPage } from "next";
import { Input } from "./UI/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user";
import { notify } from "./UI/Toast";
import Loader from "./UI/Loader";
import nProgress from "nprogress";
import { FcGoogle } from "react-icons/fc";
import useGetProfileByUserId from "@/hooks/useGetProfileByUserId";
import useGetSellerProfileByUserId from "@/hooks/useGetSellerProfileByUserId";
import { useCartStore } from "@/stores/cart";

const LoginForm: NextPage = () => {
  const router = useRouter();
  const contextUser = useUser();
  const { loadUserCart } = useCartStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);

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
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    nProgress.start();
    setIsLoading(true);
    try {
      await contextUser.login(email, password);
      reset();
      if (contextUser.user) {
        await loadUserCart(contextUser?.user?.id);
      }
    } catch (error) {
      // Check the error message to set the appropriate form error
      const errorMessage = (error as Error).message;
      if (errorMessage.includes("email")) {
        setError("email", {
          message: "Invalid credentials. Please check the email and password.",
        });
        setError("password", {
          message:
            "P! Invalid credentials. Please check the email and password.",
        });
        notify({
          message: "Invalid credentials. Please check the email and password.",
          type: "error",
          theme: "colored",
          pauseOnHover: false,
          autoClose: 2000,
        });
      } else if (errorMessage.includes("password")) {
        setError("email", {
          message: "Invalid credentials. Please check the email and password.",
        });
        setError("password", {
          message:
            "P! Invalid credentials. Please check the email and password.",
        });
        notify({
          message: "Invalid credentials. Please check the email and password.",
          type: "error",
          theme: "colored",
          pauseOnHover: false,
          autoClose: 2000,
        });
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        nProgress.done();
      }, 2000);
    }
  };

  const signInWithGoogle = async () => {
    nProgress.start();
    setIsLoading(true);
    try {
      await contextUser.signInWithGoogle();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        nProgress.done();
      }, 2000);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      if (contextUser.user) {
        setUserLoading(true);
        const userProfile = await useGetProfileByUserId(contextUser?.user?.id);
        if (userProfile?.role === "buyer") router.push("/buyer");
        if (userProfile?.role === "seller") {
          const sellerProfile = await useGetSellerProfileByUserId(
            contextUser?.user?.id
          );
          if (sellerProfile?.id)
            router.push(`/seller/profile/${sellerProfile.id}`);
          else router.push("/seller");
        } else router.push("/buyer");
      }
    };

    checkUser();
  }, [contextUser, router]);

  return (
    <>
      <section className="flex justify-center items-center min-h-[calc(100vh-190px)] my-10">
        {userLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex px-6 lg:gap-16 justify-center items-start h-max">
            <Image src={loginImg} className="hidden lg:flex" alt="login" />

            <div className="inline-flex flex-col items-start gap-2">
              <h3 className="text-H4-03 md:text-H3-03 text-cod-gray-cg-500 sm:w-[543px]">
                Hi, Welcome to Poultry Collective
              </h3>

              <p className="text-BC-03 md:text-H5-03 font-normal text-cod-gray-cg-400 sm:w-[453px]">
                Sign in with Poultry Collective and start buying and selling
                fresh poultry produce.
              </p>

              <form
                className="w-[90%] lg:w-[400px] flex flex-col items-start gap-6 pt-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Input
                  label="Your Email Address"
                  type="email"
                  placeholder="e.g jackbauer24@ctu.email.com"
                  register={formRegister}
                  name="email"
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
                    error={errors.password}
                    disabled={isLoading}
                    fullWidth
                  />
                  {/* @ts-ignore */}
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

              <div className="w-[90%] lg:w-[400px] flex flex-col items-center justify-start gap-8 mt-6">
                <p className="text-SP-03 font-normal text-cod-gray-cg-400">
                  or
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={signInWithGoogle}
                  disabled={isLoading}
                >
                  <FcGoogle color="#0d5c3d" />
                  <span>Use your Google Account</span>
                </Button>

                <p className="text-H6-03 sm:text-SP-03 font-normal text-cod-gray-cg-400">
                  Do you already have an account? {/* @ts-ignore */}
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
