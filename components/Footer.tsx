import { NextPage } from "next";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./UI/Button";
import { Input } from "./UI/Input";

const Footer: NextPage = () => {
  return (
    <footer className=" bg-cod-gray-cg w-full p-6">
      <div className="max-w-[1291px] mx-auto">
        <div className="flex flex-col gap-10">
          <Logo fill="#FFF8F0" />
          <div className="flex justify-between items-start">
            <div>
              <h6 className="text-H6-03 text-cod-gray-cg-50">
                SUBSCRIBE TO OUR NEWS LETTER
              </h6>
              <h5 className="text-H5-03 text-white">
                A monthly digest of the latest news, articles and resources.
              </h5>
            </div>
            <div className="flex flex-col justify-start">
              <div className="flex gap-6">
                <div className="w-[400px]">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    variant="primary"
                  />
                </div>
                <Button variant="secondary">Subscribe</Button>
              </div>
              <p className="text-[10px] font-medium leading-[19px] text-cod-gray-cg-300">
                Join 1,387 others levelling up their business every week
              </p>
            </div>
          </div>
        </div>

        <div className="border-2 w-full max-w-[1291px] bg-white my-3 mb-[69px]" />

        <div className="py-1 flex justify-between flex-1">
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-BC-03 text-offwhite capitalize">Company</p>
            <div className="flex flex-col gap-4 justify-start">
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                About
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Leadership
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Blog
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Referral Program
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Community
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-BC-03 text-offwhite capitalize">Product</p>
            <div className="flex flex-col gap-4 justify-start">
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Overview
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                How it works
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Pricing
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Updates
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-BC-03 text-offwhite capitalize">Support</p>
            <div className="flex flex-col gap-4 justify-start">
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Help Centre
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                FAQ
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-BC-03 text-offwhite capitalize">Social</p>
            <div className="flex flex-col gap-4 justify-start">
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Instagram
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Twitter
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                Facebook
              </Link>
              <Link
                className="text-BC-03 text-cod-gray-cg-300 capitalize hover:text-main-green-mg transition-all"
                href="/"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
