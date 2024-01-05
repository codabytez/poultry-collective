/* eslint-disable @next/next/no-img-element */
"use client";
import { NextPage } from "next";
import MainLayout from "@/layouts/MainLayout";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Product from "../Product";
import { useUser } from "@/context/user";
import { useProductStore } from "@/stores/product";
import { useEffect, useState } from "react";
import { productDetailTypes } from "@/@types";

const ProductDescription: NextPage<productDetailTypes> = ({ params }) => {
  const contextUser = useUser();
  const { productsById, setProductsById, allProducts } = useProductStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contextUser.user) {
      setLoading(true);
      try {
        setProductsById(params.productid);
      } catch (error) {
        console.error("Error adding to cart:", error);

        throw new Error(
          "Failed to add the item to the cart. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <section className="max-w-[1312px] m-auto shrink-0 bg-light-green-shade p-14 h-[724px] flex gap-16 mb-16 ">
        <div>
          <img
            src={productsById.imageUrl}
            alt={productsById.product_name}
            className="w-[537px] h-[496px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-24">
          <div>
            <h3 className="text-H3-03 text-cod-gray-cg">
              {productsById.product_name}
            </h3>

            <h4 className="w-[590px] h-[183.5px] shrink-0 text-cod-gray-cg-500 text-H4-03 font-normal">
              {productsById.product_details}
            </h4>
          </div>

          <div className="w-[425px] flex flex-col gap-5">
            <h3 className="text-H3-03 text-cod-gray-cg">Select Quantity</h3>

            <Input type="text" placeholder="Enter quantity" fullWidth />

            {/* <select className="w-full flex h-[60px] p-5 items-center justify-between shrink-0 bg-light-green-shade text-cod-gray-cg-400 text-SP-03 font-normal focus:outline-none mb-5">
              <option value="">Select...</option>
              {productsById.quantity_available.map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select> */}
            <Button size="large" color="green" fullWidth>
              Add to Cart
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mb-20 m-auto">
        <h3 className="text-H3-03 text-cod-gray-cg w-full border">
          See Other Items
        </h3>

        <div className="flex flex-wrap gap-4">
          {allProducts.slice(0, 3).map((item) => (
            <Product key={item.id} {...item} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductDescription;
