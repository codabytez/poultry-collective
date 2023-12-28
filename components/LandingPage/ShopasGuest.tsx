import { NextPage } from "next";
import Product from "../Product";
import axios from "axios";
import { dummyProducts } from "./dummyProducts";

const ShopasGuest: NextPage = () => {
  return (
    <section className="overflow-hidden px-16 m-auto w-max">
      <div className="flex flex-col pb-1 items-start gap-10 my-32">
        <h1 className="text-H2-03 text-cod-gray-cg-600">Shop as a Guest</h1>
        <div className="grid grid-cols-3 gap-x-6 gap-y-[60px]">
          {dummyProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopasGuest;
