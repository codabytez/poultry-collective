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
import Input from "./UI/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/context/user";
import { CustomError } from "@/@types";

const SignUpForm: NextPage = () => {
  const router = useRouter();
  const contextUser = useUser();
  const [name, setName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [confirmPassword, setConfirmPassword] = useState<string | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | "">("");

  const signUpSchema = z.object({
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
    confirmPassword: z.string(),
    fullName: z
      .string()
      .min(0, { message: "Name must not be empty" })
      .max(50, { message: "Name must be at most 50 characters long" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  type FormData = z.infer<typeof signUpSchema>;

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await contextUser.register(email, password, name);
      router.push("/");
      reset();
    } catch (error) {
      if ((error as CustomError).type === "user_already_exists") {
        setError("User already exists");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contextUser?.user) {
      router.push("/");
    }
  }, [contextUser, router]);

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="w-20 h-20 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="w-[500px] h-[300px] bg-white rounded flex flex-col justify-center items-center gap-4">
            <h3 className="text-H3-03 text-cod-gray-cg-500">{error}</h3>
            <Button color="green" size="large" onClick={() => setError("")}>
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <section className="flex justify-center items-center min-h-screen mt-10">
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
                className="w-[426px] flex flex-col items-start gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="Your Full Name"
                  register={formRegister}
                  error={errors.fullName}
                  name="fullName"
                  type="text"
                  placeholder="e.g John Doe"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />

                <Input
                  label="Email Address"
                  register={formRegister}
                  error={errors.email}
                  name="email"
                  type="email"
                  placeholder="e.g jackbauer24@ctu.email.com"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
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
                />

                <Input
                  label="Confirm Password"
                  register={formRegister}
                  error={errors.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  placeholder="e.g REnee24*****"
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <Button color="green" size="large" fullWidth type="submit">
                  Get Started
                </Button>

                <div className="w-[426px] flex items-center justify-start gap-4 mb-6">
                  <input
                    {...formRegister("terms")}
                    type="checkbox"
                    name="terms"
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-SP-03 font-normal text-cod-gray-cg-400 capitalize"
                  >
                    I agree to the{" "}
                    <span className="underline">Terms & Conditions</span>
                  </label>
                </div>
                {errors.terms &&
                  typeof errors.terms === "object" &&
                  "message" in errors.terms &&
                  typeof errors.terms.message === "string" && (
                    <p>{errors.terms.message}</p>
                  )}
              </form>

              <div className="w-[426px] flex flex-col items-center justify-start gap-8 mt-5">
                <p className="text-SP-03 font-normal text-cod-gray-cg-400">
                  or
                </p>
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
                  <Link className="underline" href="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUpForm;
