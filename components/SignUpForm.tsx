"use client";
import Image from "next/image";
import { Google } from "iconsax-react";
import signupImg from "@/public/assets/signup_eggs.png";
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
import { CustomError } from "@/@types";
import { notify } from "./UI/Toast";
import Loader from "./UI/Loader";
import nProgress from "nprogress";

const SignUpForm: NextPage = () => {
  const router = useRouter();
  const contextUser = useUser();
  const [fullName, setFullName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [confirmPassword, setConfirmPassword] = useState<string | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const signUpSchema = z.object({
    fullName: z
      .string()
      .min(1, { message: "Name must not be empty" })
      .max(50, { message: "Name must be at most 50 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .refine(
        (password) =>
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password),
        {
          message:
            "Password must contain at least 1 number, 1 special character, and 1 capital letter",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  type FormData = z.infer<typeof signUpSchema>;

  const onSubmit = async () => {
    setIsLoading(true);
    nProgress.start();
    try {
      await contextUser.register(email, password, fullName);
      router.push("/");
      reset();
    } catch (error) {
      if ((error as CustomError).type === "user_already_exists") {
        notify({
          message: "User already exists",
          type: "error",
          theme: "colored",
          pauseOnHover: false,
        });
        reset();
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        nProgress.done();
      }, 1000);
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
            <Image src={signupImg} alt="Signup" />

            <div className="inline-flex flex-col items-start gap-2">
              <h3 className="text-H3-03 text-cod-gray-cg-500 w-[543px]">
                Hi, Welcome to Poultry Collective
              </h3>

              <p className="text-H5-03 font-normal text-cod-gray-cg-400 w-[453px]">
                Sign up with Poultry Collective and start buying and selling
                fresh poultry produce.
              </p>

              <form
                className="w-[400px] flex flex-col items-start gap-6 pt-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Input
                  label="Your Full Name"
                  register={formRegister}
                  error={errors.fullName}
                  name="fullName"
                  type="text"
                  placeholder="e.g John Doe"
                  value={fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFullName(e.target.value);
                    clearErrors("fullName");
                  }}
                  disabled={isLoading}
                  fullWidth
                />

                <Input
                  label="Email Address"
                  register={formRegister}
                  error={errors.email}
                  name="email"
                  type="email"
                  placeholder="e.g jackbauer24@ctu.email.com"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    clearErrors("email");
                  }}
                  disabled={isLoading}
                  fullWidth
                />

                <Input
                  label="Password"
                  register={formRegister}
                  error={errors.password}
                  name="password"
                  type="password"
                  placeholder="e.g REnee24*****"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  disabled={isLoading}
                  fullWidth
                />

                <Input
                  label="Confirm Password"
                  register={formRegister}
                  error={errors.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  placeholder="e.g REnee24*****"
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                    clearErrors("confirmPassword");
                  }}
                  disabled={isLoading}
                  fullWidth
                />

                <Button
                  size="lg"
                  fullWidth
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Get Started
                </Button>

                <div className="w-[426px] flex items-center justify-start gap-4 mb-6 relative">
                  <span
                    className={`w-5 h-5 flex justify-center items-center ${
                      errors.terms ? "border-red-500" : "border-main-green-mg"
                    } border-2 absolute -left-0.5 top-1/2 transform -translate-y-1/2`}
                  />
                  <input
                    {...formRegister("terms")}
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className={`w-4 h-4 border-2 border-white relative z-10 rounded-sm outline-0 focus:ring-0 appearance-none checked:bg-main-green-mg cursor-pointer disabled:opacity-50 ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => setChecked(!checked)}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="terms"
                    className="text-SP-03 font-normal text-cod-gray-cg-400 capitalize"
                  >
                    I agree to the{" "}
                    <span className="underline">Terms & Conditions</span>
                  </label>
                </div>
              </form>

              <div className="w-[400px] flex flex-col items-center justify-start gap-8 mt-5">
                <p className="text-SP-03 font-normal text-cod-gray-cg-400">
                  or
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  disabled={isLoading}
                  //   onClick={signInWithGoogle}
                >
                  <Google color="#0d5c3d" />
                  <span>Use your Google Account</span>
                </Button>

                <p className="text-SP-03 font-normal text-cod-gray-cg-400">
                  Do you already have an account?{" "}
                  <Link className="underline" href="/login">
                    Login
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

export default SignUpForm;
