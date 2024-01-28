import { NextPage } from "next";
import Button from "../UI/Button";

const GetStarted: NextPage = () => {
  return (
    <section className="px-5 sm:px-16 max-w-[1312px] m-auto">
      <div className="w-full h-[580px] m-auto bg-light-green-shade p-6 sm:p-16 flex flex-col items-center justify-center gap-8">
        <h2 className="text-H4-03 md:text-H2-03 text-cod-gray-cg-600 capitalize leading-[-2.16px] max-w-[781.6px] text-center">
          Buy and sell poultry Eggs with ease, anywhere, anytime.
        </h2>
        <p className="text-H5-03 text-[18px] md:text-H5-03 text-cod-gray-cg-600 md:w-[506px] text-center">
          Our platform is geared towards individuals and large scale enterprises
          interested in the buying and selling of poultry produce.
        </p>
        <div className="w-[270px] md:w-[400px]">
          <Button href="/signup" size="lg" fullWidth>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
