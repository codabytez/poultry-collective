import { NextPage } from "next";
import Button from "../UI/Button";
import Link from "next/link";

const GetStarted: NextPage = () => {
  return (
    <section className="px-16 max-w-[1312px] m-auto">
      <div className="w-full h-[580px] m-auto bg-light-green-shade p-16 flex flex-col items-center justify-center gap-8">
        <h2 className="text-H2-03 text-cod-gray-cg-600 capitalize leading-[-2.16px] w-[781.6px] text-center">
          Buy and sell poultry Eggs with ease, anywhere, anytime.
        </h2>
        <p className="text-H5-03 text-cod-gray-cg-600 w-[506px] text-center">
          Our platform is geared towards individuals and large scale enterprises
          interested in the buying and selling of poultry produce.
        </p>
        <Link href="/signup" className="w-[400px]">
          <Button color="green" size="large" fullWidth>
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
