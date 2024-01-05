import { NextPage } from "next";
import Image from "next/image";
import whyusImg from "@/public/assets/whyUs_img.png";

const Whyus: NextPage = () => {
  return (
    <section className="mt-[102px] mb-[65px] px-5">
      <div className="bg-light-green-shade py-14 px-16 pr-32 flex items-center justify-center gap-[106px]">
        <Image
          width={650}
          height={375}
          src={whyusImg}
          alt="whyus"
          className="object-cover object-center"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-H2-03 text-cod-gray-cg-600">Why Us?</h2>
          <p className="text-2xl font-medium leading-[36px] text-cod-gray-cg-500 max-w-[491.5px]">
            Our aim is to empower poultry farmers by providing them with a
            platform to connect with customers and grow their businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
