"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import verifiedImg from "@/public/assets/verified.gif";
import Button from "@/components/UI/Button";

const VerifyPage = () => {
  const router = useRouter();
  const { account } = useAuth();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const { userId, secret } = router.query ?? {};

    if (account && userId && secret) {
      account
        .updateVerification(userId as string, secret as string)
        .then((response: any) => {
          console.log(response);
          setIsVerified(true); // Set isVerified to true after successful verification
          router.push("/"); // Redirect to home page after verification
        })
        .catch(console.error);
    }
  }, [account, router]);

  // Render a success message if the user is verified
  if (isVerified) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-[453px] m-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-H3-03 text-cod-gray-cg-500 text-center">
            Email Verification
          </h3>
          <p className="text-H5-03 font-normal text-cod-gray-cg-500 text-center">
            Your email has been successfully verified and you account
            successfully created !
          </p>
        </div>
        <Image src={verifiedImg} alt="verified" />

        <Button
          color="green"
          size="medium"
          fullWidth
          onClick={() => router.push("/")}
        >
          Continue
        </Button>
      </div>
    );
  }

  // Render a loading state while the verification is in progress
  return (
    <div className="flex flex-col w-[453px] h-screen gap-4 justify-center items-center m-auto">
      <h3 className="text-H3-03 text-cod-gray-cg-500 text-center">
        Email Verification
      </h3>
      <p className="text-H5-03 font-normal text-cod-gray-cg-500 text-center">
        We sent a verification link to the email address you provided, please
        Verify email.
      </p>
    </div>
  );
};

export default VerifyPage;
