import { NextPage } from "next";
import { dummyProducts } from "../LandingPage/dummyProducts";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Product from "../Product";

const ProductDescription: NextPage = () => {
  const quantities = [1, 2, 3, 4, 5]; // replace with your quantities
  const items = dummyProducts.slice(0, 3); // replace with your items

  return (
    <MainLayout>
      <section className="w-[1312px] m-auto shrink-0 bg-light-green-shade p-14 h-[724px] flex gap-16 mb-16">
        <div>
          <Image
            src={dummyProducts[0].image}
            alt={dummyProducts[0].name}
            width={537}
            height={496}
            className="w-[537px] h-[496px]"
          />
        </div>

        <div className="flex flex-col gap-24">
          <div>
            <h3 className="text-H3-03 text-cod-gray-cg">
              {dummyProducts[0].name}
            </h3>

            <h4 className="w-[590px] h-[183.5px] shrink-0 text-cod-gray-cg-500 text-H4-03 font-normal">
              Our poultry eggs are weighted at 1kg per crate. These are hatched
              by our healthy broiler chickens aging from 20 to 32 months.
            </h4>
          </div>

          <div className="w-[425px] flex flex-col gap-5">
            <h3 className="text-H3-03 text-cod-gray-cg">Select Quantity</h3>

            <select className="w-full flex h-[60px] p-5 items-center justify-between shrink-0 bg-light-green-shade text-cod-gray-cg-400 text-SP-03 font-normal focus:outline-none mb-5">
              <option value="">Select...</option>
              {quantities.map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
            <Button size="large" color="green" fullWidth>
              Add to Cart
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mb-20 w-max m-auto">
        <h3 className="text-H3-03 text-cod-gray-cg">See Other Items</h3>

        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <Product key={item.id} {...item} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductDescription;
